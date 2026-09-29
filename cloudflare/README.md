# Cloudflare deployment

`worker.js` serves the static site in `dist/` from a Workers KV mirror of a **pinned git commit**
(`COMMIT` var), routes clean URLs, and implements `/api/contact`, `/api/subscribe` and `/api/lead` (Resend).

- Missing files are fetched once from the public GitHub repo, stored in KV, then served from KV + edge cache.
- A cron trigger (every 2 min) mirrors every file in the pinned commit into KV.
- To release a new version: push to `main`, then update the `COMMIT` var (and re-run the deploy).
- Secrets (`RESEND_API_KEY`) are Worker secrets — never commit them.

## Academy

This repo contains only the public Academy page (`/academy`, `dist/Academy.dc.html` + `academy-store.html/js` + `academy.css`).
Sign-in, dashboard, courses and payments are **not** part of this repo: every call-to-action on the page is a plain link to the
Academy app. The link target is the single `ACADEMY_URL` constant at the top of `dist/academy-store.js` (default `https://academy.digitalburj.com`).
