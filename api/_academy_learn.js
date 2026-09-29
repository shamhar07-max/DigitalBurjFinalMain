// Academy learning, credentials, documents, demo sandbox and admin actions.
// Same rules as the auth module: everything is decided on the server; the browser only renders.
const DBA = require("../dist/academy-shared.js");
const ANSWERS = require("./_academy_answers.js");
const A = require("./_academy_auth.js");
const { K, getJSON, putJSON, clean, normEmail, ok, fail, rid, esc, cfg, sessionUser, entitlement, addOrder, ready } = A._;

const KEY = {
  prog: (e) => `acad:prog:${e}`, sub: (id) => `acad:sub:${id}`, cred: (id) => `acad:cred:${id}`, credu: (e, c) => `acad:credu:${e}:${c}`,
};
const adminSet = (deps) => new Set(String((deps.env && deps.env.ADMIN_EMAILS) || "").toLowerCase().split(/[,\s;]+/).filter(Boolean));
const isAdmin = (deps, u) => !!u && u.verified && !u.demo && !u.suspended && adminSet(deps).has(u.email);
const courseOf = (id) => DBA.course(id);
const unitCount = (id) => (ANSWERS[id] || []).length;

async function listAll(kv, prefix, cap) {
  if (!kv.list) return [];
  const out = []; let cursor;
  do {
    const r = await kv.list(prefix, cursor);
    out.push(...r.keys); cursor = r.cursor;
  } while (cursor && out.length < (cap || 2000));
  return out.slice(0, cap || 2000);
}

/* ------------------------------------------------------------------ helpers */
async function learner(b, deps, needCourse) {
  const bad = ready(deps); if (bad) return { err: bad };
  const user = await sessionUser(deps);
  if (!user || user.suspended) return { err: fail(401, "Sign in first.") };
  if (!user.verified) return { err: fail(403, "Verify your email to unlock your courses.") };
  const ent = await entitlement(deps, user.email);
  let course = null;
  if (needCourse) {
    course = clean(b.course, 20);
    if (!ANSWERS[course] || !courseOf(course)) return { err: fail(400, "Unknown course.") };
    if (!ent.courses.includes(course)) return { err: fail(403, "You do not have access to this course yet.") };
  }
  return { user, ent, course };
}
const emptyCourse = (id) => ({ units: Array(unitCount(id)).fill(null), lab: null });
async function getProg(deps, email) { return (await getJSON(deps.kv, KEY.prog(email))) || { courses: {} }; }
function courseProg(p, id) { const c = p.courses[id] || (p.courses[id] = emptyCourse(id)); while (c.units.length < unitCount(id)) c.units.push(null); return c; }
const allUnitsDone = (c) => c.units.length > 0 && c.units.every(Boolean);

async function issueCredential(deps, user, courseId, kind) {
  const idKey = KEY.credu(user.email, courseId);
  let id = await deps.kv.get(idKey), cred = id ? await getJSON(deps.kv, KEY.cred(id)) : null;
  const c = courseOf(courseId);
  if (!cred) {
    id = `DBA-${courseId}-${rid("X").slice(2)}`;
    cred = { id, email: user.email, name: user.name, course: courseId, title: c.title, hours: c.hours, kind, demo: !!user.demo, issued: new Date().toISOString(), revoked: false };
  } else if (kind === "assessed") { cred.kind = "assessed"; cred.assessedAt = new Date().toISOString(); }
  await putJSON(deps.kv, KEY.cred(id), cred); await deps.kv.put(idKey, id);
  return cred;
}
const credView = (c) => ({ id: c.id, name: c.name, course: c.course, title: c.title, hours: c.hours, kind: c.kind, demo: !!c.demo, issued: c.issued, assessedAt: c.assessedAt || null, revoked: !!c.revoked });

/* ------------------------------------------------------------------ learner actions */
async function progress(b, deps) {
  const { err, user, ent } = await learner(b, deps, false); if (err) return err;
  const p = await getProg(deps, user.email);
  const creds = [];
  for (const id of ent.courses) { const cid = await deps.kv.get(KEY.credu(user.email, id)); if (cid) { const c = await getJSON(deps.kv, KEY.cred(cid)); if (c) creds.push(credView(c)); } }
  const subs = [];
  for (const id of ent.courses) { const c = p.courses[id]; if (c && c.lab) subs.push({ course: id, ...c.lab }); }
  const out = {};
  for (const id of ent.courses) out[id] = courseProg(p, id);
  return ok({ ok: true, courses: out, credentials: creds, submissions: subs });
}

async function checkpoint(b, deps) {
  const { err, user, course } = await learner(b, deps, true); if (err) return err;
  const u = Number(b.unit), key = ANSWERS[course], answers = Array.isArray(b.answers) ? b.answers.map(Number) : null;
  if (!Number.isInteger(u) || u < 0 || u >= key.length || !answers || answers.length !== key[u].length || !answers.every(Number.isInteger)) return fail(400, "Invalid answer.");
  const p = await getProg(deps, user.email), c = courseProg(p, course);
  const results = answers.map((a, i) => a === key[u][i]);
  const correct = results.every(Boolean);
  if (correct && !c.units[u]) { c.units[u] = new Date().toISOString(); await putJSON(deps.kv, KEY.prog(user.email), p); }
  return ok({ ok: true, correct, results, done: !!c.units[u], allDone: allUnitsDone(c), completed: c.units.filter(Boolean).length, total: key.length });
}

async function submit(b, deps) {
  const { err, user, course } = await learner(b, deps, true); if (err) return err;
  const p = await getProg(deps, user.email), c = courseProg(p, course);
  if (!allUnitsDone(c)) return fail(400, "Pass every checkpoint before submitting your lab evidence.");
  if (c.lab && (c.lab.status === "submitted" || c.lab.status === "approved")) return fail(409, c.lab.status === "approved" ? "This lab is already approved." : "Your submission is waiting for review.");
  const text = clean(b.text, 5000), link = clean(b.link, 300);
  if (text.length < 80) return fail(400, "Please write at least 80 characters of evidence so a reviewer can assess it.");
  if (link && !/^https?:\/\/[^\s]+$/i.test(link)) return fail(400, "The evidence link must start with http:// or https://.");
  const id = rid("SUB"), now = new Date().toISOString();
  const sub = { id, email: user.email, name: user.name, course, title: courseOf(course).title, text, link, at: now, status: "submitted", feedback: "", demo: !!user.demo, attempt: ((c.lab && c.lab.attempt) || 0) + 1 };
  c.lab = { id, status: "submitted", at: now, attempt: sub.attempt, feedback: "", text, link };
  await putJSON(deps.kv, KEY.sub(id), sub);
  await putJSON(deps.kv, KEY.prog(user.email), p);
  let cred = await issueCredential(deps, user, course, "completion");
  if (user.demo) { // demo sandbox: reviewed automatically so every state can be explored
    sub.status = "approved"; sub.feedback = "Demo sandbox: automatically approved."; sub.reviewer = "demo";
    c.lab.status = "approved"; c.lab.feedback = sub.feedback;
    await putJSON(deps.kv, KEY.sub(id), sub); await putJSON(deps.kv, KEY.prog(user.email), p);
    cred = await issueCredential(deps, user, course, "assessed");
  }
  return ok({ ok: true, status: c.lab.status, credential: credView(cred) });
}

// Public verification: anyone holding the credential ID can confirm it.
async function credential(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const id = clean(b.id, 60).toUpperCase();
  const c = /^DBA-[A-Z0-9-]+$/.test(id) ? await getJSON(deps.kv, KEY.cred(id)) : null;
  if (!c) return fail(404, "No credential with that ID was found.");
  return ok({ ok: true, credential: credView(c) });
}

// Order paperwork (invoice / receipt) for the signed-in owner. Amounts come from the stored order only.
async function document(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const user = await sessionUser(deps); if (!user) return fail(401, "Sign in first.");
  const target = normEmail(b.email);
  if (target && target !== user.email && !isAdmin(deps, user)) return fail(403, "Not allowed.");
  const email = target || user.email;
  const ent = await entitlement(deps, email), order = ent.orders.find((o) => o.id === clean(b.order, 80));
  if (!order) return fail(404, "Order not found.");
  const owner = await getJSON(deps.kv, K.user(email));
  const lines = order.items.map((id) => { const x = DBA.bundle(id) || DBA.course(id) || {}; return { id, title: x.name || x.title || id, price: x.price || 0 }; });
  const list = lines.reduce((n, l) => n + l.price, 0);
  return ok({ ok: true, order: { id: order.id, ref: order.ref || order.id, date: order.date, amount: order.amount, currency: order.currency || "USD", source: order.source, status: order.status, coupon: order.coupon || "", demo: !!order.demo }, lines, listTotal: list, customer: { name: owner ? owner.name : "", email, country: owner ? owner.country || "" : "" } });
}

/* ------------------------------------------------------------------ demo sandbox */
async function demo(b, deps) {
  const bad = ready(deps); if (bad) return bad;
  const name = clean(b.name, 80) || "Demo Learner";
  const email = `demo-${rid("D").slice(2).toLowerCase()}@demo.digitalburj.com`;
  const pwRandom = await A.hashPassword(rid("PW") + rid("PW")); // nobody knows it: demo accounts are session-only
  const user = { name, email, pw: pwRandom, role: "learner", verified: true, demo: true, sv: 1, createdAt: new Date().toISOString() };
  await putJSON(deps.kv, K.user(email), user, 60 * 60 * 24 * 30);
  await addOrder(deps, email, { id: rid("DEMO"), source: "demo", demo: true, items: ["b-complete"], amount: 0, currency: DBA.CURRENCY, date: user.createdAt, status: "active" });
  return ok({ ok: true, user: A._.publicUser(user) }, await A._.startSession(deps, user));
}

/* ------------------------------------------------------------------ admin */
const DEMO_STATS = () => ({
  demo: true, users: 128, verified: 117, demoAccounts: 9, orders: 96, revenue: 1412, refunded: 3, pendingReviews: 4, credentials: 61, assessed: 38,
  bySold: [["b-ai", 27], ["b-starter", 22], ["b-web", 19], ["b-fullstack", 9], ["DB-00", 11]],
  recent: [["ada@example.com", "AI-Native Builder", 19], ["omar@example.com", "Starter Pack", 3], ["mina@example.com", "Web Essentials", 9]],
});
async function adminGate(deps, write) {
  const bad = ready(deps); if (bad) return { err: bad };
  const user = await sessionUser(deps);
  if (!user) return { err: fail(401, "Sign in first.") };
  if (user.demo) return write ? { err: fail(403, "The demo admin is read-only.") } : { user, demo: true };
  if (!isAdmin(deps, user)) return { err: fail(403, "Admin access required.") };
  return { user };
}
async function adminOverview(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, stats: DEMO_STATS() });
  const users = await listAll(deps.kv, "acad:user:"), ents = await listAll(deps.kv, "acad:ent:"), subs = await listAll(deps.kv, "acad:sub:"), creds = await listAll(deps.kv, "acad:cred:");
  let orders = 0, revenue = 0, refunded = 0; const sold = {}, recent = [];
  for (const k of ents) {
    const e = await getJSON(deps.kv, k); if (!e) continue;
    for (const o of e.orders) {
      if (o.demo) continue;
      orders++; if (o.status === "refunded") refunded++; else if (o.source === "stripe") revenue += o.amount || 0;
      if (o.status !== "refunded") o.items.forEach((i) => (sold[i] = (sold[i] || 0) + 1));
      recent.push([k.slice("acad:ent:".length), o.items.map((i) => (DBA.bundle(i) || DBA.course(i) || {}).name || (DBA.course(i) || {}).title || i).join(", "), o.amount || 0, o.date, o.source]);
    }
  }
  let verified = 0, demoAccounts = 0; const real = [];
  for (const k of users) { const u = await getJSON(deps.kv, k); if (!u) continue; if (u.demo) demoAccounts++; else { real.push(u); if (u.verified) verified++; } }
  let pending = 0; for (const k of subs) { const s = await getJSON(deps.kv, k); if (s && s.status === "submitted" && !s.demo) pending++; }
  let assessed = 0, nCred = 0; for (const k of creds) { const c = await getJSON(deps.kv, k); if (c && !c.demo) { nCred++; if (c.kind === "assessed") assessed++; } }
  recent.sort((a, b2) => String(b2[3]).localeCompare(String(a[3])));
  return ok({ ok: true, stats: { users: real.length, verified, demoAccounts, orders, revenue, refunded, pendingReviews: pending, credentials: nCred, assessed, bySold: Object.entries(sold).sort((a, b2) => b2[1] - a[1]).slice(0, 8), recent: recent.slice(0, 8) } });
}
async function adminUsers(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, demo: true, users: [["ada@example.com", "Ada Byron", true, 4, "2026-09-01"], ["omar@example.com", "Omar K.", true, 1, "2026-09-10"], ["mina@example.com", "Mina S.", false, 0, "2026-09-25"]].map((r) => ({ email: r[0], name: r[1], verified: r[2], courses: r[3], createdAt: r[4], suspended: false })) });
  const q = clean(b.q, 80).toLowerCase(), out = [];
  for (const k of await listAll(deps.kv, "acad:user:", 1500)) {
    const u = await getJSON(deps.kv, k); if (!u || u.demo) continue;
    if (q && !(u.email.includes(q) || String(u.name).toLowerCase().includes(q))) continue;
    const ent = await entitlement(deps, u.email);
    out.push({ email: u.email, name: u.name, verified: !!u.verified, suspended: !!u.suspended, courses: ent.courses.length, createdAt: u.createdAt, country: u.country || "" });
  }
  out.sort((a, b2) => String(b2.createdAt).localeCompare(String(a.createdAt)));
  return ok({ ok: true, users: out.slice(0, 200), total: out.length });
}
async function adminUser(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, demo: true, user: { email: clean(b.email, 200), name: "Sample learner", verified: true }, orders: [], credentials: [] });
  const email = normEmail(b.email), u = await getJSON(deps.kv, K.user(email));
  if (!u) return fail(404, "No such user.");
  const ent = await entitlement(deps, email), creds = [];
  for (const id of ent.courses) { const cid = await deps.kv.get(KEY.credu(email, id)); if (cid) { const c = await getJSON(deps.kv, KEY.cred(cid)); if (c) creds.push(credView(c)); } }
  return ok({ ok: true, user: { email, name: u.name, verified: !!u.verified, suspended: !!u.suspended, country: u.country || "", goal: u.goal || "", createdAt: u.createdAt }, orders: ent.orders, credentials: creds });
}
async function adminGrant(b, deps) {
  const g = await adminGate(deps, true); if (g.err) return g.err;
  const email = normEmail(b.email), u = await getJSON(deps.kv, K.user(email));
  if (!u) return fail(404, "No such user.");
  const items = (Array.isArray(b.items) ? b.items : []).map((x) => clean(x, 40)).filter((x) => DBA.bundle(x) || DBA.course(x)).slice(0, 20);
  if (!items.length) return fail(400, "Choose at least one course or bundle.");
  const order = { id: rid("ADM"), source: "admin", grantedBy: g.user.email, note: clean(b.note, 200), items, amount: 0, currency: DBA.CURRENCY, date: new Date().toISOString(), status: "active" };
  await addOrder(deps, email, order);
  return ok({ ok: true, order });
}
async function adminRevoke(b, deps) {
  const g = await adminGate(deps, true); if (g.err) return g.err;
  const email = normEmail(b.email), ent = await getJSON(deps.kv, K.ent(email)), o = ent && ent.orders.find((x) => x.id === clean(b.order, 80));
  if (!o) return fail(404, "Order not found.");
  o.status = "refunded"; o.refundedAt = new Date().toISOString(); o.revokedBy = `admin:${g.user.email}`;
  await putJSON(deps.kv, K.ent(email), ent);
  return ok({ ok: true });
}
async function adminSuspend(b, deps) {
  const g = await adminGate(deps, true); if (g.err) return g.err;
  const email = normEmail(b.email), u = await getJSON(deps.kv, K.user(email));
  if (!u) return fail(404, "No such user.");
  if (adminSet(deps).has(email)) return fail(400, "An admin account cannot be suspended here.");
  u.suspended = b.on !== false; u.sv = (u.sv || 1) + 1; // bumping the session version signs them out everywhere
  await putJSON(deps.kv, K.user(email), u);
  return ok({ ok: true, suspended: u.suspended });
}
async function adminSubmissions(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, demo: true, submissions: [{ id: "SUB-DEMO1", name: "Ada Byron", email: "ada@example.com", title: "Digital Foundations", status: "submitted", at: "2026-09-27T10:00:00Z", text: "Cleaned the inventory into 5 columns and renamed the file 2026-09-27_stock_v1. Shared view-only with the two shop assistants.", link: "", attempt: 1 }] });
  const want = clean(b.status, 20) || "submitted", out = [];
  for (const k of await listAll(deps.kv, "acad:sub:", 1500)) { const s = await getJSON(deps.kv, k); if (s && !s.demo && (want === "all" || s.status === want)) out.push(s); }
  out.sort((a, b2) => String(b2.at).localeCompare(String(a.at)));
  return ok({ ok: true, submissions: out.slice(0, 100) });
}
async function adminReview(b, deps) {
  const g = await adminGate(deps, true); if (g.err) return g.err;
  const s = await getJSON(deps.kv, KEY.sub(clean(b.id, 40)));
  if (!s) return fail(404, "Submission not found.");
  const decision = b.decision === "approve" ? "approve" : b.decision === "changes" ? "changes" : "";
  if (!decision) return fail(400, "Choose approve or request changes.");
  const feedback = clean(b.feedback, 1500);
  if (decision === "changes" && feedback.length < 10) return fail(400, "Explain what needs to change (10+ characters).");
  s.status = decision === "approve" ? "approved" : "changes"; s.feedback = feedback; s.reviewer = g.user.email; s.reviewedAt = new Date().toISOString();
  await putJSON(deps.kv, KEY.sub(s.id), s);
  const p = await getProg(deps, s.email), c = courseProg(p, s.course);
  if (c.lab && c.lab.id === s.id) { c.lab.status = s.status; c.lab.feedback = feedback; await putJSON(deps.kv, KEY.prog(s.email), p); }
  const u = await getJSON(deps.kv, K.user(s.email));
  if (decision === "approve" && u) await issueCredential(deps, u, s.course, "assessed");
  return ok({ ok: true, status: s.status });
}
async function adminOrders(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, demo: true, orders: [] });
  const out = [];
  for (const k of await listAll(deps.kv, "acad:ent:", 1500)) { const e = await getJSON(deps.kv, k); if (e) e.orders.forEach((o) => { if (!o.demo) out.push({ ...o, email: k.slice("acad:ent:".length) }); }); }
  out.sort((a, b2) => String(b2.date).localeCompare(String(a.date)));
  return ok({ ok: true, orders: out.slice(0, 200) });
}
async function adminCredentials(b, deps) {
  const g = await adminGate(deps, false); if (g.err) return g.err;
  if (g.demo) return ok({ ok: true, demo: true, credentials: [] });
  const out = [];
  for (const k of await listAll(deps.kv, "acad:cred:", 1500)) { const c = await getJSON(deps.kv, k); if (c && !c.demo) out.push({ ...credView(c), email: c.email }); }
  out.sort((a, b2) => String(b2.issued).localeCompare(String(a.issued)));
  return ok({ ok: true, credentials: out.slice(0, 200) });
}
async function adminCredentialRevoke(b, deps) {
  const g = await adminGate(deps, true); if (g.err) return g.err;
  const c = await getJSON(deps.kv, KEY.cred(clean(b.id, 60).toUpperCase()));
  if (!c) return fail(404, "Credential not found.");
  c.revoked = b.on !== false; await putJSON(deps.kv, KEY.cred(c.id), c);
  return ok({ ok: true, revoked: c.revoked });
}

const actions = {
  demo, progress, checkpoint, submit, credential, document,
  admin_overview: adminOverview, admin_users: adminUsers, admin_user: adminUser, admin_grant: adminGrant, admin_revoke: adminRevoke,
  admin_suspend: adminSuspend, admin_submissions: adminSubmissions, admin_review: adminReview, admin_orders: adminOrders,
  admin_credentials: adminCredentials, admin_credential_revoke: adminCredentialRevoke,
};
module.exports = { actions, isAdmin, adminSet };
