const {chromium}=require('playwright-core');
const LAND='http://localhost:8123', APP='http://academy.localhost:8123';
const j=async(u,o)=>(await fetch(u,o)).json();
const say=(...a)=>console.log(...a);
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--host-resolver-rules=MAP academy.localhost 127.0.0.1']});
 const ctx=await b.newContext({viewport:{width:1360,height:860}}); const p=await ctx.newPage(); const errs=[];
 p.on('pageerror',e=>errs.push('PAGEERR '+e.message)); p.on('console',m=>{if(m.type()==='error'&&!/ERR_CERT|ERR_NAME|Failed to load resource/.test(m.text()))errs.push('CONSOLE '+m.text().slice(0,160))});
 await ctx.route('https://checkout.stripe.test/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<h1>stripe stub</h1>'}));
 const mailTo=async(to,subj)=>{const m=(await j(LAND+'/__mails')).filter(x=>x.to&&x.to[0]===to&&x.subject&&x.subject.includes(subj)).pop(); return m};
 const link=async(to,subj)=>{const m=await mailTo(to,subj); return /href="([^"]*token=[^"]*)"/.exec(m.html)[1].replace(/&amp;/g,'&')};

 // 1. landing
 await p.goto(LAND+'/academy',{waitUntil:'networkidle'}); await p.waitForSelector('.bundle-card');
 say('1 landing bundles:',await p.locator('.bundle-card').count(),'| sign-in href:',await p.getAttribute('#signInBtn','href'),'| role switcher gone:',await p.locator('.role-btn').count()===0);
 // 2. paid checkout -> Stripe
 await p.click('[data-buy-bundle=b-starter]'); await p.click('#checkoutBtn'); await p.waitForSelector('#payBtn:not([disabled])');
 say('2 pay label:',await p.textContent('#payBtn'));
 await p.fill('#co-name','Ann Lee'); await p.fill('#co-email','ann@example.com'); await p.click('#payBtn'); say('  no-consent error:',await p.textContent('#coError'));
 await p.check('#co-consent'); await Promise.all([p.waitForURL('https://checkout.stripe.test/**'),p.click('#payBtn')]); say('  redirected to Stripe:',p.url());
 const sreq=(await j(LAND+'/__stripe'))[0]; say('  stripe body has metadata+success_url:',/metadata%5Bitems%5D=b-starter/.test(sreq.body),/welcome%3Fcs%3D/.test(sreq.body));
 // 3. Stripe webhook (signed) -> entitlement; return page
 say('3 webhook status:',(await fetch(LAND+'/__pay',{method:'POST',body:JSON.stringify({id:'cs_test_1',email:'ann@example.com',items:'b-starter',amount:3})})).status);
 await p.goto(APP+'/welcome?cs=cs_test_1',{waitUntil:'networkidle'}); await p.waitForSelector('.au-card h1:has-text("Payment received")');
 say('  welcome:',(await p.textContent('.au-lead')).slice(0,90));
 await p.click('text=Create your account'); await p.waitForSelector('#au-name');
 say('  email prefilled:',await p.inputValue('#au-email'));
 // 4. signup + verification gate
 await p.fill('#au-name','Ann Lee'); await p.fill('#au-pw','short'); await p.click('#au-submit'); say('4 short pw err:',await p.textContent('#au-pw-err'));
 await p.fill('#au-pw','Quartz-Lantern-91'); await p.click('#au-submit'); say('  submit without consent:',await p.textContent('#au-error'));
 await p.check('#au-consent'); await p.click('#au-submit'); await p.waitForSelector('h1:has-text("Verify your email")'); say('  gated until verified: ok');
 await p.goto(await link('ann@example.com','Verify')); await p.waitForSelector('h1:has-text("Email verified")');
 await p.click('text=Continue learning'); await p.waitForSelector('.sidebar',{timeout:15000});
 say('5 workspace greeting:',(await p.textContent('.content h1')).trim(),'| sidebar user:',(await p.textContent('.sb-user-info b')));
 await p.click('.sb-item[data-view=curriculum]');
 const pills=await p.$$eval('#curriculumMain .program-card',els=>els.slice(0,3).map(e=>e.querySelector('.pc-id').textContent+':'+[...e.querySelectorAll('.pill')].map(x=>x.textContent).join('/')));
 say('  curriculum:',pills.join(' | '));
 await p.click('.sb-item[data-view=payments]'); say('  payments:',(await p.textContent('#payTotal')),(await p.textContent('#ordersTable')).slice(0,80));
 await p.click('.sb-item[data-view=credentials]'); say('  credentials empty state:',(await p.textContent('#credentialsVerified')).trim());
 await p.screenshot({path:'../app-ws.png'});
 // 6. refund revokes
 await fetch(LAND+'/__pay',{method:'POST',body:JSON.stringify({id:'cs_test_1',email:'ann@example.com',items:'b-starter',amount:3,type:'charge.refunded',object:{refunded:true,payment_intent:'pi_cs_test_1'}})});
 await p.goto(APP+'/'); await p.waitForSelector('.au-card h1'); say('6 after refund:',(await p.textContent('.au-card h1')).trim());
 // 7. coupon redemption (server-side)
 await p.goto(LAND+'/academy',{waitUntil:'networkidle'}); await p.waitForSelector('.bundle-card');
 await p.click('[data-buy-bundle=b-web]'); await p.click('#checkoutBtn'); await p.waitForSelector('#payBtn:not([disabled])');
 await p.fill('#co-coupon','digitalburj100'); await p.click('#coApply'); await p.waitForFunction(()=>document.querySelector('#payBtn').textContent.includes('account'));
 say('7 coupon pay label:',await p.textContent('#payBtn'));
 await p.fill('#co-email','ann@example.com'); await Promise.all([p.waitForURL(APP+'/redeem**'),p.click('#payBtn')]);
 await p.waitForSelector('.au-card h1'); say('  redeem screen:',(await p.textContent('.au-card h1')).trim()); // signed in already (cookie host-only on app)
 await p.click('#au-submit'); say('  needs both boxes:',await p.textContent('#au-error'));
 await p.check('#au-consent'); await p.check('#au-zero'); await p.click('#au-submit'); await p.waitForSelector('.sidebar',{timeout:15000});
 await p.click('.sb-item[data-view=curriculum]'); say('  owned after redeem:',(await p.$$eval('#curriculumMain .program-card',els=>els.filter(e=>e.querySelector('.pill.ok')&&/Owned/.test(e.textContent)).map(e=>e.querySelector('.pc-id').textContent))).join(','));
 await p.goto(APP+'/redeem?items=b-web&coupon=DigitalBurj100'); await p.waitForSelector('.au-card h1'); say('  redeem again (owned):',(await p.textContent('.au-card h1')).trim());
 // 8. sign out / in / forgot
 await p.goto(APP+'/'); await p.waitForSelector('.sidebar'); await p.click('#userMenu'); await p.click('#acctSignout'); await p.waitForURL('**/signin');
 await p.fill('#au-email','ann@example.com'); await p.fill('#au-pw','wrong-Pass-1'); await p.click('#au-submit'); await p.waitForFunction(()=>document.querySelector('#au-error').textContent.length>0); say('8 wrong pw:',await p.textContent('#au-error'));
 await p.click('text=Forgot password?'); await p.fill('#au-email','ann@example.com'); await p.click('#au-submit'); await p.waitForSelector('h1:has-text("Check your inbox")');
 await p.goto(await link('ann@example.com','Reset')); await p.fill('#au-pw','Brand-New-Pass-7'); await p.click('#au-submit'); await p.waitForSelector('.sidebar',{timeout:15000}); say('  reset -> signed in workspace: ok');
 // 9. no-access user
 const p2=await (await b.newContext()).newPage(); p2.on('pageerror',e=>errs.push('P2 '+e.message));
 await p2.goto(APP+'/signup',{waitUntil:'networkidle'}); await p2.fill('#au-name','Cy Dee'); await p2.fill('#au-email','cy@example.com'); await p2.fill('#au-pw','Violet-Harbor-42'); await p2.check('#au-consent'); await p2.click('#au-submit'); await p2.waitForSelector('h1:has-text("Verify")');
 await p2.goto(await link('cy@example.com','Verify')); await p2.waitForSelector('h1:has-text("Email verified")'); await p2.goto(APP+'/'); await p2.waitForSelector('.au-card h1'); say('9 verified but unpaid:',(await p2.textContent('.au-card h1')).trim());
 // 10. app host isolation + unauthenticated redirect
 const p3=await (await b.newContext()).newPage(); await p3.goto(APP+'/',{waitUntil:'networkidle'}); await p3.waitForURL('**/signin'); say('10 signed-out home ->',p3.url());
 say('ERRORS',errs); if(errs.length) process.exitCode=2; await b.close();
})().catch(e=>{console.error('FAIL',e.message.split('\n').slice(0,6).join('\n'));process.exit(1)});
