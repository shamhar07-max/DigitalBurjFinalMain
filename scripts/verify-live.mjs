import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseHTML } from 'linkedom';
const origin = 'https://digitalburj.com';
const routes = JSON.parse(fs.readFileSync(new URL('../dist/seo-routes.json', import.meta.url), 'utf8'));
let failures = 0;
async function check(route, inspect) {
  try {
    const res = await fetch(origin + route, { redirect: 'manual', signal: AbortSignal.timeout(20000), headers: {'User-Agent':'DigitalBurj-Release-Check/1.0'} });
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
await check('/insights/nonexistent-release-check', res=>assert.equal(res.status,404));
console.log(`${failures} failed checks. A 403 to this diagnostic client does not establish that Googlebot is blocked.`);
process.exitCode = failures ? 1 : 0;
