# DigitalBurj email with Cloudflare and Gmail

Requested configuration: three role aliases (`info`, `support`, `contact`) and four personal addresses (`shameem`, `aarifkamal`, `talha2980`, `irfanhabeeb`), all at `digitalburj.com`.

Cloudflare Email Routing forwards incoming messages to existing Gmail inboxes. Resend supplies SMTP for Gmail's Send mail as on its free tier. These are separate configurations. This setup does not create four new hosted inboxes or Google Workspace logins. Each personal address needs an existing destination Gmail inbox.

The seven-address manifest is in `cloudflare/email-routing-plan.json`. The user selected `digitalburjos@gmail.com` as the destination for all seven addresses. This yields one receiving inbox with seven identities; independent personal inboxes would require additional destinations.

## Current verified configuration — 11 October 2026

Cloudflare confirms the Gmail destination is verified, Email Routing is enabled and ready, and all seven requested rules are active with exactly that destination. Existing rules for info, support, shameem and irfanhabeeb were updated; contact, aarifkamal and talha2980 were created. The unrelated enquiry rule and disabled catch-all were preserved. Root MX and the existing Cloudflare SPF record were preserved. A non-enforcing DMARC TXT record (`v=DMARC1; p=none;`) was added because no DMARC record existed; no reporting address or enforcement was enabled.

These are verified routing settings, not proof of inbox delivery. Actual forwarding and Gmail Send mail as remain to be tested. No Gmail inboxes or SMTP passwords were created.

The supplied Cloudflare credential manages routing and DNS. Cloudflare Email Sending was not selected because the user requested a free alternative. Resend's official pricing, checked on 11 October 2026, includes SMTP relay on Free: 3,000 emails per month, 100 per day and 3 custom domains. Those are account-wide limits, including website email usage.

Resend's dashboard showed verified DKIM and `rsend`, with the `send` CNAME pending. Cloudflare contained the new CNAME alongside legacy Amazon SES MX/SPF records at `send.digitalburj.com`. The legacy records were backed up outside the repository and removed. `send` now has only `send.forge.rmta.net`; `rsend` points to `rsend-apne1.forge.rmta.net`. Both are DNS-only. Public DNS confirms the `send` CNAME. Domain-root receiving MX/SPF and existing DKIM were preserved. Resend dashboard verification should be restarted; its final status and authenticated SMTP delivery remain unverified.

## Incoming mail

1. In the Cloudflare account owning `digitalburj.com`, inspect current MX, SPF, DKIM, DMARC, existing routing rules and existing destinations. Preserve any working mail service until its migration is agreed.
2. Open Compute → Email Service → Email Routing. Add each destination Gmail address and have its owner verify the confirmation email. Reuse already verified destinations.
3. Enable routing for the domain using Cloudflare's generated DNS records and priorities. Do not invent DKIM keys or publish a second SPF record. Merge the Cloudflare SPF include with existing authorized senders after checking the DNS lookup limit. Replacing existing MX records changes the receiving mail service.
4. Create exactly one Send to an email rule per requested address, all forwarding to the verified `digitalburjos@gmail.com` destination. Leave catch-all unchanged.
5. Send to each address from a different test account, confirm arrival in the intended inbox, and check Cloudflare routing activity. A saved rule without a verified destination is not working routing.

## Sending from Gmail

Use Resend SMTP with the verified `digitalburj.com` domain:

| Gmail SMTP setting | Value |
| --- | --- |
| Server | `smtp.resend.com` |
| Port | `465` |
| Security | SSL / implicit TLS |
| Username | `resend` |
| Password | A Resend sending API key |

1. In the Resend domain page, select **restart verification** after the DNS correction and confirm every required record is verified. Keep Resend Receiving disabled because incoming mail uses Cloudflare forwarding.
2. Create a Resend sending API key scoped to `digitalburj.com` and enter it directly into Gmail. Do not put it in chat or Git. Seven sender addresses on one domain do not require seven custom domains.
3. In `digitalburjos@gmail.com`, open Settings → See all settings → Accounts and Import → Send mail as → Add another email address. Enter each approved DigitalBurj address and the SMTP settings above. Complete Gmail's verification through the working Cloudflare forwarding rules.
4. Choose the desired default sender and whether to reply from the address the message was sent to. Test each identity to an external recipient and inspect Show original for DKIM/DMARC alignment. Check Resend delivery logs; SMTP acceptance alone does not establish delivery.

The official SMTP settings and prerequisites were checked at https://resend.com/docs/send-with-smtp. Current free-plan limits were checked at https://resend.com/pricing.
DMARC: preserve any existing policy. If none exists, begin with a monitoring policy while validating all legitimate senders; tighten only after alignment is verified. Do not add a report recipient until that receiving address is confirmed working.

## Website forms

The existing `/api/contact`, `/api/lead` and `/api/subscribe` endpoints use Resend. Gmail SMTP setup does not configure those endpoints. Keep their existing production secrets and sender verification. Switching website form delivery to Cloudflare is a separate application integration and requires confirmed Email Sending access.

## Access still required

Routing access and destination verification are complete. Remaining prerequisites are Resend verification restart, a Resend sending API key, Gmail Send mail as configuration and verification, and real delivery tests. The SMTP sending token is entered directly in Gmail. No passwords belong in chat.

Authoritative references checked on 11 October 2026:

- https://developers.cloudflare.com/email-service/api/send-emails/smtp/
- https://developers.cloudflare.com/email-service/get-started/route-emails/
- https://developers.cloudflare.com/email-service/configuration/domains/
- https://developers.cloudflare.com/changelog/2026-06-08-smtp-submission/

Source documentation snapshot: `cloudflare/cloudflare-docs` commit `0d35c2c74e04988223b37747aada4c32d8714a15`. These references establish supported configuration, not that this domain has been onboarded.
