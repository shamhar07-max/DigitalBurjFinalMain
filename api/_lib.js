// Shared helpers for the DigitalBurj serverless endpoints (no dependencies).
const hits = new Map();

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

// Best-effort per-instance rate limit (n requests / windowMs per IP).
function limited(req, n = 5, windowMs = 10 * 60 * 1000) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").split(",")[0].trim();
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > n;
}

// Same-site requests only.
function sameSite(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { const h = new URL(origin).hostname; return h === new URL(`https://${req.headers.host}`).hostname || h === "localhost"; } catch { return false; }
}

async function resend(path, body) {
  const r = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { ok: r.ok, status: r.status, json };
}

function body(req) {
  if (req.body && typeof req.body === "object") return req.body;
  try { return JSON.parse(req.body || "{}"); } catch { return {}; }
}

module.exports = { esc, clean, EMAIL, limited, sameSite, resend, body };
