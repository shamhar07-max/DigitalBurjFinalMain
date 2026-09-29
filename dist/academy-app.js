/* DigitalBurj Academy app — academy.digitalburj.com
 * Router + account screens (sign in / sign up / verify / forgot / reset / welcome / redeem / no-access) and the learner
 * workspace. Accounts, sessions and entitlements are enforced by /api/academy (Cloudflare Worker + KV); the browser
 * only renders what the server says. Markup for the workspace lives in academy-app.html (fetched after sign-in). */
(function(){
'use strict';
var ROOT = null;
function q$(s, r){ return (r || document).querySelector(s); }
function qesc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function params(){ return new URLSearchParams(location.search); }
function safeNext(n){ return (n && /^\/[A-Za-z0-9\-_\/?=&%.,#]*$/.test(n) && n.indexOf('//') !== 0) ? n : '/'; }
function go(path){ location.href = path; }
var EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

/* ---------- shell for account screens ---------- */
function screen(html, wide){
  ROOT.innerHTML = '<div class="ac au"><div class="au-card' + (wide ? ' au-wide' : '') + '">' + html + '</div></div>';
  var f = q$('.au-card input:not([readonly]):not([type=checkbox])'); if (f) f.focus();
}
function fieldHtml(id, label, type, extra){
  return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" ' + (extra || '') + ' /><span class="au-err" id="' + id + '-err"></span></div>';
}
function setErr(id, msg){ var e = q$('#' + id + '-err'); if (e) e.textContent = msg || ''; var i = q$('#' + id); if (i) i.classList.toggle('has-error', !!msg); }
function formError(msg){ var e = q$('#au-error'); if (!e) return; e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; }
function busy(btn, on, label){ btn.disabled = on; if (label) btn.textContent = on ? 'Please wait…' : label; }
function brandHead(title, lead){
  return '<div class="au-brand"><img src="brand/mark-academy.webp" alt="" width="44" height="44"/><span>DigitalBurj Academy</span></div><h1>' + title + '</h1>' + (lead ? '<p class="au-lead">' + lead + '</p>' : '');
}
function backLink(){ return '<p class="au-foot"><a href="' + DBA.siteUrl('/academy') + '">← Back to Academy at digitalburj.com</a></p>'; }

/* ---------- screens ---------- */
function screenSetup(){
  screen(brandHead('The Academy app is not switched on yet', 'Accounts and sign-in open as soon as the Academy identity service is configured. Nothing you have done on the website is lost.') + '<a class="btn-primary au-btn" href="' + DBA.siteUrl('/academy') + '">Back to the Academy</a>');
}
function screenSignin(me){
  var next = safeNext(params().get('next'));
  if (me && me.user) return go(next);
  screen(brandHead('Sign in', 'Continue learning where you left off.') +
    '<form id="au-form" novalidate>' + fieldHtml('au-email', 'Email', 'email', 'autocomplete="email" value="' + qesc(params().get('email') || '') + '"') + fieldHtml('au-pw', 'Password', 'password', 'autocomplete="current-password"') +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Sign in</button></form>' +
    '<p class="au-foot"><a href="/forgot">Forgot password?</a> · <a href="/signup' + (next !== '/' ? '?next=' + encodeURIComponent(next) : '') + '">Create an account</a></p>' + backLink());
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
    fieldHtml('au-pw', 'Password', 'password', 'autocomplete="new-password"') + '<p class="au-hint">At least 10 characters, mixing two of: lower case, upper case, numbers, symbols.</p>' +
    '<div class="au-row"><div class="field"><label for="au-country">Country / region</label><input id="au-country" type="text" autocomplete="country-name" /></div>' +
    '<div class="field"><label for="au-goal">Primary goal</label><select id="au-goal"><option>Digital foundations</option><option>Build websites and software</option><option>Build with AI</option><option>Office or logistics career</option><option>Deliver client products</option></select></div></div>' +
    '<div class="au-row"><div class="field"><label for="au-lang">Language</label><select id="au-lang"><option value="en">English</option><option value="ar">العربية</option></select></div>' +
    '<div class="field"><label for="au-a11y">Accessibility preference</label><select id="au-a11y"><option value="">None</option><option>Screen reader</option><option>Reduced motion</option><option>High contrast</option><option>Larger text</option></select></div></div>' +
    '<label class="au-check"><input type="checkbox" id="au-consent" /><span>I accept the <a href="' + DBA.siteUrl('/academy') + '#pricing" target="_blank" rel="noopener">terms</a> and privacy notice. Evidence and learning records are private by default.</span></label>' +
    '<label class="au-check"><input type="checkbox" id="au-mkt" /><span>Send me Academy news (optional).</span></label>' +
    '<div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Create account</button></form>' +
    '<p class="au-foot">Already have an account? <a href="/signin' + (next !== '/' ? '?next=' + encodeURIComponent(next) : '') + '">Sign in</a></p>' + backLink());
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
  screen(brandHead('Choose a new password') + '<form id="au-form" novalidate>' + fieldHtml('au-pw', 'New password', 'password', 'autocomplete="new-password"') + '<p class="au-hint">At least 10 characters, mixing two of: lower case, upper case, numbers, symbols.</p><div class="au-error" id="au-error" role="alert"></div><button class="btn-primary au-btn" id="au-submit" type="submit">Set password</button></form>');
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
  if (!me || !me.user) return go('/signin');
  if (!me.entitlements) return screenVerifyPrompt(me);
  if (!me.entitlements.courses.length) return screenNoAccess(me);
  mountWorkspace(me);
}
function route(){
  var path = location.pathname.replace(/\/+$/, '') || '/';
  DBA.api('me', {}).then(function(r){
    if (r.status === 429) return screen(brandHead('Please slow down', 'Too many requests from your connection. Wait a minute, then try again.') + '<a class="btn-primary au-btn" href="">Try again</a>');
    if (r.status === 503 || r.status === 404 || r.status === 0) return screenSetup();
    var me = r.ok && r.data && r.data.signedIn ? r.data : null;
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
  fetch('/academy-app.html').then(function(r){ if (!r.ok) throw new Error('fragment ' + r.status); return r.text(); }).catch(function(){
    screen(brandHead('We could not load your workspace', 'Check your connection and try again.') + '<a class="btn-primary au-btn" href="">Try again</a>');
    return null;
  }).then(function(html){
    if (!html) return;
    var u = me.user, first = u.name.split(' ')[0], hr = new Date().getHours();
    var initials = u.name.split(/\s+/).map(function(w){ return w[0]; }).slice(0, 2).join('').toUpperCase();
    html = html.replace(/Layla Ibrahim/g, qesc(u.name)).replace('Good afternoon, Layla.', (hr < 12 ? 'Good morning, ' : hr < 18 ? 'Good afternoon, ' : 'Good evening, ') + qesc(first) + '.')
               .replace('<div class="sb-avatar">LI</div>', '<div class="sb-avatar">' + qesc(initials) + '</div>').replace('<span>Demo learner</span>', '<span>Learner</span>')
               .replace('layla@example.com', qesc(u.email)).replace(/(id="setCountry" type="text" value=")[^"]*/, '$1' + qesc(u.country || ''));
    ROOT.innerHTML = html;
    run(me);
  });
}

/* ---------- learner workspace ---------- */
function run(me){
  var USER = me.user, ENT = me.entitlements;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

  /* ============================================================
     FULL CURRICULUM — DB and PC records
     ============================================================ */
  var CURRICULUM = {
    technology: {
      name: 'Technology',
      icon: '⚙',
      desc: 'Product thinking, web and app development, design, AI-native engineering, automation, data, security and QA.',
      programs: [
        { id:'DB-00', title:'Digital Foundations', level:'Foundation', dur:'2–3 weeks', hours:'12–18', price:'Free', status:'live', type:'Foundation Course',
          desc:'Device, browser and account safety; files and naming; spreadsheets and structured data; online communication; permissions and privacy; AI literacy and checking outputs; basic workflow mapping.',
          evidence:'Practical demonstration and short explanation',
          modules:[
            { id:'DB-00-M1', title:'Device, browser and account safety', desc:'Tabs, sessions, passwords, MFA, safe browsing, recovering a locked account.' },
            { id:'DB-00-M2', title:'Files, naming and structured data', desc:'Folder structure, naming conventions, versioning, spreadsheets, structured data.' },
            { id:'DB-00-M3', title:'Online communication', desc:'Email, chat, attachments, calendars, meeting invitations, professional tone.' },
            { id:'DB-00-M4', title:'Permissions, privacy and sharing', desc:'Folder-level permissions, link sharing, external access, incident recovery.' },
            { id:'DB-00-M5', title:'AI literacy', desc:'What AI can and cannot do, checking outputs, disclosure, provenance.' },
            { id:'DB-00-M6', title:'Basic workflow mapping', desc:'Observe, document and reason about a simple process.' }
          ],
          capstone:'Organize a fictional SME client intake, clean a spreadsheet, create a clear status update, share only the correct folder, and recover from a deliberately wrong permission.' }
        ,{ id:'DB-01', title:'Product Discovery & Validation', level:'Skill', dur:'3–4 weeks', hours:'24–32', price:'AED 1,200', status:'live', type:'Skill Course',
          desc:'Stakeholder interviews, user journeys, problem validation, measurable outcomes, and the Build / Reshape / Stop recommendation.',
          evidence:'Mission + assessment',
          modules:[
            { id:'DB-01-M1', title:'Stakeholder interview', desc:'Who to talk to, what to ask, how to avoid leading questions.' },
            { id:'DB-01-M2', title:'User journey mapping', desc:'Current state, touchpoints, pain points, moments of truth.' },
            { id:'DB-01-M3', title:'Problem validation', desc:'Evidence of real pain, frequency, cost, alternative solutions.' },
            { id:'DB-01-M4', title:'Measurable outcome', desc:'What will change, how we will know, baseline and target.' },
            { id:'DB-01-M5', title:'Build / Reshape / Stop recommendation', desc:'Reading the evidence and writing a defensible conclusion.' }
          ],
          capstone:'Interview a fictional client, define one workflow, produce a discovery report, and defend a Build / Reshape / Stop recommendation.' }
        ,{ id:'DB-02', title:'Interface Design & Accessibility', level:'Skill', dur:'4–6 weeks', hours:'30–45', price:'AED 1,800', status:'live', type:'Skill Course',
          desc:'Information architecture, user flows, wireframes, UI, design systems, accessibility and interactive prototypes.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-02-M1', title:'Information architecture', desc:'Structure, navigation, grouping, naming, wayfinding.' },
            { id:'DB-02-M2', title:'User flows', desc:'Task flows, decision points, error paths, edge cases.' },
            { id:'DB-02-M3', title:'Wireframes and UI', desc:'Hierarchy, spacing, type, colour, responsive behavior.' },
            { id:'DB-02-M4', title:'Design systems', desc:'Components, tokens, states, documentation.' },
            { id:'DB-02-M5', title:'Accessibility', desc:'Keyboard, screen reader, contrast, focus order, alt text, WCAG-informed.' },
            { id:'DB-02-M6', title:'Prototype & critique', desc:'Interactive prototype, design rationale, iteration with feedback.' }
          ],
          capstone:'Design an accessible multi-page flow with a documented design system, tested with at least one real user.' }
        ,{ id:'DB-03', title:'Web Workflow Engineering', level:'Skill', dur:'5–7 weeks', hours:'40–60', price:'AED 2,400', status:'live', type:'Skill Course',
          desc:'Forms, validation, data display, navigation, error handling and permission-aware frontend engineering.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-03-M1', title:'Forms and validation', desc:'Input types, validation, error messages, idempotency, submission states.' },
            { id:'DB-03-M2', title:'Data display', desc:'Tables, lists, filters, pagination, empty states, loading states.' },
            { id:'DB-03-M3', title:'Navigation and routing', desc:'URL structure, deep links, back behaviour, modals vs pages.' },
            { id:'DB-03-M4', title:'Error handling', desc:'Network errors, partial failures, retries, user-facing messages.' },
            { id:'DB-03-M5', title:'Permission-aware UI', desc:'Hiding vs disabling, role-based rendering, never trust the client.' },
            { id:'DB-03-M6', title:'Accessibility in practice', desc:'Focus management, keyboard-only paths, screen reader testing.' }
          ],
          capstone:'Repair a broken booking flow, add accessible pending/success/error states, and verify authorization.' }
        ,{ id:'DB-04', title:'Backend, Database & API Contracts', level:'Skill', dur:'5–7 weeks', hours:'40–60', price:'AED 2,400', status:'live', type:'Skill Course',
          desc:'Records, authorization, audit, migrations and basic API contract design with server-enforced permissions.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-04-M1', title:'Records and data modelling', desc:'Entities, relationships, constraints, migrations.' },
            { id:'DB-04-M2', title:'Authorization', desc:'Roles, permissions, server-side enforcement, tenancy.' },
            { id:'DB-04-M3', title:'Audit and observability', desc:'Audit events, correlation IDs, log hygiene.' },
            { id:'DB-04-M4', title:'API contracts', desc:'Endpoints, resources, verbs, versioning, pagination, error shapes.' },
            { id:'DB-04-M5', title:'Migrations and safety', desc:'Reversible migrations, data backfills, safe rollout.' },
            { id:'DB-04-M6', title:'Permissions test plan', desc:'Testing authorization across roles and edge cases.' }
          ],
          capstone:'Design and defend an API contract with role-based access and an audit trail; submit a permissions test plan.' }
        ,{ id:'DB-05', title:'AI-Native Engineering Practice', level:'Specialist', dur:'4–5 weeks', hours:'30–40', price:'AED 2,800', status:'live', type:'Specialist Course',
          desc:'Precise task briefs, inspecting diffs, running code, debugging, checking dependency claims, documenting AI contribution.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-05-M1', title:'Precise task briefs', desc:'Scope, acceptance criteria, allowed tools, evidence.' },
            { id:'DB-05-M2', title:'Inspecting diffs', desc:'Reading code changes, spot-checking, rejecting unsafe output.' },
            { id:'DB-05-M3', title:'Running and debugging code', desc:'Local reproduction, stack traces, logging, minimal reproductions.' },
            { id:'DB-05-M4', title:'Dependency claims', desc:'Verifying package claims, license and security review.' },
            { id:'DB-05-M5', title:'AI use log', desc:'Documenting what AI wrote, what you changed, and why.' },
            { id:'DB-05-M6', title:'Accountable delivery', desc:'Taking responsibility for AI-assisted output.' }
          ],
          capstone:'Build a feature using an AI coding agent; submit the AI-use log, diffs, test results and a 3-minute explanation.' }
        ,{ id:'DB-06', title:'Operations, Monitoring & Incident Handling', level:'Specialist', dur:'3–4 weeks', hours:'24–32', price:'AED 2,200', status:'live', type:'Specialist Course',
          desc:'Staging deployment, monitoring, defect response, backup and restore, explaining limitations.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-06-M1', title:'Staging deployment', desc:'Environments, secrets, deploy pipelines, rollback plans.' },
            { id:'DB-06-M2', title:'Monitoring', desc:'Metrics, logs, alerts, dashboards, on-call basics.' },
            { id:'DB-06-M3', title:'Defect response', desc:'Triage, communication, fix, post-incident note.' },
            { id:'DB-06-M4', title:'Backup and restore', desc:'Backup strategy, restore rehearsal, data integrity.' },
            { id:'DB-06-M5', title:'Limitations and disclosure', desc:'Explaining what the system cannot do.' },
            { id:'DB-06-M6', title:'Operational runbooks', desc:'Incident, rollback, escalation, content-pause procedures.' }
          ],
          capstone:'Deploy to staging, handle an injected defect, rehearse backup/restore and write an incident note.' }
        ,{ id:'DB-07', title:'Client Delivery & Handoff', level:'Specialist', dur:'3–4 weeks', hours:'22–30', price:'AED 2,200', status:'live', type:'Specialist Course',
          desc:'Scope, estimating, change request discipline, handoff packaging, responsible marketing and support.',
          evidence:'Project + assessed submission',
          modules:[
            { id:'DB-07-M1', title:'Scope and estimating', desc:'Written scope, assumptions, exclusions, estimate ranges.' },
            { id:'DB-07-M2', title:'Change request discipline', desc:'Impact, approval, separate commercial item.' },
            { id:'DB-07-M3', title:'Handoff packaging', desc:'Accessible package, instructions, ownership, support contacts.' },
            { id:'DB-07-M4', title:'Responsible marketing', desc:'What can and cannot be claimed; evidence-based positioning.' },
            { id:'DB-07-M5', title:'Support and SLA', desc:'Response windows, incident flow, escalation.' }
          ],
          capstone:'Deliver a client-ready handoff package with scope, change request example and support plan.' }
        ,{ id:'DB-08', title:'DB-22 Final Assessment Challenge', level:'Advanced', dur:'2 weeks', hours:'16–20', price:'AED 3,200', status:'live', type:'Advanced Program',
          desc:'A fresh fictional SME workflow, timed change request and live defense with an independent verifier.',
          evidence:'High-value assessed evidence + independent verification',
          modules:[
            { id:'DB-08-M1', title:'Eligibility and assessment contract', desc:'Signed scope, allowed tools, AI policy, verification option.' },
            { id:'DB-08-M2', title:'Controlled challenge', desc:'Fresh SME workflow delivered under time constraint.' },
            { id:'DB-08-M3', title:'Incident injection', desc:'Handling a mid-assessment change request.' },
            { id:'DB-08-M4', title:'Live defense', desc:'Answering an assessor and independent verifier.' },
            { id:'DB-08-M5', title:'Assessment decision and record', desc:'Assessor decision, verifier decision, appeal route.' }
          ],
          capstone:'Complete a fresh SME workflow with a timed change request and live defense.' }
        ,{ id:'DB-09', title:'Web Design & Visual Systems', level:'Skill', dur:'4–6 weeks', hours:'30–45', price:'AED 1,800', status:'planned', type:'Skill Course',
          desc:'Visual system design, type and colour, layout, brand expression and multi-page consistency.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-10', title:'Mobile Application Development', level:'Skill', dur:'5–7 weeks', hours:'40–60', price:'AED 2,400', status:'planned', type:'Skill Course',
          desc:'Cross-platform and native approaches, permissions, release checklists, store publishing.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-11', title:'Graphic Design', level:'Skill', dur:'4–6 weeks', hours:'30–45', price:'AED 1,800', status:'planned', type:'Skill Course',
          desc:'Brand system, adaptable files, print and digital exports, client rationale.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-12', title:'Digital Marketing', level:'Skill', dur:'5–7 weeks', hours:'35–50', price:'AED 2,200', status:'planned', type:'Skill Course',
          desc:'Consent-aware campaign plan, creatives, tracking specification and interpretation.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-13', title:'Freelancing Practice', level:'Career', dur:'4–6 weeks', hours:'30–40', price:'AED 1,800', status:'planned', type:'Career Bundle',
          desc:'Discovery notes, scope, proposal, contract handoff checklist, change request and invoice scenario.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'DB-14', title:'Data & Automation', level:'Skill', dur:'5–7 weeks', hours:'40–60', price:'AED 2,400', status:'planned', type:'Skill Course',
          desc:'Clean datasets, dashboards, workflow maps, exception queues and human approval paths.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-15', title:'Security Fundamentals', level:'Specialist', dur:'4–5 weeks', hours:'28–36', price:'AED 2,600', status:'planned', type:'Specialist Course',
          desc:'Access control, secrets, encryption, audit logging, dependency review, secure uploads.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-16', title:'QA Engineering', level:'Specialist', dur:'3–4 weeks', hours:'24–32', price:'AED 2,200', status:'planned', type:'Specialist Course',
          desc:'Functional, regression, integration, performance and accessibility testing.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-17', title:'Product Strategy', level:'Specialist', dur:'3–4 weeks', hours:'24–32', price:'AED 2,400', status:'planned', type:'Specialist Course',
          desc:'Positioning, value proposition, feature prioritization, MVP definition, roadmap, commercial model.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-18', title:'Product Design Leadership', level:'Specialist', dur:'4–5 weeks', hours:'30–40', price:'AED 2,800', status:'planned', type:'Specialist Course',
          desc:'Research leadership, design system governance, critique practice, cross-functional collaboration.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-19', title:'Enterprise Integration', level:'Specialist', dur:'5–7 weeks', hours:'40–60', price:'AED 3,200', status:'planned', type:'Specialist Course',
          desc:'Identity, payments, ERP/CRM integration, webhooks, idempotency, data contracts.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-20', title:'Cloud & DevOps', level:'Specialist', dur:'4–5 weeks', hours:'30–40', price:'AED 2,800', status:'planned', type:'Specialist Course',
          desc:'Infrastructure design, environments, deployment pipelines, cost awareness, observability.',
          evidence:'Project + assessed submission',
          modules:[] }
        ,{ id:'DB-21', title:'AI Product Engineering', level:'Advanced', dur:'5–7 weeks', hours:'40–60', price:'AED 3,400', status:'planned', type:'Advanced Program',
          desc:'Applied AI features, retrieval, document processing, classification, copilots, evaluation and guardrails.',
          evidence:'High-value assessed evidence',
          modules:[] }
        ,{ id:'DB-22', title:'Full-Stack Product Delivery', level:'Advanced', dur:'6–8 weeks', hours:'50–70', price:'AED 3,800', status:'planned', type:'Advanced Program',
          desc:'End-to-end delivery across discovery, design, engineering, QA, deployment and measurement.',
          evidence:'High-value assessed evidence + independent verification',
          modules:[] }
      ]
    },
    professional: {
      name: 'Professional Career',
      icon: '🏢',
      desc: 'Administration, real estate, logistics and freight, warehouse, procurement, accounting and customer service.',
      programs: [
        { id:'PC-AD01', title:'Office Administration', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'pilot', type:'Career Bundle',
          desc:'Calendar and inbox triage; correspondence and records; meetings and minutes; procurement request; spreadsheet controls; confidential information; escalation.',
          evidence:'Multiple course records + capstone mission',
          modules:[
            { id:'PC-AD01-M1', title:'Calendar and inbox triage', desc:'Prioritisation, conflicting events, urgent visitor, missing approval.' },
            { id:'PC-AD01-M2', title:'Correspondence and records', desc:'Professional tone, records management, retention, versioning.' },
            { id:'PC-AD01-M3', title:'Meetings and minutes', desc:'Agenda, minutes, action items, follow-up.' },
            { id:'PC-AD01-M4', title:'Procurement requests', desc:'Request, approval, vendor coordination.' },
            { id:'PC-AD01-M5', title:'Spreadsheet controls', desc:'Formulas, validation, error spotting, protected ranges.' },
            { id:'PC-AD01-M6', title:'Confidential information and escalation', desc:'Discretion, need-to-know, incident reporting.' }
          ],
          capstone:'Operate a fictional executive day with conflicting priorities, a missing approval, an urgent visitor, and an incorrectly shared document.' }
        ,{ id:'PC-LG01', title:'Logistics & Freight Operations', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,600', status:'pilot', type:'Career Bundle',
          desc:'Shipment lifecycle; parties and documents; quotes and cost components; milestones; exception handling; warehouse handoffs; customer communication; reconciliation.',
          evidence:'Multiple course records + capstone mission',
          modules:[
            { id:'PC-LG01-M1', title:'Shipment lifecycle', desc:'Booking, documentation, handoffs, milestones, delivery.' },
            { id:'PC-LG01-M2', title:'Parties and documents', desc:'Shipper, consignee, carrier, broker, customs, bill of lading, commercial invoice.' },
            { id:'PC-LG01-M3', title:'Quotes and cost components', desc:'Freight, surcharges, demurrage, insurance, cost reconciliation.' },
            { id:'PC-LG01-M4', title:'Milestones and tracking', desc:'Milestone board, exception register, customer updates.' },
            { id:'PC-LG01-M5', title:'Exception handling', desc:'Delayed handoff, mismatched quantity, missing document, escalation.' },
            { id:'PC-LG01-M6', title:'Warehouse handoffs', desc:'Receiving, dispatch, cross-docking, documentation.' },
            { id:'PC-LG01-M7', title:'Customer communication', desc:'Honest ETA, exception updates, escalation notices.' },
            { id:'PC-LG01-M8', title:'Reconciliation', desc:'Invoice vs shipment, discrepancies, credit notes.' }
          ],
          capstone:'Manage a fictional consignment with a late carrier update, mismatched invoice quantity and missing document. Produce a shipment file, exception register, corrected customer update and handoff.' }
        ,{ id:'PC-RE01', title:'Real Estate Operations', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,600', status:'planned', type:'Career Bundle',
          desc:'Inquiry handling, listing checks, document review and jurisdiction-sensitive client communication.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-WH01', title:'Warehouse Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Receiving, putaway, picking, packing, dispatch, cycle counting, safety.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-PR01', title:'Procurement', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Sourcing, RFQ, vendor evaluation, purchase orders, three-way match, contract basics.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-AC01', title:'Accounting Support', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Invoicing, accounts payable, reconciliation, month-end support, controls.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-CS01', title:'Customer Service', level:'Career', dur:'4–6 weeks', hours:'30–45', price:'AED 2,200', status:'planned', type:'Career Bundle',
          desc:'Response handling, complaint management, escalation, tone, records.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-HR01', title:'HR Administration', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Onboarding, policy acknowledgement, records, leave administration, confidentiality.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-ED01', title:'Education Administration', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Admissions, scheduling, records, parent communication, safeguarding basics.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-HC01', title:'Healthcare Administration', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,600', status:'planned', type:'Career Bundle',
          desc:'Patient scheduling, records, insurance coordination, privacy, escalation. Requires jurisdiction review.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-LG02', title:'Customs & Trade Compliance', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,800', status:'planned', type:'Career Bundle',
          desc:'HS classification, valuation, origin, documentation, audit readiness. Requires local qualified review.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-FN01', title:'Banking Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 3,200', status:'planned', type:'Career Bundle',
          desc:'Account operations, KYC, transaction review, dispute handling, controls. Requires jurisdiction review.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-GV01', title:'Government Services', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 3,000', status:'planned', type:'Career Bundle',
          desc:'Document handling, citizen interaction, records, escalation, service standards.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-HS01', title:'Hospitality Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Front desk, guest requests, complaint handling, coordination, records.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-TO01', title:'Tourism Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Booking handling, itinerary coordination, supplier communication, exceptions.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-EC01', title:'E-commerce Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Order flow, returns, inventory coordination, customer communication, analytics.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-FB01', title:'F&B Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,600', status:'planned', type:'Career Bundle',
          desc:'Service workflow, order handling, hygiene basics, escalation, records.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-RT01', title:'Retail Operations', level:'Career', dur:'4–6 weeks', hours:'30–45', price:'AED 2,200', status:'planned', type:'Career Bundle',
          desc:'Front-of-house, POS handling, returns, stock, customer service.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-MF01', title:'Manufacturing Operations', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,400', status:'planned', type:'Career Bundle',
          desc:'Production planning, quality checks, safety, maintenance coordination.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-AG01', title:'Agri-Business Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Supply chain basics, quality, logistics, documentation, customer coordination.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-EN01', title:'Energy & Utilities Operations', level:'Career', dur:'8–10 weeks', hours:'60–80', price:'AED 3,600', status:'planned', type:'Career Bundle',
          desc:'Operations workflow, compliance basics, documentation, coordination. Requires jurisdiction review.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-TL01', title:'Telecommunications Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Service activation, ticketing, customer handling, coordination.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
        ,{ id:'PC-MD01', title:'Media Operations', level:'Career', dur:'6–8 weeks', hours:'45–65', price:'AED 2,800', status:'planned', type:'Career Bundle',
          desc:'Content scheduling, rights basics, coordination, publishing workflow.',
          evidence:'Multiple course records + capstone mission',
          modules:[] }
      ]
    },
    advanced: {
      name: 'Advanced Practice',
      icon: '★',
      desc: 'Ambiguous briefs, multi-system incidents, stakeholder defense and repeated delivery evidence.',
      programs: [
        { id:'AD-01', title:'Ambiguous Briefs', level:'Advanced', dur:'4–5 weeks', hours:'30–40', price:'AED 3,200', status:'planned', type:'Advanced Program',
          desc:'Work with incomplete or conflicting information; scope, decide, defend.', evidence:'High-value assessed evidence', modules:[] },
        { id:'AD-02', title:'Multi-System Incident Response', level:'Advanced', dur:'4–5 weeks', hours:'30–40', price:'AED 3,400', status:'planned', type:'Advanced Program',
          desc:'Diagnose and recover a fictional incident spanning multiple systems and teams.', evidence:'High-value assessed evidence', modules:[] },
        { id:'AD-03', title:'Stakeholder Defense', level:'Advanced', dur:'3–4 weeks', hours:'22–30', price:'AED 2,800', status:'planned', type:'Advanced Program',
          desc:'Prepare and deliver a defense of a design or delivery decision under challenge.', evidence:'Assessed defense', modules:[] },
        { id:'AD-04', title:'Repeated Delivery Evidence', level:'Advanced', dur:'6–8 weeks', hours:'50–70', price:'AED 4,200', status:'planned', type:'Advanced Program',
          desc:'Deliver the same type of outcome multiple times with increasing quality and independence.', evidence:'High-value assessed evidence + independent verification', modules:[] }
      ]
    },
    business: {
      name: 'Academy for Business',
      icon: '▣',
      desc: 'Organization-owned assignments, cohort coaching and aggregated, permissioned reporting.',
      programs: [
        { id:'AB-01', title:'Team Onboarding Pathway', level:'Corporate', dur:'Custom', hours:'Custom', price:'Contract', status:'planned', type:'Corporate Program',
          desc:'Role-based pathway, cohort coaching, scoped reporting.', evidence:'Employee progress + org reports', modules:[] },
        { id:'AB-02', title:'Role Skill Diagnostic', level:'Corporate', dur:'2–3 weeks', hours:'10–15', price:'Contract', status:'planned', type:'Corporate Program',
          desc:'Diagnostic across a role, with a recommended development plan.', evidence:'Diagnostic report + plan', modules:[] },
        { id:'AB-03', title:'Custom Cohort Coaching', level:'Corporate', dur:'Custom', hours:'Custom', price:'Contract', status:'planned', type:'Corporate Program',
          desc:'Live cohort with a defined instructor and review allocation.', evidence:'Attendance + assessment records', modules:[] },
        { id:'AB-04', title:'Executive Operational Uplift', level:'Corporate', dur:'6–8 weeks', hours:'30–45', price:'Contract', status:'planned', type:'Corporate Program',
          desc:'Operations, evidence and measurement for a leadership cohort.', evidence:'Assessed evidence + summary report', modules:[] }
      ]
    }
  };

  /* TOOL BENCH */
  var TOOLS = [
    { id:'tool-code', name:'Code Sandbox', cat:'Practice', desc:'Browser-based code editor with tests, deterministic grader and safe reset.', status:'on', missions:['m-booking','m-api'] },
    { id:'tool-ai', name:'AI Coding Agent', cat:'Practice', desc:'Approved AI coding agent. Task briefs, diff inspection, AI-use log required.', status:'on', missions:['m-booking','m-api'] },
    { id:'tool-design', name:'Design Critique', cat:'Practice', desc:'Design critique space with accessibility overlays and structured feedback.', status:'on', missions:['m-accessibility'] },
    { id:'tool-a11y', name:'Accessibility Inspector', cat:'Practice', desc:'Keyboard, contrast, focus order and screen reader inspection.', status:'on', missions:['m-accessibility'] },
    { id:'tool-campaign', name:'Campaign Analytics Simulator', cat:'Practice', desc:'Simulated campaign data with consent and tracking interpretation.', status:'beta', missions:[] },
    { id:'tool-discovery', name:'Client Discovery Roleplay', cat:'Practice', desc:'Simulated stakeholder interview with hidden constraints and objections.', status:'on', missions:['m-booking'] },
    { id:'tool-inbox', name:'Office Inbox & Calendar', cat:'Simulator', desc:'Office inbox with conflicting priorities, missing approval and urgent visitor.', status:'on', missions:[] },
    { id:'tool-crm', name:'CRM Sales Pipeline', cat:'Simulator', desc:'Lead qualification, pipeline, follow-up, and customer records.', status:'beta', missions:[] },
    { id:'tool-realestate', name:'Real Estate Inquiry Desk', cat:'Simulator', desc:'Inquiry handling, listing checks, document review.', status:'off', missions:[] },
    { id:'tool-tms', name:'Logistics TMS', cat:'Simulator', desc:'Shipment lifecycle, milestones, exception register, reconciliation.', status:'on', missions:[] },
    { id:'tool-wh', name:'Warehouse Events', cat:'Simulator', desc:'Receiving, putaway, picking, dispatch, cycle counting.', status:'off', missions:[] },
    { id:'tool-proc', name:'Procurement Approval', cat:'Simulator', desc:'Request, approval, vendor coordination, three-way match.', status:'off', missions:[] },
    { id:'tool-fin', name:'Finance Reconciliation', cat:'Simulator', desc:'Invoices, discrepancies, credit notes, month-end support.', status:'off', missions:[] }
  ];

  /* LABS */
  var LABS = [
    { id:'lab-browser', title:'Browser Code Sandbox', family:'Code', desc:'Sandbox with tests, deterministic grader, safe reset and structured evidence output.', role:'Any web/dev mission', status:'on', difficulty:'Guided' },
    { id:'lab-booking', title:'Booking Flow Repair Lab', family:'Code', desc:'Duplicate submission, slow network, permission-aware booking records.', role:'DB-03', status:'on', difficulty:'Applied' },
    { id:'lab-api', title:'API Contract Lab', family:'Code', desc:'Resource model, endpoints, authorization matrix, audit events.', role:'DB-04', status:'on', difficulty:'Applied' },
    { id:'lab-a11y', title:'Accessibility Critique Lab', family:'Design', desc:'Keyboard, contrast, focus order, alt text, screen reader walkthrough.', role:'DB-02', status:'on', difficulty:'Guided' },
    { id:'lab-design', title:'Design Critique Lab', family:'Design', desc:'Hierarchy, spacing, type, states, responsive behaviour, brand.', role:'DB-02', status:'beta', difficulty:'Applied' },
    { id:'lab-discovery', title:'Client Discovery Roleplay', family:'Research', desc:'Stakeholder interview with hidden constraints, objections and follow-ups.', role:'DB-01', status:'on', difficulty:'Applied' },
    { id:'lab-campaign', title:'Campaign Analytics Simulator', family:'Marketing', desc:'Consent-aware campaign data, tracking spec and interpretation.', role:'DB-12', status:'beta', difficulty:'Guided' },
    { id:'lab-inbox', title:'Office Inbox & Calendar', family:'Operations', desc:'Conflicting priorities, missing approval, urgent visitor, mis-shared document.', role:'PC-AD01', status:'on', difficulty:'Applied' },
    { id:'lab-crm', title:'CRM Sales Pipeline', family:'Operations', desc:'Lead qualification, pipeline hygiene, follow-up, records.', role:'PC-CS01', status:'beta', difficulty:'Guided' },
    { id:'lab-realestate', title:'Real Estate Inquiry Desk', family:'Operations', desc:'Inquiry handling, listing checks, document review, jurisdiction-sensitive communication.', role:'PC-RE01', status:'off', difficulty:'Applied' },
    { id:'lab-tms', title:'Logistics TMS Simulation', family:'Operations', desc:'Shipment lifecycle, milestones, exception register, reconciliation.', role:'PC-LG01', status:'on', difficulty:'Applied' },
    { id:'lab-wh', title:'Warehouse Events Simulator', family:'Operations', desc:'Receiving, putaway, picking, packing, dispatch, cycle counting.', role:'PC-WH01', status:'off', difficulty:'Applied' },
    { id:'lab-proc', title:'Procurement Approval Lab', family:'Operations', desc:'Request, approval, vendor coordination, three-way match, contract basics.', role:'PC-PR01', status:'off', difficulty:'Applied' },
    { id:'lab-fin', title:'Finance Reconciliation Lab', family:'Operations', desc:'Invoices, discrepancies, credit notes, month-end support, controls.', role:'PC-AC01', status:'off', difficulty:'Applied' },
    { id:'lab-reset', title:'Lab Reset & Restore Drill', family:'Meta', desc:'Practice safe reset, backup and restore without losing work.', role:'All', status:'on', difficulty:'Guided' }
  ];

  /* MISSIONS — full content per stage */
  var MISSIONS = [
    {
      id:'m-booking', title:'Repair a client booking flow', course:'DB-03', courseTitle:'Web Workflow Engineering',
      due:'28 Sep 2026', status:'Changes Requested', statusCls:'warn', stage:6, rubric:'v2.1',
      aiPolicy:'AI-assisted with disclosure', critical:'Exposing another customer\'s data; fabricated test evidence',
      scenario:'A fictional SME\'s booking form silently accepts duplicate appointments and gives no confirmation on slow networks.',
      task:'Inspect the given app and client brief; prevent duplicate submissions; add accessible pending/success/error states; verify authorization around booking records.',
      tools:'Browser, repository, editor or AI coding agent, test runner, staging sandbox. No production data or credentials.',
      hintLevels:[
        'Goal reminder — restate the task in your own words.',
        'Relevant concept — which request lifecycle stage owns deduplication?',
        'Worked analogous example — a similar form validation pattern with an idempotency key.',
        'Partial step — show the guard clause and the success branch only.',
        'Full demonstration and a new variant to retry.'
      ],
      evidenceItems:[
        { title:'Issue reproduction', sub:'Recorded · v1' },
        { title:'Changed files / commits', sub:'Repository link' },
        { title:'Test results', sub:'Slow network + duplicate click' },
        { title:'Accessibility check', sub:'Keyboard navigation verified' },
        { title:'3-minute explanation', sub:'Draft' },
        { title:'Release / rollback note', sub:'Draft' }
      ],
      stageContent: {
        0:{ label:'BRIEF', desc:'Restate the client, goal, constraints and done condition.', task:'Read the scenario and the brief. Write one sentence describing the goal and one sentence describing what done looks like.' },
        1:{ label:'LEARN', desc:'Read or watch only the concept required now.', task:'Open the 4-minute explainer on idempotency and duplicate submission. Complete the 3-question knowledge check.' },
        2:{ label:'INVESTIGATE', desc:'Inspect records, requirements and unknowns.', task:'List the unknowns. Which request property should prevent duplicates? What happens if the user double-clicks?' },
        3:{ label:'TRY', desc:'Do a small reversible experiment.', task:'In the sandbox, submit the form twice quickly. Record what happens and whether the database keeps both.' },
        4:{ label:'BUILD', desc:'Make the artifact or process decision.', task:'Implement the guard and the pending/success/error states. Commit each behaviour separately.' },
        5:{ label:'BREAK', desc:'Probe an edge case, objection or failure.', task:'Run the slow-network profile and the double-click. Does the guard hold? Try a keyboard-only path.' },
        6:{ label:'FIX', desc:'Correct the defect and explain the change.', task:'Two issues were flagged by your assessor. Fix them and explain the change in the explanation panel.' },
        7:{ label:'TEST', desc:'Run a checklist or test.', task:'Run the test suite and the accessibility checklist. Paste the results into the evidence tray.' },
        8:{ label:'EXPLAIN', desc:'Describe your choices and tradeoffs.', task:'Record a 3-minute explanation of your choices, tradeoffs and limitations.' },
        9:{ label:'DEFEND', desc:'Answer a reviewer or simulated client challenge.', task:'Your assessor will challenge one business rule. Answer in writing or record a response.' },
        10:{ label:'SHIP', desc:'Hand off in the agreed format.', task:'Package the artifact, the commit history, the tests and the rollback note for handoff.' },
        11:{ label:'EVIDENCE', desc:'Submit provenance, permissions and reflection.', task:'Submit provenance, permissions and reflection. Choose consent for sharing.' }
      }
    },
    {
      id:'m-api', title:'Design an API contract for a records system', course:'DB-04', courseTitle:'Backend, Database & API Contracts',
      due:'05 Oct 2026', status:'In Review', statusCls:'cool', stage:9, rubric:'v1.3',
      aiPolicy:'AI-allowed', critical:'Unsafe authorization model; sensitive data in logs',
      scenario:'A fictional organization needs a records API with role-based access and an audit trail.',
      task:'Define the resource model, endpoints, authorization rules and audit events. Submit an OpenAPI-style contract and a permissions test plan.',
      tools:'Editor, API design tool, sandbox',
      hintLevels:['Restate the resource model.','Which endpoints are read vs write?','A similar contract pattern with roles and audit.','Partial example — the authorization matrix only.','Full reference solution plus a variant.'],
      evidenceItems:[
        { title:'API contract', sub:'OpenAPI draft' },
        { title:'Permissions matrix', sub:'Roles × actions' },
        { title:'Audit event list', sub:'Included' }
      ],
      stageContent:{
        0:{ label:'BRIEF', desc:'Restate the resource and the roles.', task:'Read the brief. Write the resource model in one paragraph.' },
        1:{ label:'LEARN', desc:'Read the concepts you need now.', task:'Open the 6-minute explainer on authorization and audit.' },
        2:{ label:'INVESTIGATE', desc:'Inspect records and unknowns.', task:'List the roles and the actions each role can take.' },
        3:{ label:'TRY', desc:'Small reversible experiment.', task:'Sketch three endpoints and see if the shapes hold.' },
        4:{ label:'BUILD', desc:'Make the artifact.', task:'Write the contract and the permissions matrix.' },
        5:{ label:'BREAK', desc:'Probe an edge case.', task:'Try to break authorization in one endpoint.' },
        6:{ label:'FIX', desc:'Correct and explain.', task:'Fix the authorization gap and explain the change.' },
        7:{ label:'TEST', desc:'Run a test.', task:'Run the permissions test plan across the roles.' },
        8:{ label:'EXPLAIN', desc:'Describe choices and tradeoffs.', task:'Record a 3-minute rationale.' },
        9:{ label:'DEFEND', desc:'Answer a reviewer.', task:'Your assessor will challenge one role boundary.' },
        10:{ label:'SHIP', desc:'Hand off.', task:'Package the contract and the permissions matrix.' },
        11:{ label:'EVIDENCE', desc:'Submit provenance.', task:'Submit the contract, matrix, audit list.' }
      }
    },
    {
      id:'m-accessibility', title:'Accessibility audit of a landing page', course:'DB-02', courseTitle:'Interface Design & Accessibility',
      due:'12 Oct 2026', status:'Open', statusCls:'neutral', stage:0, rubric:'v1.0',
      aiPolicy:'No-AI', critical:'Missing alt text on critical images',
      scenario:'A fictional marketing landing page fails keyboard and screen-reader review.',
      task:'Audit the page, produce a findings list ranked by severity, and implement at least three fixes.',
      tools:'Browser, accessibility tree inspector, editor',
      hintLevels:['Start with keyboard-only.','Contrast and focus order.','A similar audit report.','Partial findings list only.','Full report plus a new page.'],
      evidenceItems:[
        { title:'Audit findings', sub:'Not started' },
        { title:'Before/after screenshots', sub:'Not started' }
      ],
      stageContent:{
        0:{ label:'BRIEF', desc:'Restate the goal.', task:'Read the page and the brief. What does done look like?' },
        1:{ label:'LEARN', desc:'Read what you need now.', task:'Open the WCAG-informed checklist.' },
        2:{ label:'INVESTIGATE', desc:'Inspect the page.', task:'Walk the page with keyboard only and record where you get stuck.' },
        3:{ label:'TRY', desc:'Try one fix.', task:'Fix one contrast issue and record the before/after.' },
        4:{ label:'BUILD', desc:'Implement three fixes.', task:'Implement three accessibility fixes and record the changes.' },
        5:{ label:'BREAK', desc:'Try to break it.', task:'Test with a screen reader.' },
        6:{ label:'FIX', desc:'Correct and explain.', task:'Fix the remaining critical issue and explain.' },
        7:{ label:'TEST', desc:'Run the checklist.', task:'Run the accessibility checklist end to end.' },
        8:{ label:'EXPLAIN', desc:'Rationale.', task:'Record a 3-minute rationale.' },
        9:{ label:'DEFEND', desc:'Answer a challenge.', task:'Your assessor will challenge one finding.' },
        10:{ label:'SHIP', desc:'Hand off.', task:'Package the audit and the fixes.' },
        11:{ label:'EVIDENCE', desc:'Submit.', task:'Submit findings, screenshots and rationale.' }
      }
    },
    {
      id:'m-ai', title:'Build a feature with an AI coding agent', course:'DB-05', courseTitle:'AI-Native Engineering Practice',
      due:'18 Oct 2026', status:'Open', statusCls:'neutral', stage:0, rubric:'v1.1',
      aiPolicy:'AI-allowed', critical:'Undisclosed AI contribution; unverified dependency claim',
      scenario:'A fictional product feature must be built using an approved AI coding agent, with an AI-use log.',
      task:'Write a precise task brief, run the agent, inspect diffs, run tests, document AI contribution and limitations.',
      tools:'AI coding agent, editor, test runner, dependency review tool',
      hintLevels:['Restate the feature and the acceptance criteria.','Read the diff line by line.','A similar AI-use log.','Partial brief only.','Full brief plus a new feature.'],
      evidenceItems:[
        { title:'Task brief', sub:'Not started' },
        { title:'AI-use log', sub:'Not started' },
        { title:'Test results', sub:'Not started' }
      ],
      stageContent:{
        0:{ label:'BRIEF', desc:'Restate the feature.', task:'Write a one-paragraph brief with acceptance criteria.' },
        1:{ label:'LEARN', desc:'Read the AI-use policy.', task:'Read the disclosure and dependency rules.' },
        2:{ label:'INVESTIGATE', desc:'Inspect constraints.', task:'List unknowns, forbidden tools and review points.' },
        3:{ label:'TRY', desc:'Small reversible experiment.', task:'Ask the agent for one small change and inspect the diff.' },
        4:{ label:'BUILD', desc:'Build the feature.', task:'Complete the feature using the agent; commit each behaviour.' },
        5:{ label:'BREAK', desc:'Probe edge cases.', task:'Try to break the feature with edge cases.' },
        6:{ label:'FIX', desc:'Correct and explain.', task:'Fix the defect and explain the change.' },
        7:{ label:'TEST', desc:'Run tests.', task:'Run the test suite and note any unresolved limits.' },
        8:{ label:'EXPLAIN', desc:'Rationale and AI contribution.', task:'Record a 3-minute explanation and the AI-use log.' },
        9:{ label:'DEFEND', desc:'Answer a challenge.', task:'Your assessor will challenge one dependency claim.' },
        10:{ label:'SHIP', desc:'Hand off.', task:'Package the feature, diff and AI-use log.' },
        11:{ label:'EVIDENCE', desc:'Submit.', task:'Submit the brief, diff, log, tests and explanation.' }
      }
    },
    {
      id:'m-office', title:'Operate a fictional executive day', course:'PC-AD01', courseTitle:'Office Administration',
      due:'20 Oct 2026', status:'Open', statusCls:'neutral', stage:0, rubric:'v1.2',
      aiPolicy:'No-AI', critical:'Breach of confidentiality; unauthorized approval',
      scenario:'A fictional executive day with conflicting priorities, a missing approval, an urgent visitor and an incorrectly shared document.',
      task:'Triage the calendar and inbox, correct the shared document, draft the communications and produce a decision log.',
      tools:'Office inbox & calendar simulator, document set, communication drafts',
      hintLevels:['Start with the calendar.','Who is waiting on you?','A similar day walkthrough.','Partial triage only.','Full walkthrough plus a new day.'],
      evidenceItems:[
        { title:'Corrected calendar', sub:'Not started' },
        { title:'Decision log', sub:'Not started' },
        { title:'Communication drafts', sub:'Not started' },
        { title:'Corrected access', sub:'Not started' }
      ],
      stageContent:{
        0:{ label:'BRIEF', desc:'Restate the day.', task:'Read the brief. What is done?' },
        1:{ label:'LEARN', desc:'Read the policies.', task:'Read confidentiality and escalation policy.' },
        2:{ label:'INVESTIGATE', desc:'Inspect the day.', task:'List the conflicts, missing approvals and risks.' },
        3:{ label:'TRY', desc:'Small reversible experiment.', task:'Reschedule one meeting and record the change.' },
        4:{ label:'BUILD', desc:'Triage the day.', task:'Rebuild the calendar, correct access, draft the communications.' },
        5:{ label:'BREAK', desc:'Probe edge cases.', task:'What if the visitor arrives early?' },
        6:{ label:'FIX', desc:'Correct and explain.', task:'Fix the incorrectly shared document and explain.' },
        7:{ label:'TEST', desc:'Run the checklist.', task:'Run the day checklist.' },
        8:{ label:'EXPLAIN', desc:'Rationale.', task:'Record a 3-minute rationale.' },
        9:{ label:'DEFEND', desc:'Answer a challenge.', task:'Your assessor will challenge one priority call.' },
        10:{ label:'SHIP', desc:'Hand off.', task:'Package the calendar, log, drafts and corrected access.' },
        11:{ label:'EVIDENCE', desc:'Submit.', task:'Submit all evidence and a reflection.' }
      }
    },
    {
      id:'m-shipment', title:'Resolve a shipment exception', course:'PC-LG01', courseTitle:'Logistics & Freight Operations',
      due:'24 Oct 2026', status:'Open', statusCls:'neutral', stage:0, rubric:'v1.0',
      aiPolicy:'No-AI', critical:'Inventing a confirmed ETA; exposing private shipment data',
      scenario:'A fictional UAE-linked shipment has a delayed handoff, mismatched package count and a client asking for a guaranteed arrival time.',
      task:'Reconcile documents, identify which fact is unverified, update the milestone board, escalate correctly and draft an honest client response.',
      tools:'Simulated TMS, spreadsheet, document set, inbox and phone roleplay. All parties and records fictional.',
      hintLevels:['Start with the discrepancy log.','Which fact is unverified?','A similar exception walkthrough.','Partial reconciliation only.','Full walkthrough plus a new exception.'],
      evidenceItems:[
        { title:'Discrepancy log', sub:'Not started' },
        { title:'Corrected milestone', sub:'Not started' },
        { title:'Escalation record', sub:'Not started' },
        { title:'Customer message', sub:'Not started' },
        { title:'Oral defense', sub:'Not started' }
      ],
      stageContent:{
        0:{ label:'BRIEF', desc:'Restate the exception.', task:'Read the brief. What is the exception and what is done?' },
        1:{ label:'LEARN', desc:'Read the process.', task:'Read the exception and escalation process.' },
        2:{ label:'INVESTIGATE', desc:'Inspect the record.', task:'Reconcile documents and identify the unverified fact.' },
        3:{ label:'TRY', desc:'Small reversible step.', task:'Update one milestone and record the change.' },
        4:{ label:'BUILD', desc:'Handle the exception.', task:'Correct the milestone, draft the escalation and the client message.' },
        5:{ label:'BREAK', desc:'Probe the client request.', task:'What if the client insists on a guaranteed ETA?' },
        6:{ label:'FIX', desc:'Correct and explain.', task:'Correct the client message and explain the change.' },
        7:{ label:'TEST', desc:'Run the checklist.', task:'Run the exception checklist.' },
        8:{ label:'EXPLAIN', desc:'Rationale.', task:'Record a 3-minute rationale.' },
        9:{ label:'DEFEND', desc:'Answer a challenge.', task:'Your assessor will challenge one fact.' },
        10:{ label:'SHIP', desc:'Hand off.', task:'Package the discrepancy log, milestone, escalation and message.' },
        11:{ label:'EVIDENCE', desc:'Submit.', task:'Submit all evidence and a reflection.' }
      }
    }
  ];

  var EVIDENCE = [];

  var CREDENTIALS = [];

  var SKILLS = [];

  var ASSESSMENTS = [];


  var MESSAGES = [
    { id:'msg-1', from:'Karim Nassar', initials:'KN', role:'Assessor', title:'Revision requested on booking flow repair', snippet:'Solid testing on slow network. Two issues: the pending state flashes on keyboard navigation, and your accessibility note does not cover focus management after error.', time:'2h ago', unread:true },
    { id:'msg-2', from:'Reem Al Farsi', initials:'RF', role:'Instructor', title:'Office hours — Thursday 4pm', snippet:'We will cover permission-aware frontend patterns and how to test authorization. Come with your API contract draft.', time:'Yesterday', unread:true },
    { id:'msg-3', from:'Fatima Al Zaabi', initials:'FA', role:'Independent Verifier', title:'Verification complete — DB00 evidence pack', snippet:'Your DB-00 evidence has been independently verified. The verification record is now attached to your credential.', time:'3d ago', unread:false },
    { id:'msg-4', from:'Hana Siddiqui', initials:'HS', role:'Academy Support', title:'Welcome to AI-Native Product Builder', snippet:'Your seat is confirmed and your pathway is live. Reply here if anything is unclear about the first mission.', time:'12d ago', unread:false }
  ];

  var FEEDBACK = [
    { id:'fb-1', mission:'Repair a client booking flow', from:'Karim Nassar · Assessor', date:'22 Sep 2026',
      body:'The duplicate-submission guard is correct and the slow-network handling works. Two issues remain before this can pass.',
      criteria:[
        { name:'Problem framing', score:'13 / 15', note:'Clear. Could name the affected user groups earlier.' },
        { name:'Behaviour & architecture', score:'22 / 25', note:'Guard is correct; pending state flashes on keyboard nav.' },
        { name:'Edge cases & security', score:'16 / 20', note:'Authorization check is server-side; add a test.' },
        { name:'Testing & accessibility', score:'14 / 20', note:'Missing focus management after error.' },
        { name:'Explanation & handoff', score:'14 / 20', note:'Rollback note incomplete.' }
      ] },
    { id:'fb-2', mission:'DB-02 interface design', from:'Reem Al Farsi · Instructor', date:'14 Sep 2026',
      body:'Strong hierarchy and consistent spacing. The design system documentation is clear. Accessibility review was surface-level.',
      criteria:[
        { name:'Information architecture', score:'16 / 20', note:'Clear.' },
        { name:'Design system', score:'18 / 20', note:'Well documented.' },
        { name:'Accessibility', score:'11 / 20', note:'Focus states and contrast need work.' },
        { name:'Prototype & critique', score:'17 / 20', note:'Good rationale.' },
        { name:'Overall', score:'15 / 20', note:'Pass with a note to revisit accessibility.' }
      ] }
  ];

  var EVENTS = [
    { date:'2026-09-25', type:'live', title:'Live cohort briefing' },
    { date:'2026-09-25', type:'session', title:'Office hours · Reem' },
    { date:'2026-09-26', type:'due', title:'DB-03 revision due' },
    { date:'2026-09-28', type:'due', title:'Booking flow repair submission' },
    { date:'2026-09-30', type:'review', title:'Review session with Karim' },
    { date:'2026-10-02', type:'live', title:'Live: Authorization patterns' },
    { date:'2026-10-05', type:'due', title:'API contract submission' },
    { date:'2026-10-08', type:'session', title:'Office hours · Hana' },
    { date:'2026-10-12', type:'due', title:'Accessibility audit due' },
    { date:'2026-10-15', type:'review', title:'Peer critique session' },
    { date:'2026-10-18', type:'due', title:'AI-native feature build due' },
    { date:'2026-10-20', type:'due', title:'Office day simulation due' },
    { date:'2026-10-22', type:'live', title:'DB-22 Final Challenge briefing' },
    { date:'2026-10-24', type:'due', title:'Shipment exception submission' }
  ];

  var LIVE_SCHEDULE = [
    { date:'26 Sep 2026', title:'Office hours · Reem Al Farsi', sub:'Permission-aware frontend patterns', time:'16:00 GST', join:true },
    { date:'29 Sep 2026', title:'Live: Idempotency & duplicate submission', sub:'Deep dive with code walkthrough', time:'17:00 GST', join:false },
    { date:'02 Oct 2026', title:'Live: Authorization patterns in practice', sub:'API contract review', time:'17:00 GST', join:false },
    { date:'06 Oct 2026', title:'Cohort critique: accessibility audits', sub:'Peer critique session', time:'16:30 GST', join:false },
    { date:'09 Oct 2026', title:'Live: Deploying to staging', sub:'Monitoring and rollback basics', time:'17:00 GST', join:false }
  ];

  var PATH_MODULES = [
    { id:'M1', title:'Find a real problem', desc:'Stakeholder interview, user journey, measurable outcome.', status:'Completed', pct:100 },
    { id:'M2', title:'Design a usable interface', desc:'Hierarchy, states, accessibility, responsive behavior, copy, visual system.', status:'Completed', pct:100 },
    { id:'M3', title:'Build a small web workflow', desc:'Forms, validation, data display, navigation, error handling.', status:'In progress', pct:58 },
    { id:'M4', title:'Backend & database', desc:'Records, authorization, audit, migrations, API contracts.', status:'In progress', pct:22 },
    { id:'M5', title:'AI-native engineering practice', desc:'Precise task briefs, inspect diffs, run code, document AI contribution.', status:'In progress', pct:8 },
    { id:'M6', title:'Operate the product', desc:'Staging deploy, monitoring, defect response, backup/restore.', status:'Locked', pct:0 },
    { id:'M7', title:'Deliver for a client', desc:'Scope, estimate, change request, handoff, support.', status:'Locked', pct:0 },
    { id:'M8', title:'DB-22 Final Challenge', desc:'Fresh SME workflow, timed change request, live defense.', status:'Locked', pct:0 }
  ];

  var PROJECTS = [
    { name:'LoadByTon-style marketplace workflow', type:'Integrated project', status:'In Review', statusCls:'cool', progress:62, submitted:'24 Sep 2026', feedback:'Strong data modeling; revisit exception handling.' },
    { name:'Accessibility-first booking flow', type:'Mission capstone', status:'Revision Required', statusCls:'warn', progress:74, submitted:'22 Sep 2026', feedback:'Two accessibility gaps. Focus management after error.' },
    { name:'Digital Foundations portfolio', type:'Foundation project', status:'Verified', statusCls:'ok', progress:100, submitted:'02 Sep 2026', feedback:'All criteria passed. Independent verification complete.' },
    { name:'API contract for records system', type:'Project assessment', status:'In Review', statusCls:'cool', progress:88, submitted:'24 Sep 2026', feedback:'Under review by assigned assessor.' }
  ];

  var SUPPORT_CASES = [
    { id:'SC-0421', topic:'Accessibility', body:'Requested captions for the intro video and an Arabic transcript.', status:'Resolved', opened:'03 Sep 2026' }
  ];

  /* ============================================================
     STATE
     ============================================================ */
  var STORE_KEY = 'db-academy-app:' + USER.email;
  var STUDENT_STATE = loadState();
  function loadState(){
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e){}
    return {
      activeMissionId: 'm-booking',
      activeStage: 6,
      hintsRevealed: { 'm-booking':[0,1,2] },
      evidenceAttached: { 'm-booking':[0,1,2] },
      supportCases: [],
      publicShare: true,
      aggregateReporting: false,
      aiStyle: 'Socratic',
      curriculumPillar: 'technology',
      feedbackSeen: [],
      calendarCursor: '2026-09-25'
    };
  }
  STUDENT_STATE.audit = STUDENT_STATE.audit || [];
  function audit(msg){ STUDENT_STATE.audit.unshift({ msg: msg, at: new Date().toISOString().slice(0, 16).replace('T', ' ') }); STUDENT_STATE.audit = STUDENT_STATE.audit.slice(0, 30); }
  function saveState(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(STUDENT_STATE)); } catch(e){} }

  /* ============================================================
     NAV
     ============================================================ */
  var VIEW_LABELS = {
    today:'Today', curriculum:'Curriculum', path:'My Path', missions:'Missions',
    toolbench:'Tool Bench', labs:'Labs', projects:'Projects',
    liveroom:'Live Room', calendar:'Calendar', messages:'Messages',
    feedback:'Feedback', evidence:'Evidence Vault', credentials:'Credentials',
    skills:'Skills Record', assessments:'Assessments',
    payments:'Payments', support:'Support', settings:'Settings'
  };
  function switchView(view){
    $$('.sb-item').forEach(function(b){ b.classList.toggle('active', b.dataset.view === view); });
    $$('.view').forEach(function(v){ v.classList.toggle('active', v.dataset.view === view); });
    $('#tbViewLabel').textContent = VIEW_LABELS[view] || 'Today';
    if (view === 'missions') renderMissionWorkspace();
    if (view === 'calendar') renderCalendar();
    if (view === 'curriculum') renderCurriculum();
    if (view === 'evidence') renderEvidenceVault('all');
    if (view === 'toolbench') renderToolBench();
    if (view === 'labs') renderLabs();
    if (view === 'liveroom') renderLiveRoom();
    if (view === 'feedback') renderFeedback();
    if (view === 'settings') renderAudit();
    closeSidebarMobile();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  $$('.sb-item').forEach(function(b){ b.addEventListener('click', function(){ switchView(b.dataset.view); }); });
  $$('[data-jump]').forEach(function(b){ b.addEventListener('click', function(){ switchView(b.dataset.jump); }); });

  var sidebar = $('#sidebar'), scrim = $('#scrim'), menuToggle = $('#menuToggle');
  function openSidebarMobile(){ sidebar.classList.add('open'); scrim.classList.add('on'); }
  function closeSidebarMobile(){ sidebar.classList.remove('open'); scrim.classList.remove('on'); }
  menuToggle.addEventListener('click', function(){ sidebar.classList.contains('open') ? closeSidebarMobile() : openSidebarMobile(); });
  scrim.addEventListener('click', closeSidebarMobile);

  /* ============================================================
     MODAL + TOAST
     ============================================================ */
  var mBg = $('#modalBg'), mT = $('#modalTitle'), mK = $('#modalKicker'), mB = $('#modalBody');
  function openModal(kicker, title, html){
    lastFocus = document.activeElement;
    mK.textContent = kicker; mT.textContent = title; mB.innerHTML = html;
    mBg.classList.add('open'); mBg.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    $('#modalClose').focus();
  }
  function closeModal(){
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch(e){} lastFocus = null; }
    mBg.classList.remove('open'); mBg.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  $('#modalClose').addEventListener('click', closeModal);
  var lastFocus = null;
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Tab' || !mBg.classList.contains('open')) return;
    var box = $('#modalBox') || mBg;
    var f = Array.prototype.slice.call(box.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function(x){ return !x.disabled && x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!box.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
  mBg.addEventListener('click', function(e){ if (e.target === mBg) closeModal(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeModal(); closeSidebarMobile(); } });

  var toastTimer = null;
  function toast(msg){
    var t = $('#toast'); $('#toastMsg').textContent = msg;
    t.classList.add('on'); clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('on'); }, 3000);
  }

  function statusPill(status){
    var map = {
      'Verified':['ok','Verified'],'Approved':['ok','Approved'],'Passed':['ok','Passed'],
      'In Review':['cool','In Review'],'Under Review':['cool','Under Review'],
      'Changes Requested':['warn','Changes Requested'],'Revision Required':['warn','Revision Required'],
      'Open':['neutral','Open'],'Submitted':['cool','Submitted'],'Upcoming':['neutral','Upcoming'],
      'Resolved':['ok','Resolved'],'Paid':['ok','Paid'],'Free':['neutral','Free'],
      'Scheduled':['cool','Scheduled'],'Pending':['warn','Pending'],'Issued':['ok','Issued'],
      'Completed':['ok','Completed'],'In progress':['warn','In progress'],'Locked':['neutral','Locked'],
      'live':['ok','Live'],'pilot':['warn','Pilot'],'planned':['neutral','Planned'],
      'on':['ok','Available'],'beta':['cool','Beta'],'off':['neutral','Not available']
    };
    var m = map[status] || ['neutral', status];
    return '<span class="pill ' + m[0] + '">' + esc(m[1]) + '</span>';
  }

  function getActiveMission(){
    return MISSIONS.filter(function(m){ return m.id === STUDENT_STATE.activeMissionId; })[0] || MISSIONS[0];
  }

  /* ============================================================
     TODAY
     ============================================================ */
  function renderToday(){
    var host = $('#todayMissions'); host.innerHTML = '';
    MISSIONS.slice(0,5).forEach(function(m){
      var cls = m.statusCls === 'warn' ? 'warn' : m.statusCls === 'cool' ? 'cool' : 'navy';
      var row = el('div', 'row-item');
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + cls + '">' + esc(m.course) + '</div>' +
        '<div class="row-body"><div class="row-title">' + esc(m.title) + '</div>' +
        '<div class="row-sub">Stage ' + (m.stage + 1) + '/12 · Due ' + esc(m.due) + ' · ' + esc(m.rubric) + '</div></div></div>' +
        '<div class="row-actions">' + statusPill(m.status) + '<button class="btn-ghost" data-open-mission="' + esc(m.id) + '">Open</button></div>';
      host.appendChild(row);
    });
    $$('[data-open-mission]').forEach(function(b){
      b.addEventListener('click', function(){
        var m = MISSIONS.filter(function(x){ return x.id === b.dataset.openMission; })[0];
        if (!m) return;
        STUDENT_STATE.activeMissionId = m.id; STUDENT_STATE.activeStage = m.stage; audit('Opened mission ' + m.title); saveState();
        switchView('missions');
      });
    });

    var up = $('#todayUpcoming'); up.innerHTML = '';
    EVENTS.slice(0,5).forEach(function(ev){
      var cls = ev.type === 'live' ? 'red' : ev.type === 'due' ? 'warn' : ev.type === 'session' ? 'cool' : 'ok';
      var row = el('div', 'row-item');
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + cls + '">' + esc(ev.date.slice(8,10)) + '</div>' +
        '<div class="row-body"><div class="row-title">' + esc(ev.title) + '</div>' +
        '<div class="row-sub">' + esc(ev.date) + ' · ' + esc(ev.type) + '</div></div></div>';
      up.appendChild(row);
    });

    var ev = $('#todayEvidence'); ev.innerHTML = '';
    EVIDENCE.slice(0,5).forEach(function(e){
      var row = el('div', 'row-item');
      var cls = (e.status === 'Verified' || e.status === 'Approved') ? 'ok' : e.status === 'In Review' ? 'cool' : 'warn';
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + cls + '">EV</div>' +
        '<div class="row-body"><div class="row-title">' + esc(e.title) + '</div>' +
        '<div class="row-sub">' + esc(e.skill) + ' · ' + esc(e.date) + ' · ' + esc(e.level) + '</div></div></div>' +
        '<div class="row-actions">' + statusPill(e.status) + '</div>';
      ev.appendChild(row);
    });

    $('#mOpen').textContent = MISSIONS.length;
    $('#mEvidence').textContent = EVIDENCE.length;
    $('#mCredentials').textContent = CREDENTIALS.length;
    updateCounts();
  }

  function updateCounts(){
    $('#cMissions').textContent = MISSIONS.length;
    $('#cLabs').textContent = LABS.length;
    $('#cEvidence').textContent = EVIDENCE.length;
    $('#cCredentials').textContent = CREDENTIALS.length;
    $('#cAssessments').textContent = ASSESSMENTS.filter(function(a){ return a.status !== 'Passed'; }).length;
    $('#cMessages').textContent = MESSAGES.filter(function(m){ return m.unread; }).length;
    $('#cSupport').textContent = STUDENT_STATE.supportCases.filter(function(c){ return c.status !== 'Resolved'; }).length;
    $('#cLive').textContent = LIVE_SCHEDULE.filter(function(s){ return s.join; }).length;
    $('#cFeedback').textContent = FEEDBACK.length;
  }
  renderToday();

  /* ============================================================
     CURRICULUM
     ============================================================ */
  function ownPill(p){
    var c = DBA.course(p.id); if (!c) return '';
    return ENT && ENT.courses.indexOf(p.id) > -1 ? '<span class="pill ok">Owned</span>' : '<span class="pill neutral">Locked</span>';
  }
  function lockNote(p){
    var c = DBA.course(p.id);
    if (!c || (ENT && ENT.courses.indexOf(p.id) > -1)) return '';
    return '<div class="note-box" style="margin:0 0 14px">' + (c.status === 'live' ? 'This course is not included in your access. <a href="https://digitalburj.com/academy#courses" data-site="/academy#courses" style="color:var(--red);font-weight:700">Get it — ' + DBA.money(c.price) + ' →</a>' : 'This programme opens when it goes Live. <a href="https://digitalburj.com/academy#courses" data-site="/academy#courses" style="color:var(--red);font-weight:700">Join the waitlist →</a>') + '</div>';
  }
  function priceOf(p){
    var c = DBA.course(p.id);
    if (c) return c.status === 'live' ? DBA.money(c.price) : DBA.money(c.price) + ' · opens soon';
    return p.price === 'Contract' ? 'Contract' : 'Pricing at launch';
  }
  function renderCurriculum(){
    var nav = $('#curriculumNav');
    nav.innerHTML = '<div class="cn-title">Pillars</div>';
    Object.keys(CURRICULUM).forEach(function(key){
      var p = CURRICULUM[key];
      var b = el('button', STUDENT_STATE.curriculumPillar === key ? 'active' : '', esc(p.name));
      b.addEventListener('click', function(){
        STUDENT_STATE.curriculumPillar = key; saveState(); renderCurriculum();
      });
      nav.appendChild(b);
    });
    var pillar = CURRICULUM[STUDENT_STATE.curriculumPillar];
    var main = $('#curriculumMain');
    main.innerHTML = '';
    var head = el('div', 'card card-pad');
    head.style.marginBottom = '12px';
    head.innerHTML =
      '<div class="card-head"><div><h2>' + esc(pillar.icon) + ' ' + esc(pillar.name) + '</h2><p>' + esc(pillar.desc) + '</p></div>' +
      '<span class="pill neutral">' + pillar.programs.length + ' programmes</span></div>';
    main.appendChild(head);

    pillar.programs.forEach(function(p){
      var card = el('button', 'program-card');
      card.type = 'button';
      card.innerHTML =
        '<div class="pc-top">' +
          '<div><span class="pc-id">' + esc(p.id) + '</span>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<div class="pc-desc">' + esc(p.desc) + '</div></div>' +
          '<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">' + statusPill(p.status) + ownPill(p) + '</div>' +
        '</div>' +
        '<div class="pc-meta">' +
          '<span class="pc-chip">' + esc(p.type) + '</span>' +
          '<span class="pc-chip">' + esc(p.level) + '</span>' +
          '<span class="pc-chip">' + esc(p.dur) + '</span>' +
          '<span class="pc-chip">' + esc(p.hours) + ' hrs</span>' +
          '<span class="pc-chip">' + esc(priceOf(p)) + '</span>' +
        '</div>';
      card.addEventListener('click', function(){
        var mods = (p.modules || []).map(function(m){
          return '<div class="module-item"><div class="mi-top"><span class="mi-num">' + esc(m.id) + '</span></div><h4>' + esc(m.title) + '</h4><div class="mi-desc">' + esc(m.desc) + '</div></div>';
        }).join('');
        openModal('Academy programme', p.title,
          lockNote(p) + '<p>' + esc(p.desc) + '</p>' +
          '<div class="mp-task"><div class="mpt-label">Evidence</div><p>' + esc(p.evidence) + '</p></div>' +
          (p.capstone ? '<div class="mp-task"><div class="mpt-label">Capstone</div><p>' + esc(p.capstone) + '</p></div>' : '') +
          '<div class="mp-task"><div class="mpt-label">Meta</div><p>' + esc(p.type) + ' · ' + esc(p.level) + ' · ' + esc(p.dur) + ' · ' + esc(p.hours) + ' guided hours · ' + esc(priceOf(p)) + '</p></div>' +
          (mods ? '<div style="margin-top:16px"><div class="mpt-label" style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:8px">Modules</div>' + mods + '</div>' : '<p class="modal-note">Full module detail for this programme is being authored. Catalogue record exists; publishable lessons do not yet.</p>') +
          '<p class="modal-note">Passing does not imply employment, accreditation, or workplace experience.</p>'
        );
      });
      main.appendChild(card);
    });
  }

  /* ============================================================
     PATH
     ============================================================ */
  function renderPath(){
    var host = $('#pathModules'); host.innerHTML = '';
    PATH_MODULES.forEach(function(m){
      var row = el('div', 'row-item');
      row.style.padding = '16px 0';
      var cls = m.status === 'Completed' ? 'ok' : m.status === 'In progress' ? 'warn' : 'neutral';
      row.innerHTML =
        '<div class="row-left" style="align-items:flex-start">' +
          '<div class="row-icon ' + (m.status === 'Completed' ? 'ok' : m.status === 'In progress' ? 'warn' : '') + '">' + esc(m.id) + '</div>' +
          '<div class="row-body">' +
            '<div class="row-title">' + esc(m.title) + '</div>' +
            '<div class="row-sub">' + esc(m.desc) + '</div>' +
            '<div style="margin-top:9px;max-width:340px"><div class="progress ' + cls + '"><i style="width:' + m.pct + '%"></i></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="row-actions">' + statusPill(m.status) + '</div>';
      host.appendChild(row);
    });
  }
  renderPath();
  $('#pathDownload').addEventListener('click', function(){
    openModal('Pathway', 'Download pathway PDF', '<p>In production this produces a signed PDF with module sequence, hours, evidence requirements and graduation artifact specification.</p>');
  });

  /* ============================================================
     MISSIONS
     ============================================================ */
  function renderMissionsList(){
    var host = $('#missionsList'); host.innerHTML = '';
    $('#missionCountLabel').textContent = MISSIONS.length + ' total';
    MISSIONS.forEach(function(m){
      var row = el('div', 'row-item');
      row.style.cursor = 'pointer';
      var cls = m.statusCls === 'warn' ? 'warn' : m.statusCls === 'cool' ? 'cool' : 'navy';
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + cls + '">' + esc(m.course) + '</div>' +
        '<div class="row-body"><div class="row-title">' + esc(m.title) + '</div>' +
        '<div class="row-sub">Stage ' + (m.stage + 1) + '/12 · Due ' + esc(m.due) + '</div></div></div>' +
        '<div class="row-actions">' + statusPill(m.status) + '</div>';
      if (m.id === STUDENT_STATE.activeMissionId){
        row.style.background = 'var(--bg)';
        row.style.margin = '0 -22px';
        row.style.paddingLeft = '22px'; row.style.paddingRight = '22px';
        row.style.borderRadius = '10px';
      }
      row.addEventListener('click', function(){
        STUDENT_STATE.activeMissionId = m.id; STUDENT_STATE.activeStage = m.stage; saveState();
        renderMissionWorkspace();
      });
      host.appendChild(row);
    });
  }

  function renderStageRail(){
    var host = $('#missionStageRail'); host.innerHTML = '';
    var m = getActiveMission();
    var stages = ['BRIEF','LEARN','INVESTIGATE','TRY','BUILD','BREAK','FIX','TEST','EXPLAIN','DEFEND','SHIP','EVIDENCE'];
    stages.forEach(function(s, i){
      var cls = '';
      if (i < STUDENT_STATE.activeStage) cls = 'done';
      else if (i === STUDENT_STATE.activeStage) cls = 'current';
      var b = el('button', 'stage-cell ' + cls);
      b.type = 'button';
      b.innerHTML = '<span class="sc-num">' + String(i + 1).padStart(2,'0') + '</span><span class="sc-name">' + esc(s) + '</span>';
      b.addEventListener('click', function(){
        STUDENT_STATE.activeStage = i; saveState(); renderMissionWorkspace();
      });
      host.appendChild(b);
    });
  }

  function renderMissionPanel(){
    var m = getActiveMission();
    var stage = STUDENT_STATE.activeStage;
    var sc = m.stageContent[stage] || m.stageContent[0];
    var panel = $('#missionPanel');
    var mhMeta = $('#mwsMeta');
    mhMeta.innerHTML =
      '<span class="mh-chip accent">' + esc(m.aiPolicy) + '</span>' +
      '<span class="mh-chip">Due ' + esc(m.due) + '</span>' +
      '<span class="mh-chip">Rubric ' + esc(m.rubric) + '</span>' +
      '<span class="mh-chip critical">Critical: ' + esc(m.critical) + '</span>';
    $('#mwsTitle').textContent = m.title;
    $('#mwsSub').textContent = m.course + ' · ' + m.courseTitle + ' · Rubric ' + m.rubric;

    panel.innerHTML =
      '<div class="mp-tag">Stage ' + String(stage + 1).padStart(2,'0') + ' · ' + sc.label + '</div>' +
      '<h3>' + esc(sc.label) + '</h3>' +
      '<p class="mp-desc">' + esc(sc.desc) + '</p>' +
      '<div class="mp-task"><div class="mpt-label">Scenario</div><p>' + esc(m.scenario) + '</p></div>' +
      '<div class="mp-task"><div class="mpt-label">Task for this stage</div><p>' + esc(sc.task) + '</p></div>' +
      '<div class="mp-task"><div class="mpt-label">Tools and constraints</div><p>' + esc(m.tools) + '</p></div>' +
      '<div class="mp-actions">' +
        (stage < 11
          ? '<button class="btn-primary" id="stageNext">Complete &amp; continue →</button>'
          : '<button class="btn-primary" id="stageFinish">Mark evidence complete</button>') +
        (stage > 0 ? '<button class="btn-ghost" id="stagePrev">← Previous stage</button>' : '') +
      '</div>';

    var n = $('#stageNext');
    if (n) n.addEventListener('click', function(){
      if (STUDENT_STATE.activeStage < 11){
        STUDENT_STATE.activeStage++; saveState();
        renderMissionWorkspace();
        toast('Stage complete. Next: ' + (m.stageContent[STUDENT_STATE.activeStage] || {}).label);
      }
    });
    var f = $('#stageFinish');
    if (f) f.addEventListener('click', function(){
      openModal('Mission', 'Evidence stage complete', '<p>Your artifact, tests and explanation are ready for submission. Press <strong>Submit for review</strong> in the evidence tray.</p>');
    });
    var p = $('#stagePrev');
    if (p) p.addEventListener('click', function(){
      if (STUDENT_STATE.activeStage > 0){ STUDENT_STATE.activeStage--; saveState(); renderMissionWorkspace(); }
    });

    // Live room teaser
    var teaser = $('#missionLiveRoomTeaser');
    var nextLive = LIVE_SCHEDULE[0];
    teaser.innerHTML =
      '<div class="mp-tag">Recommended</div>' +
      '<h3 style="font-size:15px">' + esc(nextLive.title) + '</h3>' +
      '<p class="mp-desc" style="font-size:12.5px">' + esc(nextLive.sub) + ' · ' + esc(nextLive.date) + ' · ' + esc(nextLive.time) + '</p>' +
      '<div class="mp-actions">' +
        (nextLive.join ? '<button class="btn-primary" id="joinLive">Join live session →</button>' : '<button class="btn-ghost" id="joinLive">Set reminder</button>') +
        '<button class="btn-ghost" data-jump="liveroom">Open Live Room</button>' +
      '</div>';
    $('#joinLive').addEventListener('click', function(){
      if (nextLive.join){ switchView('liveroom'); }
      else { toast('Reminder set for ' + nextLive.title + '.'); }
    });
    $$('#missionLiveRoomTeaser [data-jump]').forEach(function(b){
      b.addEventListener('click', function(){ switchView(b.dataset.jump); });
    });
  }

  function renderHints(){
    var m = getActiveMission();
    var revealed = (STUDENT_STATE.hintsRevealed[m.id] || []).slice();
    var host = $('#hintLadder'); host.innerHTML = '';
    m.hintLevels.forEach(function(h, i){
      var b = el('button', 'hint-item' + (revealed.indexOf(i) > -1 ? ' revealed' : ''));
      b.type = 'button';
      b.innerHTML = '<span class="hi-num">' + (i + 1) + '</span><span class="hi-body">' + (revealed.indexOf(i) > -1 ? esc(h) : 'Click to reveal hint level ' + (i + 1)) + '</span>';
      b.addEventListener('click', function(){
        var arr = STUDENT_STATE.hintsRevealed[m.id] || [];
        if (arr.indexOf(i) === -1){
          arr.push(i); STUDENT_STATE.hintsRevealed[m.id] = arr; saveState(); renderHints();
          toast('Hint ' + (i + 1) + ' revealed. This is recorded with your submission.');
        }
      });
      host.appendChild(b);
    });
  }

  function renderEvidenceTray(){
    var m = getActiveMission();
    var attached = STUDENT_STATE.evidenceAttached[m.id] || [];
    var host = $('#evidenceTray'); host.innerHTML = '';
    m.evidenceItems.forEach(function(item, i){
      var isOn = attached.indexOf(i) > -1;
      var row = el('div', 'evidence-item');
      row.innerHTML =
        '<div class="ei-icon">' + (isOn ? '✓' : '○') + '</div>' +
        '<div class="ei-body"><div class="ei-title">' + esc(item.title) + '</div>' +
        '<div class="ei-sub">' + esc(item.sub) + '</div></div>' +
        '<button class="btn-ghost" data-ev="' + i + '">' + (isOn ? 'Detach' : 'Attach') + '</button>';
      host.appendChild(row);
    });
    $$('[data-ev]', host).forEach(function(b){
      b.addEventListener('click', function(){
        var i = Number(b.dataset.ev);
        var arr = STUDENT_STATE.evidenceAttached[m.id] || [];
        var pos = arr.indexOf(i);
        if (pos > -1) arr.splice(pos, 1); else arr.push(i);
        STUDENT_STATE.evidenceAttached[m.id] = arr;
        saveState(); renderEvidenceTray();
      });
    });
  }

  function renderMissionWorkspace(){
    renderMissionsList();
    renderStageRail();
    renderMissionPanel();
    renderHints();
    renderEvidenceTray();
  }
  renderMissionWorkspace();

  $('#addEvidenceBtn').addEventListener('click', function(){
    openModal('Evidence', 'Add artifact', '<p>In production this opens an upload dialog that scans for malware, stores the file privately, and links it to the current mission version.</p><p class="modal-note">File type and size limits apply. Nothing is public until you opt in.</p>');
  });
  $('#submitMissionBtn').addEventListener('click', function(){
    var m = getActiveMission();
    var attached = (STUDENT_STATE.evidenceAttached[m.id] || []).length;
    var total = m.evidenceItems.length;
    openModal('Mission submission', 'Submit for review?',
      '<p>You are submitting <strong>' + attached + ' of ' + total + '</strong> evidence items for <strong>' + esc(m.title) + '</strong>.</p>' +
      '<p style="margin-top:10px">AI policy: <strong>' + esc(m.aiPolicy) + '</strong>. Critical failure: ' + esc(m.critical) + '.</p>' +
      '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
        '<button class="btn-primary" id="confirmSubmit">Confirm submission</button>' +
        '<button class="btn-ghost" id="cancelSubmit">Cancel</button>' +
      '</div>' +
      '<p class="modal-note">Submitting creates an immutable attempt linked to this mission version and rubric version. A human assessor will apply the published rubric and give criterion-specific feedback.</p>');
    $('#confirmSubmit').addEventListener('click', function(){
      closeModal();
      var found = MISSIONS.filter(function(x){ return x.id === m.id; })[0];
      if (found){ found.status = 'In Review'; found.statusCls = 'cool'; }
      EVIDENCE.unshift({ id:'ev-' + Date.now(), title:m.title + ' submission', skill:m.courseTitle, status:'In Review', date:new Date().toISOString().slice(0,10), visibility:'Private', level:'Independent-in-scenario' });
      saveState(); renderToday(); renderMissionsList(); renderEvidenceVault('all'); renderAssessments(); updateCounts();
      toast('Submitted for review. An assessor will respond within 2 business days.');
    });
    $('#cancelSubmit').addEventListener('click', closeModal);
  });

  /* ============================================================
     TOOL BENCH
     ============================================================ */
  function renderToolBench(){
    var m = getActiveMission();
    $('#toolMissionLabel').textContent = m.title + ' · ' + m.course;
    var activeHost = $('#activeToolsGrid'); activeHost.innerHTML = '';
    var allHost = $('#allToolsGrid'); allHost.innerHTML = '';
    TOOLS.forEach(function(t){
      var isActive = (t.missions || []).indexOf(m.id) > -1;
      var card = el('button', 'tool-card');
      card.type = 'button';
      card.innerHTML =
        '<div class="tc-tag">' + esc(t.cat) + '</div>' +
        '<h3>' + esc(t.name) + '</h3>' +
        '<p>' + esc(t.desc) + '</p>' +
        '<div class="tc-foot">' +
          '<span class="tc-status ' + t.status + '">' + (t.status === 'on' ? 'Available' : t.status === 'beta' ? 'Beta' : 'Not available') + '</span>' +
          '<span style="color:var(--red)">Open →</span>' +
        '</div>';
      card.addEventListener('click', function(){
        openModal('Tool', t.name,
          '<p>' + esc(t.desc) + '</p>' +
          '<div class="mp-task"><div class="mpt-label">Category</div><p>' + esc(t.cat) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Status</div><p>' + (t.status === 'on' ? 'Available' : t.status === 'beta' ? 'Beta — subject to review' : 'Not available in the current pathway') + '</p></div>' +
          (t.status === 'on' ? '<p class="modal-note">In production, this tool opens in a new site with an explicit disclosure of what information crosses the boundary. Any artifact produced is linked to your evidence tray.</p>' :
            '<p class="modal-note">This tool is not available for your current mission. Contact support if you believe it should be.</p>') +
          '<p class="modal-note">Using an unapproved tool does not fail you, but you must disclose it in your explanation.</p>');
      });
      if (isActive) activeHost.appendChild(card);
      else allHost.appendChild(card);
    });
  }

  /* ============================================================
     LABS
     ============================================================ */
  function renderLabs(){
    var host = $('#labGrid'); host.innerHTML = '';
    LABS.forEach(function(l){
      var card = el('button', 'lab-card');
      card.type = 'button';
      card.innerHTML =
        '<div class="lab-visual"><div class="lv-icon">' + esc(l.family.slice(0,1)) + '</div></div>' +
        '<div class="lab-body">' +
          '<div class="lb-tag">' + esc(l.family) + ' lab · ' + esc(l.difficulty) + '</div>' +
          '<h3>' + esc(l.title) + '</h3>' +
          '<p>' + esc(l.desc) + '</p>' +
          '<div class="lb-foot"><span>For: ' + esc(l.role) + '</span>' + statusPill(l.status) + '</div>' +
        '</div>';
      card.addEventListener('click', function(){
        openModal('Lab', l.title,
          '<p>' + esc(l.desc) + '</p>' +
          '<div class="mp-task"><div class="mpt-label">Family</div><p>' + esc(l.family) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Designed for</div><p>' + esc(l.role) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Difficulty</div><p>' + esc(l.difficulty) + '</p></div>' +
          (l.status === 'on' ? '<p class="modal-note">Labs have a defined initial state, plausible documents, controlled event injections, safe reset, explicit scoring and expert signoff.</p>' :
            l.status === 'beta' ? '<p class="modal-note">This lab is in beta. Expect rough edges and a review step before results are counted.</p>' :
            '<p class="modal-note">This lab is not yet available in your pathway. It is planned for a future cohort.</p>'));
      });
      host.appendChild(card);
    });
  }
  $('#labHelpBtn').addEventListener('click', function(){
    openModal('Labs', 'How labs work',
      '<p>Each lab has an initial state, plausible documents, controlled event injections, a safe reset, and explicit scoring. Results feed into the mission evidence tray.</p>' +
      '<div class="mp-task"><div class="mpt-label">Safe reset</div><p>You can reset a lab at any time without losing prior attempts — every attempt is preserved.</p></div>' +
      '<div class="mp-task"><div class="mpt-label">Event injections</div><p>Reviewers can inject a defect, an exception or a change request during the lab, just as a real client would.</p></div>' +
      '<div class="mp-task"><div class="mpt-label">Scoring</div><p>Scoring is deterministic where possible, human-reviewed where judgement is required.</p></div>');
  });

  /* ============================================================
     PROJECTS
     ============================================================ */
  function renderProjects(){
    var host = $('#projectsList'); host.innerHTML = '';
    PROJECTS.forEach(function(p){
      var row = el('div', 'row-item');
      row.style.padding = '16px 0';
      var cls = p.statusCls === 'warn' ? 'warn' : p.statusCls === 'cool' ? 'cool' : 'ok';
      row.innerHTML =
        '<div class="row-left" style="align-items:flex-start">' +
          '<div class="row-icon ' + cls + '">PJ</div>' +
          '<div class="row-body">' +
            '<div class="row-title">' + esc(p.name) + '</div>' +
            '<div class="row-sub">' + esc(p.type) + ' · Submitted ' + esc(p.submitted) + '</div>' +
            '<div style="font-size:12px;color:var(--slate-2);margin-top:6px;line-height:1.6"><strong style="color:var(--navy)">Feedback:</strong> ' + esc(p.feedback) + '</div>' +
            '<div style="margin-top:10px;max-width:340px"><div class="progress ' + cls + '"><i style="width:' + p.progress + '%"></i></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="row-actions">' + statusPill(p.status) + '</div>';
      host.appendChild(row);
    });
  }
  renderProjects();

  /* ============================================================
     LIVE ROOM
     ============================================================ */
  function renderLiveRoom(){
    var host = $('#liveScheduleList'); host.innerHTML = '';
    LIVE_SCHEDULE.forEach(function(s){
      var row = el('div', 'schedule-item');
      var parts = s.date.split(' ');
      row.innerHTML =
        '<div class="si-date"><b>' + esc(parts[0]) + '</b><span>' + esc(parts[1]) + '</span></div>' +
        '<div class="si-body"><div class="si-title">' + esc(s.title) + '</div>' +
        '<div class="si-sub">' + esc(s.sub) + ' · ' + esc(s.time) + '</div></div>' +
        '<div class="si-actions">' +
          (s.join ? '<button class="btn-primary" data-join="' + esc(s.title) + '">Join now</button>' : '<button class="btn-ghost" data-remind="' + esc(s.title) + '">Remind me</button>') +
        '</div>';
      host.appendChild(row);
    });
    $$('[data-join]').forEach(function(b){
      b.addEventListener('click', function(){ toast('Joining: ' + b.dataset.join); });
    });
    $$('[data-remind]').forEach(function(b){
      b.addEventListener('click', function(){ toast('Reminder set: ' + b.dataset.remind); });
    });
    renderLiveChat();
    startLiveTimer();
  }

  var liveMessages = [
    { who:'Reem', body:'Welcome everyone — we will start with the authorization matrix.' },
    { who:'Omar', body:'Should we always test with two roles?' },
    { who:'Reem', body:'Yes, minimum two. Three if the roles overlap in permissions.' }
  ];
  function renderLiveChat(){
    var host = $('#liveChat'); host.innerHTML = '';
    liveMessages.forEach(function(m){
      var row = el('div');
      row.innerHTML = '<div style="font-size:12.5px;line-height:1.5"><b style="color:var(--navy)">' + esc(m.who) + ':</b> <span style="color:var(--slate-2)">' + esc(m.body) + '</span></div>';
      host.appendChild(row);
    });
    host.scrollTop = host.scrollHeight;
  }
  $('#liveChatSend').addEventListener('click', function(){
    var v = $('#liveChatInput').value.trim();
    if (!v) return;
    liveMessages.push({ who:'You', body:v });
    $('#liveChatInput').value = '';
    renderLiveChat();
  });
  $('#liveChatInput').addEventListener('keydown', function(e){
    if (e.key === 'Enter'){ $('#liveChatSend').click(); }
  });
  var liveSeconds = 42 * 60 + 18;
  var liveTimer = null;
  function startLiveTimer(){
    if (liveTimer) clearInterval(liveTimer);
    liveTimer = setInterval(function(){
      liveSeconds++;
      var m = Math.floor(liveSeconds / 60);
      var s = liveSeconds % 60;
      var t = $('#liveTime');
      if (t) t.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }, 1000);
  }
  $('#liveMic').addEventListener('click', function(){ toast('Microphone toggled (prototype).'); });
  $('#liveCam').addEventListener('click', function(){ toast('Camera toggled (prototype).'); });
  $('#liveHand').addEventListener('click', function(){ toast('Hand raised. Reem will call on you shortly.'); });
  $('#liveCaption').addEventListener('click', function(){ toast('Captions toggled.'); });
  $('#liveNotes').addEventListener('click', function(){
    openModal('Live notes', 'Session notes', '<div class="field"><label for="lnBody">Your notes</label><textarea id="lnBody" placeholder="Take notes here…"></textarea></div><button class="btn-primary" id="lnSave">Save notes</button>');
    $('#lnSave').addEventListener('click', function(){ closeModal(); toast('Notes saved locally.'); });
  });
  $('#liveLeave').addEventListener('click', function(){
    if (liveTimer) clearInterval(liveTimer);
    toast('You left the live session. The recording will be available with notice.');
  });

  /* ============================================================
     CALENDAR
     ============================================================ */
  var calCursor = new Date(2026, 8, 25);
  function renderCalendar(){
    var year = calCursor.getFullYear();
    var month = calCursor.getMonth();
    var first = new Date(year, month, 1);
    var startDay = (first.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    $('#calMonth').textContent = monthNames[month] + ' ' + year;
    var grid = $('#calGrid'); grid.innerHTML = '';
    for (var i = 0; i < startDay; i++){
      var blank = el('div', 'cal-day');
      blank.style.opacity = '0.35';
      blank.style.background = 'transparent';
      blank.style.border = '1px dashed var(--line)';
      grid.appendChild(blank);
    }
    for (var d = 1; d <= daysInMonth; d++){
      var dateStr = year + '-' + String(month + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      var dayEl = el('div', 'cal-day');
      if (dateStr === '2026-09-25') dayEl.classList.add('today');
      dayEl.innerHTML = '<div class="cd-num">' + d + '</div>';
      EVENTS.filter(function(e){ return e.date === dateStr; }).forEach(function(e){
        var ev = el('div', 'cal-event ' + e.type, esc(e.title));
        dayEl.appendChild(ev);
      });
      grid.appendChild(dayEl);
    }
  }
  $('#calPrev').addEventListener('click', function(){ calCursor.setMonth(calCursor.getMonth() - 1); renderCalendar(); });
  $('#calNext').addEventListener('click', function(){ calCursor.setMonth(calCursor.getMonth() + 1); renderCalendar(); });
  $('#calToday').addEventListener('click', function(){ calCursor = new Date(2026, 8, 25); renderCalendar(); });

  /* ============================================================
     MESSAGES
     ============================================================ */
  function renderMessages(){
    var host = $('#messagesList'); host.innerHTML = '';
    MESSAGES.forEach(function(m){
      var row = el('div', 'row-item');
      row.style.cursor = 'pointer';
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + (m.unread ? 'red' : '') + '">' + esc(m.initials) + '</div>' +
        '<div class="row-body"><div class="row-title">' + esc(m.title) + ' ' + (m.unread ? '<span class="pill red">New</span>' : '') + '</div>' +
        '<div class="row-sub">' + esc(m.from) + ' · ' + esc(m.role) + ' · ' + esc(m.time) + '</div>' +
        '<div style="font-size:12px;color:var(--slate-2);margin-top:4px;line-height:1.5">' + esc(m.snippet) + '</div></div></div>';
      row.addEventListener('click', function(){
        m.unread = false; renderMessages(); updateCounts();
        openModal('Message from ' + m.from, m.title,
          '<p>' + esc(m.snippet) + '</p>' +
          '<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line-2)">' +
            '<div class="field"><label for="msgReply">Reply</label><textarea id="msgReply" placeholder="Write a reply…"></textarea></div>' +
            '<button class="btn-primary" id="msgSend">Send reply</button>' +
          '</div>');
        $('#msgSend').addEventListener('click', function(){ closeModal(); toast('Reply sent locally.'); });
      });
      host.appendChild(row);
    });
  }
  renderMessages();
  $('#msgCompose').addEventListener('click', function(){
    openModal('Compose', 'New message',
      '<div class="field"><label for="composeTo">To</label><select id="composeTo"><option>Karim Nassar (Assessor)</option><option>Reem Al Farsi (Instructor)</option><option>Academy Support</option></select></div>' +
      '<div class="field"><label for="composeSubject">Subject</label><input id="composeSubject" type="text"></div>' +
      '<div class="field"><label for="composeBody">Message</label><textarea id="composeBody" placeholder="Write your message…"></textarea></div>' +
      '<button class="btn-primary" id="composeSend">Send</button>');
    $('#composeSend').addEventListener('click', function(){ closeModal(); toast('Message sent locally.'); });
  });

  /* ============================================================
     FEEDBACK
     ============================================================ */
  function renderFeedback(){
    var host = $('#feedbackList'); host.innerHTML = '';
    if (!FEEDBACK.length){
      host.innerHTML = '<div class="empty">No feedback yet. Submit a mission to receive criterion-specific feedback.</div>';
      return;
    }
    FEEDBACK.forEach(function(f){
      var card = el('div', 'feedback-card');
      var criteria = (f.criteria || []).map(function(c){
        return '<div class="fc-criterion"><span><b>' + esc(c.name) + '</b> — ' + esc(c.note) + '</span><span>' + esc(c.score) + '</span></div>';
      }).join('');
      card.innerHTML =
        '<div class="fc-head">' +
          '<div><h3>' + esc(f.mission) + '</h3><div class="fc-from">' + esc(f.from) + ' · ' + esc(f.date) + '</div></div>' +
          '<span class="pill warn">Action needed</span>' +
        '</div>' +
        '<div class="fc-body">' + esc(f.body) + '</div>' +
        '<div class="fc-criteria">' + criteria + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">' +
          '<button class="btn-primary" data-jump="missions">Open mission to revise</button>' +
          '<button class="btn-ghost" data-jump="messages">Message assessor</button>' +
        '</div>';
      host.appendChild(card);
    });
    $$('#feedbackList [data-jump]').forEach(function(b){
      b.addEventListener('click', function(){ switchView(b.dataset.jump); });
    });
  }

  /* ============================================================
     EVIDENCE
     ============================================================ */
  function renderEvidenceVault(filter){
    var host = $('#evidenceList'); host.innerHTML = '';
    var items = EVIDENCE.filter(function(e){ return !filter || filter === 'all' || e.status === filter; });
    $('#evCountLabel').textContent = EVIDENCE.length + ' records';
    if (!items.length){
      host.innerHTML = '<div class="empty">No evidence records match this filter.</div>';
      return;
    }
    items.forEach(function(e){
      var row = el('div', 'row-item');
      row.style.padding = '16px 0';
      var cls = (e.status === 'Verified' || e.status === 'Approved') ? 'ok' : e.status === 'In Review' ? 'cool' : 'warn';
      row.innerHTML =
        '<div class="row-left" style="align-items:flex-start">' +
          '<div class="row-icon ' + cls + '">EV</div>' +
          '<div class="row-body">' +
            '<div class="row-title">' + esc(e.title) + '</div>' +
            '<div class="row-sub">' + esc(e.skill) + ' · ' + esc(e.date) + ' · ' + esc(e.level) + '</div>' +
            '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">' +
              '<span class="pill neutral">' + esc(e.id) + '</span>' +
              '<span class="pill neutral">' + esc(e.visibility) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="row-actions">' + statusPill(e.status) +
          '<button class="btn-ghost" data-ev-open="' + esc(e.id) + '">Open</button>' +
        '</div>';
      host.appendChild(row);
    });
    $$('[data-ev-open]').forEach(function(b){
      b.addEventListener('click', function(){
        var e = EVIDENCE.filter(function(x){ return x.id === b.dataset.evOpen; })[0];
        if (!e) return;
        openModal('Evidence record', e.title,
          '<p>Owner: ' + esc(USER.name) + ' · Skill: ' + esc(e.skill) + ' · Assessment: human review · Verifier: assigned where applicable.</p>' +
          '<div class="mp-task"><div class="mpt-label">Artifact</div><p>Original submission with versions and hashes.</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Review notes</div><p>Criterion-specific feedback and required changes where applicable.</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Outcome mapping</div><p>Skills and outcomes demonstrated, with support level recorded.</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Provenance &amp; visibility</div><p>' + esc(e.visibility) + ' · share only by explicit consent.</p></div>' +
          '<p class="modal-note">Course completion, assessed submission, independent verification and actual workplace experience are separate records.</p>');
      });
    });
  }
  renderEvidenceVault('all');
  $$('[data-evidence-filter]').forEach(function(b){
    b.addEventListener('click', function(){ renderEvidenceVault(b.dataset.evidenceFilter); });
  });
  $('#evidenceExport').addEventListener('click', function(){
    openModal('Evidence Vault', 'Export record', '<p>In production this produces a signed archive with full provenance, hashes and audit history.</p>');
  });

  /* ============================================================
     CREDENTIALS
     ============================================================ */
  function renderCredentials(){
    var hostV = $('#credentialsVerified'), hostP = $('#credentialsPending');
    hostV.innerHTML = ''; hostP.innerHTML = '';
    var verified = CREDENTIALS.filter(function(c){ return c.status === 'Verified'; });
    var pending = EVIDENCE.filter(function(e){ return e.status === 'In Review'; });
    $('#cVerifiedCount').textContent = verified.length + ' verified';
    if (!verified.length) hostV.innerHTML = '<div class="empty">No verified credentials yet.</div>';
    verified.forEach(function(c){
      var row = el('div', 'row-item');
      row.style.padding = '16px 0';
      row.innerHTML =
        '<div class="row-left" style="align-items:flex-start">' +
          '<div class="row-icon ok">CR</div>' +
          '<div class="row-body">' +
            '<div class="row-title">' + esc(c.name) + '</div>' +
            '<div class="row-sub">ID ' + esc(c.id) + ' · Issued ' + esc(c.issued) + '</div>' +
            '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">' +
              '<span class="pill neutral">' + esc(c.method) + '</span>' +
              '<span class="pill neutral">' + (c.visible ? 'Public share on' : 'Private') + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="row-actions">' + statusPill('Verified') +
          '<button class="btn-ghost" data-cred-open="' + esc(c.id) + '">View</button>' +
        '</div>';
      hostV.appendChild(row);
    });
    if (!pending.length) hostP.innerHTML = '<div class="empty">No evidence awaiting verification.</div>';
    pending.forEach(function(e){
      var row = el('div', 'row-item');
      row.innerHTML =
        '<div class="row-left"><div class="row-icon cool">EV</div>' +
        '<div class="row-body"><div class="row-title">' + esc(e.title) + '</div>' +
        '<div class="row-sub">Awaiting a different qualified verifier with a conflict check</div></div></div>' +
        '<div class="row-actions">' + statusPill('In Review') + '</div>';
      hostP.appendChild(row);
    });
    $$('[data-cred-open]').forEach(function(b){
      b.addEventListener('click', function(){
        var c = CREDENTIALS.filter(function(x){ return x.id === b.dataset.credOpen; })[0];
        if (!c) return;
        openModal('Credential', c.name + ' — ' + c.status,
          '<p>Credential ID: <strong>' + esc(c.id) + '</strong></p>' +
          '<div class="mp-task"><div class="mpt-label">Skill</div><p>' + esc(c.skill) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Issued</div><p>' + esc(c.issued) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Method</div><p>' + esc(c.method) + '</p></div>' +
          '<div class="mp-task"><div class="mpt-label">Scope</div><p>Scoped academy assessment. Not employment, accreditation, or workplace experience.</p></div>' +
          '<p class="modal-note">Visibility is consent-controlled. Sharing reveals only fields you have opted to publish.</p>');
      });
    });
  }
  renderCredentials();

  /* ============================================================
     SKILLS
     ============================================================ */
  function renderSkills(){
    var host = $('#skillsList'); host.innerHTML = '';
    if (!SKILLS.length){ host.innerHTML = '<div class="empty">No skills recorded yet. Skills are added when reviewed work is independently verified.</div>'; return; }
    SKILLS.forEach(function(s){
      var cls = s.level === 'Independent-in-scenario' ? 'ok' : s.level === 'Developing' ? 'warn' : 'neutral';
      var row = el('div', 'row-item');
      row.innerHTML =
        '<div class="row-left"><div class="row-icon ' + (s.level === 'Independent-in-scenario' ? 'ok' : s.level === 'Developing' ? 'warn' : '') + '">' + esc(s.course) + '</div>' +
        '<div class="row-body"><div class="row-title">' + esc(s.name) + '</div>' +
        '<div class="row-sub">' + esc(s.course) + ' · ' + s.evidence + ' evidence record(s)</div></div></div>' +
        '<div class="row-actions"><span class="pill ' + cls + '">' + esc(s.level) + '</span></div>';
      host.appendChild(row);
    });
  }
  renderSkills();

  /* ============================================================
     ASSESSMENTS
     ============================================================ */
  function renderAssessments(){
    var t = $('#assessmentsTable'); t.innerHTML = '';
    if (!ASSESSMENTS.length){ t.innerHTML = '<tr><td colspan="6"><div class="empty">No assessments yet. Assessment results appear here after reviewed submissions.</div></td></tr>'; return; }
    ASSESSMENTS.forEach(function(a){
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="td-strong">' + esc(a.name) + '</span></td>' +
        '<td>' + esc(a.layer) + '</td>' +
        '<td>' + esc(a.method) + '</td>' +
        '<td class="td-muted">' + esc(a.ai) + '</td>' +
        '<td>' + statusPill(a.status) + '</td>' +
        '<td class="td-right"><span class="td-strong">' + esc(a.result) + '</span></td>';
      t.appendChild(tr);
    });
  }
  renderAssessments();

  /* ============================================================
     ORDERS
     ============================================================ */
  function renderOrders(){
    var t = $('#ordersTable'); t.innerHTML = '';
    var orders = (ENT && ENT.orders) || [], paid = 0, coupons = 0;
    if (!orders.length) t.innerHTML = '<tr><td colspan="6"><div class="empty">No orders yet.</div></td></tr>';
    orders.forEach(function(o){
      var refunded = o.status === 'refunded';
      if (!refunded){ paid += o.amount || 0; if (o.source === 'coupon') coupons++; }
      var titles = o.items.map(function(id){ var b = DBA.bundle(id), c = DBA.course(id); return b ? b.name : (c ? c.title : id); }).join(', ');
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="td-strong">' + esc(o.ref || o.id) + '</span></td><td>' + esc(titles) + '</td>' +
        '<td class="td-muted">' + esc((o.date || '').slice(0, 10)) + '</td><td class="td-strong">' + (o.amount ? DBA.money(o.amount) : 'Free') + '</td>' +
        '<td><span class="pill ' + (refunded ? 'warn' : 'ok') + '">' + (refunded ? 'Refunded' : (o.source === 'coupon' ? 'Redeemed' : 'Paid')) + '</span></td>' +
        '<td class="td-right"><span class="td-muted">' + (o.source === 'coupon' ? 'Promotion ' + esc(o.coupon || '') : 'Stripe · receipt emailed') + '</span></td>';
      t.appendChild(tr);
    });
    $('#payTotal').textContent = DBA.money(paid); $('#payOrders').textContent = orders.length + ' order' + (orders.length === 1 ? '' : 's');
    $('#payActive').textContent = ENT ? ENT.items.length : 0; $('#payCoupons').textContent = coupons;
    $('#payRefunds').textContent = orders.filter(function(o){ return o.status === 'refunded'; }).length;
  }
  renderOrders();

  /* ============================================================
     SUPPORT
     ============================================================ */
  function renderSupport(){
    var host = $('#supportList'); host.innerHTML = '';
    if (!STUDENT_STATE.supportCases.length){
      host.innerHTML = '<div class="empty">No support cases yet.</div>';
      return;
    }
    STUDENT_STATE.supportCases.forEach(function(c){
      var row = el('div', 'row-item');
      row.style.padding = '16px 0';
      row.innerHTML =
        '<div class="row-left" style="align-items:flex-start">' +
          '<div class="row-icon ' + (c.status === 'Resolved' ? 'ok' : 'warn') + '">SC</div>' +
          '<div class="row-body"><div class="row-title">' + esc(c.topic) + '</div>' +
          '<div class="row-sub">Opened ' + esc(c.opened || 'today') + ' · ' + esc(c.id || 'local') + '</div>' +
          '<div style="font-size:12px;color:var(--slate-2);margin-top:5px;line-height:1.55">' + esc(c.body) + '</div></div>' +
        '</div>' +
        '<div class="row-actions">' + statusPill(c.status) + '</div>';
      host.appendChild(row);
    });
  }
  renderSupport();
  (function(){ $('#supportTopic').innerHTML = DBA.SUPPORT_TOPICS.map(function(t){ return '<option>' + esc(t) + '</option>'; }).join(''); })();
  $('#supportName').value = USER.name; $('#supportEmail').value = USER.email;
  $('#supportSubmit').addEventListener('click', function(){
    var topic = $('#supportTopic').value, body = $('#supportBody').value.trim(), name = $('#supportName').value.trim(), email = $('#supportEmail').value.trim();
    if (body.length < 10){ openModal('Support', 'Add a description', '<p>Please describe the issue (at least a short sentence) before submitting.</p>'); return; }
    if (name.length < 2 || !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email)){ openModal('Support', 'Add your contact details', '<p>Please enter your name and a valid email so the team can reply. This is sent to the real Academy support desk.</p>'); return; }
    var btn = $('#supportSubmit'); btn.disabled = true; btn.textContent = 'Submitting…';
    DBA.api('support', { name: name, email: email, topic: topic, message: body, source: location.pathname }).then(function(r){
      btn.disabled = false; btn.textContent = 'Submit case';
      if (r.ok && r.data && r.data.ok){
        STUDENT_STATE.supportCases.unshift({ id: r.data.reference, topic: topic, body: body, status: 'Submitted', opened: new Date().toISOString().slice(0,10) });
        audit('Support case ' + r.data.reference + ' submitted (' + topic + ')');
        saveState(); $('#supportBody').value = ''; renderSupport(); updateCounts();
        toast('Case ' + r.data.reference + ' submitted. A confirmation was emailed to you.');
      } else {
        toast((r.status === 503 || r.status === 0 || r.status === 404) ? 'Support desk is not reachable right now. Email support@digitalburj.com.' : ((r.data && r.data.error) || 'Could not submit the case.'));
      }
    });
  });

  /* ============================================================
     SETTINGS
     ============================================================ */
  $('#saveProfile').addEventListener('click', function(){ audit('Demo profile saved'); saveState(); renderAudit(); toast('Demo profile saved on this device only.'); });
  function renderAudit(){
    var host = $('#auditList'), list = STUDENT_STATE.audit || [];
    host.innerHTML = list.length ? list.slice(0, 12).map(function(a){ return '<div class="audit-row"><span>' + esc(a.msg) + '</span><time>' + esc(a.at) + '</time></div>'; }).join('') : '<div class="empty">No actions recorded yet.</div>';
  }
  renderAudit();
  $('#resetDemo').addEventListener('click', function(){
    openModal('Reset', 'Reset the demo workspace?',
      '<p>This clears the demo learner\'s local progress, hints, evidence choices, support cases and audit log on this device. It does not touch your storefront cart, orders or any real record.</p>' +
      '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn-primary" id="resetYes">Yes, reset demo data</button><button class="btn-ghost" id="resetNo">Cancel</button></div>');
    $('#resetNo').addEventListener('click', closeModal);
    $('#resetYes').addEventListener('click', function(){ try { localStorage.removeItem(STORE_KEY); } catch(e){} location.hash = ''; location.reload(); });
  });
  $('#setPublic').checked = STUDENT_STATE.publicShare;
  $('#setAggregate').checked = STUDENT_STATE.aggregateReporting;
  $('#setAIStyle').value = STUDENT_STATE.aiStyle;
  $('#setPublic').addEventListener('change', function(){ STUDENT_STATE.publicShare = $('#setPublic').checked; audit('Public sharing ' + (STUDENT_STATE.publicShare ? 'enabled' : 'disabled')); saveState(); renderAudit(); toast('Public sharing ' + (STUDENT_STATE.publicShare ? 'enabled' : 'disabled') + '.'); });
  $('#setAggregate').addEventListener('change', function(){ STUDENT_STATE.aggregateReporting = $('#setAggregate').checked; saveState(); toast('Aggregate reporting ' + (STUDENT_STATE.aggregateReporting ? 'enabled' : 'disabled') + '.'); });
  $('#setAIStyle').addEventListener('change', function(){ STUDENT_STATE.aiStyle = $('#setAIStyle').value; saveState(); toast('AI coaching style: ' + STUDENT_STATE.aiStyle + '.'); });

  /* ============================================================
     TOPBAR ACTIONS
     ============================================================ */
  $('#newMissionBtn').addEventListener('click', function(){
    var options = MISSIONS.map(function(m){
      return '<button style="width:100%;text-align:left;background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin-bottom:8px;cursor:pointer;font-family:inherit" data-pick="' + esc(m.id) + '">' +
        '<div class="row-left"><div class="row-icon navy">' + esc(m.course) + '</div><div class="row-body"><div class="row-title">' + esc(m.title) + '</div><div class="row-sub">' + esc(m.due) + ' · ' + esc(m.status) + '</div></div></div>' +
        '</button>';
    }).join('');
    openModal('Missions', 'Pick a mission to open', '<p>Select a mission to load into your workspace.</p>' + '<div style="margin-top:12px">' + options + '</div>');
    $$('[data-pick]').forEach(function(b){
      b.addEventListener('click', function(){
        var m = MISSIONS.filter(function(x){ return x.id === b.dataset.pick; })[0];
        if (!m) return;
        STUDENT_STATE.activeMissionId = m.id; STUDENT_STATE.activeStage = m.stage; saveState();
        closeModal(); switchView('missions');
        toast('Loaded: ' + m.title);
      });
    });
  });
  $('#notifBtn').addEventListener('click', function(){
    var unread = MESSAGES.filter(function(m){ return m.unread; });
    openModal('Notifications', unread.length + ' unread',
      '<p>You have ' + unread.length + ' unread messages, ' + FEEDBACK.length + ' feedback items and 1 revision request.</p>' +
      '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">' +
        '<button class="btn-primary" id="notifMsg">Open messages</button>' +
        '<button class="btn-ghost" id="notifFeed">Open feedback</button>' +
      '</div>');
    $('#notifMsg').addEventListener('click', function(){ closeModal(); switchView('messages'); });
    $('#notifFeed').addEventListener('click', function(){ closeModal(); switchView('feedback'); });
  });
  $('#globalSearch').addEventListener('keydown', function(e){
    if (e.key !== 'Enter') return;
    var q = e.target.value.trim().toLowerCase();
    if (!q) return;
    // Search missions
    var m = MISSIONS.filter(function(x){ return (x.title + ' ' + x.course + ' ' + x.courseTitle).toLowerCase().indexOf(q) > -1; });
    if (m.length){ STUDENT_STATE.activeMissionId = m[0].id; STUDENT_STATE.activeStage = m[0].stage; saveState(); switchView('missions'); toast('Matched mission: ' + m[0].title); return; }
    // Search curriculum
    var c = [];
    Object.keys(CURRICULUM).forEach(function(k){ CURRICULUM[k].programs.forEach(function(p){ if ((p.title + ' ' + p.id + ' ' + p.desc).toLowerCase().indexOf(q) > -1) c.push(p); }); });
    if (c.length){ switchView('curriculum'); toast('Matched curriculum: ' + c[0].title); return; }
    // Search evidence
    var ev = EVIDENCE.filter(function(x){ return (x.title + ' ' + x.skill).toLowerCase().indexOf(q) > -1; });
    if (ev.length){ switchView('evidence'); toast('Matched evidence: ' + ev[0].title); return; }
    // Search tools
    var t = TOOLS.filter(function(x){ return (x.name + ' ' + x.desc).toLowerCase().indexOf(q) > -1; });
    if (t.length){ switchView('toolbench'); toast('Matched tool: ' + t[0].name); return; }
    // Search labs
    var l = LABS.filter(function(x){ return (x.title + ' ' + x.desc).toLowerCase().indexOf(q) > -1; });
    if (l.length){ switchView('labs'); toast('Matched lab: ' + l[0].title); return; }
    toast('No match found.');
  });
  $('#userMenu').addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.click(); } });
  $('#userMenu').addEventListener('click', function(){
    openModal('Account', USER.name,
      '<p>' + esc(USER.email) + (USER.verified ? ' · email verified' : '') + (USER.country ? ' · ' + esc(USER.country) : '') + ' · ' + (ENT ? ENT.courses.length : 0) + ' course(s) with active access</p>' +
      '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
        '<button class="btn-primary" id="acctSettings">Open settings</button>' +
        '<a class="btn-ghost" href="https://digitalburj.com/academy#bundles" data-site="/academy#bundles" style="display:inline-flex;align-items:center;text-decoration:none">Get more courses</a>' +
        '<button class="btn-ghost" id="acctSignout">Sign out</button>' +
      '</div>');
    $('#acctSettings').addEventListener('click', function(){ closeModal(); switchView('settings'); });
    $('#acctSignout').addEventListener('click', function(){ DBA.api('signout', {}).then(function(){ location.href = '/signin'; }); });
  });

  /* ============================================================
     INIT
     ============================================================ */
  $('#setEmail').readOnly = true; $('#setName').readOnly = true;
  $$('[data-site]').forEach(function(a){ a.href = DBA.siteUrl(a.getAttribute('data-site')); });
  updateCounts();
  function handleHash(){
    var h = (location.hash || '').replace('#','');
    if (VIEW_LABELS[h]) switchView(h);
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();

}
function tryBoot(){
  var root = document.getElementById('ws-root');
  if (!root || !window.DBA || !root.closest('#dc-root')) return false;   // wait for the site runtime's final render
  if (root.getAttribute('data-ready')) return true;
  root.setAttribute('data-ready', '1'); ROOT = root; route(); return true;
}
if (!tryBoot()){ var n = 0, t = setInterval(function(){ if (tryBoot() || ++n > 400) clearInterval(t); }, 50); }
})();
