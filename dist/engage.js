/* DigitalBurj engagement layer: toast notifications for form results + a "Free process review" offer
   (timed / scroll / exit-intent popup, remembered launcher chip). No third-party scripts. */
(function () {
  if (window.__dbx) return; window.__dbx = 1;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var DAY = 864e5, now = Date.now();
  var path = location.pathname.replace(/\/+$/, "") || "/";
  var NO_OFFER = /^\/(contact|get-started)$/i.test(path) || /^\/(Contact|GetStarted)\.dc\.html$/.test(path);

  var css = '.dbx-toasts{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:120;display:grid;gap:10px;width:min(26rem,calc(100% - 28px));pointer-events:none}' +
    '.dbx-toast{pointer-events:auto;display:flex;gap:12px;align-items:flex-start;padding:13px 14px;border-radius:14px;background:#0f1714;color:#f6f5f1;border:1px solid rgba(246,245,241,.12);box-shadow:0 24px 50px -22px rgba(0,0,0,.65);font:500 14px/1.45 "Instrument Sans",system-ui,sans-serif;animation:dbx-in .35s cubic-bezier(.22,.8,.24,1) both}' +
    '.dbx-toast i{flex:none;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 12px/1 "Plus Jakarta Sans",sans-serif;font-style:normal;background:#3ecf6e;color:#06210f;margin-top:1px}' +
    '.dbx-toast.err i{background:#f23a1d;color:#fff}.dbx-toast.out{animation:dbx-out .3s ease both}' +
    '.dbx-toast button{margin-left:auto;background:none;border:0;color:rgba(246,245,241,.55);cursor:pointer;font-size:18px;line-height:1;padding:0 2px}.dbx-toast button:hover{color:#fff}' +
    '@keyframes dbx-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes dbx-out{to{opacity:0;transform:translateY(10px)}}' +
    '.dbx-back,.dbx-back *{box-sizing:border-box}.dbx-back{position:fixed;inset:0;z-index:110;background:rgba(9,14,12,.62);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);display:grid;place-items:center;padding:16px;animation:dbx-fade .25s ease both}.dbx-back[hidden]{display:none}' +
    '.dbx-modal{position:relative;width:min(30rem,100%);max-height:calc(100svh - 32px);overflow:auto;border-radius:20px;background:#0f1714;color:#f6f5f1;border:1px solid rgba(246,245,241,.12);box-shadow:0 50px 100px -30px #000;padding:28px 26px 22px;font-family:"Instrument Sans",system-ui,sans-serif;animation:dbx-pop .4s cubic-bezier(.22,.8,.24,1) both;isolation:isolate}' +
    '.dbx-modal:before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:radial-gradient(circle at 90% -10%,rgba(242,58,29,.32),transparent 55%)}' +
    '.dbx-x{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:10px;border:1px solid rgba(246,245,241,.14);background:rgba(246,245,241,.05);color:#f6f5f1;font-size:18px;cursor:pointer;line-height:1}.dbx-x:hover{background:rgba(246,245,241,.12)}' +
    '.dbx-badge{display:inline-flex;align-items:center;gap:8px;font:700 11px/1 "Instrument Sans",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#ff9a75}.dbx-badge:before{content:"";width:16px;height:2px;background:#ff7a45}' +
    '.dbx-modal h2{margin:12px 34px 0 0;font:800 clamp(1.4rem,1.1rem + 1vw,1.8rem)/1.12 "Plus Jakarta Sans",sans-serif;letter-spacing:-.02em}.dbx-modal h2 span{color:#ff5638}' +
    '.dbx-modal p{margin:10px 0 0;font-size:14.5px;line-height:1.55;color:rgba(246,245,241,.72)}' +
    '.dbx-list{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:9px}.dbx-list li{display:flex;gap:10px;font-size:14px;line-height:1.45;color:rgba(246,245,241,.88)}.dbx-list li:before{content:"";flex:none;margin-top:7px;width:6px;height:6px;border-radius:2px;background:#f23a1d}' +
    '.dbx-form{margin-top:18px;display:flex;gap:8px;flex-wrap:wrap}.dbx-form input[type=email]{flex:1 1 12rem;min-width:0;height:48px;border-radius:12px;border:1px solid rgba(246,245,241,.18);background:rgba(246,245,241,.06);color:#fff;padding:0 14px;font:500 15px "Instrument Sans",sans-serif;outline:none}.dbx-form input[type=email]:focus{border-color:#f23a1d}.dbx-form input::placeholder{color:rgba(246,245,241,.4)}' +
    '.dbx-form button{height:48px;padding:0 20px;border-radius:12px;border:0;background:#f23a1d;color:#fff;font:600 14.5px "Instrument Sans",sans-serif;cursor:pointer;transition:background .2s,transform .2s}.dbx-form button:hover:not(:disabled){background:#ff5533;transform:translateY(-1px)}.dbx-form button:disabled{opacity:.7;cursor:default}' +
    '.dbx-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}.dbx-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}' +
    '.dbx-msg{min-height:18px;margin:10px 0 0!important;font-size:13px!important;color:#ff8a70!important}.dbx-msg.ok{color:#7ee2a0!important}' +
    '.dbx-fine{margin:6px 0 0!important;font-size:11.5px!important;color:rgba(246,245,241,.45)!important}' +
    '.dbx-chip{position:fixed;left:20px;bottom:20px;z-index:55;display:none;align-items:center;gap:9px;height:44px;padding:0 16px 0 12px;border-radius:14px;border:1px solid rgba(246,245,241,.14);background:#0f1714;color:#f6f5f1;font:600 13.5px "Instrument Sans",sans-serif;cursor:pointer;box-shadow:0 14px 30px -12px rgba(0,0,0,.55);animation:dbx-in .4s cubic-bezier(.22,.8,.24,1) both;transition:transform .25s,border-color .25s}.dbx-chip.on{display:inline-flex}.dbx-chip:hover{transform:translateY(-2px);border-color:#f23a1d}.dbx-chip b{width:9px;height:9px;border-radius:50%;background:#f23a1d;box-shadow:0 0 0 0 rgba(242,58,29,.6);animation:dbx-ping 2s infinite}' +
    '@keyframes dbx-fade{from{opacity:0}to{opacity:1}}@keyframes dbx-pop{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}@keyframes dbx-ping{70%{box-shadow:0 0 0 8px rgba(242,58,29,0)}100%{box-shadow:0 0 0 0 rgba(242,58,29,0)}}' +
    '@media(max-width:560px){.dbx-back{place-items:end center;padding:0}.dbx-modal{border-radius:20px 20px 0 0;padding:24px 18px 20px}.dbx-chip{height:40px;font-size:13px}}' +
    '@media(prefers-reduced-motion:reduce){.dbx-toast,.dbx-modal,.dbx-back,.dbx-chip,.dbx-chip b{animation:none!important}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- toasts ---------- */
  var box = document.createElement("div"); box.className = "dbx-toasts"; box.setAttribute("aria-live", "polite"); box.setAttribute("role", "status");
  function mount() { document.body.appendChild(box); }
  if (document.body) mount(); else addEventListener("DOMContentLoaded", mount);
  function toast(msg, type, ms) {
    var t = document.createElement("div"); t.className = "dbx-toast" + (type === "err" ? " err" : "");
    t.innerHTML = "<i>" + (type === "err" ? "!" : "✓") + "</i><span></span><button type=\"button\" aria-label=\"Dismiss\">×</button>";
    t.children[1].textContent = msg;
    function close() { t.classList.add("out"); setTimeout(function () { t.remove(); }, 280); }
    t.children[2].onclick = close; box.appendChild(t); setTimeout(close, ms || 5200);
  }
  window.dbToast = toast;

  /* surface results of the site's own forms as toasts (subscribe / contact) */
  var nativeFetch = window.fetch;
  window.__dbFetch = function () { return nativeFetch.apply(window, arguments); };
  window.fetch = function (input, init) {
    var p = nativeFetch.apply(this, arguments);
    try {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      if (/\/api\/(subscribe|contact)$/.test(url) && init && init.method === "POST") {
        var kind = /subscribe$/.test(url) ? "sub" : "contact";
        p.then(function (r) {
          if (r.ok) toast(kind === "sub" ? "You're subscribed — welcome aboard." : "Message sent. We'll reply within one business day.");
          else if (r.status >= 500 && kind === "sub") toast("Couldn't subscribe just now. Please try again.", "err");
          else if (r.status === 429) toast("Too many attempts — please wait a few minutes.", "err");
        }, function () { toast("You seem to be offline. Please try again.", "err"); });
      }
    } catch (e) {}
    return p;
  };

  /* ---------- offer popup ---------- */
  if (NO_OFFER) return;
  var KEY = "dbx_offer";               // "done:<ts>" | "dismissed:<ts>"
  function state() {
    var v = store.get(KEY); if (!v) return null;
    var a = v.split(":"), age = now - Number(a[1] || 0);
    if (a[0] === "done" && age < 30 * DAY) return "done";
    if (a[0] === "dismissed" && age < 7 * DAY) return "dismissed";
    return null;
  }
  var s0 = state();
  if (s0 === "done") return;

  var back = document.createElement("div"); back.className = "dbx-back"; back.hidden = true;
  back.innerHTML =
    '<div class="dbx-modal" role="dialog" aria-modal="true" aria-labelledby="dbx-t">' +
    '<button type="button" class="dbx-x" aria-label="Close">×</button>' +
    '<span class="dbx-badge">Free · 30 minutes</span>' +
    '<h2 id="dbx-t">Find where your business is <span>losing time.</span></h2>' +
    '<p>Book a free process review. We map one workflow end to end and show where automation pays back — no sales script.</p>' +
    '<ul class="dbx-list"><li>One workflow mapped, with fixes ranked by impact</li><li>A specialist replies within one business day</li><li>Yours to keep — no obligation</li></ul>' +
    '<form class="dbx-form" novalidate><label class="dbx-sr" for="dbx-email">Work email</label>' +
    '<input id="dbx-email" type="email" placeholder="you@company.com" autocomplete="email" required>' +
    '<input class="dbx-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<button type="submit">Book my free review</button></form>' +
    '<p class="dbx-msg" role="status"></p>' +
    '<p class="dbx-fine">By submitting you agree we may email you about your request. Unsubscribe anytime.</p></div>';
  var chip = document.createElement("button"); chip.type = "button"; chip.className = "dbx-chip"; chip.innerHTML = "<b></b>Free process review";
  chip.setAttribute("aria-label", "Open free process review offer");
  function attach() { document.body.appendChild(back); document.body.appendChild(chip); wire(); if (s0 === "dismissed") setTimeout(function () { chip.classList.add("on"); }, 4000); else armTriggers(); }

  var lastFocus = null, shown = false;
  function open() {
    if (!back.hidden) return;
    if (document.querySelector('[role="dialog"]:not(.dbx-modal)')) return;      // don't stack on the site search
    shown = true; lastFocus = document.activeElement; back.hidden = false; chip.classList.remove("on");
    setTimeout(function () { var i = $("#dbx-email", back); i && i.focus(); }, 60);
    document.addEventListener("keydown", onKey, true);
  }
  function close(dismiss) {
    back.hidden = true; document.removeEventListener("keydown", onKey, true);
    if (dismiss) { store.set(KEY, "dismissed:" + Date.now()); chip.classList.add("on"); }
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  function onKey(e) {
    if (e.key === "Escape") { e.stopPropagation(); close(true); return; }
    if (e.key === "Tab") {
      var f = back.querySelectorAll('button:not([disabled]),input:not(.dbx-hp)'); if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  }
  function wire() {
    $(".dbx-x", back).onclick = function () { close(true); };
    back.addEventListener("mousedown", function (e) { if (e.target === back) close(true); });
    chip.onclick = open;
    var form = $(".dbx-form", back), msg = $(".dbx-msg", back), btn = $("button[type=submit]", form);
    form.onsubmit = function (e) {
      e.preventDefault();
      var email = $("#dbx-email", back).value.trim(), hp = $(".dbx-hp", back).value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.className = "dbx-msg"; msg.textContent = "Please enter a valid work email."; return; }
      btn.disabled = true; btn.textContent = "Sending…"; msg.textContent = "";
      window.__dbFetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, website: hp, source: path }) })
        .then(function (r) { if (!r.ok) throw r; return r; })
        .then(function () {
          store.set(KEY, "done:" + Date.now()); msg.className = "dbx-msg ok"; msg.textContent = "You're in — a specialist will email you within one business day.";
          btn.textContent = "Booked ✓"; toast("Request received. Check your inbox — we'll be in touch shortly."); setTimeout(function () { close(false); }, 2600);
        })
        .catch(function (r) {
          btn.disabled = false; btn.textContent = "Book my free review"; msg.className = "dbx-msg";
          msg.textContent = r && r.status === 429 ? "Too many attempts — please try again in a few minutes." : "Couldn't send that just now. Please try again, or email support@digitalburj.com.";
        });
    };
  }

  function armTriggers() {
    var fired = false, t0 = Date.now();
    function fire() { if (fired || state()) return; fired = true; cleanup(); open(); if (!shown) { fired = false; setTimeout(fire, 6000); } }
    function onScroll() {
      var h = document.documentElement, p = (h.scrollTop + innerHeight) / Math.max(h.scrollHeight, 1);
      if (p > 0.5 && Date.now() - t0 > 8000) fire();
    }
    function onLeave(e) { if (e.clientY <= 0 && Date.now() - t0 > 8000 && matchMedia("(hover:hover)").matches) fire(); }
    var timer = setTimeout(fire, 25000);
    function cleanup() { clearTimeout(timer); removeEventListener("scroll", onScroll); document.removeEventListener("mouseout", onLeave); }
    addEventListener("scroll", onScroll, { passive: true }); document.addEventListener("mouseout", onLeave);
  }
  if (document.body) attach(); else addEventListener("DOMContentLoaded", attach);
})();
