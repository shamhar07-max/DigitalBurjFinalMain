const { limited, sameSite, resend, body } = require("./_lib");
const { run, rateClass } = require("./_academy");

// Academy endpoint: quote (pricing + coupon), enroll, support, register. Stateless — no entitlement is ever
// granted from this endpoint; the team verifies and grants access (see the launch checklist).
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  const b = body(req);
  const rc = rateClass(b.action);
  if (limited(req, rc.n, 10 * 60 * 1000, rc.bucket)) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  // Accounts/entitlements need a KV store; only the Cloudflare Worker provides one, so here they answer "setup required".
  const out = await run(b, { env: process.env, resend, kv: null, req: { cookie: req.headers.cookie || "" } });
  if (out.cookies) res.setHeader("Set-Cookie", out.cookies);
  return res.status(out.status).json(out.json);
};
