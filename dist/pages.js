const cta = (h, lead, p, s) => ({ type: "cta", h, lead, primary: p, secondary: s });
const M = (t, forWho, bullets, diff) => ({ t, for: forWho, bullets, diff });

export const PLANS = [
  { name: "Free", price: "$0", per: "/mo", scope: "Freelancer or micro-business entry: customers, invoices and a simple dashboard." },
  { name: "eInvoice Lite", price: "$8–13", per: "/mo", scope: "Customers, products and services, tax, invoicing, payment tracking and accredited e-invoice provider connection." },
  { name: "Business Starter", price: "$22", per: "/mo", scope: "Basic CRM, sales, invoicing, tasks, documents and dashboard." },
  { name: "Business OS", price: "$41", per: "/mo", scope: "Core operations for a growing SME.", featured: true },
  { name: "Business OS Pro", price: "$81", per: "/mo", scope: "Broader ERP, HR and workflow capability." },
  { name: "Industry OS", price: "$136–218", per: "/mo", scope: "Core plus one vertical operations module." },
  { name: "DigitalBurj AI", price: "$27+", per: "/mo add-on", scope: "Defined AI usage and agents on top of any plan." },
  { name: "Enterprise", price: "Custom", per: "", scope: "Dedicated deployment, advanced integration and support." },
];


// The full DigitalBurj service catalogue, grouped by function.
const fullServices = () => ({
  type: "directory", id: "services", eyebrow: "Complete service catalogue",
  h: "Every service your business runs on, delivered by DigitalBurj.",
  lead: "From accounting and CRM to supply chain, HR, marketing and projects — DigitalBurj implements, customises, migrates and supports every service below, natively in the Business OS or alongside your existing systems, with AI, growth and industry layers built in.",
  groups: [
    { t: "Finance & accounting", items: ["Accounting & GL", "Invoicing & quotes", "Purchase orders & bills", "Expenses", "Bank feeds & reconciliation", "Multi-currency", "VAT / tax returns", "e-Invoicing (UAE · KSA)", "Fixed assets", "40+ financial reports", "Budgets & cost centres", "Documents & e-sign"] },
    { t: "Sales & CRM", items: ["CRM & pipelines", "Sales orders", "Point of Sale", "Subscriptions", "Rental", "Quotation builder", "Commissions & targets", "Customer portal"] },
    { t: "Websites & eCommerce", items: ["Website builder", "eCommerce", "Blog", "Forum", "Live chat", "eLearning", "SEO & AEO", "Payments & delivery"] },
    { t: "Supply chain", items: ["Inventory & warehouse", "Manufacturing (MRP)", "Purchase & procurement", "Barcode scanning", "Quality control", "PLM", "Repair", "Maintenance", "Dropshipping", "Landed cost"] },
    { t: "HR & payroll", items: ["Employees", "Recruitment", "Time off & attendance", "Appraisals", "Payroll & WPS", "Expenses & claims", "Fleet", "Referrals", "Employee portal"] },
    { t: "Marketing", items: ["Email marketing", "SMS marketing", "Social marketing", "Marketing automation", "Events", "Surveys", "WhatsApp campaigns", "Lead scoring"] },
    { t: "Services & projects", items: ["Projects & tasks", "Timesheets", "Field service", "Planning & shifts", "Helpdesk", "Appointments & booking", "Contracts & SLAs", "Client portal"] },
    { t: "Productivity & platform", items: ["Discuss & chat", "Approvals", "Knowledge base", "VoIP", "WhatsApp Business", "IoT", "Studio (no-code)", "API & integrations", "Data migration"] },
    { t: "Beyond the core", more: true, items: ["AI employees with audited tools", "WhatsApp-first owner briefs", "Owner Command Center", "Growth: SEO, AEO & AI search", "Custom ERP & mobile apps", "13 industry modules", "Academy & certification", "Verified Talent", "Arabic + English, regional compliance"] },
  ],
  note: ""
});

// Sector directory — 95+ business types across 11 categories.
const allSectors = () => ({
  type: "directory", id: "sectors", eyebrow: "Industries we serve",
  h: "One core, configured for how each industry works.",
  lead: "Deep vertical modules for our core sectors, and tuned configurations for every business type below — all on the same Business OS.",
  groups: [
    { t: "Business services", items: ["Accounting firm", "Audit & certification", "Law firm", "Marketing agency", "Talent acquisition", "IT hardware & support", "Software reseller", "Billboard rental", "Environmental agency"] },
    { t: "Culture & arts", items: ["Arts & crafts", "Gallery", "Museum", "Library", "Theater", "Concert halls", "Photography", "Tattoo shop"] },
    { t: "Education & training", items: ["Driving school", "eLearning platform", "DIY workshops", "Student organisation", "Training centre", "School"] },
    { t: "Events, community & nonprofit", items: ["Event management", "Wedding planner", "Nonprofit", "Public institution", "Coworking", "Members club", "Sports facilities", "Team sports club", "Summer camps", "Community care"] },
    { t: "Food & beverage", items: ["Restaurant", "Fast food", "Bakery", "Bar & pub", "Catering", "Food trucks", "Takeaway", "Candy shop", "Beverage distributor"] },
    { t: "Health, wellness & care", items: ["Clinic", "Pharmacy", "Fitness centre", "Yoga & pilates", "Hair salon", "Beauty parlour", "Physical therapy", "Mental therapy", "Personal trainer", "Veterinary clinic", "Pet groomer", "Eyewear store"] },
    { t: "Hospitality & leisure", items: ["Hotel", "Guest house", "Holiday house", "Campsite", "Spa resort", "Guided tours", "Outdoor activities", "Escape rooms", "Bowling alleys", "Night clubs"] },
    { t: "Manufacturing & supply chain", items: ["3PL & logistics", "Custom furniture", "Metal fabricator", "Textile manufacturing", "Food distribution", "Microbrewery", "Vineyard", "Carpenter", "Corporate gifts", "Industrial equipment", "Agri-equipment rental"] },
    { t: "Real estate, construction & maintenance", items: ["Real estate agency", "Property management", "Property developer", "General contractor", "Architecture firm", "Interior design", "HVAC services", "Solar energy", "Machine & tool rental", "Property owner association"] },
    { t: "Retail & eCommerce", items: ["Clothing store", "Electronics store", "Furniture store", "Grocery store", "Hardware store", "Bookstore", "Cosmetics store", "Florist", "Toy store", "Wine shop", "Auto spare parts", "Dropshipping", "Thrift store", "Agricultural store"] },
    { t: "Trades & home services", items: ["Cleaning services", "Electrician", "Gardening", "Handyman", "Surveying & mapping", "Bike shop", "Bike leasing"] },
  ],
  note: ""
});

export const PAGES = {
  "business-os": {
    crumb: "Business OS", lockup: "brand/business-os-lockup.webp", badge: "The reusable core",
    hero: { eyebrow: "DigitalBurj Business OS", h1: "One operating system", accent: "for the whole business.", lead: "CRM, sales, accounting, procurement, inventory, HR, payroll, projects, documents, approvals and automation — built once, shared by every team and every industry module.", primary: { label: "See plans", href: "/pricing" }, secondary: { label: "Explore modules", href: "#modules" }, img: "img/15-d.jpg" },
    sections: [
      { type: "loop", eyebrow: "One lifecycle", h: "Data flows from sales to operations to finance — typed once.", items: ["Lead", "Quote", "Order", "Delivery", "Invoice", "Payment"] },
      { type: "modules", id: "modules", eyebrow: "14 core modules", h: "Everything an SME runs on.", items: [
        M("Company & Administration", "Every software customer", ["Legal entities, branches, departments, teams and users", "Currencies, languages, tax settings, numbering and custom fields", "Role, department, record and field-level permissions with audit history", "Multi-company and multi-branch without duplicated master data"], "Owners configure practical access rules without a developer."),
        M("CRM", "Almost every SME — especially B2B, services and property", ["Leads, contacts, companies, pipelines, activities and follow-ups", "Email, WhatsApp and website enquiry history with duplicate detection", "Lead scoring, assignment, decay and lost-reason analysis", "Source, conversion, pipeline and revenue attribution reports"], "One customer timeline — nobody hunts across disconnected screens."),
        M("Sales Management", "Trading, distribution, logistics, services, manufacturing", ["Products, price lists, customer pricing, volume tiers and discount approvals", "Quotations, revisions, contracts, orders, invoices and returns", "Commissions, targets and a visual sales lifecycle"], "Status and next action are obvious at a glance."),
        M("Accounting & Finance", "Every serious SME", ["Chart of accounts, GL, journals, AR/AP, statements and bank reconciliation", "Advances, partial payments, credit notes and multicurrency", "Cost centres, budgets, fixed assets, accruals and consolidation", "P&L, balance sheet, cash flow, trial balance and ageing"], "Deterministic double-entry, decimal arithmetic and controlled reversals."),
        M("Tax & e-Invoicing", "Businesses with tax and e-invoice obligations", ["Tax codes, inclusive/exclusive pricing, tax invoices and credit notes", "Period reporting, reconciliation, exports and audit evidence", "Structured e-invoices via accredited providers, with status tracking and retries", "Country requirements delivered as separate localization modules"], "Compliance screens explain what's missing and how to fix it."),
        M("Procurement", "Trading, construction, hospitality, facilities", ["Suppliers, purchase requests, approvals, RFQs and comparisons", "Purchase orders, goods receipts, supplier bills and returns", "Supplier scoring and contract management"], "Request → Approval → RFQ → PO → Receipt → Bill → Payment, without re-typing."),
        M("Inventory & Warehousing", "Retail, distribution, manufacturing, automotive", ["Items, variants, SKUs, barcodes, warehouses, bins, batch, serial and expiry", "Receipts, transfers, reservations, cycle counts and replenishment", "Landed cost, valuation, returns and pick-pack-ship"], "Mobile scanning and real-time stock truth as standard."),
        M("HRMS", "Most growing SMEs", ["Employee records, contracts, onboarding, offboarding, shifts and leave", "Identity, permit and visa document tracking with expiry alerts", "Expenses, performance, goals, training, policies and HR helpdesk", "Employee self-service portal"], "HR as a full lifecycle, not only attendance."),
        M("Payroll", "SMEs that want payroll inside the same system", ["Salary structures, allowances, deductions, overtime and commissions", "Approvals, payslips, accounting posting and payment tracking", "Statutory payroll files where applicable, via localization modules"], "Calculations are deterministic and independently validated."),
        M("Project Management", "Agencies, consultancies, construction, software", ["Projects, milestones, tasks, dependencies and timesheets", "Billable time, budgets, expenses and resource allocation", "Client portal, progress and profitability"], "Project work connects directly to billing and margin."),
        M("Document Management", "Every operational customer", ["Customer, supplier and employee documents with versions and permissions", "Expiry, approvals, secure links, retention and audit trail", "AI extraction and summarisation"], "Documents are linked to the records they belong to."),
        M("Universal Approval Engine", "Any business with financial controls", ["Chains for purchases, discounts, refunds, payments, leave and credit limits", "Conditional thresholds, routing, escalation and delegation", "Full approval history"], "One approval engine serves every module."),
        M("Workflow Automation", "SMEs with repetitive admin", ["Triggers, conditions, actions, delays, escalations and retries", "Overdue invoice reminders, lead assignment, stock and licence-expiry alerts", "Execution history for every run"], "Automation is auditable and never bypasses business controls."),
        M("Communications & Dashboards", "Owners and every department", ["WhatsApp Business for enquiries, quotes, payments and owner briefs", "Unified inbox across WhatsApp, email and website chat", "Owner Command Center: cash, receivables, profit, approvals and exceptions", "Department dashboards for sales, finance, HR, inventory and more"], "The owner sees the business in one view, on their phone."),
      ] },
      fullServices(),
      { type: "chips", eyebrow: "Where we never cut cost", h: "Cheaper, never weaker.", lead: "Shared modules and self-service onboarding keep prices low. These stay non-negotiable.", items: ["Security", "Accounting accuracy", "Tax logic", "Backups & restore testing", "Tenant isolation", "Permissions", "Audit logs", "Privacy controls", "Regulatory validation"] },
      { type: "faq", items: [
        { q: "Do industry modules duplicate CRM or finance?", a: "No. Industry modules extend the Business OS. CRM, finance, HR, identity and documents are shared, so data is never entered twice." },
        { q: "Does it work without AI?", a: "Yes. The core system works fully without AI. AI is an optional layer that acts only through permissioned tools." },
        { q: "Which countries' tax rules are supported?", a: "Core finance is shared; country requirements such as tax reporting, e-invoicing and statutory payroll are delivered as separate localization modules, validated per country." },
      ] },
      cta("Run the whole business from one core.", "Start on Business Starter and add modules as you grow.", { label: "See plans", href: "/pricing" }, { label: "Book a demo", href: "/contact" }),
    ],
  },
  "business-ai": {
    crumb: "DigitalBurj AI", lockup: "brand/business-ai-lockup.webp",
    hero: { eyebrow: "DigitalBurj AI", h1: "AI employees", accent: "inside real operations.", lead: "Copilots and agents for owners, sales, service, finance, HR and operations — working on your authorised data, through controlled tools, with a person approving what matters.", primary: { label: "Add DigitalBurj AI", href: "/pricing" }, secondary: { label: "See the agents", href: "#agents" }, img: "img/21-d.jpg" },
    sections: [
      { type: "loop", eyebrow: "The AI rule", h: "No unrestricted database access. Ever.", items: ["Authenticate", "Authorise", "Use approved tools", "Validate", "Approve high-risk action", "Audit"] },
      { type: "modules", id: "agents", eyebrow: "Eight AI services", h: "Who they help and what they do.", items: [
        M("AI Executive", "Owner / CEO", ["Daily briefing on cash, receivables, sales and operations", "Pending approvals and employee exceptions", "Recommended next actions"], "Your morning brief arrives on WhatsApp before the first meeting."),
        M("AI Sales", "Sales team", ["Lead summaries and qualification", "Follow-up and proposal drafting", "Quote drafting and next-best action"], "Drafts, never sends, without approval."),
        M("AI Customer Service", "Customers & support", ["Website and WhatsApp support", "FAQ answers and ticket triage", "Escalation with full history"], "Hands off to a person the moment it's unsure."),
        M("AI Finance Assistant", "Finance", ["Invoice extraction", "Reconciliation assistance and classification suggestions", "Collections follow-up"], "Suggests; deterministic accounting rules decide."),
        M("AI HR Assistant", "HR & employees", ["Policy Q&A and leave guidance", "Onboarding support and document reminders", "HR ticket triage"], "Answers only from your approved policies."),
        M("AI Operations", "Operations", ["Late work, missing documents and SLA exceptions", "Workload imbalance", "Shift and daily summaries"], "Flags problems before customers notice them."),
        M("AI Document Intelligence", "Multiple teams", ["Structured data from invoices, POs and delivery notes", "IDs, contracts and CVs", "Validated against the record before filing"], "Extraction plus validation — not extraction alone."),
        M("AI Knowledge Base", "Employees", ["Answers from SOPs, policies, manuals and contracts", "Permission-aware: people only see what they're allowed to", "Product knowledge for sales and support"], "The answer respects the asker's permissions."),
      ] },
      { type: "split", eyebrow: "When to add AI", h: "After the data is reliable.", body: "We add agents only once processes, data and permissions are in place — otherwise AI just makes mistakes faster.", bullets: ["Core system works fully without AI", "Consequential actions pass through permissioned APIs", "Usage limits keep AI costs predictable"], img: "img/19-d.jpg", link: { label: "Read the responsible AI checklist", href: "/insights/responsible-ai-checklist" } },
      cta("Give every team an AI colleague.", "DigitalBurj AI is an add-on to any plan, with defined usage.", { label: "See pricing", href: "/pricing" }, { label: "Talk to us", href: "/contact" }),
    ],
  },
  growth: {
    crumb: "Growth", lockup: "brand/growth-lockup.webp", badge: "Connected to CRM",
    hero: { eyebrow: "DigitalBurj Growth", h1: "Demand you can", accent: "trace to revenue.", lead: "Websites, e-commerce, SEO, answer-engine and AI-search visibility, social, performance marketing and content — every channel connected to the CRM, so you see which ones actually pay.", primary: { label: "Plan your growth", href: "/contact" }, secondary: { label: "See services", href: "#services" }, img: "img/23-d.jpg" },
    sections: [
      { type: "loop", eyebrow: "Attribution first", h: "Every channel ends in the same customer record.", items: ["Website", "Search", "Social", "Ads", "CRM", "Revenue"] },
      { type: "modules", id: "services", eyebrow: "Eight growth services", h: "What we run for you.", items: [
        M("Business Website", "Corporate, service and industry sites", ["Responsive design and CMS", "SEO, analytics and structured data", "CRM forms, WhatsApp, performance and security"], "Every form lands in the CRM with its source."),
        M("E-commerce", "Retail and product SMEs", ["Catalog, variants, stock, cart and checkout", "Payments, orders, returns and shipping", "Connected to CRM and accounting"], "Orders post to finance automatically."),
        M("SEO", "Any business seeking organic demand", ["Technical and on-page SEO", "Local SEO, schema and indexing", "Performance, Search Console and competitor analysis"], "Reported against leads, not just rankings."),
        M("AEO", "Businesses with informational demand", ["Question-based content with concise answers", "FAQs and entity clarity", "Structured information"], "Written to be quoted by answer engines."),
        M("GEO / AI Search", "Brands seeking AI-search visibility", ["Entity consistency and authoritative content", "Source quality, freshness and brand mentions", "Ongoing monitoring"], "We never guarantee inclusion — we improve the odds honestly."),
        M("Social Media", "Consumer and brand-led SMEs", ["Strategy, calendar and creative", "Reels, carousels, captions and approvals", "Publishing, community management and CRM attribution"], "Approvals built into the calendar."),
        M("Performance Marketing", "Lead- and sales-focused SMEs", ["Google and Meta ads", "Landing pages and creative testing", "Conversion tracking and CRM revenue attribution"], "Optimised for revenue, not clicks."),
        M("DigitalBurj Reach", "Travel, property, logistics, recruitment, B2B", ["Public demand signals and intent detection", "Content gaps and competitor/reputation signals", "Human-assisted engagement with CRM attribution"], "Finds buyers already asking for what you sell."),
      ] },
      { type: "pairs", eyebrow: "What usually comes next", h: "Natural next steps.", items: [["Website", "CRM"], ["Marketing", "CRM attribution"], ["CRM", "Automation"], ["Accounting", "e-Invoicing"]] },
      cta("Grow on channels you can measure.", "Growth services run as monthly retainers; websites are project-priced.", { label: "Plan your growth", href: "/contact" }, { label: "Pricing", href: "/pricing" }),
    ],
  },
  studio: {
    crumb: "Studio", lockup: "brand/studio-lockup.webp",
    hero: { eyebrow: "DigitalBurj Studio", h1: "Build what", accent: "deserves to exist.", lead: "Custom web apps, mobile apps, industry ERP and integrations — built on the DigitalBurj core, so you only pay for what's genuinely unique to you.", primary: { label: "Start a project", href: "/contact" }, secondary: { label: "Our ventures", href: "/portfolio" }, img: "img/20-d.jpg" },
    sections: [
      { type: "loop", eyebrow: "The method", h: "Discovery → Product design → Engineering → Deployment.", items: ["Discovery", "Product design", "Engineering", "Deployment"] },
      { type: "modules", eyebrow: "Four Studio services", h: "What Studio builds.", items: [
        M("Custom Web Apps", "Businesses and founders", ["Customer and vendor portals", "Booking systems and marketplaces", "Internal apps, SaaS and management platforms"], "Scoped after a demand check, with a written 'won't build' list."),
        M("Mobile Apps", "Customers, staff and field teams", ["Customer, employee and owner apps", "Driver, field, agent and technician apps", "Offline-friendly where the job needs it"], "Built with React Native on the same APIs as the web."),
        M("Custom ERP Development", "Companies with unique workflows", ["DigitalBurj core plus client-specific workflows", "Industry integrations", "Migration from spreadsheets and legacy tools"], "We never rebuild common modules — you inherit them."),
        M("API & System Integration", "Anyone with disconnected tools", ["Payments and banking where supported", "WhatsApp, email and accounting", "e-Invoicing, Google/Meta and industry systems"], "Official APIs, least-privilege access, full logs."),
      ] },
      { type: "split", reverse: true, eyebrow: "Standards", h: "Production-ready means five things.", body: "Working on a laptop isn't the bar. Every release is checked against the same list.", bullets: ["Correct — automated tests on every change", "Secure — role-based access, scanned dependencies", "Observable — errors and metrics dashboarded", "Recoverable — backups restored on schedule", "Maintainable — another engineer can run it"], img: "img/04-d.jpg", link: { label: "Read the checklist", href: "/insights/what-makes-software-production-ready" } },
      { type: "chips", eyebrow: "Stack", h: "Modern, boring where it matters.", items: ["Next.js + React + TypeScript", "NestJS", "PostgreSQL", "Redis + BullMQ", "S3-compatible storage", "React Native", "pgvector", "Provider-independent AI gateway", "Docker", "OpenTelemetry"] },
      cta("Test the idea before you build it.", "Custom work is project-priced, separate from any subscription.", { label: "Start a project", href: "/contact" }, { label: "Ventures", href: "/portfolio" }),
    ],
  },
  industries: {
    crumb: "Industry Solutions", lockup: "brand/industries-lockup.webp",
    hero: { eyebrow: "DigitalBurj Industry Solutions", h1: "Built for how", accent: "your sector works.", lead: "Vertical modules for 15 sectors that extend the Business OS — so logistics, travel, property or construction workflows sit on the same CRM, finance and HR.", primary: { label: "Discuss your operation", href: "/contact" }, secondary: { label: "Industry OS pricing", href: "/pricing" }, img: "img/22-d.jpg" },
    sections: [
      { type: "modules", eyebrow: "Sector modules", h: "What each industry module includes.", items: [
        M("Logistics & Freight", "Forwarders, transporters, 3PLs", ["Rates, quotations and shipments — FCL/LCL, air and road", "Containers, customs workflow, transport and drivers", "Warehouse, POD, job costing and customer portal"], "Profitability per job, not per month."),
        M("Travel & Tourism", "Agencies and DMCs", ["Travel CRM, quotations and bookings", "Flights, hotels, transfers, attractions and visas", "Suppliers, refunds and booking profitability"], ""),
        M("Trading & Distribution", "Importers, wholesalers and distributors", ["Price lists, customer pricing and quotations", "Orders, stock, delivery and returns", "Receivables, supplier bills and margin analysis"], ""),
        M("Real Estate", "Brokerages and property managers", ["Listings, units, owners, tenants and agents", "Leads, viewings, sales and leases", "Rent, commissions, maintenance and portals"], ""),
        M("Construction & Contracting", "Contractors and fit-out firms", ["Tenders, estimates, budgets and procurement", "Subcontractors, labour, site, equipment, quality and safety", "Variations, progress billing and costing"], ""),
        M("Facility Management", "FM providers", ["Contracts, sites and assets", "Preventive maintenance, work orders and SLA", "Technicians, parts, field app and billing"], ""),
        M("Professional Services", "Consultancies and firms", ["CRM, projects and time", "Contracts, billing and documents", "Client portal"], ""),
        M("Recruitment", "Agencies and in-house teams", ["Clients, jobs and candidates", "ATS, interviews and placements", "Documents and billing"], ""),
        M("Retail", "Stores and chains", ["POS, inventory and purchasing", "Pricing, promotions and loyalty", "E-commerce and delivery"], ""),
        M("Automotive", "Workshops, dealers and rentals", ["Vehicles and customers", "Service and repair jobs, parts and warranty", "Sales and rentals"], ""),
        M("Hospitality", "Hotels and restaurants", ["Reservations, guests and rooms", "Housekeeping and restaurant POS", "Inventory, staff and billing"], ""),
        M("Education", "Schools and training centres", ["Admissions, students and classes", "Attendance, faculty and fees", "Parent and student portals"], ""),
        M("Manufacturing", "Small and mid-size plants", ["BOM, planning and work orders", "Materials, production and quality", "Maintenance, costing and traceability"], ""),
        M("Healthcare Administration", "Clinics and medical groups", ["Appointments and patient administration", "Billing, inventory, staff and procurement", "Clinical systems kept separate"], "Administration only — clinical records stay in clinical systems."),
        M("E-commerce", "Online sellers and brands", ["Catalogue, checkout and payment gateways", "Orders, fulfilment, returns and refunds", "Inventory and finance posting in one flow"], ""),
      ] },
      allSectors(),
      cta("Industry OS: the core plus your sector.", null, { label: "See Industry OS", href: "/pricing" }, { label: "Talk to us", href: "/contact" }),
    ],
  },
  academy: {
    crumb: "Academy", lockup: "brand/academy-lockup.webp",
    hero: { eyebrow: "DigitalBurj Academy", h1: "Learn it. Apply it.", accent: "Prove it.", lead: "Capability built through real missions, human feedback and assessed evidence — one-time purchase, lifetime access, courses from $3.", primary: { label: "Open Academy", href: "https://academy.digitalburj.com" }, secondary: { label: "See pricing", href: "#pricing" }, img: "img/25-d.jpg" },
    sections: [
      { type: "loop", eyebrow: "How learning works", h: "Every mission runs the same 12 stages.", items: ["Brief", "Learn", "Investigate", "Try", "Build", "Break", "Fix", "Test", "Explain", "Defend", "Ship", "Evidence"] },
      { type: "cards", eyebrow: "Why Academy", h: "Built for proof, not seats.", items: [
        { t: "Plain English", b: "Lessons assume no technical background: real examples, step-by-step actions and key words explained." },
        { t: "Missions, not videos", b: "Every course ends in a practice lab on fictional data with a deliverable you submit as evidence." },
        { t: "Human review", b: "A qualified person assesses your work against a published rubric. AI may coach; it never certifies." },
        { t: "Evidence you own", b: "Artefacts, versions and review notes stay private until you choose to share them." },
        { t: "Five layers of proof", b: "Knowledge check, practical mission, project assessment, human review and independent verification." },
        { t: "One-time purchase", b: "No subscription. Courses from $3 and bundles from $3 to $50, with lifetime access." } ] },
      { type: "modules", id: "courses", eyebrow: "Technology track", h: "Nine courses, from foundations to the final challenge.", items: [M("Digital Foundations", "Foundation \u00b7 15 h \u00b7 $3", ["Devices, accounts, files, structured data, online communication, permissions and AI literacy \u2014 from zero."], ""),
        M("Product Discovery & Validation", "Skill \u00b7 28 h \u00b7 $5", ["Interview stakeholders, validate a problem and recommend Build, Reshape or Stop."], ""),
        M("Interface Design & Accessibility", "Skill \u00b7 38 h \u00b7 $5", ["Information architecture, wireframes, UI, design systems and accessible prototypes."], ""),
        M("Web Workflow Engineering", "Skill \u00b7 50 h \u00b7 $7", ["Forms, validation, data display, navigation and permission-aware frontend work."], ""),
        M("Backend, Database & API Contracts", "Skill \u00b7 50 h \u00b7 $7", ["Records, authorization, audit, migrations and server-enforced API contracts."], ""),
        M("AI-Native Engineering Practice", "Specialist \u00b7 35 h \u00b7 $8", ["Precise task briefs, inspecting diffs, debugging and documenting AI contribution."], ""),
        M("Operations, Monitoring & Incident Handling", "Specialist \u00b7 28 h \u00b7 $6", ["Staging deployment, monitoring, defect response, backup and restore."], ""),
        M("Client Delivery & Handoff", "Specialist \u00b7 26 h \u00b7 $6", ["Scope, estimating, change control, handoff packages and responsible support."], ""),
        M("DB-22 Final Assessment Challenge", "Advanced \u00b7 18 h \u00b7 $12", ["A fresh fictional SME workflow, timed change request and live defence."], "")] },
      { type: "modules", eyebrow: "Professional careers", h: "Five career courses for everyday work.", items: [M("Office Administration", "Career \u00b7 55 h \u00b7 $10", ["Calendar, inbox, meetings, spreadsheets, purchasing and confidential information."], ""),
        M("Logistics & Freight Operations", "Career \u00b7 70 h \u00b7 $12", ["Shipment lifecycle, documents, quotes, milestones and exception handling."], ""),
        M("Customer Service", "Career \u00b7 38 h \u00b7 $8", ["Response handling, complaints, escalation, tone and case records."], ""),
        M("Procurement", "Career \u00b7 55 h \u00b7 $10", ["Sourcing, RFQ, vendor evaluation, purchase orders and three-way match."], ""),
        M("Accounting Support", "Career \u00b7 55 h \u00b7 $10", ["Invoicing, payables, reconciliation, month-end support and controls."], "")] },
      { type: "steps", eyebrow: "Credentials", h: "Learning, assessment and verification stay separate.", items: [{ t: "Completion record", b: "You finished the learning activity." }, { t: "Assessed submission", b: "A reviewer scored your work against the published rubric." }, { t: "Verified capability", b: "A different qualified person verified the evidence after a conflict check." }, { t: "Workplace experience", b: "Real delivery in a real workplace — never created by a course." }] },
      { type: "pricing", id: "pricing", eyebrow: "Pricing", h: "Simple, one-time pricing.", lead: "Pay once, keep access for life. No subscription, no hidden fees. 14-day refund if no assessment has been submitted.", plans: [
        { name: "Starter", price: "$3", per: "one-time", scope: "Digital Foundations — one full course with practice lab and completion record.", cta: "Get Starter", href: "https://academy.digitalburj.com" },
        { name: "AI-Native Builder", price: "$19", per: "one-time", scope: "Five technology courses, from discovery to AI-native engineering, with the assessed evidence route.", featured: true, cta: "Get Builder", href: "https://academy.digitalburj.com" },
        { name: "Complete Academy", price: "$50", per: "one-time", scope: "All 14 courses across both tracks, including the DB-22 final challenge.", cta: "Get Complete", href: "https://academy.digitalburj.com" } ] },
      { type: "pairs", eyebrow: "Also available", h: "Other bundles and single courses.", items: [["Web Essentials", "$9"], ["Full-Stack Product", "$29"], ["Office Career", "$25"], ["Logistics Career", "$29"], ["Single courses", "From $3"]] },
      { type: "faq", items: [
        { q: "What is included in a purchase?", a: "Every lesson, checkpoint and practice lab in the course or bundle, plus the assessed evidence route. You only see what you have bought." },
        { q: "Can I upgrade from a course to a bundle?", a: "Yes. Buying a bundle that contains a course you already own credits the value of that course, so you pay only the difference." },
        { q: "Who reviews my work?", a: "A qualified human reviewer marks your lab evidence against a published rubric. AI may coach, but it never issues a credential." },
        { q: "Is a certificate a job guarantee?", a: "No. Learning, assessment and independent verification are separate records. Participation does not by itself provide employment, a visa, a licence or accreditation." },
        { q: "Can my employer see my progress?", a: "Not by default. Evidence is private until you choose to share it, and only for the purpose you approve." },
        { q: "Where do I sign in and study?", a: "Everything happens in the Academy app. Use any Open Academy button on this page to continue." } ] },
      cta("Learn it. Apply it. Prove it.", "Start with the $3 Starter Pack and upgrade whenever you are ready — you only pay the difference.", { label: "Open Academy", href: "https://academy.digitalburj.com" }, null),
    ],
  },
  talent: {
    crumb: "Verified Talent", lockup: "brand/talent-lockup.webp", badge: "In development",
    hero: { eyebrow: "DigitalBurj Verified Talent", h1: "Capability you can see.", accent: "Evidence you can trust.", lead: "A marketplace of verified developers, designers, marketers, accountants, automation specialists and operations talent — each skill linked to the work behind it.", primary: { label: "Register interest", href: "/contact" }, secondary: { label: "Hiring guide", href: "/insights/skills-based-hiring-guide" }, img: "img/29-d.jpg" },
    sections: [
      { type: "steps", eyebrow: "How it works", h: "Three kinds of skill, labelled differently.", items: [{ t: "Self-reported", b: "The person says they can do it. Useful, but unchecked." }, { t: "Assessed", b: "They passed a set task under set conditions." }, { t: "Reviewed", b: "Someone independent looked at their actual work and agreed." }] },
      { type: "chips", eyebrow: "Specialists", h: "Who you'll find.", items: ["Developers", "Designers", "Marketers", "Accountants", "Automation specialists", "Operations talent"] },
      { type: "faq", items: [{ q: "Is it live?", a: "Not yet. Register and we'll contact you when the first features open." }, { q: "Is this a recruitment agency?", a: "No. Recruitment and placement functions are kept legally and operationally distinct where required." }] },
      cta("Want to be on the early list?", null, { label: "Register interest", href: "/contact" }, null),
    ],
  },
  jobs: {
    crumb: "Jobs",
    hero: { eyebrow: "DigitalBurj Jobs", h1: "More than applications.", accent: "Better hiring decisions.", lead: "Real vacancies with a named employer and a closing date. Candidates attach work they've done, so employers see capability before the interview.", primary: { label: "Employer enquiry", href: "/contact" }, secondary: { label: "Hiring guide", href: "/insights/skills-based-hiring-guide" }, img: "img/18-d.jpg" },
    sections: [
      { type: "split", eyebrow: "Open roles", h: "No open listings right now.", body: "We'd rather show nothing than pad this page. Register and we'll tell you when a matching role goes up.", bullets: ["Every listing has a named employer", "Every listing has a closing date", "Applying is always free"], img: "img/13-d.jpg", link: { label: "Register interest", href: "/contact" } },
      cta("Hear when a matching role goes up.", null, { label: "Register interest", href: "/contact" }, null),
    ],
  },
  pricing: {
    crumb: "Pricing", badge: "Launch pricing",
    hero: { eyebrow: "Pricing", h1: "Enterprise capability.", accent: "SME pricing.", lead: "Simple company-level plans, usage limits only on genuinely expensive resources, and project work priced separately — so you always know what's included.", primary: { label: "Talk to sales", href: "/contact" }, secondary: { label: "Compare plans", href: "#plans" }, img: "img/31-d.jpg" },
    sections: [
      { type: "pricing", id: "plans", eyebrow: "Plans", h: "Pick a starting point.", lead: "Indicative launch prices in USD, billed per company. Confirmed at onboarding." },
      { type: "modules", eyebrow: "Launch bundles", h: "What each bundle includes.", items: [
        M("Business Starter", "Small teams getting organised", ["CRM, customers, quotations and invoices", "Expenses, tasks and documents", "Dashboard and WhatsApp alerts"], ""),
        M("Business Pro", "Growing SMEs", ["Everything in Starter", "Accounting, procurement and inventory", "HR and workflow automation"], ""),
        M("DigitalBurj AI", "Owners who want leverage", ["Everything in Pro", "AI Executive, AI Sales and AI Support", "Owner WhatsApp intelligence"], ""),
        M("Industry OS", "Sector-specific operations", ["Everything in Pro", "One sector operations module", "Portals and mobile as natural add-ons"], ""),
      ] },
      { type: "pairs", eyebrow: "Services", h: "Subscription vs. project work.", items: [["SaaS", "Monthly / annual subscription"], ["Basic onboarding", "Included or low-cost"], ["Data migration", "Project fee"], ["Custom workflow or integration", "Project fee"], ["Website or mobile app", "Project fee"], ["Digital marketing, SEO / GEO", "Monthly retainer"], ["Dedicated hosting, priority support", "Add-on"]] },
      { type: "chips", eyebrow: "Honest limits", h: "What we'll never bundle as 'unlimited'.", lead: "Low prices stay low because these are usage-based.", items: ["Unlimited customisation", "Unlimited AI", "Unlimited WhatsApp", "Unlimited storage"] },
      { type: "faq", items: [{ q: "Why are custom projects priced separately?", a: "So small businesses aren't paying for other customers' custom work. Your subscription covers the shared platform; your unique work is quoted on its own." }, { q: "Can I start free?", a: "Yes. The Free plan covers freelancers and micro-businesses, and you can upgrade any time." }, { q: "Do prices vary by country?", a: "Plans are priced per company. Country localization modules (tax, e-invoicing, payroll) may be added where required." }] },
      cta("Not sure which plan fits?", "A free digital audit maps your gaps to the right modules.", { label: "Book a free audit", href: "/contact" }, null),
    ],
  },
  company: {
    crumb: "Company",
    hero: { eyebrow: "About DigitalBurj", h1: "One relationship.", accent: "One platform.", lead: "DigitalBurj gives SMEs the technology stack of a larger enterprise — without the enterprise complexity or price. One provider, one account, one customer record, one owner dashboard, one AI layer, one support relationship.", primary: { label: "Contact us", href: "/contact" }, secondary: { label: "How we deliver", href: "#delivery" }, img: "img/33-d.jpg" },
    sections: [
      { type: "steps", id: "delivery", eyebrow: "Customer delivery", h: "Twelve steps from discovery to continuous improvement.", items: [
        { t: "Discovery", b: "Business model, people, branches, tools, workflows and growth needs." }, { t: "Digital audit", b: "Website, CRM, ERP, finance, HR, marketing, security and manual work." },
        { t: "Gap map", b: "Current state → problem → module → benefit → priority." }, { t: "Implementation plan", b: "Immediate, 30-day, 90-day and future roadmap." },
        { t: "Business OS setup", b: "Company, users, roles, CRM, finance and HR foundation." }, { t: "Industry setup", b: "Vertical workflows activated where required." },
        { t: "Automation", b: "Repeat work automated after the process is understood." }, { t: "AI", b: "Agents added only after reliable data and permissions exist." },
        { t: "Growth", b: "Website, acquisition channels and CRM attribution connected." }, { t: "Training", b: "Owner, admins and employees trained." },
        { t: "Go live", b: "Migration, testing, acceptance, backup, monitoring and support." }, { t: "Continuous improvement", b: "Monthly review of usage, sales, marketing, support, AI and automation." } ] },
      { type: "modules", eyebrow: "The DigitalBurj standard", h: "What 'better' means here.", items: [
        M("Fewer clicks", "", ["We measure steps for common SME jobs and keep reducing them"], ""), M("Faster onboarding", "", ["Customers start without weeks of consulting"], ""),
        M("Understandable errors", "", ["Every error says what failed, why, and what fixes it"], ""), M("No duplicate entry", "", ["Data flows from sales to operations to finance"], ""),
        M("Mobile-first", "", ["Approvals, sales and daily tasks work well on a phone"], ""), M("WhatsApp-native", "", ["Official integrations for owner and customer workflows"], ""),
        M("AI-native", "", ["AI sees only authorised data and acts through controlled tools"], ""), M("Transparent pricing", "", ["You know what's included and what's usage- or project-based"], ""),
        M("Flexible workflow", "", ["Operational change never corrupts historical financial records"], ""), M("Local where it matters", "", ["Country requirements built deliberately as localization modules"], ""),
      ] },
      cta("Talk to DigitalBurj.", null, { label: "Contact us", href: "/contact" }, { label: "Pricing", href: "/pricing" }),
    ],
  },
  solutions: {
    crumb: "Solutions",
    hero: { eyebrow: "Solutions", h1: "What's going", accent: "wrong?", lead: "Start from the problem. Each one maps to the DigitalBurj module that fixes it.", primary: { label: "Book a free audit", href: "/contact" }, secondary: null, img: "img/12-d.jpg" },
    sections: [
      { type: "cards", eyebrow: "By problem", h: "Symptom → module", items: [
        { t: "Leads slip through the cracks", b: "CRM with assignment, scoring and inactive-lead reminders.", href: "/business-os" },
        { t: "Everything lives in Excel and WhatsApp", b: "Business OS with a unified inbox and one customer timeline.", href: "/business-os" },
        { t: "Finance and operations disagree", b: "Accounting connected to sales, procurement and inventory.", href: "/business-os" },
        { t: "Approvals happen in chat", b: "Universal approval engine with thresholds and audit history.", href: "/business-os" },
        { t: "The owner has no single view", b: "Owner Command Center and a daily AI briefing.", href: "/business-ai" },
        { t: "Staff re-type documents all day", b: "AI document intelligence with validation.", href: "/business-ai" },
        { t: "Marketing spend can't be traced", b: "Growth services with CRM revenue attribution.", href: "/growth" },
        { t: "Off-the-shelf software doesn't fit", b: "Studio builds on the core — only the unique parts.", href: "/studio" } ] },
      cta("Not sure which applies?", "A digital audit maps every gap to a module and a priority.", { label: "Get started", href: "/get-started" }, null),
    ],
  },
  portfolio: {
    crumb: "Portfolio",
    hero: { eyebrow: "Portfolio", h1: "Our own products", accent: "and ventures.", lead: "Projects DigitalBurj is building or running. Details go up once confirmed — we don't publish made-up traction or customer numbers.", primary: { label: "Start a project", href: "/contact" }, secondary: null, img: "img/26-d.jpg" },
    sections: [
      { type: "cards", eyebrow: "Ventures", h: "In the portfolio", items: [
        { t: "LoadByTon", b: "Logistics · A logistics venture and software platform." }, { t: "Attesora", b: "Documents · A document platform venture." },
        { t: "Procurazo", b: "Procurement · A procurement venture." }, { t: "VelozTrade", b: "Venture · Details being prepared." }, { t: "HospyQ", b: "Venture · Details being prepared." } ] },
      cta("Build something that should exist.", null, { label: "Start a project", href: "/contact" }, { label: "About Studio", href: "/studio" }),
    ],
  },
  "get-started": {
    crumb: "Get Started",
    hero: { eyebrow: "Get started", h1: "What would", accent: "you like to do?", lead: "Choose the option closest to your goal and we'll route you to the right team.", primary: { label: "Contact us", href: "/contact" }, secondary: { label: "See pricing", href: "/pricing" }, img: "img/01-d.jpg" },
    sections: [
      { type: "cards", eyebrow: "Choose a path", h: "Nine ways in", items: [
        { t: "Run my business on one system", b: "Business OS", href: "/business-os" }, { t: "Add AI to operations", b: "DigitalBurj AI", href: "/business-ai" }, { t: "Get more customers", b: "Growth", href: "/growth" },
        { t: "Build custom software", b: "Studio", href: "/studio" }, { t: "Software for my industry", b: "Industry Solutions", href: "/industries" }, { t: "Train my team", b: "Academy", href: "/academy" },
        { t: "Find verified specialists", b: "Verified Talent", href: "/talent" }, { t: "Compare plans", b: "Pricing", href: "/pricing" }, { t: "Something else", b: "General contact", href: "/contact" } ] },
    ],
  },
};
