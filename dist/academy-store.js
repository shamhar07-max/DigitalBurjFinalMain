/* DigitalBurj Academy — page logic. Markup lives in academy-store.html (fetched at boot) so both are plain, editable source. */
(function(){
'use strict';
function run(){

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

  /* ============================================================
     COURSES (master record)
     ============================================================ */
  var COURSES = DBA.COURSES, BUNDLES = DBA.BUNDLES;

  /* ============================================================
     STATE
     ============================================================ */
  var STORE_KEY = 'db-academy-store-v2';
  var STATE = loadState();
  function loadState(){
    var st = {}; try { st = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch(e){}
    st.cart = st.cart || []; st.bundleFilter = st.bundleFilter || 'all'; st.search = ''; st.email = st.email || ''; st.name = st.name || '';
    st.orders = st.orders || []; st.waitlist = st.waitlist || []; st.supportRefs = st.supportRefs || []; st.diagnostic = st.diagnostic || null;
    return st;
  }
  function saveState(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(STATE)); } catch(e){} }

  /* Account + entitlements come from the server (session cookie shared across *.digitalburj.com) — never from localStorage. */
  var ACCT = null;   // { user, entitlements: { items, courses, orders } | null }
  function ownedItems(){ return ACCT && ACCT.entitlements ? ACCT.entitlements.items : []; }
  function paidCourseIds(){ return ACCT && ACCT.entitlements ? ACCT.entitlements.courses : []; }
  function ownsCourse(id){ return paidCourseIds().indexOf(id) > -1; }
  function ownsBundle(id){ return ownedItems().indexOf(id) > -1; }
  function courseValue(courseId){ var c = DBA.course(courseId); return c ? c.price : 0; }
  function computeUpgrade(bundle){
    var ownedValue = 0;
    bundle.includes.forEach(function(cid){ if (ownsCourse(cid)) ownedValue += courseValue(cid); });
    return { original: bundle.price, adjusted: Math.max(0, bundle.price - ownedValue), discount: ownedValue };
  }
  function loadAccount(){
    return DBA.api('me', {}).then(function(r){ ACCT = (r.ok && r.data && r.data.signedIn) ? r.data : null; });
  }
  function money(n){ return '$' + (Math.round(n * 100) / 100).toFixed(n % 1 === 0 ? 0 : 2); }

  /* ============================================================
     TOAST
     ============================================================ */
  var toastTimer = null;
  function toast(msg, ok){
    var t = $('#toast'); $('#toastMsg').textContent = msg;
    t.classList.toggle('ok', !!ok);
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('on'); }, 3200);
  }

  /* ============================================================
     MODAL
     ============================================================ */
  var mBg = $('#modalBg'), mT = $('#modalTitle'), mK = $('#modalKicker'), mB = $('#modalBody');
  function openModal(kicker, title, html, wide){
    mK.textContent = kicker; mT.textContent = title; mB.innerHTML = html;
    $('#modalBox').classList.toggle('modal-wide', !!wide);
    mBg.classList.add('open'); mBg.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ $('#modalClose').focus(); }, 60);
  }
  function closeModal(){
    mBg.classList.remove('open'); mBg.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  $('#modalClose').addEventListener('click', closeModal);
  mBg.addEventListener('click', function(e){ if (e.target === mBg) closeModal(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeModal(); closeMobile(); } });

  /* ============================================================
     HEADER / MOBILE
     ============================================================ */
  function closeMobile(){}

  $$('[data-scroll]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById(a.dataset.scroll);
      if (target){ closeMobile(); target.scrollIntoView({ behavior:'smooth', block:'start' }); if (history.replaceState) history.replaceState(null, '', '#' + a.dataset.scroll); }
    });
  });

  /* ============================================================
     ACCOUNT STRIP (server-driven)
     ============================================================ */
  function renderAccount(){
    var strip = $('#acctStrip'), btn = $('#signInBtn');
    if (!ACCT || !ACCT.user){ strip.style.display = 'none'; btn.textContent = 'Sign in'; btn.setAttribute('data-app', '/signin'); btn.href = DBA.appUrl('/signin'); return; }
    btn.textContent = 'Continue learning'; btn.setAttribute('data-app', '/'); btn.href = DBA.appUrl('/');
    var e = ACCT.entitlements, paid = 0;
    if (e) e.orders.forEach(function(o){ if (o.status !== 'refunded') paid += o.amount || 0; });
    strip.style.display = 'block';
    $('#acctHello').textContent = 'Welcome back, ' + ACCT.user.name.split(' ')[0] + '.';
    $('#acctLine').textContent = e ? 'Everything you own, in one place.' : ACCT.entitlementsLocked || 'Verify your email to unlock what you have purchased.';
    $('#mlCourses').textContent = e ? e.courses.length : 0;
    $('#mlBundles').textContent = e ? e.items.filter(function(id){ return !!DBA.bundle(id); }).length : 0;
    $('#mlPaid').textContent = money(paid);
  }

  /* ============================================================
     RENDER — BUNDLES
     ============================================================ */
  var bundleGrid = $('#bundleGrid');
  function bundleMatchesFilter(b, f){
    if (f === 'all') return true;
    if (f === 'starter') return b.category === 'starter';
    return b.category === f;
  }
  function renderBundles(){
    bundleGrid.innerHTML = '';
    var f = STATE.bundleFilter;
    var q = STATE.search.toLowerCase();
    var list = BUNDLES.filter(function(b){
      if (!bundleMatchesFilter(b, f)) return false;
      if (!q) return true;
      return (b.name + ' ' + b.tagline + ' ' + b.desc + ' ' + b.includes.join(' ')).toLowerCase().indexOf(q) > -1;
    });
    if (!list.length){
      bundleGrid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No bundles match</h3><p>Try a different filter or search term.</p></div>';
      return;
    }
    list.forEach(function(b, i){
      var owned = ownsBundle(b.id);
      var card = el('article', 'bundle-card reveal ' + b.theme + (b.featured ? ' featured' : ''));
      if (i < 3) card.classList.add('in');
      else { card.classList.add('d' + (i % 3)); }
      card.innerHTML =
        '<div class="bundle-visual"><div class="bv-icon">' + esc(b.name.slice(0,1)) + '</div></div>' +
        '<div class="bundle-body">' +
          '<div class="bundle-meta"><span>' + esc(b.tagline) + '</span>' + (owned ? '<span class="pill ok">Owned</span>' : (DBA.bundleStatus(b) === 'live' ? '<span class="pill neutral">' + b.includes.length + (b.includes.length === 1 ? ' course' : ' courses') + '</span>' : '<span class="pill warn">Opens soon</span>')) + '</div>' +
          '<h3>' + esc(b.name) + '</h3>' +
          '<p class="bundle-desc">' + esc(b.desc) + '</p>' +
          '<div class="bundle-includes">' +
            '<div class="bi-label">Includes</div>' +
            '<ul>' + b.includes.slice(0,5).map(function(cid){
              var c = COURSES.filter(function(x){ return x.id === cid; })[0];
              return '<li>' + esc(c ? c.title : cid) + '</li>';
            }).join('') +
            (b.includes.length > 5 ? '<li>+ ' + (b.includes.length - 5) + ' more courses</li>' : '') +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="bundle-foot">' +
          '<div class="bundle-price">' +
            '<span class="bp-now">' + money(b.price) + '</span>' +
            (b.savings ? '<span class="bp-old">' + esc(b.savings) + '</span>' : '<span class="bp-old">one-time purchase</span>') +
            '<span class="bp-save">' + (owned ? 'Unlocked' : 'Lifetime access') + '</span>' +
          '</div>' +
          '<div class="bundle-actions">' +
            '<button class="btn btn-ghost btn-sm" data-view-bundle="' + esc(b.id) + '">Details</button>' +
            (owned
              ? '<button class="btn btn-navy btn-sm" data-open-bundle="' + esc(b.id) + '">Open →</button>'
              : (DBA.bundleStatus(b) === 'live'
                  ? '<button class="btn btn-primary btn-sm" data-buy-bundle="' + esc(b.id) + '">Buy now</button>'
                  : '<button class="btn btn-ghost btn-sm" data-waitlist="' + esc(b.id) + '">Join waitlist</button>')) +
          '</div>' +
        '</div>';
      bundleGrid.appendChild(card);
    });
    // wire
    $$('[data-view-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleModal(b.dataset.viewBundle); }); });
    $$('[data-buy-bundle]').forEach(function(b){ b.addEventListener('click', function(){ addToCart(b.dataset.buyBundle); }); });
    $$('#bundleGrid [data-waitlist]').forEach(function(b){ b.addEventListener('click', function(){ openWaitlist(b.dataset.waitlist); }); });
    $$('[data-open-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleContent(b.dataset.openBundle); }); });
    observeReveals(bundleGrid);
  }

  function openBundleModal(bundleId){
    var b = BUNDLES.filter(function(x){ return x.id === bundleId; })[0];
    if (!b) return;
    var up = computeUpgrade(b);
    var owned = ownsBundle(b.id);
    var coursesHtml = b.includes.map(function(cid){
      var c = COURSES.filter(function(x){ return x.id === cid; })[0];
      if (!c) return '';
      var owned2 = ownsCourse(cid);
      return '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--line-2)">' +
        '<div><div style="font-size:13px;font-weight:700;color:var(--navy)">' + esc(c.title) + '</div>' +
        '<div style="font-size:11px;color:var(--slate-3);margin-top:2px">' + esc(c.id) + ' · ' + esc(c.level) + ' · ' + c.hours + ' hrs</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center">' + (owned2 ? '<span class="pill ok">Owned</span>' : '<span style="font-size:13px;font-weight:800;color:var(--navy)">' + money(c.price) + '</span>') + '</div>' +
      '</div>';
    }).join('');
    var totalIndividual = b.includes.reduce(function(s, cid){ return s + courseValue(cid); }, 0);
    var html =
      '<p>' + esc(b.desc) + '</p>' +
      '<div style="display:flex;gap:14px;margin-top:18px;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Bundle price</div>' +
          '<div style="font-size:26px;font-weight:800;color:var(--navy);letter-spacing:-.03em">' + money(up.adjusted) + '</div>' +
          (up.discount > 0 ? '<div style="font-size:11px;font-weight:700;color:var(--ok);margin-top:4px">' + money(up.discount) + ' credit applied</div>' : '') +
        '</div>' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Individual total</div>' +
          '<div style="font-size:26px;font-weight:800;color:var(--slate-3);letter-spacing:-.03em;text-decoration:line-through">' + money(totalIndividual) + '</div>' +
          '<div style="font-size:11px;font-weight:700;color:var(--ok);margin-top:4px">Save ' + money(totalIndividual - up.adjusted) + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Access</div>' +
          '<div style="font-size:15px;font-weight:800;color:var(--navy)">Lifetime</div>' +
          '<div style="font-size:11px;color:var(--slate-3);margin-top:4px">One-time purchase</div>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:20px">' +
        '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:8px">' + b.includes.length + ' courses included</div>' +
        coursesHtml +
      '</div>' +
      '<p class="modal-note">' + (DBA.bundleStatus(b) === 'live' ? 'A confirmed purchase grants a scoped Academy entitlement.' : 'Some courses in this bundle are not Live yet, so it cannot be purchased. Only Live products are purchasable.') + ' It does not imply employment, accreditation, or workplace experience.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        (owned
          ? '<button class="btn btn-navy" id="mbOpen">Open in library →</button>'
          : (DBA.bundleStatus(b) === 'live'
              ? '<button class="btn btn-primary" id="mbBuy">Buy for ' + money(up.adjusted) + '</button>' +
                '<button class="btn btn-ghost" id="mbAdd">Add to cart</button>'
              : '<button class="btn btn-primary" id="mbWait">Join the waitlist</button>')) +
        '<button class="btn btn-ghost" id="mbClose">Close</button>' +
      '</div>';
    openModal('Bundle', b.name, html, true);
    var mbBuy = $('#mbBuy'); if (mbBuy) mbBuy.addEventListener('click', function(){ closeModal(); startCheckout(b.id); });
    var mbAdd = $('#mbAdd'); if (mbAdd) mbAdd.addEventListener('click', function(){ closeModal(); addToCart(b.id); });
    var mbWait = $('#mbWait'); if (mbWait) mbWait.addEventListener('click', function(){ openWaitlist(b.id); });
    var mbOpen = $('#mbOpen'); if (mbOpen) mbOpen.addEventListener('click', function(){ closeModal(); openBundleContent(b.id); });
    $('#mbClose').addEventListener('click', closeModal);
  }

  function openBundleContent(bundleId){
    var b = BUNDLES.filter(function(x){ return x.id === bundleId; })[0];
    if (!b) return;
    if (!ownsBundle(b.id)){
      toast('You do not own this bundle yet.');
      return;
    }
    var coursesHtml = b.includes.map(function(cid){
      var c = COURSES.filter(function(x){ return x.id === cid; })[0];
      if (!c) return '';
      return '<div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:11px;margin-bottom:8px">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">' +
          '<div><div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--red)">' + esc(c.id) + '</div>' +
          '<div style="font-size:14px;font-weight:800;color:var(--navy);margin-top:4px">' + esc(c.title) + '</div>' +
          '<div style="font-size:12px;color:var(--slate-2);margin-top:6px;line-height:1.55">' + esc(c.desc) + '</div></div>' +
          '<button class="btn btn-primary btn-sm" data-start-course="' + esc(c.id) + '">Start</button>' +
        '</div>' +
      '</div>';
    }).join('');
    openModal('Your bundle', b.name,
      '<p>' + 'You own this bundle. Every course is unlocked.' + '</p>' +
      '<div style="margin-top:18px">' + coursesHtml + '</div>' +
      '<p class="modal-note">Courses open in the Academy app at academy.digitalburj.com — 12-stage missions with hints and an evidence tray.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-ghost" id="bcClose">Close</button></div>');
    $('#bcClose').addEventListener('click', closeModal);
    $$('[data-start-course]').forEach(function(b2){
      b2.addEventListener('click', function(){ location.href = DBA.appUrl('/') + '#curriculum'; });
    });
  }

  /* ============================================================
     RENDER — COURSES
     ============================================================ */
  function renderCourses(){
    var grid = $('#courseGrid'); grid.innerHTML = '';
    var q = STATE.search.toLowerCase();
    var list = COURSES.filter(function(c){
      if (!q) return true;
      return (c.title + ' ' + c.desc + ' ' + c.id).toLowerCase().indexOf(q) > -1;
    });
    if (!list.length){
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No courses match</h3><p>Try a different search term.</p></div>';
      return;
    }
    list.forEach(function(c){
      var owned = ownsCourse(c.id);
      var card = el('article', 'course-card' + (owned ? ' owned' : ' locked'));
      card.innerHTML =
        '<div class="course-code">' + esc(c.id) + ' · ' + esc(c.pillar) + '</div>' +
        '<h4>' + esc(c.title) + '</h4>' +
        '<div class="cc-meta">' + esc(c.level) + ' · ' + c.hours + ' hrs · ' + esc(c.status === 'live' ? 'Live' : c.status === 'pilot' ? 'Pilot' : 'Planned') + '</div>' +
        '<div class="cc-desc">' + esc(c.desc) + '</div>' +
        '<div class="cc-foot">' +
          '<div class="cc-price">' + money(c.price) + '</div>' +
          (owned
            ? '<button class="btn btn-navy btn-sm" data-open-course="' + esc(c.id) + '">Open</button>'
            : (c.status === 'live'
                ? '<button class="btn btn-primary btn-sm" data-buy-course="' + esc(c.id) + '">Buy</button>'
                : '<button class="btn btn-ghost btn-sm" data-waitlist="' + esc(c.id) + '">Join waitlist</button>')) +
        '</div>';
      grid.appendChild(card);
    });
    $$('[data-buy-course]').forEach(function(b){ b.addEventListener('click', function(){ addToCart(b.dataset.buyCourse); }); });
    $$('#courseGrid [data-waitlist]').forEach(function(b){ b.addEventListener('click', function(){ openWaitlist(b.dataset.waitlist); }); });
    $$('[data-open-course]').forEach(function(b){ b.addEventListener('click', function(){ location.href = DBA.appUrl('/') + '#curriculum'; }); });
  }

  /* ============================================================
     CART / CHECKOUT
     ============================================================ */
  function addToCart(itemId){
    if (STATE.cart.indexOf(itemId) > -1){ toast('Already in your cart.'); return; }
    if (ownsBundle(itemId) || ownsCourse(itemId)){ toast('You already own this.'); return; }
    if (!DBA.isLive(itemId)){ openWaitlist(itemId); return; }
    STATE.cart.push(itemId);
    saveState();
    updateCartBadge();
    openCart();
  }
  function removeFromCart(itemId){
    var i = STATE.cart.indexOf(itemId);
    if (i > -1){ STATE.cart.splice(i, 1); saveState(); updateCartBadge(); openCart(); }
  }
  function updateCartBadge(){
    var b = $('#cartBadge');
    if (STATE.cart.length === 0){ b.style.display = 'none'; }
    else { b.style.display = 'flex'; b.textContent = STATE.cart.length; }
  }
  function itemInfo(id){
    var b = BUNDLES.filter(function(x){ return x.id === id; })[0];
    if (b) return { type:'bundle', title:b.name, sub:b.includes.length + ' courses', price:computeUpgrade(b).adjusted, originalPrice:b.price };
    var c = COURSES.filter(function(x){ return x.id === id; })[0];
    if (c) return { type:'course', title:c.title, sub:c.id + ' · ' + c.level, price:c.price, originalPrice:c.price };
    return null;
  }
  function cartTotal(){
    return STATE.cart.reduce(function(sum, id){
      var info = itemInfo(id);
      return sum + (info ? info.price : 0);
    }, 0);
  }
  function openCart(){
    if (STATE.cart.length === 0){
      openModal('Cart', 'Your cart is empty',
        '<p>Browse bundles and courses to add items.</p>' +
        '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-primary" id="cartBrowse">Browse bundles</button><button class="btn btn-ghost" id="cartCloseEmpty">Close</button></div>');
      $('#cartBrowse').addEventListener('click', function(){ closeModal(); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
      $('#cartCloseEmpty').addEventListener('click', closeModal);
      return;
    }
    var itemsHtml = STATE.cart.map(function(id){
      var info = itemInfo(id);
      if (!info) return '';
      var discount = info.originalPrice - info.price;
      return '<div class="cart-item">' +
        '<div class="ci-left"><div class="ci-title">' + esc(info.title) + '</div>' +
        '<div class="ci-sub">' + esc(info.sub) + (discount > 0 ? ' · <span style="color:var(--ok);font-weight:700">' + money(discount) + ' credit</span>' : '') + '</div></div>' +
        '<div class="ci-price">' + money(info.price) + '</div>' +
        '<button class="ci-remove" data-remove="' + esc(id) + '">✕</button>' +
      '</div>';
    }).join('');
    var total = cartTotal();
    var count = STATE.cart.length;
    var html =
      '<div class="cart-items">' + itemsHtml + '</div>' +
      '<div class="cart-total"><span class="ct-label">Total (' + count + ' item' + (count === 1 ? '' : 's') + ')</span><span class="ct-amount">' + money(total) + '</span></div>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="checkoutBtn">Checkout →</button>' +
        '<button class="btn btn-ghost" id="cartContinue">Continue browsing</button>' +
      '</div>' +
      '<p class="modal-note">One-time purchase, lifetime access. Access is granted only after payment is confirmed.</p>';
    openModal('Cart', 'Your cart', html, true);
    $$('[data-remove]').forEach(function(b){
      b.addEventListener('click', function(){ removeFromCart(b.dataset.remove); });
    });
    $('#checkoutBtn').addEventListener('click', function(){ closeModal(); startCheckout(); });
    $('#cartContinue').addEventListener('click', function(){ closeModal(); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
  }
  $('#cartBtn').addEventListener('click', openCart);

  function fieldErr(sel, bad){
    var w = $(sel).closest('.field'); if (!w) return;
    w.classList.toggle('has-error', !!bad);
  }
  function startCheckout(singleItemId){
    var all = singleItemId ? [singleItemId] : STATE.cart.slice();
    if (!all.length){ toast('Your cart is empty.'); return; }
    var items = all.filter(function(id){ return DBA.isLive(id); });
    var notLive = all.filter(function(id){ return !DBA.isLive(id); });
    if (!items.length){ openWaitlist(notLive[0]); return; }
    var signed = ACCT && ACCT.user;
    var q = null, code = '', busy = false;
    var html =
      '<div id="coSummary" style="background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:6px 16px 14px;margin-bottom:16px" aria-live="polite"></div>' +
      '<div class="field"><label for="co-coupon">Promotion code (optional)</label><div class="coupon-row"><input id="co-coupon" type="text" autocomplete="off" placeholder="Enter code" /><button class="btn btn-ghost btn-sm" id="coApply" type="button">Apply</button></div><span id="coCouponMsg" style="display:block;font-size:12px;margin-top:6px;color:var(--slate-3)"></span></div>' +
      '<div class="field-row">' +
        '<div class="field"><label for="co-name">Full name</label><input id="co-name" type="text" autocomplete="name" value="' + esc(signed ? ACCT.user.name : STATE.name) + '" /><span class="err">Please enter your name.</span></div>' +
        '<div class="field"><label for="co-email">Email</label><input id="co-email" type="email" autocomplete="email" ' + (signed ? 'readonly ' : '') + 'value="' + esc(signed ? ACCT.user.email : STATE.email) + '" /><span class="err">Please enter a valid email.</span></div>' +
      '</div>' +
      '<p style="font-size:12.5px;color:var(--slate-3);margin:-4px 0 12px">Use this email when you create your Academy account — access is attached to it.</p>' +
      '<label class="check"><input type="checkbox" id="co-consent" /><span>I accept the access, privacy and refund terms (14 days, if no assessment has been submitted). I understand participation is not a promise of employment or accreditation.</span></label>' +
      '<div class="co-error" id="coError" role="alert"></div>' +
      '<p class="modal-note" id="coNote"></p>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap"><button class="btn btn-primary" id="payBtn" type="button" disabled>Loading…</button><button class="btn btn-ghost" id="coCancel" type="button">Cancel</button></div>';
    openModal('Checkout', 'Confirm your order', html, true);

    function draw(){
      var lines = q.lines.map(function(l){
        return '<div class="co-line"><span><b style="color:var(--navy)">' + esc(l.title) + '</b><br><span style="font-size:11px;color:var(--slate-3)">' + esc(l.type === 'bundle' ? 'Bundle' : l.id) +
          (l.credit > 0 ? ' · <span style="color:var(--ok);font-weight:700">' + money(l.credit) + ' upgrade credit</span>' : '') + '</span></span><span style="font-weight:800;color:var(--navy);white-space:nowrap">' +
          ((l.credit > 0 || l.discount > 0) ? '<s>' + money(l.list) + '</s>' : '') + money(l.payable) + '</span></div>';
      }).join('');
      var extra = notLive.length ? '<p style="font-size:12px;color:var(--warn);margin:10px 0 0">' + notLive.length + ' item' + (notLive.length === 1 ? ' is' : 's are') + ' not Live yet and ' + (notLive.length === 1 ? 'was' : 'were') + ' left out — join the waitlist from the catalogue.</p>' : '';
      $('#coSummary').innerHTML = lines +
        (q.discount > 0 ? '<div class="co-line"><span style="color:var(--ok);font-weight:700">Promotion ' + esc(q.coupon.code) + '</span><span style="color:var(--ok);font-weight:800">−' + money(q.discount) + '</span></div>' : '') +
        '<div style="display:flex;justify-content:space-between;padding-top:12px;font-size:15px;font-weight:800;color:var(--navy)"><span>Total (' + esc(q.currency) + ')</span><span>' + money(q.total) + '</span></div>' + extra;
      var msg = $('#coCouponMsg');
      msg.textContent = q.coupon.message || '';
      msg.style.color = q.coupon.state === 'applied' ? 'var(--ok)' : (q.coupon.state === 'none' ? 'var(--slate-3)' : 'var(--stop)');
      var free = q.total === 0 && q.lines.length > 0;
      var pay = $('#payBtn'); pay.disabled = busy || !q.lines.length;
      pay.textContent = free ? 'Continue to create your account' : 'Pay ' + money(q.total) + ' securely';
      $('#coNote').textContent = free
        ? 'The promotion is verified on the Academy app after you sign in or create an account, where you confirm the enrolment. Each promotion can be used once per product.'
        : 'Payment is taken by Stripe. Access is granted only after Stripe confirms the payment to our server; you then create your account (or sign in) at academy.digitalburj.com and continue there.';
    }
    function refresh(){
      var payload = { items: items, owned: paidCourseIds(), coupon: code };
      DBA.api('quote', payload).then(function(r){
        q = (r.ok && r.data && r.data.quote) ? r.data.quote : DBA.quote(items, code, payload.owned);
        draw();
      });
    }
    $('#coApply').addEventListener('click', function(){ code = $('#co-coupon').value.trim(); refresh(); });
    $('#co-coupon').addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); code = $('#co-coupon').value.trim(); refresh(); } });
    $('#coCancel').addEventListener('click', closeModal);
    $('#payBtn').addEventListener('click', function(){
      if (busy || !q) return;
      var name = $('#co-name').value.trim(), email = $('#co-email').value.trim(), err = $('#coError'); err.classList.remove('on');
      var free = q.total === 0 && q.lines.length > 0;
      var badMail = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email);
      fieldErr('#co-email', badMail); if (badMail) return;
      STATE.email = email; if (name) STATE.name = name; saveState();
      var ids = q.lines.map(function(l){ return l.id; });
      if (free){ location.href = DBA.appUrl('/redeem') + '?items=' + encodeURIComponent(ids.join(',')) + '&coupon=' + encodeURIComponent(q.coupon.code); return; }
      if (!$('#co-consent').checked){ err.textContent = 'Please accept the access, privacy and refund terms to continue.'; err.classList.add('on'); return; }
      busy = true; draw(); $('#payBtn').textContent = 'Redirecting to Stripe…';
      DBA.api('checkout', { items: ids, email: email, consent: true, source: location.pathname }).then(function(r){
        if (r.ok && r.data && r.data.url){ location.href = r.data.url; return; }
        var unavailable = r.status === 0 || r.status === 404 || r.status === 503;
        if (!unavailable){ busy = false; draw(); err.textContent = (r.data && r.data.error) || 'Something went wrong. Please try again.'; err.classList.add('on'); return; }
        // Payment is not switched on: send an enrolment request to the team instead (grants nothing).
        if (name.length < 2){ busy = false; draw(); fieldErr('#co-name', true); err.textContent = 'Online payment is not available yet — enter your name and we will send an enrolment request instead.'; err.classList.add('on'); return; }
        DBA.api('enroll', { name: name, email: email, consent: true, items: ids, owned: paidCourseIds(), coupon: '', source: location.pathname }).then(function(r2){
          busy = false;
          if (r2.ok && r2.data && r2.data.ok){ finishRequest(r2.data.reference, r2.data.status, q); return; }
          draw(); err.textContent = (r2.data && r2.data.error) || 'The enrolment desk is not reachable right now. Please try again shortly.'; err.classList.add('on');
        });
      });
    });
    refresh();
  }
  function finishRequest(reference, status, q){
    STATE.orders.unshift({ ref: reference, date: new Date().toISOString().slice(0, 10), items: q.lines.map(function(l){ return l.title; }), total: q.total, status: status });
    var ids = q.lines.map(function(l){ return l.id; });
    STATE.cart = STATE.cart.filter(function(id){ return ids.indexOf(id) === -1; });
    saveState(); updateCartBadge();
    openModal('Enrolment', 'Request submitted',
      '<div class="success-box"><div class="sb-icon">✉</div><h3>Request received</h3>' +
      '<p>Online payment is not live yet. We will email payment steps; access is granted only after payment is confirmed.</p>' +
      '<div style="margin-top:16px;background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:14px 16px;text-align:left"><div class="co-line"><span>Reference</span><b>' + esc(reference) + '</b></div><div class="co-line"><span>Status</span><b>' + esc(status) + '</b></div><div class="co-line" style="border-bottom:0"><span>Total</span><b>' + money(q.total) + '</b></div></div>' +
      '<p class="modal-note" style="text-align:left">Nothing has been charged or unlocked.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px;justify-content:center"><button class="btn btn-ghost" id="afterBuyBrowse">Keep browsing</button></div></div>', true);
    $('#afterBuyBrowse').addEventListener('click', closeModal);
  }

  /* ============================================================
     REVEAL
     ============================================================ */
  function observeReveals(root){
    var nodes = $$('.reveal', root || document).filter(function(n){ return !n.classList.contains('in'); });
    if (!('IntersectionObserver' in window)) { nodes.forEach(function(n){ n.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
    nodes.forEach(function(n){ io.observe(n); });
  }
  observeReveals();

  /* ============================================================
     FILTERS & SEARCH
     ============================================================ */
  $$('#bundleTabs .filter-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      $$('#bundleTabs .filter-tab').forEach(function(x){ x.classList.remove('active'); });
      tab.classList.add('active');
      STATE.bundleFilter = tab.dataset.filter;
      saveState();
      renderBundles();
    });
  });
  var searchInput = $('#bundleSearch');
  var searchTimer = null;
  searchInput.addEventListener('input', function(e){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
      STATE.search = e.target.value;
      saveState();
      renderBundles();
      renderCourses();
    }, 180);
  });

  /* ============================================================
     SIGN IN
     ============================================================ */
  /* ============================================================
     PATHS / STAGES / ASSESSMENT / TOOLS / LABS (static, data-driven)
     ============================================================ */
  var PATHS = [
    { name: 'Web builder', who: 'New to tech — discovery, design and a first web workflow.', steps: ['DB-00', 'DB-01', 'DB-02', 'DB-03'], bundle: 'b-web', next: 'Unlocks AI-Native Builder' },
    { name: 'AI-native product builder', who: 'Ship responsibly with AI in the loop, backend included.', steps: ['DB-00', 'DB-01', 'DB-02', 'DB-03', 'DB-04', 'DB-05'], bundle: 'b-ai', next: 'Unlocks Full-Stack Product' },
    { name: 'Full-stack product delivery', who: 'Discovery to operations and client handoff, then the DB-22 challenge.', steps: ['DB-01', 'DB-02', 'DB-03', 'DB-04', 'DB-05', 'DB-06', 'DB-07', 'DB-08'], bundle: 'b-fullstack', next: 'DB-22 is assessed and verified separately' },
    { name: 'Office career', who: 'Administration and customer-service roles.', steps: ['DB-00', 'PC-AD01', 'PC-CS01'], bundle: 'b-office', next: 'Opens as pilot courses go Live' },
    { name: 'Logistics career', who: 'Freight, warehouse and supply-chain operations.', steps: ['DB-00', 'PC-LG01', 'PC-PR01'], bundle: 'b-logistics', next: 'Opens as pilot courses go Live' }
  ];
  var TOOLS_PUB = [
    ['Canva', 'Design and content'], ['OpenCode', 'Software development'], ['Git / GitHub', 'Software development'], ['Figma', 'Design and content'],
    ['VS Code', 'Software development'], ['ChatGPT or AI assistant', 'AI and automation'], ['Excel / Google Sheets', 'Data and operations'],
    ['PostgreSQL', 'Data and analytics'], ['Power BI', 'Data and analytics'], ['CRM / ERP / HRM systems', 'Business operations'],
    ['Email / calendar / document tools', 'Communication'], ['Upload / file storage / evidence tools', 'Evidence']
  ];
  var LABS_PUB = ['Virtual Office', 'Accounting', 'Freight Forwarding', 'Real Estate', 'HR', 'Banking Operations', 'Insurance', 'Document Processing', 'Procurement', 'Customer Service'];
  function statusPillFor(st){
    return st === 'live' ? '<span class="pill ok">Live</span>' : st === 'pilot' ? '<span class="pill warn">Pilot</span>' : '<span class="pill neutral">Planned</span>';
  }
  function renderStatic(){
    $('#pathGrid').innerHTML = PATHS.map(function(p, i){
      var b = DBA.bundle(p.bundle), st = DBA.bundleStatus(b);
      return '<article class="path-card"><div><h3>' + esc(p.name) + '</h3><div class="for">' + esc(p.who) + '</div></div>' +
        '<ol class="path-steps">' + p.steps.map(function(id){ var c = DBA.course(id); return '<li class="' + esc(c.status) + '"><span>' + esc(c.title) + '<small>' + esc(c.id) + ' · ' + c.hours + ' hrs</small></span>' + statusPillFor(c.status) + '</li>'; }).join('') + '</ol>' +
        '<div class="path-foot"><span>' + esc(p.next) + '</span><button class="btn ' + (st === 'live' ? 'btn-primary' : 'btn-ghost') + ' btn-sm" data-view-bundle="' + esc(b.id) + '">' + esc(b.name) + ' · ' + money(b.price) + '</button></div></article>';
    }).join('');
    $$('#pathGrid [data-view-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleModal(b.dataset.viewBundle); }); });
    $('#stageRail').innerHTML = DBA.STAGES.map(function(s, i){
      return '<div class="stage"><div class="n">' + ('0' + (i + 1)).slice(-2) + '</div><h4>' + esc(s[0]) + '</h4><p>' + esc(s[1]) + '</p></div>';
    }).join('');
    $('#lifecycleChips').innerHTML = DBA.LIFECYCLE.map(function(s, i){ return '<span class="chip' + (i === DBA.LIFECYCLE.length - 1 ? ' on' : '') + '"><span class="i">' + (i + 1) + '</span>' + esc(s) + '</span>'; }).join('');
    $('#capGrid').innerHTML = DBA.CAPABILITY.map(function(c, i){ return '<div class="cap' + (i > 2 ? ' sep' : '') + '"><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span><p>' + esc(c[2]) + '</p></div>'; }).join('');
    $('#toolRows').innerHTML = TOOLS_PUB.map(function(t){ return '<div class="r"><div><b>' + esc(t[0]) + '</b><small>' + esc(t[1]) + '</small></div><span class="pill warn">Setup required</span></div>'; }).join('');
    $('#labRows').innerHTML = LABS_PUB.map(function(l){ return '<div class="r"><div><b>' + esc(l) + ' lab</b></div><span class="pill neutral">Planning</span></div>'; }).join('');
    $('#sp-topic').innerHTML = DBA.SUPPORT_TOPICS.map(function(t){ return '<option>' + esc(t) + '</option>'; }).join('');
    renderSupportCases();
    observeReveals();
  }

  /* DIAGNOSTIC */
  function openDiagnostic(){
    var d = STATE.diagnostic || {};
    function opt(list, cur){ return list.map(function(o){ return '<option' + (o === cur ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }
    openModal('Diagnostic', 'Find your first step',
      '<p>Five questions. Your answers pick a route using prerequisites and valid foundation bypasses. Nothing here is graded and nothing is sent anywhere.</p>' +
      '<div class="field" style="margin-top:16px"><label for="dg-exp">Experience</label><select id="dg-exp">' + opt(['New to digital work', 'Some digital experience', 'Working in tech', 'Working in an operations role'], d.exp) + '</select></div>' +
      '<div class="field"><label for="dg-goal">Goal</label><select id="dg-goal">' + opt(['Digital foundations', 'Build websites and software', 'Build with AI', 'Deliver client products end to end', 'Office administration career', 'Logistics career'], d.goal) + '</select></div>' +
      '<div class="field-row"><div class="field"><label for="dg-hours">Weekly availability</label><select id="dg-hours">' + opt(['2–4 hours', '5–9 hours', '10+ hours'], d.hours) + '</select></div>' +
      '<div class="field"><label for="dg-market">Country or target market</label><input id="dg-market" type="text" value="' + esc(d.market || '') + '" /></div></div>' +
      '<div class="field"><label for="dg-prior">Prior evidence of this skill</label><select id="dg-prior">' + opt(['None yet', 'A portfolio or project', 'Work experience'], d.prior) + '</select></div>' +
      '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-primary" id="dgGo">Recommend a route</button><button class="btn btn-ghost" id="dgClose">Close</button></div>');
    $('#dgClose').addEventListener('click', closeModal);
    $('#dgGo').addEventListener('click', function(){
      var a = { exp: $('#dg-exp').value, goal: $('#dg-goal').value, hours: $('#dg-hours').value, market: $('#dg-market').value.trim(), prior: $('#dg-prior').value };
      STATE.diagnostic = a; saveState(); showRecommendation(a);
    });
  }
  function showRecommendation(a){
    var target = 'b-starter', why = 'You are starting out, so Digital Foundations comes first.';
    var newbie = a.exp === 'New to digital work';
    if (a.goal === 'Office administration career') { target = 'b-office'; why = 'Your goal is an office role. The Office Career route opens as its pilot courses go Live — start with Digital Foundations now.'; }
    else if (a.goal === 'Logistics career') { target = 'b-logistics'; why = 'Your goal is logistics. That route opens as its pilot courses go Live — start with Digital Foundations now.'; }
    else if (!newbie && a.goal === 'Build websites and software') { target = 'b-web'; why = 'You have some experience and want to build for the web.'; }
    else if (!newbie && a.goal === 'Build with AI') { target = 'b-ai'; why = 'You want to build with AI, and the AI-Native Builder covers discovery through AI-native engineering.'; }
    else if (!newbie && a.goal === 'Deliver client products end to end') { target = 'b-fullstack'; why = 'You want end-to-end delivery, including operations and client handoff.'; }
    var b = DBA.bundle(target), st = DBA.bundleStatus(b);
    var starter = st !== 'live';
    var weeks = Math.ceil(b.includes.reduce(function(s, id){ return s + DBA.course(id).hours; }, 0) / ({ '2–4 hours': 3, '5–9 hours': 7, '10+ hours': 12 }[a.hours] || 5));
    var bypass = (a.exp === 'Working in tech' || a.prior !== 'None yet') && target !== 'b-starter'
      ? '<p class="modal-note">Because you report prior experience, you may be able to bypass introductory foundation content. A bypass can never skip assessment, evidence, verification, safety or regulatory content.</p>' : '';
    var html = '<p>' + esc(why) + '</p>' +
      '<div class="card-box" style="margin-top:16px"><h3>' + esc(b.name) + ' <span style="color:var(--slate-3);font-weight:600">· ' + money(b.price) + '</span></h3><p>' + esc(b.desc) + '</p><p style="font-size:12.5px;color:var(--slate-3)">About ' + weeks + ' weeks at your pace. ' + b.includes.length + ' courses.' + (a.market ? ' Target market noted: ' + esc(a.market) + '.' : '') + '</p></div>' + bypass +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        (starter ? '<button class="btn btn-primary" id="rcStart">Start with Starter Pack · $3</button><button class="btn btn-ghost" id="rcWait">Join the ' + esc(b.name) + ' waitlist</button>'
                 : '<button class="btn btn-primary" id="rcBuy">Add to cart</button><button class="btn btn-ghost" id="rcView">View details</button>') +
        '<button class="btn btn-ghost" id="rcRetake">Retake</button></div>';
    openModal('Recommendation', 'Your suggested route', html, true);
    var s1 = $('#rcStart'); if (s1) s1.addEventListener('click', function(){ closeModal(); addToCart('b-starter'); });
    var s2 = $('#rcWait'); if (s2) s2.addEventListener('click', function(){ openWaitlist(target); });
    var s3 = $('#rcBuy'); if (s3) s3.addEventListener('click', function(){ closeModal(); addToCart(target); });
    var s4 = $('#rcView'); if (s4) s4.addEventListener('click', function(){ openBundleModal(target); });
    $('#rcRetake').addEventListener('click', openDiagnostic);
  }

  /* WAITLIST */
  function openWaitlist(itemId){
    var b = DBA.bundle(itemId), c = DBA.course(itemId);
    var label = b ? b.name : (c ? c.title : 'this programme');
    openModal('Waitlist', label,
      '<p><b>' + esc(label) + '</b> is not Live yet, so it cannot be purchased. Join the waitlist and we will email you when it opens.</p>' +
      '<div class="field-row" style="margin-top:14px"><div class="field"><label for="wl-name">Name</label><input id="wl-name" type="text" autocomplete="name" value="' + esc(STATE.name !== 'Guest' ? STATE.name : '') + '" /><span class="err">Please enter your name.</span></div>' +
      '<div class="field"><label for="wl-email">Email</label><input id="wl-email" type="email" autocomplete="email" value="' + esc(STATE.email || '') + '" /><span class="err">Please enter a valid email.</span></div></div>' +
      '<label class="check"><input type="checkbox" id="wl-consent" /><span>I agree to be emailed about this programme and accept the privacy notice.</span></label>' +
      '<div class="co-error" id="wlError" role="alert"></div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><button class="btn btn-primary" id="wlGo">Join waitlist</button><button class="btn btn-ghost" id="wlCancel">Cancel</button></div>');
    $('#wlCancel').addEventListener('click', closeModal);
    $('#wlGo').addEventListener('click', function(){
      var name = $('#wl-name').value.trim(), email = $('#wl-email').value.trim(), er = $('#wlError');
      var badName = name.length < 2, badMail = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email);
      fieldErr('#wl-name', badName); fieldErr('#wl-email', badMail); er.classList.remove('on');
      if (badName || badMail) return;
      if (!$('#wl-consent').checked){ er.textContent = 'Please tick the consent box.'; er.classList.add('on'); return; }
      $('#wlGo').disabled = true;
      DBA.api('register', { kind: 'waitlist', name: name, email: email, consent: true, marketing: true, interest: label }).then(function(r){
        $('#wlGo').disabled = false;
        if (r.ok){ STATE.email = STATE.email || email; STATE.waitlist.push(itemId); saveState(); closeModal(); toast('You are on the waitlist for ' + label + '.', true); }
        else { er.textContent = (r.status === 503 || r.status === 0 || r.status === 404) ? 'The registration desk is not reachable right now. Please try again shortly.' : ((r.data && r.data.error) || 'Something went wrong.'); er.classList.add('on'); }
      });
    });
  }
  $('#openDiagnostic').addEventListener('click', openDiagnostic);
  $('#pricingCart').addEventListener('click', openCart);

  /* SUPPORT */
  function renderSupportCases(){
    var host = $('#supportCases');
    if (!STATE.supportRefs.length){ host.textContent = ''; return; }
    host.innerHTML = '<b style="color:var(--navy)">Your cases on this device</b><div class="list-rows" style="margin-top:6px">' + STATE.supportRefs.slice(0, 5).map(function(c){
      return '<div class="r"><div><b>' + esc(c.ref) + ' · ' + esc(c.topic) + '</b><small>' + esc(c.date) + '</small></div><span class="pill cool">Submitted</span></div>'; }).join('') + '</div>';
  }
  $('#supportForm').addEventListener('submit', function(e){
    e.preventDefault();
    var name = $('#sp-name').value.trim(), email = $('#sp-email').value.trim(), msg = $('#sp-msg').value.trim();
    var bn = name.length < 2, be = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email), bm = msg.length < 10;
    fieldErr('#sp-name', bn); fieldErr('#sp-email', be); fieldErr('#sp-msg', bm);
    if (bn || be || bm) return;
    var btn = $('#sp-submit'); btn.disabled = true; btn.textContent = 'Submitting…';
    DBA.api('support', { name: name, email: email, topic: $('#sp-topic').value, message: msg, source: location.pathname, website: $('#sp-website').value }).then(function(r){
      btn.disabled = false; btn.textContent = 'Submit case';
      if (r.ok && r.data && r.data.ok){
        STATE.supportRefs.unshift({ ref: r.data.reference, topic: $('#sp-topic').value, date: new Date().toISOString().slice(0, 10) });
        STATE.email = STATE.email || email; saveState(); $('#sp-msg').value = ''; renderSupportCases();
        toast('Case ' + r.data.reference + ' submitted. Check your inbox for confirmation.', true);
      } else {
        toast((r.status === 503 || r.status === 0 || r.status === 404) ? 'Support desk is not reachable right now. Email support@digitalburj.com.' : ((r.data && r.data.error) || 'Could not submit.'));
      }
    });
  });

  /* NOTICES */
  var NOTICES = {
    Privacy: 'Evidence and learning records are private by default. Sharing is explicit, limited to the stated purpose and can be withdrawn. Retention rules apply and nothing is silently deleted. This site stores your cart, name and local preview state in your browser only; enrolment, waitlist and support forms send the details you type to the Academy team by email.',
    Terms: 'Access follows an active entitlement created from a confirmed payment. Only Live products are purchasable. Bundles record inclusions, access dates, currency, taxes, fees and upgrade credit. Refunds: within 14 days provided no assessment has been submitted. Participation does not by itself provide employment, a visa, a licence, accreditation, regulatory approval, professional-authority recognition, job matching, workplace experience or a guaranteed outcome.',
    Security: 'No passwords or API keys are handled by this page. Roles are separate: learners, reviewers, verifiers and admins cannot approve or verify their own work, and access is enforced by the server rather than by hiding interface elements. Demo roles use fictional data and hold no production privileges.'
  };
  function openNotice(k){ openModal('Academy notice', k, '<p>' + esc(NOTICES[k]) + '</p><p class="modal-note">Contact support@digitalburj.com with any question about this notice.</p>'); }
  $$('[data-notice]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); openNotice(a.dataset.notice); }); });

  /* ============================================================
     INIT
     ============================================================ */
  function renderAll(){
    renderBundles();
    renderCourses();
    renderAccount();
    updateCartBadge();
  }
  $$('[data-app]').forEach(function(a){ a.href = DBA.appUrl(a.getAttribute('data-app')); });
  renderAll();
  renderStatic();
  loadAccount().then(function(){
    renderAll();
    if (ACCT && ACCT.user){ if (!$('#sp-name').value) $('#sp-name').value = ACCT.user.name; if (!$('#sp-email').value) $('#sp-email').value = ACCT.user.email; }
  });

}
function boot(root){
  fetch('/academy-store.html').then(function(r){ return r.text(); }).then(function(html){ root.innerHTML = html; run(); });
}
function tryBoot(){
  var root = document.getElementById('ac-root');
  if (!root || !window.DBA || !root.closest('#dc-root')) return false;   // wait for the site runtime's final render
  if (root.getAttribute('data-ready')) return true;
  root.setAttribute('data-ready', '1'); boot(root); return true;
}
if (!tryBoot()){ var n = 0, t = setInterval(function(){ if (tryBoot() || ++n > 400) clearInterval(t); }, 50); }
})();
