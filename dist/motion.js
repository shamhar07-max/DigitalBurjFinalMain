/* DigitalBurj motion layer: scroll reveal, counters, parallax, spotlight, progress bar. */
(function () {
  if (window.__dbMotion) return;
  window.__dbMotion = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.22,.8,.24,1)';
  document.documentElement.style.scrollBehavior = 'smooth';

  function ready(fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    // progress bar
    var bar = document.createElement('div');
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = 'position:fixed;left:0;top:0;height:2px;width:100%;z-index:100;background:linear-gradient(90deg,#f23a1d,#ff7a45);transform-origin:0 50%;transform:scaleX(0);pointer-events:none';
    document.body.appendChild(bar);

    var parallax = [];
    function onScroll() {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
      if (reduce) return;
      for (var i = 0; i < parallax.length; i++) {
        var el = parallax[i], r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) continue;
        var f = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var c = r.top + r.height / 2 - innerHeight / 2;
        el.style.transform = 'translate3d(0,' + (-c * f).toFixed(1) + 'px,0) scale(1.12)';
      }
    }
    var ticking = false;
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });

    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        if (el.hasAttribute('data-reveal')) {
          var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          el.style.transition = 'opacity .8s ' + EASE + ' ' + d + 'ms, transform .8s ' + EASE + ' ' + d + 'ms, filter .8s ' + EASE + ' ' + d + 'ms';
          el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = 'none';
        }
        if (el.hasAttribute('data-count')) count(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

    function count(el) {
      var target = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = target + suf; return; }
      var t0 = performance.now(), dur = 1400;
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur), v = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * v) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }

    function spot(e) {
      var el = e.currentTarget, r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }

    function scan(root) {
      (root.querySelectorAll ? root : document).querySelectorAll('[data-reveal]:not([data-rv]),[data-count]:not([data-rv]),[data-parallax]:not([data-rv]),[data-spot]:not([data-rv])').forEach(function (el) {
        el.setAttribute('data-rv', '1');
        if (el.hasAttribute('data-parallax')) { parallax.push(el); }
        if (el.hasAttribute('data-spot')) { el.addEventListener('pointermove', spot); }
        if (el.hasAttribute('data-count') && !reduce) { el.textContent = '0' + (el.getAttribute('data-suffix') || ''); }
        if (el.hasAttribute('data-reveal') && !reduce) {
          var r = el.getBoundingClientRect();
          if (r.top > innerHeight * 0.92) {
            var kind = el.getAttribute('data-reveal');
            el.style.opacity = '0';
            el.style.transform = kind === 'scale' ? 'scale(.96)' : kind === 'left' ? 'translate3d(-32px,0,0)' : kind === 'right' ? 'translate3d(32px,0,0)' : 'translate3d(0,28px,0)';
            if (kind === 'blur') el.style.filter = 'blur(8px)';
          } else { return; }
        }
        if (io) io.observe(el);
      });
      onScroll();
    }
    scan(document);
    new MutationObserver(function (muts) {
      var hit = false;
      for (var i = 0; i < muts.length && !hit; i++) if (muts[i].addedNodes.length) hit = true;
      if (hit) { clearTimeout(scan._t); scan._t = setTimeout(function () { scan(document); }, 60); }
    }).observe(document.body, { childList: true, subtree: true });
  });
})();

/* DigitalBurj support chat — bottom-left, opposite the WhatsApp button. Loaded lazily (idle / first interaction) to keep first paint fast. */
(function () {
  if (window.__dbChat) return; window.__dbChat = true;
  function load() {
    if (window.__dbChatLoaded) return; window.__dbChatLoaded = true;
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://storage.googleapis.com/mychatbot-widget-assets/v1/style.css'; document.head.appendChild(css);
    var box = document.createElement('div'); box.id = 'my-chat-widget-container'; document.body.appendChild(box);
    var js = document.createElement('script'); js.src = 'https://storage.googleapis.com/mychatbot-widget-assets/v1/widget.js'; js.async = true;
    js.onload = function () {
      try {
        window.MyChatBot.mount('#my-chat-widget-container', {
          account_id: '823ac6fd-b211-4d21-a3d6-33579e5d1935', widget_id: 'digitalburj-support', api_url: 'https://api.mychatbot.app',
          assistant_name: 'DigitalBurj Support', color: '#f23a1d', lang: 'en', button_position: 'left', button_scale: 1.17, button_margin: 20, button_margin_mobile: 20,
          logo: new URL('brand/favicon.png', location.href).href
        });
      } catch (e) { /* chat is optional — never break the page */ }
    };
    document.body.appendChild(js);
  }
  var armed = false;
  function arm() { if (armed) return; armed = true; ['pointerdown', 'scroll', 'keydown', 'touchstart'].forEach(function (t) { removeEventListener(t, arm, true); }); load(); }
  ['pointerdown', 'scroll', 'keydown', 'touchstart'].forEach(function (t) { addEventListener(t, arm, { capture: true, passive: true }); });
  addEventListener('load', function () { setTimeout(function () { setTimeout(arm, 2500); }, 1500); });
})();
