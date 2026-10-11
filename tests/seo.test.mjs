import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { JSDOM, ResourceLoader, VirtualConsole } from 'jsdom';

const dist=path.resolve(import.meta.dirname,'../dist');
const read=p=>fs.readFileSync(path.join(dist,p),'utf8');
const routes=JSON.parse(read('seo-routes.json'));
const origin='https://digitalburj.com';
const loadModule=async file=>import('data:text/javascript;base64,'+Buffer.from(read(file)).toString('base64'));
const pages=await loadModule('pages.js');
const articles=await loadModule('articles.js');

test('every canonical URL has crawlable content and consistent brand signals without JavaScript',()=>{
  const seenTitles=new Set();
  for(const [route,file] of Object.entries(routes)){
    const html=read(file),{document}=parseHTML(html), head=document.head;
    assert.equal(document.documentElement.lang,'en');
    assert.equal(head.querySelectorAll('title').length,1,route);
    assert(!seenTitles.has(document.title),route+' unique title'); seenTitles.add(document.title);
    assert.equal(head.querySelector('link[rel=canonical]').getAttribute('href'),origin+route);
    assert.equal(head.querySelector('meta[property="og:url"]').getAttribute('content'),origin+route);
    assert.equal(head.querySelector('meta[property="og:site_name"]').getAttribute('content'),'DigitalBurj');
    assert(head.querySelector('meta[name=description]').getAttribute('content').length>60,route);
    assert(!/noindex/.test(head.querySelector('meta[name=robots]').getAttribute('content')));
    assert.deepEqual([...head.querySelectorAll('link[rel=icon]')].map(l=>l.getAttribute('href')),['/favicon.svg','/brand/favicon.png','/brand/favicon-192.png']);
    assert.equal(head.querySelector('link[rel=icon][type="image/png"]').getAttribute('sizes'),'96x96');
    assert.equal(head.querySelector('link[rel=manifest]').getAttribute('href'),'/manifest.webmanifest');
    assert.equal((html.match(/googletagmanager.com\/gtag\/js/g)||[]).length,1);
    assert.match(html,/<head>\s*<!-- Google tag \(gtag.js\) -->/);
    const snapshot=document.querySelector('#seo-prerender');
    assert.equal(snapshot.querySelectorAll('h1').length,1,route);
    assert(snapshot.textContent.length>500,route+' rendered text');
    assert(!/{{|}}|undefined|\[object Object\]/.test(snapshot.innerHTML),route+' unresolved template');
    assert(!snapshot.querySelector('sc-for,sc-if,dc-import,x-import'));
    assert(!snapshot.querySelector('form'),'fallback cannot submit an unhandled form');
    assert(snapshot.querySelector('footer a[href="/contact"]'));
    assert(snapshot.querySelector('a[href="/company"]'));
    assert.equal(snapshot.querySelectorAll('.db-fallback-menu nav a').length,16);
    const fallbackSummary=snapshot.querySelector('.db-fallback-menu summary');
    assert.equal(fallbackSummary.textContent,'Ecosystem ⌄');
    assert(fallbackSummary.querySelector('svg'));
    assert.equal(snapshot.querySelector('.db-fallback-menu').previousElementSibling.getAttribute('aria-label'),'DigitalBurj home');
    for(const link of snapshot.querySelectorAll('a[href^="/"]')) {
      const url=new URL(link.getAttribute('href'),origin);
      assert(routes[url.pathname] || fs.existsSync(path.join(dist,url.pathname)),route+' broken internal link '+url.pathname);
      if(url.hash && url.pathname===route) assert(snapshot.querySelector('[id="'+decodeURIComponent(url.hash.slice(1))+'"]'),route+' missing anchor '+url.hash);
    }
    const data=JSON.parse(head.querySelector('#digitalburj-schema').textContent);
    assert(data['@graph'].some(x=>x['@type']==='WebSite'&&x.name==='DigitalBurj'));
    assert(data['@graph'].some(x=>x['@type']==='Organization'&&x.url===origin+'/'));
    if(route.startsWith('/insights/')){
      const article=articles.ARTICLES.find(x=>'/insights/'+x.slug===route);
      for(const section of article.sections) assert(snapshot.textContent.includes(section.h));
      assert(data['@graph'].some(x=>x['@type']==='Article'&&x.headline===article.title));
      for(const link of snapshot.querySelectorAll('aside ol a')) assert.equal(new URL(link.getAttribute('href'),origin).pathname,route);
    }
    assert(read('sitemap.xml').includes('<loc>'+origin+route+'</loc>'));
  }
  assert.equal(Object.keys(routes).length,31);
  const png=fs.readFileSync(path.join(dist,'brand/favicon.png'));
  assert.equal(png.readUInt32BE(16),96); assert.equal(png.readUInt32BE(20),96);
  for(const route of ['/business-ai','/growth','/studio']) assert(read(routes[route]).includes('type="application/ld+json"') && read(routes[route]).includes('DigitalBurj'));
});

test('answer and AI discovery data matches visible content and canonical destinations',()=> {
  for(const [route,file] of Object.entries(routes)) {
    const {document}=parseHTML(read(file));
    const graph=JSON.parse(document.querySelector('#digitalburj-schema').textContent)['@graph'];
    const page=graph.find(n=>n['@id']===origin+route+'#webpage');
    const faq=(pages.PAGES[route.slice(1)]?.sections || []).filter(s=>s.type==='faq').flatMap(s=>s.items);
    const visible=document.querySelector('#seo-prerender').textContent.replace(/\s+/g,' ').trim();
    if(faq.length) {
      assert(page['@type'].includes('FAQPage'),route);
      assert.equal(page.mainEntity.length,faq.length);
      for(const question of page.mainEntity) {
        assert.equal(question['@type'],'Question');
        assert.equal(question.acceptedAnswer['@type'],'Answer');
        assert(visible.includes(question.name),route+' visible question');
        assert(visible.includes(question.acceptedAnswer.text),route+' visible answer');
      }
    }
    if(route.startsWith('/insights/')) {
      const article=graph.find(n=>n['@type']==='Article');
      assert.equal(article.author['@id'],origin+'/#organization');
      assert.equal(page.mainEntity['@id'],article['@id']);
      assert.equal(document.querySelector('time[itemprop="datePublished"]').getAttribute('datetime'),article.datePublished);
      assert(document.querySelector('[itemprop="author"] a[href="/company"]'));
    }
  }
  const {document}=parseHTML(read(routes['/insights']));
  const graph=JSON.parse(document.querySelector('#digitalburj-schema').textContent)['@graph'];
  const list=graph.find(n=>n['@type']==='ItemList');
  assert.equal(list.numberOfItems,articles.ARTICLES.length);
  for(const item of list.itemListElement) assert(routes[new URL(item.url).pathname]);
  const directory=read('llms.txt');
  for(const match of directory.matchAll(/\]\((https:\/\/digitalburj\.com[^)]+)\)/g)) assert(routes[new URL(match[1]).pathname]);
  for(const a of articles.ARTICLES) assert(directory.includes(origin+'/insights/'+a.slug));
  assert(read('robots.txt').includes('Disallow: /api/'));
});

test('commercial pages explain their actual UAE search intent in search snippets',()=> {
  const expected = {
    '/': ['Business Software & AI Automation UAE','business software'],
    '/business-os': ['Business Management Software for UAE SMEs','CRM'],
    '/business-ai': ['AI Automation for UAE Businesses','AI agents'],
    '/studio': ['Web & App Development Services UAE','websites'],
    '/growth': ['SEO, AI Search & Digital Growth','answer engine'],
    '/industries': ['Industry Business Software Solutions UAE','logistics']
  };
  for (const [route,[title,descriptionTerm]] of Object.entries(expected)) {
    const {document}=parseHTML(read(routes[route]));
    assert(document.title.includes(title),route+' title must match search intent');
    assert(document.querySelector('meta[name="description"]').getAttribute('content').includes(descriptionTerm),route+' description must describe available services');
    assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'),origin+route);
  }
});

test('both brand spellings are visible and share one canonical company identity',()=>{
  for(const route of ['/','/company']) {
    const {document}=parseHTML(read(routes[route]));
    assert.match(document.querySelector('#seo-prerender').textContent,/DigitalBurj \(Digital Burj\)/,route+' visible alternate brand spelling');
    assert.match(document.querySelector('meta[name="description"]').getAttribute('content'),/Digital Burj/,route+' brand description');
    const graph=JSON.parse(document.querySelector('#digitalburj-schema').textContent)['@graph'];
    assert.equal(graph.find(n=>n['@type']==='Organization').alternateName,'Digital Burj');
    assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'),origin+route);
  }
});

test('service landing pages explain their search intent and link to useful next steps',()=>{
  const expected={
    '/business-os':[/CRM.*ERP.*UAE/i,'/insights/crm-vs-erp'],
    '/business-ai':[/AI automation.*UAE/i,'/insights/ai-agent-vs-chatbot'],
    '/growth':[/SEO.*digital growth.*UAE/i,'/studio'],
    '/studio':[/Web.*app development.*UAE/i,'/insights/how-to-scope-an-mvp'],
    '/industries':[/Industry.*software.*UAE/i,'/insights/document-automation-in-logistics']
  };
  for(const [route,[heading,nextStep]] of Object.entries(expected)) {
    const {document}=parseHTML(read(routes[route]));
    const content=document.querySelector('#seo-prerender');
    assert.match(content.querySelector('h1').textContent.replace(/\s+/g,' '),heading,route+' descriptive service heading');
    const links=[...content.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href'));
    assert(links.includes(nextStep),route+' contextual next-step link');
    assert(links.includes('/contact'),route+' enquiry destination');
  }
});

test('Worker serves the generated HTML, redirects duplicates, and returns real 404s',async()=>{
  const worker=(await import('../cloudflare/worker.js')).default;
  const originalFetch=globalThis.fetch;
  const previousCaches=globalThis.caches;
  globalThis.caches={default:{match:async()=>undefined,put:async()=>{}}};
  globalThis.fetch=async()=>new Response('Not found',{status:404});
  const env={COMMIT:'test-release',SITE:{
    getWithMetadata:async key=>{
      const p=path.join(dist,key.slice(key.indexOf(':')+1));
      return fs.existsSync(p)&&fs.statSync(p).isFile()?{value:fs.readFileSync(p),metadata:{type:p.endsWith('.html')?'text/html; charset=utf-8':'text/plain'}}:{value:null};
    },put:async()=>{}
  }};
  const ctx={waitUntil:()=>{}};
  const request=(route,options)=>worker.fetch(new Request(new URL(route,origin),options),env,ctx);
  try{
    for(const route of Object.keys(routes)){
      const res=await request(route);
      assert.equal(res.status,200,route); assert((await res.text()).includes('id="seo-prerender"'));
    }
    for(const [from,to] of [['/Homepage.dc.html','/'],['/business-os/','/business-os'],['/Article.dc.html?a=what-is-business-ai','/insights/what-is-business-ai'],['/Article.dc.html','/insights'],['/seo-pages/home.html','/'],['http://digitalburj.com/company','/company'],['https://www.digitalburj.com/','/']]){
      const res=await request(from); assert.equal(res.status,301,from); assert.equal(res.headers.get('location'),origin+to);
    }
    assert.equal((await request('/insights/nonexistent-article')).status,404);
    assert.equal((await request('/old-veloztrade-page')).status,404);
    for(const route of ['/favicon.ico','/brand/favicon.png','/brand/apple-touch-icon.png']) assert.equal((await request(route)).status,200,route);
    for(const route of ['/llms.txt','/robots.txt','/sitemap.xml']) {
      const res=await request(route); assert.equal(res.status,200,route);
      assert.equal(await res.text(),read(route.slice(1)),route+' current release content');
    }
    assert.equal((await request('/%ZZ')).status,400);
    assert.equal((await request('/SiteHeader.dc.html')).headers.get('x-robots-tag'),'noindex, follow');
    const head=await request('/business-os',{method:'HEAD'}); assert.equal(head.status,200); assert.equal(await head.text(),'');
  }finally{globalThis.fetch=originalFetch;globalThis.caches=previousCaches;}
});

// Simulate the actual bundled runtime. Dynamic module imports are supplied from
// the same local source data; analytics and remote services never run in tests.
function imports(src){return src.replace(/import\("\.\/pages\.js[^"\n]*"\)/g,'Promise.resolve(window.__testPages)').replace(/import\("\.\/articles\.js[^"\n]*"\)/g,'Promise.resolve(window.__testArticles)');}
class LocalResources extends ResourceLoader{
  fetch(url){
    const u=new URL(url),file=u.pathname;
    if(u.origin!==origin)return null;
    if(!['/support.js','/seo-prerender.js','/vendor/react.production.min.js','/vendor/react-dom.production.min.js'].includes(file))return null;
    return Promise.resolve(Buffer.from(read(file)));
  }
}
test('interactive runtime replaces snapshots and retains working controls',async()=>{
  for(const route of ['/','/business-os','/contact','/insights','/insights/what-is-business-ai']){
    const errors=[];
    const virtualConsole=new VirtualConsole();
    virtualConsole.on('jsdomError',e=>errors.push(e.message));
    virtualConsole.on('error',(...e)=>errors.push(e.map(x=>x?.stack||String(x)).join(' ')));
    const dom=new JSDOM(imports(read(routes[route])),{
      url:origin+route,runScripts:'dangerously',resources:new LocalResources(),pretendToBeVisual:true,virtualConsole,
      beforeParse(window){
        window.__testPages=pages;window.__testArticles=articles;
        window.fetch=async input=>{
          const url=new URL(String(input),window.document.baseURI);
          const file=routes[url.pathname]||url.pathname;
          return {ok:fs.existsSync(path.join(dist,file)),status:200,text:async()=>imports(read(file))};
        };
        window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
        window.scrollTo=()=>{};
      }
    });
    try{
      const end=Date.now()+5000;
      while(!dom.window.document.documentElement.classList.contains('dc-enhanced')&&Date.now()<end) await new Promise(r=>setTimeout(r,25));
      const document=dom.window.document;
      assert(document.documentElement.classList.contains('dc-enhanced'),route+' must enhance: '+errors.join('; '));
      assert(!document.querySelector('#seo-prerender'));
      assert.equal(document.querySelectorAll('h1').length,1);
      assert.equal(document.querySelectorAll('link[rel=canonical]').length,1);
      assert.equal(document.querySelector('link[rel=canonical]').href,origin+route);
      assert.equal(document.querySelectorAll('script[src*="googletagmanager"]').length,1);
      if(route==='/'){
        for(const width of [320,375,768,1024,1199,1200,1440]){
          Object.defineProperty(dom.window,'innerWidth',{value:width,configurable:true});
          dom.window.dispatchEvent(new dom.window.Event('resize'));
          await new Promise(r=>setTimeout(r,20));
          assert.equal(document.querySelector('nav[aria-label="Primary"]').style.display,width<1200?'none':'flex');
        }
        Object.defineProperty(dom.window,'innerWidth',{value:375,configurable:true});
        dom.window.dispatchEvent(new dom.window.Event('resize'));
        await new Promise(r=>setTimeout(r,20));
        document.querySelector('button[aria-label="Open menu"]').click();
        await new Promise(r=>setTimeout(r,20));
        assert(document.querySelector('button[aria-label="Close menu"]'));
        assert.equal(document.querySelector('button[aria-label="Open menu"]').getAttribute('aria-expanded'),'true');
        document.querySelector('button[aria-label="Close menu"]').click();
        await new Promise(r=>setTimeout(r,20));
        assert(!document.querySelector('button[aria-label="Close menu"]'));
      }
      if(route==='/contact')assert(document.querySelector('#dc-root form input[type=email]'));
      if(route==='/insights'){
        const input=document.querySelector('#dc-root input');
        const setter=Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set;
        setter.call(input,'impossible-query-xyz');input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
        await new Promise(r=>setTimeout(r,30));
        assert(document.querySelector('#dc-root').textContent.includes('No guides match'));
      }
      assert.deepEqual(errors,[],route);
    } finally{dom.window.close();}
  }
});
