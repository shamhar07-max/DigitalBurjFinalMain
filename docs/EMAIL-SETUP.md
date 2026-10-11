# DigitalBurj email with Cloudflare and Gmail

Requested configuration: three role aliases (`info`, `support`, `contact`) and four personal addresses (`shameem`, `aarifkamal`, `talha2980`, `irfanhabeeb`), all at `digitalburj.com`.

Cloudflare Email Routing forwards incoming messages to existing Gmail inboxes. Cloudflare Email Sending supplies SMTP for Gmail's Send mail as. These are separate configurations. This setup does not create four new hosted inboxes or Google Workspace logins. Each personal address needs an existing destination Gmail inbox.

The seven-address manifest is in `cloudflare/email-routing-plan.json`. The user selected `digitalburjos@gmail.com` as the destination for all seven addresses. This yields one receiving inbox with seven identities; independent personal inboxes would require additional destinations. No live routing rules, mailbox accounts, DNS changes, or SMTP credentials have been created by this repository change.

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

Configuration requires authorized Cloudflare account/zone access, the destination Gmail mapping, destination owners' verification clicks, and Gmail Send mail as verification. For API-based routing configuration, supply a scoped Cloudflare token through secure environment settings, with the zone/account read access, DNS edit and Email Routing permissions required by the operations. The SMTP sending token is entered directly in Gmail. No passwords belong in chat.

Authoritative references checked on 11 October 2026:

- https://developers.cloudflare.com/email-service/api/send-emails/smtp/
- https://developers.cloudflare.com/email-service/get-started/route-emails/
- https://developers.cloudflare.com/email-service/configuration/domains/
- https://developers.cloudflare.com/changelog/2026-06-08-smtp-submission/

Source documentation snapshot: `cloudflare/cloudflare-docs` commit `0d35c2c74e04988223b37747aada4c32d8714a15`. These references establish supported configuration, not that this domain has been onboarded.
