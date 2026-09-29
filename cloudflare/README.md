# Cloudflare deployment

`worker.js` serves the static site in `dist/` from a Workers KV mirror of a **pinned git commit**
(`COMMIT` var), routes clean URLs, and implements `/api/contact`, `/api/subscribe`, `/api/lead` and `/api/academy` (Resend; academy logic is shared with `api/_academy.js`).

- Missing files are fetched once from the public GitHub repo, stored in KV, then served from KV + edge cache.
- A cron trigger (every 2 min) mirrors every file in the pinned commit into KV.
- To release a new version: push to `main`, then update the `COMMIT` var (and re-run the deploy).
- Secrets (`RESEND_API_KEY`) are Worker secrets — never commit them.

## Academy (digitalburj.com/academy → academy.digitalburj.com)

The public landing page and checkout live at `digitalburj.com/academy`. After purchase the learner signs up / signs in and
continues on **`academy.digitalburj.com`** (same Worker, split by hostname; `/academy/workspace` and the old page files redirect there).

**One-time setup**
1. **DNS + route:** add `academy.digitalburj.com` to the same Worker (Workers → Triggers → Custom Domains, or a route `academy.digitalburj.com/*`).
2. **Secrets** (`wrangler secret put …`): `SESSION_SECRET` (32+ random bytes), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` (already used).
   Optional vars: `COOKIE_DOMAIN` (default `.digitalburj.com`), `APP_ORIGIN`, `SITE_ORIGIN`, `APP_HOST`.
3. **Stripe webhook:** endpoint `https://digitalburj.com/api/academy-webhook`, events `checkout.session.completed`,
   `checkout.session.async_payment_succeeded`, `charge.refunded`, `charge.dispute.created` (refunds and disputes both revoke access). Access is granted **only** from this signed webhook.
4. **KV:** the existing `SITE` namespace is reused (keys prefixed `acad:`). Reads are eventually consistent, so a new purchase can take up to ~1 minute to appear at every edge.
5. **CPU:** password hashing is PBKDF2-SHA-256 at 100,000 iterations (the Workers WebCrypto maximum). Use the Workers **Paid** plan (the free plan's 10 ms CPU limit is too small).
6. After merging, update `COMMIT` in `wrangler.toml` and redeploy.

**Promotion kill switch (optional plain-text vars):** `ACADEMY_PROMO_OFF=1` stops `DigitalBurj100` redemptions immediately; `ACADEMY_PROMO_EXPIRES=<ISO date>` ends it automatically.

**Marketing opt-in:** the Resend contact is created only after the learner verifies their email (or resets their password), never at sign-up.

**Behaviour without configuration:** no `SESSION_SECRET`/KV → the app shows "not switched on yet"; no `STRIPE_SECRET_KEY` → checkout
falls back to an enrolment request e-mailed to the team (nothing is unlocked). Vercel serves the pages but has no KV, so accounts are Worker-only.

**Data model (KV):** `acad:user:<email>`, `acad:ent:<email>` (orders; access is derived from non-refunded orders), `acad:order:<checkout id>`
(idempotency), `acad:pi:<payment intent>` (refund lookup), `acad:redeem:<email>:<product>` (promotion single-use).
Entitlements are shown only to **e-mail-verified** accounts, so nobody can claim a purchase by signing up with someone else's address.
