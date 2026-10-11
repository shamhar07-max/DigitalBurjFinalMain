import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseHTML } from 'linkedom';
const origin = 'https://digitalburj.com';
// Allow the same release checks against a local/staging server. Canonical URLs
// and structured identity must still refer to the production domain.
const target = new URL(process.env.VERIFY_ORIGIN || origin);
assert(['http:','https:'].includes(target.protocol) && !target.username && !target.password && target.pathname==='/' && !target.search && !target.hash, 'VERIFY_ORIGIN must be an HTTP(S) origin without credentials, path, query or fragment');
const routes = JSON.parse(fs.readFileSync(new URL('../dist/seo-routes.json', import.meta.url), 'utf8'));
// Release-specific metadata expectations: detect stale deployments even when
// routes return HTTP 200 and the sitemap is present.
const expectedTitles = {
  '/': 'DigitalBurj | Business Software & AI Automation UAE',
  '/business-os': 'Business Management Software for UAE SMEs | DigitalBurj',
  '/business-ai': 'AI Automation for UAE Businesses | DigitalBurj',
  '/studio': 'Web & App Development Services UAE | DigitalBurj',
  '/industries': 'Industry Business Software Solutions UAE | DigitalBurj'
};
let failures = 0;
async function check(route, inspect) {
  try {
    const res = await fetch(target.origin + route, { redirect: 'manual', signal: AbortSignal.timeout(20000), headers: {'User-Agent':'DigitalBurj-Release-Check/1.0'} });
    await inspect(res);
    console.log('PASS', route);
  } catch (err) { failures++; console.error('FAIL', route, err.message); }
}
for (const route of Object.keys(routes)) await check(route, async res => {
  assert.equal(res.status, 200, 'Public page status');
  const html = await res.text();
  const {document} = parseHTML(html);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), origin + route, 'Canonical');
  assert(document.querySelector('#seo-prerender'), 'SEO HTML release is missing');
  assert(document.querySelector('#digitalburj-schema'), 'Brand structured data is missing');
  const expected = parseHTML(fs.readFileSync(new URL('../dist' + routes[route], import.meta.url), 'utf8')).document;
  assert.deepEqual(JSON.parse(document.querySelector('#digitalburj-schema').textContent), JSON.parse(expected.querySelector('#digitalburj-schema').textContent), 'Current structured data mismatch (possible stale deployment)');
  const title = document.querySelector('title')?.textContent?.trim();
  assert(title?.includes('DigitalBurj'), 'DigitalBurj title missing');
  assert(document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim(), 'Meta description missing');
  if (expectedTitles[route]) assert.equal(title, expectedTitles[route], 'Current release title mismatch (possible stale deployment)');

  assert.equal((html.match(/googletagmanager.com\/gtag\/js\?id=G-XM0TZ7W0GN/g)||[]).length, 1, 'One Google tag');
});
for (const route of ['/brand/favicon.png','/favicon.ico','/brand/apple-touch-icon.png']) await check(route, async res => {
  assert.equal(res.status, 200); assert.match(res.headers.get('content-type')||'', /^image\//);
  assert((await res.arrayBuffer()).byteLength > 100);
});
await check('/sitemap.xml', async res => {
  assert.equal(res.status,200); const xml=await res.text();
  for(const route of Object.keys(routes)) assert(xml.includes('<loc>'+origin+route+'</loc>'));
});
await check('/robots.txt', async res => {
  assert.equal(res.status,200);
  const text=await res.text();
  assert.match(text,/User-agent: \*/);
  assert.match(text,/Disallow: \/api\//);
  assert(text.includes('Sitemap: '+origin+'/sitemap.xml'));
});
await check('/llms.txt', async res => {
  assert.equal(res.status,200);
  assert.equal(await res.text(),fs.readFileSync(new URL('../dist/llms.txt',import.meta.url),'utf8'));
});
await check('/insights/nonexistent-release-check', res=>assert.equal(res.status,404));
console.log(`${failures} failed checks. A 403 to this diagnostic client does not establish that Googlebot is blocked.`);
process.exitCode = failures ? 1 : 0;
