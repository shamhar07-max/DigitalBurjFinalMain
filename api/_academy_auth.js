// Academy accounts, sessions, entitlements, Stripe checkout + webhook.
// Runtime-agnostic (Cloudflare Worker / Node): WebCrypto only, storage through an injected `kv`
// ({ get(key), put(key, value, ttlSeconds?), delete(key) }) — the Worker passes its KV namespace.
// Authority rules (handbook §7): an entitlement is created ONLY from a Stripe-signed webhook or a
// server-verified coupon redemption by a signed-in, e-mail-verified user. Never from a return URL.
const DBA = require("../dist/academy-shared.js");

const webcrypto = globalThis.crypto || (0, eval)("require")("node:crypto").webcrypto;
const subtle = webcrypto.subtle;
const te = new TextEncoder();
const PBKDF2_ITERATIONS = 100000; // Cloudflare Workers' WebCrypto maximum
const SESSION_DAYS = 14;

const b64 = (buf) => { let s = ""; new Uint8Array(buf).forEach((c) => (s += String.fromCharCode(c))); return btoa(s); };
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const b64u = (buf) => b64(buf).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => unb64(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ok = (json, cookies) => ({ status: 200, json, cookies });
const fail = (status, error, extra) => ({ status, json: { error, ...(extra || {}) } });
const rid = (p) => `${p}-${b64u(webcrypto.getRandomValues(new Uint8Array(6))).toUpperCase().replace(/[-_]/g, "X")}`;

/* ------------------------------------------------------------------ crypto */
function tsEqual(a, b) { // constant-time string compare
  a = String(a); b = String(b);
  let d = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}
async function hmacKey(secret) { return subtle.importKey("raw", te.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); }
async function hmacB64u(secret, data) { return b64u(await subtle.sign("HMAC", await hmacKey(secret), te.encode(data))); }
async function hmacHex(secret, data) {
  const s = new Uint8Array(await subtle.sign("HMAC", await hmacKey(secret), te.encode(data)));
  return Array.from(s).map((x) => x.toString(16).padStart(2, "0")).join("");
}
async function pbkdf2(password, salt, iterations) {
  const k = await subtle.importKey("raw", te.encode(password), "PBKDF2", false, ["deriveBits"]);
  return subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, k, 256);
}
async function hashPassword(password) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64(salt)}$${b64(await pbkdf2(password, salt, PBKDF2_ITERATIONS))}`;
}
async function verifyPassword(password, stored) {
  const [, it, salt, hash] = String(stored).split("$");
  if (!hash) return false;
  return tsEqual(b64(await pbkdf2(password, unb64(salt), Number(it))), hash);
}
async function sign(payload, secret) { const body = b64u(te.encode(JSON.stringify(payload))); return `${body}.${await hmacB64u(secret, body)}`; }
async function unsign(token, secret) {
  const [body, mac] = String(token || "").split(".");
  if (!body || !mac || !tsEqual(mac, await hmacB64u(secret, body))) return null;
  try { const p = JSON.parse(new TextDecoder().decode(unb64u(body))); return p.exp && p.exp < Date.now() / 1000 ? null : p; } catch { return null; }
}

/* ------------------------------------------------------------------ config + storage */
const cfg = (deps) => {
  const e = deps.env || {};
  return {
    secret: e.SESSION_SECRET, appOrigin: (e.APP_ORIGIN || "https://academy.digitalburj.com").replace(/\/$/, ""), siteOrigin: (e.SITE_ORIGIN || "https://digitalburj.com").replace(/\/$/, ""),
    cookieDomain: e.COOKIE_DOMAIN === undefined ? ".digitalburj.com" : e.COOKIE_DOMAIN, secureCookie: e.INSECURE_COOKIES !== "1",
    stripeKey: e.STRIPE_SECRET_KEY, stripeWebhook: e.STRIPE_WEBHOOK_SECRET, mailTo: e.CONTACT_TO || "support@digitalburj.com", mailFrom: e.MAIL_FROM || "DigitalBurj <support@digitalburj.com>",
  };
};
const ready = (deps) => (deps.kv && cfg(deps).secret ? null : fail(503, "Academy accounts are not configured yet.", { setupRequired: true }));
const K = { user: (e) => `acad:user:${e}`, ent: (e) => `acad:ent:${e}`, order: (id) => `acad:order:${id}`, pi: (id) => `acad:pi:${id}`, redeem: (e, id) => `acad:redeem:${e}:${id}`, fail: (e) => `acad:fail:${e}`, lock: (n, e) => `acad:lock:${n}:${e}` };
const getJSON = async (kv, key) => { const v = await kv.get(key); return v ? JSON.parse(v) : null; };
const putJSON = (kv, key, val, ttl) => kv.put(key, JSON.stringify(val), ttl);
const normEmail = (e) => clean(e, 200).toLowerCase();

/* ------------------------------------------------------------------ sessions */
function cookieHeader(deps, token, maxAge) {
  const c = cfg(deps);
  return `dba_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${c.secureCookie ? "; Secure" : ""}${c.cookieDomain ? `; Domain=${c.cookieDomain}` : ""}`;
}
async function startSession(deps, user) {
  const token = await sign({ e: user.email, sv: user.sv, exp: Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400 }, cfg(deps).secret);
  return [cookieHeader(deps, token, SESSION_DAYS * 86400)];
}
async function sessionUser(deps) {
  const m = /(?:^|;\s*)dba_session=([^;]+)/.exec((deps.req && deps.req.cookie) || "");
  if (!m) return null;
  const p = await unsign(m[1], cfg(deps).secret);
  if (!p) return null;
  const user = await getJSON(deps.kv, K.user(p.e));
  return user && user.sv === p.sv ? user : null;
}
const publicUser = (u) => ({ name: u.name, email: u.email, verified: !!u.verified, role: u.role, demo: !!u.demo, country: u.country || "", goal: u.goal || "", language: u.language || "", createdAt: u.createdAt });

/* ------------------------------------------------------------------ entitlements */
// Items are always derived from non-refunded orders, so a refund revokes exactly what that order granted.
async function entitlement(deps, email) {
  const ent = (await getJSON(deps.kv, K.ent(email))) || { orders: [] };
  const live = ent.orders.filter((o) => o.status !== "refunded");
  const items = [...new Set(live.flatMap((o) => o.items))];
  const courses = [...new Set(items.flatMap((id) => DBA.bundleCourseIds(id)))];
  return { items, courses, orders: ent.orders };
}
async function addOrder(deps, email, order) {
  const ent = (await getJSON(deps.kv, K.ent(email))) || { orders: [] };
  if (ent.orders.some((o) => o.id === order.id)) return;
  ent.orders.unshift(order);
  await putJSON(deps.kv, K.ent(email), ent);
  // Concurrent webhooks can overwrite each other (no compare-and-set in KV): re-read and re-add if ours went missing.
  for (let i = 0; i < 2; i++) {
    const back = await getJSON(deps.kv, K.ent(email));
    if (back && back.orders.some((o) => o.id === order.id)) return;
    const merged = back || { orders: [] };
    merged.orders.unshift(order);
    await putJSON(deps.kv, K.ent(email), merged);
  }
}
/* Marketing contact is created only once the address is proven (verified email or password reset), never at sign-up. */
async function syncMarketing(deps, user) {
  if (!user.marketing || user.marketingSynced || !deps.env.RESEND_API_KEY) return;
  const payload = { email: user.email, first_name: user.name.split(" ")[0], unsubscribed: false };
  if (deps.env.RESEND_SEGMENT_ID) payload.segments = [{ id: deps.env.RESEND_SEGMENT_ID }];
  try { const r = await deps.resend("/contacts", payload); if (r && (r.ok || /already|exist/i.test(JSON.stringify(r.json || {})))) { user.marketingSynced = true; await putJSON(deps.kv, K.user(user.email), user); } } catch {}
}
async function mailer(deps, body) {
  if (!deps.env.RESEND_API_KEY || !deps.resend) return { ok: false };
  try { return await deps.resend("/emails", body); } catch { return { ok: false }; }
}

/* ------------------------------------------------------------------ account actions */
function passwordProblem(pw, email) {
  pw = String(pw || "");
  if (pw.length < 10) return "Use at least 10 characters.";
  if (pw.length > 200) return "That password is too long.";
  if (pw.toLowerCase().includes(email.split("@")[0]) && email.split("@")[0].length > 3) return "Do not include your email name in the password.";
  if ((/[a-z]/.test(pw) ? 1 : 0) + (/[A-Z]/.test(pw) ? 1 : 0) + (/\d/.test(pw) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 1 : 0) < 2) return "Mix at least two of: lower case, upper case, numbers, symbols.";
  if (/^(password|1234567890|qwertyuiop)/i.test(pw)) return "That password is too common.";
  return null;
}
async function sendVerification(deps, user) {
  const c = cfg(deps);
  const token = await sign({ t: "verify", e: user.email, exp: Math.floor(Date.now() / 1000) + 2 * 86400 }, c.secret);
  const link = `${c.appOrigin}/verify?token=${encodeURIComponent(token)}`;
  return mailer(deps, { from: c.mailFrom, to: [user.email], reply_to: c.mailTo, subject: "Verify your DigitalBurj Academy email",
    html: shell(`<p>Hi ${esc(user.name.split(" ")[0])},</p><p>Confirm your email to unlock everything you have purchased.</p><p><a href="${link}" style="display:inline-block;background:#f23a1d;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600">Verify email</a></p><p style="color:#5d6560;font-size:13px">This link works for 48 hours. If you did not create an account, ignore this email.</p>`) });
}
const shell = (inner) => `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:540px;line-height:1.55">${inner}<p style="margin-top:22px;color:#5d6560;font-size:12px">DigitalBurj Academy — participation does not by itself provide employment, a visa, a licence, accreditation or a guaranteed outcome.</p></div>`;

async function signup(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const name = clean(b.name, 120), email = normEmail(b.email);
  if (name.length < 2 || !EMAIL.test(email)) return fail(400, "Please enter your name and a valid email.");
  if (b.consent !== true) return fail(400, "Please accept the terms and privacy notice.");
  const problem = passwordProblem(b.password, email); if (problem) return fail(400, problem);
  if (/@demo\.digitalburj\.com$/.test(email)) return fail(400, "Please use your own email address.");
  if (await deps.kv.get(K.user(email))) return fail(409, "An account with this email already exists. Sign in instead.", { exists: true });
  const user = { name, email, pw: await hashPassword(b.password), role: "learner", verified: false, sv: 1, country: clean(b.country, 80), goal: clean(b.goal, 120), language: clean(b.language, 20), a11y: clean(b.a11y, 80), marketing: b.marketing === true, createdAt: new Date().toISOString() };
  await putJSON(deps.kv, K.user(email), user);
  await sendVerification(deps, user);
  return ok({ ok: true, user: publicUser(user) }, await startSession(deps, user));
}
async function signin(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const email = normEmail(b.email), pw = String(b.password || "");
  if (!EMAIL.test(email) || !pw) return fail(400, "Enter your email and password.");
  const f = (await getJSON(deps.kv, K.fail(email))) || { n: 0 };
  if (f.n >= 8) return fail(429, "Too many attempts. Try again in 15 minutes or reset your password.");
  const user = await getJSON(deps.kv, K.user(email));
  const good = await verifyPassword(pw, user ? user.pw : "pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="); // equalise timing for unknown emails
  if (!user || !good) { await putJSON(deps.kv, K.fail(email), { n: f.n + 1 }, 900); return fail(401, "Email or password is incorrect."); }
  if (user.suspended) return fail(403, "This account is suspended. Contact support@digitalburj.com.");
  await deps.kv.delete(K.fail(email));
  return ok({ ok: true, user: publicUser(user) }, await startSession(deps, user));
}
async function signout(b, deps) { return ok({ ok: true }, [cookieHeader(deps, "", 0)]); }
async function me(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const user = await sessionUser(deps);
  if (!user) return ok({ ok: true, signedIn: false });
  if (!user.verified) return ok({ ok: true, signedIn: true, user: publicUser(user), entitlements: null, entitlementsLocked: "Verify your email to unlock what you have purchased." });
  const e = await entitlement(deps, user.email);
  const admins = new Set(String((deps.env && deps.env.ADMIN_EMAILS) || "").toLowerCase().split(/[,\s;]+/).filter(Boolean));
  const admin = !user.demo && !user.suspended && admins.has(user.email); // admin tools are also gated server-side on every call
  return ok({ ok: true, signedIn: true, user: publicUser(user), entitlements: e, admin });
}
async function verifyEmail(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const p = await unsign(b.token, cfg(deps).secret);
  if (!p || p.t !== "verify") return fail(400, "This verification link is invalid or has expired.");
  const user = await getJSON(deps.kv, K.user(p.e));
  if (!user) return fail(400, "This verification link is invalid or has expired.");
  if (!user.verified) { user.verified = true; await putJSON(deps.kv, K.user(user.email), user); }
  await syncMarketing(deps, user);
  return ok({ ok: true, email: user.email });
}
async function resendVerification(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const user = await sessionUser(deps); if (!user) return fail(401, "Sign in first.");
  if (user.verified) return ok({ ok: true, alreadyVerified: true });
  if (await deps.kv.get(K.lock("vr", user.email))) return fail(429, "Please wait a minute before requesting another email.");
  await deps.kv.put(K.lock("vr", user.email), "1", 60);
  await sendVerification(deps, user);
  return ok({ ok: true });
}
async function forgot(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const email = normEmail(b.email);
  if (EMAIL.test(email) && !(await deps.kv.get(K.lock("fp", email)))) {
    const user = await getJSON(deps.kv, K.user(email));
    if (user) {
      await deps.kv.put(K.lock("fp", email), "1", 60);
      const c = cfg(deps);
      const token = await sign({ t: "reset", e: email, p: user.pw.slice(-16), exp: Math.floor(Date.now() / 1000) + 3600 }, c.secret);
      await mailer(deps, { from: c.mailFrom, to: [email], reply_to: c.mailTo, subject: "Reset your Academy password",
        html: shell(`<p>Hi ${esc(user.name.split(" ")[0])},</p><p>Use the button below to choose a new password. The link works once and expires in one hour.</p><p><a href="${c.appOrigin}/reset?token=${encodeURIComponent(token)}" style="display:inline-block;background:#f23a1d;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600">Reset password</a></p><p style="color:#5d6560;font-size:13px">If you did not ask for this, you can ignore it.</p>`) });
    }
  }
  return ok({ ok: true }); // identical answer whether or not the account exists
}
async function reset(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const p = await unsign(b.token, cfg(deps).secret);
  if (!p || p.t !== "reset") return fail(400, "This reset link is invalid or has expired.");
  const user = await getJSON(deps.kv, K.user(p.e));
  if (!user || user.pw.slice(-16) !== p.p) return fail(400, "This reset link has already been used or has expired.");
  const problem = passwordProblem(b.password, user.email); if (problem) return fail(400, problem);
  user.pw = await hashPassword(b.password); user.sv += 1; user.verified = true; // the inbox proved ownership
  await putJSON(deps.kv, K.user(user.email), user);
  await deps.kv.delete(K.fail(user.email));
  await syncMarketing(deps, user);
  return ok({ ok: true, user: publicUser(user) }, await startSession(deps, user));
}

/* ------------------------------------------------------------------ coupon redemption (server-authoritative) */
async function redeem(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const user = await sessionUser(deps); if (!user) return fail(401, "Sign in to redeem.");
  if (!user.verified) return fail(403, "Verify your email before redeeming.");
  if (b.consent !== true || b.confirmZero !== true) return fail(400, "Please accept the terms and confirm the zero-payable enrolment.");
  const pe = deps.env || {};
  if (pe.ACADEMY_PROMO_OFF === "1" || (pe.ACADEMY_PROMO_EXPIRES && Date.now() > Date.parse(pe.ACADEMY_PROMO_EXPIRES))) return fail(400, "This promotion has ended.");
  const owned = await entitlement(deps, user.email);
  const ids = (Array.isArray(b.items) ? b.items : []).slice(0, 30).map((x) => clean(x, 40));
  const q = DBA.quote(ids, clean(b.coupon, 40), owned.courses);
  if (q.coupon.state !== "applied") return fail(400, q.coupon.message || "Promotion not applicable.");
  const fresh = [], used = [];
  for (const l of q.lines) {
    if (owned.items.includes(l.id)) continue;
    (await deps.kv.get(K.redeem(user.email, l.id)) ? used : fresh).push(l);
  }
  if (!fresh.length) return fail(409, used.length ? `Promotion already used for: ${used.map((l) => l.title).join(", ")}.` : "You already own everything in this order.");
  if (fresh.some((l) => l.payable > 0)) return fail(400, "This order is not fully covered by the promotion — use checkout.");
  const order = { id: rid("RD"), source: "coupon", items: fresh.map((l) => l.id), amount: 0, currency: DBA.CURRENCY, coupon: DBA.COUPON.code, date: new Date().toISOString(), status: "active" };
  for (const l of fresh) await deps.kv.put(K.redeem(user.email, l.id), order.id);
  await addOrder(deps, user.email, order);
  const c = cfg(deps);
  mailer(deps, { from: c.mailFrom, to: [user.email], reply_to: c.mailTo, subject: `Academy access confirmed (${order.id})`,
    html: shell(`<p>Hi ${esc(user.name.split(" ")[0])},</p><p>Access is active for: <b>${esc(fresh.map((l) => l.title).join(", "))}</b> (promotion ${esc(DBA.COUPON.code)}).</p><p><a href="${c.appOrigin}/">Continue learning</a></p>`) });
  return ok({ ok: true, order, entitlements: await entitlement(deps, user.email) });
}

/* ------------------------------------------------------------------ Stripe */
async function stripe(deps, method, path, form) {
  const f = deps.fetch || fetch;
  const r = await f(`https://api.stripe.com${path}`, { method, headers: { Authorization: `Bearer ${cfg(deps).stripeKey}`, ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}) }, body: form || undefined });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, json: j };
}
async function checkout(b, deps) {
  const c = cfg(deps);
  if (!c.stripeKey) return fail(503, "Online payment is not switched on yet.", { setupRequired: true });
  const bad = ready(deps); if (bad) return bad;
  if (b.consent !== true) return fail(400, "Please accept the access, privacy and refund terms.");
  const user = await sessionUser(deps);
  const email = user ? user.email : normEmail(b.email);
  if (email && !EMAIL.test(email)) return fail(400, "Please enter a valid email.");
  const owned = user ? (await entitlement(deps, email)).courses : [];
  const ids = (Array.isArray(b.items) ? b.items : []).slice(0, 30).map((x) => clean(x, 40));
  const q = DBA.quote(ids, "", owned);
  if (!q.lines.length) return fail(400, q.blocked.length ? q.blocked[0].reason : "Your order is empty.", { blocked: q.blocked });
  const lines = q.lines.filter((l) => l.payable > 0);
  if (!lines.length) return fail(400, "Nothing to pay for in this order.");
  const ref = rid("ORD");
  const p = new URLSearchParams();
  p.set("mode", "payment"); p.set("client_reference_id", ref);
  p.set("success_url", `${c.appOrigin}/welcome?cs={CHECKOUT_SESSION_ID}`); p.set("cancel_url", `${c.siteOrigin}/academy#bundles`);
  if (email) p.set("customer_email", email);
  lines.forEach((l, i) => {
    p.set(`line_items[${i}][quantity]`, "1"); p.set(`line_items[${i}][price_data][currency]`, "usd");
    p.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(l.payable * 100)));
    p.set(`line_items[${i}][price_data][product_data][name]`, `DigitalBurj Academy — ${l.title}`);
  });
  const itemsCsv = lines.map((l) => l.id).join(",");
  p.set("metadata[items]", itemsCsv); p.set("metadata[ref]", ref); p.set("payment_intent_data[metadata][items]", itemsCsv); p.set("payment_intent_data[metadata][ref]", ref);
  const r = await stripe(deps, "POST", "/v1/checkout/sessions", p.toString());
  if (!r.ok || !r.json.url) return fail(502, "Could not start checkout. Please try again.");
  return ok({ ok: true, url: r.json.url, reference: ref, total: q.total });
}
async function welcome(b, deps) {
  if (!cfg(deps).stripeKey) return fail(503, "Online payment is not switched on yet.", { setupRequired: true });
  const id = clean(b.cs, 120);
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) return fail(400, "Unknown checkout.");
  const r = await stripe(deps, "GET", `/v1/checkout/sessions/${id}`);
  if (!r.ok) return fail(404, "We could not find that checkout.");
  const s = r.json;
  const items = String((s.metadata && s.metadata.items) || "").split(",").filter(Boolean);
  return ok({ ok: true, paid: s.payment_status === "paid", email: (s.customer_details && s.customer_details.email) || s.customer_email || "", titles: items.map((i) => (DBA.bundle(i) || DBA.course(i) || { name: i, title: i })).map((x) => x.name || x.title) });
}
async function verifyStripeSignature(raw, header, secret, toleranceSec = 300, now = Date.now()) {
  const parts = Object.fromEntries(String(header || "").split(",").map((kv) => kv.split("=")).filter((x) => x.length === 2));
  if (!parts.t || !parts.v1) return false;
  if (Math.abs(now / 1000 - Number(parts.t)) > toleranceSec) return false;
  return tsEqual(await hmacHex(secret, `${parts.t}.${raw}`), parts.v1);
}
async function grantFromSession(s, deps) {
  const email = normEmail((s.customer_details && s.customer_details.email) || s.customer_email);
  const items = String((s.metadata && s.metadata.items) || "").split(",").filter((i) => i && (DBA.bundle(i) || DBA.course(i)));
  if (!EMAIL.test(email) || !items.length) return { skipped: true };
  if (await deps.kv.get(K.order(s.id))) return { duplicate: true }; // idempotent: Stripe retries webhooks
  const order = { id: s.id, ref: s.metadata && s.metadata.ref, source: "stripe", items, amount: (s.amount_total || 0) / 100, currency: String(s.currency || "usd").toUpperCase(), date: new Date().toISOString(), status: "active", pi: s.payment_intent };
  await addOrder(deps, email, order);
  await deps.kv.put(K.order(s.id), email);
  if (s.payment_intent) await deps.kv.put(K.pi(s.payment_intent), JSON.stringify({ email, id: s.id }));
  const c = cfg(deps);
  mailer(deps, { from: c.mailFrom, to: [email], reply_to: c.mailTo, subject: `Your Academy purchase (${order.ref || s.id})`,
    html: shell(`<p>Thanks — your payment of <b>${DBA.money(order.amount)}</b> was received for: <b>${esc(items.map((i) => (DBA.bundle(i) || DBA.course(i)).name || (DBA.course(i) || {}).title).join(", "))}</b>.</p><p>Create your account or sign in with <b>${esc(email)}</b> to continue: <a href="${c.appOrigin}/signup">${c.appOrigin}</a></p><p style="color:#5d6560;font-size:13px">Refunds: within 14 days provided no assessment has been submitted.</p>`) });
  return { granted: true };
}
async function webhook(raw, sigHeader, deps, now) {
  const c = cfg(deps);
  if (!c.stripeWebhook || !deps.kv) return fail(503, "Payments are not configured.", { setupRequired: true });
  if (!(await verifyStripeSignature(raw, sigHeader, c.stripeWebhook, 300, now))) return fail(400, "Invalid signature.");
  let ev; try { ev = JSON.parse(raw); } catch { return fail(400, "Bad payload."); }
  const o = ev.data && ev.data.object;
  if (ev.type === "checkout.session.completed" || ev.type === "checkout.session.async_payment_succeeded") {
    if (o.payment_status === "paid") await grantFromSession(o, deps);
  } else if (o && o.payment_intent && ((ev.type === "charge.refunded" && o.refunded === true) || ev.type === "charge.dispute.created")) {
    const link = await getJSON(deps.kv, K.pi(o.payment_intent));
    if (link) {
      const ent = await getJSON(deps.kv, K.ent(link.email));
      const order = ent && ent.orders.find((x) => x.id === link.id);
      if (order && order.status !== "refunded") { order.status = "refunded"; order.refundedAt = new Date().toISOString(); order.revokedBy = ev.type; await putJSON(deps.kv, K.ent(link.email), ent); }
    }
  }
  return ok({ received: true });
}

const actions = { signup, signin, signout, me, verify: verifyEmail, resend: resendVerification, forgot, reset, redeem, checkout, welcome };
module.exports = { actions, webhook, verifyStripeSignature, hashPassword, verifyPassword, sign, unsign, entitlement, passwordProblem, hmacHex,
  _: { K, getJSON, putJSON, clean, normEmail, ok, fail, rid, esc, cfg, sessionUser, entitlement, addOrder, ready, publicUser, startSession } };
