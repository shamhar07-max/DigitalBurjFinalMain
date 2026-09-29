/* DigitalBurj Support: our own help widget (no third-party chat service) + contextual nudges.
   Quick answers run locally; messages go to the support inbox via /api/contact; live conversation continues on WhatsApp. */
(function () {
  if (window.__dbxChat) return; window.__dbxChat = 1;
  var WA = "https://wa.me/971552998583?text=" + encodeURIComponent("Hi DigitalBurj, I have a question.");
  var path = location.pathname.replace(/\/+$/, "") || "/";
  var m0 = path.match(/^\/([A-Za-z]+)\.dc\.html$/);
  if (m0) { var MAP = { Homepage: "/", BusinessOS: "/business-os", BusinessAI: "/business-ai", GetStarted: "/get-started" }; path = MAP[m0[1]] || "/" + m0[1].toLowerCase(); }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var ss = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  var toast = function (m, t, ms, a) { window.dbToast && window.dbToast(m, t, ms, a); };

  var css = '.dbs-btn{position:fixed;left:20px;bottom:20px;z-index:56;display:inline-flex;align-items:center;gap:9px;height:46px;padding:0 18px 0 14px;border-radius:14px;border:0;background:#f23a1d;color:#fff;font:600 14px "Instrument Sans",system-ui,sans-serif;cursor:pointer;box-shadow:0 16px 34px -14px rgba(242,58,29,.75);transition:transform .25s,background .25s}.dbs-btn:hover{transform:translateY(-2px);background:#ff5533}.dbs-btn svg{width:18px;height:18px}.dbs-btn.open{display:none}' +
    '.dbs-panel{position:fixed;left:20px;bottom:20px;z-index:115;width:min(23.5rem,calc(100% - 24px));max-height:min(36rem,calc(100svh - 40px));display:none;flex-direction:column;border-radius:18px;background:#0f1714;color:#f6f5f1;border:1px solid rgba(246,245,241,.13);box-shadow:0 40px 80px -28px #000;overflow:hidden;font:400 14px/1.5 "Instrument Sans",system-ui,sans-serif;box-sizing:border-box}.dbs-panel *{box-sizing:border-box}.dbs-panel.on{display:flex;animation:dbs-in .35s cubic-bezier(.22,.8,.24,1) both}' +
    '@keyframes dbs-in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}' +
    '.dbs-h{display:flex;align-items:center;gap:11px;padding:14px 14px 13px 16px;background:linear-gradient(135deg,#1a2420,#0f1714 60%);border-bottom:1px solid rgba(246,245,241,.1)}.dbs-av{flex:none;width:36px;height:36px;border-radius:11px;background:#f23a1d;display:grid;place-items:center;font:800 15px "Plus Jakarta Sans",sans-serif;color:#fff}.dbs-h b{display:block;font:700 14.5px "Plus Jakarta Sans",sans-serif}.dbs-h small{display:block;font-size:12px;color:rgba(246,245,241,.6)}.dbs-x{margin-left:auto;width:32px;height:32px;border-radius:9px;border:1px solid rgba(246,245,241,.14);background:rgba(246,245,241,.05);color:#f6f5f1;font-size:18px;cursor:pointer;line-height:1}.dbs-x:hover{background:rgba(246,245,241,.12)}' +
    '.dbs-b{flex:1;overflow:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:9px;min-height:12rem}.dbs-m{max-width:88%;padding:9px 12px;border-radius:14px;font-size:13.8px;line-height:1.5;animation:dbs-in .25s ease both}.dbs-m.bot{align-self:flex-start;background:rgba(246,245,241,.08);border-top-left-radius:5px}.dbs-m.me{align-self:flex-end;background:#f23a1d;color:#fff;border-bottom-right-radius:5px}.dbs-m a{color:#ff9a75;text-decoration:underline}' +
    '.dbs-q{display:flex;flex-wrap:wrap;gap:7px;padding:4px 14px 12px}.dbs-q button{border:1px solid rgba(246,245,241,.2);background:transparent;color:#f6f5f1;border-radius:999px;padding:7px 12px;font:500 12.8px "Instrument Sans",sans-serif;cursor:pointer;transition:border-color .2s,background .2s}.dbs-q button:hover{border-color:#f23a1d;background:rgba(242,58,29,.12)}' +
    '.dbs-f{display:none;gap:8px;flex-direction:column;padding:4px 14px 14px}.dbs-f.on{display:flex}.dbs-f input,.dbs-f textarea{width:100%;border-radius:10px;border:1px solid rgba(246,245,241,.18);background:rgba(246,245,241,.06);color:#fff;padding:9px 11px;font:500 14px "Instrument Sans",sans-serif;outline:none;resize:none}.dbs-f input:focus,.dbs-f textarea:focus{border-color:#f23a1d}.dbs-f ::placeholder{color:rgba(246,245,241,.4)}' +
    '.dbs-row{display:flex;gap:8px}.dbs-row>*{flex:1;min-width:0}.dbs-send{height:42px;border-radius:10px;border:0;background:#f23a1d;color:#fff;font:600 14px "Instrument Sans",sans-serif;cursor:pointer}.dbs-send:disabled{opacity:.7}.dbs-err{min-height:16px;font-size:12.5px;color:#ff8a70}.dbs-wa{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 14px 14px;height:40px;border-radius:10px;border:1px solid rgba(62,207,110,.5);color:#7ee2a0;text-decoration:none;font:600 13.5px "Instrument Sans",sans-serif}.dbs-wa:hover{background:rgba(62,207,110,.1)}.dbs-hp{position:absolute!important;left:-9999px!important;opacity:0!important}' +
    '@media(max-width:560px){.dbs-panel{left:8px;right:8px;bottom:8px;width:auto;max-height:calc(100svh - 16px)}.dbs-btn{height:42px;font-size:13px;left:14px;bottom:14px}}@media print{.dbs-btn,.dbs-panel{display:none!important}}@media(prefers-reduced-motion:reduce){.dbs-panel,.dbs-m{animation:none!important}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ANSWERS = {
    pricing: ['Our plans are on the <a href="/pricing">Pricing page</a>. Most teams start with a free process review so we can scope the right setup for your business.', 'Book a process review'],
    review: ['A free 30-minute process review: we map one workflow end to end and show where automation pays back. No obligation.', 'Book a process review'],
    industries: ['We run 15 industry modules — logistics, real estate, trading, construction, hospitality, healthcare and more. See them on <a href="/industries">Industries</a>. Don\'t see yours? Ask us, we configure for other sectors too.'],
    services: ['DigitalBurj covers Business OS, Business AI, Growth, Studio, Academy and Talent. Start on <a href="/business-os">Business OS</a> or the <a href="/solutions">Solutions</a> page.'],
    careers: ['Hiring and talent programmes live on <a href="/jobs">Jobs</a> and <a href="/talent">Talent</a>.'],
    human: ['For a live conversation use WhatsApp below. For anything detailed, leave a message and a specialist replies by email within one business day.']
  };
  var CHIPS = [["Pricing", "pricing"], ["Free process review", "review"], ["Industries", "industries"], ["Our services", "services"], ["Jobs & talent", "careers"], ["Talk to a person", "human"]];

  var btn = document.createElement("button"); btn.type = "button"; btn.className = "dbs-btn"; btn.setAttribute("aria-label", "Open DigitalBurj Support");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>DigitalBurj Support';
  var panel = document.createElement("div"); panel.className = "dbs-panel"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "DigitalBurj Support");
  panel.innerHTML = '<div class="dbs-h"><div class="dbs-av">D</div><div><b>DigitalBurj Support</b><small>Live on WhatsApp · email replies within 1 business day</small></div><button type="button" class="dbs-x" aria-label="Close">×</button></div>' +
    '<div class="dbs-b" aria-live="polite"></div><div class="dbs-q"></div>' +
    '<form class="dbs-f" novalidate><div class="dbs-row"><input name="name" placeholder="Your name" autocomplete="name"><input name="email" type="email" placeholder="Work email" autocomplete="email"></div><textarea name="message" rows="3" placeholder="How can we help? (min. 20 characters)"></textarea><input class="dbs-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="dbs-err" role="status"></div><button class="dbs-send" type="submit">Send message</button></form>' +
    '<a class="dbs-wa" target="_blank" rel="noopener" href="' + WA + '">Chat live on WhatsApp</a>';
  var body, chips, form, err;
  function add(html, who) { var m = document.createElement("div"); m.className = "dbs-m " + who; if (who === "me") m.textContent = html; else m.innerHTML = html; body.appendChild(m); body.scrollTop = body.scrollHeight; }
  function greet() {
    var n = ls.get("dbs_name");
    add((n ? "Welcome back, " + n.split(" ")[0] + "! " : "Hi 👋 ") + "I'm the DigitalBurj support desk. Pick a topic below, or leave us a message.", "bot");
  }
  function pick(key, label) {
    add(label, "me"); var a = ANSWERS[key];
    setTimeout(function () {
      add(a[0], "bot");
      if (a[1] && window.dbxOpenOffer && !ls.get("dbx_offer_done_flag")) { var m = document.createElement("div"); m.className = "dbs-m bot"; m.innerHTML = '<a href="#" data-o="1">' + a[1] + ' →</a>'; m.firstChild.onclick = function (e) { e.preventDefault(); close(); window.dbxOpenOffer(); }; body.appendChild(m); }
      if (key === "human") showForm();
      body.scrollTop = body.scrollHeight;
    }, 350);
  }
  function showForm() {
    form.classList.add("on");
    form.name.value = form.name.value || ls.get("dbs_name") || ""; form.email.value = form.email.value || ls.get("dbs_email") || "";
    setTimeout(function () { (form.name.value ? form.message : form.name).focus(); }, 60);
  }
  function build() {
    document.body.appendChild(btn); document.body.appendChild(panel);
    body = $(".dbs-b", panel); chips = $(".dbs-q", panel); form = $(".dbs-f", panel); err = $(".dbs-err", panel);
    CHIPS.forEach(function (c) { var b = document.createElement("button"); b.type = "button"; b.textContent = c[0]; b.onclick = function () { pick(c[1], c[0]); }; chips.appendChild(b); });
    var more = document.createElement("button"); more.type = "button"; more.textContent = "Leave a message"; more.onclick = function () { add("Leave a message", "me"); add("Sure — tell us a little about what you need and we'll reply by email.", "bot"); showForm(); }; chips.appendChild(more);
    btn.onclick = open; $(".dbs-x", panel).onclick = close;
    panel.addEventListener("keydown", function (e) { if (e.key === "Escape") { e.stopPropagation(); close(); } });
    form.onsubmit = function (e) {
      e.preventDefault(); var d = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim(), website: form.website.value };
      if (d.name.length < 2) { err.textContent = "Please enter your name."; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) { err.textContent = "Please enter a valid email."; return; }
      if (d.message.length < 20) { err.textContent = "Please add a little more detail (20+ characters)."; return; }
      err.textContent = ""; var s = $(".dbs-send", form); s.disabled = true; s.textContent = "Sending…";
      d.topic = "Support chat"; d.source = path;
      fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw r; ls.set("dbs_name", d.name); ls.set("dbs_email", d.email); add(d.message, "me"); form.message.value = ""; form.classList.remove("on"); add("Thanks " + d.name.split(" ")[0] + " — your message is with our team. We'll reply to " + d.email + " within one business day. Need it sooner? Use WhatsApp below.", "bot"); })
        .catch(function (r) { err.textContent = r && r.status === 429 ? "Too many messages — please wait a few minutes." : "Couldn't send right now. Please use WhatsApp below or email support@digitalburj.com."; })
        .then(function () { s.disabled = false; s.textContent = "Send message"; });
    };
  }
  var greeted = false;
  function open() { if (!body) return; if (window.dbxOfferModalOpen && window.dbxOfferModalOpen()) return; panel.classList.add("on"); btn.classList.add("open"); if (!greeted) { greeted = true; greet(); } ss.set("dbs_used", "1"); }
  function close() { panel.classList.remove("on"); btn.classList.remove("open"); btn.focus && btn.focus(); }
  window.dbxOpenChat = open;

  /* ---------- marketing nudges (max one per session, never over the offer or an open chat) ---------- */
  var NUDGES = [
    [/^\/pricing$/, 18000, "Not sure which plan fits? Ask our team — we reply fast.", "Ask us", function () { open(); }],
    [/^\/industries$/, 15000, "Don't see your industry? We configure the Business OS for other sectors too.", "Ask us", function () { open(); }],
    [/^\/(business-os|business-ai|growth|studio|solutions|portfolio)$/, 30000, "Want to see this working for your business? Get a free process review.", "Book it", function () { window.dbxOpenOffer ? window.dbxOpenOffer() : open(); }],
    [/^\/(academy|talent|jobs)$/, 25000, "Questions about programmes or roles? Message the team.", "Ask us", function () { open(); }],
    [/^\/(insights|insights\/.+)$/, "scroll", "Enjoying the read? Get new guides in your inbox.", "Subscribe", function () { var i = $('footer input[type=email], .db-foot input[type=email]'); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }); setTimeout(function () { i && i.focus(); }, 700); }]
  ];
  function arm() {
    if (ss.get("dbx_nudged")) return;
    var rule = null; NUDGES.forEach(function (n) { if (!rule && n[0].test(path)) rule = n; });
    if (!rule) return;
    function fire() {
      if (ss.get("dbx_nudged") || panel.classList.contains("on") || (window.dbxOfferModalOpen && window.dbxOfferModalOpen())) return false;
      ss.set("dbx_nudged", "1"); toast(rule[2], "ok", 9000, { label: rule[3], fn: rule[4] }); return true;
    }
    if (rule[1] === "scroll") {
      var on = function () { var h = document.documentElement; if ((h.scrollTop + innerHeight) / h.scrollHeight > 0.6 && fire()) removeEventListener("scroll", on); };
      addEventListener("scroll", on, { passive: true });
    } else setTimeout(function () { fire(); }, rule[1]);
  }

  /* ---------- welcome back (once a day) + tab-return alert ---------- */
  function returning() {
    var last = Number(ls.get("dbx_last") || 0), now = Date.now(); ls.set("dbx_last", String(now));
    if (last && now - last > 864e5 && !ss.get("dbx_wb")) { ss.set("dbx_wb", "1"); setTimeout(function () { toast("Welcome back to DigitalBurj. Anything we can help with today?", "ok", 6500, { label: "Ask us", fn: open }); }, 2500); return true; }
    return false;
  }
  var title = document.title;
  document.addEventListener("visibilitychange", function () { if (document.hidden) { title = document.title; document.title = "Still there? · DigitalBurj"; } else document.title = title; });

  function init() { build(); if (!returning()) arm(); }
  if (document.body) init(); else addEventListener("DOMContentLoaded", init);
})();
