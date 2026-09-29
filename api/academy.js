const { limited, sameSite, resend, body } = require("./_lib");
const { run } = require("./_academy");

// Academy endpoint: quote (pricing + coupon), enroll, support, register. Stateless — no entitlement is ever
// granted from this endpoint; the team verifies and grants access (see the launch checklist).
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  const b = body(req);
  // Quotes are cheap and mail-free, so they get a higher limit than actions that send email.
  if (limited(req, b.action === "quote" ? 60 : 8, 10 * 60 * 1000, b.action === "quote" ? "|q" : "|m")) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  const out = await run(b, { env: process.env, resend });
  return res.status(out.status).json(out.json);
};
