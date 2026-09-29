const { clean, EMAIL, limited, sameSite, resend, body } = require("./_lib");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  if (limited(req, 6)) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: "Email service not configured" });

  const b = body(req);
  if (b.website) return res.status(200).json({ ok: true });
  const email = clean(b.email, 200).toLowerCase();
  if (!EMAIL.test(email)) return res.status(400).json({ error: "Please enter a valid email." });

  const payload = { email, unsubscribed: false };
  if (process.env.RESEND_SEGMENT_ID) payload.segments = [{ id: process.env.RESEND_SEGMENT_ID }];
  const r = await resend("/contacts", payload);
  // Resend returns an error for an existing contact — treat that as success (idempotent).
  const already = !r.ok && /already|exist/i.test(JSON.stringify(r.json));
  if (!r.ok && !already) {
    console.error("resend contact failed", r.status, JSON.stringify(r.json).slice(0, 300));
    return res.status(502).json({ error: "Could not subscribe right now." });
  }
  return res.status(200).json({ ok: true });
};
