// DB-03 Web Workflow Engineering — explained without code for non-technical learners.
module.exports = {
  "DB-03": {
    outcome: "Understand how a website really works behind the scenes and describe forms, checks, data screens, errors and permissions clearly enough to plan or review one.",
    units: [
      {
        t: "How a website works, in plain words",
        goal: "Describe what happens between clicking a link and seeing a page, using everyday comparisons.",
        body: [
          "When you open a website, two computers talk. Your device (with its browser, such as Chrome or Safari) is called the client. The computer that holds the website is called the server. A server is simply a computer that is always switched on and waits for requests. Think of a restaurant: you are the customer, the browser is the waiter who carries your order, and the server is the kitchen.",
          "When you type an address, your browser sends a request: 'please give me this page'. The server finds or builds the page and sends back a response. The browser then draws it on your screen. Every click on a link or button is another request and another response. This exchange is so fast that it feels like magic, but it is only questions and answers.",
          "A web page is made of three ingredients. HTML is the content and structure (the words, headings and buttons, like the bones). CSS is the style (colours, sizes, spacing, like the clothes). JavaScript is the behaviour (things that move or react, like the muscles). You do not need to write them to understand what they do. You only need to know that when someone says 'the front end', they mean what you see and touch, and 'the back end' means the hidden kitchen that stores data and makes decisions.",
          "Why does this matter for non-technical people? Because it explains the rules you will hear all the time. Anything in your browser can be inspected or changed by the person using it, so it cannot be trusted for security. Important decisions, like 'is this person allowed to see this?', must be made in the kitchen, on the server."
        ],
        example: "You open an online shop and tap 'Add to basket'. Your browser sends a small message to the shop's server: 'add item 482 to basket 913'. The server updates its records and replies: 'done, basket now has 3 items'. The page then shows '3' on the basket icon. Nothing was stored in your phone; the truth lives in the shop's kitchen.",
        steps: [
          "Open any website and notice the address at the top. That is where your request goes.",
          "Click a link and watch: your browser asked, the server answered and the page changed.",
          "Say aloud which part you can see (front end) and which part you cannot (back end).",
          "Pick one action on the site, such as logging in, and describe what the server must decide.",
          "Explain to a friend why the server, not the browser, must check who is allowed to do something."
        ],
        mistakes: [
          "Thinking everything happens on your device. Most important work happens on the server.",
          "Believing that hiding a button makes an action secure.",
          "Using technical words without checking that others understand them."
        ],
        terms: [["Browser", "The program on your device that shows websites, such as Chrome or Safari."], ["Server", "A computer that stores a website or data and answers requests."], ["Front end / back end", "The visible part of a system, and the hidden part that stores and decides."], ["Request and response", "A question sent to a server and the answer it returns."]],
        tryit: "Choose a website where you log in. Write four lines describing what happens when you press 'Log in': what is sent, who checks it, what comes back and what you then see.",
        pts: ["A website is a conversation of requests and responses between a browser and a server.", "The front end is what you see; the back end stores data and makes decisions.", "Anything in the browser can be changed by the user, so security decisions belong on the server."],
        qs: [
          { p: "In the restaurant comparison, what does the server represent?", o: ["The waiter", "The kitchen that prepares and stores things", "The customer"], a: 1 },
          { p: "Why must 'is this person allowed?' be checked on the server?", o: ["Because the browser can be changed by the person using it", "Because servers are faster at typing", "Because browsers do not exist"], a: 0 }
        ]
      },
      {
        t: "Forms: asking for information well",
        goal: "Design a form that people finish, with the right questions in the right order.",
        body: [
          "A form is how a website asks you for information: a sign-up, a booking, a payment, an enquiry. It is the place where most people give up. Every extra box is another chance for a person to think, 'This is too much effort'. A good form asks only what it truly needs, in a friendly and logical order.",
          "Ask yourself of every field, 'What will we do with this?' If the answer is 'nothing yet', remove it. Asking for a phone number 'just in case' lowers completion and also creates a duty to protect that number. Group related fields together (all address fields in one block) and put them in the order people expect: name, contact, then details.",
          "Help people succeed. Put a clear label above each box. Show the format if it is unusual ('For example 0555 123 456'). Use the right kind of input: a date picker for dates, a drop-down for a fixed list, tick boxes for many choices, a single choice for one. Mark which fields are required and which are optional, and never rely on the colour red alone.",
          "Finish with one clear primary button that says what will happen ('Send my booking', not just 'Submit'). After sending, show a confirmation that tells the person what happened and what comes next. For long forms, break them into short steps with a progress indicator ('Step 2 of 4') so that people see the end."
        ],
        example: "A car-repair garage's enquiry form had eleven required boxes, including the car's chassis number, which most customers do not know. Only one in five visitors finished it. The garage cut it to four boxes (name, phone, car model, problem) and asked for the rest by phone. Completed enquiries tripled.",
        steps: [
          "List every field you plan to ask for and write what you will do with each answer.",
          "Remove anything you cannot justify.",
          "Order the fields the way a person would naturally think, and group related ones.",
          "Add clear labels, examples for unusual formats and the right kind of input for each field.",
          "Write a button that describes the action and a confirmation message that says what happens next."
        ],
        mistakes: [
          "Asking for information 'just in case'.",
          "Using 'Submit' or vague buttons.",
          "Leaving people with no confirmation after they press send."
        ],
        terms: [["Field", "One box or choice in a form where a person enters information."], ["Required / optional", "Whether a field must be filled in before sending."], ["Placeholder", "Faint example text inside a box that disappears as you type."], ["Confirmation", "A message that tells the person the action worked and what happens next."]],
        tryit: "Find a form you had to fill in recently. Count the fields and cross out any you think are unnecessary. Rewrite the button text so it says exactly what will happen.",
        pts: ["Ask only for what you truly need.", "Clear labels, sensible order and the right input types help people finish.", "Every form needs a clear button and a confirmation."],
        qs: [
          { p: "A field asks for information the business will not use yet. What should happen to it?", o: ["Keep it, it might be useful", "Remove it", "Make it bold"], a: 1 },
          { p: "Which button text is best for a booking form?", o: ["Submit", "Send my booking", "OK"], a: 1 }
        ]
      },
      {
        t: "Checking what people type: validation",
        goal: "Explain why forms check input, where the checks happen and how to write helpful messages.",
        body: [
          "People make typing mistakes: a missing '@' in an email, letters in a phone number, a date in the past for a future booking. Validation means checking the information before accepting it. Good validation catches honest errors quickly and helps the person fix them. It also stops bad or harmful data from entering the system.",
          "Checks happen in two places. In the browser they give instant help, for example a red note as soon as an email looks wrong. On the server they are the real protection. The server must always check again, because a determined person can skip the browser's checks. The rule to remember: the browser is for convenience, the server is for truth.",
          "Common checks are: is the field filled in (required), is it the right kind (a number, an email, a date), is it in a sensible range (age between 0 and 120), is it a sensible length (a name is not 5,000 characters), and does it match a pattern (a postcode).",
          "The message matters as much as the check. 'Invalid input' helps nobody. 'Please enter an email like name@example.com' does. Put the message next to the box, say what to do rather than what went wrong, stay polite, and keep everything the person already typed. Never wipe a form after an error. That is the fastest way to lose a customer."
        ],
        example: "A hotel's booking form accepted a check-out date earlier than the check-in date. Some guests booked minus two nights and the system charged a negative amount. The hotel added a rule on both sides: 'check-out must be after check-in', with the message 'Please choose a check-out date after 12 May'. Errors disappeared, and the server check also blocked a cheat attempt.",
        steps: [
          "For each field, write its rule: required, type, range, length or pattern.",
          "Write a friendly message for each rule that says what to do.",
          "Show messages next to the box, as soon as the person leaves the field.",
          "Make sure the server checks every rule again.",
          "Test with wrong inputs on purpose: empty, huge, negative, unusual characters."
        ],
        mistakes: [
          "Checking only in the browser.",
          "Showing a single vague message at the top of the page.",
          "Clearing the form after an error."
        ],
        terms: [["Validation", "Checking that information is complete and sensible before accepting it."], ["Client-side / server-side", "Checks that happen in the browser, and checks that happen on the server."], ["Range", "The smallest and largest values that make sense."], ["Error message", "A note that tells the person what to fix."]],
        tryit: "Take a sign-up form you know. Write the validation rule and the friendly error message for three fields (email, phone, date of birth).",
        pts: ["The browser's checks are for convenience; the server's checks are for truth.", "Write error messages that say what to do.", "Never erase what the person has typed."],
        qs: [
          { p: "Why must the server check the input again?", o: ["Because browser checks can be bypassed", "Because servers like extra work", "Because browsers cannot show messages"], a: 0 },
          { p: "Which error message is best?", o: ["Invalid input", "Please enter an email address like name@example.com", "Error 422"], a: 1 }
        ]
      },
      {
        t: "Showing data clearly: lists, tables and empty screens",
        goal: "Present information so people can scan it, find what they need and understand what to do next.",
        body: [
          "A lot of business software is really about showing records: orders, customers, invoices, tasks. The way you show them decides how quickly people work. The most common tool is the table: rows for items and columns for facts. A good table has few, well-chosen columns, sensible sorting (newest first for orders) and clear headings.",
          "Large lists need help. Search finds one item quickly. Filters narrow the list (only unpaid invoices). Pagination splits the list into pages or loads more as you scroll, so that the page does not freeze. Always show how many results there are ('Showing 20 of 134').",
          "Format things the way people read them. Dates such as '12 March 2026' are clearer than '2026-03-12' for most readers. Show money with the currency and two decimals. Right-align numbers so digits line up. Never cut text off silently; show a short version with a way to see the rest.",
          "Every list has three special moments. Loading: show a small message or animation so people know something is coming. Empty: show a friendly explanation and the next step, such as 'You have no invoices yet. Create your first one.' Error: explain that the data could not be loaded and offer a way to try again. Designing these moments separates good software from frustrating software."
        ],
        example: "An events company's dashboard showed a blank white screen for new customers who had no bookings yet. Many thought the software was broken and phoned support. Adding one sentence and a button (‘No bookings yet — create your first event’) removed almost all of those calls.",
        steps: [
          "Decide what one row represents and pick the four to six columns people need most.",
          "Choose a default sort that fits the job, such as newest first.",
          "Add search and filters for the two or three most common questions.",
          "Format dates, money and numbers in the way your readers expect.",
          "Design the loading, empty and error states with helpful words."
        ],
        mistakes: [
          "Showing every possible column so the table becomes unreadable.",
          "Leaving a blank screen when there is nothing to show.",
          "Silently cutting off text or numbers."
        ],
        terms: [["Table", "Data shown in rows and columns."], ["Filter", "A control that narrows a list to matching items."], ["Pagination", "Splitting a long list into pages."], ["Empty state", "What the screen shows when there is no data yet."]],
        tryit: "Imagine a screen for a small shop showing customer orders. List the five columns you would show, the default sort, two filters and the exact words for the empty state.",
        pts: ["Choose a few useful columns and a sensible default order.", "Search, filters and page counts help with long lists.", "Design the loading, empty and error moments on purpose."],
        qs: [
          { p: "A new customer opens a page that has no records yet. What should it show?", o: ["A blank page", "A helpful message that explains what to do next", "An error alert"], a: 1 },
          { p: "What does a filter do?", o: ["Narrows a list to matching items", "Deletes old items", "Changes the colour of the list"], a: 0 }
        ]
      },
      {
        t: "Errors and messages: when things go wrong",
        goal: "Handle problems calmly so people know what happened and what to do, without seeing scary technical text.",
        body: [
          "Things will go wrong: the internet drops, the server is busy, a payment is declined, somebody's session expires. Good software expects this. The difference between a professional product and an amateur one is often not how it behaves when everything works, but how it behaves when something fails.",
          "Every failure message should answer three questions. What happened? Why does it matter to me? What can I do now? For example: 'We could not save your booking because the connection dropped. Your details are still here. Press Try again.' Notice that it is polite, explains and offers a next step.",
          "Never show raw technical messages such as 'Error 500' or long lines of code to normal users. They are frightening, useless and can reveal internal details that attackers use. Instead, show a friendly message and quietly record the technical details in a log for the team. A log is a private notebook where software writes down what it did and what went wrong.",
          "Design for recovery. Where possible, retry automatically for small network hiccups. Save work as people go so that nothing is lost. Offer a clear way back. And warn before dangerous actions: 'Delete this customer? This cannot be undone.' Use confirmation only for serious steps, or people get tired of clicking 'Are you sure?'."
        ],
        example: "An online form for a school trip crashed when parents pressed 'Send' during a busy evening and showed 'Error 500'. Parents pressed it again and again, creating duplicate registrations. The school changed the message to 'We're busy right now. Your registration is saved. We will email you a confirmation in a few minutes. You do not need to send it again,' and duplicates stopped.",
        steps: [
          "List the things that could fail on each screen (connection, payment, timeout, missing data).",
          "For each, write a message that explains what happened, why and what to do.",
          "Make sure technical details go to a private log, not the screen.",
          "Save people's work where you can, and offer 'Try again'.",
          "Add a confirmation step only for actions that cannot be undone."
        ],
        mistakes: [
          "Showing codes and technical wording to customers.",
          "Blaming the user ('You entered the wrong thing').",
          "Asking 'Are you sure?' for every tiny action."
        ],
        terms: [["Log", "A private record of what software did and which errors occurred."], ["Timeout", "When an action takes too long and is stopped."], ["Retry", "Trying an action again, automatically or when the person asks."], ["Graceful failure", "Failing in a calm, helpful way that protects the person's work."]],
        tryit: "Think of a payment page. Write the exact message you would show for (1) a card declined and (2) a lost internet connection. Each must say what happened and what to do.",
        pts: ["Good error messages say what happened, why it matters and what to do.", "Keep technical details in a private log.", "Protect people's work and warn only before serious actions."],
        qs: [
          { p: "What belongs in a user-facing error message?", o: ["A long technical code", "What happened and what to do next", "A blame statement"], a: 1 },
          { p: "Where should the technical details of an error go?", o: ["On the customer's screen", "In a private log for the team", "Nowhere"], a: 1 }
        ]
      },
      {
        t: "Who can see and do what: permissions",
        goal: "Explain roles and permissions and why hiding a button is never enough.",
        body: [
          "Most systems have different kinds of people. In a school system there are students, teachers and administrators. Each should see different things and be able to do different things. A role is a named type of person. A permission is one thing that a role may do, such as 'view grades', 'edit grades' or 'delete a student'.",
          "The golden rule is least privilege: give each person the smallest set of permissions that lets them do their job. A receptionist does not need to edit prices. A trainee does not need to delete records. This limits both accidents and damage if an account is stolen.",
          "Designers often hide buttons that a person is not allowed to use. That is good for clarity, because people do not see things they cannot use. But hiding is not security. Anyone who knows the address of a page or the way a request is built can ask the server directly. So the server must check, every single time, 'is this person allowed to do this?', and refuse if not. The interface is the shop window; the server is the locked door.",
          "Also think about who sees whose data. A customer must only ever see their own orders, not their neighbour's. This is called data isolation and is one of the most important rules in business software. When a system leaks another person's data, trust is destroyed quickly. Finally, when someone is refused, tell them clearly ('You do not have access to this page. Ask your manager.') instead of showing an empty or broken page."
        ],
        example: "A staff portal hid the 'Approve expenses' button from ordinary employees. An employee who was curious typed the address of the approval page and pressed a button that a colleague had once shown him. The server did not check the role, so it approved the expense. The company fixed it by making the server check the role on every request.",
        steps: [
          "List the kinds of people who use the system and give each a role name.",
          "For each role, list what it may view, create, change and delete.",
          "Apply least privilege: remove anything a role does not need.",
          "Confirm that the server checks the role for every action, not only the screen.",
          "Test by logging in as each role and trying things you should not be able to do."
        ],
        mistakes: [
          "Believing that a hidden button is protected.",
          "Giving everyone the same all-powerful access to save time.",
          "Letting a person see another person's records."
        ],
        terms: [["Role", "A named type of user, such as customer or manager."], ["Permission", "One thing a role is allowed to do."], ["Least privilege", "Giving each person only the access they need."], ["Data isolation", "Making sure people can only see their own data."]],
        tryit: "Imagine a small clinic system. List three roles and, for each, two things they may do and two things they must not do.",
        pts: ["Roles and permissions decide who can do what.", "Give the least access needed for the job.", "Hiding a button is not security; the server must check every action."],
        qs: [
          { p: "A button is hidden for non-admins. Is the action secure?", o: ["Yes, they cannot click it", "Only if the server also checks the role every time", "Yes, if the page address is secret"], a: 1 },
          { p: "What does 'least privilege' mean?", o: ["Everyone gets the same access", "Each person gets only the access they need", "Nobody gets access"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Make the expense-claim form safe and friendly",
      scenario: "A company lets staff submit expense claims through a web form, and managers approve them. Testers tried the form and found several problems. The table below shows what they did and what happened. You are the person who must decide how the form should behave, write the rules and messages, and explain who is allowed to approve.",
      cols: ["What the tester did", "What happened"],
      rows: [["Typed -50 as the amount", "The form accepted it and the total became lower."], ["Left the amount empty and pressed Send", "The form cleared itself and showed no message."], ["An ordinary employee opened the address /approve", "The page opened and the Approve buttons were visible and worked."], ["Attached a 25 MB photo of a receipt", "The page froze and nothing was saved."], ["Lost the internet connection while sending", "The screen said 'Error 500'."]],
      tasks: ["Write one validation rule and one friendly message for each of the first two problems.", "Explain in plain words what should happen to the 25 MB attachment and what the message should say.", "Describe how permission for approving should work: who may approve, and where the check must happen.", "Rewrite the 'Error 500' screen so it says what happened and what to do, and say what is recorded in the log."],
      hints: ["A sensible amount is above zero and below a limit that the company sets.", "Think about a maximum file size and which file types are allowed.", "Remember the shop window and the locked door: the server is the door."],
      rubric: ["Validation rules are specific and the messages tell people what to do.", "The attachment rule sets a limit and explains it kindly.", "Approval is limited to the right role and checked on the server.", "The connection error message is calm, useful and does not show technical text."],
      deliverable: "A short table of rules and messages, a permission explanation and the rewritten error screen text."
    }
  }
};
