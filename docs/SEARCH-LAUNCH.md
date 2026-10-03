# DigitalBurj search identity and launch

## What this release changes

- Generates 31 public pages from the existing content: 16 main pages and 15 articles.
- Sends readable HTML to every visitor, with or without JavaScript. The existing interactive interface replaces that HTML after its heading and footer load. This is not user-agent-specific rendering.
- Supplies unique titles, descriptions, canonical URLs, social previews, language and robots directives in the initial head.
- Connects Organization, WebSite, WebPage, Service, Article and BreadcrumbList data with stable entity IDs and absolute URLs. No invented reviews, customers, addresses, credentials or social profiles are included.
- Preserves the existing DigitalBurj artwork and Google Analytics measurement ID G-XM0TZ7W0GN.
- Covers all canonical pages in the sitemap. Unknown article URLs return 404; component documents are noindex. Old .dc.html page links and generated document paths redirect to canonical pages.
- Fixes invalid dynamic hover declarations that could stop the existing runtime from compiling a template.

## Source and build

Edit the existing `dist/*.dc.html` templates, `dist/pages.js` and `dist/articles.js`. Run `npm ci`, `npm run build`, then `npm test` before publishing. Do not manually edit `dist/seo-pages/` or `cloudflare/seo-routes.js`; they are generated. Check the generated changes into Git because the Worker retrieves files from a pinned Git commit, not from build-machine output.

The build does not fabricate last-modified dates. Existing article publication dates are preserved. Update publication or modification dates only when the underlying content actually changes.

## Production release is required

The repository uses `cloudflare/worker.js` and a real Cloudflare KV namespace bound as `SITE`. Its `COMMIT` variable must identify the Git commit containing the generated pages. Deploy the updated Worker and that content pin together: the previous Worker does not know about the generated routes.

**Preserve the deployed Worker’s real SITE binding and existing secrets.** The checked-in `cloudflare/wrangler.toml` contains a placeholder KV ID (`00000000000000000000000000000000`). Do not overwrite a working production binding with this placeholder. Resolve the real namespace from the existing Cloudflare configuration before a CLI deployment.

The Worker uses commit-scoped KV and cache keys. Updating COMMIT selects new HTML without deleting unrelated cached data. Verify the homepage, `/business-os`, `/contact`, a valid article, an invalid article, `robots.txt`, the sitemap and the favicon after deploying. Check the page source for `digitalburj-schema`, `seo-prerender` and the Google tag. An HTTP 403 to a test client is not proof that Googlebot is blocked: use Search Console’s live URL test to establish Google’s actual access before making firewall changes. Do not disable site protection globally.

## Google Search Console — after deployment

1. Use the existing `digitalburj.com` domain property (or the matching verified HTTPS URL-prefix property). Reusing the domain for a new business does not require a Change of Address request or deletion of the property. Historical data will remain historical.
2. Check Security Issues and Manual Actions. Review whether any old migration or removal request is still active; do not delete or cancel anything without checking its purpose.
3. Inspect `https://digitalburj.com/`, run **Test live URL**, and check the rendered HTML. Confirm the DigitalBurj title, canonical, metadata and accessible page content. Check that indexing is allowed and Google-selected canonical is the expected URL.
4. Request indexing for the homepage and the important service/company pages. Submit `https://digitalburj.com/sitemap.xml` and check its processing status. Repeated requests for the same URL do not accelerate processing.
5. Do not use temporary removals on the homepage to replace the VelozTrade title: that can hide the entire current homepage. A new crawl and processing of the corrected page is the appropriate first step. The search result title, site name, snippet and favicon are chosen by Google; changes are not immediate or guaranteed.
6. Inspect old indexed URLs. Redirect an old URL only if there is a genuinely equivalent new page. Unrelated retired trading pages should return a true 404 or 410 rather than redirecting every old URL to the new homepage. The release returns 404 for unknown paths.
7. Check the favicon URL directly and request recrawling of the homepage. The approved favicon release is preserved: a 96 × 96 PNG, a real ICO file and a 180 × 180 Apple touch icon. Keep these URLs stable.
8. Once the Google tag is live, verify Realtime in the matching Analytics property. Analytics installation does not update Google Search branding or guarantee indexing.

## Search and AI visibility follow-through

Google’s AI Overviews and AI Mode use the same fundamental crawlability, indexing, useful-content and snippet eligibility requirements as Search. No extra AI schema, `llms.txt` file or keyword block guarantees inclusion. This release prioritizes textual content, article answers, brand identity, accurate structured data and navigable links.

- Confirm public company identity, legal name if applicable, locations and official social URLs before expanding organization data. Add only verifiable facts.
- Align the name, logo, domain and service descriptions on the company’s own public profiles. Do not claim a Google Business Profile location without actual eligibility.
- Publish real case studies with permission, outcomes with a clear measurement basis, implementation guides, comparison pages and named expert review where available. Avoid invented experience and bulk doorway/location pages.
- Review Search Console Performance for queries `DigitalBurj`, `Digital Burj` and the domain, plus service queries. Track impressions, clicks, CTR, indexed canonical pages and qualified enquiries. Use current account data as the baseline; none has yet been read for this release.
- Review indexing errors and brand-result changes after Google recrawls. Search ranking and AI citations cannot be guaranteed, including a number-one position for the brand term.

## Official references

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Verification boundaries

Local checks cover every generated canonical URL, metadata and schema consistency, internal links, sitemap coverage, a single analytics loader, Worker redirects/status codes, and the actual bundled React runtime’s handoff to interactive content (including the contact form and article search). Live Cloudflare deployment, Google account checks, indexing requests and ranking changes require separate confirmation from their respective systems. Do not report local or repository success as a verified production release.
