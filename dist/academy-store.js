/* DigitalBurj Academy landing. Markup lives in academy-store.html (fetched at boot). The Academy app itself is not part of
   this site: every call-to-action is a plain link to ACADEMY_URL. No third-party scripts, no tracking, no watermark. */
(function () {
'use strict';
var ACADEMY_URL = 'https://academy.digitalburj.com';
function run(root) {
  var $ = function (s) { return root.querySelector(s); };
  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  root.querySelectorAll('a[data-app]').forEach(function (a) { a.setAttribute('href', ACADEMY_URL); a.setAttribute('rel', 'noopener'); });

  // announcement bar (dismissible, remembered for a week)
  var ann = $('#acAnn'), at = Number(ls.get('ac_ann') || 0);
  if (at && Date.now() - at < 7 * 864e5) ann.hidden = true;
  $('#acAnnX').addEventListener('click', function () { ann.hidden = true; ls.set('ac_ann', String(Date.now())); });

  // back-to-top and mobile call-to-action bar
  var top = $('#acTop'), mob = $('#acMobile');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    top.classList.toggle('on', y > 900);
    mob.classList.toggle('on', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // bundle finder
  var REC = {
    'new': ['Starter — $3', 'Digital Foundations is the right first step: no background needed.'],
    'build': ['AI-Native Builder — $19', 'Five technology courses from discovery to AI-native engineering.'],
    'career': ['Office Career — $25', 'Digital Foundations plus Office Administration and Customer Service.'],
    'all': ['Complete Academy — $50', 'All 14 courses and the DB-22 final challenge.']
  };
  var rec = $('#acRec');
  root.querySelectorAll('#acFinder [data-g]').forEach(function (b) {
    b.addEventListener('click', function () {
      root.querySelectorAll('#acFinder [data-g]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var r = REC[b.getAttribute('data-g')];
      rec.innerHTML = 'Suggested: ' + r[0] + '. ' + r[1] + ' <a href="' + ACADEMY_URL + '" rel="noopener">Open Academy →</a>';
    });
  });

  // one friendly notice a few seconds in (shared toast from engage.js; once per session)
  setTimeout(function () {
    if (!window.dbToast) return;
    try { if (sessionStorage.getItem('ac_toast')) return; sessionStorage.setItem('ac_toast', '1'); } catch (e) {}
    window.dbToast('One-time purchase · lifetime access · 14-day refund.', 'ok', 6500);
  }, 9000);
}
function tryBoot() {
  var root = document.getElementById('ac-root');
  if (!root || !root.closest('#dc-root')) return false;   // wait for the site runtime's final render
  if (root.getAttribute('data-ready')) return true;
  root.setAttribute('data-ready', '1');
  fetch('/academy-store.html').then(function (r) { return r.text(); }).then(function (html) { root.innerHTML = html; run(root); });
  return true;
}
if (!tryBoot()) { var n = 0, t = setInterval(function () { if (tryBoot() || ++n > 400) clearInterval(t); }, 50); }
})();
