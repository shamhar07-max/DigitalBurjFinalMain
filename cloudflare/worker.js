// DigitalBurj production Worker.
// Serves the static site from a KV mirror of a pinned git commit (self-healing: a missing file is fetched
// once from the public GitHub repo, stored in KV, then served from KV + the edge cache), routes clean URLs,
// and implements /api/contact and /api/subscribe (Resend).

const REPO = "shamhar07-max/DigitalBurjFinalMain";

const PAGES = {
  "/": "/Homepage.dc.html", "/business-os": "/BusinessOS.dc.html", "/business-ai": "/BusinessAI.dc.html", "/growth": "/Growth.dc.html",
  "/studio": "/Studio.dc.html", "/industries": "/Industries.dc.html", "/academy": "/Academy.dc.html", "/talent": "/Talent.dc.html",
  "/jobs": "/Jobs.dc.html", "/pricing": "/Pricing.dc.html", "/company": "/Company.dc.html", "/solutions": "/Solutions.dc.html",
  "/portfolio": "/Portfolio.dc.html", "/get-started": "/GetStarted.dc.html", "/contact": "/Contact.dc.html", "/insights": "/Insights.dc.html",
};
// Old .dc.html URLs (and /index.html) permanently redirect to the clean ones.
const LEGACY = Object.fromEntries(Object.entries(PAGES).map(([clean, file]) => [file, clean]));
LEGACY["/index.html"] = "/";

const TYPES = {
  html: "text/html; charset=utf-8", css: "text/css; charset=utf-8", js: "application/javascript; charset=utf-8", json: "application/json",
  txt: "text/plain; charset=utf-8", xml: "application/xml; charset=utf-8", svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg",
  jpeg: "image/jpeg", webp: "image/webp", ico: "image/x-icon", woff: "font/woff", woff2: "font/woff2",
};
const ext = (p) => (p.split(".").pop() || "").toLowerCase();

function cacheControl(path) {
  if (/^\/(fonts|vendor)\//.test(path)) return "public, max-age=31536000, immutable";
  if (/^\/(media|brand|industry|insight)\//.test(path)) return "public, max-age=604800, stale-while-revalidate=86400";
  return "public, max-age=0, must-revalidate"; // html/js/css revalidate on every load
}

const SECURITY = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...SECURITY } });

/* ---------------------------------------------------------------- static files */
async function loadFile(path, env, ctx) {
  const key = `${env.COMMIT}:${path}`;
  const hit = await env.SITE.getWithMetadata(key, { type: "arrayBuffer" });
  if (hit.value) return { body: hit.value, type: hit.metadata?.type || TYPES[ext(path)] || "application/octet-stream" };
  const up = await fetch(`https://raw.githubusercontent.com/${REPO}/${env.COMMIT}/dist${encodeURI(path)}`);
  if (!up.ok) return null;
  const body = await up.arrayBuffer();
  const type = TYPES[ext(path)] || "application/octet-stream";
  ctx.waitUntil(env.SITE.put(key, body, { metadata: { type } }));
  return { body, type };
}

async function serveStatic(request, path, env, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(new URL(`${path}?v=${env.COMMIT.slice(0, 8)}`, request.url).toString());
  if (request.method === "GET") {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }
  const f = await loadFile(path, env, ctx);
  if (!f) return null;
  const etag = `"${env.COMMIT.slice(0, 12)}-${path.length}-${f.body.byteLength}"`;
  const headers = { "content-type": f.type, "cache-control": cacheControl(path), etag, ...SECURITY };
  if (request.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });
  const res = new Response(request.method === "HEAD" ? null : f.body, { status: 200, headers });
  if (request.method === "GET") ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

/* ---------------------------------------------------------------- API (Resend) */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;
const hits = new Map();
function limited(request, n, windowMs = 10 * 60 * 1000) {
  const ip = request.headers.get("cf-connecting-ip") || "?";
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > n;
}
async function resend(env, path, body) {
  const r = await fetch(`https://api.resend.com${path}`, {
    method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  const text = await r.text(); let j; try { j = JSON.parse(text); } catch { j = { raw: text }; }
  return { ok: r.ok, status: r.status, json: j };
}
function sameSite(request) {
  const o = request.headers.get("origin"); if (!o) return true;
  try { const h = new URL(o).hostname; return h === new URL(request.url).hostname || h === "digitalburj.com" || h === "www.digitalburj.com" || h === "localhost"; } catch { return false; }
}

async function contact(request, env, ctx) {
  if (limited(request, 5)) return json({ error: "Too many requests. Please try again shortly." }, 429);
  if (!env.RESEND_API_KEY) return json({ error: "Email service not configured" }, 503);
  const b = await request.json().catch(() => ({}));
  if (b.website) return json({ ok: true });
  const d = { topic: clean(b.topic, 80), name: clean(b.name, 120), email: clean(b.email, 200), company: clean(b.company, 160), phone: clean(b.phone, 40), timeline: clean(b.timeline, 80), message: clean(b.message, 2000), source: clean(b.source, 120) };
  if (d.name.length < 2 || !EMAIL.test(d.email) || d.message.length < 20) return json({ error: "Please complete the required fields." }, 400);
  const to = env.CONTACT_TO || "support@digitalburj.com";
  const from = env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  const rows = [["Topic", d.topic], ["Name", d.name], ["Email", d.email], ["Company", d.company], ["Phone", d.phone], ["Timeline", d.timeline], ["Source", d.source]]
    .filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#6b746f">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:560px"><h2 style="margin:0 0 12px">New website enquiry</h2><table style="font-size:14px">${rows}</table><p style="margin:16px 0 4px;color:#6b746f;font-size:13px">Message</p><div style="white-space:pre-wrap;font-size:15px;line-height:1.55;border-left:3px solid #f23a1d;padding-left:12px">${esc(d.message)}</div></div>`;
  const n = await resend(env, "/emails", { from, to: [to], reply_to: d.email, subject: `Enquiry: ${d.topic || "General"} — ${d.name}`, html });
  if (!n.ok) { console.error("resend notify failed", n.status, JSON.stringify(n.json).slice(0, 300)); return json({ error: "Could not send message" }, 502); }
  ctx.waitUntil(resend(env, "/emails", {
    from, to: [d.email], reply_to: to, subject: "We received your message — DigitalBurj",
    html: `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:520px"><p>Hi ${esc(d.name.split(" ")[0])},</p><p>Thanks for contacting DigitalBurj. A specialist will reply within one business day.</p><p style="color:#6b746f;font-size:13px">Your message:<br>${esc(d.message).replace(/\n/g, "<br>")}</p><p>— The DigitalBurj team</p></div>`,
  }).catch(() => {}));
  return json({ ok: true });
}

async function subscribe(request, env) {
  if (limited(request, 6)) return json({ error: "Too many requests. Please try again shortly." }, 429);
  if (!env.RESEND_API_KEY) return json({ error: "Email service not configured" }, 503);
  const b = await request.json().catch(() => ({}));
  if (b.website) return json({ ok: true });
  const email = clean(b.email, 200).toLowerCase();
  if (!EMAIL.test(email)) return json({ error: "Please enter a valid email." }, 400);
  const payload = { email, unsubscribed: false };
  if (env.RESEND_SEGMENT_ID) payload.segments = [{ id: env.RESEND_SEGMENT_ID }];
  const r = await resend(env, "/contacts", payload);
  const already = !r.ok && /already|exist/i.test(JSON.stringify(r.json));
  if (!r.ok && !already) { console.error("resend contact failed", r.status, JSON.stringify(r.json).slice(0, 300)); return json({ error: "Could not subscribe right now." }, 502); }
  return json({ ok: true });
}

/* ---------------------------------------------------------------- warm-up (cron) */
// Files of the pinned commit (dist/). The cron mirrors up to 20 missing files per run into KV and records its status.
const FILES = ["Academy.dc.html","Article.dc.html","BusinessAI.dc.html","BusinessOS.dc.html","Company.dc.html","Contact.dc.html","ContentPage.dc.html","GetStarted.dc.html","Growth.dc.html","Homepage.dc.html","Industries.dc.html","Insights.dc.html","Jobs.dc.html","Portfolio.dc.html","Pricing.dc.html","SiteFooter.dc.html","SiteHeader.dc.html","Solutions.dc.html","Studio.dc.html","Talent.dc.html","articles.js","brand/academy-lockup.webp","brand/academy.webp","brand/business-ai-lockup.webp","brand/business-os-lockup.webp","brand/business-os.webp","brand/businessai-lockup.webp","brand/businessai.webp","brand/division-academy.webp","brand/division-business-ai.webp","brand/division-business-os.webp","brand/division-growth.webp","brand/division-industries.webp","brand/division-studio.webp","brand/division-talent.webp","brand/eco-admin.webp","brand/eco-api.webp","brand/eco-docs.webp","brand/eco-identity.webp","brand/eco-jobs.webp","brand/eco-status.webp","brand/eco-support.webp","brand/eco-talent.webp","brand/eco-workspace.webp","brand/favicon.png","brand/growth-lockup.webp","brand/growth.webp","brand/industries-lockup.webp","brand/industries.webp","brand/mark-academy.webp","brand/mark-business-ai.webp","brand/mark-business-os.webp","brand/mark-growth.webp","brand/mark-industries.webp","brand/mark-studio.webp","brand/mark-talent.webp","brand/opengraph.png","brand/studio-lockup.webp","brand/studio.webp","brand/talent-lockup.webp","brand/talent.webp","brand/wordmark-480.webp","brand/wordmark-clear.png","brand/wordmark.webp","cinema-bg.js","fonts.css","fonts/instrument-sans-latin-wght-normal.woff2","fonts/plus-jakarta-sans-latin-wght-normal.woff2","hero-reel.js","hero-system.css","industry/01-logistics.webp","industry/02-travel.webp","industry/03-trading.webp","industry/04-real-estate.webp","industry/05-construction.webp","industry/06-facility.webp","industry/07-services.webp","industry/08-recruitment.webp","industry/09-retail.webp","industry/10-automotive.webp","industry/11-hospitality.webp","industry/12-education.webp","industry/13-manufacturing.webp","industry/14-healthcare.webp","industry/15-ecommerce.webp","industry/hero-panel.webp","insight/01-business-ai.webp","insight/02-automation-decision.webp","insight/03-workflow-automation.webp","insight/04-agent-vs-chatbot.webp","insight/05-crm-vs-erp.webp","insight/06-production-ready.webp","insight/07-scope-an-mvp.webp","insight/08-mvp-vs-prototype.webp","insight/09-rbac.webp","insight/10-evidence-learning.webp","insight/11-verified-capability.webp","insight/12-skills-hiring.webp","insight/13-logistics-documents.webp","insight/14-real-estate-response.webp","insight/15-responsible-ai.webp","insight/hero-brief.webp","insight/hero-editorial.webp","media/01-d.webp","media/01-m.webp","media/02-d.webp","media/02-m.webp","media/03-d.webp","media/03-m.webp","media/04-d.webp","media/04-m.webp","media/05-d.webp","media/05-m.webp","media/06-d.webp","media/06-m.webp","media/07-d.webp","media/07-m.webp","media/08-d.webp","media/08-m.webp","media/09-d.webp","media/09-m.webp","media/10-d.webp","media/10-m.webp","media/11-d.webp","media/11-m.webp","media/12-d.webp","media/12-m.webp","media/13-d.webp","media/13-m.webp","media/14-d.webp","media/14-m.webp","media/15-d.webp","media/15-m.webp","media/16-d.webp","media/16-m.webp","media/17-d.webp","media/17-m.webp","media/18-d.webp","media/18-m.webp","media/19-d.webp","media/19-m.webp","media/20-d.webp","media/20-m.webp","media/21-d.webp","media/21-m.webp","media/22-d.webp","media/22-m.webp","media/23-d.webp","media/23-m.webp","media/24-d.webp","media/24-m.webp","media/25-d.webp","media/25-m.webp","media/26-d.webp","media/26-m.webp","media/27-d.webp","media/27-m.webp","media/28-d.webp","media/28-m.webp","media/29-d.webp","media/29-m.webp","media/30-d.webp","media/30-m.webp","media/31-d.webp","media/31-m.webp","media/32-d.webp","media/32-m.webp","media/33-d.webp","media/33-m.webp","media/34-m.webp","media/industry01-d.webp","media/industry01-m.webp","media/industry02-d.webp","media/industry02-m.webp","media/industry03-d.webp","media/industry03-m.webp","media/insight01-d.webp","media/insight01-m.webp","media/insight02-d.webp","media/insight02-m.webp","media/insight03-d.webp","media/insight03-m.webp","motion.js","pages.js","robots.txt","sitemap.xml","support.js","vendor/react-dom.production.min.js","vendor/react.production.min.js"];

async function warm(env) {
  const status = { at: new Date().toISOString(), commit: env.COMMIT.slice(0, 8) };
  try {
    const have = new Set(); let cursor;
    do { const l = await env.SITE.list({ prefix: `${env.COMMIT}:`, cursor }); l.keys.forEach((k) => have.add(k.name)); cursor = l.list_complete ? undefined : l.cursor; } while (cursor);
    const missing = FILES.filter((p) => !have.has(`${env.COMMIT}:/${p}`));
    let n = 0;
    for (const p of missing) {
      if (n >= 20) break;
      const up = await fetch(`https://raw.githubusercontent.com/${REPO}/${env.COMMIT}/dist/${encodeURI(p)}`);
      if (up.ok) { await env.SITE.put(`${env.COMMIT}:/${p}`, await up.arrayBuffer(), { metadata: { type: TYPES[ext(p)] || "application/octet-stream" } }); n++; }
      else (status.failed ||= []).push(`${p}:${up.status}`);
    }
    status.total = FILES.length; status.mirroredNow = n; status.remaining = missing.length - n;
  } catch (e) { status.error = String(e).slice(0, 300); }
  await env.SITE.put("_warm", JSON.stringify(status));
}

/* ---------------------------------------------------------------- entry */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === "www.digitalburj.com") return Response.redirect(`https://digitalburj.com${url.pathname}${url.search}`, 301);

    let path = url.pathname;
    if (path.startsWith("/api/")) {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      if (!sameSite(request)) return json({ error: "Forbidden" }, 403);
      if (path === "/api/contact") return contact(request, env, ctx);
      if (path === "/api/subscribe") return subscribe(request, env);
      return json({ error: "Not found" }, 404);
    }
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });

    if (path.length > 1 && path.endsWith("/")) return Response.redirect(`${url.origin}${path.replace(/\/+$/, "")}${url.search}`, 301);
    if (LEGACY[path]) return Response.redirect(`${url.origin}${LEGACY[path]}${url.search}`, 301);
    if (path === "/Article.dc.html" && url.searchParams.get("a")) return Response.redirect(`${url.origin}/insights/${encodeURIComponent(url.searchParams.get("a"))}`, 301);

    let file = PAGES[path];
    if (!file && /^\/insights\/[^/]+$/.test(path)) file = "/Article.dc.html";
    file = file || decodeURIComponent(path);
    if (file.includes("..")) return new Response("Bad request", { status: 400 });

    const res = await serveStatic(request, file, env, ctx);
    if (res) return res;
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8", ...SECURITY } });
  },
  async scheduled(event, env, ctx) { ctx.waitUntil(warm(env)); },
};
