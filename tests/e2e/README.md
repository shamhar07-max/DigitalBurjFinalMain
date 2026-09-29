# Academy end-to-end journey

Runs the **real Cloudflare Worker bundle** (routing, host split, cookies, KV logic) behind a local server, with an
in-memory KV pre-loaded from `dist/`, a fake Stripe (signed webhook simulator) and a fake Resend (mail capture), then
drives Chromium through: landing → Get started → gateway → sign-up (show password, strength meter) → e-mail verification → purchase webhook →
course player (server-graded checkpoints) → lab → certificate → admin review → public verification → invoice → animated receipt → demo sandbox →
header/footer links back to the main site. Screenshots land in $SHOTS (default /tmp/shots).

```sh
npm i --no-save playwright-core esbuild
npx esbuild cloudflare/worker.js --bundle --format=esm --platform=neutral --outfile=/tmp/w-bundle.mjs
node tests/e2e/harness.mjs &            # http://localhost:8123 (landing) and http://academy.localhost:8123 (app)
CHROMIUM=/path/to/chrome node tests/e2e/journey.js
```
