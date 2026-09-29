// DB-00 Digital Foundations — written for people who have never worked in tech.
module.exports = {
  "DB-00": {
    outcome: "Use computers, accounts, files, spreadsheets and AI helpers safely and confidently, and describe a piece of work step by step.",
    units: [
      {
        t: "How your computer and phone really work",
        goal: "Explain in plain words what a device, an app, storage and an update are, and why they matter.",
        body: [
          "A computer, a laptop, a tablet and a phone are all the same kind of thing: a machine that follows instructions very quickly. The instructions are called software. The machine itself (the screen, the battery, the parts inside) is called hardware. If you can touch it, it is hardware. If it is a set of instructions that lives inside the machine, it is software.",
          "An app (short for application) is one piece of software built to do one job, such as sending messages, editing photos or adding up numbers. The operating system (for example Windows, macOS, Android or iOS) is the main software that runs everything else. Think of it as the manager of a building: it decides which app gets the lights, the power and the space.",
          "Your device keeps things in two places. Memory (often called RAM) is the desk you are working on right now: fast, but cleared when you switch off. Storage is the filing cabinet: slower, but everything stays there until you delete it. When a device feels slow, it is often because the desk is too crowded (too many apps open) or the filing cabinet is nearly full.",
          "Updates are small repairs and improvements that the makers send out. Many updates fix security holes, which are weak spots that bad people can use to get in. That is why installing updates is one of the easiest ways to stay safe."
        ],
        example: "Imagine a small bakery. The oven, the counter and the till are the hardware. The recipe book and the till's instructions are the software. The baker's workbench is the memory (busy, temporary). The store room at the back is the storage (large, permanent). When the bakery gets very busy the bench overflows and everything slows down. That is exactly what happens to a phone with thirty apps open.",
        steps: [
          "Find out which device you use most and what operating system it runs (look in Settings, then About).",
          "Check how much storage is free. If it is almost full, delete old downloads and photos you no longer need.",
          "Close apps you are not using so the 'desk' is clear.",
          "Turn on automatic updates so repairs arrive without you having to remember.",
          "Restart the device once a week. A restart clears the desk and finishes waiting updates."
        ],
        mistakes: [
          "Ignoring update messages for months. Every week you wait, known weak spots stay open.",
          "Thinking 'the cloud' is magic. The cloud is simply someone else's computers that you reach over the internet.",
          "Never restarting. Many strange problems disappear after a simple restart."
        ],
        terms: [["Hardware", "The physical parts of a device that you can touch."], ["Software", "The instructions that tell hardware what to do."], ["Operating system", "The main software that manages the device and all other apps."], ["Storage", "The permanent place where files are kept until you delete them."]],
        tryit: "Open the Settings on your phone or computer. Write down (1) the operating system name, (2) how much storage is free and (3) whether automatic updates are switched on. If updates are off, switch them on now.",
        pts: ["Hardware is what you can touch; software is the instructions.", "Memory is a temporary desk; storage is a permanent filing cabinet.", "Updates repair weak spots, so install them."],
        qs: [
          { p: "Which of these is hardware?", o: ["A photo-editing app", "The battery inside a phone", "A software update"], a: 1 },
          { p: "Why is it a good idea to install updates?", o: ["They often repair security weak spots", "They make your screen bigger", "They delete your old files"], a: 0 }
        ]
      },
      {
        t: "Accounts, passwords and two-step sign-in",
        goal: "Create strong passwords, keep them safe and switch on the extra protection that stops most break-ins.",
        body: [
          "An account is your personal space on a service: your email, your bank, your online shop. A password is the secret that proves it is really you. Most break-ins do not happen because a clever hacker guesses a password. They happen because people use the same simple password everywhere, and when one website is robbed, the thieves try that same password on every other website.",
          "A strong password is long, not tricky. A sentence such as 'purple-bicycle-drinks-cold-coffee' is far stronger than 'P@ssw0rd1', and easier to remember. Length beats clever symbols. What matters most is that every account has its own different password.",
          "Nobody can remember fifty different long passwords, and you should not try. A password manager is a locked digital notebook that creates and remembers them for you. You only remember one strong main password. Good managers also warn you if a password has appeared in a known data leak.",
          "The second shield is two-step sign-in (also called two-factor or multi-factor authentication). After your password, the service asks for something more: a short code from an app on your phone, or a tap on a message. Even if a thief learns your password, they still cannot get in without your phone. Turn it on first for your email, because email can reset every other account."
        ],
        example: "Sara used the password 'Sara1985' for her email, her shop account and her music app. The music app was hacked. Within an hour the thieves tried 'Sara1985' on her email and got in. From her email they clicked 'forgot password' on her bank. If Sara had used a different password on each account and switched on two-step sign-in, the story would have stopped at the music app.",
        steps: [
          "Pick a password manager (your phone or browser has a basic one; a dedicated manager is better) and set one long main password.",
          "Start with your email: change its password to a new long sentence that you have never used before.",
          "Switch on two-step sign-in for your email using an authenticator app or the app's own approval prompt.",
          "Work through your other important accounts (banking, shopping, social media) and give each a unique password.",
          "Save the backup codes the service gives you in a safe place, such as a printed page in a drawer."
        ],
        mistakes: [
          "Reusing one password everywhere.",
          "Using personal facts (birthday, pet name) that others can find on social media.",
          "Sharing a two-step code with anyone. A real company will never ask you for it."
        ],
        terms: [["Password manager", "A protected app that creates and stores different passwords for you."], ["Two-step sign-in", "A second check after your password, such as a code sent to your phone."], ["Data leak", "When a company's stored information is stolen and shared."], ["Backup codes", "One-time codes that let you back in if you lose your phone."]],
        tryit: "Choose one account you care about (your main email). Change its password to a long sentence of four or more unrelated words and switch on two-step sign-in. Write down how long it took. Most people need under ten minutes.",
        pts: ["Use a different password for every account.", "Long sentences are stronger than short tricky passwords.", "Two-step sign-in stops most break-ins, even if the password leaks."],
        qs: [
          { p: "Which password is the strongest choice?", o: ["Summer2024!", "correct-horse-battery-staple-lamp", "The name of your dog"], a: 1 },
          { p: "A caller says he is from your bank and asks you to read out the code that just arrived on your phone. What do you do?", o: ["Read it out, he is from the bank", "Refuse, hang up and call the bank yourself on its official number", "Read half of it"], a: 1 }
        ]
      },
      {
        t: "Spotting scams and fake messages",
        goal: "Recognise the warning signs of phishing and scams and know exactly what to do when something looks wrong.",
        body: [
          "Phishing is when someone pretends to be a company, a colleague or an official to trick you into giving away a password, a code or money. The word sounds like fishing on purpose: the message is the bait. It can arrive by email, text message, phone call or a social media chat.",
          "Scams work by pushing your feelings, not your thinking. They create fear ('your account will be closed today'), greed ('you have won a prize'), curiosity ('see who viewed your photo') or a sense of duty ('the boss needs gift cards now'). The most useful habit you can build is to slow down whenever a message makes you feel rushed.",
          "There are clear warning signs. The sender's address looks almost right but has a small difference. The greeting is vague ('Dear customer'). The message contains a link or attachment you did not expect. It asks for a password, a code or a payment. It has spelling mistakes, though the best scams have none. If you are unsure, do not click. Open the official website by typing its address yourself, or call the organisation using a number from its real website.",
          "If you do make a mistake, do not hide it. Quick action limits the damage. Change the password, tell your bank, and tell your manager or IT contact. People who report fast are heroes, not fools."
        ],
        example: "Omar receives an email that looks like it comes from the delivery company: 'Your parcel is stuck. Pay 2 dollars now to release it.' The link goes to a page with the right logo. But the web address in the top bar is 'parcel-relase-help.com', not the company's real address. Omar closes the message and opens the delivery company's app instead. There is no parcel problem. He just avoided handing over his card details.",
        steps: [
          "Stop. Take three seconds before you act on any message that feels urgent.",
          "Look at the sender address, not only the display name. Check every letter.",
          "Hover your mouse over a link (do not click) to see where it really goes.",
          "Check the request. Does a genuine company ever ask for a password or a code this way? Almost never.",
          "Verify through a second, trusted route: the official app, the official website you typed yourself, or a known phone number.",
          "If it is a scam, report it (use your email's 'report phishing' button) and delete it."
        ],
        mistakes: [
          "Clicking 'just to see' what the link is.",
          "Trusting a message because it uses the correct logo. Anyone can copy a logo.",
          "Feeling embarrassed and staying silent after clicking. Silence gives thieves more time."
        ],
        terms: [["Phishing", "A fake message designed to trick you into giving information or money."], ["Attachment", "A file that travels inside a message and can hide harmful software."], ["Spoofing", "Making a message look as though it came from someone else."], ["Second channel", "A different, trusted way to confirm a request, such as a phone call."]],
        tryit: "Look at the last five emails in your spam or junk folder. For each one, find at least one warning sign (odd sender, urgent tone, unexpected link, request for money). Write the sign next to each.",
        pts: ["Scams push urgency and emotion, so slow down.", "Check the sender's real address and where links truly go.", "Confirm through a second trusted channel and report quickly."],
        qs: [
          { p: "Your manager emails at 5pm asking you to urgently buy gift cards and send the codes. What is the safest step?", o: ["Buy them quickly to help", "Call your manager on a known number to confirm before doing anything", "Reply asking for the amount"], a: 1 },
          { p: "What is the best way to check where a link goes?", o: ["Click it and look", "Hover over it without clicking and read the address", "Forward it to a friend"], a: 1 }
        ]
      },
      {
        t: "Files, folders and naming things well",
        goal: "Keep files organised so that you and other people can always find the right one within seconds.",
        body: [
          "A file is one saved item: a document, a photo, a spreadsheet. A folder is a container that holds files and other folders. Together they form the filing system of your device. A good filing system feels boring, and that is the point. Nothing is lost, nothing is duplicated and anyone on the team can find things without asking.",
          "The secret is a naming pattern that you always use. A helpful pattern is date first, then what it is, then a version. For example 2026-03-14_client-quote_v2. Because the date is written year first, files sort themselves in time order. Avoid names like 'final', 'final2' or 'new new'. Nobody knows which is the true final.",
          "Keep one source of truth. If a document lives in three places, three people will edit three different copies and later nobody knows which one is right. Store the working file in one agreed place, such as a shared team folder, and send links instead of attachments.",
          "Finally, remember that things get deleted by accident. Cloud storage keeps older versions and a bin for a limited time. Find out how long yours does. A backup is a second copy stored somewhere else, so one accident does not lose everything."
        ],
        example: "Nadia runs a stationery shop. Her supplier price lists were saved as 'prices.xlsx', 'prices (1).xlsx', 'prices-new.xlsx' and 'prices FINAL.xlsx'. When a customer asked for a price she spent ten minutes guessing. After renaming them 2026-01-05_supplier-prices_v1 and 2026-02-10_supplier-prices_v2 and keeping only the newest in the 'Prices' folder, she found the right file in five seconds.",
        steps: [
          "Decide on a pattern: date (year-month-day), a clear description, a version (v1, v2). Write it down.",
          "Create a small set of top-level folders such as Clients, Finance, Operations, Archive.",
          "Move loose files into the right folder and rename them using the pattern.",
          "Choose one place where the current version lives and delete duplicates.",
          "Once a month, move finished work into Archive so the working folders stay light."
        ],
        mistakes: [
          "Saving everything on the desktop. It becomes a pile within weeks.",
          "Putting spaces, odd symbols and words like 'final' in names.",
          "Emailing attachments back and forth so many copies exist."
        ],
        terms: [["File", "One saved item such as a document or photo."], ["Folder", "A container that holds files and other folders."], ["Version", "One saved stage of a document, such as v1 or v2."], ["Backup", "An extra copy kept in a separate place in case the first is lost."]],
        tryit: "Pick ten loose files on your computer. Rename each one with the pattern date_description_version and move them into two or three sensible folders. Time yourself and notice how easy it is to find them afterwards.",
        pts: ["Use one naming pattern every time, with the year first.", "Keep one source of truth and share links, not copies.", "A backup is a second copy stored somewhere else."],
        qs: [
          { p: "Which file name is easiest to sort and find later?", o: ["final FINAL (2).docx", "2026-03-14_client-brief_v2.docx", "brief new.docx"], a: 1 },
          { p: "Why should a team keep one 'source of truth' for each document?", o: ["So nobody can read it", "So everyone works on the same up-to-date copy", "Because copies cost money"], a: 1 }
        ]
      },
      {
        t: "Tables and spreadsheets: keeping information tidy",
        goal: "Set up information in neat rows and columns so it can be sorted, filtered, counted and trusted.",
        body: [
          "A spreadsheet is a grid of rows and columns. Each box is called a cell. A well-made table has a very simple shape: one header row at the top that names each column, then one row for each thing you are tracking (one customer, one order, one product). Each column holds one kind of fact only. This tidy shape is called structured data.",
          "Structured data is powerful because computers can work with it. You can sort by date, filter to show only unpaid invoices, and add up a column in a second. Free-form notes such as 'Ahmed - 5 boxes - Tuesday maybe' look friendly but cannot be sorted or counted. The moment information matters, put it in a table.",
          "A few small rules keep tables healthy. Never merge cells in the data area. Never put two facts in one cell (write 'Dubai' and 'UAE' in separate columns). Use the same spelling and format each time (always '12 Mar 2026', not sometimes '12/3'). Leave no blank rows in the middle. And keep a copy of the raw data before you change it.",
          "Formulas do the arithmetic for you. Typing =SUM(B2:B10) adds up a range of cells. Formulas update automatically when the numbers change, so a total is never out of date. If a number matters, let a formula calculate it instead of typing it by hand."
        ],
        example: "Nadia used to keep her stock in a notebook: 'A4 paper, 12 boxes, shelf B, supplier PaperCo'. She turned it into a table with the columns Item, Unit, Quantity, Location and Supplier. Now she can filter for everything from PaperCo and instantly see the total quantity with =SUM. Ordering takes minutes instead of an evening.",
        steps: [
          "Decide what one row will represent (for example one product).",
          "Write the column headings in the top row: one fact per column.",
          "Type each record on its own row using the same format every time.",
          "Freeze the header row so it stays visible when you scroll.",
          "Add totals with formulas such as =SUM(), and check the result against a small sample by hand."
        ],
        mistakes: [
          "Merging cells or adding decorative blank rows, which break sorting.",
          "Mixing different information in one column, such as a phone number and a note.",
          "Typing totals by hand so they go out of date when numbers change."
        ],
        terms: [["Cell", "One box in a spreadsheet where a row and column meet."], ["Header row", "The first row that names each column."], ["Structured data", "Information arranged in a regular table so it can be sorted and counted."], ["Formula", "An instruction in a cell that calculates a result, such as =SUM(B2:B10)."]],
        tryit: "Take any list you keep in a notebook or message (guests, expenses, stock). Turn it into a table with a header row and one fact per column. Add a total with =SUM.",
        pts: ["One header row, one record per row, one fact per column.", "Structured data can be sorted, filtered and counted.", "Let formulas calculate totals so they never go out of date."],
        qs: [
          { p: "Which layout is best for tracking customer orders?", o: ["A paragraph of notes about each order", "One row per order, one column per fact", "Colourful merged cells"], a: 1 },
          { p: "What does the formula =SUM(B2:B10) do?", o: ["Adds up the numbers in cells B2 to B10", "Deletes cells B2 to B10", "Sorts the cells alphabetically"], a: 0 }
        ]
      },
      {
        t: "Communicating and sharing with care",
        goal: "Share files and messages with the right people, at the right level of access, without leaking anything private.",
        body: [
          "Sharing is useful and risky at the same moment. When you share a file you are deciding who can see it, who can change it and how long they can do so. That decision is called permissions or access. The safest habit is the smallest possible access: only the people who need it, only the level they need.",
          "There are usually three levels. Viewer can look but not change. Commenter can look and leave notes. Editor can change everything. Owner can also delete and decide who else gets in. Start with viewer. Give editing rights only when someone truly needs to change the file.",
          "Watch the link setting. 'Anyone with the link' means that anybody who gets the link, even by accident, can open it. For business files such as prices, contracts or staff details, share with named people only. Also review access when a project ends: people who no longer need it should be removed.",
          "The same care applies to messages. Before you press send, check the list of recipients (especially 'reply all'), check the attachment is the right file, and check it does not hide extra information such as tracked changes or other sheets. Ask: would I be comfortable if this ended up in the wrong hands?"
        ],
        example: "A small travel agency shared its client list with 'anyone with the link' so a freelancer could open it quickly. Months later the link appeared on a public forum. Because the file held names and passport numbers, the agency had to warn every client. If they had shared with the freelancer's email only, as a viewer, the problem could never have happened.",
        steps: [
          "Before sharing, ask what the other person needs to do: read, comment or change?",
          "Choose the lowest level that lets them do it (usually viewer).",
          "Share with named email addresses, not with 'anyone with the link'.",
          "Check the file for hidden extra content (other sheets, comments, personal details) and remove what is not needed.",
          "Set a reminder to review who still has access when the work is finished."
        ],
        mistakes: [
          "Giving editor access by default because it is quicker.",
          "Leaving old projects open to people who have moved on.",
          "Using 'reply all' without checking who is on the list."
        ],
        terms: [["Permission", "A setting that decides what a person may do with a file."], ["Viewer / Editor", "Viewer can only look; editor can change the content."], ["Confidential", "Private information that should only reach people who need it."], ["Reply all", "An email reply that goes to everyone on the original message."]],
        tryit: "Open a document you share with others. Check its sharing settings. Change 'anyone with the link' to named people, and change anyone who does not need to edit to viewer.",
        pts: ["Give the smallest access that does the job.", "Named people are safer than 'anyone with the link'.", "Review access when a project ends."],
        qs: [
          { p: "A file contains client pricing. What is the safest sharing setting?", o: ["Anyone with the link can edit", "Named colleagues, viewer only", "Public on the web"], a: 1 },
          { p: "What should you check before pressing 'reply all'?", o: ["That everyone on the list should see your answer", "That the subject is short", "That the message is long"], a: 0 }
        ]
      },
      {
        t: "Working with AI assistants safely",
        goal: "Use AI tools to save time while checking their work and protecting private information.",
        body: [
          "An AI assistant is a program that has read a huge amount of text and can write, summarise, translate and answer questions in everyday language. It feels like talking to a very fast helper. It does not think like a person, and it does not know what is true. It predicts words that sound right. Most of the time that is helpful. Sometimes it produces confident nonsense, which people call a hallucination.",
          "Good uses are drafting a first version, tidying your writing, summarising a long text you already trust, brainstorming ideas and explaining a hard idea in simpler words. Poor uses are anything where a wrong answer could hurt someone (medical, legal, money decisions) unless you check it against a reliable source.",
          "The most important safety rule is privacy. Anything you type into a public AI tool may be stored and used by the company. Never paste passwords, customer lists, contracts, staff records or anything you are not allowed to share outside your organisation. Ask your employer which AI tools are approved. If in doubt, remove names and numbers first.",
          "You stay responsible. If you send a report that contains an AI mistake, the mistake is yours. So the working habit is: ask clearly, read the answer critically, check facts and numbers against a source, then put the result into your own words."
        ],
        example: "Layla asked an AI assistant to summarise a supplier contract. The summary said payment was due in 60 days. She checked the actual contract before replying and found that it said 30 days. The assistant had guessed. Because she checked, she avoided promising the wrong date to her manager.",
        steps: [
          "State the job clearly: who you are writing for, what you need, how long it should be.",
          "Remove private details (names, numbers, prices) before you paste any text.",
          "Read the answer slowly and mark every fact, number and name.",
          "Check those items against a trusted source such as the original document.",
          "Rewrite the parts you keep in your own voice and take responsibility for the final version."
        ],
        mistakes: [
          "Trusting a number or a quote because it sounds sure of itself.",
          "Pasting confidential documents into a tool that has not been approved.",
          "Copying the answer without reading it."
        ],
        terms: [["AI assistant", "A program that writes and answers in natural language by predicting likely words."], ["Hallucination", "When an AI states something false with total confidence."], ["Prompt", "The instruction or question you give to an AI tool."], ["Approved tool", "A tool your organisation has agreed is safe to use with work information."]],
        tryit: "Ask an AI assistant to explain something you already know well, such as your own job. Mark at least two things it got wrong or missed. This teaches you how confidently it can be mistaken.",
        pts: ["AI predicts words; it does not know what is true.", "Never paste private or confidential information into unapproved tools.", "You are responsible for whatever you send, so check it."],
        qs: [
          { p: "An AI assistant gives you a statistic for a client report. What should you do?", o: ["Use it, AI is usually right", "Check it against a reliable source before using it", "Round it up to look better"], a: 1 },
          { p: "Which of these is it NOT safe to paste into an unapproved AI tool?", o: ["A list of customer names and phone numbers", "A general question about how spreadsheets work", "A public news article"], a: 0 }
        ]
      },
      {
        t: "Describing a piece of work step by step",
        goal: "Break any everyday task into a clear workflow with a start, steps, owners, results and exceptions.",
        body: [
          "A workflow is the path a piece of work takes from beginning to end. Every business is made of workflows: answering an enquiry, ordering stock, paying a supplier, hiring a person. Most people carry these paths in their heads. Writing them down is the first step towards improving them, sharing them or letting software help.",
          "A useful description has five parts. The trigger is what starts the work (a customer sends a message). The steps are what happens, in order. The owner is the person responsible for each step. The output is what is produced at the end (a signed quote, a shipped parcel). The exceptions are the things that can go wrong or differ (the customer does not reply, the item is out of stock).",
          "Once you can see the path, you can spot waste. Where does work wait? Where is the same information typed twice? Where do mistakes appear? Where does only one person know how to do it? These are the places to improve first, and sometimes the places where a tool could help.",
          "Keep it simple. A workflow on one page, in plain sentences, written so that a new colleague could follow it, is more useful than a beautiful chart nobody reads. Test it by asking someone else to read it and tell you what they think happens."
        ],
        example: "A small cleaning company took bookings on WhatsApp. Trigger: a customer messages. Steps: check the diary, reply with a price, wait for a yes, add to the diary, send a reminder. Owner: the office manager for everything. Exception: two customers ask for the same slot. Writing it down showed that only the office manager could do any of it, and that double bookings happened when she was ill. They added a shared calendar and a second person who knew the steps.",
        steps: [
          "Choose one piece of work that repeats, such as 'a customer asks for a quote'.",
          "Write the trigger: what event starts it?",
          "List the steps in order, one action per line, and name who does each.",
          "Write the output: what exists at the very end?",
          "List the exceptions: what could go differently? Then circle the step that wastes the most time."
        ],
        mistakes: [
          "Describing how it should work instead of how it really works.",
          "Skipping the exceptions, which are where most trouble hides.",
          "Making the description so long that nobody reads it."
        ],
        terms: [["Workflow", "The path a piece of work follows from start to finish."], ["Trigger", "The event that starts the work."], ["Owner", "The person responsible for a step."], ["Exception", "A situation that differs from the normal path."]],
        tryit: "Pick something you do every week. In ten lines, write its trigger, steps, owners, output and two exceptions. Give it to a friend and ask them to explain it back to you.",
        pts: ["A workflow has a trigger, steps, owners, an output and exceptions.", "Writing it down shows waiting time, repeated typing and single points of failure.", "Keep it to one clear page anyone can follow."],
        qs: [
          { p: "What is the 'trigger' of a workflow?", o: ["The last step", "The event that starts the work", "The person who checks the result"], a: 1 },
          { p: "Why do we write down exceptions?", o: ["Because that is where trouble often hides", "To make the page longer", "Because they never happen"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Tidy up a shop's messy stock list",
      scenario: "Nadia runs a small stationery shop. Her stock list was typed as loose notes in a chat app, and she also keeps the file on her phone, her laptop and a shared drive. She wants a clean, safe and easy-to-use version. You will turn her raw notes into a proper table, give the file a sensible name, decide who should see it, and describe how she orders stock as a small workflow.",
      cols: ["Raw entry", "Extra note"],
      rows: [["A4 paper 500 sheets - 12 boxes - shelf B", "supplier: PaperCo"], ["blue pens (box of 50) 8", "reorder when fewer than 3"], ["stapler heavy duty x4 shelf A", ""], ["Notebook A5 ruled 30pcs shelf B", "price 4.50 each"], ["glue sticks 24 box - 5 - shelf C", "supplier: PaperCo"]],
      tasks: ["Turn the five notes into a table with these columns: Item, Unit, Quantity, Location, Supplier or note.", "Choose a file name using the date-description-version pattern from lesson 4.", "Say who should see the file and with what access level (viewer or editor), and why.", "Write Nadia's reorder process as a workflow: trigger, steps, owner, output and one exception."],
      hints: ["A 'unit' tells you what the quantity counts, such as boxes or pieces.", "Anything that is 'reorder when' is a rule you can put in its own column.", "Think about who really needs to change the file. Most people only need to look."],
      rubric: ["The table has one header row and one fact per column.", "The file name follows a clear pattern with the year first.", "Access is the smallest level that works, and the reason is given.", "The workflow has a trigger, ordered steps, an owner, an output and an exception."],
      deliverable: "A short write-up (or pasted table) with your cleaned table, the new file name, your sharing choice with a reason, and the reorder workflow."
    }
  }
};
