/* DigitalBurj Academy — learner dashboard, course player, admin, and printable documents
 * (invoice, 3D-printed receipt, certificate, public verification). Everything shown comes from /api/academy;
 * the browser never decides access, grades checkpoints or issues credentials. */
(function(){
'use strict';
if (window.DBAMore) return;
var routes = {};
function K(){ return window.DBAKit; }
function esc(s){ return K().qesc(s); }
function q$(s, r){ return (r || document).querySelector(s); }
function qa(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function api(a, b){ return window.DBA.api(a, b || {}); }
function root(){ return K().root(); }
function P(){ return K().params(); }
function money(n){ return window.DBA.money(n); }
function date(iso){ try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); } catch (e) { return iso || ''; } }
function courseOf(id){ return window.DBA.course(id) || { title: id, hours: 0, id: id }; }
function CUR(){ return window.DBA_CUR || {}; }
function toast(msg){ var t = document.createElement('div'); t.className = 'mo-toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(function(){ t.remove(); }, 2600); }
function pageStyle(size){ var s = q$('#pg-style'); if (!s){ s = document.createElement('style'); s.id = 'pg-style'; document.head.appendChild(s); } s.textContent = '@media print{@page{size:' + size + ';margin:' + (size.indexOf('landscape') > -1 ? '0' : '12mm') + '}}'; }
/* Signed-in area = a closed application: no marketing header/footer/chat widgets, nothing that leads out by accident. */
function lockApp(on){ document.documentElement.classList.toggle('app-locked', on !== false); }
function needUser(me){
  if (me && me.user) return true;
  K().go('/signin?next=' + encodeURIComponent(location.pathname + location.search)); return false;
}
var IC = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L7 23l5-3 5 3-1.5-9.5"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>'
};

/* ------------------------------------------------------------------ shell */
function shell(me, active, inner){
  var u = me.user, ini = u.name.split(/\s+/).map(function(w){ return w[0]; }).slice(0, 2).join('').toUpperCase();
  var isAdmin = !!me.admin || !!u.demo;
  var nav = [['overview', 'Dashboard', IC.home, '/dashboard'], ['courses', 'Courses', IC.book, '/dashboard#courses'], ['credentials', 'Credentials', IC.award, '/dashboard#credentials'], ['billing', 'Billing & documents', IC.card, '/dashboard#billing'], ['support', 'Support', IC.help, '/dashboard#support'], ['settings', 'Settings', IC.cog, '/dashboard#settings']];
  var h = '<div class="ac"><div class="mo" id="mo"><aside class="mo-side"><a class="mo-brand" href="/dashboard"><img src="brand/mark-academy.webp" alt="" width="34" height="34"/><span>Academy</span></a><nav class="mo-nav" aria-label="Academy">';
  nav.forEach(function(n){ h += '<a href="' + n[3] + '" data-nav="' + n[0] + '"' + (active === n[0] ? ' class="on" aria-current="page"' : '') + '>' + n[2] + esc(n[1]) + '</a>'; });
  if (isAdmin) h += '<div class="sep"></div><a href="/admin"' + (active === 'admin' ? ' class="on" aria-current="page"' : '') + '>' + IC.shield + (u.demo ? 'Admin (demo)' : 'Admin') + '</a>';
  h += '<div class="sep"></div><button type="button" id="moOut">' + IC.out + 'Sign out</button></nav>';
  h += '<div class="mo-user"><div class="mo-avatar">' + esc(ini) + '</div><div style="min-width:0"><b>' + esc(u.name) + '</b><span>' + (u.demo ? 'Demo account' : isAdmin ? 'Administrator' : 'Learner') + '</span></div></div></aside>';
  h += '<main class="mo-main" id="moMain"><div class="mo-top"><button type="button" id="moMenu" aria-label="Open menu">☰</button><b>DigitalBurj Academy</b></div>';
  if (u.demo) h += '<div class="mo-banner demo" role="status"><b>Demo account.</b> Every course is unlocked, labs are reviewed automatically and certificates are watermarked DEMO. Data is sample-only and this account cannot be signed back into.<a href="/signup">Create a real account</a></div>';
  else if (!me.entitlements) h += '<div class="mo-banner" role="status">Verify your email (' + esc(u.email) + ') to unlock anything you have purchased. <button type="button" id="bnResend">Resend email</button></div>';
  h += inner + '</main></div></div>';
  lockApp(true);
  root().innerHTML = h;
  var mo = q$('#mo');
  q$('#moMenu').addEventListener('click', function(){ mo.classList.toggle('open'); });
  q$('.mo-main').addEventListener('click', function(){ mo.classList.remove('open'); });
  q$('#moOut').addEventListener('click', function(){ api('signout').then(function(){ K().go('/start'); }); });
  var rs = q$('#bnResend'); if (rs) rs.addEventListener('click', function(){ rs.disabled = true; api('resend').then(function(r){ rs.textContent = r.ok ? 'Sent — check your inbox' : ((r.data && r.data.error) || 'Try again shortly'); }); });
}

/* ------------------------------------------------------------------ dashboard */
var STATE = { me: null, prog: null };
function courseStats(id){
  var c = STATE.prog && STATE.prog.courses[id], units = (CUR()[id] && CUR()[id].units.length) || 0;
  var done = c ? c.units.filter(Boolean).length : 0, lab = c && c.lab ? c.lab.status : '';
  var pct = units ? Math.round(((done + (lab === 'submitted' || lab === 'approved' ? 1 : 0)) / (units + 1)) * 100) : 0;
  return { done: done, total: units, lab: lab, pct: pct, allUnits: units > 0 && done === units };
}
function nextStep(id){
  var s = courseStats(id);
  if (s.pct >= 100 || s.lab === 'approved') return 'Completed';
  if (s.lab === 'submitted') return 'Lab under review';
  if (s.allUnits) return 'Submit lab evidence';
  return 'Unit ' + (s.done + 1) + ' of ' + s.total;
}
function courseCard(id, owned){
  var c = courseOf(id), s = courseStats(id);
  if (!owned) return '<div class="mo-course locked"><span class="id">' + esc(id) + '</span><h3>' + esc(c.title) + '</h3><p>' + esc(c.desc || '') + '</p><div class="mo-meta"><span>' + esc(c.hours) + ' hrs · ' + esc(c.level || '') + '</span><span class="mo-pill">Locked</span></div><a class="mo-btn ghost sm" href="' + window.DBA.siteUrl('/academy') + '#courses">Get this course · ' + money(c.price) + '</a></div>';
  return '<div class="mo-course"><span class="id">' + esc(id) + '</span><h3>' + esc(c.title) + '</h3><p>' + esc((CUR()[id] && CUR()[id].outcome) || c.desc || '') + '</p><div class="mo-bar" role="progressbar" aria-valuenow="' + s.pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + s.pct + '%"></i></div><div class="mo-meta"><span>' + esc(nextStep(id)) + '</span><b>' + s.pct + '%</b></div><a class="mo-btn red sm" href="/learn?c=' + encodeURIComponent(id) + '">' + (s.pct ? (s.pct >= 100 ? 'Review course' : 'Continue') : 'Start course') + '</a></div>';
}
function viewOverview(){
  var me = STATE.me, ent = me.entitlements, owned = ent ? ent.courses : [], creds = (STATE.prog && STATE.prog.credentials) || [];
  var passed = 0, hours = 0; owned.forEach(function(id){ passed += courseStats(id).done; hours += courseOf(id).hours || 0; });
  var first = me.user.name.split(' ')[0], hr = new Date().getHours();
  var cont = owned.filter(function(id){ var s = courseStats(id); return s.pct < 100 && s.lab !== 'approved'; })[0];
  var h = '<h1 class="mo-h">' + (hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening') + ', ' + esc(first) + '.</h1><p class="mo-sub">' + (owned.length ? 'Pick up where you left off, or open any course you own.' : 'Your account is ready. Courses you buy appear here as soon as the payment is confirmed.') + '</p>';
  h += '<div class="mo-tiles"><div class="mo-tile"><small>Courses</small><b>' + owned.length + '</b><span>with active access</span></div><div class="mo-tile"><small>Checkpoints</small><b>' + passed + '</b><span>passed</span></div><div class="mo-tile"><small>Credentials</small><b>' + creds.length + '</b><span>issued</span></div><div class="mo-tile"><small>Learning hours</small><b>' + hours + '</b><span>in your courses</span></div></div>';
  if (cont) h += '<div class="mo-card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div><small style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--red-2)">Continue learning</small><h2 style="margin:4px 0 0">' + esc(courseOf(cont).title) + '</h2><span style="color:var(--slate-2);font-size:13px">' + esc(nextStep(cont)) + '</span></div><a class="mo-btn red" href="/learn?c=' + encodeURIComponent(cont) + '">Continue →</a></div>';
  if (!owned.length) h += '<div class="mo-empty"><b>No courses yet</b><p style="color:var(--slate-2);margin:0 0 14px">Bundles start at $3 — one-time purchase, lifetime access.</p><a class="mo-btn red" href="' + window.DBA.siteUrl('/academy') + '#bundles">Browse bundles</a></div>';
  else h += '<h2 style="font-family:var(--head);margin:6px 0 12px;font-size:19px">Your courses</h2><div class="mo-grid">' + owned.map(function(id){ return courseCard(id, true); }).join('') + '</div>';
  return h;
}
function viewCourses(){
  var owned = STATE.me.entitlements ? STATE.me.entitlements.courses : [];
  var h = '<h1 class="mo-h">Courses</h1><p class="mo-sub">All 14 courses. Owned courses open straight into the player; the rest are one click from the store.</p><div class="mo-grid">';
  window.DBA.COURSES.forEach(function(c){ h += courseCard(c.id, owned.indexOf(c.id) > -1); });
  return h + '</div>';
}
function credKind(c){ return c.revoked ? '<span class="mo-pill stop">Revoked</span>' : c.kind === 'assessed' ? '<span class="mo-pill ok">Assessed</span>' : '<span class="mo-pill warn">Completion record</span>'; }
function viewCredentials(){
  var creds = (STATE.prog && STATE.prog.credentials) || [];
  var h = '<h1 class="mo-h">Credentials</h1><p class="mo-sub">A completion record is issued when you pass every checkpoint and submit your lab. It becomes an assessed credential when a human reviewer approves your evidence. Each has a public verification link.</p>';
  if (!creds.length) return h + '<div class="mo-empty"><b>No credentials yet</b><p style="color:var(--slate-2);margin:0">Finish a course and submit its lab evidence to earn your first one.</p></div>';
  h += '<div class="mo-grid">';
  creds.forEach(function(c){
    var url = window.DBA.appUrl('/credential?id=' + encodeURIComponent(c.id));
    h += '<div class="mo-course"><span class="id">' + esc(c.id) + '</span><h3>' + esc(c.title) + '</h3><div class="ad-row">' + credKind(c) + (c.demo ? '<span class="mo-pill">Demo</span>' : '') + '</div><p>Issued ' + esc(date(c.issued)) + (c.assessedAt ? ' · assessed ' + esc(date(c.assessedAt)) : '') + '</p><div class="ad-row"><a class="mo-btn red sm" href="/certificate?id=' + encodeURIComponent(c.id) + '">View certificate</a><button class="mo-btn ghost sm" data-copy="' + esc(url) + '">Copy verify link</button></div></div>';
  });
  return h + '</div>';
}
function viewBilling(){
  var orders = (STATE.me.entitlements && STATE.me.entitlements.orders) || [];
  var h = '<h1 class="mo-h">Billing & documents</h1><p class="mo-sub">Every order with its invoice and receipt. Amounts come from your stored order, never from the browser.</p>';
  if (!orders.length) return h + '<div class="mo-empty"><b>No orders yet</b><p style="color:var(--slate-2);margin:0">Your purchases will be listed here with printable invoices and receipts.</p></div>';
  h += '<div class="mo-card mo-scroll"><table class="mo-table"><thead><tr><th>Date</th><th>Reference</th><th>Items</th><th>Amount</th><th>Status</th><th>Documents</th></tr></thead><tbody>';
  orders.forEach(function(o){
    var names = (o.items || []).map(function(i){ var x = window.DBA.bundle(i) || window.DBA.course(i) || {}; return x.name || x.title || i; }).join(', ');
    var src = o.source === 'stripe' ? 'Card' : o.source === 'coupon' ? 'Promotion' : o.source === 'admin' ? 'Granted' : o.source === 'demo' ? 'Demo' : o.source;
    h += '<tr><td>' + esc(date(o.date)) + '</td><td>' + esc(o.ref || o.id) + '<br><small style="color:var(--slate-3)">' + esc(src) + '</small></td><td>' + esc(names) + '</td><td>' + money(o.amount || 0) + '</td><td>' + (o.status === 'refunded' ? '<span class="mo-pill stop">Refunded</span>' : '<span class="mo-pill ok">Active</span>') + '</td><td><div class="ad-row"><a class="mo-btn ghost sm" href="/invoice?o=' + encodeURIComponent(o.id) + '">Invoice</a><a class="mo-btn ghost sm" href="/receipt?o=' + encodeURIComponent(o.id) + '">Receipt</a></div></td></tr>';
  });
  return h + '</tbody></table></div>';
}
function viewSupport(){
  var u = STATE.me.user;
  return '<h1 class="mo-h">Support</h1><p class="mo-sub">Account, payment, course, assessment, technical, refund, accessibility or appeal — we reply within one business day.</p><form class="mo-form" id="supForm"><div><label for="sp-t">Category</label><select id="sp-t">' + window.DBA.SUPPORT_TOPICS.map(function(t){ return '<option>' + esc(t) + '</option>'; }).join('') + '</select></div><div><label for="sp-m">How can we help?</label><textarea id="sp-m" placeholder="Describe the problem or question (10+ characters)"></textarea></div><div id="sp-r"></div><button class="mo-btn red" id="sp-b" type="submit">Submit case</button></form>' + '<p style="color:var(--slate-2);font-size:13px;margin-top:14px">Signed in as ' + esc(u.email) + '. You can also email <a href="mailto:support@digitalburj.com">support@digitalburj.com</a>.</p>';
}
function viewSettings(){
  var u = STATE.me.user;
  return '<h1 class="mo-h">Settings</h1><p class="mo-sub">Your account details.</p><div class="mo-card"><table class="mo-table"><tbody><tr><td>Name</td><td><b>' + esc(u.name) + '</b></td></tr><tr><td>Email</td><td><b>' + esc(u.email) + '</b> ' + (u.verified ? '<span class="mo-pill ok">Verified</span>' : '<span class="mo-pill warn">Not verified</span>') + '</td></tr><tr><td>Country</td><td>' + esc(u.country || '—') + '</td></tr><tr><td>Goal</td><td>' + esc(u.goal || '—') + '</td></tr><tr><td>Member since</td><td>' + esc(date(u.createdAt)) + '</td></tr></tbody></table></div><div class="mo-card"><h2>Privacy</h2><p style="margin:0;color:var(--slate-2);font-size:14px;line-height:1.6">Your evidence and learning records are private by default. Public verification pages show only your name, the course, the date and whether the credential is valid.</p></div><a class="mo-btn ghost" href="/forgot">Change password</a>';
}
function bindView(view){
  qa('[data-copy]').forEach(function(b){ b.addEventListener('click', function(){ var t = b.getAttribute('data-copy'); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function(){ toast('Verification link copied'); }, function(){ window.prompt('Copy this link', t); }); }); });
  var f = q$('#supForm'); if (f) f.addEventListener('submit', function(e){
    e.preventDefault(); var m = q$('#sp-m').value.trim(), b = q$('#sp-b'), r = q$('#sp-r');
    if (m.length < 10){ r.innerHTML = '<div class="mo-msg err">Please describe the issue (10+ characters).</div>'; return; }
    b.disabled = true; api('support', { name: STATE.me.user.name, email: STATE.me.user.email, topic: q$('#sp-t').value, message: m, source: 'academy-app' }).then(function(x){
      b.disabled = false; r.innerHTML = x.ok ? '<div class="mo-msg ok">Case ' + esc(x.data.reference) + ' submitted. We will reply by email.</div>' : '<div class="mo-msg err">' + esc((x.data && x.data.error) || 'Could not submit. Email support@digitalburj.com.') + '</div>'; if (x.ok) q$('#sp-m').value = '';
    });
  });
}
function renderDash(){
  var view = (location.hash || '#overview').replace('#', ''), map = { overview: viewOverview, courses: viewCourses, credentials: viewCredentials, billing: viewBilling, support: viewSupport, settings: viewSettings };
  if (!map[view]) view = 'overview';
  shell(STATE.me, view, map[view]()); bindView(view); window.scrollTo(0, 0);
}
function dashboard(me){
  if (!needUser(me)) return;
  STATE.me = me; STATE.prog = { courses: {}, credentials: [], submissions: [] };
  var go = function(){ renderDash(); window.onhashchange = renderDash; };
  if (!me.entitlements) return go();
  api('progress').then(function(r){ if (r.ok) STATE.prog = r.data; go(); });
}
routes['/dashboard'] = dashboard;

/* ------------------------------------------------------------------ course player */
function learn(me){
  if (!needUser(me)) return;
  var id = P().get('c') || '';
  if (!me.entitlements) { K().go('/dashboard'); return; }
  if (!CUR()[id]) { K().go('/dashboard#courses'); return; }
  if (me.entitlements.courses.indexOf(id) < 0) { K().go('/dashboard#courses'); return; }
  STATE.me = me;
  api('progress').then(function(r){
    if (!r.ok) return K().go('/dashboard');
    STATE.prog = r.data; var cp = STATE.prog.courses[id];
    var u = P().get('u'), cur;
    if (u === 'lab') cur = 'lab'; else if (u !== null && !isNaN(Number(u))) cur = Number(u);
    else { var idx = cp.units.findIndex(function(x){ return !x; }); cur = idx === -1 ? 'lab' : idx; }
    renderLearn(id, cur);
  });
}
function renderLearn(id, cur){
  var C = CUR()[id], c = courseOf(id), cp = STATE.prog.courses[id], s = courseStats(id);
  var nav = '<h3>' + esc(c.title) + '</h3>';
  C.units.forEach(function(u, i){ nav += '<button type="button" data-u="' + i + '" class="' + (cur === i ? 'on ' : '') + (cp.units[i] ? 'done' : '') + '"><span class="n">' + (cp.units[i] ? '✓' : (i + 1)) + '</span><span>' + esc(u.t) + '</span></button>'; });
  nav += '<button type="button" data-u="lab" class="' + (cur === 'lab' ? 'on ' : '') + (cp.lab && (cp.lab.status === 'submitted' || cp.lab.status === 'approved') ? 'done' : '') + '"' + (s.allUnits ? '' : ' disabled title="Pass every checkpoint to unlock the lab"') + '><span class="n">' + (cp.lab && cp.lab.status === 'approved' ? '✓' : 'L') + '</span><span>Lab &amp; evidence</span></button>';
  var body = cur === 'lab' ? learnLab(id, C, cp) : learnUnit(id, C, cp, cur);
  shell(STATE.me, 'courses', '<p style="margin:0 0 10px"><a href="/dashboard#courses" style="font-size:13px;font-weight:600">← All courses</a></p><h1 class="mo-h">' + esc(c.title) + '</h1><p class="mo-sub">' + esc(C.outcome) + '</p><div class="mo-bar" style="margin:-8px 0 20px;max-width:520px"><i style="width:' + s.pct + '%"></i></div><div class="lp"><nav class="lp-nav" aria-label="Course units">' + nav + '</nav><section class="lp-body" id="lpBody">' + body + '</section></div>');
  qa('.lp-nav button:not([disabled])').forEach(function(b){ b.addEventListener('click', function(){ var u = b.getAttribute('data-u'); renderLearn(id, u === 'lab' ? 'lab' : Number(u)); window.scrollTo(0, 0); }); });
  (cur === 'lab' ? bindLab : bindUnit)(id, C, cp, cur);
}
function readMins(u){ var t = (u.body || []).join(' ') + ' ' + (u.example || '') + ' ' + (u.steps || []).join(' '); return Math.max(2, Math.round(t.split(/\s+/).length / 180)); }
function learnUnit(id, C, cp, i){
  var u = C.units[i], done = !!cp.units[i], list = function(a, cls){ return '<ul class="' + cls + '">' + (a || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
  var h = '<small class="lp-kick">Lesson ' + (i + 1) + ' of ' + C.units.length + ' · about ' + readMins(u) + ' min read</small><h2>' + esc(u.t) + '</h2>';
  if (u.goal) h += '<div class="lp-goal"><b>What you will learn</b><span>' + esc(u.goal) + '</span></div>';
  h += (u.body || []).map(function(p){ return '<p class="lead">' + esc(p) + '</p>'; }).join('');
  if (u.example) h += '<div class="lp-call ex"><b>A real example</b><p>' + esc(u.example) + '</p></div>';
  if (u.steps && u.steps.length) h += '<h3 class="lp-h">Step by step</h3><ol class="lp-steps">' + u.steps.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
  if (u.mistakes && u.mistakes.length) h += '<div class="lp-call warn"><b>Common mistakes to avoid</b>' + list(u.mistakes, 'lp-mist') + '</div>';
  if (u.terms && u.terms.length) h += '<h3 class="lp-h">Key words</h3><dl class="lp-terms">' + u.terms.map(function(t){ return '<div><dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd></div>'; }).join('') + '</dl>';
  if (u.tryit) h += '<div class="lp-call try"><b>Try it yourself</b><p>' + esc(u.tryit) + '</p></div>';
  h += '<h3 class="lp-h">Key points to remember</h3>' + list(u.pts, 'lp-pts');
  h += '<div class="lp-q"><h4>Checkpoint — answer both questions' + (done ? ' · <span class="mo-pill ok">Passed</span>' : '') + '</h4>';
  u.qs.forEach(function(q, n){
    h += '<fieldset class="lp-qs" data-q="' + n + '"><legend>' + (n + 1) + '. ' + esc(q.p) + '</legend>';
    q.o.forEach(function(o, k){ h += '<label class="lp-opt"><input type="radio" name="ans' + n + '" value="' + k + '"/><span>' + esc(o) + '</span></label>'; });
    h += '</fieldset>';
  });
  h += '<div id="qres" aria-live="polite"></div><div class="ad-row" style="margin-top:12px"><button class="mo-btn red" id="qcheck" type="button">Check my answers</button>' + (done ? '<button class="mo-btn ghost" id="qnext" type="button">' + (i + 1 < C.units.length ? 'Next lesson →' : 'Go to the lab →') + '</button>' : '') + '</div></div>';
  return h;
}
function bindUnit(id, C, cp, i){
  qa('.lp-opt').forEach(function(l){ l.addEventListener('click', function(){ var f = l.closest('fieldset'); qa('.lp-opt', f).forEach(function(x){ x.classList.remove('sel', 'wrong', 'right'); }); l.classList.add('sel'); }); });
  var next = function(){ renderLearn(id, i + 1 < C.units.length ? i + 1 : (STATE.prog.courses[id].units.every(Boolean) ? 'lab' : i)); window.scrollTo(0, 0); };
  var nb = q$('#qnext'); if (nb) nb.addEventListener('click', next);
  q$('#qcheck').addEventListener('click', function(){
    var res = q$('#qres'), n = C.units[i].qs.length, ans = [];
    for (var k = 0; k < n; k++){ var sel = q$('input[name=ans' + k + ']:checked'); if (!sel){ res.innerHTML = '<div class="mo-msg info">Please answer both questions first.</div>'; return; } ans.push(Number(sel.value)); }
    var b = q$('#qcheck'); b.disabled = true;
    api('checkpoint', { course: id, unit: i, answers: ans }).then(function(r){
      b.disabled = false;
      if (!r.ok){ res.innerHTML = '<div class="mo-msg err">' + esc((r.data && r.data.error) || 'Could not check the answers.') + '</div>'; return; }
      qa('fieldset.lp-qs').forEach(function(f, k){ var l = q$('input[name=ans' + k + ']:checked').closest('.lp-opt'); l.classList.remove('right', 'wrong'); l.classList.add(r.data.results[k] ? 'right' : 'wrong'); });
      if (r.data.correct){
        STATE.prog.courses[id].units[i] = new Date().toISOString();
        res.innerHTML = '<div class="mo-msg ok">Well done — both correct. Lesson complete (' + r.data.completed + ' of ' + r.data.total + ').' + (r.data.allDone ? ' The lab is now unlocked.' : '') + '</div>';
        if (!q$('#qnext')){ var nx = document.createElement('button'); nx.className = 'mo-btn ghost'; nx.id = 'qnext'; nx.type = 'button'; nx.textContent = (i + 1 < C.units.length ? 'Next lesson →' : 'Go to the lab →'); nx.addEventListener('click', next); q$('#qcheck').parentNode.appendChild(nx); }
        var nb2 = q$('.lp-nav button[data-u="' + i + '"]'); if (nb2){ nb2.classList.add('done'); nb2.querySelector('.n').textContent = '✓'; }
        if (r.data.allDone){ var lb = q$('.lp-nav button[data-u="lab"]'); if (lb){ lb.disabled = false; lb.removeAttribute('title'); lb.addEventListener('click', function(){ renderLearn(id, 'lab'); }); } }
      } else { var bad = r.data.results.filter(function(x){ return !x; }).length; res.innerHTML = '<div class="mo-msg err">' + bad + ' of ' + n + ' not quite right (marked in red). Re-read the lesson above and change your answer.</div>'; }
    });
  });
}
function csv(C){ var cols = C.lab.cols; return [cols].concat(C.lab.rows).map(function(r){ return r.map(function(x){ return '"' + String(x).replace(/"/g, '""') + '"'; }).join(','); }).join('\n'); }
function learnLab(id, C, cp){
  var L = C.lab, lab = cp.lab, st = lab ? lab.status : '';
  var h = '<small style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--red-2)">Lab &amp; evidence</small><h2>' + esc(L.title) + '</h2><p class="lead">' + esc(L.scenario) + '</p>';
  h += '<div class="mo-scroll"><table class="lp-lab-table"><thead><tr>' + L.cols.map(function(c){ return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + L.rows.map(function(r){ return '<tr>' + r.map(function(x){ return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div><p style="font-size:12px;color:var(--slate-3);margin:-2px 0 12px">Fictional data for practice. <button type="button" class="mo-btn ghost sm" id="csvDl">Download CSV</button></p>';
  h += '<h4 style="font-family:var(--head);margin:18px 0 6px">Tasks</h4><ul class="lp-tasks">' + L.tasks.map(function(t){ return '<li><input type="checkbox"/><span>' + esc(t) + '</span></li>'; }).join('') + '</ul><p style="font-size:14px"><b>Deliverable:</b> ' + esc(L.deliverable) + '</p>';
  if (L.hints && L.hints.length) h += '<details class="lp-det"><summary>Stuck? Show hints</summary><ul class="lp-mist">' + L.hints.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></details>';
  if (L.rubric && L.rubric.length) h += '<div class="lp-call try"><b>How your work is judged</b><ul class="lp-mist">' + L.rubric.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  if (st === 'approved') h += '<div class="mo-msg ok" style="margin-top:16px">Approved' + (lab.feedback ? ' — ' + esc(lab.feedback) : '') + '. <a href="' + certLink(id) + '" style="text-decoration:underline">View your certificate →</a></div>';
  else if (st === 'submitted') h += '<div class="mo-msg info" style="margin-top:16px">Submitted ' + esc(date(lab.at)) + ' — waiting for a reviewer. Your completion record is already issued: <a href="' + certLink(id) + '" style="text-decoration:underline">view certificate</a>.</div>';
  else {
    if (st === 'changes') h += '<div class="mo-msg err" style="margin-top:16px">Changes requested: ' + esc(lab.feedback) + '</div>';
    h += '<form class="mo-form" id="labForm" style="margin-top:16px;max-width:none"><div><label for="lb-t">Your evidence</label><textarea id="lb-t" placeholder="Describe what you did and paste your results (80+ characters)">' + esc(lab ? lab.text || '' : '') + '</textarea></div><div><label for="lb-l">Link to your work (optional)</label><input id="lb-l" type="url" placeholder="https://" value="' + esc(lab ? lab.link || '' : '') + '"/></div><div id="lb-r" aria-live="polite"></div><button class="mo-btn red" id="lb-b" type="submit">' + (st === 'changes' ? 'Resubmit evidence' : 'Submit evidence') + '</button></form>';
  }
  return h;
}
function certLink(id){ var c = ((STATE.prog && STATE.prog.credentials) || []).filter(function(x){ return x.course === id; })[0]; return c ? '/certificate?id=' + encodeURIComponent(c.id) : '/dashboard#credentials'; }
function bindLab(id, C, cp){
  var d = q$('#csvDl'); if (d) d.addEventListener('click', function(){ var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv(C)], { type: 'text/csv' })); a.download = id + '-lab-data.csv'; a.click(); });
  var f = q$('#labForm'); if (!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault(); var t = q$('#lb-t').value.trim(), l = q$('#lb-l').value.trim(), b = q$('#lb-b'), r = q$('#lb-r');
    if (t.length < 80){ r.innerHTML = '<div class="mo-msg err">Please write at least 80 characters so a reviewer can assess your work.</div>'; return; }
    b.disabled = true; api('submit', { course: id, text: t, link: l }).then(function(x){
      b.disabled = false;
      if (!x.ok){ r.innerHTML = '<div class="mo-msg err">' + esc((x.data && x.data.error) || 'Could not submit.') + '</div>'; return; }
      var c = STATE.prog.courses[id]; c.lab = { status: x.data.status, at: new Date().toISOString(), feedback: x.data.status === 'approved' ? 'Demo sandbox: automatically approved.' : '', text: t, link: l };
      var creds = STATE.prog.credentials.filter(function(z){ return z.id !== x.data.credential.id; }); creds.push(x.data.credential); STATE.prog.credentials = creds;
      renderLearn(id, 'lab'); toast(x.data.status === 'approved' ? 'Approved — certificate issued' : 'Submitted — completion record issued');
    });
  });
}
routes['/learn'] = learn;

/* ------------------------------------------------------------------ admin */
var AD = { tab: 'overview' };
function admin(me){
  if (!needUser(me)) return;
  if (!me.admin && !me.user.demo){ shell(me, 'admin', '<h1 class="mo-h">Admin</h1><div class="mo-empty"><b>Admin access required</b><p style="margin:0;color:var(--slate-2)">This area is limited to Academy administrators.</p></div>'); return; }
  STATE.me = me; renderAdmin();
}
function renderAdmin(){
  var me = STATE.me, tabs = [['overview', 'Overview'], ['users', 'Learners'], ['submissions', 'Reviews'], ['orders', 'Orders'], ['credentials', 'Credentials']];
  var h = '<h1 class="mo-h">Admin' + (me.user.demo ? ' <span class="mo-pill warn">demo · read-only sample data</span>' : '') + '</h1><p class="mo-sub">Manage learners, review lab evidence, grant or revoke access and oversee credentials. Every action is checked on the server.</p><div class="ad-tabs" role="tablist">' + tabs.map(function(t){ return '<button type="button" role="tab" data-tab="' + t[0] + '" class="' + (AD.tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div><div id="adBody"><div class="mo-msg info">Loading…</div></div>';
  shell(me, 'admin', h);
  qa('.ad-tabs button').forEach(function(b){ b.addEventListener('click', function(){ AD.tab = b.getAttribute('data-tab'); renderAdmin(); }); });
  ({ overview: adOverview, users: adUsers, submissions: adSubs, orders: adOrders, credentials: adCreds }[AD.tab])();
}
function adErr(r){ return '<div class="mo-msg err">' + esc((r.data && r.data.error) || 'Request failed.') + '</div>'; }
function adOverview(){
  api('admin_overview').then(function(r){
    var b = q$('#adBody'); if (!r.ok) { b.innerHTML = adErr(r); return; }
    var s = r.data.stats;
    var h = '<div class="mo-tiles">' + [['Learners', s.users, s.verified + ' verified'], ['Orders', s.orders, s.refunded + ' refunded'], ['Revenue', money(s.revenue), 'card payments'], ['Pending reviews', s.pendingReviews, 'lab submissions'], ['Credentials', s.credentials, s.assessed + ' assessed'], ['Demo accounts', s.demoAccounts, 'excluded above']].map(function(t){ return '<div class="mo-tile"><small>' + t[0] + '</small><b>' + esc(t[1]) + '</b><span>' + esc(t[2]) + '</span></div>'; }).join('') + '</div>';
    h += '<div class="mo-grid"><div class="mo-card"><h2>Best sellers</h2>' + (s.bySold.length ? '<table class="mo-table"><tbody>' + s.bySold.map(function(x){ var p = window.DBA.bundle(x[0]) || window.DBA.course(x[0]) || {}; return '<tr><td>' + esc(p.name || p.title || x[0]) + '</td><td style="text-align:right"><b>' + x[1] + '</b></td></tr>'; }).join('') + '</tbody></table>' : '<p style="color:var(--slate-2);margin:0">No sales yet.</p>') + '</div>';
    h += '<div class="mo-card"><h2>Recent orders</h2>' + (s.recent.length ? '<table class="mo-table"><tbody>' + s.recent.map(function(x){ return '<tr><td>' + esc(x[0]) + '<br><small style="color:var(--slate-3)">' + esc(x[1]) + '</small></td><td style="text-align:right">' + money(x[2]) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p style="color:var(--slate-2);margin:0">No orders yet.</p>') + '</div></div>';
    b.innerHTML = h;
  });
}
function adUsers(){
  var b = q$('#adBody');
  b.innerHTML = '<div class="ad-row" style="margin-bottom:12px"><input class="mo-in" id="adQ" placeholder="Search name or email" style="max-width:320px"/><button class="mo-btn ghost sm" id="adGo" type="button">Search</button></div><div id="adList"></div><div id="adDetail"></div>';
  var load = function(){ api('admin_users', { q: q$('#adQ').value }).then(function(r){
    var l = q$('#adList'); if (!r.ok){ l.innerHTML = adErr(r); return; }
    l.innerHTML = '<div class="mo-card mo-scroll"><table class="mo-table"><thead><tr><th>Learner</th><th>Verified</th><th>Courses</th><th>Joined</th><th></th></tr></thead><tbody>' + (r.data.users.length ? r.data.users.map(function(u){ return '<tr><td><b>' + esc(u.name) + '</b><br><small style="color:var(--slate-3)">' + esc(u.email) + '</small></td><td>' + (u.verified ? '<span class="mo-pill ok">Yes</span>' : '<span class="mo-pill warn">No</span>') + (u.suspended ? ' <span class="mo-pill stop">Suspended</span>' : '') + '</td><td>' + u.courses + '</td><td>' + esc(date(u.createdAt)) + '</td><td><button class="mo-btn ghost sm" data-u="' + esc(u.email) + '">Manage</button></td></tr>'; }).join('') : '<tr><td colspan="5" style="color:var(--slate-2)">No learners found.</td></tr>') + '</tbody></table></div>';
    qa('[data-u]', l).forEach(function(x){ x.addEventListener('click', function(){ adUser(x.getAttribute('data-u')); }); });
  }); };
  q$('#adGo').addEventListener('click', load); q$('#adQ').addEventListener('keydown', function(e){ if (e.key === 'Enter') load(); }); load();
}
function adUser(email){
  api('admin_user', { email: email }).then(function(r){
    var d = q$('#adDetail'); if (!r.ok){ d.innerHTML = adErr(r); return; }
    var u = r.data.user, opts = window.DBA.BUNDLES.map(function(x){ return '<option value="' + x.id + '">' + esc(x.name) + '</option>'; }).join('') + window.DBA.COURSES.map(function(x){ return '<option value="' + x.id + '">' + esc(x.title) + '</option>'; }).join('');
    d.innerHTML = '<div class="mo-card"><h2>' + esc(u.name) + ' <small style="color:var(--slate-3);font-weight:500">' + esc(u.email) + '</small></h2><div class="ad-row" style="margin-bottom:12px">' + (u.suspended ? '<button class="mo-btn sm" id="adUn">Reinstate</button>' : '<button class="mo-btn ghost sm" id="adSus">Suspend &amp; sign out</button>') + '</div>' +
      '<h4 style="margin:6px 0">Grant access</h4><div class="ad-row"><select class="mo-in" id="adItem" style="max-width:300px">' + opts + '</select><input class="mo-in" id="adNote" placeholder="Note (optional)" style="max-width:240px"/><button class="mo-btn red sm" id="adGrant">Grant</button></div><div id="adMsg" style="margin-top:8px"></div>' +
      '<h4 style="margin:16px 0 6px">Orders</h4>' + (r.data.orders.length ? '<table class="mo-table"><tbody>' + r.data.orders.map(function(o){ return '<tr><td>' + esc(date(o.date)) + '</td><td>' + esc(o.ref || o.id) + ' <small style="color:var(--slate-3)">' + esc(o.source) + '</small></td><td>' + esc(o.items.join(', ')) + '</td><td>' + money(o.amount || 0) + '</td><td>' + (o.status === 'refunded' ? '<span class="mo-pill stop">Revoked</span>' : '<button class="mo-btn ghost sm" data-rev="' + esc(o.id) + '">Revoke</button>') + '</td></tr>'; }).join('') + '</tbody></table>' : '<p style="color:var(--slate-2);margin:0">No orders.</p>') + '</div>';
    var msg = function(t, ok){ q$('#adMsg').innerHTML = '<div class="mo-msg ' + (ok ? 'ok' : 'err') + '">' + esc(t) + '</div>'; };
    q$('#adGrant').addEventListener('click', function(){ api('admin_grant', { email: email, items: [q$('#adItem').value], note: q$('#adNote').value }).then(function(x){ if (x.ok) { toast('Access granted'); adUser(email); } else msg((x.data && x.data.error) || 'Failed', false); }); });
    qa('[data-rev]', d).forEach(function(b){ b.addEventListener('click', function(){ if (!confirm('Revoke the access this order granted?')) return; api('admin_revoke', { email: email, order: b.getAttribute('data-rev') }).then(function(x){ if (x.ok) { toast('Revoked'); adUser(email); } else msg((x.data && x.data.error) || 'Failed', false); }); }); });
    var s1 = q$('#adSus'), s2 = q$('#adUn');
    if (s1) s1.addEventListener('click', function(){ if (confirm('Suspend this learner and sign them out everywhere?')) api('admin_suspend', { email: email, on: true }).then(function(x){ if (x.ok) { toast('Suspended'); adUser(email); } else msg((x.data && x.data.error) || 'Failed', false); }); });
    if (s2) s2.addEventListener('click', function(){ api('admin_suspend', { email: email, on: false }).then(function(x){ if (x.ok) { toast('Reinstated'); adUser(email); } }); });
    d.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
function adSubs(){
  var b = q$('#adBody');
  api('admin_submissions', { status: 'submitted' }).then(function(r){
    if (!r.ok){ b.innerHTML = adErr(r); return; }
    if (!r.data.submissions.length){ b.innerHTML = '<div class="mo-empty"><b>Nothing waiting for review</b><p style="margin:0;color:var(--slate-2)">New lab submissions appear here.</p></div>'; return; }
    b.innerHTML = r.data.submissions.map(function(s){ return '<div class="ad-rev"><div class="ad-row" style="justify-content:space-between"><div><b>' + esc(s.title) + '</b> · ' + esc(s.name) + ' <small style="color:var(--slate-3)">' + esc(s.email) + ' · attempt ' + (s.attempt || 1) + ' · ' + esc(date(s.at)) + '</small></div></div><pre>' + esc(s.text) + '</pre>' + (s.link ? '<p style="margin:0 0 10px"><a href="' + esc(s.link) + '" target="_blank" rel="noopener noreferrer">' + esc(s.link) + '</a></p>' : '') + '<textarea class="mo-in" data-fb="' + esc(s.id) + '" placeholder="Feedback (required to request changes)" style="min-height:70px"></textarea><div class="ad-row" style="margin-top:8px"><button class="mo-btn red sm" data-ap="' + esc(s.id) + '">Approve &amp; assess</button><button class="mo-btn ghost sm" data-ch="' + esc(s.id) + '">Request changes</button></div><div data-m="' + esc(s.id) + '"></div></div>'; }).join('');
    var act = function(id, decision){ var fb = q$('[data-fb="' + id + '"]').value; api('admin_review', { id: id, decision: decision, feedback: fb }).then(function(x){ if (x.ok){ toast(decision === 'approve' ? 'Approved — credential is now assessed' : 'Changes requested'); adSubs(); } else q$('[data-m="' + id + '"]').innerHTML = '<div class="mo-msg err" style="margin-top:8px">' + esc((x.data && x.data.error) || 'Failed') + '</div>'; }); };
    qa('[data-ap]', b).forEach(function(x){ x.addEventListener('click', function(){ act(x.getAttribute('data-ap'), 'approve'); }); });
    qa('[data-ch]', b).forEach(function(x){ x.addEventListener('click', function(){ act(x.getAttribute('data-ch'), 'changes'); }); });
  });
}
function adOrders(){
  api('admin_orders').then(function(r){
    var b = q$('#adBody'); if (!r.ok){ b.innerHTML = adErr(r); return; }
    b.innerHTML = '<div class="mo-card mo-scroll"><table class="mo-table"><thead><tr><th>Date</th><th>Learner</th><th>Items</th><th>Amount</th><th>Source</th><th>Status</th></tr></thead><tbody>' + (r.data.orders.length ? r.data.orders.map(function(o){ return '<tr><td>' + esc(date(o.date)) + '</td><td>' + esc(o.email) + '</td><td>' + esc(o.items.join(', ')) + '</td><td>' + money(o.amount || 0) + '</td><td>' + esc(o.source) + '</td><td>' + (o.status === 'refunded' ? '<span class="mo-pill stop">Refunded / revoked</span>' : '<span class="mo-pill ok">Active</span>') + '</td></tr>'; }).join('') : '<tr><td colspan="6" style="color:var(--slate-2)">No orders yet.</td></tr>') + '</tbody></table></div>';
  });
}
function adCreds(){
  api('admin_credentials').then(function(r){
    var b = q$('#adBody'); if (!r.ok){ b.innerHTML = adErr(r); return; }
    b.innerHTML = '<div class="mo-card mo-scroll"><table class="mo-table"><thead><tr><th>ID</th><th>Learner</th><th>Course</th><th>Type</th><th></th></tr></thead><tbody>' + (r.data.credentials.length ? r.data.credentials.map(function(c){ return '<tr><td><a href="/certificate?id=' + encodeURIComponent(c.id) + '">' + esc(c.id) + '</a></td><td>' + esc(c.name) + '<br><small style="color:var(--slate-3)">' + esc(c.email) + '</small></td><td>' + esc(c.title) + '</td><td>' + credKind(c) + '</td><td><button class="mo-btn ghost sm" data-rv="' + esc(c.id) + '" data-on="' + (c.revoked ? '0' : '1') + '">' + (c.revoked ? 'Restore' : 'Revoke') + '</button></td></tr>'; }).join('') : '<tr><td colspan="5" style="color:var(--slate-2)">No credentials issued yet.</td></tr>') + '</tbody></table></div>';
    qa('[data-rv]', b).forEach(function(x){ x.addEventListener('click', function(){ api('admin_credential_revoke', { id: x.getAttribute('data-rv'), on: x.getAttribute('data-on') === '1' }).then(function(){ adCreds(); }); }); });
  });
}
routes['/admin'] = admin;

/* ------------------------------------------------------------------ documents */
function docPage(inner, size, locked){
  pageStyle(size || 'A4 portrait'); lockApp(locked === undefined ? !!(STATE.me && STATE.me.user) : locked);
  root().innerHTML = '<div class="ac"><div class="dc-page">' + inner + '</div></div>';
}
function docTools(extra){
  return '<div class="dc-tools"><a class="mo-btn ghost sm" href="/dashboard#billing">← Back to billing</a>' + (extra || '') + '<button class="mo-btn sm" id="dcPrint" type="button">Print / save as PDF</button></div>';
}
function bindPrint(){ var p = q$('#dcPrint'); if (p) p.addEventListener('click', function(){ window.print(); }); }
function loadDoc(me, cb){
  if (!needUser(me)) return;
  STATE.me = me;
  var o = P().get('o') || '';
  api('document', { order: o }).then(function(r){
    if (!r.ok) return docPage('<div class="vf bad"><h2>Document not available</h2><p style="color:var(--slate-2)">' + esc((r.data && r.data.error) || 'We could not load this order.') + '</p><a class="mo-btn" href="/dashboard#billing">Back to billing</a></div>');
    cb(r.data);
  });
}
function invoiceNo(d){ return 'INV-' + String(d.order.ref || d.order.id).replace(/^cs_(live|test)_/, '').slice(-10).toUpperCase(); }
function statusLabel(d){ return d.order.status === 'refunded' ? 'REFUNDED' : d.order.demo ? 'DEMO' : d.order.amount === 0 ? 'COMPLIMENTARY' : 'PAID'; }
function payMethod(d){ var s = d.order.source; return s === 'stripe' ? 'Card (Stripe)' : s === 'coupon' ? 'Promotion ' + esc(d.order.coupon || '') : s === 'admin' ? 'Granted by DigitalBurj' : s === 'demo' ? 'Demo sandbox' : esc(s); }
function invoice(me){
  loadDoc(me, function(d){
    var adj = Math.max(0, d.listTotal - d.order.amount), st = statusLabel(d);
    docPage(docTools() + '<article class="iv" id="invoice"><div class="iv-stamp' + (st === 'REFUNDED' ? ' ref' : '') + '">' + st + '</div><header class="iv-head"><div><img src="brand/wordmark.webp" alt="DigitalBurj"/><small style="text-align:left;margin-top:8px">DigitalBurj Academy<br>digitalburj.com · support@digitalburj.com</small></div><div><h1>Invoice</h1><small>' + esc(invoiceNo(d)) + '</small></div></header>' +
      '<div class="iv-meta"><div><small>Billed to</small><b>' + esc(d.customer.name || d.customer.email) + '</b><span>' + esc(d.customer.email) + '</span>' + (d.customer.country ? '<span>' + esc(d.customer.country) + '</span>' : '') + '</div><div><small>Issued</small><b>' + esc(date(d.order.date)) + '</b><span>Order ' + esc(d.order.ref) + '</span></div><div><small>Payment</small><b>' + payMethod(d) + '</b><span>Currency ' + esc(d.order.currency) + '</span></div></div>' +
      '<table><thead><tr><th>Description</th><th>Code</th><th>Amount</th></tr></thead><tbody>' + d.lines.map(function(l){ return '<tr><td>DigitalBurj Academy — ' + esc(l.title) + '<br><small style="color:var(--slate-3)">One-time purchase · lifetime access</small></td><td>' + esc(l.id) + '</td><td>' + money(l.price) + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<div class="iv-tot"><div><span>Subtotal</span><span>' + money(d.listTotal) + '</span></div>' + (adj ? '<div><span>Discounts &amp; credits</span><span>−' + money(adj) + '</span></div>' : '') + '<div class="grand"><span>Total</span><span>' + money(d.order.amount) + '</span></div></div>' +
      '<div class="iv-foot">Prices are in ' + esc(d.order.currency) + '. Card payments are processed by Stripe; any taxes applicable to your purchase are shown at checkout. Refunds: within 14 days provided no assessment has been submitted. Participation does not by itself provide employment, a visa, a licence, accreditation or a guaranteed outcome. Questions? support@digitalburj.com.</div></article>');
    bindPrint();
  });
}
routes['/invoice'] = invoice;

function barcode(seed){
  var h = 2166136261, bars = '', x = 0; for (var i = 0; i < seed.length; i++){ h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  for (var k = 0; k < 46; k++){ h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0; var w = 1 + (h % 3); if (k % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + w + '" height="44" fill="#1c1f1d"/>'; x += w + 1; }
  return '<svg class="rc-barcode" viewBox="0 0 ' + x + ' 44" preserveAspectRatio="none" aria-hidden="true">' + bars + '</svg>';
}
function receipt(me){
  loadDoc(me, function(d){
    var st = statusLabel(d), rows = d.lines.map(function(l){ return '<div class="r"><span>' + esc(l.title) + '</span><span>' + money(l.price) + '</span></div>'; }).join(''), adj = Math.max(0, d.listTotal - d.order.amount);
    docPage(docTools('<button class="mo-btn ghost sm" id="rcReplay" type="button">▶ Replay print</button>') +
      '<div class="rc-stage"><div class="rc-printer" aria-hidden="true"><span class="lbl">DigitalBurj · 3D-Print</span></div>' +
      '<div class="rc-paper-wrap print" id="rcWrap"><div class="rc-nozzle" aria-hidden="true"></div><div class="rc-stamp' + (st === 'REFUNDED' ? ' ref' : '') + '">' + st + '</div><div class="rc-clip"><div class="rc-depth" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '<div class="rc-paper"><div class="rc-layer">' +
      '<h2>DigitalBurj</h2><div class="c">ACADEMY · RECEIPT</div><div class="c">digitalburj.com</div><hr/>' +
      '<div class="r"><span>RECEIPT</span><span>' + esc(invoiceNo(d).replace('INV', 'RCT')) + '</span></div><div class="r"><span>DATE</span><span>' + esc(date(d.order.date)) + '</span></div><div class="r"><span>ORDER</span><span>' + esc(String(d.order.ref).slice(-14)) + '</span></div><div class="r"><span>NAME</span><span>' + esc((d.customer.name || d.customer.email).slice(0, 22)) + '</span></div><hr/>' +
      rows + (adj ? '<div class="r"><span>DISCOUNTS/CREDITS</span><span>-' + money(adj) + '</span></div>' : '') + '<hr/>' +
      '<div class="r tot"><span>TOTAL</span><span>' + money(d.order.amount) + '</span></div><div class="r"><span>PAID BY</span><span>' + payMethod(d).replace(/&[a-z]+;/g, '') + '</span></div><div class="r"><span>STATUS</span><span>' + st + '</span></div><hr/>' +
      '<div class="c">One-time purchase · lifetime access</div><div class="c">Refunds within 14 days*</div>' + barcode(String(d.order.id)) + '<div class="c" style="margin-top:6px;font-size:10.5px">' + esc(String(d.order.id).slice(-18).toUpperCase()) + '</div><hr/><div class="c">THANK YOU — KEEP LEARNING</div><div class="c" style="font-size:10.5px">*if no assessment submitted</div>' +
      '</div></div></div></div></div>');
    bindPrint();
    var wrap = q$('#rcWrap'), tilt = q$('.rc-stage');
    q$('#rcReplay').addEventListener('click', function(){ wrap.classList.remove('print'); void wrap.offsetWidth; wrap.classList.add('print'); });
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      tilt.addEventListener('mousemove', function(e){ var b = tilt.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5; wrap.style.animation = 'none'; wrap.style.transform = 'rotateY(' + (x * 22) + 'deg) rotateX(' + (-y * 12) + 'deg)'; });
      tilt.addEventListener('mouseleave', function(){ wrap.style.animation = ''; wrap.style.transform = ''; });
    }
  });
}
routes['/receipt'] = receipt;

/* certificate */
function seal(){
  var rays = ''; for (var i = 0; i < 24; i++) rays += '<path d="M100 8 L104 30 L96 30 Z" transform="rotate(' + (i * 15) + ' 100 100)" fill="#c9260e"/>';
  return '<svg class="ct-seal" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sealTop" d="M100 100 m-64 0 a64 64 0 1 1 128 0"/><path id="sealBot" d="M100 100 m-72 0 a72 72 0 0 0 144 0"/><radialGradient id="sg" cx="35%" cy="30%"><stop offset="0" stop-color="#ff7a45"/><stop offset="1" stop-color="#c9260e"/></radialGradient></defs>' + rays + '<circle cx="100" cy="100" r="82" fill="url(#sg)"/><circle cx="100" cy="100" r="74" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 4" opacity=".8"/><circle cx="100" cy="100" r="50" fill="#0f1714"/><path d="M100 68l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z" fill="#ff7a45"/><text font-family="Arial,sans-serif" font-size="12.5" font-weight="800" letter-spacing="3" fill="#fff"><textPath href="#sealTop" startOffset="50%" text-anchor="middle">DIGITALBURJ ACADEMY</textPath></text><text font-family="Arial,sans-serif" font-size="11" font-weight="800" letter-spacing="3" fill="#fff"><textPath href="#sealBot" startOffset="50%" text-anchor="middle">★ OFFICIAL RECORD ★</textPath></text></svg>';
}
function corner(cls){ return '<svg class="ct-corner ' + cls + '" viewBox="0 0 90 90" fill="none" stroke="#0f1714" stroke-width="1.4" aria-hidden="true"><path d="M2 88V20Q2 2 20 2h68"/><path d="M10 88V26Q10 10 26 10h62" stroke="#f23a1d"/><circle cx="20" cy="20" r="5" fill="#f23a1d" stroke="none"/><path d="M30 30q10 0 10-10M42 42q14 0 14-14" stroke-width="1"/></svg>'; }
function certificate(me){
  STATE.me = me;
  var id = (P().get('id') || '').trim();
  api('credential', { id: id }).then(function(r){
    if (!r.ok) return docPage('<div class="vf bad"><h2>Certificate not found</h2><p style="color:var(--slate-2)">' + esc((r.data && r.data.error) || 'Check the credential ID and try again.') + '</p><a class="mo-btn" href="/credential">Verify a credential</a></div>');
    var c = r.data.credential, assessed = c.kind === 'assessed', url = window.DBA.appUrl('/credential?id=' + encodeURIComponent(c.id));
    var li = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + encodeURIComponent(c.title + ' — DigitalBurj Academy') + '&organizationName=' + encodeURIComponent('DigitalBurj Academy') + '&issueYear=' + new Date(c.issued).getFullYear() + '&issueMonth=' + (new Date(c.issued).getMonth() + 1) + '&certUrl=' + encodeURIComponent(url) + '&certId=' + encodeURIComponent(c.id);
    docPage('<div class="ct-wrap"><div class="dc-tools"><a class="mo-btn ghost sm" href="/dashboard#credentials">← Credentials</a><button class="mo-btn ghost sm" id="ctCopy" type="button">Copy verify link</button><a class="mo-btn ghost sm" href="' + li + '" target="_blank" rel="noopener">Add to LinkedIn</a><button class="mo-btn sm" id="dcPrint" type="button">Print / save as PDF</button></div>' +
      '<div class="ct" id="cert"><div class="ct-bg"></div>' + corner('tl') + corner('tr') + corner('bl') + corner('br') +
      (c.revoked ? '<div class="ct-wm rev">REVOKED</div>' : c.demo ? '<div class="ct-wm">DEMO<br>NOT A CREDENTIAL</div>' : '') +
      '<div class="ct-in"><div class="ct-brand"><img src="brand/mark-academy.webp" alt=""/>DigitalBurj Academy</div><div class="ct-kicker">' + (assessed ? 'Assessed capability certificate' : 'Certificate of completion') + '</div><h1>' + (assessed ? 'Certificate of Achievement' : 'Certificate of Completion') + '</h1><div class="ct-sub">This certifies that</div><div class="ct-name">' + esc(c.name) + '</div>' +
      '<div class="ct-line">' + (c.demo ? 'has explored the DigitalBurj Academy demo sandbox, including the course' : assessed ? 'has completed all checkpoints and had their lab evidence assessed by a human reviewer against the published rubric for' : 'has passed every checkpoint and submitted lab evidence for') + '</div><div class="ct-course">' + esc(c.title) + '</div><div class="ct-line">' + esc(c.hours) + ' learning hours · ' + esc(c.course) + '</div>' +
      '<div class="ct-foot"><div class="col"><b>' + esc(date(assessed && c.assessedAt ? c.assessedAt : c.issued)) + '</b>Date ' + (assessed ? 'assessed' : 'issued') + '<br>ID ' + esc(c.id) + '</div>' + seal() + '<div class="col r"><span class="ct-sig">DigitalBurj</span><br><b>Academy Registrar</b>Verify at academy.digitalburj.com/credential</div></div></div></div>' +
      '<p class="ct-note">' + (assessed ? 'Assessed against the published rubric by a human reviewer. ' : 'A completion record: it confirms the learner passed the checkpoints and submitted evidence; it is not an independent verification. ') + 'This certificate does not by itself provide employment, a visa, a licence, accreditation or a guaranteed outcome. Anyone can confirm its status at the verify link.</p></div>', 'A4 landscape');
    bindPrint(); q$('#ctCopy').addEventListener('click', function(){ (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function(){ toast('Verification link copied'); }, function(){ window.prompt('Copy this link', url); }); });
  });
}
routes['/certificate'] = certificate;

/* public verification */
function credential(me){
  STATE.me = me;
  var id = (P().get('id') || '').trim();
  if (!id){
    docPage('<div class="vf"><h2 style="font-family:var(--head);margin:0 0 8px">Verify a credential</h2><p style="color:var(--slate-2);margin:0 0 16px">Enter the credential ID printed on the certificate.</p><form id="vfForm" class="mo-form" style="margin:0 auto"><input class="mo-in" id="vfId" placeholder="DBA-DB-00-…" autocomplete="off"/><button class="mo-btn red" type="submit">Verify</button></form></div>');
    q$('#vfForm').addEventListener('submit', function(e){ e.preventDefault(); var v = q$('#vfId').value.trim(); if (v) location.href = '/credential?id=' + encodeURIComponent(v); }); return;
  }
  api('credential', { id: id }).then(function(r){
    if (!r.ok) return docPage('<div class="vf bad"><div class="badge">✕</div><h2 style="font-family:var(--head);margin:0 0 6px">Not found</h2><p style="color:var(--slate-2);margin:0 0 16px">' + esc((r.data && r.data.error) || 'No credential with that ID.') + '</p><a class="mo-btn" href="/credential">Try another ID</a></div>');
    var c = r.data.credential, bad = c.revoked;
    docPage('<div class="vf' + (bad ? ' bad' : '') + '"><div class="badge">' + (bad ? '✕' : '✓') + '</div><h2 style="font-family:var(--head);margin:0">' + (bad ? 'Credential revoked' : 'Credential is valid') + '</h2><p style="color:var(--slate-2);margin:6px 0 0">' + (c.demo ? 'Demo sandbox record — not a real credential.' : bad ? 'This credential is no longer valid.' : 'Issued by DigitalBurj Academy.') + '</p><dl><dt>Name</dt><dd>' + esc(c.name) + '</dd><dt>Course</dt><dd>' + esc(c.title) + ' (' + esc(c.course) + ')</dd><dt>Type</dt><dd>' + (c.demo ? 'Demo sandbox record (auto-reviewed)' : c.kind === 'assessed' ? 'Assessed by a human reviewer' : 'Completion record (checkpoints passed, evidence submitted)') + '</dd><dt>Issued</dt><dd>' + esc(date(c.issued)) + '</dd><dt>ID</dt><dd>' + esc(c.id) + '</dd></dl><a class="mo-btn ghost" href="/certificate?id=' + encodeURIComponent(c.id) + '">View certificate</a></div>');
  });
}
routes['/credential'] = credential;

window.DBAMore = { routes: routes, dashboard: dashboard };
})();
