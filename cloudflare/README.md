# Cloudflare deployment

`worker.js` serves the static site in `dist/` from a Workers KV mirror of a **pinned git commit**
(`COMMIT` var), routes clean URLs, and implements `/api/contact` and `/api/subscribe` (Resend).

- Missing files are fetched once from the public GitHub repo, stored in KV, then served from KV + edge cache.
- A cron trigger (every 2 min) mirrors every file in the pinned commit into KV.
- To release a new version: push to `main`, then update the `COMMIT` var (and re-run the deploy).
- Secrets (`RESEND_API_KEY`) are Worker secrets — never commit them.
