// DB-06 Operations, Monitoring & Incident Handling — for non-technical learners.
module.exports = {
  "DB-06": {
    outcome: "Understand how a website or system is safely put live, watched, repaired when it breaks and restored from backups, and explain these things clearly to a client.",
    units: [
      {
        t: "Getting a system live safely: practice copies and the real thing",
        goal: "Explain the difference between a test copy and the live system and why changes go through both.",
        body: [
          "Imagine a restaurant that tries a new recipe on real customers during the busiest hour. If it goes wrong, the whole evening is ruined. Sensible restaurants test new dishes in the kitchen first, with staff tasting them. Software works the same way. The live system, used by real customers, is often called production. A separate practice copy, where changes are tried out safely, is called staging (or a test environment).",
          "The safe route is: make a change, try it in a practice copy, check that it works and nothing else broke, and only then release it to production. This route is called deployment or a release. Small, frequent releases are safer than huge rare ones, because if something goes wrong there is little to look through and it is easy to undo.",
          "Before every release, use a checklist. Is the change reviewed by a second person? Was it tried on the practice copy? Is there a recent backup? Is there a plan to undo it (a rollback)? Is someone available to watch it after release? Choose quiet times for risky releases and avoid Friday evenings, when fewer people are around to fix problems.",
          "After the release, check the important things straight away: can people still sign in, can they complete the main task (buy, book, submit), do pages load? This quick check is sometimes called a smoke test, from the idea of switching a machine on and seeing whether smoke comes out. If the answer is 'no', undo the release immediately and investigate afterwards."
        ],
        example: "A small online florist wanted to add a delivery-date picker just before Mother's Day. The developer tested it on the practice copy and found that it broke the payment page on phones. Fixing it took an hour. Had it gone straight to the live site the week before the busiest day of the year, hundreds of orders would have been lost.",
        steps: [
          "Make the change and describe it in one or two sentences.",
          "Have a second person review it.",
          "Try it on the practice copy and test the main journeys.",
          "Confirm a recent backup exists and write down how to undo the change.",
          "Release at a quiet time, run the smoke test, and be ready to undo."
        ],
        mistakes: [
          "Changing the live system directly 'because it is only a small edit'.",
          "Releasing late on a Friday with nobody watching.",
          "Not knowing how to undo a change."
        ],
        terms: [["Production", "The live system used by real customers."], ["Staging", "A practice copy used to test changes safely."], ["Deployment / release", "Putting a change into the live system."], ["Rollback", "Undoing a release to return to the previous working version."]],
        tryit: "Write a five-line release checklist for a small business website. Include review, test copy, backup, undo plan and the time of day you would release.",
        pts: ["Test changes on a practice copy before the live system.", "Small, frequent releases are safer than big rare ones.", "Always have a backup and a way to undo."],
        qs: [
          { p: "Where should a change be tried first?", o: ["Directly on the live site", "On a practice copy (staging)", "On a customer's phone"], a: 1 },
          { p: "What is a rollback?", o: ["A way to return to the previous working version", "A new feature", "A type of backup"], a: 0 }
        ]
      },
      {
        t: "Secrets and settings: keeping keys out of sight",
        goal: "Explain what a secret is, where it must never be kept and how settings differ between practice and live.",
        body: [
          "Systems use secret information to work: the password to the database, the key that lets the website send email, the code that allows payments to be taken. These are called secrets or keys. If they leak, a stranger can send emails in your name, read your customers' data or spend your money. Protecting them is basic hygiene.",
          "The first rule is never to write secrets inside the documents where the team stores the project, and never to paste them into chats or emails. Once a secret is in a shared place it can be copied, forgotten and found. Instead, secrets are stored in a protected settings area of the hosting service, and the system reads them when it starts. Only a few trusted people can see them.",
          "The second rule is separation. The practice copy and the live system should use different secrets. If a practice key leaks, live customers are not harmed. Settings such as 'which database do I talk to' also differ between the two, which is why they are kept in an environment settings area instead of being built into the product.",
          "The third rule is to plan for leaks. Keep a list of which secrets exist and who owns them. If one may have leaked, replace it at once (this is called rotating the key) and check the activity logs. Change keys when people leave. And give each key only the access it needs; a key that only has to send email should not also be able to delete the database."
        ],
        example: "A freelancer built a site for a bakery and pasted the payment key into a shared notes document. Later, the document was shared by mistake with a supplier. A stranger used the key to test stolen cards through the bakery's payment account, and the bakery faced fees and a suspended account. The lesson: the key belonged in the protected settings area, and the moment the sharing happened it should have been replaced.",
        steps: [
          "List every secret the system uses and who is responsible for each.",
          "Store them only in the protected settings area of your hosting service.",
          "Use different secrets for the practice copy and the live system.",
          "Give each key only the permissions it needs.",
          "If a secret may have leaked, replace it immediately and review recent activity."
        ],
        mistakes: [
          "Putting keys in documents, chats or emails.",
          "Using the same key for practice and live.",
          "Not replacing a key after a person with access leaves."
        ],
        terms: [["Secret / key", "A private code that gives access to a service or data."], ["Environment settings", "Protected settings that differ between practice and live."], ["Rotate a key", "Replace a key with a new one and stop the old one working."], ["Least access", "Giving a key only the permissions it really needs."]],
        tryit: "List three secrets a small online shop would have (for example the payment key). For each, write where it should be kept and who should be able to see it.",
        pts: ["Secrets never belong in shared documents or chats.", "Keep practice and live secrets separate.", "Replace a key at once if it may have leaked."],
        qs: [
          { p: "Where should an API secret key be kept?", o: ["In a shared notes document", "In the protected environment settings of the hosting service", "On the public web page"], a: 1 },
          { p: "A key may have leaked. What is the first action?", o: ["Wait and see", "Replace (rotate) the key and check recent activity", "Tell customers to change their passwords only"], a: 1 }
        ]
      },
      {
        t: "Watching the health of your system: monitoring",
        goal: "Choose a few simple signals that show whether customers are being served well and understand how alerts should work.",
        body: [
          "If a shop's front door is locked during opening hours, the owner wants to know before customers complain. Monitoring means watching a system's health automatically and telling the right person when something goes wrong. Without it, the first alert is often an angry customer, sometimes days late.",
          "Watch what customers feel, not every technical detail. Three signals cover most needs. Availability: is the site up and reachable? Errors: what share of requests fail? Speed: how long do pages and actions take? Add one or two signals for the business itself, such as 'orders per hour' or 'sign-ups per day'. If orders drop to zero at noon on a Tuesday, something is wrong, even if all the technical lights are green.",
          "An alert is a message sent to a person when a signal crosses a line. Good alerts follow simple rules. They warn about problems that need a human. They say what is wrong and where to look first. They go to a named person who is responsible. And there are few of them. If alerts fire all the time for trivial reasons, people stop reading them (called alert fatigue), and the one important alert gets missed.",
          "Also decide what 'good enough' means. A target such as 'the site is available 99.9 percent of the time' (about 43 minutes of downtime in a month) turns hopes into a promise you can measure. Publish a simple status page so customers can see what is happening during a problem. Honest, quick communication builds more trust than pretending nothing is wrong."
        ],
        example: "A ticketing site watched only whether the server was switched on. One Saturday the server was on, but the payment step was failing for half of customers. Nobody knew for three hours until social media complained. After the incident they added a signal for 'successful payments per ten minutes' and an alert to the on-duty person. The next time payments dipped, they were told within five minutes.",
        steps: [
          "Choose signals customers would feel: availability, errors, speed and one business number.",
          "Set a line for each that means 'a human should look'.",
          "Send alerts to a named person with a short message and where to look first.",
          "Remove or fix alerts that fire too often for no reason.",
          "Set a simple target and publish a status page or update channel."
        ],
        mistakes: [
          "Watching only whether the server is on.",
          "Sending so many alerts that people ignore them.",
          "Having alerts that go to nobody in particular."
        ],
        terms: [["Monitoring", "Automatically watching a system's health."], ["Alert", "A message sent when a signal shows a problem."], ["Availability", "The share of time that the service works."], ["Alert fatigue", "Ignoring alerts because there are too many unimportant ones."]],
        tryit: "For a small online shop, list four signals you would monitor (three technical, one business). For each, write the line at which someone should be alerted.",
        pts: ["Monitor what customers feel: availability, errors, speed and a business number.", "Good alerts are few, clear and go to a named person.", "Publish honest status updates during problems."],
        qs: [
          { p: "What makes an alert useful?", o: ["It fires constantly", "It signals real customer impact and goes to a named person", "It is sent to everyone in the company"], a: 1 },
          { p: "What does 'alert fatigue' mean?", o: ["People ignoring alerts because there are too many unimportant ones", "A tired server", "A broken phone"], a: 0 }
        ]
      },
      {
        t: "When something breaks: handling an incident calmly",
        goal: "Follow a clear order of steps during a live problem: stabilise, communicate, fix, then learn.",
        body: [
          "An incident is any unplanned problem that hurts customers or the business: the site is down, payments fail, private data may have leaked. Incidents are stressful, and stress makes people act badly. A simple, practised routine keeps everyone calm and effective.",
          "The order of priority is: first make things safe and stop the damage; second tell the people affected; only third find and fix the root cause. If the latest release caused the problem, the fastest safe move is often to undo it (rollback) and investigate afterwards. Fixing the cause while customers are suffering is a common mistake.",
          "Give the incident one leader. This person does not fix things personally; they coordinate: who is investigating, who is talking to customers, who is watching the systems. Keep a timeline as you go: the time of each observation, decision and action. Use one shared channel so that everyone sees the same facts, and give short, regular updates ('Still investigating. Next update in 20 minutes.').",
          "Afterwards, hold a blameless review. Blameless means you ask 'how did our system and habits allow this?' instead of 'who is to blame?' People who fear punishment hide mistakes, and hidden mistakes repeat. The review writes down what happened, the impact, the cause, what went well, what did not, and concrete actions with owners and dates. Then actually do them."
        ],
        example: "At 10:02 a shop released a new checkout. By 10:09 errors rose from 1 percent to 22 percent and complaints started. The incident leader ordered an immediate undo; by 10:20 errors were back to normal. A message on the website said 'Some customers had trouble paying between 10:05 and 10:20; orders were not lost.' The team investigated after the shop was working and found the cause the same afternoon.",
        steps: [
          "Confirm the problem and decide who leads.",
          "Stop the damage first, for example by undoing the latest change.",
          "Tell affected people plainly what is happening and when you will update them.",
          "Keep a timeline of what was seen, decided and done.",
          "Fix the root cause, then hold a blameless review with actions, owners and dates."
        ],
        mistakes: [
          "Searching for the cause while customers are still affected.",
          "Having many people give orders at once.",
          "Blaming a person instead of improving the system."
        ],
        terms: [["Incident", "An unplanned problem that harms customers or the business."], ["Incident leader", "The person who coordinates the response."], ["Root cause", "The underlying reason the problem happened."], ["Blameless review", "A meeting after an incident to learn and improve without blaming people."]],
        tryit: "Write a short public message (three sentences) that a shop could post when its payment page fails for 15 minutes. It must be honest, calm and say when the next update will come.",
        pts: ["Stabilise first, communicate second, find the cause third.", "One leader and one timeline keep the response clear.", "Learn through a blameless review with actions."],
        qs: [
          { p: "What comes first in a live incident?", o: ["Find out who is to blame", "Stop the damage and communicate", "Rewrite the whole system"], a: 1 },
          { p: "What is a blameless review?", o: ["A meeting to learn how the system allowed the problem, not to blame people", "A meeting where nobody speaks", "A public trial"], a: 0 }
        ]
      },
      {
        t: "Backups and restores: making sure you can come back",
        goal: "Explain what a good backup plan contains and why a backup is worthless until a restore has been tested.",
        body: [
          "Things get lost: a mistaken deletion, a broken update, a stolen laptop, a fire, a virus that locks your files. A backup is an extra copy of your data kept somewhere else, so that after a disaster you can come back. The old rule of thumb is 3-2-1: keep three copies of important data, on two different kinds of storage, with one copy in a different place.",
          "Two numbers turn a backup into a plan. Recovery point objective (RPO) is how much recent data you can afford to lose: if you back up once a day, you might lose up to a day of work. Recovery time objective (RTO) is how long you can afford to be down while you restore. A bakery may accept losing a day of orders and a few hours of downtime; a hospital may accept neither. Ask the business owner and write the answer down.",
          "The most important rule: a backup that has never been restored is only a hope. Backups can silently fail, be empty, or be unreadable. Schedule a test restore, for example every quarter: take a backup, restore it to a practice copy and check that the data is complete and the system works. Record how long it took, because that is your real recovery time.",
          "Protect the backups too. They contain the same private data as the live system, so they need the same care: restricted access and protection so that the person or virus that harms the live system cannot also delete the backups. Decide how long each backup is kept and delete old ones when no longer needed."
        ],
        example: "A physiotherapy clinic backed up its appointments every night to a drive plugged into the same computer. When a virus locked the computer, it locked the drive too. There was no other copy. They lost two years of records. Since then they use a cloud backup in a different account and test restoring it every quarter.",
        steps: [
          "List the data and systems that matter most.",
          "Ask the owner how much data loss (RPO) and downtime (RTO) is acceptable.",
          "Set up backups following 3-2-1 with at least one copy somewhere else.",
          "Schedule a test restore on a practice copy and record how long it takes.",
          "Restrict who can access or delete backups and decide how long to keep them."
        ],
        mistakes: [
          "Keeping the only backup next to the original.",
          "Never testing a restore.",
          "Letting anyone delete backups."
        ],
        terms: [["Backup", "An extra copy of data kept so it can be recovered."], ["3-2-1 rule", "Three copies, on two kinds of storage, one stored elsewhere."], ["RPO", "How much recent data you can afford to lose."], ["RTO", "How long you can afford to be down while recovering."]],
        tryit: "Choose a small business. Write its RPO and RTO in plain words (for example 'we can lose at most one day of orders and be offline at most four hours') and the schedule for a test restore.",
        pts: ["Follow 3-2-1 and keep at least one copy elsewhere.", "RPO and RTO turn backups into a plan.", "A backup is trustworthy only after a successful test restore."],
        qs: [
          { p: "When can a backup be considered trustworthy?", o: ["When it exists", "After it has been successfully restored in a test", "When the file is large"], a: 1 },
          { p: "What does RTO mean?", o: ["How long you can afford to be down while recovering", "How many backups you keep", "The size of a backup"], a: 0 }
        ]
      },
      {
        t: "Talking honestly about limits: what the system does not promise",
        goal: "Describe a system's limits and risks truthfully to clients, and write a short operations note that others can follow.",
        body: [
          "No system is perfect, and clients respect people who say so. Being honest about limits is part of professional operations. If you promise 'the site will never go down', you will eventually break the promise and the trust. If you say 'we aim for 99.9 percent availability; planned maintenance is announced 48 hours ahead; backups run nightly and are restored in tests every quarter', you have made a promise you can keep.",
          "State plainly what is covered and what is not. For example: response times to problems, what counts as an emergency, which hours support is available, what happens if a third-party service (payment company, hosting provider) fails, and what data may be lost between backups. Put it in writing so that expectations match. Surprises are what damage relationships, not limits.",
          "Give clients a simple operations note, sometimes called a runbook: one or two pages describing how to check the system is healthy, who to call, what to do in the three most likely emergencies, where the backups are and how to restore them. Write it for a person who was not involved in building the system and is stressed at 2 in the morning. Short, numbered steps and plain words work best.",
          "Finally, keep improving. After every incident, update the note. Once a year, review the promises: are they still right? Have you grown? Have new risks appeared? A living, honest document beats a perfect one that nobody trusts."
        ],
        example: "A web agency's contract with a local school said, in one page: 'Support hours 8:00 to 17:00 on school days. Urgent problems (site down, payments failing) answered within 1 hour, others within 2 working days. Backups nightly, up to 1 day of data may be lost in a disaster. We rely on two outside services (hosting and email) and their outages are outside our control, but we will keep you informed.' There were no arguments later, because everyone knew the rules.",
        steps: [
          "List what you promise: availability target, response times, backup schedule.",
          "List what is not covered and the outside services you depend on.",
          "Write the operations note: health check, contacts, three likely emergencies, backup and restore steps.",
          "Ask someone who was not involved to follow the note and fix anything unclear.",
          "Review and update it after every incident and at least once a year."
        ],
        mistakes: [
          "Promising perfection.",
          "Hiding limits in small print.",
          "Writing the note for experts only."
        ],
        terms: [["Runbook", "A short guide that tells someone how to run and repair a system."], ["Service level", "A written promise about how well and how fast a service will work."], ["Dependency", "An outside service your system relies on."], ["Maintenance window", "A planned time when a system may be unavailable for updates."]],
        tryit: "Write a five-sentence 'what we promise and what we do not' note for a small online shop, including availability, support hours, backups and one outside dependency.",
        pts: ["Honest, specific promises build more trust than promises of perfection.", "Write down what is covered and what is not.", "A short runbook lets someone else keep the system safe."],
        qs: [
          { p: "Which promise is best for a client contract?", o: ["The site will never go down", "We aim for 99.9% availability and announce planned maintenance 48 hours ahead", "Everything will always work"], a: 1 },
          { p: "Who should the runbook be written for?", o: ["A stressed person who was not involved in building the system", "Only the builder", "Nobody in particular"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Write the incident report for a failed checkout",
      scenario: "An online shop released a new checkout page on a Tuesday morning. Soon afterwards customers could not pay. The team undid the release and things returned to normal. The manager asks you to write the incident report so that customers, staff and the owner understand what happened, and to recommend improvements. Use the timeline and facts below.",
      cols: ["Time", "What happened"],
      rows: [["10:02", "Release v42 (new checkout) goes live."], ["10:09", "Payment error rate rises from 1% to 22%."], ["10:12", "Support receives six customer complaints. Nobody was alerted automatically."], ["10:15", "The team notices on social media, decides to undo the release."], ["10:20", "Release v41 restored; errors return to 1%."], ["Later", "The team finds that v42 sent the total in the wrong format to the payment company for orders with discount codes."]],
      tasks: ["Write the impact statement: who was affected, for how long and how badly (use the timeline).", "Write a short honest public message for customers (three to four sentences).", "Explain the most likely root cause in plain words and how it was confirmed.", "List three improvements with an owner and a date each (think about monitoring, testing and the release process)."],
      hints: ["The problem lasted from about 10:02 or 10:09 until 10:20; choose and explain your start time.", "Notice that nobody was alerted automatically: that is an improvement opportunity.", "Blameless means you describe what the system allowed, not who erred."],
      rubric: ["The impact statement is accurate and uses the timeline.", "The public message is calm, honest and says what customers should expect.", "The cause is explained in plain words, not blame.", "Improvements are specific, owned and dated."],
      deliverable: "A blameless incident report of about 200 words with impact, public message, cause and three improvements."
    }
  }
};
