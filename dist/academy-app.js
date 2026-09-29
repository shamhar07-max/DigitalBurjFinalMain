/* DigitalBurj Academy app — academy.digitalburj.com
 * Router + account screens (sign in / sign up / verify / forgot / reset / welcome / redeem / no-access) and the learner
 * workspace. Accounts, sessions and entitlements are enforced by /api/academy (Cloudflare Worker + KV); the browser
 * only renders what the server says. Markup for the workspace lives in academy-app.html (fetched after sign-in). */
(function(){
'use strict';
if (window.__dbaApp) return;   // the site runtime can execute helmet scripts twice — only the first instance may boot
window.__dbaApp = 1;
var ROOT = null;
function q$(s, r){ return (r || document).querySelector(s); }
function qesc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function params(){ return new URLSearchParams(location.search); }
function safeNext(n){ return (n && /^\/[A-Za-z0-9\-_\/?=&%.,#]*$/.test(n) && n.indexOf('//') !== 0) ? n : '/'; }
function go(path){ location.href = path; }
var EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

/* ---------- shell for account screens ---------- */
var EYE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
var EYE_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10.6 5.1A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function screen(html, wide){
  ROOT.innerHTML = '<div class="ac au au2"><div class="au-shell">' +
    '<aside class="au-side"><a class="au-side-brand" href="' + DBA.siteUrl('/') + '"><img src="brand/mark-academy.webp" alt="" width="40" height="40"/><span>DigitalBurj <b>Academy</b></span></a>' +
    '<h2>Learn it. Apply it. <em>Prove it.</em></h2><p>Real missions, human review and credentials you can verify — one account, lifetime access.</p>' +
    '<ul><li><i></i>14 courses, from $3</li><li><i></i>Checkpoints graded on our servers</li><li><i></i>Invoices, receipts and verifiable certificates</li></ul>' +
    '<a class="au-side-back" href="' + DBA.siteUrl('/academy') + '">← Back to digitalburj.com/academy</a></aside>' +
    '<div class="au-card' + (wide ? ' au-wide' : '') + '">' + html + '</div></div></div>';
  var f = q$('.au-card input:not([readonly]):not([type=checkbox])'); if (f) f.focus();
}
function fieldHtml(id, label, type, extra){
  var pw = type === 'password';
  return '<div class="fld"><div class="inp' + (pw ? ' has-btn' : '') + '"><input id="' + id + '" type="' + type + '" placeholder=" " ' + (extra || '') + ' /><label for="' + id + '">' + label + '</label>' +
    (pw ? '<button type="button" class="pw-toggle" data-for="' + id + '" aria-label="Show password" aria-pressed="false">' + EYE + '</button>' : '') + '</div><span class="au-err" id="' + id + '-err" role="alert"></span></div>';
}
function meterHtml(){ return '<div class="pw-meter" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="pw-meter-l" id="pw-meter-l" aria-live="polite"></p>'; }
function wireStrength(id){
  var el = q$('#' + id); if (!el) return;
  el.addEventListener('input', function(){
    var v = el.value, s = 0;
    if (v.length >= 10) s++; if (v.length >= 14) s++;
    if ((/[a-z]/.test(v) ? 1 : 0) + (/[A-Z]/.test(v) ? 1 : 0) + (/\d/.test(v) ? 1 : 0) + (/[^A-Za-z0-9]/.test(v) ? 1 : 0) >= 2) s++;
    if (/[^A-Za-z0-9]/.test(v) && /\d/.test(v) && v.length >= 12) s++;
    if (!v) s = 0;
    var bars = document.querySelectorAll('.pw-meter i'); bars.forEach(function(b, i){ b.className = i < s ? 's' + s : ''; });
    var l = q$('#pw-meter-l'); if (l) l.textContent = v ? ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][s] : '';
  });
}
function startDemo(btn){
  if (btn) busy(btn, true, 'Try the demo');
  DBA.api('demo', {}).then(function(r){ if (btn) busy(btn, false, 'Try the demo'); if (r.ok) go('/dashboard'); else formError((r.data && r.data.error) || 'The demo is not available right now.'); });
}
function demoLink(){ return '<button type="button" class="au-demo" id="au-demo">Explore with a demo account — no signup</button>'; }
function bindDemo(){ var d = q$('#au-demo'); if (d) d.addEventListener('click', function(){ d.disabled = true; startDemo(); }); }
function setErr(id, msg){ var e = q$('#' + id + '-err'); if (e) e.textContent = msg || ''; var i = q$('#' + id); if (i) i.classList.toggle('has-error', !!msg); }
function formError(msg){ var e = q$('#au-error'); if (!e) return; e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; }
function busy(btn, on, label){ btn.disabled = on; if (label) btn.textContent = on ? 'Please wait…' : label; }
function brandHead(title, lead){
  return '<div class="au-brand"><img src="brand/mark-academy.webp" alt="" width="44" height="44"/><span>DigitalBurj Academy</span></div><h1>' + title + '</h1>' + (lead ? '<p class="au-lead">' + lead + '</p>' : '');
}
function backLink(){ return '<p class="au-foot"><a href="' + DBA.siteUrl('/academy') + '">← Back to Academy at digitalburj.com</a></p>'; }

/* ---------- screens ---------- */
function screenStart(me){
  if (me && me.user) return go('/dashboard');
  var next = safeNext(params().get('next')), q = next !== '/' ? '?next=' + encodeURIComponent(next) : '';
  screen(brandHead('Welcome to the Academy', 'How would you like to continue?') +
    '<div class="au-choices">' +
    '<a class="au-choice primary" href="/signup' + q + '"><span class="ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg></span><span><b>Register</b><small>New here? Create your free account in a minute.</small></span><i>→</i></a>' +
    '<a class="au-choice" href="/signin' + q + '"><span class="ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg></span><span><b>Sign in</b><small>Already registered? Pick up where you left off.</small></span><i>→</i></a>' +
    '<button class="au-choice ghost" id="au-demo" type="button"><span class="ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 6.9H22l-6 4.6 2.3 7L12 16l-6.3 4.5 2.3-7-6-4.6h7.6z"/></svg></span><span><b>Explore with a demo</b><small>Every course, the admin view and sample documents — no signup.</small></span><i>→</i></button>' +
    '</div><div class="au-error" id="au-error" role="alert"></div>');
  bindDemo();
}
function screenSetup(){
  screen(brandHead('The Academy app is not switched on yet', 'Accounts and sign-in open as soon as the Academy identity service is configured. Nothing you have done on the website is lost.') + '<a class="btn-primary au-btn" href="' + DBA.siteUrl('/academy') + '">Back to the Academy</a>');
}
function screenSignin(me){
  var next = safeNext(params().get('next'));
  if (me && me.user) return go(next);
  screen(brandHead('Sign in', 'Continue learning where you left off.') +
    '<form id="au-form" novalidate>' + fieldHtml('au-email', 'Email', 'email', 'autocomplete="email" value="' + qesc(params().get('email') || '') + '"') + fieldHtml('au-pw', 'Password', 'password', 'autocomplete="current-password"') +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Sign in</button></form>' +
    '<p class="au-foot"><a href="/forgot">Forgot password?</a> · <a href="/signup' + (next !== '/' ? '?next=' + encodeURIComponent(next) : '') + '">Create an account</a></p>' + demoLink() + '<p class="au-foot"><a href="/start">← Change how I get started</a></p>');
  bindDemo();
  q$('#au-form').addEventListener('submit', function(e){
    e.preventDefault(); formError(''); var email = q$('#au-email').value.trim(), pw = q$('#au-pw').value;
    setErr('au-email', EMAIL_RE.test(email) ? '' : 'Enter a valid email.'); setErr('au-pw', pw ? '' : 'Enter your password.');
    if (!EMAIL_RE.test(email) || !pw) return;
    var b = q$('#au-submit'); busy(b, true, 'Sign in');
    DBA.api('signin', { email: email, password: pw }).then(function(r){
      busy(b, false, 'Sign in');
      if (r.ok) return go(next);
      formError((r.data && r.data.error) || 'Could not sign in. Please try again.');
    });
  });
}
function screenSignup(me, opts){
  opts = opts || {};
  var next = safeNext(params().get('next'));
  if (me && me.user) return go(next);
  screen(brandHead(opts.title || 'Create your account', opts.lead || 'Use the same email you paid with, and your purchase appears as soon as you verify it.') +
    '<form id="au-form" novalidate>' + fieldHtml('au-name', 'Full name', 'text', 'autocomplete="name"') +
    fieldHtml('au-email', 'Email', 'email', 'autocomplete="email" value="' + qesc(opts.email || params().get('email') || '') + '"') +
    fieldHtml('au-pw', 'Password', 'password', 'autocomplete="new-password"') + meterHtml() + '<p class="au-hint">At least 10 characters, mixing two of: lower case, upper case, numbers, symbols.</p>' +
    '<div class="au-row"><div class="field"><label for="au-country">Country / region</label><input id="au-country" type="text" autocomplete="country-name" /></div>' +
    '<div class="field"><label for="au-goal">Primary goal</label><select id="au-goal"><option>Digital foundations</option><option>Build websites and software</option><option>Build with AI</option><option>Office or logistics career</option><option>Deliver client products</option></select></div></div>' +
    '<div class="au-row"><div class="field"><label for="au-lang">Language</label><select id="au-lang"><option value="en">English</option><option value="ar">العربية</option></select></div>' +
    '<div class="field"><label for="au-a11y">Accessibility preference</label><select id="au-a11y"><option value="">None</option><option>Screen reader</option><option>Reduced motion</option><option>High contrast</option><option>Larger text</option></select></div></div>' +
    '<label class="au-check"><input type="checkbox" id="au-consent" /><span>I accept the <a href="' + DBA.siteUrl('/academy') + '#pricing" target="_blank" rel="noopener">terms</a> and privacy notice. Evidence and learning records are private by default.</span></label>' +
    '<label class="au-check"><input type="checkbox" id="au-mkt" /><span>Send me Academy news (optional).</span></label>' +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Create account</button></form>' +
    '<p class="au-foot">Already have an account? <a href="/signin' + (next !== '/' ? '?next=' + encodeURIComponent(next) : '') + '">Sign in</a></p>' + demoLink() + '<p class="au-foot"><a href="/start">← Change how I get started</a></p>');
  wireStrength('au-pw'); bindDemo();
  q$('#au-form').addEventListener('submit', function(e){
    e.preventDefault(); formError('');
    var name = q$('#au-name').value.trim(), email = q$('#au-email').value.trim(), pw = q$('#au-pw').value;
    setErr('au-name', name.length < 2 ? 'Enter your name.' : ''); setErr('au-email', EMAIL_RE.test(email) ? '' : 'Enter a valid email.'); setErr('au-pw', pw.length >= 10 ? '' : 'Use at least 10 characters.');
    if (name.length < 2 || !EMAIL_RE.test(email) || pw.length < 10) return;
    if (!q$('#au-consent').checked) return formError('Please accept the terms and privacy notice to continue.');
    var b = q$('#au-submit'); busy(b, true, 'Create account');
    DBA.api('signup', { name: name, email: email, password: pw, country: q$('#au-country').value.trim(), goal: q$('#au-goal').value, language: q$('#au-lang').value, a11y: q$('#au-a11y').value, consent: true, marketing: q$('#au-mkt').checked }).then(function(r){
      busy(b, false, 'Create account');
      if (r.ok) return go(next);
      formError((r.data && r.data.error) || 'Could not create the account. Please try again.');
    });
  });
}
function screenForgot(){
  screen(brandHead('Reset your password', 'We will email you a link that works once and expires in an hour.') +
    '<form id="au-form" novalidate>' + fieldHtml('au-email', 'Email', 'email', 'autocomplete="email"') + '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Send reset link</button></form>' +
    '<p class="au-foot"><a href="/signin">Back to sign in</a></p>');
  q$('#au-form').addEventListener('submit', function(e){
    e.preventDefault(); var email = q$('#au-email').value.trim(); setErr('au-email', EMAIL_RE.test(email) ? '' : 'Enter a valid email.'); if (!EMAIL_RE.test(email)) return;
    var b = q$('#au-submit'); busy(b, true, 'Send reset link');
    DBA.api('forgot', { email: email }).then(function(r){
      screen(brandHead('Check your inbox', r.ok ? 'If an account exists for that email, a reset link is on its way.' : ((r.data && r.data.error) || 'Could not send the email right now.')) + '<a class="btn-ghost au-btn" href="/signin">Back to sign in</a>');
    });
  });
}
function screenReset(){
  var token = params().get('token') || '';
  screen(brandHead('Choose a new password') + '<form id="au-form" novalidate>' + fieldHtml('au-pw', 'New password', 'password', 'autocomplete="new-password"') + meterHtml() + '<p class="au-hint">At least 10 characters, mixing two of: lower case, upper case, numbers, symbols.</p><div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Set password</button></form>');
  wireStrength('au-pw');
  q$('#au-form').addEventListener('submit', function(e){
    e.preventDefault(); var pw = q$('#au-pw').value; setErr('au-pw', pw.length >= 10 ? '' : 'Use at least 10 characters.'); if (pw.length < 10) return;
    var b = q$('#au-submit'); busy(b, true, 'Set password');
    DBA.api('reset', { token: token, password: pw }).then(function(r){
      busy(b, false, 'Set password');
      if (r.ok) return go('/');
      formError((r.data && r.data.error) || 'Could not reset the password.');
    });
  });
}
function screenVerify(me){
  var token = params().get('token');
  if (!token) return home(me);
  screen(brandHead('Verifying your email…'));
  DBA.api('verify', { token: token }).then(function(r){
    if (r.ok) screen(brandHead('Email verified', 'Thanks — everything you have purchased is now unlocked on your account.') + '<a class="btn-primary au-btn" href="' + (me && me.user ? '/' : '/signin?email=' + encodeURIComponent(r.data.email || '')) + '">' + (me && me.user ? 'Continue learning' : 'Sign in') + '</a>');
    else screen(brandHead('That link did not work', (r.data && r.data.error) || 'The verification link is invalid or has expired.') + (me && me.user ? '<a class="btn-primary au-btn" href="/">Request a new link</a>' : '<a class="btn-primary au-btn" href="/signin">Sign in to request a new link</a>'));
  });
}
function screenWelcome(me){
  var cs = params().get('cs');
  if (!cs) return home(me);
  screen(brandHead('Confirming your payment…'));
  DBA.api('welcome', { cs: cs }).then(function(r){
    if (!r.ok || !r.data.ok) return screen(brandHead('We could not find that checkout', 'If you were charged, your receipt was emailed to you. Contact support and we will sort it out.') + '<a class="btn-ghost au-btn" href="' + DBA.siteUrl('/academy') + '#support">Contact support</a>');
    var d = r.data, titles = (d.titles || []).map(qesc).join(', ');
    if (!d.paid) return screen(brandHead('Payment not confirmed yet', 'Stripe has not confirmed this payment. Nothing has been unlocked. If you completed payment, wait a moment and refresh.') + '<a class="btn-primary au-btn" href="">Refresh</a>');
    var mine = me && me.user && me.user.email === (d.email || '').toLowerCase();
    screen(brandHead('Payment received', 'Thank you — <b>' + titles + '</b> is paid for. ' + (mine ? 'Your account uses this email, so it will appear in a moment.' : 'Create your Academy account with <b>' + qesc(d.email) + '</b> to continue.')) +
      (mine ? '<a class="btn-primary au-btn" href="/">Continue learning</a>'
            : '<a class="btn-primary au-btn" href="/signup?email=' + encodeURIComponent(d.email) + '">Create your account</a><a class="btn-ghost au-btn" href="/signin?email=' + encodeURIComponent(d.email) + '">I already have an account</a>') +
      '<p class="au-hint" style="margin-top:14px">Access is granted after your payment is confirmed to our server. It can take a few seconds to appear.</p>');
  });
}
function screenVerifyPrompt(me){
  var email = qesc(me.user.email);
  screen(brandHead('Verify your email', 'We sent a link to <b>' + email + '</b>. Verify it to unlock what you have purchased — this protects your account from anyone else claiming your purchase.') +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-resend">Resend the email</button><a class="btn-ghost au-btn" href="">I have verified — refresh</a>' +
    '<p class="au-foot"><a href="#" id="au-out">Sign out</a></p>');
  pollAccount(function(d){ return !!d.entitlements; });
  q$('#au-resend').addEventListener('click', function(){
    var b = q$('#au-resend'); busy(b, true, 'Resend the email');
    DBA.api('resend', {}).then(function(r){ busy(b, false, 'Resend the email'); formError(r.ok ? '' : ((r.data && r.data.error) || 'Could not send.')); if (r.ok){ b.textContent = 'Sent — check your inbox'; b.disabled = true; } });
  });
  q$('#au-out').addEventListener('click', function(e){ e.preventDefault(); DBA.api('signout', {}).then(function(){ go('/signin'); }); });
}
/* Re-check the account every 5s (max 2 min) and reload once access or verification appears (KV is eventually consistent). */
function pollAccount(done){
  var n = 0, t = setInterval(function(){
    if (++n > 24) return clearInterval(t);
    if (document.hidden) return;
    DBA.api('me', {}).then(function(r){ if (r.ok && r.data && r.data.signedIn && done(r.data)){ clearInterval(t); location.reload(); } });
  }, 5000);
}
function screenNoAccess(me){
  screen(brandHead('Hi ' + qesc(me.user.name.split(' ')[0]) + ', you have no active access yet', 'Your account is ready. Choose a bundle or course and it will appear here as soon as the payment is confirmed. If you just paid, it can take a few seconds.') +
    '<a class="btn-primary au-btn" href="' + DBA.siteUrl('/academy') + '#bundles">Browse bundles</a><a class="btn-ghost au-btn" href="">Refresh</a>' +
    '<p class="au-foot">Signed in as ' + qesc(me.user.email) + ' · <a href="#" id="au-out">Sign out</a></p>');
  pollAccount(function(d){ return d.entitlements && d.entitlements.courses.length > 0; });
  q$('#au-out').addEventListener('click', function(e){ e.preventDefault(); DBA.api('signout', {}).then(function(){ go('/signin'); }); });
}
function screenRedeem(me){
  if (!me || !me.user) return go('/signin?next=' + encodeURIComponent('/redeem' + location.search));
  if (!me.entitlements) return screenVerifyPrompt(me);
  var items = (params().get('items') || '').split(',').filter(Boolean), code = params().get('coupon') || '';
  var quote = DBA.quote(items, code, me.entitlements.courses);
  if (quote.coupon.state !== 'applied' || !quote.lines.length) return screen(brandHead('Promotion not applicable', quote.coupon.message || 'Nothing eligible to redeem.') + '<a class="btn-primary au-btn" href="' + DBA.siteUrl('/academy') + '#bundles">Back to the Academy</a>');
  var fresh = quote.lines.filter(function(l){ return me.entitlements.items.indexOf(l.id) === -1; });
  if (!fresh.length) return screen(brandHead('You already own this', 'Everything in this order is already on your account.') + '<a class="btn-primary au-btn" href="/">Continue learning</a>');
  var lines = fresh.map(function(l){ return '<div class="au-line"><span>' + qesc(l.title) + '</span><b>$0</b></div>'; }).join('');
  screen(brandHead('Confirm your free enrolment', 'Promotion <b>' + qesc(quote.coupon.code) + '</b> covers this order. No payment is taken.') + '<div class="au-lines">' + lines + '</div>' +
    '<label class="au-check"><input type="checkbox" id="au-consent" /><span>I accept the access, privacy and refund terms. Participation is not a promise of employment or accreditation.</span></label>' +
    '<label class="au-check"><input type="checkbox" id="au-zero" /><span><b>Confirm zero-payable enrolment.</b> Each promotion can be used once per product.</span></label>' +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit">Enrol now</button>');
  q$('#au-submit').addEventListener('click', function(){
    formError(''); if (!q$('#au-consent').checked || !q$('#au-zero').checked) return formError('Please tick both boxes to continue.');
    var b = q$('#au-submit'); busy(b, true, 'Enrol now');
    DBA.api('redeem', { items: items, coupon: code, consent: true, confirmZero: true }).then(function(r){ busy(b, false, 'Enrol now'); if (r.ok) return go('/'); formError((r.data && r.data.error) || 'Could not redeem.'); });
  });
}

/* ---------- routing ---------- */
function home(me){
  if (!me || !me.user) return go('/start');
  mountWorkspace(me); // signed in → dashboard; unowned courses show as Locked, unverified accounts get a banner
}
/* Pieces shared with academy-more.js (course player, admin, documents). */
window.DBAKit = { screen: screen, brandHead: brandHead, qesc: qesc, q$: q$, go: go, params: params, busy: busy, formError: formError, home: home, root: function(){ return ROOT; } };
/* Header/footer links belong to the main site: anything that is not an app route opens on digitalburj.com. */
var APP_ROUTES = ['/start', '/signin', '/signup', '/verify', '/forgot', '/reset', '/welcome', '/redeem', '/dashboard', '/learn', '/admin', '/invoice', '/receipt', '/certificate', '/credential'];
function fixLinks(){
  var list = document.querySelectorAll('a[href^="/"]');
  for (var i = 0; i < list.length; i++){
    var a = list[i]; if (ROOT && ROOT.contains(a)) continue;
    var h = a.getAttribute('href'), p = h.split(/[?#]/)[0];
    if (p.indexOf('//') === 0 || APP_ROUTES.indexOf(p) > -1) continue;
    a.setAttribute('href', DBA.siteUrl(h)); a.removeAttribute('target');
  }
}
if (window.MutationObserver) new MutationObserver(function(){ fixLinks(); }).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('click', function(e){
  var t = e.target && e.target.closest && e.target.closest('.pw-toggle'); if (!t) return;
  var inp = document.getElementById(t.getAttribute('data-for')); if (!inp) return;
  var show = inp.type === 'password'; inp.type = show ? 'text' : 'password';
  t.innerHTML = show ? EYE_OFF : EYE; t.setAttribute('aria-pressed', show ? 'true' : 'false'); t.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});
function route(){
  var path = location.pathname.replace(/\/+$/, '') || '/';
  DBA.api('me', {}).then(function(r){
    if (r.status === 429) return screen(brandHead('Please slow down', 'Too many requests from your connection. Wait a minute, then try again.') + '<a class="btn-primary au-btn" href="">Try again</a>');
    if (r.status === 503 || r.status === 404 || r.status === 0) return screenSetup();
    var me = r.ok && r.data && r.data.signedIn ? r.data : null;
    if (path === '/start') return screenStart(me);
    if (path === '/dashboard') return home(me);
    if (window.DBAMore && window.DBAMore.routes[path]) return window.DBAMore.routes[path](me);
    if (path === '/signin') return screenSignin(me);
    if (path === '/signup') return screenSignup(me);
    if (path === '/forgot') return screenForgot();
    if (path === '/reset') return screenReset();
    if (path === '/verify') return screenVerify(me);
    if (path === '/welcome') return screenWelcome(me);
    if (path === '/redeem') return screenRedeem(me);
    return home(me);
  });
}
function mountWorkspace(me){
  if (window.DBAMore) return window.DBAMore.dashboard(me);
  screen(brandHead('We could not load your dashboard', 'Check your connection and try again.') + '<a class="btn-primary au-btn" href="">Try again</a>');
}
function tryBoot(){
  var root = document.getElementById('ws-root');
  if (!root || !window.DBA || !root.closest('#dc-root')) return false;   // wait for the site runtime's final render
  if (root.getAttribute('data-ready')) return true;
  root.setAttribute('data-ready', '1'); ROOT = root; route(); return true;
}
if (!tryBoot()){ var n = 0, t = setInterval(function(){ if (tryBoot() || ++n > 400) clearInterval(t); }, 50); }
})();
