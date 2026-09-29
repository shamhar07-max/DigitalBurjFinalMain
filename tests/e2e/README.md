# Academy end-to-end journey

Runs the **real Cloudflare Worker bundle** (routing, host split, cookies, KV logic) behind a local server, with an
in-memory KV pre-loaded from `dist/`, a fake Stripe (signed webhook simulator) and a fake Resend (mail capture), then
drives Chromium through: landing → checkout → Stripe → webhook → welcome → sign-up → e-mail verification → app →
locked/owned courses → refund revocation → coupon redemption → sign-out/in → password reset → no-access user.

```sh
npm i --no-save playwright-core esbuild
npx esbuild cloudflare/worker.js --bundle --format=esm --platform=neutral --outfile=/tmp/w-bundle.mjs
node tests/e2e/harness.mjs &            # http://localhost:8123 (landing) and http://academy.localhost:8123 (app)
CHROMIUM=/path/to/chrome node tests/e2e/journey.js
```
