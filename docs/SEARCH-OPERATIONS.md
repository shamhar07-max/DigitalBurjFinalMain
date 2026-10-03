# DigitalBurj SEO, AEO and AI search operations

## Release scope

The release combines the approved favicon assets with 31 crawlable pages, unique titles, descriptions, canonical URLs, social metadata, organization/site identity, service/article/breadcrumb structured data, sitemap and robots directives. It preserves GA4 G-XM0TZ7W0GN once per page. The same readable content is available to visitors and crawlers. Existing article explanations, takeaways and FAQs are included in initial HTML. AI, growth and studio service FAQs answer scope, suitability and pricing questions using existing business information.

This implements the site's technical foundation. Search rankings, citations, enquiries and revenue remain measured outcomes, not guaranteed deliverables. Off-site authority, verified business profiles, real project evidence and ongoing editorial review require continued work.

## Dashboard deployment

The production Worker is `digitalburj-site`. Changing its COMMIT variable alone does not install the new routes.

1. Save the current deployment version and COMMIT value for rollback.
2. In Worker Settings, update only COMMIT to the content commit recorded in `cloudflare/wrangler.toml`. Save/deploy the variable change. Existing templates remain available to the old Worker during this step.
3. Click Edit code. Replace the existing Worker entry module with the entire generated `cloudflare/worker-dashboard.mjs` file. This is a self-contained ES module: no extra route file needs uploading. Deploy it to production.
4. Keep the existing SITE KV binding, secrets, contact settings and domain routes. Do not deploy the placeholder KV ID from the checked-in wrangler configuration.
5. Run `npm run verify:live` from a network allowed to access the public website. A blocked diagnostic client does not establish a crawler block. Use Search Console live inspection to verify Google's access.
6. Check the homepage source for `seo-prerender`, `digitalburj-schema`, canonical `https://digitalburj.com/` and exactly one GA loader. Open a service page and an article. Test article contents links, the menu, enquiry form and article search. Unknown article URLs must return 404. All three icon files should return images.
7. If the release fails, restore both the previous Worker version and its previous COMMIT. Do not delete KV data or recreate secrets.

## Discovery and indexing

The existing domain property remains valid after rebranding. Keep historical Search Console data. Do not use Change of Address for a same-domain rebrand and do not temporarily remove the homepage merely to change its search title.

On 3 October 2026 the sitemap reported Success with 31 discovered pages, the homepage live test succeeded and an indexing request was accepted. No manual actions or security issues were shown. These are observations from that date, not guarantees about future reports. After the combined release, inspect the live homepage and key service pages before requesting another recrawl. Keep the favicon URL stable; no daily repeated indexing requests.

Review retired URLs individually: redirect only to a genuinely equivalent page; return 404/410 for unrelated retired content. Do not redirect every VelozTrade URL to DigitalBurj's homepage.

## Topic ownership and evidence

| Destination | Visitor need | Next useful evidence to publish |
| --- | --- | --- |
| /business-os | Connected CRM, ERP, HR and operational software | Actual module availability, product screenshots and a migration example |
| /business-ai | AI assistants and workflow automation | A permissioned workflow demonstration, approval boundaries and measured results |
| /growth | Search visibility and customer acquisition | A real campaign with baseline, dates, attribution method and qualified lead results |
| /studio | Custom applications and integrations | A permission-cleared case study with constraints, approach and deployed outcome |
| /industries | Sector-specific operations | One real industry workflow and implementation example at a time |
| /academy | Practical learning | Available courses, real instructors, assessment method and examples of student work |
| /talent | Evidence-based specialist selection | Verification method and availability; keep coming-soon status accurate |
| /company | Who DigitalBurj is | Confirmed legal identity, responsible team, contact details and official profile links |
| /insights | Definitions, comparisons and implementation decisions | First-hand guides reviewed by a named expert, with sources where claims need support |

Do not invent clients, testimonials, certifications, addresses, expert biographies, outcomes or publication dates. Do not create thin city pages or copy a page for every keyword variation. Update schema only when visible, verified facts change.

## Measurement

Establish a baseline after release. In Search Console, track branded queries (DigitalBurj, Digital Burj, digitalburj.com), nonbranded service queries, page clicks/impressions/CTR and indexed canonicals. Average position varies by query, location and device; it is not a universal rank.

In GA4 verify the matching property's Realtime report, then examine organic landing pages, engagement and enquiry outcomes. The tag's presence is not proof of data collection. Count a lead conversion only after the server accepts the enquiry; a button click is not a completed lead. Avoid sending contact details or free-text enquiries to analytics. Respect applicable visitor consent settings.

Record AI referrals where analytics exposes them and keep dated manual checks for a small stable set of business questions. Note the engine, date, locale, prompt and cited URL. Do not claim those samples represent all users. Review any generative-search controls and reports available in Search Console before interpreting eligibility or performance.

## Review schedule

- After deployment: live source, icon access, canonical/status checks, sitemap processing and GA4 collection.
- Weekly for the first month: indexing exclusions, broken URLs, query/page trends, lead quality and stale VelozTrade results.
- Monthly: content accuracy, actual product availability, case-study evidence, performance on mobile and search/AI referral trends.

Google's guidance treats AEO/GEO as part of the same search fundamentals. It does not require special AI schema or llms.txt. For other search and assistant services, review their official crawler documentation before changing access; search retrieval and model-training policies are separate decisions.

References:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
