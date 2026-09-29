// Run with: npm test — learning progress, credentials, documents, demo sandbox and admin (in-memory KV).
const assert = require("assert");
const { run } = require("./_academy");
const A = require("./_academy_auth");
const ANSWERS = require("./_academy_answers.js");
const CUR = require("../curriculum/src.js");

const mem = new Map();
const kv = {
  get: async (k) => (mem.has(k) ? mem.get(k) : null), put: async (k, v) => void mem.set(k, v), delete: async (k) => void mem.delete(k),
  list: async (prefix) => ({ keys: [...mem.keys()].filter((k) => k.startsWith(prefix)), cursor: null }),
};
const mails = [];
const env = { SESSION_SECRET: "test-secret-0123456789", RESEND_API_KEY: "k", ADMIN_EMAILS: "boss@example.com", APP_ORIGIN: "https://academy.digitalburj.com" };
const resend = async (p, b) => { mails.push({ p, ...b }); return { ok: true, status: 200, json: {} }; };
const dep = (cookie) => ({ env, resend, kv, req: { cookie: cookie || "" } });
const ck = (r) => (r.cookies && r.cookies[0] ? r.cookies[0].split(";")[0] : "");
const token = (subject) => decodeURIComponent(/token=([^"&]+)/.exec(mails.filter((m) => m.subject && m.subject.includes(subject)).pop().html)[1]);
const call = (cookie, b) => run(b, dep(cookie));
async function register(name, email) {
  const s = await call("", { action: "signup", name, email, password: "Quartz-Lantern-91", consent: true });
  await call("", { action: "verify", token: token("Verify") });
  return ck(s);
}
async function passCourse(cookie, course) {
  for (let u = 0; u < ANSWERS[course].length; u++) {
    const wrong = (ANSWERS[course][u] + 1) % CUR[course].units[u].q.o.length;
    let r = await call(cookie, { action: "checkpoint", course, unit: u, answer: wrong }); assert.strictEqual(r.json.correct, false, "wrong answer");
    r = await call(cookie, { action: "checkpoint", course, unit: u, answer: ANSWERS[course][u] }); assert.strictEqual(r.json.correct, true);
  }
}
const EVIDENCE = "Cleaned the inventory into five columns, renamed the file 2026-03-14_stock_v1 and shared it view-only with two named colleagues.";

(async () => {
  // curriculum integrity: every unit has exactly one valid answer key
  assert.strictEqual(Object.keys(CUR).length, 14);
  for (const [id, c] of Object.entries(CUR)) { assert.strictEqual(c.units.length, ANSWERS[id].length); assert(c.lab && c.lab.rows.length >= 3 && c.lab.tasks.length >= 3, id + " lab"); }

  // ---- signed out / unowned
  assert.strictEqual((await call("", { action: "progress" })).status, 401);
  const learner = await register("Lena Park", "lena@example.com");
  assert.strictEqual((await call(learner, { action: "checkpoint", course: "DB-00", unit: 0, answer: 1 })).status, 403, "course not owned");
  assert.strictEqual((await call(learner, { action: "checkpoint", course: "XX-99", unit: 0, answer: 1 })).status, 400);
  await A._.addOrder(dep(), "lena@example.com", { id: "cs_l1", ref: "ORD-L1", source: "stripe", items: ["DB-00"], amount: 3, currency: "USD", date: new Date().toISOString(), status: "active" });

  // ---- checkpoints are graded on the server
  let r = await call(learner, { action: "submit", course: "DB-00", text: EVIDENCE });
  assert.strictEqual(r.status, 400, "cannot submit before passing every checkpoint");
  await passCourse(learner, "DB-00");
  r = await call(learner, { action: "progress" });
  assert(r.json.courses["DB-00"].units.every(Boolean), "progress saved");
  assert.strictEqual((await call(learner, { action: "submit", course: "DB-00", text: "too short" })).status, 400);
  assert.strictEqual((await call(learner, { action: "submit", course: "DB-00", text: EVIDENCE, link: "javascript:alert(1)" })).status, 400, "unsafe link rejected");
  r = await call(learner, { action: "submit", course: "DB-00", text: EVIDENCE, link: "https://example.com/work" });
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.status, "submitted"); assert.strictEqual(r.json.credential.kind, "completion");
  const credId = r.json.credential.id;
  assert.strictEqual((await call(learner, { action: "submit", course: "DB-00", text: EVIDENCE })).status, 409, "already waiting for review");

  // ---- public verification shows completion, not "assessed"
  r = await call("", { action: "credential", id: credId.toLowerCase() });
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.credential.kind, "completion"); assert.strictEqual(r.json.credential.name, "Lena Park");
  assert.strictEqual((await call("", { action: "credential", id: "DBA-NOPE" })).status, 404);

  // ---- documents: owner only
  r = await call(learner, { action: "document", order: "cs_l1" });
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.order.amount, 3); assert.strictEqual(r.json.lines[0].title, "Digital Foundations"); assert.strictEqual(r.json.customer.email, "lena@example.com");
  const other = await register("Omar Ali", "omar@example.com");
  assert.strictEqual((await call(other, { action: "document", order: "cs_l1" })).status, 404, "other users cannot see the order");
  assert.strictEqual((await call(other, { action: "document", order: "cs_l1", email: "lena@example.com" })).status, 403);

  // ---- admin gate
  assert.strictEqual((await call(learner, { action: "admin_overview" })).status, 403, "learners are not admins");
  assert.strictEqual((await call("", { action: "admin_overview" })).status, 401);
  const admin = await register("Boss Person", "boss@example.com");
  assert.strictEqual((await call(admin, { action: "me" })).json.admin, true);
  assert.strictEqual((await call(learner, { action: "me" })).json.admin, false);
  r = await call(admin, { action: "admin_overview" });
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.stats.users, 3); assert.strictEqual(r.json.stats.pendingReviews, 1); assert.strictEqual(r.json.stats.revenue, 3);
  r = await call(admin, { action: "admin_submissions" }); assert.strictEqual(r.json.submissions.length, 1);
  const subId = r.json.submissions[0].id;
  assert.strictEqual((await call(admin, { action: "admin_review", id: subId, decision: "changes", feedback: "x" })).status, 400, "feedback required");
  assert.strictEqual((await call(learner, { action: "admin_review", id: subId, decision: "approve" })).status, 403);
  await call(admin, { action: "admin_review", id: subId, decision: "changes", feedback: "Please show the new file name explicitly." });
  r = await call(learner, { action: "progress" }); assert.strictEqual(r.json.courses["DB-00"].lab.status, "changes"); assert.match(r.json.courses["DB-00"].lab.feedback, /file name/);
  r = await call(learner, { action: "submit", course: "DB-00", text: EVIDENCE + " New name: 2026-03-14_stock_v1." });
  assert.strictEqual(r.status, 200, "resubmission after requested changes"); assert.strictEqual(r.json.credential.id, credId, "same credential id");
  const sub2 = (await call(admin, { action: "admin_submissions" })).json.submissions[0].id;
  await call(admin, { action: "admin_review", id: sub2, decision: "approve", feedback: "Great." });
  r = await call("", { action: "credential", id: credId }); assert.strictEqual(r.json.credential.kind, "assessed");
  await call(admin, { action: "admin_credential_revoke", id: credId, on: true });
  assert.strictEqual((await call("", { action: "credential", id: credId })).json.credential.revoked, true);

  // ---- admin grant / revoke / suspend
  r = await call(admin, { action: "admin_grant", email: "omar@example.com", items: ["b-web", "bogus"], note: "scholarship" });
  assert.strictEqual(r.status, 200); assert.deepStrictEqual(r.json.order.items, ["b-web"]);
  r = await call(other, { action: "progress" }); assert.deepStrictEqual(Object.keys(r.json.courses).sort(), ["DB-01", "DB-02", "DB-03"]);
  await call(admin, { action: "admin_revoke", email: "omar@example.com", order: r.json && (await call(admin, { action: "admin_user", email: "omar@example.com" })).json.orders[0].id });
  assert.deepStrictEqual(Object.keys((await call(other, { action: "progress" })).json.courses), []);
  assert.strictEqual((await call(admin, { action: "admin_suspend", email: "boss@example.com" })).status, 400, "cannot suspend an admin");
  await call(admin, { action: "admin_suspend", email: "omar@example.com", on: true });
  assert.strictEqual((await call(other, { action: "me" })).json.signedIn, false, "suspension signs the user out");
  assert.strictEqual((await call("", { action: "signin", email: "omar@example.com", password: "Quartz-Lantern-91" })).status, 403);
  assert.strictEqual((await call(admin, { action: "admin_users", q: "lena" })).json.users.length, 1);
  assert.strictEqual((await call(admin, { action: "admin_orders" })).json.orders.length, 2);

  // ---- demo sandbox: everything unlocked, labelled, read-only admin, auto-reviewed lab
  r = await call("", { action: "demo" }); assert.strictEqual(r.status, 200); assert.strictEqual(r.json.user.demo, true);
  const demo = ck(r);
  r = await call(demo, { action: "me" }); assert.strictEqual(r.json.entitlements.courses.length, 14); assert.strictEqual(r.json.admin, false);
  await passCourse(demo, "PC-AC01");
  r = await call(demo, { action: "submit", course: "PC-AC01", text: EVIDENCE + " Reconciled bank to ledger; journal for the fee." });
  assert.strictEqual(r.json.status, "approved"); assert.strictEqual(r.json.credential.demo, true); assert.strictEqual(r.json.credential.kind, "assessed");
  assert.strictEqual((await call(demo, { action: "admin_overview" })).json.stats.demo, true, "demo admin preview");
  assert.strictEqual((await call(demo, { action: "admin_grant", email: "lena@example.com", items: ["b-web"] })).status, 403, "demo admin is read-only");
  assert.strictEqual((await call("", { action: "signup", name: "Fake Demo", email: "x@demo.digitalburj.com", password: "Quartz-Lantern-91", consent: true })).status, 400);
  r = await call(admin, { action: "admin_overview" }); assert.strictEqual(r.json.stats.users, 3, "demo accounts are not counted as users"); assert.strictEqual(r.json.stats.demoAccounts, 1);

  console.log("academy learn tests passed");
})().catch((e) => { console.error(e); process.exit(1); });
