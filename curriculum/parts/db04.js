// DB-04 Backend, Database & API Contracts — explained for non-technical learners.
module.exports = {
  "DB-04": {
    outcome: "Understand and plan how a business system stores information, protects it, records what happens and talks to other systems, using everyday comparisons.",
    units: [
      {
        t: "What a database is (think of a very organised filing room)",
        goal: "Explain what a database, a table, a record and a field are and why systems use them.",
        body: [
          "A database is an organised place where a system keeps its information so that it can be found, added to and changed quickly and safely. If a spreadsheet is a single sheet of paper, a database is a large filing room with many labelled drawers, strict rules and a clerk who never gets tired.",
          "Inside a database, information is kept in tables. A table holds one kind of thing: a Customers table, an Orders table, a Products table. Each row in a table is one record, one customer or one order. Each column is a field, one fact about the record, such as name, email or order date. If you can imagine one spreadsheet tab per kind of thing, you have understood the idea.",
          "Why not just use a spreadsheet? Databases can be used by many people at the same time without overwriting each other's work. They enforce rules ('every order must belong to a customer'). They handle millions of records quickly. They keep a reliable history, and they can be protected so that only allowed people and programs can reach them.",
          "Every record also needs a unique identifier, a code or number that no other record shares, called an ID. Names are not unique (two customers can both be called Ahmed) but an ID like 10482 is. IDs let systems point at exactly the right record. You will hear the words 'primary key' for this. It simply means the ID that identifies a row."
        ],
        example: "A pizza shop keeps a Customers table (ID, name, phone, address) and an Orders table (ID, customer ID, date, total). When Layla phones in, staff type her phone number and the system finds customer 2051. The new order gets number 90310 and records that it belongs to customer 2051. Because the customer is stored only once, changing her address in one place fixes it for every order.",
        steps: [
          "List the kinds of things your business keeps information about (customers, orders, products).",
          "Give each kind its own table.",
          "For each table, list the facts you need as columns.",
          "Add an ID column to every table that identifies each row uniquely.",
          "Check that each fact is stored in only one place."
        ],
        mistakes: [
          "Putting everything in one giant table.",
          "Using names or phone numbers as identifiers when they can change or repeat.",
          "Typing the same fact (like an address) in many places."
        ],
        terms: [["Database", "An organised, protected store of information that many people and programs can use at once."], ["Table", "A collection of records of one kind, like a spreadsheet tab."], ["Record / row", "One item in a table, such as one customer."], ["ID (primary key)", "A unique number that identifies each record."]],
        tryit: "Take a small business you know (a salon, a shop, a school club). List three tables it would need and five columns for each, plus the ID column.",
        pts: ["A database is a protected, organised store of information.", "Tables hold one kind of thing; rows are records; columns are facts.", "Every record needs a unique ID."],
        qs: [
          { p: "In a Customers table, what is one row?", o: ["One customer", "One column", "The whole database"], a: 0 },
          { p: "Why do records need a unique ID?", o: ["So each one can be identified exactly, even if names repeat", "So they look neat", "So they use less memory"], a: 0 }
        ]
      },
      {
        t: "Designing records and how they connect",
        goal: "Plan tables and link them together with simple relationships so information is stored once and stays correct.",
        body: [
          "Good database design is like good tidiness: everything has one proper home. When information is stored once, it cannot disagree with itself. When the same fact lives in three places, one day the three will differ and nobody will know which is right.",
          "Tables are connected by relationships. The most common is one-to-many: one customer can place many orders, but each order belongs to only one customer. In the Orders table you store the customer's ID. This ID is called a foreign key (a link to a record in another table). To find all orders for a customer, the system looks for orders that carry that customer's ID.",
          "Sometimes two things relate many-to-many: an order can contain many products, and a product can appear in many orders. The tidy solution is a small middle table, often called Order items, where each row says 'order 90310 includes product 55, quantity 2'. It looks like extra work, but it keeps everything clean.",
          "Choose careful types for each field. Money should be stored in the smallest unit as a whole number (cents or fils) to avoid rounding problems, so 19.99 is stored as 1999. Statuses should be a fixed list ('pending', 'paid', 'refunded') instead of free text, so 'Paid', 'paid ' and 'PAID' are never confused. Always record when a row was created and last changed."
        ],
        example: "A training company stored each learner's course name typed by hand in every enrolment row. Over time the same course appeared as 'Excel', 'excel basic' and 'MS Excel'. Reports counted them as three different courses. After creating a Courses table and storing the course ID in each enrolment, the counts became correct and renaming a course took one edit.",
        steps: [
          "Draw a box for each table and write its columns.",
          "For every 'one-to-many' link, put the 'one' side's ID in the 'many' side's table.",
          "For 'many-to-many' links, add a middle table with two IDs.",
          "Store money as whole numbers in the smallest unit and choose fixed lists for statuses.",
          "Add created-at and updated-at columns to every table."
        ],
        mistakes: [
          "Repeating the same information in several tables.",
          "Using free text where a fixed list would prevent mistakes.",
          "Storing money as decimals that can round wrongly."
        ],
        terms: [["Relationship", "A link between two tables, such as customer to orders."], ["Foreign key", "A column holding the ID of a record in another table."], ["One-to-many", "One record on one side can connect to many on the other."], ["Status", "A field with a fixed list of allowed values that shows the stage of something."]],
        tryit: "Design tables for a small library: Books, Members and Loans. Write the columns, mark the IDs and show which table holds which link.",
        pts: ["Store each fact once and connect tables with IDs.", "Many-to-many links need a middle table.", "Store money as whole numbers of the smallest unit and use fixed lists for statuses."],
        qs: [
          { p: "How should money normally be stored to avoid rounding errors?", o: ["As decimals with many digits", "As whole numbers in the smallest unit, such as cents", "As words"], a: 1 },
          { p: "One customer can have many orders. Where does the customer ID go?", o: ["In the Orders table", "Nowhere", "In every table"], a: 0 }
        ]
      },
      {
        t: "Who is allowed? Logging in versus being permitted",
        goal: "Tell apart proving who you are from what you are allowed to do, and explain why the server must decide.",
        body: [
          "Two ideas are often mixed up. Authentication is proving who you are (typing your password, entering a code). Authorisation is deciding what you are allowed to do once we know who you are. A guard at a building first checks your ID card (authentication), then checks whether your card opens the accounts office (authorisation).",
          "Systems keep sign-in safe by never storing passwords as plain text. They store a scrambled version called a hash. Even the company's own staff cannot read your password. When you sign in, the system scrambles what you typed and compares the two scrambles. This is why a properly built system can only reset your password, never tell it to you.",
          "Authorisation rules should start from 'no'. This is called default deny: nothing is allowed unless a rule clearly says yes. Every request should be checked: who is asking, what do they want, and are they allowed? A logged-in customer may read their own orders but not other customers' orders. A manager may approve refunds. An administrator may manage users. These checks must run on the back end for every request.",
          "Also protect against the quiet mistake of trusting numbers in the address. If your order page is /orders/1001, a curious user may change it to /orders/1002 to peek at someone else's. The server must verify that order 1002 belongs to the person asking. Forgetting this check is one of the most common ways business systems leak private data."
        ],
        example: "A courier company's tracking page was /track/5581. A customer tried /track/5582 and saw a stranger's name, address and phone number. The company had checked only that the user was signed in (authentication) but not whether the parcel was theirs (authorisation). After adding the ownership check, changing the number showed 'Not allowed'.",
        steps: [
          "Write down who the different users are (customer, staff, manager, admin).",
          "For each kind of record, write who may read, create, change and delete it.",
          "Start from 'deny' and add only the permissions that are needed.",
          "For every request, check the person's identity, their role and whether the record belongs to them.",
          "Try changing numbers in addresses to test that you cannot see other people's records."
        ],
        mistakes: [
          "Mixing up 'signed in' with 'allowed'.",
          "Storing passwords in a readable form.",
          "Trusting the numbers in an address without checking ownership."
        ],
        terms: [["Authentication", "Proving who you are."], ["Authorisation", "Deciding what a known person is allowed to do."], ["Hash", "A one-way scramble of a password that cannot be turned back."], ["Default deny", "Refusing everything unless a rule clearly allows it."]],
        tryit: "Write three rules for an online clinic: what a patient may see, what a doctor may see and what only the administrator may do. Start each from 'deny unless...'.",
        pts: ["Authentication proves who you are; authorisation decides what you may do.", "Passwords are stored as hashes, never readable.", "Always check that the record belongs to the person asking."],
        qs: [
          { p: "What is the safest starting point for permission rules?", o: ["Allow everything unless blocked", "Deny everything unless a rule clearly allows it", "Allow everyone who is signed in"], a: 1 },
          { p: "Which of these describes authorisation?", o: ["Typing your password", "Deciding what a signed-in person may do", "Choosing a colour"], a: 1 }
        ]
      },
      {
        t: "Keeping a history: audit trails",
        goal: "Explain why systems record who did what and when, and what makes a trustworthy record.",
        body: [
          "When something goes wrong in a business, the first questions are always the same: what happened, who did it, when, and what did it look like before? An audit trail is a permanent list of important actions that answers those questions. It works like the black box of an aeroplane or the CCTV of a shop.",
          "A good entry records five things: who (the person), what (the action, such as 'changed price'), which record (the item affected), when (the exact date and time) and, for changes, the before and after values ('price 20 to 25'). Together these give a clear story.",
          "The most important rule is that the trail can be added to but never edited or erased by ordinary users, including the people whose actions it records. If people could quietly edit the history, it would prove nothing. The trail is for accountability, for fixing mistakes, for finding out who changed a price, and for showing regulators or customers what happened.",
          "Do not log everything. Record meaningful business events (creating, changing and deleting records, signing in, permission changes, payments) but not passwords, card numbers or unnecessary personal details. Logs themselves must be protected, and you should decide how long to keep them. Too little history is dangerous, and too much private data in the history is a different danger."
        ],
        example: "A distributor found that a large customer had been given a 40 percent discount that nobody remembered approving. Because the system logged every price change with the user, time and old and new values, the team found within minutes that a temporary account had made the change during a busy day. They corrected it and tightened who could set discounts.",
        steps: [
          "Decide which actions are important enough to record (money, permissions, deletions, sign-ins).",
          "For each, record who, what, which record, when and before and after values.",
          "Make the trail add-only: nobody can edit or delete entries.",
          "Keep private data such as passwords and card numbers out of it.",
          "Choose how long to keep the history and who may read it."
        ],
        mistakes: [
          "Letting administrators edit the history.",
          "Recording sensitive secrets in the log.",
          "Recording nothing until a problem happens."
        ],
        terms: [["Audit trail", "A permanent record of important actions: who did what and when."], ["Accountability", "Being able to show who was responsible for an action."], ["Add-only", "A record that can grow but whose old entries cannot be changed."], ["Before and after values", "The value of a field before and after a change."]],
        tryit: "Imagine a shop system. Write the audit-trail entry (who, what, which record, when, before and after) for the moment a manager lowers a product's price from 20 to 15.",
        pts: ["An audit trail says who did what, to what and when.", "It must be add-only so it can be trusted.", "Record important events but never secrets."],
        qs: [
          { p: "Which is NOT a normal part of an audit-trail entry?", o: ["Who did it", "When it happened", "The person's password"], a: 2 },
          { p: "Why should the audit trail not be editable?", o: ["So it can be trusted as an honest record", "To save disk space", "To make it colourful"], a: 0 }
        ]
      },
      {
        t: "Changing a live system safely: migrations",
        goal: "Describe how the shape of a database is changed step by step without losing or breaking anything.",
        body: [
          "A business changes, so its database must change too. Perhaps you need a new column for 'preferred language', or a new table for 'gift cards'. Changing a live database is like renovating a shop while customers are still shopping. Do it carelessly and you lose data or stop the business.",
          "The safe way is a migration: a small written set of change steps, saved in order, that is applied the same way to every copy of the database (testing, staging and live). Each migration has a number and a purpose, is reviewed by another person, and is tried on a test copy first. Because they are written down, everyone can see the history of how the database became what it is, and the same steps can be repeated exactly.",
          "Good migrations follow careful habits. Make small changes, not huge ones. Add before you remove: first add the new column and start using it, and only later, when nothing needs the old column, remove it. Back up the data before the change. Have a plan for undoing the change if something goes wrong (a rollback). And do the risky changes at quiet times.",
          "Never edit the live database by hand except in a true emergency, and then write down exactly what was done. Hand edits are invisible, not repeatable and easy to get wrong. If two people each 'just fix' things by hand, the test copy and the live copy slowly drift apart, and nobody knows what is real."
        ],
        example: "A ticketing company wanted to split a 'name' column into 'first name' and 'last name'. Instead of one risky change, they added the two new columns, copied and split the old data in a test copy, checked the results, then did the same on live data on a quiet Sunday evening after a backup. Only weeks later, once everything used the new columns, did they remove the old one.",
        steps: [
          "Write the change as a small numbered migration with a clear purpose.",
          "Have another person review it.",
          "Run it on a test copy with realistic data and check the results.",
          "Back up the live data, apply the migration at a quiet time and check the system.",
          "Keep a way to undo the change, and remove old things only after nothing uses them."
        ],
        mistakes: [
          "Editing the live database by hand.",
          "Making one enormous change instead of several small ones.",
          "Removing an old column before everything has stopped using it."
        ],
        terms: [["Migration", "A written, ordered change step applied to a database in a controlled way."], ["Rollback", "Undoing a change that went wrong."], ["Staging", "A practice copy of the live system used for testing changes."], ["Backup", "A saved copy of data taken before a risky step."]],
        tryit: "Plan, in five steps, how you would add a 'preferred language' field to a customer table without breaking anything. Include the backup and the undo plan.",
        pts: ["Migrations make database changes small, ordered, reviewed and repeatable.", "Add first, remove later, and always keep a backup and an undo plan.", "Avoid hand-editing a live database."],
        qs: [
          { p: "How should a change to a live database be made?", o: ["Edit it by hand quickly", "With a reviewed, written, ordered migration tested first", "Ask users to re-enter data"], a: 1 },
          { p: "What is a rollback?", o: ["A way of undoing a change that went wrong", "A type of report", "A password reset"], a: 0 }
        ]
      },
      {
        t: "How systems talk: APIs as waiters, and clear contracts",
        goal: "Explain what an API is, what a contract says and what the common answer codes mean.",
        body: [
          "Systems rarely work alone. A shop's website talks to the payment company, a booking system talks to a calendar, a phone app talks to the company's database. An API (Application Programming Interface) is the agreed way for one system to ask another for something. Picture a restaurant: the menu lists what you may order, the waiter carries your request to the kitchen and brings back the answer. You never enter the kitchen. The API is the waiter and the menu.",
          "An API contract is the written menu. For each request it says: the address to use, what information you must send, what you will get back and what errors are possible. Because both sides agree the contract, they can be built by different teams and still work together. If one side changes the contract without warning, the other side breaks, so changes should be announced and versioned (v1, v2).",
          "Every response carries a short status code that tells you the result. 200 means OK. 201 means created. 400 means the request itself was wrong (bad input). 401 means you are not signed in. 403 means you are signed in but not allowed. 404 means that thing was not found. 409 means a conflict, such as booking a slot that is taken. 500 means the server had a problem of its own. You do not need to memorise them all, but learning the common ones helps you read reports and talk to developers.",
          "Two more ideas make systems reliable. Idempotency means that repeating the same request gives the same result and does not do it twice; if a customer presses 'Pay' twice because the page was slow, they must be charged only once. Rate limits cap how many requests one person may send, to stop abuse. Together with good contracts, they keep systems predictable."
        ],
        example: "A hotel booking website asks a payment service to charge 120 dollars. The customer's connection wobbles and the site sends the request again. Because the payment service treats requests carrying the same unique reference as one request, the card is charged only once. The website simply receives the same 'paid' answer twice.",
        steps: [
          "List the actions another system needs (for example 'create booking', 'get booking').",
          "For each, write the address, what must be sent and what comes back.",
          "List the possible errors and the status code for each.",
          "Decide how repeated requests are handled so nothing happens twice.",
          "Give the contract a version number and agree how changes will be announced."
        ],
        mistakes: [
          "Changing the contract without telling the other side.",
          "Returning 200 (OK) even when something went wrong.",
          "Allowing a repeated request to create a duplicate."
        ],
        terms: [["API", "The agreed way for one system to ask another to do something."], ["Contract", "The written description of requests and responses that both sides follow."], ["Status code", "A number in the response that shows the result, such as 200 or 404."], ["Idempotent", "Safe to repeat: doing it twice has the same effect as doing it once."]],
        tryit: "Write a mini-contract for 'create a booking': what must be sent, what is returned when it works, and three errors with their status codes.",
        pts: ["An API is the waiter and the menu between systems.", "A contract states requests, responses and errors, and changes are versioned.", "Status codes and idempotency keep systems predictable."],
        qs: [
          { p: "A signed-in user asks for another user's invoice. Which status fits best?", o: ["200 OK", "403 Forbidden", "201 Created"], a: 1 },
          { p: "A customer presses 'Pay' twice. What should a well-built API do?", o: ["Charge twice", "Treat it as one payment and charge once", "Stop working"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Plan the records and rules for a small shop's orders",
      scenario: "A small online shop currently takes orders through a shared spreadsheet, and problems are growing: two people edit at once and lose work, customers' addresses differ between rows, and some staff can see everyone's data. The shop will move to a proper system. You will plan its tables, its permission rules, its history record and one API request, using the sample orders below.",
      cols: ["order_id", "customer", "status", "total (USD)", "note"],
      rows: [["1001", "Layla", "paid", "19.00", "address typed 2 ways in the sheet"], ["1002", "Omar", "pending", "6.00", ""], ["1003", "Layla", "refunded", "9.00", "refunded by the manager"], ["1004", "Sara", "paid", "3.00", "student discount"], ["1005", "Omar", "paid", "12.00", "two items"]],
      tasks: ["Sketch three tables (Customers, Orders, Order items) with their columns, IDs and the links between them, and explain how money and status are stored.", "Write the permission rules in plain words for Customer, Staff and Manager (start from deny).", "Write one audit-trail entry for the refund on order 1003.", "Write a mini API contract for 'create an order': what is sent, what is returned, and three errors with status codes."],
      hints: ["Layla appears twice, so she should be stored once in Customers.", "Only a manager should be able to refund. A customer should see only their own orders.", "Money is stored as whole cents, so 19.00 becomes 1900."],
      rubric: ["Tables avoid repeated facts and use IDs and links correctly.", "Permission rules start from deny and check ownership.", "The audit entry has who, what, which record, when and before and after.", "The API contract includes inputs, outputs and sensible status codes."],
      deliverable: "A short plan with table sketches, permission rules, the audit entry and the API contract."
    }
  }
};
