// Run with: npm test   (no dependencies)
const assert = require("assert");
const DBA = require("../dist/academy-shared.js");
const { run } = require("./_academy");

// Catalogue integrity: every bundle include resolves, no duplicate ids.
const ids = [...DBA.COURSES, ...DBA.BUNDLES].map((x) => x.id);
assert.strictEqual(new Set(ids).size, ids.length, "duplicate ids");
DBA.BUNDLES.forEach((b) => b.includes.forEach((c) => assert(DBA.course(c), `${b.id} -> unknown ${c}`)));
DBA.BUNDLES.forEach((b) => assert(b.price >= 3 && b.price <= 50, `${b.id} outside $3–$50`));

// Only Live products are purchasable.
assert(DBA.isLive("b-starter") && DBA.isLive("b-ai") && DBA.isLive("DB-08"));
assert(DBA.isLive("b-office") && DBA.isLive("PC-AD01") && DBA.isLive("b-complete") && !DBA.isLive("nope"));

// Coupon: exact code, case-insensitive, 100% off Live only, never on non-Live.
let q = DBA.quote(["b-web", "b-complete"], "DIGITALBURJ100");   // every product is Live now: both are covered by the promotion
assert.strictEqual(q.coupon.state, "applied");
assert.strictEqual(q.total, 0);
assert.strictEqual(q.lines.length, 2);
assert.strictEqual(DBA.quote(["nope"], "DIGITALBURJ100").blocked[0].id, "nope");
assert.strictEqual(DBA.quote(["b-web"], "digitalburj101").coupon.state, "invalid");
assert.strictEqual(DBA.quote(["b-web"], "digitalburj101").total, 9);
assert.strictEqual(DBA.quote(["nope"], "digitalburj100").coupon.state, "not-eligible");
// Upgrade credit: own DB-01 ($5) then buy Web Essentials ($9) -> $4.
assert.strictEqual(DBA.quote(["b-web"], "", ["DB-01"]).total, 4);

(async () => {
  const sent = [];
  const deps = { env: { RESEND_API_KEY: "k" }, resend: async (p, b) => { sent.push(b.subject); return { ok: true, status: 200, json: {} }; } };
  const good = { action: "enroll", name: "Ann Lee", email: "ann@example.com", consent: true, items: ["DB-03"] };
  let r = await run(good, deps);
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.entitlementGranted, false);
  assert(/payments are not live/i.test(r.json.status));
  assert.strictEqual((await run({ ...good, consent: false }, deps)).status, 400, "consent required");
  assert.strictEqual((await run({ ...good, items: ["nope"] }, deps)).status, 400, "unknown product blocked");
  const free = { ...good, items: ["DB-00"], coupon: "digitalburj100" };
  assert.strictEqual((await run(free, deps)).status, 400, "zero-payable needs explicit confirmation");
  r = await run({ ...free, confirmZero: true }, deps);
  assert.strictEqual(r.status, 200); assert.strictEqual(r.json.quote.total, 0); assert.strictEqual(r.json.entitlementGranted, false);
  assert.strictEqual((await run(good, { env: {}, resend: null })).status, 503, "no mail service -> setup required, never fake success");
  assert.strictEqual((await run({ action: "support", name: "Ann", email: "bad", message: "x" }, deps)).status, 400);
  assert.strictEqual((await run({ action: "nope" }, deps)).status, 400);
  assert.strictEqual((await run({ action: "enroll", website: "spam" }, deps)).status, 200, "honeypot is silently accepted");
  console.log("academy tests passed");
})().catch((e) => { console.error(e); process.exit(1); });
