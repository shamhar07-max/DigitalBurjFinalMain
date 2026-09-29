const { esc, clean, EMAIL, limited, sameSite, resend, body } = require("./_lib");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  if (limited(req)) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: "Email service not configured" });

  const b = body(req);
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots
  const d = {
    topic: clean(b.topic, 80), name: clean(b.name, 120), email: clean(b.email, 200), company: clean(b.company, 160),
    phone: clean(b.phone, 40), timeline: clean(b.timeline, 80), message: clean(b.message, 2000), source: clean(b.source, 120),
  };
  if (d.name.length < 2 || !EMAIL.test(d.email) || d.message.length < 20) return res.status(400).json({ error: "Please complete the required fields." });

  const to = process.env.CONTACT_TO || "support@digitalburj.com";
  const from = process.env.MAIL_FROM || "DigitalBurj <support@digitalburj.com>";
  const rows = [["Topic", d.topic], ["Name", d.name], ["Email", d.email], ["Company", d.company], ["Phone", d.phone], ["Timeline", d.timeline], ["Source", d.source]]
    .filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#6b746f">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:560px"><h2 style="margin:0 0 12px">New website enquiry</h2><table style="font-size:14px">${rows}</table><p style="margin:16px 0 4px;color:#6b746f;font-size:13px">Message</p><div style="white-space:pre-wrap;font-size:15px;line-height:1.55;border-left:3px solid #f23a1d;padding-left:12px">${esc(d.message)}</div></div>`;

  const notify = await resend("/emails", { from, to: [to], reply_to: d.email, subject: `Enquiry: ${d.topic || "General"} — ${d.name}`, html });
  if (!notify.ok) {
    console.error("resend notify failed", notify.status, JSON.stringify(notify.json).slice(0, 300));
    return res.status(502).json({ error: "Could not send message" });
  }
  // Courtesy confirmation to the visitor (best effort — never fails the request).
  resend("/emails", {
    from, to: [d.email], reply_to: to, subject: "We received your message — DigitalBurj",
    html: `<div style="font-family:Arial,sans-serif;color:#0f1714;max-width:520px"><p>Hi ${esc(d.name.split(" ")[0])},</p><p>Thanks for contacting DigitalBurj. A specialist will reply within one business day.</p><p style="color:#6b746f;font-size:13px">Your message:<br>${esc(d.message).replace(/\n/g, "<br>")}</p><p>— The DigitalBurj team</p></div>`,
  }).catch(() => {});
  return res.status(200).json({ ok: true });
};
