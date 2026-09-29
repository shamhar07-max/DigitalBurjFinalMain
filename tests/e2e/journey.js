// End-to-end journey against the REAL worker bundle (see README): landing → gateway → sign-up (show password, meter) →
// verify → purchase webhook → course player (server-graded checkpoints) → lab → certificate → admin review →
// public verification → invoice → animated receipt → demo sandbox → header/footer links back to the main site.
const { chromium } = require('playwright-core');
const ANS = require('../../api/_academy_answers.js');
const LAND = 'http://localhost:8123', APP = 'http://academy.localhost:8123', SHOTS = process.env.SHOTS || '/tmp/shots';
require('fs').mkdirSync(SHOTS, { recursive: true });
const j = async (u, o) => (await fetch(u, o)).json();
const PAGES = []; const errs = []; let fails = 0; const say = (...a) => console.log(...a);
const chk = (label, cond, extra) => { if (!cond) fails++; say((cond ? '  ok  ' : '  FAIL') + ' ' + label + (extra !== undefined ? ' → ' + extra : '')); };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--host-resolver-rules=MAP academy.localhost 127.0.0.1'] });
  const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); const p = await ctx.newPage();
  const watch = (pg, tag) => { PAGES.push(pg); pg.on('pageerror', e => errs.push(tag + ' PAGEERR ' + e.message + ' @ ' + String(e.stack).split('\n').slice(1,3).join(' | '))); pg.on('console', m => { if (m.type() === 'error' && !/ERR_CERT|ERR_NAME|Failed to load resource|sibling fetch/.test(m.text())) errs.push(tag + ' CONSOLE ' + m.text().slice(0, 160)); }); };
  watch(p, 'P');
  await ctx.route('https://checkout.stripe.test/**', r => r.fulfill({ status: 200, contentType: 'text/html', body: '<h1>stripe stub</h1>' }));
  const link = async (to, subj) => { const m = (await j(LAND + '/__mails')).filter(x => x.to && x.to[0] === to && x.subject && x.subject.includes(subj)).pop(); return /href="([^"]*token=[^"]*)"/.exec(m.html)[1].replace(/&amp;/g, '&'); };
  const shot = (pg, n) => pg.screenshot({ path: `${SHOTS}/${n}.png` });

  say('1 landing → Get started');
  await p.goto(LAND + '/academy', { waitUntil: 'networkidle' }); await p.waitForSelector('.bundle-card');
  chk('all 7 bundles purchasable (no waitlist buttons)', (await p.locator('.bundle-card').count()) === 7 && (await p.locator('[data-waitlist]').count()) === 0);
  chk('hero "Get started" → academy /start', (await p.getAttribute('#heroStart', 'href')) === APP + '/start', await p.getAttribute('#heroStart', 'href'));
  chk('no "Setup required"/"Planning" placeholders', !/Setup required|Planning|Opens soon/.test(await p.textContent('body')));

  say('2 gateway');
  await Promise.all([p.waitForURL(APP + '/start'), p.click('#heroStart')]); await p.waitForSelector('.au-choice');
  chk('gateway offers Register, Sign in, Demo', (await p.locator('.au-choice').count()) === 3);
  await shot(p, '01-gateway');
  chk('header links point to the main site', (await p.evaluate(() => Array.from(document.querySelectorAll('header a[href]')).filter(a => /pricing|industries|company/.test(a.getAttribute('href'))).every(a => a.href.startsWith('http://localhost:8123/')))));
  chk('footer links point to the main site', (await p.evaluate(() => { const f = Array.from(document.querySelectorAll('footer a[href]')).filter(a => !/^(mailto|tel|http)/.test(a.getAttribute('href')) || a.href.startsWith('http://localhost:8123/')); return f.length > 3 && f.every(a => a.href.startsWith('http://localhost:8123/') || a.href.startsWith('http://academy.localhost:8123/') ); })));
  const red = await new Promise(res => require('http').get({ host: '127.0.0.1', port: 8123, path: '/pricing', headers: { host: 'academy.localhost:8123' } }, r => { r.resume(); res({ status: r.statusCode, loc: r.headers.location }); }));
  chk('academy host /pricing redirects to the main site', red.status === 302 && red.loc === LAND + '/pricing', red.loc);

  say('3 sign-up form');
  await p.click('.au-choice.primary'); await p.waitForSelector('#au-name');
  await p.fill('#au-pw', 'Quartz-Lantern-91!');
  chk('show-password toggle', (await p.getAttribute('#au-pw', 'type')) === 'password' && (await (async () => { await p.click('.pw-toggle'); return p.getAttribute('#au-pw', 'type'); })()) === 'text' && (await p.getAttribute('.pw-toggle', 'aria-pressed')) === 'true');
  chk('strength meter reacts', (await p.locator('.pw-meter i.s4, .pw-meter i.s3').count()) >= 3, await p.textContent('#pw-meter-l'));
  await shot(p, '02-signup');
  await p.fill('#au-name', 'Ann Lee'); await p.fill('#au-email', 'ann@example.com'); await p.check('#au-consent'); await p.click('#au-submit');
  await p.waitForSelector('.mo-main'); chk('sign-up lands on the dashboard with a verify banner', await p.isVisible('#bnResend'));
  await p.goto(await link('ann@example.com', 'Verify')); await p.waitForSelector('h1:has-text("Email verified")');

  say('4 purchase (signed webhook) → dashboard');
  chk('webhook accepted', (await fetch(LAND + '/__pay', { method: 'POST', body: JSON.stringify({ id: 'cs_test_1', email: 'ann@example.com', items: 'b-starter', amount: 3 }) })).status === 200);
  await p.goto(APP + '/dashboard', { waitUntil: 'networkidle' }); await p.waitForSelector('.mo-course');
  chk('owned course card', (await p.locator('.mo-course h3').first().textContent()).includes('Digital Foundations'));
  await shot(p, '03-dashboard');

  say('5 course player — server-graded checkpoints');
  await p.click('text=Start course'); await p.waitForSelector('.lp-opt');
  chk('lab locked before checkpoints', await p.locator('.lp-nav button[data-u=lab]').isDisabled());
  for (let u = 0; u < ANS['DB-00'].length; u++) {
    const key = ANS['DB-00'][u];
    const pick = async (k, i) => p.locator('fieldset.lp-qs').nth(i).locator('.lp-opt').nth(k).click();
    const wrong = (key[0] + 1) % 3; await pick(wrong, 0); for (let i = 1; i < key.length; i++) await pick(key[i], i);
    await p.click('#qcheck'); await p.waitForSelector('.mo-msg.err');
    if (u === 0) { chk('wrong answer rejected by the server', /not quite right/.test(await p.textContent('#qres'))); await shot(p, '04-learn'); }
    await pick(key[0], 0); await p.click('#qcheck'); await p.waitForSelector('.mo-msg.ok'); await p.click('#qnext');
  }
  await p.waitForSelector('#labForm'); chk('lab unlocked after all checkpoints', !(await p.locator('.lp-nav button[data-u=lab]').isDisabled()));
  await p.fill('#lb-t', 'too short'); await p.click('#lb-b'); chk('short evidence rejected', /80 characters/.test(await p.textContent('#lb-r')));
  await p.fill('#lb-t', 'Cleaned the stationery inventory into five columns (item, unit, quantity, location, supplier), renamed the file 2026-03-14_stock_v1 and shared it view-only with two named colleagues.');
  await p.click('#lb-b'); await p.waitForSelector('.mo-msg.info:has-text("waiting for a reviewer")'); await shot(p, '05-lab-submitted');

  say('6 certificate (completion record)');
  await p.click('text=view certificate'); await p.waitForSelector('.ct-name');
  chk('certificate shows the learner and course', (await p.textContent('.ct-name')).trim() === 'Ann Lee' && (await p.textContent('.ct-course')).includes('Digital Foundations'));
  chk('completion wording (not "assessed")', /Certificate of Completion/.test(await p.textContent('.ct h1')));
  await p.waitForTimeout(1500); await shot(p, '06-certificate');
  const credId = new URL(p.url()).searchParams.get('id');

  say('7 admin reviews the evidence');
  const pa = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage(); watch(pa, 'A');
  await pa.goto(APP + '/signup', { waitUntil: 'networkidle' }); await pa.fill('#au-name', 'Boss Person'); await pa.fill('#au-email', 'boss@example.com'); await pa.fill('#au-pw', 'Violet-Harbor-42'); await pa.check('#au-consent'); await pa.click('#au-submit'); await pa.waitForSelector('.mo-main');
  await pa.goto(await link('boss@example.com', 'Verify')); await pa.waitForSelector('h1:has-text("Email verified")');
  await pa.goto(APP + '/admin', { waitUntil: 'networkidle' }); await pa.waitForSelector('.ad-tabs');
  chk('admin overview counts the learner and revenue', /Learners/.test(await pa.textContent('.mo-tiles')) && /\$3/.test(await pa.textContent('.mo-tiles')));
  await shot(pa, '07-admin');
  await pa.click('[data-tab=submissions]'); await pa.waitForSelector('[data-ap]'); await pa.fill('[data-fb]', 'Well organised — approved.'); await pa.click('[data-ap]'); await pa.waitForSelector('.mo-empty');
  chk('review queue emptied after approval', true);
  await p.goto(APP + '/dashboard#credentials'); await p.reload({ waitUntil: 'networkidle' }); await p.waitForSelector('.mo-pill.ok:has-text("Assessed")'); chk('learner sees the credential as Assessed', true);

  say('8 public verification');
  const pv = await (await b.newContext()).newPage(); watch(pv, 'V');
  await pv.goto(APP + '/credential?id=' + credId, { waitUntil: 'networkidle' }); await pv.waitForSelector('.vf');
  chk('anyone can verify', /Credential is valid/.test(await pv.textContent('.vf')) && /Assessed by a human reviewer/.test(await pv.textContent('.vf')));

  say('9 invoice + 3D-printed receipt');
  await p.goto(APP + '/invoice?o=cs_test_1', { waitUntil: 'networkidle' }); await p.waitForSelector('.iv');
  chk('invoice total and status', /\$3/.test(await p.textContent('.iv-tot .grand')) && (await p.textContent('.iv-stamp')).trim() === 'PAID');
  await shot(p, '08-invoice');
  await p.goto(APP + '/receipt?o=cs_test_1', { waitUntil: 'domcontentloaded' }); await p.waitForSelector('.rc-paper');
  await p.waitForTimeout(1600); await shot(p, '09-receipt-printing');
  chk('receipt animates layer by layer', (await p.evaluate(() => getComputedStyle(document.querySelector('.rc-clip')).animationName)) === 'rcbuild');
  await p.waitForTimeout(4200); await shot(p, '10-receipt-done');
  chk('PAID stamp lands', (await p.evaluate(() => +getComputedStyle(document.querySelector('.rc-stamp')).opacity)) > 0.5);
  await p.mouse.move(700, 400); await p.waitForTimeout(300); await shot(p, '11-receipt-tilt');
  const other = await (await b.newContext()).newPage(); await other.goto(APP + '/invoice?o=cs_test_1', { waitUntil: 'networkidle' });
  chk('signed-out visitors cannot open an invoice', /\/signin/.test(other.url()));

  say('10 demo sandbox');
  const pd = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage(); watch(pd, 'D');
  await pd.goto(APP + '/start', { waitUntil: 'networkidle' }); await pd.click('#au-demo'); await pd.waitForSelector('.mo-banner.demo');
  chk('demo dashboard has all 14 courses unlocked', (await pd.locator('.mo-course:not(.locked)').count()) === 14);
  await pd.goto(APP + '/admin', { waitUntil: 'networkidle' }); await pd.waitForSelector('.mo-tile'); chk('demo admin preview is read-only sample data', /read-only/.test(await pd.textContent('h1')));
  await pd.evaluate(async (ans) => { for (let u = 0; u < ans.length; u++) await fetch('/api/academy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'checkpoint', course: 'PC-AC01', unit: u, answers: ans[u] }) }); }, ANS['PC-AC01']);
  await pd.goto(APP + '/learn?c=PC-AC01&u=lab', { waitUntil: 'networkidle' }); await pd.waitForSelector('#labForm');
  await pd.fill('#lb-t', 'Reconciled the bank statement to the ledger: outstanding cheque 221 of 900 and a 150 bank fee, leaving both at 12,250. Journal: debit bank charges 150, credit bank 150.');
  await pd.click('#lb-b'); await pd.waitForSelector('.mo-msg.ok:has-text("Approved")'); await pd.click('text=View your certificate');
  await pd.waitForSelector('.ct-wm'); chk('demo certificate carries the DEMO watermark', /DEMO/.test(await pd.textContent('.ct-wm'))); await pd.waitForTimeout(1300); await shot(pd, '12-demo-certificate');

  say('11 locked dashboard: no site header/footer/widgets after sign-in');
  await pd.goto(APP + '/dashboard', { waitUntil: 'networkidle' }); await pd.waitForSelector('.mo-main');
  const vis = await pd.evaluate(() => ['header', 'footer', '[class*=chat]', '[id*=chat]'].map(sel => Array.from(document.querySelectorAll(sel)).some(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; })));
  chk('header hidden', !vis[0]); chk('footer hidden', !vis[1]); chk('chat widget hidden', !vis[2] && !vis[3]);
  chk('locked class set', await pd.evaluate(() => document.documentElement.classList.contains('app-locked')));
  await shot(pd, '13-locked-dashboard');
  await pd.goto(APP + '/learn?c=DB-00&u=0', { waitUntil: 'networkidle' }); await pd.waitForSelector('.lp-call.ex');
  chk('lesson shows goal, example, steps, mistakes, key words, try-it', (await pd.locator('.lp-goal, .lp-call.ex, .lp-steps, .lp-call.warn, .lp-terms, .lp-call.try').count()) >= 6);
  await shot(pd, '14-lesson');

  say('ERRORS', errs); if (errs.length) fails++;
  say(fails ? `\n${fails} check(s) failed` : '\nall checks passed'); process.exitCode = fails ? 1 : 0; await b.close();
})().catch(async e => { console.error('FAIL', e.message.split('\n').slice(0, 6).join('\n'), errs); for (let i = 0; i < PAGES.length; i++) { try { await PAGES[i].screenshot({ path: `${SHOTS}/fail-${i}.png` }); console.error('page', i, PAGES[i].url()); } catch (_) {} } process.exit(1); });
