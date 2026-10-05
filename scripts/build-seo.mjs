import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';

// Render the existing content and templates for every visitor. No bot detection,
// alternate crawler copy, or fabricated business facts are used.
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const read = p => fs.readFileSync(path.join(dist, p), 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const origin = 'https://digitalburj.com';
const loadModule = async file => import('data:text/javascript;base64,' + Buffer.from(read(file)).toString('base64'));
const { PAGES, PLANS } = await loadModule('pages.js');
const { ARTICLES, CATEGORIES } = await loadModule('articles.js');
const routeFiles = {
  '/':'Homepage', '/business-os':'BusinessOS', '/business-ai':'BusinessAI', '/growth':'Growth',
  '/studio':'Studio', '/industries':'Industries', '/academy':'Academy', '/talent':'Talent',
  '/jobs':'Jobs', '/pricing':'Pricing', '/company':'Company', '/solutions':'Solutions',
  '/portfolio':'Portfolio', '/get-started':'GetStarted', '/contact':'Contact', '/insights':'Insights'
};
const titles = {
  '/':'DigitalBurj | Business Software, AI & Digital Solutions',
  '/business-os':'Business OS: CRM, ERP, HR & Payroll | DigitalBurj',
  '/business-ai':'Business AI Agents & Workflow Automation | DigitalBurj',
  '/growth':'SEO, AI Search & Digital Growth Services | DigitalBurj',
  '/studio':'Custom Software, Web & App Development | DigitalBurj',
  '/industries':'Industry Software & Automation Solutions | DigitalBurj',
  '/academy':'DigitalBurj Academy | Practical Technology Learning',
  '/talent':'Verified Talent & Evidence-Based Hiring | DigitalBurj',
  '/jobs':'Jobs & Professional Opportunities | DigitalBurj',
  '/pricing':'Business Software & Service Pricing | DigitalBurj',
  '/company':'About DigitalBurj | Software, AI, Growth & Learning',
  '/solutions':'Business Technology Solutions | DigitalBurj',
  '/portfolio':'Software & Automation Project Examples | DigitalBurj',
  '/get-started':'Start Your DigitalBurj Project | Business Technology',
  '/contact':'Contact DigitalBurj | Book a Free Process Review',
  '/insights':'Software, AI & Automation Insights | DigitalBurj'
};
const org = {
  '@type':'Organization', '@id':origin+'/#organization', name:'DigitalBurj', alternateName:'Digital Burj', url:origin+'/',
  description:'DigitalBurj provides business software, AI automation, digital growth, custom software development, industry solutions, practical learning and verified talent.',
  logo:{"@type":"ImageObject", url:origin+"/brand/favicon-512.png", width:512, height:512},
  image:origin+'/brand/opengraph.png', email:'support@digitalburj.com', telephone:'+971552998583',
  contactPoint:{'@type':'ContactPoint', contactType:'customer support', email:'support@digitalburj.com', telephone:'+971552998583', url:origin+'/contact'}
};
const website = {'@type':'WebSite', '@id':origin+'/#website', url:origin+'/', name:'DigitalBurj', alternateName:['Digital Burj','digitalburj.com'], publisher:{'@id':org['@id']}, inLanguage:'en'};
const docs = new Map();
function source(name) {
  if (!docs.has(name)) docs.set(name, parseHTML(read(name+'.dc.html')).document);
  return docs.get(name);
}
function value(input, scope) {
  const expression = String(input).match(/^\s*{{\s*(.*?)\s*}}\s*$/)?.[1];
  if (!expression) return input;
  if (expression === 'true') return true;
  if (expression === 'false') return false;
  return expression.split('.').reduce((v,k) => v?.[k], scope);
}
function interpolate(input, scope) {
  return String(input).replace(/{{\s*(.*?)\s*}}/g, (_, expr) => {
    const result = value('{{'+expr+'}}', scope);
    return typeof result === 'function' || result == null ? '' : String(result);
  });
}
const voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
function renderComponent(name, props, route, styles) {
  const document = source(name);
  const js = document.querySelector('script[data-dc-script]')?.textContent || 'class Component extends DCLogic {}';
  class DCLogic { constructor(){this.props=props;} setState(p){Object.assign(this.state,p);} }
  const location = new URL(route, origin);
  const context = { DCLogic, React:{createRef:()=>({current:null})}, URLSearchParams, URL, console, window:{location}, location };
  const Cls = vm.runInNewContext(js+'\nComponent;', context, { timeout: 3000 });
  const component = new Cls();
  if(name==='ContentPage') Object.assign(component.state,{pages:PAGES,plans:PLANS});
  if(name==='Homepage') component.state.articles=ARTICLES.slice(0,3);
  if(name==='Insights') Object.assign(component.state,{list:ARTICLES,cats:CATEGORIES});
  if(name==='Article') component.state.list=ARTICLES;
  const scope = component.renderVals?.() || {};
  const children = (node, ctx) => [...node.childNodes].map(child=>render(child,ctx)).join('');
  function render(node, ctx) {
    if(node.nodeType===3) return esc(interpolate(node.textContent,ctx));
    if(node.nodeType!==1) return '';
    const tag=node.localName;
    if(tag==='helmet') { for(const s of node.querySelectorAll('style')) styles.add(s.textContent); return ''; }
    if(tag==='script') return '';
    if(tag==='sc-if') return value(node.getAttribute('value'),ctx) ? children(node,ctx) : '';
    if(tag==='sc-for') return (value(node.getAttribute('list'),ctx)||[]).map(item=>children(node,{...ctx,[node.getAttribute('as')]:item})).join('');
    if(tag==='dc-import') {
      const props=Object.fromEntries([...node.attributes].map(a=>[a.name,value(a.value,ctx)]));
      return renderComponent(props.name,props,route,styles);
    }
    if(tag==='x-import') {
      // Static first frame of the same decorative hero used by the live component.
      const id=interpolate(node.getAttribute('slides')||'01',ctx).split(',')[0];
      return `<picture aria-hidden="true" style="position:absolute;inset:0;z-index:-2"><source media="(max-width:700px)" srcset="/media/${esc(id)}-m.webp"><img src="/media/${esc(id)}-d.webp" alt="" fetchpriority="high" style="width:100%;height:100%;object-fit:cover"></picture>`;
    }
    // A non-JavaScript fallback must not submit an unhandled form (including PII).
    if(tag==='form') return '<p><a href="mailto:support@digitalburj.com">Email support@digitalburj.com</a> or <a href="https://wa.me/971552998583">contact DigitalBurj on WhatsApp</a>.</p>';
    let attrs='';
    for(const a of node.attributes) {
      if(/^on|^hint-|^style-|^data-reveal|^data-delay|^ref$/.test(a.name)) continue;
      const v=value(a.value,ctx);
      if(typeof v==='function' || v===undefined || v===null) continue;
      if(['disabled','checked','selected','required','multiple'].includes(a.name)) { if(v!==false) attrs+=' '+a.name; continue; }
      attrs+=' '+a.name+'="'+esc(interpolate(a.value,ctx))+'"';
    }
    return '<'+tag+attrs+'>'+ (voids.has(tag)?'':children(node,ctx)+'</'+tag+'>');
  }
  return children(document.querySelector('x-dc'),scope);
}

const routes = {};
const allRoutes=[...Object.keys(routeFiles),...ARTICLES.map(a=>'/insights/'+a.slug)];
for(const route of allRoutes) {
  const article=ARTICLES.find(a=>route==='/insights/'+a.slug);
  const name=article?'Article':routeFiles[route];
  const original=source(name);
  const document=parseHTML(read(name+'.dc.html')).document;
  const title=article?article.title+' | DigitalBurj Insights':titles[route];
  const description=article?.description || original.querySelector('meta[name="description"]')?.getAttribute('content') || org.description;
  const canonical=origin+route;
  const image=article?new URL(article.image,origin+'/').href:org.image;
  const schemaPage={'@type':route==='/company'?'AboutPage':route==='/contact'?'ContactPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,inLanguage:'en',isPartOf:{'@id':website['@id']},about:{'@id':org['@id']}};
  const graph=[org,website,schemaPage];
  if(route!=='/') {
    const items=[{name:'DigitalBurj',item:origin+'/'}];
    if(article)items.push({name:'Insights',item:origin+'/insights'});
    items.push({name:article?.title || PAGES[route.slice(1)]?.crumb || title.split(' | ')[0],item:canonical});
    graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:items.map((x,i)=>({'@type':'ListItem',position:i+1,...x}))});
    schemaPage.breadcrumb={'@id':canonical+'#breadcrumb'};
  }
  if(article) graph.push({'@type':'Article','@id':canonical+'#article',headline:article.title,description:article.description,image,datePublished:article.date,author:{'@type':'Organization',name:'DigitalBurj',url:origin+'/company'},publisher:{'@id':org['@id']},mainEntityOfPage:{'@id':schemaPage['@id']},inLanguage:'en'});
  const serviceRoutes=['business-os','business-ai','growth','studio','industries','academy','talent','solutions'];
  if(serviceRoutes.includes(route.slice(1))) graph.push({'@type':'Service','@id':canonical+'#service',name:PAGES[route.slice(1)]?.crumb || title,description,url:canonical,provider:{'@id':org['@id']}});

  // Metadata belongs in the initial head, not only in a client-side helmet.
  for(const n of document.querySelectorAll('title, meta[name="description"],meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"],link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"],link[rel="manifest"],script[type="application/ld+json"]')) n.remove();
  const base=document.createElement('base'); base.setAttribute('href','/');
  document.head.querySelectorAll('base').forEach(n=>n.remove());
  document.head.insertBefore(base,document.head.querySelector('script[src="./support.js"]'));
  document.documentElement.setAttribute('lang','en');
  document.head.insertAdjacentHTML('beforeend',`\n<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="96x96" href="/brand/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/brand/favicon-192.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="application-name" content="DigitalBurj">
<meta property="og:site_name" content="DigitalBurj">
<meta property="og:type" content="${article?'article':'website'}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${esc(article?.title||'DigitalBurj — Learn. Build. Transform.')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<script type="application/ld+json" id="digitalburj-schema">${json({'@context':'https://schema.org','@graph':graph})}</script>\n`);
  const styles=new Set();
  const snapshot=renderComponent(name,{},route,styles);
  const staticDoc=parseHTML('<html><body>'+snapshot+'</body></html>').document;
  const header=staticDoc.querySelector('.db-site-header .db-nav-inner');
  if(header) header.querySelector('a[aria-label="DigitalBurj home"]').insertAdjacentHTML('afterend','<details class="db-fallback-menu"><summary aria-label="Open navigation"><span class="db-fallback-desktop">Ecosystem ⌄</span><svg class="db-fallback-mobile" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"></path></svg></summary><nav aria-label="Site navigation">'+Object.keys(routeFiles).map(url=>'<a href="'+url+'">'+esc(url==='/'?'Home':url==='/business-ai'?'DigitalBurj AI':PAGES[url.slice(1)]?.crumb||routeFiles[url].replace(/([a-z])([A-Z])/g,'$1 $2'))+'</a>').join('')+'</nav></details>');
  // Open fallback FAQ answers; the enhanced page restores the existing accordion.
  for(const el of staticDoc.querySelectorAll('[style]')) {
    el.setAttribute('style',el.getAttribute('style').replace(/grid-template-rows:0fr/g,'grid-template-rows:1fr'));
  }
  const h1=staticDoc.querySelector('h1')?.textContent.replace(/\s+/g,' ').trim();
  if(!h1)throw Error('Missing rendered heading for '+route);
  document.head.insertAdjacentHTML('beforeend','<style>'+[...styles].join('\n')+'</style><link rel="stylesheet" href="/seo-prerender.css"><script src="/seo-prerender.js" defer></script>');
  document.body.insertAdjacentHTML('afterbegin',`<div id="seo-prerender" data-heading="${esc(h1)}">${staticDoc.body.innerHTML}</div>`);
  const file='/seo-pages/'+(route==='/'?'home':route.slice(1))+'.html';
  write(path.join(dist,file),document.toString().replace(/[ \t]+$/gm, '')+'\n');
  routes[route]=file;
}
write(path.join(dist,'seo-routes.json'),JSON.stringify(routes,null,2)+'\n');
write(path.join(root,'cloudflare/seo-routes.js'),'// Generated by npm run build. Do not edit.\nexport const SEO_ROUTES = '+JSON.stringify(routes,null,2)+';\n');
const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
config.buildCommand='npm run build';
config.outputDirectory='dist';
config.rewrites=Object.entries(routes).map(([source,destination])=>({source,destination}));
// Unknown article slugs must not return an unrelated article with HTTP 200.
config.redirects=config.redirects.filter(r=>r.source!=='/Article.dc.html');
config.redirects.push({source:'/Article.dc.html',has:[{type:'query',key:'a',value:'(?<slug>.+)'}],destination:'/insights/:slug',permanent:true});
config.redirects.push({source:'/Article.dc.html',destination:'/insights',permanent:true});
config.redirects=config.redirects.filter(r=>r.source!=='/favicon.ico');
config.redirects=config.redirects.filter((r,i,list)=>list.findIndex(x=>JSON.stringify(x)===JSON.stringify(r))===i);
const generatedRedirects=Object.entries(routes).map(([destination,source])=>({source,destination,permanent:true}));
config.redirects=config.redirects.filter(r=>!r.source.startsWith('/seo-pages/')).concat(generatedRedirects);
const noindex={source:'/(SiteHeader|SiteFooter|ContentPage).dc.html',headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]};
config.headers=config.headers.filter(h=>h.source!==noindex.source).concat(noindex);
write(path.join(root,'vercel.json'),JSON.stringify(config,null,2)+'\n');
write(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+allRoutes.map(route=>'  <url><loc>'+origin+route+'</loc></url>').join('\n')+'\n</urlset>\n');
write(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://digitalburj.com/sitemap.xml\n');
console.log('Built '+allRoutes.length+' crawlable pages with initial HTML, metadata and structured data.');
