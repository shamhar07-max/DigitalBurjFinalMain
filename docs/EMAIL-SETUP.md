# DigitalBurj email with Cloudflare and Gmail

Requested configuration: three role aliases (`info`, `support`, `contact`) and four personal addresses (`shameem`, `aarifkamal`, `talha2980`, `irfanhabeeb`), all at `digitalburj.com`.

Cloudflare Email Routing forwards incoming messages to existing Gmail inboxes. Cloudflare Email Sending supplies SMTP for Gmail's Send mail as. These are separate configurations. This setup does not create four new hosted inboxes or Google Workspace logins. Each personal address needs an existing destination Gmail inbox.

The seven-address manifest is in `cloudflare/email-routing-plan.json`. The user selected `digitalburjos@gmail.com` as the destination for all seven addresses. This yields one receiving inbox with seven identities; independent personal inboxes would require additional destinations.

## Current verified configuration — 11 October 2026

Cloudflare confirms the Gmail destination is verified, Email Routing is enabled and ready, and all seven requested rules are active with exactly that destination. Existing rules for info, support, shameem and irfanhabeeb were updated; contact, aarifkamal and talha2980 were created. The unrelated enquiry rule and disabled catch-all were preserved. Root MX and the existing Cloudflare SPF record were preserved. A non-enforcing DMARC TXT record (`v=DMARC1; p=none;`) was added because no DMARC record existed; no reporting address or enforcement was enabled.

These are verified routing settings, not proof of inbox delivery. Actual forwarding and Gmail Send mail as remain to be tested. No Gmail inboxes or SMTP passwords were created.

The supplied Cloudflare credential can manage routing and DNS. The authoritative Email Sending subdomains endpoint returned HTTP 401, code 2036, Unauthorized. Sending-domain state and SMTP readiness remain unverified. Ensure Email Sending is enabled on the account and supply a token with the required Email Sending permission through secure settings. Never put the token in Git or chat.

## Incoming mail

1. In the Cloudflare account owning `digitalburj.com`, inspect current MX, SPF, DKIM, DMARC, existing routing rules and existing destinations. Preserve any working mail service until its migration is agreed.
2. Open Compute → Email Service → Email Routing. Add each destination Gmail address and have its owner verify the confirmation email. Reuse already verified destinations.
3. Enable routing for the domain using Cloudflare's generated DNS records and priorities. Do not invent DKIM keys or publish a second SPF record. Merge the Cloudflare SPF include with existing authorized senders after checking the DNS lookup limit. Replacing existing MX records changes the receiving mail service.
4. Create exactly one Send to an email rule per requested address, all forwarding to the verified `digitalburjos@gmail.com` destination. Leave catch-all unchanged.
5. Send to each address from a different test account, confirm arrival in the intended inbox, and check Cloudflare routing activity. A saved rule without a verified destination is not working routing.

## Sending from Gmail

Cloudflare introduced authenticated SMTP submission in June 2026. Current documented settings:

| Gmail SMTP setting | Value |
| --- | --- |
| Server | `smtp.mx.cloudflare.net` |
| Port | `465` |
| Security | SSL / implicit TLS |
| Username | `api_token` (literal text) |
| Password | Cloudflare API token with Email Sending: Edit |

1. Enable Email Sending and onboard `digitalburj.com` under Compute → Email Service → Email Sending. Use the actual records Cloudflare generates, including its sending bounce subdomain and DKIM key. Routing and sending have separate verification states.
2. Confirm domain verification and the account's current sending limits and plan. SMTP is documented as a beta service; use only an account where sending is enabled.
3. Create the sending token securely. Enter it in Gmail's SMTP password field; do not paste it into chat, the manifest, Git, or an environment setup script. A token can send from onboarded domains in its account, so it is an account credential, not a per-address mailbox password.
4. In each recipient's Gmail account, open Settings → See all settings → Accounts and Import → Send mail as → Add another email address. Enter the approved display name and matching DigitalBurj address, then the SMTP settings above. Complete Gmail's verification via the already working forwarding rule.
5. Choose whether to reply from the address the message was sent to and set the desired default sender. Test each identity to an external recipient. Inspect Gmail Show original for aligned DKIM and DMARC results; check Cloudflare sending logs for actual delivery. Do not infer delivery from SMTP acceptance alone.

DMARC: preserve any existing policy. If none exists, begin with a monitoring policy while validating all legitimate senders; tighten only after alignment is verified. Do not add a report recipient until that receiving address is confirmed working.

## Website forms

The existing `/api/contact`, `/api/lead` and `/api/subscribe` endpoints use Resend. Gmail SMTP setup does not configure those endpoints. Keep their existing production secrets and sender verification. Switching website form delivery to Cloudflare is a separate application integration and requires confirmed Email Sending access.

## Access still required

Routing access and destination verification are complete. Remaining prerequisites are Email Sending authorization, sending-domain onboarding/verification, Gmail Send mail as configuration and verification, and real delivery tests. The SMTP sending token is entered directly in Gmail. No passwords belong in chat.

Authoritative references checked on 11 October 2026:

- https://developers.cloudflare.com/email-service/api/send-emails/smtp/
- https://developers.cloudflare.com/email-service/get-started/route-emails/
- https://developers.cloudflare.com/email-service/configuration/domains/
- https://developers.cloudflare.com/changelog/2026-06-08-smtp-submission/

Source documentation snapshot: `cloudflare/cloudflare-docs` commit `0d35c2c74e04988223b37747aada4c32d8714a15`. These references establish supported configuration, not that this domain has been onboarded.
