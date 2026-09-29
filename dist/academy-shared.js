/* DigitalBurj Academy — shared catalogue, pricing and API client.
 * One source of truth used by the storefront (/academy), the learner workspace (/academy/workspace)
 * and the serverless endpoint (api/academy.js + cloudflare/worker.js), so a price can never differ
 * between what a visitor sees and what the server quotes. Plain UMD: no dependencies, no build step. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.DBA = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CURRENCY = "USD";

  /* status: live = purchasable · pilot = controlled cohort, waitlist · planned = waitlist */
  var COURSES = [
    { id: "DB-00", title: "Digital Foundations", pillar: "Technology", desc: "Device, browser and account safety; files, naming and structured data; online communication; permissions, privacy and sharing; AI literacy; basic workflow mapping.", price: 3, hours: 15, level: "Foundation", status: "live" },
    { id: "DB-01", title: "Product Discovery & Validation", pillar: "Technology", desc: "Stakeholder interviews, user journeys, problem validation, measurable outcomes and the Build / Reshape / Stop recommendation.", price: 5, hours: 28, level: "Skill", status: "live" },
    { id: "DB-02", title: "Interface Design & Accessibility", pillar: "Technology", desc: "Information architecture, user flows, wireframes, UI, design systems, accessibility and interactive prototypes.", price: 5, hours: 38, level: "Skill", status: "live" },
    { id: "DB-03", title: "Web Workflow Engineering", pillar: "Technology", desc: "Forms, validation, data display, navigation, error handling and permission-aware frontend engineering.", price: 7, hours: 50, level: "Skill", status: "live" },
    { id: "DB-04", title: "Backend, Database & API Contracts", pillar: "Technology", desc: "Records, authorization, audit, migrations and API contract design with server-enforced permissions.", price: 7, hours: 50, level: "Skill", status: "live" },
    { id: "DB-05", title: "AI-Native Engineering Practice", pillar: "Technology", desc: "Precise task briefs, inspecting diffs, running code, debugging, dependency claims, documenting AI contribution.", price: 8, hours: 35, level: "Specialist", status: "live" },
    { id: "DB-06", title: "Operations, Monitoring & Incident Handling", pillar: "Technology", desc: "Staging deployment, monitoring, defect response, backup and restore, explaining limitations.", price: 6, hours: 28, level: "Specialist", status: "live" },
    { id: "DB-07", title: "Client Delivery & Handoff", pillar: "Technology", desc: "Scope, estimating, change request discipline, handoff packaging, responsible marketing and support.", price: 6, hours: 26, level: "Specialist", status: "live" },
    { id: "DB-08", title: "DB-22 Final Assessment Challenge", pillar: "Technology", desc: "A fresh fictional SME workflow, timed change request and live defence with an independent verifier.", price: 12, hours: 18, level: "Advanced", status: "live" },
    { id: "PC-AD01", title: "Office Administration", pillar: "Professional", desc: "Calendar, inbox, meetings, procurement, spreadsheet controls, confidential information and escalation.", price: 10, hours: 55, level: "Career", status: "pilot" },
    { id: "PC-LG01", title: "Logistics & Freight Operations", pillar: "Professional", desc: "Shipment lifecycle, documents, quotes, milestones, exception handling, warehouse handoffs and reconciliation.", price: 12, hours: 70, level: "Career", status: "pilot" },
    { id: "PC-CS01", title: "Customer Service", pillar: "Professional", desc: "Response handling, complaint management, escalation, tone and records.", price: 8, hours: 38, level: "Career", status: "planned" },
    { id: "PC-PR01", title: "Procurement", pillar: "Professional", desc: "Sourcing, RFQ, vendor evaluation, purchase orders, three-way match and contract basics.", price: 10, hours: 55, level: "Career", status: "planned" },
    { id: "PC-AC01", title: "Accounting Support", pillar: "Professional", desc: "Invoicing, accounts payable, reconciliation, month-end support and controls.", price: 10, hours: 55, level: "Career", status: "planned" }
  ];

  var BUNDLES = [
    { id: "b-starter", name: "Starter Pack", tagline: "Try Academy for $3", category: "starter", theme: "navy", featured: false, price: 3, includes: ["DB-00"], savings: null,
      desc: "The complete Digital Foundations course. Everything a digital novice needs to safely work with files, accounts and structured data — plus an assessed capstone." },
    { id: "b-web", name: "Web Essentials", tagline: "Discovery → Design → Build", category: "technology", theme: "navy", featured: false, price: 9, includes: ["DB-01", "DB-02", "DB-03"], savings: "$17 individual",
      desc: "The first three technology courses. Interview a client, design an accessible interface, and build a small web workflow." },
    { id: "b-ai", name: "AI-Native Builder", tagline: "Everything you need to ship with AI", category: "technology", theme: "ai", featured: true, price: 19, includes: ["DB-01", "DB-02", "DB-03", "DB-04", "DB-05"], savings: "$32 individual",
      desc: "Discovery, design, frontend, backend and AI-native engineering. The full stack of building a product responsibly with AI in the loop." },
    { id: "b-fullstack", name: "Full-Stack Product", tagline: "Enquiry to measurement", category: "technology", theme: "ai", featured: false, price: 29, includes: ["DB-01", "DB-02", "DB-03", "DB-04", "DB-05", "DB-06", "DB-07"], savings: "$44 individual",
      desc: "Seven courses covering the full product lifecycle from discovery through delivery, operations and client handoff." },
    { id: "b-office", name: "Office Career", tagline: "Administration-ready", category: "professional", theme: "professional", featured: false, price: 25, includes: ["DB-00", "PC-AD01", "PC-CS01"], savings: "$21 individual",
      desc: "Digital foundations plus office administration and customer service. A career bundle for administrative roles — opens as its courses go live." },
    { id: "b-logistics", name: "Logistics Career", tagline: "Freight & warehouse ready", category: "career", theme: "career", featured: false, price: 29, includes: ["DB-00", "PC-LG01", "PC-PR01"], savings: "$25 individual",
      desc: "Digital foundations plus logistics operations and procurement. Built for freight, warehouse and supply-chain roles — opens as its courses go live." },
    { id: "b-complete", name: "Complete Academy", tagline: "Every course. Lifetime access.", category: "complete", theme: "career", featured: false, price: 50, includes: ["DB-00", "DB-01", "DB-02", "DB-03", "DB-04", "DB-05", "DB-06", "DB-07", "DB-08", "PC-AD01", "PC-LG01", "PC-CS01", "PC-PR01", "PC-AC01"], savings: "$94 individual",
      desc: "The full catalogue — 14 courses across technology and professional careers, plus the DB-22 final challenge with independent verification — opens as every course goes live." }
  ];

  /* The exact 12-stage mission lifecycle (handbook §8). */
  var STAGES = [
    ["BRIEF", "Understand the scenario, audience, outcome, constraints and definition of done."],
    ["LEARN", "Study the concepts, patterns, tools and safety considerations the task needs."],
    ["INVESTIGATE", "Gather requirements, inspect evidence, identify risks and test assumptions."],
    ["TRY", "Perform a small guided experiment before committing to the full solution."],
    ["BUILD", "Create the requested artefact or workflow against the stated constraints."],
    ["BREAK", "Probe failure cases, edge cases, assumptions and resilience."],
    ["FIX", "Correct defects, improve decisions and document meaningful changes."],
    ["TEST", "Run appropriate checks and capture repeatable results."],
    ["EXPLAIN", "Explain choices, trade-offs, limitations and responsible use."],
    ["DEFEND", "Respond to questions, challenge and evidence-based review."],
    ["SHIP", "Package the result for the defined handoff without claiming production release."],
    ["EVIDENCE", "Submit the evidence pack, provenance, notes and consent choices for assessment."]
  ];

  /* Submission lifecycle (handbook §9). */
  var LIFECYCLE = ["Draft", "Submitted", "In Review", "Request Changes", "Resubmitted", "Approved", "Pending Verification", "Verified", "Evidence Issued"];

  /* Capability levels (handbook §9). */
  var CAPABILITY = [
    ["L1", "Guided basics", "Can follow guidance through foundational tasks."],
    ["L2", "Scenario capability", "Can complete a defined scenario with appropriate support."],
    ["L3", "Published assessment", "Has a recorded result from the academy assessment process."],
    ["L4", "Production delivery", "Separate claim: requires actual production delivery evidence — never created by course completion alone."],
    ["L5", "Repeated verified delivery", "Separate claim: requires repeated, independently verified delivery evidence."]
  ];

  var SUPPORT_TOPICS = ["Account", "Payment", "Course", "Assessment", "Technical", "Refund", "Accessibility", "Appeal"];

  /* Promotion (handbook §15): exact code, case-insensitive, 100% off eligible LIVE products only. */
  var COUPON = { code: "DigitalBurj100", percent: 100 };

  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function course(id) { return byId(COURSES, id); }
  function bundle(id) { return byId(BUNDLES, id); }
  function bundleStatus(b) {
    var s = "live";
    b.includes.forEach(function (cid) { var c = course(cid); if (!c) s = "planned"; else if (c.status === "planned") s = "planned"; else if (c.status === "pilot" && s === "live") s = "pilot"; });
    return s;
  }
  function isLive(id) { var b = bundle(id), c = course(id); return b ? bundleStatus(b) === "live" : !!c && c.status === "live"; }
  function money(n) { n = Math.round(Number(n) * 100) / 100; return "$" + (n % 1 === 0 ? String(n) : n.toFixed(2)); }
  function bundleCourseIds(id) { var b = bundle(id); return b ? b.includes.slice() : (course(id) ? [id] : []); }

  /* Server-authoritative pricing. `owned` = course ids already held, credited against a bundle. */
  function quote(ids, code, owned) {
    owned = owned || [];
    var seen = {}, lines = [], blocked = [];
    (ids || []).forEach(function (id) {
      id = String(id);
      if (seen[id]) return; seen[id] = 1;
      var b = bundle(id), c = course(id);
      if (!b && !c) { blocked.push({ id: id, reason: "Unknown product." }); return; }
      if (!isLive(id)) { blocked.push({ id: id, reason: "Not yet Live — join the waitlist. Only Live products are purchasable." }); return; }
      var list = b ? b.price : c.price, credit = 0;
      if (b) b.includes.forEach(function (cid) { if (owned.indexOf(cid) > -1) credit += course(cid).price; });
      credit = Math.min(credit, list);
      lines.push({ id: id, type: b ? "bundle" : "course", title: b ? b.name : c.title, list: list, credit: credit, price: list - credit });
    });
    var subtotal = lines.reduce(function (s, l) { return s + l.price; }, 0);
    var state = "none", message = "";
    var raw = String(code == null ? "" : code).trim();
    if (raw) {
      if (raw.toLowerCase() !== COUPON.code.toLowerCase()) { state = "invalid"; message = "That code is not recognised."; }
      else if (!lines.length) { state = "not-eligible"; message = "The code applies to Live products only; nothing eligible is in your order."; }
      else { state = "applied"; message = COUPON.code + " — " + COUPON.percent + "% off eligible Live products."; }
    }
    var discount = 0;
    lines.forEach(function (l) { l.discount = state === "applied" ? Math.round(l.price * COUPON.percent) / 100 : 0; l.payable = Math.max(0, l.price - l.discount); discount += l.discount; });
    var total = Math.max(0, subtotal - discount);
    return { currency: CURRENCY, lines: lines, blocked: blocked, subtotal: subtotal, discount: discount, total: total, coupon: { code: raw ? COUPON.code : "", state: state, message: message } };
  }

  /* Browser-only: POST to the same-origin academy endpoint. Never throws. */
  function api(action, payload) {
    if (typeof fetch !== "function") return Promise.resolve({ ok: false, status: 0, data: { error: "No network." } });
    var body = {}; for (var k in (payload || {})) body[k] = payload[k]; body.action = action;
    return fetch("/api/academy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, status: r.status, data: d }; }); })
      .catch(function () { return { ok: false, status: 0, data: { error: "Network unavailable." } }; });
  }

  return { CURRENCY: CURRENCY, COURSES: COURSES, BUNDLES: BUNDLES, STAGES: STAGES, LIFECYCLE: LIFECYCLE, CAPABILITY: CAPABILITY, SUPPORT_TOPICS: SUPPORT_TOPICS, COUPON: COUPON,
    course: course, bundle: bundle, bundleStatus: bundleStatus, bundleCourseIds: bundleCourseIds, isLive: isLive, money: money, quote: quote, api: api };
});
