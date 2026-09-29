const { esc, clean, EMAIL, limited, sameSite, resend, body } = require("./_lib");

// Offer-popup lead: store the contact, notify the team, confirm to the visitor (all best-effort except one of the first two must succeed).
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  if (limited(req, 5)) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: "Email service not configured" });
  const b = body(req);
  if (b.website) return res.status(200).json({ ok: true });
  const email = clean(b.email, 200).toLowerCase(), source = clean(b.source, 120);
  if (!EMAIL.test(email)) return res.status(400).json({ error: "Please enter a valid email." });
  const to = process.env.CONTACT_TO || "support@digitalburj.com", from = process.env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  const payload = { email, unsubscribed: false };
  if (process.env.RESEND_SEGMENT_ID) payload.segments = [{ id: process.env.RESEND_SEGMENT_ID }];
  const [saved, notified] = await Promise.all([
    resend("/contacts", payload),
    resend("/emails", { from, to: [to], reply_to: email, subject: `New process-review request — ${email}`, html: `<div style="font-family:Arial,sans-serif;color:#0f1714"><h3>Free process review requested</h3><p><b>${esc(email)}</b><br>From page: ${esc(source || "/")}</p></div>` }),
  ]);
  const okSaved = saved.ok || /already|exist/i.test(JSON.stringify(saved.json));
  if (!okSaved && !notified.ok) return res.status(502).json({ error: "Could not send" });
  resend("/emails", { from, to: [email], reply_to: to, subject: "Your free process review — DigitalBurj", html: `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:520px"><p>Thanks for requesting a free process review.</p><p>A DigitalBurj specialist will email you within one business day to pick a workflow to map. You can also reply to this email or message us on WhatsApp: +971 55 299 8583.</p><p>— The DigitalBurj team</p></div>` }).catch(() => {});
  return res.status(200).json({ ok: true });
};
