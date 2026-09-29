/* DigitalBurj Academy — generated from the build pipeline; edit the source templates, not this bundle by hand. */
(function(){
'use strict';
var BODY = "<div class=\"ac\" id=\"ac-root-inner\">\n<div id=\"main\">\n\n<!-- VISITOR / LEARNER / INSTRUCTOR / ADMIN \u2014 all share the catalogue -->\n<section class=\"db-hero\" aria-labelledby=\"page-hero-title\"><hero-reel slides=\"25,12,24\" interval=\"7000\" style=\"position:absolute;inset:0;z-index:-2\"></hero-reel>\n  <div class=\"db-hero-shade\" aria-hidden=\"true\"></div>\n  <div class=\"db-hero-content\"><div class=\"db-hero-grid\">\n    <div>\n      <div class=\"db-hero-eyebrow-row\"><p class=\"db-hero-eyebrow\">DigitalBurj Academy</p><span class=\"db-hero-badge\">Bundles from $3</span></div>\n      <h1 id=\"page-hero-title\" class=\"db-hero-title\">Learn it. Apply it. <span class=\"db-hero-accent\">Prove it.</span></h1>\n      <p class=\"db-hero-lead\">Capability built through real missions, human feedback and assessed evidence \u2014 one-time purchase, lifetime access. Content consumption is never the primary proof of skill.</p>\n      <div class=\"db-hero-actions\">\n        <a class=\"hero-cta primary\" href=\"#bundles\" data-scroll=\"bundles\">Browse bundles<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></a>\n        <a class=\"hero-cta secondary\" href=\"/academy/workspace\">Explore the learner workspace</a>\n      </div>\n    </div>\n    <aside class=\"db-hero-panel\" aria-label=\"Academy overview\">\n      <div class=\"db-panel-head\"><img class=\"db-panel-icon\" src=\"brand/mark-academy.webp\" alt=\"\"/><div><span class=\"db-panel-label\">DigitalBurj \u00b7 Academy</span><strong class=\"db-panel-title\">Learn. Apply. Prove.</strong></div></div>\n      <p class=\"db-panel-note\">The path forward</p>\n      <div style=\"position:relative;display:grid;gap:10px;margin-top:20px\">\n        <div class=\"db-panel-row\"><span style=\"color:#ff8b68\">01</span><span style=\"flex:1\">Bundles from $3 to $50</span><span class=\"db-panel-badge\">\u2197</span></div>\n        <div class=\"db-panel-row\"><span style=\"color:#ff8b68\">02</span><span style=\"flex:1\">12-stage missions, human review</span><span class=\"db-panel-badge\">\u2197</span></div>\n        <div class=\"db-panel-row\"><span style=\"color:#ff8b68\">03</span><span style=\"flex:1\">Independent verification</span><span class=\"db-panel-badge\">\u2197</span></div>\n      </div>\n    </aside>\n  </div></div>\n</section>\n<div class=\"ac-subnav-wrap\"><nav class=\"ac-subnav\" aria-label=\"Academy sections\">\n  <span class=\"lab\">Academy</span>\n  <div class=\"ac-subnav-links\">\n    <a href=\"#bundles\" data-scroll=\"bundles\">Bundles</a><a href=\"#courses\" data-scroll=\"courses\">Courses</a><a href=\"#paths\" data-scroll=\"paths\">Paths</a>\n    <a href=\"#how\" data-scroll=\"how\">How it works</a><a href=\"#assessment\" data-scroll=\"assessment\">Credentials</a><a href=\"#labs\" data-scroll=\"labs\">Tools &amp; labs</a>\n    <a href=\"#pricing\" data-scroll=\"pricing\">Pricing</a><a href=\"#support\" data-scroll=\"support\">Support</a><a class=\"ext\" href=\"/academy/workspace\">Learner workspace \u2192</a>\n  </div>\n  <div class=\"ac-subnav-actions\">\n    <button class=\"cart-btn\" id=\"cartBtn\" aria-label=\"Cart\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" width=\"18\" height=\"18\"><circle cx=\"9\" cy=\"21\" r=\"1\"/><circle cx=\"20\" cy=\"21\" r=\"1\"/><path d=\"M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6\"/></svg><span class=\"badge\" id=\"cartBadge\" style=\"display:none\">0</span></button>\n    <button class=\"btn btn-primary btn-sm\" id=\"signInBtn\">Sign in</button>\n  </div>\n</nav></div>\n<div class=\"role-banner\" id=\"roleBanner\">\n  <div class=\"rb-inner\" style=\"display:flex;align-items:center;justify-content:space-between;gap:12px 16px;flex-wrap:wrap\">\n    <div class=\"rb-tag\"><span class=\"rb-pill\" id=\"rolePill\">Visitor</span><span id=\"roleMessage\">Browsing the public catalogue.</span></div>\n    <div style=\"display:flex;align-items:center;gap:12px;flex-wrap:wrap\">\n      <div class=\"rb-text\" id=\"roleStats\">0 courses owned \u00b7 0 bundles</div>\n      <div class=\"role-switcher\" id=\"roleSwitcher\"><span class=\"rs-label\">Demo view</span>\n        <button class=\"role-btn active\" data-role=\"visitor\">Visitor</button><button class=\"role-btn\" data-role=\"learner\">Learner</button><button class=\"role-btn\" data-role=\"instructor\">Instructor</button><button class=\"role-btn\" data-role=\"admin\">Admin</button></div>\n    </div>\n  </div>\n</div>\n<hr class=\"divider\" />\n\n<!-- BUNDLES -->\n<section class=\"sec\" id=\"bundles\">\n  <div class=\"container\">\n\n    <!-- My Learning strip (visible to learner/instructor/admin when they own things) -->\n    <div class=\"my-learning role-view\" data-role-view=\"owned\">\n      <div class=\"ml-inner\">\n        <div class=\"ml-text\">\n          <h3>Your library</h3>\n          <p>Everything you own or have requested, in one place. Preview access is marked and lives on this device only.</p>\n        </div>\n        <div class=\"ml-stats\">\n          <div class=\"ml-stat\"><b id=\"mlCourses\">0</b><span>Courses</span></div>\n          <div class=\"ml-stat\"><b id=\"mlBundles\">0</b><span>Bundles</span></div>\n          <div class=\"ml-stat\"><b id=\"mlSpent\">$0</b><span>Paid</span></div>\n          <div class=\"ml-stat\"><b id=\"mlEvidence\">0</b><span>Requests</span></div>\n        </div>\n        <div>\n          <button class=\"btn btn-ghost\" id=\"openMyLibrary\">Open library \u2192</button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Course bundles</p>\n      <h2 class=\"h-section\">Buy a bundle. Save up to 70%.</h2>\n      <p class=\"lede\">Every bundle is a one-time purchase with lifetime access. Prices from $3 to $50. Role-based access applies \u2014 instructors and admins see review queues.</p>\n    </div>\n\n    <div class=\"filter-bar reveal d1\" style=\"margin-top:36px\">\n      <div class=\"filter-tabs\" id=\"bundleTabs\">\n        <button class=\"filter-tab active\" data-filter=\"all\">All bundles</button>\n        <button class=\"filter-tab\" data-filter=\"starter\">Starter</button>\n        <button class=\"filter-tab\" data-filter=\"technology\">Technology</button>\n        <button class=\"filter-tab\" data-filter=\"professional\">Professional</button>\n        <button class=\"filter-tab\" data-filter=\"career\">Career</button>\n        <button class=\"filter-tab\" data-filter=\"complete\">Complete</button>\n      </div>\n      <div class=\"search-box\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4.35-4.35\"/></svg>\n        <input type=\"search\" id=\"bundleSearch\" placeholder=\"Search bundles and courses\u2026\">\n      </div>\n    </div>\n\n    <div class=\"bundle-grid\" id=\"bundleGrid\"></div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- INDIVIDUAL COURSES -->\n<section class=\"sec\" id=\"courses\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Individual courses</p>\n      <h2 class=\"h-section\">Buy only what you need.</h2>\n      <p class=\"lede\">Every course is a standalone product with its own price. Bundles are cheaper per course \u2014 but you can start small.</p>\n    </div>\n    <div class=\"course-grid\" id=\"courseGrid\" style=\"margin-top:44px\"></div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- INSTRUCTOR VIEW -->\n<section class=\"sec role-view\" data-role-view=\"instructor\">\n  <div class=\"container\">\n    <div class=\"sec-head\">\n      <p class=\"eyebrow\">Instructor workspace</p>\n      <h2 class=\"h-section\">Review queue &amp; cohort</h2>\n      <p class=\"lede\">Instructors see submissions from the courses and bundles they are assigned to, apply the published rubric, and give criterion-specific feedback.</p>\n      <p class=\"disclaimer\"><b>Demo data.</b> Learners, submissions and figures on this view are fictional. Demo roles hold no production privileges and never unlock paid content.</p>\n    </div>\n\n    <div class=\"admin-stats\">\n      <div class=\"admin-stat\"><div class=\"as-label\">Open reviews</div><div class=\"as-value\">7</div><div class=\"as-delta\">2 awaiting resubmission</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Cohort size</div><div class=\"as-value\">38</div><div class=\"as-delta\">+9 this month</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Avg turnaround</div><div class=\"as-value\">1.8d</div><div class=\"as-delta\">Target 2.0d</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Rubric agreement</div><div class=\"as-value\">89%</div><div class=\"as-delta\">Calibrated</div></div>\n    </div>\n\n    <div class=\"instructor-grid\" id=\"instructorReviews\"></div>\n  </div>\n</section>\n\n<!-- ADMIN VIEW -->\n<section class=\"sec role-view\" data-role-view=\"admin\">\n  <div class=\"container\">\n    <div class=\"sec-head\">\n      <p class=\"eyebrow\">Admin console</p>\n      <h2 class=\"h-section\">Catalogue, learners, revenue</h2>\n      <p class=\"lede\">Full platform view \u2014 programme status, entitlement grants, revenue, verification queue and role management.</p>\n      <p class=\"disclaimer\"><b>Demo data.</b> Every figure on this view is fictional. Real entitlements are granted by the team from confirmed payments; the Demo Admin cannot grant, revoke or unlock anything.</p>\n    </div>\n\n    <div class=\"admin-stats\">\n      <div class=\"admin-stat\"><div class=\"as-label\">Active learners</div><div class=\"as-value\">142</div><div class=\"as-delta\">\u2191 38 this month</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Revenue (30d)</div><div class=\"as-value\">$4,820</div><div class=\"as-delta\">\u2191 22% MoM</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Live programmes</div><div class=\"as-value\">10</div><div class=\"as-delta\">2 in pilot</div></div>\n      <div class=\"admin-stat\"><div class=\"as-label\">Verification queue</div><div class=\"as-value\">3</div><div class=\"as-delta\">Conflict-checked</div></div>\n    </div>\n\n    <div class=\"grid g-2\" style=\"margin-top:24px\">\n      <div class=\"card card-pad\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px\">\n        <h3 style=\"font-size:15px;font-weight:800;color:var(--navy);margin:0 0 14px\">Bundle performance</h3>\n        <table style=\"width:100%;border-collapse:collapse;font-size:13px\">\n          <thead>\n            <tr style=\"text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--slate-3);font-weight:800\">\n              <th style=\"padding:8px 0;border-bottom:1px solid var(--line-2)\">Bundle</th>\n              <th style=\"padding:8px 0;border-bottom:1px solid var(--line-2);text-align:right\">Price</th>\n              <th style=\"padding:8px 0;border-bottom:1px solid var(--line-2);text-align:right\">Sales</th>\n              <th style=\"padding:8px 0;border-bottom:1px solid var(--line-2);text-align:right\">Revenue</th>\n            </tr>\n          </thead>\n          <tbody id=\"adminBundleTable\"></tbody>\n        </table>\n      </div>\n      <div class=\"card card-pad\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px\">\n        <h3 style=\"font-size:15px;font-weight:800;color:var(--navy);margin:0 0 14px\">Role permissions</h3>\n        <div style=\"display:flex;flex-direction:column;gap:10px;font-size:13px\">\n          <div style=\"display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-2)\"><span><b style=\"color:var(--navy)\">Visitor</b></span><span style=\"color:var(--slate-2);font-size:12px\">Browse only</span></div>\n          <div style=\"display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-2)\"><span><b style=\"color:var(--navy)\">Learner</b></span><span style=\"color:var(--slate-2);font-size:12px\">Owned courses only</span></div>\n          <div style=\"display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-2)\"><span><b style=\"color:var(--navy)\">Instructor</b></span><span style=\"color:var(--slate-2);font-size:12px\">Assigned cohort reviews</span></div>\n          <div style=\"display:flex;justify-content:space-between;padding:10px 0\"><span><b style=\"color:var(--navy)\">Admin</b></span><span style=\"color:var(--slate-2);font-size:12px\">Full platform access</span></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n\n<hr class=\"divider\" />\n\n<!-- LEARNING PATHS -->\n<section class=\"sec\" id=\"paths\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Learning paths</p>\n      <h2 class=\"h-section\">Routes, prerequisites and what unlocks next.</h2>\n      <p class=\"lede\">Each path connects programmes in order. Take the diagnostic and we recommend a first step from your experience, goal, weekly time and target market.</p>\n      <div class=\"btn-row\" style=\"justify-content:center\"><button class=\"btn btn-primary\" id=\"openDiagnostic\">Take the diagnostic <span class=\"arrow\">\u2192</span></button></div>\n    </div>\n    <div class=\"path-grid\" id=\"pathGrid\"></div>\n    <div class=\"disclaimer\"><b>Foundation bypass rule.</b> A valid foundation bypass may skip introductory content, but it can never skip assessment, evidence, verification, safety or regulatory content. International Workplace Readiness and the Advanced Professional pathways are separate products and are not included in these bundles.</div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- HOW LEARNING WORKS -->\n<section class=\"sec\" id=\"how\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">How learning works</p>\n      <h2 class=\"h-section\">Every mission runs the same 12 stages.</h2>\n      <p class=\"lede\">Diagnostic, missions, stages, assessment, evidence and progression. Every mission states its scenario, task type, constraints, deliverables, evidence, definition of done, effort, tools, failure cases, rubric, checkpoints and next action.</p>\n    </div>\n    <div class=\"stage-rail\" id=\"stageRail\"></div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- ASSESSMENT & CREDENTIALS -->\n<section class=\"sec\" id=\"assessment\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Assessment &amp; credentials</p>\n      <h2 class=\"h-section\">Learning, assessment and verification are separate claims.</h2>\n      <p class=\"lede\">Completing learning does not by itself establish independent verification, production delivery, employment, licensing, accreditation or workplace experience.</p>\n    </div>\n\n    <div class=\"card-box\" style=\"margin-top:36px\">\n      <h3>Submission lifecycle</h3>\n      <div class=\"chip-row\" id=\"lifecycleChips\"></div>\n      <p>Learners submit and revise; reviewers evaluate assigned work; verifiers decide independently within scope; admins govern configuration. Reviewers cannot verify their own approvals, and verifiers cannot verify work they reviewed, approved, coached or have a declared relationship with.</p>\n    </div>\n\n    <div class=\"cap-grid\" id=\"capGrid\"></div>\n\n    <div class=\"grid g-2\" style=\"margin-top:16px\">\n      <div class=\"card-box\">\n        <h3>Four records that stay visibly separate</h3>\n        <div class=\"list-rows\" style=\"margin-top:10px\">\n          <div class=\"r\"><div><b>Completion Record</b><small>You finished the learning activity.</small></div></div>\n          <div class=\"r\"><div><b>Assessed Submission</b><small>A reviewer scored your work against the published rubric.</small></div></div>\n          <div class=\"r\"><div><b>Independently Verified Capability</b><small>A different qualified person verified the evidence, with a conflict check.</small></div></div>\n          <div class=\"r\"><div><b>Actual Workplace Experience</b><small>Real delivery in a real workplace \u2014 never created by a course.</small></div></div>\n        </div>\n      </div>\n      <div class=\"card-box\">\n        <h3>DB-22 Assessment Centre <span class=\"pill warn\" style=\"margin-left:6px\">Setup required</span></h3>\n        <p>Not attendance-based. Readiness and prerequisites \u2192 assessment contract \u2192 constrained build or demo window \u2192 injected incidents \u2192 live defence \u2192 evidence pack, evaluator notes, approval \u2192 independent verification \u2192 audit log, appeals \u2192 Capability Record.</p>\n        <p>Scheduling, constrained environments, incident injection, evaluator workflows, secure evidence storage and appeals are configured per cohort before the challenge opens.</p>\n      </div>\n    </div>\n\n    <div class=\"grid g-3\" style=\"margin-top:16px\">\n      <div class=\"card-box\"><h3>Attempt history &amp; failure passport</h3><p>Submissions, revisions, feedback, corrections, timestamps and rubric results are kept. The Failure Passport records useful failures, causes, corrections and lessons \u2014 never as a negative employment claim.</p></div>\n      <div class=\"card-box\"><h3>Appeals</h3><p>A defined appeal route for reviews, verification, evidence and records, with review ownership, status, decision and audit trail.</p></div>\n      <div class=\"card-box\"><h3>Consent &amp; talent profile</h3><p>Evidence is private by default. The optional Talent Profile is shared only with your explicit consent and only for the stated purpose.</p></div>\n    </div>\n    <div class=\"disclaimer\"><b>Not a promise of employment or accreditation.</b> Participation does not automatically provide employment, a visa, a licence, accreditation, regulatory approval, professional-authority recognition, job matching, workplace experience or a guaranteed outcome.</div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- TOOLS & LABS -->\n<section class=\"sec\" id=\"labs\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Tool library &amp; simulation labs</p>\n      <h2 class=\"h-section\">Practise with real tools and fictional data.</h2>\n      <p class=\"lede\">A tool is marked Configured only after its permitted use, URL, entitlement, privacy handling and test path are confirmed. Labs use fictional data and are never access to live customer, employer, government, banking, healthcare or production systems.</p>\n    </div>\n    <div class=\"grid g-2\" style=\"margin-top:36px\">\n      <div class=\"card-box\"><h3>Dedicated tool library</h3><div class=\"list-rows\" id=\"toolRows\" style=\"margin-top:10px\"></div></div>\n      <div class=\"card-box\"><h3>Simulation labs</h3><div class=\"list-rows\" id=\"labRows\" style=\"margin-top:10px\"></div>\n        <p style=\"margin-top:14px\">Every lab requires a maturity level, scenario, task queue, fictional records, templates, exceptions, escalation, rubric, evidence pack, reset action, jurisdiction warning, owner and review date.</p></div>\n    </div>\n    <div class=\"btn-row\" style=\"justify-content:center\"><a class=\"btn btn-ghost\" href=\"/academy/workspace#toolbench\">Open the demo Tool Bench \u2192</a></div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- PRICING & ACCESS -->\n<section class=\"sec\" id=\"pricing\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Pricing &amp; access</p>\n      <h2 class=\"h-section\">Paid access is separate from signing in.</h2>\n      <p class=\"lede\">Signing in, registering, previewing or using a demo role never unlocks paid content. Access follows an active entitlement created from a confirmed payment. Only Live products are purchasable.</p>\n    </div>\n    <div class=\"grid g-2\" style=\"margin-top:36px\">\n      <div class=\"card-box\"><h3>Access states</h3><div class=\"list-rows\" style=\"margin-top:10px\">\n        <div class=\"r\"><div><b>Preview</b><small>Public or free content only.</small></div><span class=\"pill neutral\">Free</span></div>\n        <div class=\"r\"><div><b>Payment required</b><small>No active paid entitlement exists.</small></div><span class=\"pill warn\">Locked</span></div>\n        <div class=\"r\"><div><b>Checkout ready</b><small>Product and payable amount are prepared for confirmation.</small></div><span class=\"pill cool\">Ready</span></div>\n        <div class=\"r\"><div><b>Payment pending / failed</b><small>Outcome unresolved or unsuccessful \u2014 access is never granted.</small></div><span class=\"pill warn\">Pending</span></div>\n        <div class=\"r\"><div><b>Active \u00b7 Expired \u00b7 Refunded \u00b7 Suspended</b><small>Entitlement is active, ended, refunded or administratively paused.</small></div><span class=\"pill ok\">Entitlement</span></div>\n        <div class=\"r\"><div><b>Setup required</b><small>A production service is not yet configured.</small></div><span class=\"pill stop\">Setup</span></div>\n      </div></div>\n      <div class=\"card-box\"><h3>What you get, what you pay</h3><div class=\"list-rows\" style=\"margin-top:10px\">\n        <div class=\"r\"><div><b>One-time purchase, lifetime access</b><small>No subscription. Courses from $3, bundles from $3 to $50.</small></div></div>\n        <div class=\"r\"><div><b>Upgrade credit</b><small>Owning a course then buying a bundle that includes it: you pay the difference.</small></div></div>\n        <div class=\"r\"><div><b>Promotion code</b><small>Enter it at checkout. It applies only to Live products, needs your explicit confirmation and can be used once per product.</small></div></div>\n        <div class=\"r\"><div><b>Refunds</b><small>Within 14 days, provided no assessment has been submitted.</small></div></div>\n        <div class=\"r\"><div><b>Taxes &amp; fees</b><small>Currency, taxes and fees are shown before you confirm.</small></div></div>\n      </div>\n      <div class=\"btn-row\"><button class=\"btn btn-primary btn-sm\" data-scroll=\"bundles\">Browse bundles</button><button class=\"btn btn-ghost btn-sm\" id=\"pricingCart\">Open cart</button></div></div>\n    </div>\n    <div class=\"disclaimer\"><b>Payment status.</b> Online card payment is not switched on yet. Checkout submits an enrolment request to the Academy team, who confirm payment steps and grant access by email. The site never shows a payment as successful until it is.</div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- SUPPORT -->\n<section class=\"sec\" id=\"support\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Support</p>\n      <h2 class=\"h-section\">Get help \u2014 including accessibility and appeals.</h2>\n      <p class=\"lede\">Categories: Account, Payment, Course, Assessment, Technical, Refund, Accessibility and Appeal. Ticket states: Submitted \u2192 In Progress \u2192 Waiting for Learner \u2192 Resolved \u2192 Closed.</p>\n    </div>\n    <form class=\"support-form\" id=\"supportForm\" novalidate>\n      <div class=\"field-row\">\n        <div class=\"field\"><label for=\"sp-name\">Name</label><input id=\"sp-name\" type=\"text\" autocomplete=\"name\" /><span class=\"err\">Please enter your name.</span></div>\n        <div class=\"field\"><label for=\"sp-email\">Email</label><input id=\"sp-email\" type=\"email\" autocomplete=\"email\" /><span class=\"err\">Please enter a valid email.</span></div>\n      </div>\n      <div class=\"field\"><label for=\"sp-topic\">Category</label><select id=\"sp-topic\"></select></div>\n      <div class=\"field\"><label for=\"sp-msg\">How can we help?</label><textarea id=\"sp-msg\" placeholder=\"Describe the issue. Never include passwords or API keys.\"></textarea><span class=\"err\">Please add a short description (10+ characters).</span></div>\n      <input type=\"text\" id=\"sp-website\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\" style=\"position:absolute;left:-9999px\" />\n      <button class=\"btn btn-primary\" type=\"submit\" id=\"sp-submit\">Submit case</button>\n      <div class=\"cases\" id=\"supportCases\" aria-live=\"polite\"></div>\n    </form>\n    <div class=\"grid g-3\" style=\"margin-top:36px\">\n      <div class=\"card-box\"><h3>Accessibility</h3><p>Keyboard Enter and Space controls, visible focus, labelled fields, meaningful structure, status announcements and accessible errors across supported screen sizes.</p></div>\n      <div class=\"card-box\"><h3>Privacy</h3><p>Consent, private-by-default evidence, controlled sharing, retention rules and no silent data deletion.</p></div>\n      <div class=\"card-box\"><h3>Security</h3><p>No passwords or API keys in the browser, role separation, least privilege and audit trails. Access is enforced by the server, not by hiding the interface.</p></div>\n    </div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- FEATURES -->\n<section class=\"sec\" id=\"features\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Why DigitalBurj Academy</p>\n      <h2 class=\"h-section\">Built for proof, not seats.</h2>\n      <p class=\"lede\">Most platforms measure attendance. We measure what you can demonstrably do \u2014 with evidence you own.</p>\n    </div>\n    <div class=\"feature-grid\">\n      <div class=\"feature reveal\">\n        <div class=\"f-icon\">12</div>\n        <h3>12-stage mission lifecycle</h3>\n        <p>BRIEF \u2192 LEARN \u2192 INVESTIGATE \u2192 TRY \u2192 BUILD \u2192 BREAK \u2192 FIX \u2192 TEST \u2192 EXPLAIN \u2192 DEFEND \u2192 SHIP \u2192 EVIDENCE. Every mission follows the same spine.</p>\n      </div>\n      <div class=\"feature reveal d1\">\n        <div class=\"f-icon\">5</div>\n        <h3>Five layers of proof</h3>\n        <p>Knowledge check, practical mission, project assessment, human review, independent verification. Each layer is a separate record.</p>\n      </div>\n      <div class=\"feature reveal d2\">\n        <div class=\"f-icon\">\u2713</div>\n        <h3>Evidence you own</h3>\n        <p>Original artifacts, versions, review notes, outcome mapping, provenance and consent-controlled visibility. Private until you opt in.</p>\n      </div>\n      <div class=\"feature reveal\">\n        <div class=\"f-icon\">$</div>\n        <h3>One-time purchase, lifetime access</h3>\n        <p>No subscription. Bundles from $3 to $50. Individual courses from $3. Own what you buy.</p>\n      </div>\n      <div class=\"feature reveal d1\">\n        <div class=\"f-icon\">\u25d0</div>\n        <h3>Human review, not AI grading</h3>\n        <p>Every assessment is reviewed by a qualified human against a published rubric. AI may coach; it never issues a credential.</p>\n      </div>\n      <div class=\"feature reveal d2\">\n        <div class=\"f-icon\">\u2699</div>\n        <h3>Role-based access</h3>\n        <p>Learners see what they own. Instructors see their cohort. Admins see the platform. Access is server-enforced, not hidden in the UI.</p>\n      </div>\n    </div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- ROLES -->\n<section class=\"sec\" id=\"roles\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">Role-based access</p>\n      <h2 class=\"h-section\">Four roles. One platform.</h2>\n      <p class=\"lede\">Use the Demo view switch in the header to preview each role. Previewing a role never changes what you own \u2014 purchases and entitlements determine what a learner can open.</p>\n    </div>\n    <div class=\"grid g-4\" style=\"margin-top:44px\">\n      <div class=\"reveal\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;cursor:pointer\" data-role-card=\"visitor\">\n        <span class=\"pill neutral\">Visitor</span>\n        <h3 style=\"font-size:16px;margin-top:12px;letter-spacing:-.015em\">Browse the catalogue</h3>\n        <p style=\"font-size:13px;color:var(--slate-2);line-height:1.6;margin-top:8px\">See every bundle and course. Content stays locked until you purchase or sign in.</p>\n      </div>\n      <div class=\"reveal d1\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;cursor:pointer\" data-role-card=\"learner\">\n        <span class=\"pill cool\">Learner</span>\n        <h3 style=\"font-size:16px;margin-top:12px;letter-spacing:-.015em\">Your owned content</h3>\n        <p style=\"font-size:13px;color:var(--slate-2);line-height:1.6;margin-top:8px\">Unlocked courses, missions, evidence vault, credentials and support. Locked items show a lock.</p>\n      </div>\n      <div class=\"reveal d2\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;cursor:pointer\" data-role-card=\"instructor\">\n        <span class=\"pill warn\">Instructor</span>\n        <h3 style=\"font-size:16px;margin-top:12px;letter-spacing:-.015em\">Review &amp; cohort</h3>\n        <p style=\"font-size:13px;color:var(--slate-2);line-height:1.6;margin-top:8px\">Assigned submissions, rubrics, cohort progress, announcements and live sessions.</p>\n      </div>\n      <div class=\"reveal d3\" style=\"background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;cursor:pointer\" data-role-card=\"admin\">\n        <span class=\"pill purple\">Admin</span>\n        <h3 style=\"font-size:16px;margin-top:12px;letter-spacing:-.015em\">Full platform</h3>\n        <p style=\"font-size:13px;color:var(--slate-2);line-height:1.6;margin-top:8px\">Catalogue, learners, entitlements, revenue, verification queue, roles and settings.</p>\n      </div>\n    </div>\n  </div>\n</section>\n\n<hr class=\"divider\" />\n\n<!-- FAQ -->\n<section class=\"sec\" id=\"faq\">\n  <div class=\"container\">\n    <div class=\"sec-head center reveal\">\n      <p class=\"eyebrow center\">FAQ</p>\n      <h2 class=\"h-section\">Questions we get asked.</h2>\n    </div>\n    <div class=\"faq reveal d1\" style=\"margin-top:44px\">\n      <details><summary>How much do bundles cost? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Bundles range from <strong>$3</strong> (Starter Pack) to <strong>$50</strong> (Complete Academy). Individual courses are also available from $3. Every purchase is one-time with lifetime access.</p></div></details>\n      <details><summary>What does \"purchase-based usage\" mean? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>You only see the content you have purchased. Buy a bundle and every course inside it unlocks for your account. Buy a single course and only that course unlocks. There is no subscription and no recurring charge.</p></div></details>\n      <details><summary>Can I upgrade from a course to a bundle? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Yes. When you own a course and later buy a bundle that includes it, you are charged the bundle price minus the value of the course you already own. The upgrade is calculated at checkout.</p></div></details>\n      <details><summary>Who reviews my work? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>A qualified human assessor assigned to your mission. Independent verification is a separate step by a different qualified person with a declared conflict check. AI may assist with coaching but never issues a credential.</p></div></details>\n      <details><summary>Can my employer see my learning? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Not by default. Employer views are tenant-scoped and only show aggregate progress and the evidence you have explicitly consented to share. Private attempts and failures stay private.</p></div></details>\n      <details><summary>What if I fail a mission? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Failed attempts lead to targeted remediation and a new variant. Unlimited retries of the same answer do not establish transfer. A pass normally requires all critical safety criteria, at least \"independent-in-scenario\" on required outcomes, a valid artifact and an explain/defend response.</p></div></details>\n      <details><summary>Is there a refund policy? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Yes. Bundles and courses are refundable within 14 days provided no assessment has been submitted. Once a mission submission has been assessed, the entitlement is consumed. Refund terms are published at checkout.</p></div></details>\n      <details><summary>How do roles work? <span class=\"plus\"></span></summary><div class=\"faq-body\"><p>Visitors browse. Learners see what they own. Instructors see their assigned cohort and review queue. Admins see the full platform. Role access is enforced server-side, not hidden in the UI.</p></div></details>\n    </div>\n  </div>\n</section>\n\n<!-- CTA -->\n<section class=\"final-cta\">\n  <div class=\"container reveal\">\n    <p class=\"pre\">A skill you cannot demonstrate is a skill you cannot claim.</p>\n    <h2 class=\"h-display\" style=\"max-width:16ch;margin-inline:auto\">Learn it. Apply it. Prove it.</h2>\n    <p style=\"color:rgba(255,255,255,.72);font-size:15px;margin:22px auto 0;max-width:52ch;line-height:1.65\">Start with the $3 Starter Pack. Upgrade to a bundle whenever you're ready \u2014 you only pay the difference.</p>\n    <div class=\"btn-row\">\n      <a class=\"btn btn-primary\" href=\"#bundles\" data-scroll=\"bundles\">Browse bundles <span class=\"arrow\">\u2192</span></a>\n      <a class=\"btn btn-ghost\" href=\"#courses\" data-scroll=\"courses\">Browse courses</a>\n    </div>\n  </div>\n</section>\n\n</div>\n\n<div class=\"ac-linkstrip\"><div class=\"container\"><b>DigitalBurj Academy</b><a id=\"openLibraryFooter\" href=\"#bundles\">My library</a><a id=\"footSignIn\" href=\"#\">Sign in</a><a href=\"#support\" data-scroll=\"support\">Support</a><a href=\"#faq\" data-scroll=\"faq\">FAQ</a><a href=\"/academy/workspace\">Learner workspace</a><a href=\"#\" data-notice=\"Privacy\">Privacy</a><a href=\"#\" data-notice=\"Terms\">Terms</a><a href=\"#\" data-notice=\"Security\">Security</a></div></div>\n\n<!-- MODAL -->\n<div class=\"modal-bg\" id=\"modalBg\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modalTitle\" aria-hidden=\"true\">\n  <div class=\"modal\" id=\"modalBox\">\n    <div class=\"modal-head\">\n      <div>\n        <p style=\"font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin:0 0 8px\" id=\"modalKicker\"></p>\n        <h3 id=\"modalTitle\"></h3>\n      </div>\n      <button class=\"modal-close\" id=\"modalClose\" aria-label=\"Close\">\u2715</button>\n    </div>\n    <div id=\"modalBody\"></div>\n  </div>\n</div>\n\n<!-- TOAST -->\n<div class=\"toast\" id=\"toast\"><span class=\"toast-dot\"></span><span id=\"toastMsg\"></span></div>\n\n</div>";
function run(){

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

  /* ============================================================
     COURSES (master record)
     ============================================================ */
  var COURSES = DBA.COURSES, BUNDLES = DBA.BUNDLES;

  /* ============================================================
     STATE
     ============================================================ */
  var STORE_KEY = 'db-academy-store-v1';
  var STATE = loadState();
  function loadState(){
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) return migrate(JSON.parse(raw));
    } catch(e){}
    return migrate({
      role:'visitor',
      signedIn:false,
      name:'Guest',
      entitlements:[], // array of bundle ids and course ids
      cart:[],
      purchases:[],
      bundleFilter:'all',
      search:''
    });
  }
  function migrate(st){
    st.email = st.email || ''; st.orders = st.orders || []; st.redeemed = st.redeemed || []; st.previewOnly = st.previewOnly || [];
    st.waitlist = st.waitlist || []; st.supportRefs = st.supportRefs || []; st.diagnostic = st.diagnostic || null;
    st.entitlements = st.entitlements || []; st.cart = st.cart || []; st.purchases = st.purchases || [];
    return st;
  }
  function saveState(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(STATE)); } catch(e){} }

  /* ============================================================
     HELPERS
     ============================================================ */
  function ownsCourse(courseId){
    if (STATE.entitlements.indexOf(courseId) > -1) return true;
    // check if owned via a bundle
    for (var i = 0; i < STATE.entitlements.length; i++){
      var b = BUNDLES.filter(function(x){ return x.id === STATE.entitlements[i]; })[0];
      if (b && b.includes.indexOf(courseId) > -1) return true;
    }
    return false;
  }
  function ownsBundle(bundleId){
    return STATE.entitlements.indexOf(bundleId) > -1;
  }
  function courseValue(courseId){
    var c = COURSES.filter(function(x){ return x.id === courseId; })[0];
    return c ? c.price : 0;
  }
  function bundleValue(bundle){ return bundle.price; }
  function computeUpgrade(bundle){
    // if learner already owns some courses in bundle, discount their value
    var ownedValue = 0;
    bundle.includes.forEach(function(cid){
      if (paidCourseIds().indexOf(cid) > -1) ownedValue += courseValue(cid);
    });
    var adjusted = Math.max(0, bundle.price - ownedValue);
    return { original: bundle.price, adjusted: adjusted, discount: ownedValue };
  }
  function money(n){ return '$' + (Math.round(n * 100) / 100).toFixed(n % 1 === 0 ? 0 : 2); }

  /* ============================================================
     TOAST
     ============================================================ */
  var toastTimer = null;
  function toast(msg, ok){
    var t = $('#toast'); $('#toastMsg').textContent = msg;
    t.classList.toggle('ok', !!ok);
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('on'); }, 3200);
  }

  /* ============================================================
     MODAL
     ============================================================ */
  var mBg = $('#modalBg'), mT = $('#modalTitle'), mK = $('#modalKicker'), mB = $('#modalBody');
  function openModal(kicker, title, html, wide){
    mK.textContent = kicker; mT.textContent = title; mB.innerHTML = html;
    $('#modalBox').classList.toggle('modal-wide', !!wide);
    mBg.classList.add('open'); mBg.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ $('#modalClose').focus(); }, 60);
  }
  function closeModal(){
    mBg.classList.remove('open'); mBg.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  $('#modalClose').addEventListener('click', closeModal);
  mBg.addEventListener('click', function(e){ if (e.target === mBg) closeModal(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeModal(); closeMobile(); } });

  /* ============================================================
     HEADER / MOBILE
     ============================================================ */
  function closeMobile(){}

  $$('[data-scroll]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById(a.dataset.scroll);
      if (target){ closeMobile(); target.scrollIntoView({ behavior:'smooth', block:'start' }); if (history.replaceState) history.replaceState(null, '', '#' + a.dataset.scroll); }
    });
  });

  /* ============================================================
     ROLE SWITCHING
     ============================================================ */
  var ROLE_INFO = {
    visitor: { pill:'Visitor', message:'Browsing the public catalogue. Paid content unlocks only from an active entitlement.' },
    learner: { pill:'Learner', message:'Demo Learner preview. Only content you own is unlocked.' },
    instructor: { pill:'Instructor', message:'Demo Instructor preview. Fictional review queue and cohort below.' },
    admin: { pill:'Admin', message:'Demo Admin preview. Fictional data — nothing is granted or unlocked.' }
  };
  function setRole(role, silent){
    STATE.role = role;
    saveState();
    $$('.role-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.role === role); });
    $('#rolePill').textContent = ROLE_INFO[role].pill;
    $('#roleMessage').textContent = ROLE_INFO[role].message;
    // role views
    $$('[data-role-view]').forEach(function(v){
      var active = false;
      if (v.dataset.roleView === role) active = true;
      if (v.dataset.roleView === 'owned' && (role === 'learner' || role === 'instructor' || role === 'admin') && STATE.entitlements.length > 0) active = true;
      v.classList.toggle('active', active);
    });
    renderAll();
    if (!silent) toast('Viewing as ' + ROLE_INFO[role].pill + '.');
  }
  $$('.role-btn').forEach(function(b){
    b.addEventListener('click', function(){ setRole(b.dataset.role); });
  });
  $$('[data-role-card]').forEach(function(c){
    c.addEventListener('click', function(){ setRole(c.dataset.roleCard); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
  });

  /* ============================================================
     RENDER — BUNDLES
     ============================================================ */
  var bundleGrid = $('#bundleGrid');
  function bundleMatchesFilter(b, f){
    if (f === 'all') return true;
    if (f === 'starter') return b.category === 'starter';
    return b.category === f;
  }
  function renderBundles(){
    bundleGrid.innerHTML = '';
    var f = STATE.bundleFilter;
    var q = STATE.search.toLowerCase();
    var list = BUNDLES.filter(function(b){
      if (!bundleMatchesFilter(b, f)) return false;
      if (!q) return true;
      return (b.name + ' ' + b.tagline + ' ' + b.desc + ' ' + b.includes.join(' ')).toLowerCase().indexOf(q) > -1;
    });
    if (!list.length){
      bundleGrid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No bundles match</h3><p>Try a different filter or search term.</p></div>';
      return;
    }
    list.forEach(function(b, i){
      var owned = ownsBundle(b.id);
      var card = el('article', 'bundle-card reveal ' + b.theme + (b.featured ? ' featured' : ''));
      if (i < 3) card.classList.add('in');
      else { card.classList.add('d' + (i % 3)); }
      card.innerHTML =
        '<div class="bundle-visual"><div class="bv-icon">' + esc(b.name.slice(0,1)) + '</div></div>' +
        '<div class="bundle-body">' +
          '<div class="bundle-meta"><span>' + esc(b.tagline) + '</span>' + (owned ? '<span class="pill ' + (STATE.previewOnly.indexOf(b.id) > -1 ? 'warn' : 'ok') + '">' + (STATE.previewOnly.indexOf(b.id) > -1 ? 'Preview' : 'Owned') + '</span>' : (DBA.bundleStatus(b) === 'live' ? '<span class="pill neutral">' + b.includes.length + (b.includes.length === 1 ? ' course' : ' courses') + '</span>' : '<span class="pill warn">Opens soon</span>')) + '</div>' +
          '<h3>' + esc(b.name) + '</h3>' +
          '<p class="bundle-desc">' + esc(b.desc) + '</p>' +
          '<div class="bundle-includes">' +
            '<div class="bi-label">Includes</div>' +
            '<ul>' + b.includes.slice(0,5).map(function(cid){
              var c = COURSES.filter(function(x){ return x.id === cid; })[0];
              return '<li>' + esc(c ? c.title : cid) + '</li>';
            }).join('') +
            (b.includes.length > 5 ? '<li>+ ' + (b.includes.length - 5) + ' more courses</li>' : '') +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="bundle-foot">' +
          '<div class="bundle-price">' +
            '<span class="bp-now">' + money(b.price) + '</span>' +
            (b.savings ? '<span class="bp-old">' + esc(b.savings) + '</span>' : '<span class="bp-old">one-time purchase</span>') +
            '<span class="bp-save">' + (owned ? 'Unlocked' : 'Lifetime access') + '</span>' +
          '</div>' +
          '<div class="bundle-actions">' +
            '<button class="btn btn-ghost btn-sm" data-view-bundle="' + esc(b.id) + '">Details</button>' +
            (owned
              ? '<button class="btn btn-navy btn-sm" data-open-bundle="' + esc(b.id) + '">Open →</button>'
              : (DBA.bundleStatus(b) === 'live'
                  ? '<button class="btn btn-primary btn-sm" data-buy-bundle="' + esc(b.id) + '">Buy now</button>'
                  : '<button class="btn btn-ghost btn-sm" data-waitlist="' + esc(b.id) + '">Join waitlist</button>')) +
          '</div>' +
        '</div>';
      bundleGrid.appendChild(card);
    });
    // wire
    $$('[data-view-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleModal(b.dataset.viewBundle); }); });
    $$('[data-buy-bundle]').forEach(function(b){ b.addEventListener('click', function(){ addToCart(b.dataset.buyBundle); }); });
    $$('#bundleGrid [data-waitlist]').forEach(function(b){ b.addEventListener('click', function(){ openWaitlist(b.dataset.waitlist); }); });
    $$('[data-open-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleContent(b.dataset.openBundle); }); });
    observeReveals(bundleGrid);
  }

  function openBundleModal(bundleId){
    var b = BUNDLES.filter(function(x){ return x.id === bundleId; })[0];
    if (!b) return;
    var up = computeUpgrade(b);
    var owned = ownsBundle(b.id);
    var coursesHtml = b.includes.map(function(cid){
      var c = COURSES.filter(function(x){ return x.id === cid; })[0];
      if (!c) return '';
      var owned2 = ownsCourse(cid);
      return '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--line-2)">' +
        '<div><div style="font-size:13px;font-weight:700;color:var(--navy)">' + esc(c.title) + '</div>' +
        '<div style="font-size:11px;color:var(--slate-3);margin-top:2px">' + esc(c.id) + ' · ' + esc(c.level) + ' · ' + c.hours + ' hrs</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center">' + (owned2 ? '<span class="pill ok">Owned</span>' : '<span style="font-size:13px;font-weight:800;color:var(--navy)">' + money(c.price) + '</span>') + '</div>' +
      '</div>';
    }).join('');
    var totalIndividual = b.includes.reduce(function(s, cid){ return s + courseValue(cid); }, 0);
    var html =
      '<p>' + esc(b.desc) + '</p>' +
      '<div style="display:flex;gap:14px;margin-top:18px;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Bundle price</div>' +
          '<div style="font-size:26px;font-weight:800;color:var(--navy);letter-spacing:-.03em">' + money(up.adjusted) + '</div>' +
          (up.discount > 0 ? '<div style="font-size:11px;font-weight:700;color:var(--ok);margin-top:4px">' + money(up.discount) + ' credit applied</div>' : '') +
        '</div>' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Individual total</div>' +
          '<div style="font-size:26px;font-weight:800;color:var(--slate-3);letter-spacing:-.03em;text-decoration:line-through">' + money(totalIndividual) + '</div>' +
          '<div style="font-size:11px;font-weight:700;color:var(--ok);margin-top:4px">Save ' + money(totalIndividual - up.adjusted) + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:140px;background:var(--bg);border:1px solid var(--line-2);border-radius:10px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Access</div>' +
          '<div style="font-size:15px;font-weight:800;color:var(--navy)">Lifetime</div>' +
          '<div style="font-size:11px;color:var(--slate-3);margin-top:4px">One-time purchase</div>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:20px">' +
        '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:8px">' + b.includes.length + ' courses included</div>' +
        coursesHtml +
      '</div>' +
      '<p class="modal-note">' + (DBA.bundleStatus(b) === 'live' ? 'A confirmed purchase grants a scoped Academy entitlement.' : 'Some courses in this bundle are not Live yet, so it cannot be purchased. Only Live products are purchasable.') + ' It does not imply employment, accreditation, or workplace experience.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        (owned
          ? '<button class="btn btn-navy" id="mbOpen">Open in library →</button>'
          : (DBA.bundleStatus(b) === 'live'
              ? '<button class="btn btn-primary" id="mbBuy">Buy for ' + money(up.adjusted) + '</button>' +
                '<button class="btn btn-ghost" id="mbAdd">Add to cart</button>'
              : '<button class="btn btn-primary" id="mbWait">Join the waitlist</button>')) +
        '<button class="btn btn-ghost" id="mbClose">Close</button>' +
      '</div>';
    openModal('Bundle', b.name, html, true);
    var mbBuy = $('#mbBuy'); if (mbBuy) mbBuy.addEventListener('click', function(){ closeModal(); startCheckout(b.id); });
    var mbAdd = $('#mbAdd'); if (mbAdd) mbAdd.addEventListener('click', function(){ closeModal(); addToCart(b.id); });
    var mbWait = $('#mbWait'); if (mbWait) mbWait.addEventListener('click', function(){ openWaitlist(b.id); });
    var mbOpen = $('#mbOpen'); if (mbOpen) mbOpen.addEventListener('click', function(){ closeModal(); openBundleContent(b.id); });
    $('#mbClose').addEventListener('click', closeModal);
  }

  function openBundleContent(bundleId){
    var b = BUNDLES.filter(function(x){ return x.id === bundleId; })[0];
    if (!b) return;
    if (!ownsBundle(b.id)){
      toast('You do not own this bundle yet.');
      return;
    }
    var coursesHtml = b.includes.map(function(cid){
      var c = COURSES.filter(function(x){ return x.id === cid; })[0];
      if (!c) return '';
      return '<div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:11px;margin-bottom:8px">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">' +
          '<div><div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--red)">' + esc(c.id) + '</div>' +
          '<div style="font-size:14px;font-weight:800;color:var(--navy);margin-top:4px">' + esc(c.title) + '</div>' +
          '<div style="font-size:12px;color:var(--slate-2);margin-top:6px;line-height:1.55">' + esc(c.desc) + '</div></div>' +
          '<button class="btn btn-primary btn-sm" data-start-course="' + esc(c.id) + '">Start</button>' +
        '</div>' +
      '</div>';
    }).join('');
    openModal('Your bundle', b.name,
      '<p>' + (STATE.previewOnly.indexOf(b.id) > -1 ? 'Preview access on this device — real access is granted by the team after verification.' : 'You own this bundle. Every course is unlocked.') + '</p>' +
      '<div style="margin-top:18px">' + coursesHtml + '</div>' +
      '<p class="modal-note">Each course opens its 12-stage mission workspace with hints and an evidence tray. The workspace shown here is a demo with fictional data.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-ghost" id="bcClose">Close</button></div>');
    $('#bcClose').addEventListener('click', closeModal);
    $$('[data-start-course]').forEach(function(b2){
      b2.addEventListener('click', function(){ location.href = '/academy/workspace#curriculum'; });
    });
  }

  /* ============================================================
     RENDER — COURSES
     ============================================================ */
  function renderCourses(){
    var grid = $('#courseGrid'); grid.innerHTML = '';
    var q = STATE.search.toLowerCase();
    var list = COURSES.filter(function(c){
      if (!q) return true;
      return (c.title + ' ' + c.desc + ' ' + c.id).toLowerCase().indexOf(q) > -1;
    });
    if (!list.length){
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No courses match</h3><p>Try a different search term.</p></div>';
      return;
    }
    list.forEach(function(c){
      var owned = ownsCourse(c.id);
      var card = el('article', 'course-card' + (owned ? ' owned' : ' locked'));
      card.innerHTML =
        '<div class="course-code">' + esc(c.id) + ' · ' + esc(c.pillar) + '</div>' +
        '<h4>' + esc(c.title) + '</h4>' +
        '<div class="cc-meta">' + esc(c.level) + ' · ' + c.hours + ' hrs · ' + esc(c.status === 'live' ? 'Live' : c.status === 'pilot' ? 'Pilot' : 'Planned') + '</div>' +
        '<div class="cc-desc">' + esc(c.desc) + '</div>' +
        '<div class="cc-foot">' +
          '<div class="cc-price">' + money(c.price) + '</div>' +
          (owned
            ? '<button class="btn btn-navy btn-sm" data-open-course="' + esc(c.id) + '">Open</button>'
            : (c.status === 'live'
                ? '<button class="btn btn-primary btn-sm" data-buy-course="' + esc(c.id) + '">Buy</button>'
                : '<button class="btn btn-ghost btn-sm" data-waitlist="' + esc(c.id) + '">Join waitlist</button>')) +
        '</div>';
      grid.appendChild(card);
    });
    $$('[data-buy-course]').forEach(function(b){ b.addEventListener('click', function(){ addToCart(b.dataset.buyCourse); }); });
    $$('#courseGrid [data-waitlist]').forEach(function(b){ b.addEventListener('click', function(){ openWaitlist(b.dataset.waitlist); }); });
    $$('[data-open-course]').forEach(function(b){ b.addEventListener('click', function(){ location.href = '/academy/workspace#curriculum'; }); });
  }

  /* ============================================================
     CART / CHECKOUT
     ============================================================ */
  function addToCart(itemId){
    if (STATE.cart.indexOf(itemId) > -1){ toast('Already in your cart.'); return; }
    if (ownsBundle(itemId) || ownsCourse(itemId)){ toast('You already own this.'); return; }
    if (!DBA.isLive(itemId)){ openWaitlist(itemId); return; }
    STATE.cart.push(itemId);
    saveState();
    updateCartBadge();
    openCart();
  }
  function removeFromCart(itemId){
    var i = STATE.cart.indexOf(itemId);
    if (i > -1){ STATE.cart.splice(i, 1); saveState(); updateCartBadge(); openCart(); }
  }
  function updateCartBadge(){
    var b = $('#cartBadge');
    if (STATE.cart.length === 0){ b.style.display = 'none'; }
    else { b.style.display = 'flex'; b.textContent = STATE.cart.length; }
  }
  function itemInfo(id){
    var b = BUNDLES.filter(function(x){ return x.id === id; })[0];
    if (b) return { type:'bundle', title:b.name, sub:b.includes.length + ' courses', price:computeUpgrade(b).adjusted, originalPrice:b.price };
    var c = COURSES.filter(function(x){ return x.id === id; })[0];
    if (c) return { type:'course', title:c.title, sub:c.id + ' · ' + c.level, price:c.price, originalPrice:c.price };
    return null;
  }
  function cartTotal(){
    return STATE.cart.reduce(function(sum, id){
      var info = itemInfo(id);
      return sum + (info ? info.price : 0);
    }, 0);
  }
  function openCart(){
    if (STATE.cart.length === 0){
      openModal('Cart', 'Your cart is empty',
        '<p>Browse bundles and courses to add items.</p>' +
        '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-primary" id="cartBrowse">Browse bundles</button><button class="btn btn-ghost" id="cartCloseEmpty">Close</button></div>');
      $('#cartBrowse').addEventListener('click', function(){ closeModal(); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
      $('#cartCloseEmpty').addEventListener('click', closeModal);
      return;
    }
    var itemsHtml = STATE.cart.map(function(id){
      var info = itemInfo(id);
      if (!info) return '';
      var discount = info.originalPrice - info.price;
      return '<div class="cart-item">' +
        '<div class="ci-left"><div class="ci-title">' + esc(info.title) + '</div>' +
        '<div class="ci-sub">' + esc(info.sub) + (discount > 0 ? ' · <span style="color:var(--ok);font-weight:700">' + money(discount) + ' credit</span>' : '') + '</div></div>' +
        '<div class="ci-price">' + money(info.price) + '</div>' +
        '<button class="ci-remove" data-remove="' + esc(id) + '">✕</button>' +
      '</div>';
    }).join('');
    var total = cartTotal();
    var count = STATE.cart.length;
    var html =
      '<div class="cart-items">' + itemsHtml + '</div>' +
      '<div class="cart-total"><span class="ct-label">Total (' + count + ' item' + (count === 1 ? '' : 's') + ')</span><span class="ct-amount">' + money(total) + '</span></div>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="checkoutBtn">Checkout →</button>' +
        '<button class="btn btn-ghost" id="cartContinue">Continue browsing</button>' +
      '</div>' +
      '<p class="modal-note">One-time purchase, lifetime access. Access is granted only after payment is confirmed.</p>';
    openModal('Cart', 'Your cart', html, true);
    $$('[data-remove]').forEach(function(b){
      b.addEventListener('click', function(){ removeFromCart(b.dataset.remove); });
    });
    $('#checkoutBtn').addEventListener('click', function(){ closeModal(); startCheckout(); });
    $('#cartContinue').addEventListener('click', function(){ closeModal(); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
  }
  $('#cartBtn').addEventListener('click', openCart);

  function paidCourseIds(){
    var out = [];
    STATE.entitlements.forEach(function(id){
      if (STATE.previewOnly.indexOf(id) > -1) return;
      if (COURSES.filter(function(c){ return c.id === id; }).length) out.push(id);
    });
    return out;
  }
  function fieldErr(sel, bad){
    var w = $(sel).closest('.field'); if (!w) return;
    w.classList.toggle('has-error', !!bad);
  }
  function grantPreview(lines){
    lines.forEach(function(l){
      if (STATE.entitlements.indexOf(l.id) === -1) STATE.entitlements.push(l.id);
      if (STATE.previewOnly.indexOf(l.id) === -1) STATE.previewOnly.push(l.id);
      if (STATE.redeemed.indexOf(l.id) === -1) STATE.redeemed.push(l.id);
    });
  }
  function startCheckout(singleItemId){
    var all = singleItemId ? [singleItemId] : STATE.cart.slice();
    if (!all.length){ toast('Your cart is empty.'); return; }
    var items = all.filter(function(id){ return DBA.isLive(id); });
    var notLive = all.filter(function(id){ return !DBA.isLive(id); });
    if (!items.length){ openWaitlist(notLive[0]); return; }
    var q = null, code = '', busy = false;
    var html =
      '<div id="coSummary" style="background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:6px 16px 14px;margin-bottom:16px" aria-live="polite"></div>' +
      '<div class="field"><label for="co-coupon">Promotion code (optional)</label><div class="coupon-row"><input id="co-coupon" type="text" autocomplete="off" placeholder="Enter code" /><button class="btn btn-ghost btn-sm" id="coApply" type="button">Apply</button></div><span class="hint" id="coCouponMsg" style="display:block;font-size:12px;margin-top:6px;color:var(--slate-3)"></span></div>' +
      '<div class="field-row">' +
        '<div class="field"><label for="co-name">Full name</label><input id="co-name" type="text" autocomplete="name" value="' + esc(STATE.name !== 'Guest' ? STATE.name : '') + '" /><span class="err">Please enter your name.</span></div>' +
        '<div class="field"><label for="co-email">Email</label><input id="co-email" type="email" autocomplete="email" value="' + esc(STATE.email || '') + '" /><span class="err">Please enter a valid email.</span></div>' +
      '</div>' +
      '<div class="field"><label for="co-country">Country / region (optional)</label><input id="co-country" type="text" autocomplete="country-name" /></div>' +
      '<label class="check"><input type="checkbox" id="co-consent" /><span>I accept the access, privacy and refund terms (14 days, if no assessment has been submitted). I understand participation is not a promise of employment or accreditation.</span></label>' +
      '<label class="check" id="co-zero-wrap" style="display:none"><input type="checkbox" id="co-zero" /><span><b>Confirm zero-payable enrolment.</b> I understand no payment is taken and the team verifies the promotion before granting real access.</span></label>' +
      '<label class="check"><input type="checkbox" id="co-mkt" /><span>Send me Academy news (optional).</span></label>' +
      '<div class="co-error" id="coError" role="alert"></div>' +
      '<p class="modal-note" id="coNote"></p>' +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap"><button class="btn btn-primary" id="payBtn" type="button" disabled>Loading…</button><button class="btn btn-ghost" id="coCancel" type="button">Cancel</button></div>';
    openModal('Checkout', 'Confirm your enrolment', html, true);

    function draw(){
      var lines = q.lines.map(function(l){
        var shown = l.payable;
        return '<div class="co-line"><span><b style="color:var(--navy)">' + esc(l.title) + '</b><br><span style="font-size:11px;color:var(--slate-3)">' + esc(l.type === 'bundle' ? 'Bundle' : l.id) +
          (l.credit > 0 ? ' · <span style="color:var(--ok);font-weight:700">' + money(l.credit) + ' upgrade credit</span>' : '') + '</span></span><span style="font-weight:800;color:var(--navy);white-space:nowrap">' +
          ((l.credit > 0 || l.discount > 0) ? '<s>' + money(l.list) + '</s>' : '') + money(shown) + '</span></div>';
      }).join('');
      var extra = notLive.length ? '<p style="font-size:12px;color:var(--warn);margin:10px 0 0">' + notLive.length + ' item' + (notLive.length === 1 ? ' is' : 's are') + ' not Live yet and ' + (notLive.length === 1 ? 'was' : 'were') + ' left out — join the waitlist from the catalogue.</p>' : '';
      $('#coSummary').innerHTML = lines +
        (q.discount > 0 ? '<div class="co-line"><span style="color:var(--ok);font-weight:700">Promotion ' + esc(q.coupon.code) + '</span><span style="color:var(--ok);font-weight:800">−' + money(q.discount) + '</span></div>' : '') +
        '<div style="display:flex;justify-content:space-between;padding-top:12px;font-size:15px;font-weight:800;color:var(--navy)"><span>Total payable (' + esc(q.currency) + ')</span><span>' + money(q.total) + '</span></div>' + extra;
      var msg = $('#coCouponMsg');
      msg.textContent = q.coupon.message || '';
      msg.style.color = q.coupon.state === 'applied' ? 'var(--ok)' : (q.coupon.state === 'none' ? 'var(--slate-3)' : 'var(--stop)');
      var free = q.total === 0 && q.lines.length > 0;
      $('#co-zero-wrap').style.display = free ? 'flex' : 'none';
      var pay = $('#payBtn');
      pay.disabled = busy || !q.lines.length;
      pay.textContent = free ? 'Confirm free enrolment' : 'Submit enrolment request — ' + money(q.total);
      $('#coNote').textContent = free
        ? 'No payment is taken. Your request is sent to the Academy team, who verify the promotion and grant real access. A preview is unlocked on this device only.'
        : 'Online card payment is not live yet. Submitting sends an enrolment request; we email payment steps and grant access only after payment is confirmed. Nothing is unlocked by submitting.';
    }
    function refresh(){
      var payload = { items: items, owned: paidCourseIds(), coupon: code };
      DBA.api('quote', payload).then(function(r){
        q = (r.ok && r.data && r.data.quote) ? r.data.quote : DBA.quote(items, code, payload.owned);
        var used = q.coupon.state === 'applied' ? q.lines.filter(function(l){ return STATE.redeemed.indexOf(l.id) > -1; }) : [];
        if (used.length){ q = DBA.quote(items, '', payload.owned); q.coupon = { code: '', state: 'used', message: 'Promotion already used on this device for: ' + used.map(function(l){ return l.title; }).join(', ') + '.' }; }
        draw();
      });
    }
    $('#coApply').addEventListener('click', function(){ code = $('#co-coupon').value.trim(); refresh(); });
    $('#co-coupon').addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); code = $('#co-coupon').value.trim(); refresh(); } });
    $('#coCancel').addEventListener('click', closeModal);
    $('#payBtn').addEventListener('click', function(){
      if (busy || !q) return;
      var name = $('#co-name').value.trim(), email = $('#co-email').value.trim();
      var free = q.total === 0 && q.lines.length > 0;
      var bad = false;
      fieldErr('#co-name', name.length < 2); bad = bad || name.length < 2;
      var badMail = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email);
      fieldErr('#co-email', badMail); bad = bad || badMail;
      var err = $('#coError'); err.classList.remove('on');
      if (bad) return;
      if (!$('#co-consent').checked){ err.textContent = 'Please accept the access, privacy and refund terms to continue.'; err.classList.add('on'); return; }
      if (free && !$('#co-zero').checked){ err.textContent = 'Please confirm the zero-payable enrolment.'; err.classList.add('on'); return; }
      busy = true; draw();
      $('#payBtn').textContent = 'Submitting…';
      var lineIds = q.lines.map(function(l){ return l.id; });
      DBA.api('enroll', { name: name, email: email, country: $('#co-country').value.trim(), consent: true, marketing: $('#co-mkt').checked, items: lineIds, owned: paidCourseIds(), coupon: q.coupon.state === 'applied' ? code : '', confirmZero: free && $('#co-zero').checked, source: location.pathname })
        .then(function(r){
          busy = false;
          if (r.ok && r.data && r.data.ok) { finishOrder(r.data.reference, r.data.status, r.data.quote || q, true, name, email); return; }
          var unreachable = r.status === 0 || r.status === 404 || r.status === 503;
          if (unreachable && free){ finishOrder('LOCAL-' + Date.now().toString(36).toUpperCase().slice(-6), 'Local preview only — not submitted to the team', q, false, name, email); return; }
          draw();
          err.textContent = unreachable ? 'The enrolment desk is not reachable right now. Please try again shortly or contact support.' : ((r.data && r.data.error) || 'Something went wrong. Please try again.');
          err.classList.add('on');
        });
    });
    refresh();
  }
  function finishOrder(reference, status, q, submitted, name, email){
    var free = q.total === 0 && q.lines.length > 0;
    STATE.name = (STATE.name === 'Guest') ? name : STATE.name;
    STATE.email = STATE.email || email;
    STATE.orders.unshift({ ref: reference, date: new Date().toISOString().slice(0, 10), items: q.lines.map(function(l){ return l.title; }), total: q.total, status: status, submitted: submitted, preview: free });
    var ids = q.lines.map(function(l){ return l.id; });
    STATE.cart = STATE.cart.filter(function(id){ return ids.indexOf(id) === -1; });
    if (free){ grantPreview(q.lines); if (STATE.role === 'visitor') STATE.role = 'learner'; }
    saveState(); updateCartBadge(); setRole(STATE.role, true);
    var html =
      '<div class="success-box"><div class="sb-icon">' + (free ? '✓' : '✉') + '</div>' +
      '<h3>' + (free ? 'Enrolment confirmed for preview' : 'Request received') + '</h3>' +
      '<p>' + (free
        ? (submitted ? 'Your request is with the Academy team, who verify the promotion and grant real access by email.' : 'The enrolment desk was unreachable, so this is recorded on this device only. Contact support to complete enrolment.')
        : 'Online payment is not live yet. We will email payment steps; access is granted only after payment is confirmed.') + '</p>' +
      '<div style="margin-top:16px;background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:14px 16px;text-align:left">' +
        '<div class="co-line"><span>Reference</span><b>' + esc(reference) + '</b></div>' +
        '<div class="co-line"><span>Status</span><b>' + esc(status) + '</b></div>' +
        q.lines.map(function(l){ return '<div class="co-line"><span>' + esc(l.title) + '</span><span class="pill ' + (free ? 'warn' : 'neutral') + '">' + (free ? 'Preview' : 'Not unlocked') + '</span></div>'; }).join('') +
        '<div class="co-line" style="border-bottom:0"><span>Total payable</span><b>' + money(q.total) + '</b></div></div>' +
      '<p class="modal-note" style="text-align:left">' + (free ? 'Preview access exists on this device only. It is not a payment and not a verified entitlement.' : 'Nothing has been charged or unlocked. This request is not a payment confirmation.') + '</p>' +
      '<div style="display:flex;gap:8px;margin-top:20px;justify-content:center;flex-wrap:wrap">' +
        (free ? '<a class="btn btn-primary" href="/academy/workspace">Open learner workspace</a>' : '') +
        '<button class="btn ' + (free ? 'btn-ghost' : 'btn-primary') + '" id="afterBuyOpen">Open library</button><button class="btn btn-ghost" id="afterBuyBrowse">Keep browsing</button></div></div>';
    openModal('Enrolment', free ? 'Preview unlocked' : 'Request submitted', html, true);
    $('#afterBuyOpen').addEventListener('click', function(){ closeModal(); openMyLibrary(); });
    $('#afterBuyBrowse').addEventListener('click', closeModal);
  }

  /* ============================================================
     MY LIBRARY
     ============================================================ */
  function openMyLibrary(){
    if (STATE.entitlements.length === 0 && STATE.orders.length === 0){
      openModal('Library', 'Your library is empty',
        '<p>You do not own any courses or bundles yet. Start with the $3 Starter Pack.</p>' +
        '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-primary" id="libBrowse">Browse bundles</button></div>');
      $('#libBrowse').addEventListener('click', function(){ closeModal(); document.getElementById('bundles').scrollIntoView({behavior:'smooth'}); });
      return;
    }
    var ownedBundles = STATE.entitlements.filter(function(id){ return BUNDLES.filter(function(b){ return b.id === id; }).length > 0; });
    var ownedCourses = STATE.entitlements.filter(function(id){ return COURSES.filter(function(c){ return c.id === id; }).length > 0; });
    var ordersHtml = STATE.orders.length ? '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin:18px 0 10px">Orders &amp; requests</div>' + STATE.orders.slice(0, 6).map(function(o){
      return '<div style="padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:11px;margin-bottom:8px;font-size:12.5px"><div style="display:flex;justify-content:space-between;gap:10px"><b style="color:var(--navy)">' + esc(o.ref) + '</b><span style="color:var(--slate-3)">' + esc(o.date) + '</span></div><div style="color:var(--slate-2);margin-top:4px">' + esc(o.items.join(', ')) + ' · ' + money(o.total) + '</div><div style="margin-top:6px"><span class="pill ' + (o.preview ? 'warn' : 'neutral') + '">' + esc(o.status) + '</span></div></div>'; }).join('') : '';
    var bundleHtml = ownedBundles.map(function(bid){
      var b = BUNDLES.filter(function(x){ return x.id === bid; })[0];
      return '<div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:11px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:12px">' +
        '<div><div style="font-size:13.5px;font-weight:800;color:var(--navy)">' + esc(b.name) + '</div>' +
        '<div style="font-size:11.5px;color:var(--slate-3);margin-top:3px">' + b.includes.length + ' courses · ' + money(b.price) + ' · lifetime</div></div>' +
        '<button class="btn btn-navy btn-sm" data-lib-open-bundle="' + esc(b.id) + '">Open</button>' +
      '</div>';
    }).join('');
    var courseHtml = ownedCourses.map(function(cid){
      var c = COURSES.filter(function(x){ return x.id === cid; })[0];
      return '<div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:11px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:12px">' +
        '<div><div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--red)">' + esc(c.id) + '</div>' +
        '<div style="font-size:13.5px;font-weight:800;color:var(--navy);margin-top:4px">' + esc(c.title) + '</div>' +
        '<div style="font-size:11.5px;color:var(--slate-3);margin-top:3px">' + esc(c.level) + ' · ' + c.hours + ' hrs</div></div>' +
        '<button class="btn btn-navy btn-sm" data-lib-open-course="' + esc(c.id) + '">Start</button>' +
      '</div>';
    }).join('');
    var totalSpent = STATE.purchases.reduce(function(s, p){ return s + p.price; }, 0);
    var html =
      '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">' +
        '<div style="flex:1;min-width:120px;background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Bundles</div>' +
          '<div style="font-size:22px;font-weight:800;color:var(--navy)">' + ownedBundles.length + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:120px;background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Courses</div>' +
          '<div style="font-size:22px;font-weight:800;color:var(--navy)">' + ownedCourses.length + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:120px;background:var(--bg);border:1px solid var(--line-2);border-radius:11px;padding:14px">' +
          '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:6px">Paid</div>' +
          '<div style="font-size:22px;font-weight:800;color:var(--navy)">' + money(totalSpent) + '</div>' +
        '</div>' +
      '</div>' +
      (bundleHtml ? '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin-bottom:10px">Your bundles</div>' + bundleHtml : '') +
      (courseHtml ? '<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--slate-3);margin:18px 0 10px">Your courses</div>' + courseHtml : '') +
      ordersHtml +
      '<p class="modal-note">Items marked Preview are unlocked on this device only and are not a payment or a verified entitlement. Refunds within 14 days are available if no assessment has been submitted.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-ghost" id="libClose">Close</button></div>';
    openModal('Your library', 'Owned content', html, true);
    $('#libClose').addEventListener('click', closeModal);
    $$('[data-lib-open-bundle]').forEach(function(b){ b.addEventListener('click', function(){ closeModal(); openBundleContent(b.dataset.libOpenBundle); }); });
    $$('[data-lib-open-course]').forEach(function(b){ b.addEventListener('click', function(){ location.href = '/academy/workspace#curriculum'; }); });
  }
  $('#openMyLibrary').addEventListener('click', openMyLibrary);
  $('#openLibraryFooter').addEventListener('click', openMyLibrary);

  /* ============================================================
     INSTRUCTOR / ADMIN RENDER
     ============================================================ */
  function renderInstructorReviews(){
    var host = $('#instructorReviews');
    if (!host) return;
    var reviews = [
      { learner:'Layla Ibrahim', course:'DB-03', mission:'Repair a client booking flow', status:'Revision Requested', statusCls:'warn', submitted:'22 Sep 2026', snippet:'Two accessibility issues: pending state flashes on keyboard nav; focus management after error.' },
      { learner:'Omar Al Farsi', course:'DB-04', mission:'Design an API contract', status:'In Review', statusCls:'cool', submitted:'23 Sep 2026', snippet:'Resource model is correct. Authorization matrix incomplete for one role.' },
      { learner:'Priya Sharma', course:'DB-02', mission:'Accessibility audit', status:'Submitted', statusCls:'cool', submitted:'24 Sep 2026', snippet:'Awaiting first review. Findings list looks thorough.' },
      { learner:'Daniel Okafor', course:'DB-05', mission:'AI-native feature build', status:'In Review', statusCls:'cool', submitted:'24 Sep 2026', snippet:'AI-use log is detailed. Diff spot-check pending.' },
      { learner:'Mona Khalifa', course:'PC-AD01', mission:'Executive day simulation', status:'Approved', statusCls:'ok', submitted:'18 Sep 2026', snippet:'Corrected access and decision log are both strong.' }
    ];
    host.innerHTML = '';
    reviews.forEach(function(r){
      var card = el('div', 'review-card');
      var pillClass = r.statusCls === 'warn' ? 'warn' : r.statusCls === 'ok' ? 'ok' : 'cool';
      card.innerHTML =
        '<div class="rc-head">' +
          '<div><h4>' + esc(r.learner) + ' · ' + esc(r.course) + '</h4>' +
          '<div class="rc-sub">' + esc(r.mission) + ' · Submitted ' + esc(r.submitted) + '</div></div>' +
          '<span class="pill ' + pillClass + '">' + esc(r.status) + '</span>' +
        '</div>' +
        '<p>' + esc(r.snippet) + '</p>' +
        '<div class="rc-actions">' +
          '<button class="btn btn-primary btn-sm" data-review-open="' + esc(r.learner + ' — ' + r.mission) + '">Open rubric</button>' +
          '<button class="btn btn-ghost btn-sm" data-demo-revision="1">Request revision</button>' +
        '</div>';
      host.appendChild(card);
    });
    $$('[data-demo-revision]').forEach(function(b){ b.addEventListener('click', function(){ toast('Demo action — nothing was sent to a learner.'); }); });
    $$('[data-review-open]').forEach(function(b){
      b.addEventListener('click', function(){
        openModal('Assessor review', b.dataset.reviewOpen,
          '<p>Demo only: the live reviewer workbench opens the rubric with criterion-specific scoring, artifact viewer, revision history and feedback composer.</p>' +
          '<p class="modal-note">Reviewer conflict checks are enforced server-side. A verifier cannot verify work they coached or assessed.</p>');
      });
    });
  }
  function renderAdminBundleTable(){
    var t = $('#adminBundleTable');
    if (!t) return;
    t.innerHTML = '';
    var sales = { 'b-starter':42, 'b-web':18, 'b-ai':26, 'b-fullstack':11, 'b-office':9, 'b-logistics':6, 'b-complete':3 };
    BUNDLES.forEach(function(b){
      var s = sales[b.id] || 0;
      var rev = s * b.price;
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td style="padding:10px 0;border-bottom:1px solid var(--line-2);font-weight:700;color:var(--navy)">' + esc(b.name) + '</td>' +
        '<td style="padding:10px 0;border-bottom:1px solid var(--line-2);text-align:right;color:var(--slate)">' + money(b.price) + '</td>' +
        '<td style="padding:10px 0;border-bottom:1px solid var(--line-2);text-align:right;color:var(--slate)">' + s + '</td>' +
        '<td style="padding:10px 0;border-bottom:1px solid var(--line-2);text-align:right;font-weight:800;color:var(--navy)">' + money(rev) + '</td>';
      t.appendChild(tr);
    });
  }

  /* ============================================================
     REVEAL
     ============================================================ */
  function observeReveals(root){
    var nodes = $$('.reveal', root || document).filter(function(n){ return !n.classList.contains('in'); });
    if (!('IntersectionObserver' in window)) { nodes.forEach(function(n){ n.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
    nodes.forEach(function(n){ io.observe(n); });
  }
  observeReveals();

  /* ============================================================
     ROLE STATS / BANNER
     ============================================================ */
  function renderRoleStats(){
    var ownedCourses = 0, ownedBundles = 0;
    STATE.entitlements.forEach(function(id){
      if (COURSES.filter(function(c){ return c.id === id; }).length) ownedCourses++;
      if (BUNDLES.filter(function(b){ return b.id === id; }).length) ownedBundles++;
      var b = BUNDLES.filter(function(x){ return x.id === id; })[0];
      if (b) ownedCourses += b.includes.length;
    });
    var totalSpent = STATE.purchases.reduce(function(s, p){ return s + p.price; }, 0);
    $('#roleStats').textContent = ownedCourses + ' course' + (ownedCourses === 1 ? '' : 's') + ' owned · ' + ownedBundles + ' bundle' + (ownedBundles === 1 ? '' : 's') + ' · ' + money(totalSpent) + ' paid';
    // library strip
    $('#mlCourses').textContent = ownedCourses;
    $('#mlBundles').textContent = ownedBundles;
    $('#mlSpent').textContent = money(totalSpent);
    $('#mlEvidence').textContent = STATE.orders.length;
  }

  /* ============================================================
     FILTERS & SEARCH
     ============================================================ */
  $$('#bundleTabs .filter-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      $$('#bundleTabs .filter-tab').forEach(function(x){ x.classList.remove('active'); });
      tab.classList.add('active');
      STATE.bundleFilter = tab.dataset.filter;
      saveState();
      renderBundles();
    });
  });
  var searchInput = $('#bundleSearch');
  var searchTimer = null;
  searchInput.addEventListener('input', function(e){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
      STATE.search = e.target.value;
      saveState();
      renderBundles();
      renderCourses();
    }, 180);
  });

  /* ============================================================
     SIGN IN
     ============================================================ */
  function openSignIn(){
    if (STATE.signedIn){
      STATE.signedIn = false; STATE.name = 'Guest'; saveState();
      $('#signInBtn').textContent = 'Sign in';
      toast('Signed out of the local session.');
      renderRoleStats();
      return;
    }
    openModal('Account', 'Sign in or register',
      '<p class="modal-note" style="margin-top:0"><b>Identity service: setup required.</b> Real sign-in (secure sessions, MFA, recovery) is switched on with the Academy identity provider. Until then, a local session only remembers your name on this device. It holds no password, and it never unlocks paid content.</p>' +
      '<div class="field-row" style="margin-top:16px"><div class="field"><label for="si-name">Name</label><input id="si-name" type="text" autocomplete="name" value="' + esc(STATE.name !== 'Guest' ? STATE.name : '') + '" /><span class="err">Please enter your name.</span></div>' +
      '<div class="field"><label for="si-email">Email</label><input id="si-email" type="email" autocomplete="email" value="' + esc(STATE.email || '') + '" /><span class="err">Please enter a valid email.</span></div></div>' +
      '<div class="field-row"><div class="field"><label for="si-country">Country / region</label><input id="si-country" type="text" autocomplete="country-name" /></div>' +
      '<div class="field"><label for="si-goal">Primary goal</label><select id="si-goal"><option>Digital foundations</option><option>Build websites and software</option><option>Build with AI</option><option>Office or logistics career</option><option>Deliver client products</option></select></div></div>' +
      '<label class="check"><input type="checkbox" id="si-consent" /><span>I accept the privacy notice (needed only to register for launch updates).</span></label>' +
      '<label class="check"><input type="checkbox" id="si-mkt" /><span>Send me Academy news (optional).</span></label>' +
      '<div class="co-error" id="siError" role="alert"></div>' +
      '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><button class="btn btn-primary" id="siLocal">Continue on this device</button><button class="btn btn-ghost" id="siReg">Register for launch updates</button><button class="btn btn-ghost" id="siCancel">Cancel</button></div>' +
      '<p class="modal-note">Forgot password: available with the identity service. New accounts default to the Learner role and remain separate from demo roles.</p>');
    function readForm(needMail){
      var n = $('#si-name').value.trim(), e = $('#si-email').value.trim();
      var bn = n.length < 2, be = needMail && !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(e);
      fieldErr('#si-name', bn); fieldErr('#si-email', be);
      return (bn || be) ? null : { name: n, email: e };
    }
    $('#siCancel').addEventListener('click', closeModal);
    $('#siLocal').addEventListener('click', function(){
      var f = readForm(false); if (!f) return;
      STATE.signedIn = true; STATE.name = f.name; STATE.email = f.email || STATE.email;
      if (STATE.role === 'visitor') STATE.role = 'learner';
      saveState(); setRole(STATE.role, true); closeModal();
      $('#signInBtn').textContent = 'Sign out';
      toast('Local session started for ' + f.name + '. No content was unlocked.');
    });
    $('#siReg').addEventListener('click', function(){
      var f = readForm(true); if (!f) return;
      var er = $('#siError'); er.classList.remove('on');
      if (!$('#si-consent').checked){ er.textContent = 'Please accept the privacy notice to register.'; er.classList.add('on'); return; }
      $('#siReg').disabled = true;
      DBA.api('register', { kind: 'account', name: f.name, email: f.email, country: $('#si-country').value.trim(), goal: $('#si-goal').value, consent: true, marketing: $('#si-mkt').checked, language: (navigator.language || 'en') }).then(function(r){
        $('#siReg').disabled = false;
        if (r.ok){ STATE.email = f.email; STATE.name = STATE.name === 'Guest' ? f.name : STATE.name; saveState(); closeModal(); toast('Thanks ' + f.name.split(' ')[0] + ' — we will email you when sign-in opens.', true); }
        else { er.textContent = (r.status === 503 || r.status === 0 || r.status === 404) ? 'The registration desk is not reachable right now. Please try again shortly.' : ((r.data && r.data.error) || 'Something went wrong.'); er.classList.add('on'); }
      });
    });
  }
  $('#signInBtn').addEventListener('click', openSignIn);
  var fsi = $('#footSignIn'); if (fsi) fsi.addEventListener('click', function(e){ e.preventDefault(); openSignIn(); });

  /* ============================================================
     PATHS / STAGES / ASSESSMENT / TOOLS / LABS (static, data-driven)
     ============================================================ */
  var PATHS = [
    { name: 'Web builder', who: 'New to tech — discovery, design and a first web workflow.', steps: ['DB-00', 'DB-01', 'DB-02', 'DB-03'], bundle: 'b-web', next: 'Unlocks AI-Native Builder' },
    { name: 'AI-native product builder', who: 'Ship responsibly with AI in the loop, backend included.', steps: ['DB-00', 'DB-01', 'DB-02', 'DB-03', 'DB-04', 'DB-05'], bundle: 'b-ai', next: 'Unlocks Full-Stack Product' },
    { name: 'Full-stack product delivery', who: 'Discovery to operations and client handoff, then the DB-22 challenge.', steps: ['DB-01', 'DB-02', 'DB-03', 'DB-04', 'DB-05', 'DB-06', 'DB-07', 'DB-08'], bundle: 'b-fullstack', next: 'DB-22 is assessed and verified separately' },
    { name: 'Office career', who: 'Administration and customer-service roles.', steps: ['DB-00', 'PC-AD01', 'PC-CS01'], bundle: 'b-office', next: 'Opens as pilot courses go Live' },
    { name: 'Logistics career', who: 'Freight, warehouse and supply-chain operations.', steps: ['DB-00', 'PC-LG01', 'PC-PR01'], bundle: 'b-logistics', next: 'Opens as pilot courses go Live' }
  ];
  var TOOLS_PUB = [
    ['Canva', 'Design and content'], ['OpenCode', 'Software development'], ['Git / GitHub', 'Software development'], ['Figma', 'Design and content'],
    ['VS Code', 'Software development'], ['ChatGPT or AI assistant', 'AI and automation'], ['Excel / Google Sheets', 'Data and operations'],
    ['PostgreSQL', 'Data and analytics'], ['Power BI', 'Data and analytics'], ['CRM / ERP / HRM systems', 'Business operations'],
    ['Email / calendar / document tools', 'Communication'], ['Upload / file storage / evidence tools', 'Evidence']
  ];
  var LABS_PUB = ['Virtual Office', 'Accounting', 'Freight Forwarding', 'Real Estate', 'HR', 'Banking Operations', 'Insurance', 'Document Processing', 'Procurement', 'Customer Service'];
  function statusPillFor(st){
    return st === 'live' ? '<span class="pill ok">Live</span>' : st === 'pilot' ? '<span class="pill warn">Pilot</span>' : '<span class="pill neutral">Planned</span>';
  }
  function renderStatic(){
    $('#pathGrid').innerHTML = PATHS.map(function(p, i){
      var b = DBA.bundle(p.bundle), st = DBA.bundleStatus(b);
      return '<article class="path-card"><div><h3>' + esc(p.name) + '</h3><div class="for">' + esc(p.who) + '</div></div>' +
        '<ol class="path-steps">' + p.steps.map(function(id){ var c = DBA.course(id); return '<li class="' + esc(c.status) + '"><span>' + esc(c.title) + '<small>' + esc(c.id) + ' · ' + c.hours + ' hrs</small></span>' + statusPillFor(c.status) + '</li>'; }).join('') + '</ol>' +
        '<div class="path-foot"><span>' + esc(p.next) + '</span><button class="btn ' + (st === 'live' ? 'btn-primary' : 'btn-ghost') + ' btn-sm" data-view-bundle="' + esc(b.id) + '">' + esc(b.name) + ' · ' + money(b.price) + '</button></div></article>';
    }).join('');
    $$('#pathGrid [data-view-bundle]').forEach(function(b){ b.addEventListener('click', function(){ openBundleModal(b.dataset.viewBundle); }); });
    $('#stageRail').innerHTML = DBA.STAGES.map(function(s, i){
      return '<div class="stage"><div class="n">' + ('0' + (i + 1)).slice(-2) + '</div><h4>' + esc(s[0]) + '</h4><p>' + esc(s[1]) + '</p></div>';
    }).join('');
    $('#lifecycleChips').innerHTML = DBA.LIFECYCLE.map(function(s, i){ return '<span class="chip' + (i === DBA.LIFECYCLE.length - 1 ? ' on' : '') + '"><span class="i">' + (i + 1) + '</span>' + esc(s) + '</span>'; }).join('');
    $('#capGrid').innerHTML = DBA.CAPABILITY.map(function(c, i){ return '<div class="cap' + (i > 2 ? ' sep' : '') + '"><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span><p>' + esc(c[2]) + '</p></div>'; }).join('');
    $('#toolRows').innerHTML = TOOLS_PUB.map(function(t){ return '<div class="r"><div><b>' + esc(t[0]) + '</b><small>' + esc(t[1]) + '</small></div><span class="pill warn">Setup required</span></div>'; }).join('');
    $('#labRows').innerHTML = LABS_PUB.map(function(l){ return '<div class="r"><div><b>' + esc(l) + ' lab</b></div><span class="pill neutral">Planning</span></div>'; }).join('');
    $('#sp-topic').innerHTML = DBA.SUPPORT_TOPICS.map(function(t){ return '<option>' + esc(t) + '</option>'; }).join('');
    renderSupportCases();
    observeReveals();
  }

  /* DIAGNOSTIC */
  function openDiagnostic(){
    var d = STATE.diagnostic || {};
    function opt(list, cur){ return list.map(function(o){ return '<option' + (o === cur ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }
    openModal('Diagnostic', 'Find your first step',
      '<p>Five questions. Your answers pick a route using prerequisites and valid foundation bypasses. Nothing here is graded and nothing is sent anywhere.</p>' +
      '<div class="field" style="margin-top:16px"><label for="dg-exp">Experience</label><select id="dg-exp">' + opt(['New to digital work', 'Some digital experience', 'Working in tech', 'Working in an operations role'], d.exp) + '</select></div>' +
      '<div class="field"><label for="dg-goal">Goal</label><select id="dg-goal">' + opt(['Digital foundations', 'Build websites and software', 'Build with AI', 'Deliver client products end to end', 'Office administration career', 'Logistics career'], d.goal) + '</select></div>' +
      '<div class="field-row"><div class="field"><label for="dg-hours">Weekly availability</label><select id="dg-hours">' + opt(['2–4 hours', '5–9 hours', '10+ hours'], d.hours) + '</select></div>' +
      '<div class="field"><label for="dg-market">Country or target market</label><input id="dg-market" type="text" value="' + esc(d.market || '') + '" /></div></div>' +
      '<div class="field"><label for="dg-prior">Prior evidence of this skill</label><select id="dg-prior">' + opt(['None yet', 'A portfolio or project', 'Work experience'], d.prior) + '</select></div>' +
      '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-primary" id="dgGo">Recommend a route</button><button class="btn btn-ghost" id="dgClose">Close</button></div>');
    $('#dgClose').addEventListener('click', closeModal);
    $('#dgGo').addEventListener('click', function(){
      var a = { exp: $('#dg-exp').value, goal: $('#dg-goal').value, hours: $('#dg-hours').value, market: $('#dg-market').value.trim(), prior: $('#dg-prior').value };
      STATE.diagnostic = a; saveState(); showRecommendation(a);
    });
  }
  function showRecommendation(a){
    var target = 'b-starter', why = 'You are starting out, so Digital Foundations comes first.';
    var newbie = a.exp === 'New to digital work';
    if (a.goal === 'Office administration career') { target = 'b-office'; why = 'Your goal is an office role. The Office Career route opens as its pilot courses go Live — start with Digital Foundations now.'; }
    else if (a.goal === 'Logistics career') { target = 'b-logistics'; why = 'Your goal is logistics. That route opens as its pilot courses go Live — start with Digital Foundations now.'; }
    else if (!newbie && a.goal === 'Build websites and software') { target = 'b-web'; why = 'You have some experience and want to build for the web.'; }
    else if (!newbie && a.goal === 'Build with AI') { target = 'b-ai'; why = 'You want to build with AI, and the AI-Native Builder covers discovery through AI-native engineering.'; }
    else if (!newbie && a.goal === 'Deliver client products end to end') { target = 'b-fullstack'; why = 'You want end-to-end delivery, including operations and client handoff.'; }
    var b = DBA.bundle(target), st = DBA.bundleStatus(b);
    var starter = st !== 'live';
    var weeks = Math.ceil(b.includes.reduce(function(s, id){ return s + DBA.course(id).hours; }, 0) / ({ '2–4 hours': 3, '5–9 hours': 7, '10+ hours': 12 }[a.hours] || 5));
    var bypass = (a.exp === 'Working in tech' || a.prior !== 'None yet') && target !== 'b-starter'
      ? '<p class="modal-note">Because you report prior experience, you may be able to bypass introductory foundation content. A bypass can never skip assessment, evidence, verification, safety or regulatory content.</p>' : '';
    var html = '<p>' + esc(why) + '</p>' +
      '<div class="card-box" style="margin-top:16px"><h3>' + esc(b.name) + ' <span style="color:var(--slate-3);font-weight:600">· ' + money(b.price) + '</span></h3><p>' + esc(b.desc) + '</p><p style="font-size:12.5px;color:var(--slate-3)">About ' + weeks + ' weeks at your pace. ' + b.includes.length + ' courses.' + (a.market ? ' Target market noted: ' + esc(a.market) + '.' : '') + '</p></div>' + bypass +
      '<div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">' +
        (starter ? '<button class="btn btn-primary" id="rcStart">Start with Starter Pack · $3</button><button class="btn btn-ghost" id="rcWait">Join the ' + esc(b.name) + ' waitlist</button>'
                 : '<button class="btn btn-primary" id="rcBuy">Add to cart</button><button class="btn btn-ghost" id="rcView">View details</button>') +
        '<button class="btn btn-ghost" id="rcRetake">Retake</button></div>';
    openModal('Recommendation', 'Your suggested route', html, true);
    var s1 = $('#rcStart'); if (s1) s1.addEventListener('click', function(){ closeModal(); addToCart('b-starter'); });
    var s2 = $('#rcWait'); if (s2) s2.addEventListener('click', function(){ openWaitlist(target); });
    var s3 = $('#rcBuy'); if (s3) s3.addEventListener('click', function(){ closeModal(); addToCart(target); });
    var s4 = $('#rcView'); if (s4) s4.addEventListener('click', function(){ openBundleModal(target); });
    $('#rcRetake').addEventListener('click', openDiagnostic);
  }

  /* WAITLIST */
  function openWaitlist(itemId){
    var b = DBA.bundle(itemId), c = DBA.course(itemId);
    var label = b ? b.name : (c ? c.title : 'this programme');
    openModal('Waitlist', label,
      '<p><b>' + esc(label) + '</b> is not Live yet, so it cannot be purchased. Join the waitlist and we will email you when it opens.</p>' +
      '<div class="field-row" style="margin-top:14px"><div class="field"><label for="wl-name">Name</label><input id="wl-name" type="text" autocomplete="name" value="' + esc(STATE.name !== 'Guest' ? STATE.name : '') + '" /><span class="err">Please enter your name.</span></div>' +
      '<div class="field"><label for="wl-email">Email</label><input id="wl-email" type="email" autocomplete="email" value="' + esc(STATE.email || '') + '" /><span class="err">Please enter a valid email.</span></div></div>' +
      '<label class="check"><input type="checkbox" id="wl-consent" /><span>I agree to be emailed about this programme and accept the privacy notice.</span></label>' +
      '<div class="co-error" id="wlError" role="alert"></div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><button class="btn btn-primary" id="wlGo">Join waitlist</button><button class="btn btn-ghost" id="wlCancel">Cancel</button></div>');
    $('#wlCancel').addEventListener('click', closeModal);
    $('#wlGo').addEventListener('click', function(){
      var name = $('#wl-name').value.trim(), email = $('#wl-email').value.trim(), er = $('#wlError');
      var badName = name.length < 2, badMail = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email);
      fieldErr('#wl-name', badName); fieldErr('#wl-email', badMail); er.classList.remove('on');
      if (badName || badMail) return;
      if (!$('#wl-consent').checked){ er.textContent = 'Please tick the consent box.'; er.classList.add('on'); return; }
      $('#wlGo').disabled = true;
      DBA.api('register', { kind: 'waitlist', name: name, email: email, consent: true, marketing: true, interest: label }).then(function(r){
        $('#wlGo').disabled = false;
        if (r.ok){ STATE.email = STATE.email || email; STATE.waitlist.push(itemId); saveState(); closeModal(); toast('You are on the waitlist for ' + label + '.', true); }
        else { er.textContent = (r.status === 503 || r.status === 0 || r.status === 404) ? 'The registration desk is not reachable right now. Please try again shortly.' : ((r.data && r.data.error) || 'Something went wrong.'); er.classList.add('on'); }
      });
    });
  }
  $('#openDiagnostic').addEventListener('click', openDiagnostic);
  $('#pricingCart').addEventListener('click', openCart);

  /* SUPPORT */
  function renderSupportCases(){
    var host = $('#supportCases');
    if (!STATE.supportRefs.length){ host.textContent = ''; return; }
    host.innerHTML = '<b style="color:var(--navy)">Your cases on this device</b><div class="list-rows" style="margin-top:6px">' + STATE.supportRefs.slice(0, 5).map(function(c){
      return '<div class="r"><div><b>' + esc(c.ref) + ' · ' + esc(c.topic) + '</b><small>' + esc(c.date) + '</small></div><span class="pill cool">Submitted</span></div>'; }).join('') + '</div>';
  }
  $('#supportForm').addEventListener('submit', function(e){
    e.preventDefault();
    var name = $('#sp-name').value.trim(), email = $('#sp-email').value.trim(), msg = $('#sp-msg').value.trim();
    var bn = name.length < 2, be = !/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email), bm = msg.length < 10;
    fieldErr('#sp-name', bn); fieldErr('#sp-email', be); fieldErr('#sp-msg', bm);
    if (bn || be || bm) return;
    var btn = $('#sp-submit'); btn.disabled = true; btn.textContent = 'Submitting…';
    DBA.api('support', { name: name, email: email, topic: $('#sp-topic').value, message: msg, source: location.pathname, website: $('#sp-website').value }).then(function(r){
      btn.disabled = false; btn.textContent = 'Submit case';
      if (r.ok && r.data && r.data.ok){
        STATE.supportRefs.unshift({ ref: r.data.reference, topic: $('#sp-topic').value, date: new Date().toISOString().slice(0, 10) });
        STATE.email = STATE.email || email; saveState(); $('#sp-msg').value = ''; renderSupportCases();
        toast('Case ' + r.data.reference + ' submitted. Check your inbox for confirmation.', true);
      } else {
        toast((r.status === 503 || r.status === 0 || r.status === 404) ? 'Support desk is not reachable right now. Email support@digitalburj.com.' : ((r.data && r.data.error) || 'Could not submit.'));
      }
    });
  });

  /* NOTICES */
  var NOTICES = {
    Privacy: 'Evidence and learning records are private by default. Sharing is explicit, limited to the stated purpose and can be withdrawn. Retention rules apply and nothing is silently deleted. This site stores your cart, name and local preview state in your browser only; enrolment, waitlist and support forms send the details you type to the Academy team by email.',
    Terms: 'Access follows an active entitlement created from a confirmed payment. Only Live products are purchasable. Bundles record inclusions, access dates, currency, taxes, fees and upgrade credit. Refunds: within 14 days provided no assessment has been submitted. Participation does not by itself provide employment, a visa, a licence, accreditation, regulatory approval, professional-authority recognition, job matching, workplace experience or a guaranteed outcome.',
    Security: 'No passwords or API keys are handled by this page. Roles are separate: learners, reviewers, verifiers and admins cannot approve or verify their own work, and access is enforced by the server rather than by hiding interface elements. Demo roles use fictional data and hold no production privileges.'
  };
  function openNotice(k){ openModal('Academy notice', k, '<p>' + esc(NOTICES[k]) + '</p><p class="modal-note">Contact support@digitalburj.com with any question about this notice.</p>'); }
  $$('[data-notice]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); openNotice(a.dataset.notice); }); });

  /* ============================================================
     INIT
     ============================================================ */
  function renderAll(){
    renderBundles();
    renderCourses();
    renderRoleStats();
    renderInstructorReviews();
    renderAdminBundleTable();
    updateCartBadge();
    $('#signInBtn').textContent = STATE.signedIn ? 'Sign out' : 'Sign in';
  }
  setRole(STATE.role, true);
  renderAll();
  renderStatic();

}
function boot(){ var root=document.getElementById("ac-root"); if(!root||!window.DBA||!root.closest('#dc-root')) return false; if(root.getAttribute('data-ready')) return true; root.setAttribute('data-ready','1'); root.innerHTML=BODY; run(); return true; }
if(!boot()){ var n=0,t=setInterval(function(){ if(boot()||++n>400) clearInterval(t); },50); }
})();
