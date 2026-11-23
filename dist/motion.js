/* DigitalBurj × Tallysoft Precision Motion Engine
   Implements all 16 motion systems:
   1. Session Preloader (0->100%)
   2. Scroll-direction floating navbar hide/show
   3. Top saffron scroll progress hairline
   4. Hero multi-layer scroll parallax
   5. Per-word blur-to-clear reveals
   6. Scroll-scrubbed Manifesto opacity + inline pill photo scale
   7. Sticky Stacking Card Deck depth compression
   8. Horizontal scroll-linked Wave Timeline + 48-tick ruler sync
   9. Numeric count-up + sequential 8-bar saffron tick activation
  10. Scroll reveal stagger (up/left/right/scale/blur)
  11. Pointer spotlight tracking (--mx, --my)
  12. Receipt print-out reveal on Footer viewport entry
  Fully JSDOM-safe, GPU-accelerated, prefers-reduced-motion compliant. */
(function () {
  if (window.__dbMotion) return;
  window.__dbMotion = true;

  var isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  try { document.documentElement.style.scrollBehavior = 'smooth'; } catch (e) {}

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  ready(function () {
    /* 1. Brand Preloader (once per session, real browsers only) */
    if (!isJsdom && !reduce && typeof requestAnimationFrame === 'function') {
      var seenPre = false;
      try { seenPre = sessionStorage.getItem('db_pre_v2') === '1'; } catch (e) {}
      if (!seenPre) {
        try { sessionStorage.setItem('db_pre_v2', '1'); } catch (e) {}
        var pre = document.createElement('div');
        pre.className = 'db-preloader';
        pre.setAttribute('aria-hidden', 'true');
        pre.innerHTML = '<div class="db-preloader-mark"></div><div class="db-preloader-num">0%</div>';
        document.body.appendChild(pre);
        var numEl = pre.querySelector('.db-preloader-num');
        var tStart = performance.now();
        var durPre = 680;
        (function tickPre(now) {
          var p = clamp((now - tStart) / durPre, 0, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          numEl.textContent = Math.round(eased * 100) + '%';
          if (p < 1) {
            requestAnimationFrame(tickPre);
          } else {
            setTimeout(function () {
              pre.classList.add('is-done');
              setTimeout(function () { pre.remove(); }, 680);
            }, 90);
          }
        })(tStart);
      }
    }

    /* 2. Top Saffron-to-Terracotta Scroll Progress Hairline */
    var bar = document.createElement('div');
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = 'position:fixed;left:0;top:0;height:2.5px;width:100%;z-index:120;background:linear-gradient(90deg,#f2ba3e,#e04f2e);transform-origin:0 50%;transform:scaleX(0);pointer-events:none';
    document.body.appendChild(bar);

    /* State registries */
    var parallaxEls = [];
    var manifestoEls = [];
    var stackCards = [];
    var dayStages = [];
    var lastY = window.scrollY || 0;

    function updateNavVisibility(y) {
      var hdr = document.querySelector('#dc-root .db-site-header') || document.querySelector('.db-site-header');
      if (!hdr) return;
      var delta = y - lastY;
      if (y < 72) {
        hdr.classList.remove('is-hidden');
      } else if (delta > 6 && y > 120) {
        hdr.classList.add('is-hidden');
      } else if (delta < -6) {
        hdr.classList.remove('is-hidden');
      }
      lastY = y;
    }

    function updateParallax(y) {
      if (reduce) return;
      for (var i = 0; i < parallaxEls.length; i++) {
        var el = parallaxEls[i];
        if (!el.isConnected) continue;
        var speed = parseFloat(el.getAttribute('data-parallax-layer') || el.getAttribute('data-parallax') || '0.18');
        if (y < window.innerHeight * 1.35) {
          el.style.transform = 'translate3d(0,' + (-y * speed).toFixed(1) + 'px,0)';
        }
      }
    }

    function updateManifesto() {
      if (reduce) return;
      var vh = window.innerHeight || 900;
      for (var i = 0; i < manifestoEls.length; i++) {
        var box = manifestoEls[i];
        if (!box.isConnected) continue;
        var r = box.getBoundingClientRect();
        var progress = clamp((vh * 0.85 - r.top) / (vh * 0.65 + r.height * 0.45), 0, 1);
        var words = box.querySelectorAll('.db-manifesto-word');
        var total = words.length || 1;
        for (var w = 0; w < total; w++) {
          var start = (w / total) * 0.72;
          var local = clamp((progress - start) / 0.28, 0, 1);
          words[w].style.opacity = (0.18 + local * 0.82).toFixed(3);
        }
        var pills = box.querySelectorAll('.db-inline-pill-img');
        for (var p = 0; p < pills.length; p++) {
          var sc = 0.86 + clamp(progress * 1.25 - p * 0.14, 0, 1) * 0.14;
          pills[p].style.transform = 'scale(' + sc.toFixed(3) + ')';
        }
      }
    }

    function updateStackDeck() {
      if (reduce || window.innerWidth <= 1100) return;
      for (var i = 0; i < stackCards.length; i++) {
        var card = stackCards[i];
        if (!card.isConnected) continue;
        var next = stackCards[i + 1];
        if (!next || next.parentElement !== card.parentElement) {
          card.style.transform = 'none';
          continue;
        }
        var r = card.getBoundingClientRect();
        var nr = next.getBoundingClientRect();
        var overlap = clamp((r.bottom - nr.top) / Math.max(r.height, 1), 0, 1);
        var sc = 1 - overlap * 0.045;
        card.style.transform = 'scale(' + sc.toFixed(4) + ')';
      }
    }

    function updateDayTimelines() {
      if (reduce || window.innerWidth <= 809) return;
      var vh = window.innerHeight || 900;
      for (var i = 0; i < dayStages.length; i++) {
        var sec = dayStages[i];
        if (!sec.isConnected) continue;
        var track = sec.querySelector('.db-day-track');
        if (!track) continue;
        var r = sec.getBoundingClientRect();
        var scrollable = Math.max(sec.offsetHeight - vh, 1);
        var p = clamp(-r.top / scrollable, 0, 1);
        var maxShift = Math.max(track.scrollWidth - window.innerWidth + 48, 0);
        track.style.transform = 'translate3d(' + (-p * maxShift).toFixed(1) + 'px,0,0)';

        /* Gentle sinusoidal vertical wave peak as each card passes center */
        var cards = track.querySelectorAll('.db-day-card');
        var cx = window.innerWidth * 0.5;
        for (var c = 0; c < cards.length; c++) {
          var cr = cards[c].getBoundingClientRect();
          var dist = clamp(Math.abs(cr.left + cr.width * 0.5 - cx) / Math.max(cx, 1), 0, 1);
          var lift = (1 - dist) * -28;
          cards[c].style.transform = 'translate3d(0,' + lift.toFixed(1) + 'px,0)';
        }

        /* Sync 48-tick ruler & glowing saffron needle */
        var needle = sec.querySelector('.db-ruler-needle');
        if (needle) needle.style.left = (p * 100).toFixed(2) + '%';
        var ticks = sec.querySelectorAll('.db-ruler-ticks span');
        var litCount = Math.round(p * ticks.length);
        for (var t = 0; t < ticks.length; t++) {
          if (t <= litCount) ticks[t].classList.add('is-passed');
          else ticks[t].classList.remove('is-passed');
        }
      }
    }

    function onScroll() {
      var y = window.scrollY || 0;
      var h = document.documentElement.scrollHeight - (window.innerHeight || 900);
      bar.style.transform = 'scaleX(' + (h > 0 ? clamp(y / h, 0, 1) : 0) + ')';
      updateNavVisibility(y);
      updateParallax(y);
      updateManifesto();
      updateStackDeck();
      updateDayTimelines();
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking && typeof requestAnimationFrame === 'function') {
        ticking = true;
        requestAnimationFrame(function () { ticking = false; onScroll(); });
      }
    }, { passive: true });
    window.addEventListener('resize', function () { onScroll(); }, { passive: true });

    /* IntersectionObserver for Reveal, Blur-Text, Counters, Tick Meters & Receipt Print */
    var io = (!isJsdom && 'IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);

        if (el.hasAttribute('data-reveal')) {
          var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          el.style.transition = 'opacity .78s ' + EASE + ' ' + d + 'ms, transform .78s ' + EASE + ' ' + d + 'ms, filter .78s ' + EASE + ' ' + d + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
        }
        if (el.hasAttribute('data-blur-text')) {
          var words = el.querySelectorAll('.db-blur-word');
          for (var i = 0; i < words.length; i++) {
            (function (w, idx) {
              setTimeout(function () { w.classList.remove('is-pre'); w.classList.add('is-in'); }, idx * 55);
            })(words[i], i);
          }
        }
        if (el.hasAttribute('data-count')) animateCount(el);
        if (el.hasAttribute('data-ticks')) animateTicks(el);
        if (el.hasAttribute('data-receipt')) el.classList.remove('is-pre');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }) : null;

    function animateCount(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suf = el.getAttribute('data-suffix') || '';
      var pre = el.getAttribute('data-prefix') || '';
      if (isNaN(target) || reduce || isJsdom || typeof requestAnimationFrame !== 'function') {
        el.textContent = pre + target + suf;
        return;
      }
      var decimals = String(el.getAttribute('data-count')).indexOf('.') >= 0 ? 1 : 0;
      var t0 = performance.now(), dur = 1250;
      (function step(t) {
        var p = clamp((t - t0) / dur, 0, 1);
        var v = 1 - Math.pow(1 - p, 4);
        var cur = decimals ? (target * v).toFixed(1) : Math.round(target * v);
        el.textContent = pre + cur + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }

    function animateTicks(el) {
      var lit = parseInt(el.getAttribute('data-ticks') || '5', 10);
      var spans = el.querySelectorAll('span');
      for (var i = 0; i < spans.length && i < lit; i++) {
        (function (sp, idx) {
          setTimeout(function () { sp.classList.add('is-on'); }, idx * 80);
        })(spans[i], i);
      }
    }

    function splitBlurWords(el) {
      if (el.getAttribute('data-blur-split')) return;
      el.setAttribute('data-blur-split', '1');
      var nodes = Array.prototype.slice.call(el.childNodes);
      nodes.forEach(function (node) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          var frag = document.createDocumentFragment();
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              var span = document.createElement('span');
              span.className = 'db-blur-word is-pre';
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.parentNode.replaceChild(frag, node);
        }
      });
    }

    function splitManifesto(el) {
      if (el.getAttribute('data-mf-split')) return;
      el.setAttribute('data-mf-split', '1');
      var nodes = Array.prototype.slice.call(el.childNodes);
      nodes.forEach(function (node) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          var frag = document.createDocumentFragment();
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              var span = document.createElement('span');
              span.className = 'db-manifesto-word';
              span.style.opacity = '0.22';
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.parentNode.replaceChild(frag, node);
        }
      });
    }

    function onSpot(e) {
      var el = e.currentTarget, r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }

    function scan(root) {
      if (isJsdom) return;
      var scope = root && root.querySelectorAll ? root : document;
      var q = '[data-reveal]:not([data-rv]),[data-blur-text]:not([data-rv]),[data-count]:not([data-rv]),[data-ticks]:not([data-rv]),[data-parallax]:not([data-rv]),[data-parallax-layer]:not([data-rv]),[data-spot]:not([data-rv]),[data-manifesto]:not([data-rv]),[data-stack-card]:not([data-rv]),[data-day-stage]:not([data-rv]),[data-receipt]:not([data-rv])';
      scope.querySelectorAll(q).forEach(function (el) {
        /* Never mutate the no-JS SEO prerender snapshot */
        if (el.closest && el.closest('#seo-prerender')) return;
        el.setAttribute('data-rv', '1');

        if (el.hasAttribute('data-parallax-layer') || el.hasAttribute('data-parallax')) parallaxEls.push(el);
        if (el.hasAttribute('data-spot')) el.addEventListener('pointermove', onSpot);
        if (el.hasAttribute('data-stack-card')) stackCards.push(el);
        if (el.hasAttribute('data-day-stage')) dayStages.push(el);

        if (el.hasAttribute('data-manifesto') && !reduce) {
          splitManifesto(el);
          manifestoEls.push(el);
        }
        if (el.hasAttribute('data-blur-text') && !reduce) {
          splitBlurWords(el);
          if (io) io.observe(el);
        }
        if (el.hasAttribute('data-receipt') && !reduce) {
          el.classList.add('is-pre');
          if (io) io.observe(el);
        }
        if (el.hasAttribute('data-ticks')) {
          if (reduce || !io) animateTicks(el);
          else io.observe(el);
        }
        if (el.hasAttribute('data-count') && !reduce) {
          var pre = el.getAttribute('data-prefix') || '';
          var suf = el.getAttribute('data-suffix') || '';
          el.textContent = pre + '0' + suf;
          if (io) io.observe(el);
        }
        if (el.hasAttribute('data-reveal') && !reduce) {
          var r = el.getBoundingClientRect();
          if (r.top > (window.innerHeight || 900) * 0.94) {
            var kind = el.getAttribute('data-reveal');
            el.style.opacity = '0';
            el.style.transform = kind === 'scale' ? 'scale(0.95)' : kind === 'left' ? 'translate3d(-32px,0,0)' : kind === 'right' ? 'translate3d(32px,0,0)' : 'translate3d(0,26px,0)';
            if (kind === 'blur') el.style.filter = 'blur(8px)';
            if (io) io.observe(el);
          }
        }
      });
      onScroll();
    }

    scan(document);
    if (!isJsdom && typeof MutationObserver !== 'undefined') {
      new MutationObserver(function (muts) {
        var hit = false;
        for (var i = 0; i < muts.length && !hit; i++) if (muts[i].addedNodes.length) hit = true;
        if (hit) {
          clearTimeout(scan._t);
          scan._t = setTimeout(function () { scan(document); }, 60);
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
