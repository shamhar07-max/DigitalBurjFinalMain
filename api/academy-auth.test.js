// Run with: npm test   (no dependencies; in-memory KV, fake Resend + Stripe)
const assert = require("assert");
const { run, webhook } = require("./_academy");
const A = require("./_academy_auth");

const mem = new Map();
const kv = { get: async (k) => (mem.has(k) ? mem.get(k) : null), put: async (k, v) => void mem.set(k, v), delete: async (k) => void mem.delete(k) };
const mails = []; const stripeCalls = [];
const env = { SESSION_SECRET: "test-secret-0123456789", RESEND_API_KEY: "k", STRIPE_SECRET_KEY: "sk_test", STRIPE_WEBHOOK_SECRET: "whsec_test", APP_ORIGIN: "https://academy.digitalburj.com", SITE_ORIGIN: "https://digitalburj.com" };
const resend = async (p, b) => { mails.push({ p, ...b }); return { ok: true, status: 200, json: {} }; };
const fetchFake = async (url, o) => { stripeCalls.push({ url, o }); if (o.method === "POST") return { ok: true, status: 200, json: async () => ({ url: "https://checkout.stripe.com/c/pay/cs_test_1", id: "cs_test_1" }) };
  return { ok: true, status: 200, json: async () => ({ id: "cs_test_1", payment_status: "paid", customer_details: { email: "buyer@example.com" }, metadata: { items: "b-web" } }) }; };
const dep = (cookie) => ({ env, resend, kv, fetch: fetchFake, req: { cookie: cookie || "" } });
const cookieOf = (r) => (r.cookies && r.cookies[0] ? r.cookies[0].split(";")[0] : "");
const tokenFrom = (subject) => { const m = mails.filter((x) => x.subject.includes(subject)).pop(); return decodeURIComponent(/token=([^"&]+)/.exec(m.html)[1]); };

(async () => {
  // ---- setup-required behaviour without storage/secret
  assert.strictEqual((await run({ action: "signup" }, { env: {}, kv: null })).status, 503);

  // ---- signup validation
  const base = { action: "signup", name: "Ann Lee", email: "Ann@Example.com", password: "Str0ng-passphrase", consent: true };
  assert.strictEqual((await run({ ...base, password: "short" }, dep())).status, 400);
  assert.strictEqual((await run({ ...base, password: "alllowercaseletters" }, dep())).status, 400);
  assert.strictEqual((await run({ ...base, consent: false }, dep())).status, 400);
  let r = await run(base, dep());
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.user.email, "ann@example.com"); assert.strictEqual(r.json.user.verified, false);
  const c1 = cookieOf(r); assert(/^dba_session=/.test(c1));
  assert(/HttpOnly/.test(r.cookies[0]) && /Secure/.test(r.cookies[0]) && /SameSite=Lax/.test(r.cookies[0]) && /Domain=\.digitalburj\.com/.test(r.cookies[0]));
  assert(!JSON.stringify([...mem.values()]).includes("Str0ng-passphrase"), "plaintext password stored");
  assert.strictEqual((await run(base, dep())).status, 409, "duplicate email");

  // ---- unverified: signed in but entitlements locked
  r = await run({ action: "me" }, dep(c1)); assert.strictEqual(r.json.signedIn, true); assert.strictEqual(r.json.entitlements, null);
  assert.strictEqual((await run({ action: "me" }, dep())).json.signedIn, false);
  assert.strictEqual((await run({ action: "me" }, dep("dba_session=garbage.sig"))).json.signedIn, false, "forged cookie");

  // ---- email verification
  assert.strictEqual((await run({ action: "verify", token: "x.y" }, dep())).status, 400);
  assert.strictEqual((await run({ action: "verify", token: tokenFrom("Verify") }, dep())).status, 200);
  r = await run({ action: "me" }, dep(c1)); assert.strictEqual(r.json.user.verified, true); assert.deepStrictEqual(r.json.entitlements.items, []);

  // ---- sign in / lockout
  assert.strictEqual((await run({ action: "signin", email: "ann@example.com", password: "wrong-password1" }, dep())).status, 401);
  r = await run({ action: "signin", email: "ANN@example.com", password: "Str0ng-passphrase" }, dep()); assert.strictEqual(r.status, 200);
  const c2 = cookieOf(r);
  for (let i = 0; i < 8; i++) await run({ action: "signin", email: "lock@example.com", password: "nope-nope-1A" }, dep());
  assert.strictEqual((await run({ action: "signin", email: "lock@example.com", password: "nope-nope-1A" }, dep())).status, 429, "lockout");

  // ---- coupon redemption: server-authoritative
  const rd = { action: "redeem", items: ["b-web"], coupon: "DIGITALBURJ100", consent: true, confirmZero: true };
  assert.strictEqual((await run(rd, dep())).status, 401, "must be signed in");
  assert.strictEqual((await run({ ...rd, confirmZero: false }, dep(c2))).status, 400);
  assert.strictEqual((await run({ ...rd, items: ["b-office"] }, dep(c2))).status, 400, "non-Live");
  assert.strictEqual((await run({ ...rd, coupon: "nope" }, dep(c2))).status, 400);
  r = await run(rd, dep(c2)); assert.strictEqual(r.status, 200); assert.deepStrictEqual(r.json.entitlements.items, ["b-web"]);
  assert.deepStrictEqual(r.json.entitlements.courses.sort(), ["DB-01", "DB-02", "DB-03"]);
  assert.strictEqual((await run(rd, dep(c2))).status, 409, "already owned / duplicate use");
  // unverified users cannot redeem
  const u2 = await run({ ...base, email: "bob@example.com", name: "Bob Ray" }, dep());
  assert.strictEqual((await run(rd, dep(cookieOf(u2)))).status, 403, "unverified cannot redeem");

  // ---- password reset: single use, revokes sessions
  await run({ action: "forgot", email: "nobody@example.com" }, dep()); // silent
  assert.strictEqual(mails.filter((m) => m.to[0] === "nobody@example.com").length, 0);
  await run({ action: "forgot", email: "ann@example.com" }, dep());
  const rt = tokenFrom("Reset");
  assert.strictEqual((await run({ action: "reset", token: rt, password: "weak" }, dep())).status, 400);
  r = await run({ action: "reset", token: rt, password: "An0ther-Passphrase" }, dep()); assert.strictEqual(r.status, 200);
  assert.strictEqual((await run({ action: "reset", token: rt, password: "Third-Passphrase9" }, dep())).status, 400, "reset link single-use");
  assert.strictEqual((await run({ action: "me" }, dep(c2))).json.signedIn, false, "old sessions revoked");
  assert.strictEqual((await run({ action: "signin", email: "ann@example.com", password: "An0ther-Passphrase" }, dep())).status, 200);

  // ---- Stripe checkout (server recomputes price; amounts in cents)
  const co = { action: "checkout", items: ["b-ai", "DB-06"], consent: true, email: "buyer@example.com" };
  assert.strictEqual((await run({ ...co, consent: false }, dep())).status, 400);
  assert.strictEqual((await run({ ...co, items: ["b-office"] }, dep())).status, 400, "non-Live not purchasable");
  assert.strictEqual((await run(co, { ...dep(), env: { ...env, STRIPE_SECRET_KEY: "" } })).status, 503);
  r = await run({ ...co, price: 1, amount: 1 }, dep()); assert.strictEqual(r.status, 200); assert(r.json.url.startsWith("https://checkout.stripe.com"));
  const body = new URLSearchParams(stripeCalls.pop().o.body);
  assert.strictEqual(body.get("line_items[0][price_data][unit_amount]"), "1900"); assert.strictEqual(body.get("line_items[1][price_data][unit_amount]"), "600");
  assert.strictEqual(body.get("metadata[items]"), "b-ai,DB-06"); assert.strictEqual(body.get("customer_email"), "buyer@example.com");
  assert(body.get("success_url").startsWith("https://academy.digitalburj.com/welcome?cs="));
  assert.strictEqual((await run({ action: "welcome", cs: "cs_test_1" }, dep())).json.paid, true);
  assert.strictEqual((await run({ action: "welcome", cs: "../etc" }, dep())).status, 400);

  // ---- Stripe webhook: signature, replay window, idempotency, refund
  const now = Date.now(), t = Math.floor(now / 1000);
  const event = (type, obj) => JSON.stringify({ type, data: { object: obj } });
  const sig = async (raw, ts = t) => `t=${ts},v1=${await A.hmacHex("whsec_test", `${ts}.${raw}`)}`;
  const session = { id: "cs_live_1", payment_status: "paid", amount_total: 1900, currency: "usd", customer_details: { email: "Buyer@Example.com" }, metadata: { items: "b-ai", ref: "ORD-1" }, payment_intent: "pi_1" };
  const raw = event("checkout.session.completed", session);
  assert.strictEqual((await webhook(raw, "t=1,v1=bad", dep(), now)).status, 400, "bad signature");
  assert.strictEqual((await webhook(raw, await sig(raw, t - 4000), dep(), now)).status, 400, "stale timestamp");
  assert.strictEqual((await webhook(raw + " ", await sig(raw), dep(), now)).status, 400, "tampered body");
  assert.strictEqual((await webhook(raw, await sig(raw), dep(), now)).status, 200);
  assert.strictEqual((await webhook(raw, await sig(raw), dep(), now)).status, 200); // Stripe retry
  let ent = await A.entitlement(dep(), "buyer@example.com");
  assert.strictEqual(ent.orders.length, 1, "webhook is idempotent"); assert.deepStrictEqual(ent.items, ["b-ai"]);
  assert(mails.some((m) => m.to[0] === "buyer@example.com" && /purchase/i.test(m.subject)), "receipt sent");
  const unpaid = event("checkout.session.completed", { ...session, id: "cs_x", payment_status: "unpaid", customer_details: { email: "z@example.com" } });
  await webhook(unpaid, await sig(unpaid), dep(), now); assert.strictEqual((await A.entitlement(dep(), "z@example.com")).items.length, 0, "unpaid grants nothing");
  const refund = event("charge.refunded", { refunded: true, payment_intent: "pi_1" });
  await webhook(refund, await sig(refund), dep(), now);
  ent = await A.entitlement(dep(), "buyer@example.com"); assert.deepStrictEqual(ent.items, [], "refund revokes access"); assert.strictEqual(ent.orders[0].status, "refunded");
  // buyer signs up later with the paid email: access appears only after verification
  const paid2 = event("checkout.session.completed", { ...session, id: "cs_live_2", payment_intent: "pi_2", metadata: { items: "DB-00", ref: "ORD-2" } });
  await webhook(paid2, await sig(paid2), dep(), now);
  const bs = await run({ action: "signup", name: "Buyer One", email: "buyer@example.com", password: "Quartz-Lantern-91", consent: true }, dep());
  assert.strictEqual((await run({ action: "me" }, dep(cookieOf(bs)))).json.entitlements, null, "no entitlements before email verification");
  await run({ action: "verify", token: tokenFrom("Verify") }, dep());
  assert.deepStrictEqual((await run({ action: "me" }, dep(cookieOf(bs)))).json.entitlements.items, ["DB-00"]);
  // upgrade credit is computed from the server-side entitlement
  const bsC = cookieOf(bs);
  await run({ action: "checkout", items: ["b-web"], consent: true }, dep(bsC));
  assert.strictEqual(new URLSearchParams(stripeCalls.pop().o.body).get("line_items[0][price_data][unit_amount]"), "900", "no credit for DB-00 in b-web");

  assert.strictEqual((await run({ action: "signout" }, dep(c1))).cookies[0].includes("Max-Age=0"), true);
  console.log("academy auth tests passed");
})().catch((e) => { console.error(e); process.exit(1); });
