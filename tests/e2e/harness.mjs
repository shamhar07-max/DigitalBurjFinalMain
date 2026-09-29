// Test harness: runs the REAL Cloudflare Worker bundle, with an in-memory KV (pre-loaded with dist/ files),
// fake Stripe + Resend, and mail capture. Requests to localhost / academy.localhost are handed to worker.fetch.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const ROOT=path.resolve(path.dirname(new URL(import.meta.url).pathname),'../..'), COMMIT='abcdef1234567890';
const TYPES={html:'text/html; charset=utf-8',js:'application/javascript',css:'text/css',webp:'image/webp',png:'image/png',json:'application/json',woff2:'font/woff2',xml:'application/xml',txt:'text/plain'};
const store=new Map(), meta=new Map();
(function walk(d,rel=''){ for(const f of fs.readdirSync(d)){ const p=path.join(d,f), r=rel+'/'+f; if(fs.statSync(p).isDirectory()) walk(p,r); else { store.set(`${COMMIT}:${r}`, fs.readFileSync(p)); meta.set(`${COMMIT}:${r}`,{type:TYPES[f.split('.').pop()]||'application/octet-stream'}); } } })(ROOT+'/dist');
const KV={ async getWithMetadata(k){ const v=store.get(k); return {value: v==null?null:(Buffer.isBuffer(v)?v.buffer.slice(v.byteOffset,v.byteOffset+v.byteLength):v), metadata: meta.get(k)||null}; },
  async get(k){ const v=store.get(k); return v==null?null:(Buffer.isBuffer(v)?v.toString():v); }, async put(k,v,o){ store.set(k,v); if(o&&o.metadata)meta.set(k,o.metadata); }, async delete(k){ store.delete(k); }, async list(){ return {keys:[],list_complete:true}; } };
globalThis.caches={default:{match:async()=>null,put:async()=>{}}};
export const mails=[], stripeReqs=[];
const realFetch=globalThis.fetch;
globalThis.fetch=async(u,o={})=>{ u=String(u);
  if(u.startsWith('https://api.resend.com')){ mails.push({path:u.slice(22),...(o.body?JSON.parse(o.body):{})}); return new Response('{"id":"x"}',{status:200}); }
  if(u.startsWith('https://api.stripe.com')){ stripeReqs.push({u,method:o.method,body:o.body}); if(o.method==='POST') return new Response(JSON.stringify({id:'cs_test_1',url:'https://checkout.stripe.test/pay/cs_test_1'}),{status:200});
    return new Response(JSON.stringify({id:u.split('/').pop(),payment_status:'paid',customer_details:{email:sessions[u.split('/').pop()]?.email||'buyer@example.com'},metadata:{items:sessions[u.split('/').pop()]?.items||'b-web'}}),{status:200}); }
  return realFetch(u,o); };
const sessions={};
const env={SITE:KV,COMMIT,SESSION_SECRET:process.env.NO_SECRET?'':'test-secret-0123456789abcdef',RESEND_API_KEY:'k',STRIPE_SECRET_KEY:process.env.NO_STRIPE?'':'sk_test',STRIPE_WEBHOOK_SECRET:'whsec_test',INSECURE_COOKIES:'1',COOKIE_DOMAIN:'',
  APP_HOST:'academy.localhost',APP_ORIGIN:'http://academy.localhost:8123',SITE_ORIGIN:'http://localhost:8123',CONTACT_TO:'support@digitalburj.com'};
const worker=(await import(process.env.WORKER||'/tmp/w-bundle.mjs')).default;
http.createServer(async(req,res)=>{
  const chunks=[]; for await(const c of req) chunks.push(c); const body=Buffer.concat(chunks);
  const url=new URL(req.url,'http://'+req.headers.host);
  if(url.pathname==='/__mails'){ res.setHeader('content-type','application/json'); return res.end(JSON.stringify(mails)); }
  if(url.pathname==='/__stripe'){ res.setHeader('content-type','application/json'); return res.end(JSON.stringify(stripeReqs)); }
  if(url.pathname==='/__pay' && req.method==='POST'){ // simulate Stripe: register session + deliver a signed webhook
    const d=JSON.parse(body.toString()); sessions[d.id]={email:d.email,items:d.items};
    const raw=JSON.stringify({type:d.type||'checkout.session.completed',data:{object: d.object||{id:d.id,payment_status:'paid',amount_total:d.amount*100,currency:'usd',customer_details:{email:d.email},metadata:{items:d.items,ref:'ORD-T'},payment_intent:d.pi||('pi_'+d.id)}}});
    const t=Math.floor(Date.now()/1000), sig=crypto.createHmac('sha256','whsec_test').update(`${t}.${raw}`).digest('hex');
    const r=await worker.fetch(new Request('http://localhost:8123/api/academy-webhook',{method:'POST',headers:{'stripe-signature':`t=${t},v1=${sig}`},body:raw}),env,{waitUntil(){}});
    res.statusCode=r.status; return res.end(await r.text()); }
  const headers=new Headers(); for(const [k,v] of Object.entries(req.headers)) if(v!=null) headers.set(k,String(v));
  const r=await worker.fetch(new Request(url.toString(),{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:body,redirect:'manual'}),env,{waitUntil(){}});
  res.statusCode=r.status; r.headers.forEach((v,k)=>{ if(k!=='set-cookie') res.setHeader(k,v); }); const sc=r.headers.getSetCookie?r.headers.getSetCookie():[]; if(sc.length) res.setHeader('set-cookie',sc);
  res.end(Buffer.from(await r.arrayBuffer()));
}).listen(8123,()=>console.log('worker harness up'));
