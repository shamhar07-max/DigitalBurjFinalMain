// Academy business logic, shared by the Vercel function (api/academy.js) and the Cloudflare Worker.
// Runtime-agnostic: the caller supplies `resend(path, body)` and the environment values.
const DBA = require("../dist/academy-shared.js");
const auth = require("./_academy_auth");

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;
const ref = (p) => `${p}-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
const ok = (json) => ({ status: 200, json });
const fail = (status, error, extra) => ({ status, json: { error, ...(extra || {}) } });
const shell = (inner) => `<div style="font-family:Arial,sans-serif;color:#0f1d2e;max-width:560px;line-height:1.55">${inner}<p style="margin-top:22px;color:#5a6e82;font-size:12px">DigitalBurj Academy — participation does not by itself provide employment, a visa, a licence, accreditation or a guaranteed outcome.</p></div>`;
const rows = (pairs) => `<table style="font-size:14px;border-collapse:collapse">${pairs.filter(([, v]) => v !== "" && v != null).map(([k, v]) => `<tr><td style="padding:5px 16px 5px 0;color:#5a6e82">${esc(k)}</td><td style="padding:5px 0"><b>${esc(v)}</b></td></tr>`).join("")}</table>`;

// Pure quote: no email service needed.
function quote(b) {
  const items = Array.isArray(b.items) ? b.items.slice(0, 30).map((x) => clean(x, 40)) : [];
  const owned = Array.isArray(b.owned) ? b.owned.slice(0, 40).map((x) => clean(x, 40)) : [];
  return DBA.quote(items, clean(b.coupon, 40), owned);
}

async function mail(deps, pathBody) {
  if (!deps.env.RESEND_API_KEY) return { ok: false, status: 503 };
  return deps.resend("/emails", pathBody);
}

async function enroll(b, deps) {
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase();
  if (name.length < 2 || !EMAIL.test(email)) return fail(400, "Please enter your name and a valid email.");
  if (b.consent !== true) return fail(400, "Please accept the access, privacy and refund terms.");
  const q = quote(b);
  if (!q.lines.length) return fail(400, q.blocked.length ? q.blocked[0].reason : "Your order is empty.", { blocked: q.blocked });
  if (q.coupon.state === "applied" && b.confirmZero !== true && q.total === 0) return fail(400, "Please confirm the zero-payable enrolment explicitly.");
  if (!deps.env.RESEND_API_KEY) return fail(503, "Enrolment desk is not configured yet.", { setupRequired: true });
  const reference = ref("ENR");
  const free = q.total === 0;
  const status = free ? "Coupon confirmed — awaiting entitlement grant" : "Payment pending — payments are not live";
  const items = q.lines.map((l) => `${l.title} (${l.id}) — ${DBA.money(l.payable)}`).join("; ");
  const to = deps.env.CONTACT_TO || "support@digitalburj.com";
  const from = deps.env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  const team = await mail(deps, {
    from, to: [to], reply_to: email, subject: `Academy enrolment ${reference} — ${name}`,
    html: shell(`<h2 style="margin:0 0 10px">Academy enrolment request</h2>${rows([["Reference", reference], ["Status", status], ["Name", name], ["Email", email], ["Country", clean(b.country, 80)], ["Goal", clean(b.goal, 200)], ["Items", items], ["Coupon", q.coupon.code ? `${q.coupon.code} (${q.coupon.state})` : ""], ["Subtotal", DBA.money(q.subtotal)], ["Discount", DBA.money(q.discount)], ["Total payable", DBA.money(q.total)], ["Marketing opt-in", b.marketing === true ? "Yes" : "No"]])}<p style="color:#5a6e82;font-size:13px">No entitlement has been granted automatically. Grant access only after verifying eligibility${free ? " and coupon use" : " and payment"}.</p>`),
  });
  if (!team.ok) return fail(502, "Could not submit your request. Please try again.");
  mail(deps, {
    from, to: [email], reply_to: to, subject: `We received your Academy request (${reference})`,
    html: shell(`<p>Hi ${esc(name.split(" ")[0])},</p><p>Thanks — we have your request for <b>${esc(items)}</b>.</p>${rows([["Reference", reference], ["Status", status], ["Total", DBA.money(q.total)]])}<p>${free ? "We will confirm your coupon and grant access by email." : "Online payment is not switched on yet. A member of the team will email you the payment steps; access is only granted after payment is confirmed."} Signing in or previewing never unlocks paid content on its own.</p><p>— The DigitalBurj Academy team</p>`),
  }).catch(() => {});
  return ok({ ok: true, reference, status, entitlementGranted: false, quote: q });
}

async function support(b, deps) {
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase();
  const topic = DBA.SUPPORT_TOPICS.includes(b.topic) ? b.topic : "Course";
  const message = clean(b.message, 2000);
  if (name.length < 2 || !EMAIL.test(email) || message.length < 10) return fail(400, "Please add your name, a valid email and a short description.");
  if (!deps.env.RESEND_API_KEY) return fail(503, "Support desk is not configured yet.", { setupRequired: true });
  const reference = ref("SC");
  const to = deps.env.CONTACT_TO || "support@digitalburj.com";
  const from = deps.env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  const team = await mail(deps, {
    from, to: [to], reply_to: email, subject: `[${topic}] Academy support ${reference} — ${name}`,
    html: shell(`<h2 style="margin:0 0 10px">Academy support case</h2>${rows([["Reference", reference], ["Category", topic], ["Name", name], ["Email", email], ["Page", clean(b.source, 120)]])}<p style="margin:14px 0 4px;color:#5a6e82;font-size:13px">Message</p><div style="white-space:pre-wrap;border-left:3px solid #e30613;padding-left:12px">${esc(message)}</div><p style="color:#5a6e82;font-size:13px">States: Submitted → In Progress → Waiting for Learner → Resolved → Closed.</p>`),
  });
  if (!team.ok) return fail(502, "Could not submit your case. Please try again.");
  mail(deps, {
    from, to: [email], reply_to: to, subject: `Academy support case ${reference} received`,
    html: shell(`<p>Hi ${esc(name.split(" ")[0])},</p><p>Your <b>${esc(topic)}</b> case is <b>Submitted</b> (reference <b>${reference}</b>). Reply to this email to add detail.</p><p>— The DigitalBurj Academy team</p>`),
  }).catch(() => {});
  return ok({ ok: true, reference, status: "Submitted" });
}

// Account interest / waitlist: honest stand-in for registration until an identity provider is configured.
async function register(b, deps) {
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase();
  if (name.length < 2 || !EMAIL.test(email)) return fail(400, "Please enter your name and a valid email.");
  if (b.consent !== true) return fail(400, "Please accept the privacy notice.");
  if (!deps.env.RESEND_API_KEY) return fail(503, "Registration desk is not configured yet.", { setupRequired: true });
  const kind = b.kind === "waitlist" ? "waitlist" : "account";
  const interest = clean(b.interest, 200);
  const to = deps.env.CONTACT_TO || "support@digitalburj.com";
  const from = deps.env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  if (b.marketing === true) {
    const payload = { email, first_name: name.split(" ")[0], unsubscribed: false };
    if (deps.env.RESEND_SEGMENT_ID) payload.segments = [{ id: deps.env.RESEND_SEGMENT_ID }];
    await deps.resend("/contacts", payload).catch(() => {});
  }
  const team = await mail(deps, {
    from, to: [to], reply_to: email, subject: `Academy ${kind === "waitlist" ? "waitlist" : "account interest"} — ${name}`,
    html: shell(`<h2 style="margin:0 0 10px">Academy ${kind === "waitlist" ? "waitlist" : "registration interest"}</h2>${rows([["Name", name], ["Email", email], ["Country", clean(b.country, 80)], ["Goal", clean(b.goal, 200)], ["Interest", interest], ["Language", clean(b.language, 40)], ["Marketing opt-in", b.marketing === true ? "Yes" : "No"]])}`),
  });
  if (!team.ok) return fail(502, "Could not submit. Please try again.");
  mail(deps, {
    from, to: [email], reply_to: to, subject: kind === "waitlist" ? "You're on the Academy waitlist" : "Academy registration received",
    html: shell(`<p>Hi ${esc(name.split(" ")[0])},</p><p>${kind === "waitlist" ? `We'll email you when <b>${esc(interest || "your programme")}</b> opens.` : "Thanks for registering your interest. Sign-in opens when the Academy identity service is switched on; we will email you the moment it is."}</p><p>— The DigitalBurj Academy team</p>`),
  }).catch(() => {});
  return ok({ ok: true, kind });
}

async function run(b, deps) {
  b = b && typeof b === "object" ? b : {};
  if (b.website) return ok({ ok: true }); // honeypot
  switch (b.action) {
    case "quote": return ok({ ok: true, quote: quote(b) });
    case "enroll": return enroll(b, deps);
    case "support": return support(b, deps);
    case "register": return register(b, deps);
    default:
      if (Object.prototype.hasOwnProperty.call(auth.actions, b.action)) return auth.actions[b.action](b, deps);
      return fail(400, "Unknown action.");
  }
}

// Per-IP rate classes: cheap reads are generous (the app calls `me` on every navigation), credential and
// email-sending actions are tight. Per-account lockout for sign-in lives in the auth module.
const RATE = { read: { n: 120, bucket: "|r" }, auth: { n: 20, bucket: "|a" }, mail: { n: 10, bucket: "|m" } };
const READS = ["quote", "me", "welcome", "signout", "verify"], AUTH = ["signin", "signup", "forgot", "reset", "resend"];
const rateClass = (action) => (READS.includes(action) ? RATE.read : AUTH.includes(action) ? RATE.auth : RATE.mail);

module.exports = { run, quote, webhook: auth.webhook, rateClass };
