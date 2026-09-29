// PC-CS01 Customer Service — helping people well, in writing and on the phone.
module.exports = {
  "PC-CS01": {
    outcome: "Answer customers clearly and kindly, solve problems step by step, handle upset people calmly and record every case properly.",
    units: [
      {
        t: "What good customer service really is",
        goal: "Explain what customers want and the three things that make service good: solving, respect and speed.",
        body: [
          "Customer service is helping people who use your company's products or services before, during and after they buy. A customer is anyone you help: a shopper, a patient, a client, a colleague in another department. Good service is not about being endlessly cheerful. It is about three things: solving the problem, treating the person with respect and doing it in reasonable time.",
          "What do customers actually want? Studies of complaints repeat the same wishes: to be listened to, to be told the truth, to have the problem fixed, and to not have to explain the same thing again and again. Most people are not angry because something went wrong. They are angry because they felt ignored while it was going wrong.",
          "Your role is the voice of the company. When you speak, the customer hears the whole organisation. That is a responsibility and also a power: one good conversation can turn someone who wanted to leave into a loyal customer. Research often shows that customers whose problems are solved well become more loyal than customers who never had a problem.",
          "Good service also has boundaries. You do not have to accept abuse, and you do not have to promise what the company cannot deliver. Honesty is part of service: 'I cannot do that, but here is what I can do' is better than a promise you cannot keep."
        ],
        example: "A customer phoned because her online order of a birthday gift had not arrived. The agent listened, apologised once, found that the parcel was stuck at a depot, arranged an express replacement and phoned back the next day to confirm it had been delivered. The customer wrote a review that said: 'They treated my problem as if it were theirs.'",
        steps: [
          "Listen without interrupting until the customer has finished.",
          "Show you understand: say what you heard in your own words.",
          "Solve the problem or explain honestly what you can do.",
          "Tell the customer what will happen next and when.",
          "Follow up so that the customer knows it is finished."
        ],
        mistakes: [
          "Making promises that the company cannot keep.",
          "Making the customer repeat their story again and again.",
          "Treating a complaint as an attack."
        ],
        terms: [["Customer", "Anyone you help: a buyer, client, patient or colleague."], ["Loyalty", "A customer's wish to keep using your company."], ["Resolution", "The problem being solved to the customer's satisfaction."], ["Follow-up", "Contacting the customer afterwards to make sure all is well."]],
        tryit: "Think of a time you received poor service. Write what made it poor and what one change would have made it good.",
        pts: ["Good service means solving, respecting and being timely.", "Customers mostly want to be listened to, told the truth and helped.", "Never promise what you cannot deliver."],
        qs: [
          { p: "What do most upset customers really want?", o: ["To be listened to and helped", "To argue", "To wait longer"], a: 0 },
          { p: "You cannot do what the customer asks. What is best?", o: ["Say yes anyway", "Say honestly what you cannot do and what you can", "Ignore the request"], a: 1 }
        ]
      },
      {
        t: "Talking and writing clearly",
        goal: "Use plain, warm language in speech and writing so customers understand you the first time.",
        body: [
          "Clear communication is the core skill. Customers are often worried, in a hurry or unfamiliar with your business. Plain words, short sentences and a friendly tone reduce confusion and stop small questions from becoming complaints.",
          "Use plain language. Say 'We will send your refund by Friday' instead of 'The reimbursement will be processed in due course.' Avoid jargon and internal abbreviations; if you must use a technical word, explain it. Write short sentences with one idea each. Use the customer's name and 'you' more than 'we' or 'the company'.",
          "In writing, structure helps. Start with a greeting, then answer the main question first, then give details or steps as a short list, and end with what happens next and how to reach you. Check spelling and tone before sending, because written words cannot show your smile. Avoid capital letters (they look like shouting), sarcasm and blame.",
          "On the phone, your voice is everything. Speak slowly and clearly, smile (it changes your voice), and use short confirming phrases such as 'I understand' or 'Let me check that for you'. Never leave a customer in silence: say what you are doing ('I am looking at your account now; this will take about a minute'). Repeat important details back, such as dates, numbers and addresses, to avoid mistakes."
        ],
        example: "Two replies to the same customer: A) 'Your request has been escalated to the relevant department.' B) 'Hello Ms Khan, thank you for waiting. I have sent your request to our billing team. They will reply to you by email by Thursday at the latest. If you do not hear from them, write to me and I will chase it.' Reply B tells the customer what happened, who is doing what and when.",
        steps: [
          "Greet the customer and use their name.",
          "Answer the main question first, in plain words.",
          "Give steps or details as a short list.",
          "End with the next step and a time.",
          "Read your message once for tone and mistakes before sending."
        ],
        mistakes: [
          "Using jargon or internal names for things.",
          "Writing in capital letters or with sarcasm.",
          "Leaving the customer in silence on a call."
        ],
        terms: [["Plain language", "Simple, everyday words and short sentences."], ["Tone", "The feeling that your words give."], ["Jargon", "Special words used inside a profession that outsiders may not understand."], ["Confirming back", "Repeating important details to check that they are right."]],
        tryit: "Rewrite in plain language: 'Your query has been logged and will be actioned in accordance with our standard turnaround.'",
        pts: ["Plain words, short sentences and a friendly tone.", "Answer first, then give details, then say what happens next.", "On the phone, say what you are doing and repeat key details."],
        qs: [
          { p: "Which is clearer?", o: ["We will send your refund by Friday.", "The reimbursement will be processed in due course.", "Your matter is under review by the relevant function."], a: 0 },
          { p: "Why avoid capital letters in emails?", o: ["They look like shouting", "They use more ink", "They are illegal"], a: 0 }
        ]
      },
      {
        t: "Understanding the real problem",
        goal: "Ask good questions and find out what the customer really needs before offering a solution.",
        body: [
          "The first description of a problem is often incomplete. A customer says 'your app does not work' but means 'I cannot log in since I changed my phone'. If you rush to an answer, you may solve the wrong problem. A few careful questions save a lot of time.",
          "Use open questions to invite the story: 'Can you tell me what happened?' Then use closed questions to pin down facts: 'Which phone are you using?' 'When did it start?' 'What message do you see?' Listen for facts (what happened), feelings (how they feel) and the wish (what they want you to do). Note all three.",
          "Repeat back what you understood: 'So you ordered the blue jacket on 3 May, it arrived on 8 May and the zip is broken, and you would like a replacement. Is that right?' This proves you listened and lets the customer correct you. It also catches misunderstandings early.",
          "Avoid assumptions. Do not decide the customer made a mistake before you check. Try the simplest explanations first (wrong password, out-of-date information) but always in a respectful way: 'Let me check a few things with you' is better than 'Did you try turning it off and on?' Once you understand the real problem, decide whether you can solve it yourself, need to ask a colleague or must escalate."
        ],
        example: "A customer wrote: 'Your website took my money but I got nothing!' The agent asked open questions and learned that the payment had gone through but the confirmation email had gone to a spam folder. The order was fine. Because the agent looked into the facts first, instead of refunding immediately, the customer kept the order and the company kept the sale.",
        steps: [
          "Invite the story with an open question.",
          "Ask closed questions to get facts: what, when, where and which message.",
          "Note the facts, the feelings and what the customer wants.",
          "Repeat back your understanding and ask 'Is that right?'",
          "Decide: solve it, ask a colleague or escalate."
        ],
        mistakes: [
          "Jumping to a solution after the first sentence.",
          "Assuming the customer is wrong.",
          "Asking many questions at once so the customer is confused."
        ],
        terms: [["Open question", "A question that invites a longer answer, such as 'What happened?'"], ["Closed question", "A question with a short answer such as yes/no or a date."], ["Assumption", "Believing something without checking."], ["Root cause", "The real reason behind a problem."]],
        tryit: "A customer says 'My parcel is wrong'. Write five questions you would ask, marking each as open or closed.",
        pts: ["The first description is often incomplete.", "Use open questions, then closed questions for facts.", "Repeat back your understanding before solving."],
        qs: [
          { p: "Which is an open question?", o: ["Can you tell me what happened?", "Did it arrive on Monday?", "Is it blue?"], a: 0 },
          { p: "Why repeat back what the customer said?", o: ["To check you understood and to show you listened", "To waste time", "To avoid working"], a: 0 }
        ]
      },
      {
        t: "Handling upset and difficult customers",
        goal: "Stay calm, respond to feelings first and guide angry conversations toward a solution.",
        body: [
          "Sooner or later a customer will be angry with you. The most important idea is this: the anger is nearly always about the situation, not about you as a person. Staying calm and not taking it personally lets you help. Shouting back or arguing always makes it worse.",
          "Use the steps calm, acknowledge, act. First, calm: breathe, slow your speech and lower your voice. Let the customer speak, because people often calm down once they have said everything. Second, acknowledge: name the feeling and show you understand ('I can see how frustrating it is to wait two weeks; I would be upset too'). An apology for the experience is useful, even when it was not your personal mistake. Third, act: move to what you can do and give clear next steps.",
          "Avoid phrases that inflame: 'Calm down', 'That is our policy', 'You should have', 'It is not my department'. Replace them with helpful ones: 'Let me see how I can help', 'Here is what I can do', 'I will find out who can solve this and come back to you by three o'clock'. If the customer offers a fair point, agree with it.",
          "Know your limits. If a customer becomes abusive, threatens you or uses insulting language, calmly say what is acceptable: 'I want to help you, but I cannot continue if I am spoken to like this.' If it continues, end the call politely and tell your supervisor. You are entitled to respect too. For requests beyond your authority, hand over to a supervisor with a full summary so the customer does not have to repeat the story."
        ],
        example: "A customer phoned shouting that his internet had been down for three days. The agent let him finish, then said, 'Three days without internet when you work from home is a serious problem, and I am sorry. Here is what I will do: I am booking an engineer for tomorrow morning and I will send you a text with the time. I will also phone you at noon to check that they are on the way.' By the end the customer said, 'Thank you for actually helping.'",
        steps: [
          "Stay calm: breathe, slow down and let the customer finish.",
          "Acknowledge the feeling and apologise for the experience.",
          "Move to action: say what you can do and by when.",
          "If you cannot decide, hand over with a full summary.",
          "If the customer is abusive, state the limit calmly and end the call politely if it continues."
        ],
        mistakes: [
          "Arguing or defending the company at once.",
          "Using phrases like 'Calm down' or 'That is our policy'.",
          "Transferring the customer without telling the next person what happened."
        ],
        terms: [["De-escalate", "To make a tense situation calmer."], ["Acknowledge", "To recognise and name what someone feels."], ["Supervisor", "A person with more authority who can take a decision."], ["Handover", "Passing a case to another person with all the information."]],
        tryit: "Write three sentences you would say to a customer who says, 'This is the third time I have contacted you and nobody has helped!'",
        pts: ["Stay calm and do not take anger personally.", "Calm, acknowledge, act.", "Know your limits and hand over with a full summary."],
        qs: [
          { p: "What should you do first with an angry customer?", o: ["Argue back", "Stay calm and let them finish", "Hang up"], a: 1 },
          { p: "You must transfer a case to a supervisor. What is best?", o: ["Transfer without explaining", "Give the supervisor a full summary so the customer need not repeat", "Ask the customer to call again"], a: 1 }
        ]
      },
      {
        t: "Solving problems: refunds, replacements and saying no",
        goal: "Choose fair solutions within company rules and deliver difficult answers respectfully.",
        body: [
          "Most cases end in one of a few outcomes: an answer, a repair, a replacement, a refund, a credit, an apology or a clear 'no'. Learn your company's rules for each: who may approve a refund, what limits apply, how long each takes and what proof is needed. Rules exist to be fair to all customers and to protect the company from fraud and loss.",
          "Follow a fair method. Check the facts (order, date, condition). Check the policy. Choose the solution that fits both, and if there are options, offer them: 'I can send a replacement in three days, or refund you today; which would you prefer?' Giving a choice restores a feeling of control.",
          "Sometimes the answer is no. A good no has four parts: acknowledge the request, explain the reason simply, offer an alternative and say what happens next. For example: 'I understand you would like a refund after 60 days. Our policy covers 30 days, so I cannot refund it. What I can do is offer a repair at no cost or a 20 percent credit toward a new one. Which would you like?' Never hide behind 'the system says no'.",
          "Be careful about fairness and honesty. Do not give special deals in secret, promise beyond your authority or bend rules for people who shout the loudest. If a rule seems unfair or unclear, report it to your supervisor after the call, so that the company can improve it. Record what you decided and why, so any colleague can understand the case later."
        ],
        example: "A customer wanted a full refund on a laptop after 45 days because the battery was weak. The policy offered refunds within 30 days and free repair within one year. The agent said, 'I am sorry the battery is not lasting. I cannot refund after 30 days, but the warranty covers a free battery replacement. I can book it today and it takes three days. Would you like that?' The customer accepted, and the problem was solved within the rules.",
        steps: [
          "Confirm the facts: order, dates, condition and proof.",
          "Check the policy and your authority.",
          "Offer the best solution, with options where possible.",
          "If it is a no, give the reason, an alternative and the next step.",
          "Record the decision and reasons in the case."
        ],
        mistakes: [
          "Saying 'no' with no reason and no alternative.",
          "Making secret exceptions that are unfair to other customers.",
          "Forgetting to record what was agreed."
        ],
        terms: [["Refund", "Giving the customer's money back."], ["Replacement", "Sending a new item in place of a faulty one."], ["Policy", "The company's written rules for how to handle situations."], ["Warranty", "A promise to repair or replace a product for a period."]],
        tryit: "Write a four-part 'no' to this request: a customer wants a refund on a used, opened software licence.",
        pts: ["Know the rules for refunds, replacements and credits.", "Offer options where possible.", "A good no acknowledges, explains, offers an alternative and gives next steps."],
        qs: [
          { p: "What makes a good 'no'?", o: ["A reason, an alternative and next steps", "A quick hang-up", "A long argument"], a: 0 },
          { p: "Why record the decision and reasons?", o: ["So any colleague can understand the case later", "To fill the system", "It is not needed"], a: 0 }
        ]
      },
      {
        t: "Cases, tickets and records",
        goal: "Log every customer contact clearly so that nothing is lost and anyone can continue the work.",
        body: [
          "A ticket (or case) is the record of a customer's issue from the first contact to the final solution. Each one has a unique number, the customer's details, the description of the problem, actions taken, the status and the dates. Good records protect the customer, because nothing is forgotten, and protect you, because you can show what happened.",
          "Write notes so that a stranger could pick up the case without asking anything. Include what the customer said (in their words if important), what you checked, what you promised and by when, and what is waiting. Use facts, not opinions: 'Customer says the device will not turn on; battery light does not respond after 2 hours of charging' is better than 'Customer is angry and device is broken'.",
          "Use statuses honestly. Common ones are New, Open, Waiting for customer, Waiting for internal team, Resolved and Closed. Move the case as things change. Set priorities: an outage affecting many people, or a safety risk, is urgent; a question about opening hours is not. Company service targets often say how quickly you must reply and resolve, and these are called service levels or SLAs.",
          "Respect privacy. Customer information is confidential. Access only the cases you need, never share details with the wrong person and verify identity before discussing an account, for example by asking for two details that only the real customer would know. Do not write things in a ticket that you would not be comfortable showing the customer. Before closing, confirm the problem is solved and, where possible, ask whether the customer is satisfied."
        ],
        example: "A ticket read: 'Customer unhappy. Fix ASAP.' When a colleague took over, they had to phone the customer and start from scratch. A better ticket said: 'Ticket 4821. Customer Sara N. Order 7715 arrived 5 May with cracked screen. Photos received 6 May. Replacement approved by team lead, dispatch by 9 May. Customer to be emailed tracking on dispatch.' Any colleague could continue immediately.",
        steps: [
          "Open a ticket for every contact with a clear summary.",
          "Record facts, actions, promises and dates.",
          "Set the right priority and status.",
          "Verify identity before discussing account details.",
          "Confirm the solution with the customer before closing."
        ],
        mistakes: [
          "Vague notes such as 'customer unhappy'.",
          "Leaving cases open with no update.",
          "Discussing an account without verifying who is calling."
        ],
        terms: [["Ticket / case", "The record of one customer issue from start to finish."], ["Status", "Where the case is now, such as Open or Resolved."], ["Priority", "How urgent the case is."], ["SLA", "Service level agreement: a target time for replying or resolving."]],
        tryit: "Write a good ticket note for: a customer says his invoice shows a charge for a service he cancelled in March.",
        pts: ["A ticket records the issue from start to finish.", "Write facts so any colleague can continue.", "Verify identity and respect privacy."],
        qs: [
          { p: "Which note is best?", o: ["Customer angry, fix ASAP", "Order 7715 arrived with a cracked screen; photos received; replacement approved; dispatch by 9 May", "See other ticket"], a: 1 },
          { p: "Before discussing an account, what should you do?", o: ["Verify the caller's identity", "Skip it if they sound sure", "Ask them to email a password"], a: 0 }
        ]
      },
      {
        t: "Measuring and improving service",
        goal: "Use simple measures and customer feedback to make service better over time.",
        body: [
          "What you measure improves. Service teams track a few simple numbers. First response time: how long a customer waits for the first reply. Resolution time: how long until the problem is fixed. First-contact resolution: the share of cases solved in the first contact, without follow-ups. Customer satisfaction (CSAT): a rating customers give after the case, often 1 to 5.",
          "Numbers only help if you look at them honestly. A fast reply that does not solve anything is not good service. A team that closes tickets quickly but leaves customers with the same problem is not helping. So combine speed measures with quality measures, and read the customers' own comments, because they often explain the reasons behind the numbers.",
          "Look for patterns. If many customers ask the same question, the answer may be missing or unclear on the website; create a help article or improve the instructions. If many complaints concern one product, tell the product team. Teams often keep a knowledge base, which is a collection of clear answers to common questions, so everyone gives the same correct answers.",
          "Improve steadily. Every week, pick one thing: the most common question, the slowest type of case or the lowest rating. Find the cause, try a change and measure again. Ask for feedback in a friendly way and thank customers for it. Also look after yourself: service work can be tiring, and a rested, respected team gives better service."
        ],
        example: "A team noticed that 25 percent of its emails asked how to reset a password. They wrote a short help article with three clear steps and put a link in the login page. Two months later, those emails had dropped by 70 percent, and the team had more time for difficult cases. Customer satisfaction rose from 3.9 to 4.4.",
        steps: [
          "Track first response time, resolution time, first-contact resolution and satisfaction.",
          "Read customer comments as well as numbers.",
          "Look for repeated questions and write clear help articles.",
          "Share product problems with the right team.",
          "Pick one improvement each week and measure the result."
        ],
        mistakes: [
          "Chasing speed and ignoring quality.",
          "Ignoring customer comments.",
          "Answering the same question by hand for months without fixing the cause."
        ],
        terms: [["First response time", "How long a customer waits for the first reply."], ["CSAT", "Customer satisfaction score, usually a rating after the case."], ["First-contact resolution", "The share of cases solved in the first contact."], ["Knowledge base", "A collection of clear answers to common questions."]],
        tryit: "Suppose 30 of your 100 weekly emails ask about delivery times. Write two ways to reduce them.",
        pts: ["Track speed and quality together.", "Read comments and look for repeating patterns.", "Improve one thing at a time and measure again."],
        qs: [
          { p: "What does first-contact resolution measure?", o: ["Cases solved in the first contact", "How many tickets are opened", "Time on holiday"], a: 0 },
          { p: "Many customers ask the same question. What is a good response?", o: ["Improve the website or write a help article", "Ignore it", "Answer more slowly"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Resolve a delayed-order complaint",
      scenario: "You work in the support team of an online shop. A customer, Mr Omar Rashid, wrote an angry email: he ordered a 250-dollar coffee machine for his mother's birthday, paid on 2 June, was promised delivery in 3 days and it is now 12 June with nothing delivered. The tracking page says 'delayed at depot'. The birthday is on 14 June. He has already contacted you twice. Your shop's policy allows an express replacement or a full refund for orders over 7 days late. Handle the case from start to finish.",
      cols: ["Detail", "Information"],
      rows: [["Customer email", "'This is the THIRD time! You took my money and sent nothing. I want my money back NOW or I will tell everyone.'"], ["Order", "Order 9032: coffee machine, USD 250, paid 2 June, promised 5 June."], ["Tracking", "Parcel scanned at depot on 7 June; no movement since. Courier says it may be lost."], ["Stock", "Two machines in stock; express delivery takes 2 days."], ["Policy", "Orders over 7 days late: customer may choose express replacement (free) or full refund. Refunds take 3 to 5 working days."], ["History", "Earlier tickets: 8 June and 10 June, both answered with 'we are checking'."]],
      tasks: ["Write the reply email (about 120 words) using calm, acknowledge and act. Offer the customer a real choice.", "Write the internal ticket note in the correct style: facts, actions, promises and dates.", "List two things you would do beyond this ticket to stop the same problem happening again.", "Explain in three sentences how you would handle it if the customer replied with insults."],
      hints: ["The birthday is on 14 June; express replacement takes 2 days. Say this clearly.", "Acknowledge that this is the third contact and that earlier answers did not help.", "Do not promise a refund date shorter than policy."],
      rubric: ["The reply is calm, apologises for the experience and offers both options with dates.", "It states what will happen next and when, with a follow-up.", "The ticket note is factual and complete.", "Improvement ideas address the cause, and the insult response sets a polite limit."],
      deliverable: "A reply email, a ticket note, two improvement ideas and a short plan for abusive replies."
    }
  }
};
