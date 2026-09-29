// DB-05 AI-Native Engineering Practice — working with AI tools responsibly, in plain language.
module.exports = {
  "DB-05": {
    outcome: "Work with AI assistants to get real work done, check what they produce, fix problems, avoid risky shortcuts and be honest about where AI helped.",
    units: [
      {
        t: "What AI assistants can and cannot do",
        goal: "Describe how AI tools work at a simple level so you know when to trust them and when to check.",
        body: [
          "An AI assistant is software that has learned patterns from an enormous amount of writing. When you ask it something, it does not look up a single true answer. It builds a reply one word at a time, choosing the words that are most likely to fit. Because it has seen so much, the result is often excellent. But because it is predicting rather than knowing, it can also produce false statements in a calm, confident voice.",
          "Think of a very well-read new assistant who has never worked in your company. They can draft, summarise, translate, explain and brainstorm at speed. They cannot know your private facts, they cannot see today's news unless connected to it, and they sometimes fill gaps by guessing rather than saying 'I don't know'. A good manager of such an assistant gives clear instructions and checks the work.",
          "Tools that help with building things (for example software, spreadsheets or websites) work in the same way. They can produce a first draft of a formula, a page or a small program in seconds. But they can also produce something that looks right and quietly does the wrong thing. The skill of the modern worker is not typing every word themselves but directing, checking and correcting.",
          "This course uses one simple principle: AI drafts, humans decide. You remain responsible for the result. That means understanding enough to ask sensible questions and spot when something feels off, even if you never write a line of code."
        ],
        example: "A café owner asked an AI assistant to write a formula that adds up only the sales from Fridays. The formula looked professional. She tested it on three days she could count by hand and noticed that it also included Thursdays. She told the assistant what she saw, it corrected the formula, and she tested again. The checking took two minutes and avoided months of wrong reports.",
        steps: [
          "Decide what you want, in one sentence, before you open the tool.",
          "Ask the assistant for a first draft, not a final answer.",
          "Test the result on a small example where you already know the right answer.",
          "Tell the assistant exactly what was wrong and ask for a correction.",
          "Keep the version you have tested and understood."
        ],
        mistakes: [
          "Assuming the assistant knows your private business facts.",
          "Believing it because the writing sounds confident.",
          "Skipping testing because the answer 'looks right'."
        ],
        terms: [["AI assistant", "Software that writes and answers in everyday language by predicting likely words."], ["Hallucination", "A confident but false statement produced by an AI tool."], ["Draft", "A first version that must be checked and improved."], ["Human in the loop", "A person who reviews and takes responsibility for the AI's work."]],
        tryit: "Ask an AI tool a question in an area you know well. Find one thing it got right, one thing it got wrong and one thing it missed. Notice how confident it sounded in all three.",
        pts: ["AI predicts likely words; it does not automatically know the truth.", "Treat its output as a draft to be tested.", "You stay responsible for the final result."],
        qs: [
          { p: "Why can an AI assistant produce a wrong answer that sounds sure?", o: ["It predicts likely words and does not always know what is true", "It is broken", "It is trying to trick you"], a: 0 },
          { p: "What is the best way to treat an AI-written formula?", o: ["Use it immediately", "Test it on an example where you know the answer", "Ask a friend to guess"], a: 1 }
        ]
      },
      {
        t: "Writing clear requests: the task brief",
        goal: "Give an AI tool instructions that are clear, complete and checkable, so you get useful results the first time.",
        body: [
          "The quality of what you receive depends on the quality of what you ask. A short vague request such as 'make me a price list' forces the assistant to guess almost everything. A clear request, often called a prompt or a brief, removes the guesswork. It works like giving instructions to a new colleague on their first day.",
          "A good brief has five parts. The goal: what you want and what it is for. The context: the facts the tool needs (who the reader is, what your business does, what you already have). The constraints: the limits (length, tone, things it must not do). The format: how you want the answer (a table, five bullet points, a short email). And the check: how you will know it is right, ideally a few examples or rules.",
          "Small steps beat one giant request. If you ask for a whole system in one go you get a muddle. Ask for a plan first, read it, correct it, then ask for one part at a time. Each step is easier to check. When an answer is wrong, do not just say 'wrong'. Say what you expected and what you saw, for example 'the total for Friday should be 320 but I got 480'.",
          "Also say what NOT to change. When you ask for an improvement to something that works, tell the tool to leave the other parts alone. Otherwise a helpful assistant may rewrite things you liked. And never include private data in a request unless the tool is approved for it."
        ],
        example: "Compare two requests. Weak: 'Write an email to customers about our new opening hours.' Strong: 'Write a friendly 80-word email to our regular customers telling them that from 1 June the café opens at 7am instead of 8am on weekdays and closes at 4pm. Keep the tone warm, no emojis, end with our phone number 555 0142, and give me three subject lines.' The second produces something usable in seconds.",
        steps: [
          "Write the goal in one sentence.",
          "Add the context: who, what, where, what you already have.",
          "List the constraints: length, tone, what to avoid, what not to change.",
          "State the format you want and how you will check the answer.",
          "Send it, read the result, then ask for one improvement at a time."
        ],
        mistakes: [
          "Giving a one-line request for a complex task.",
          "Saying 'that's wrong' without saying what you expected.",
          "Letting the tool rewrite parts that were already good."
        ],
        terms: [["Prompt / brief", "The instruction you give an AI tool."], ["Context", "The background facts the tool needs to do the job well."], ["Constraint", "A limit or rule the answer must respect."], ["Iteration", "Improving the result step by step through several rounds."]],
        tryit: "Take a weak request such as 'write a social post about my shop'. Rewrite it with a goal, context, constraints, format and a check. Compare the two results if you have access to a tool.",
        pts: ["A good brief has goal, context, constraints, format and a check.", "Work in small steps and give precise feedback.", "Tell the tool what must not be changed."],
        qs: [
          { p: "Which element helps you decide whether an AI answer is correct?", o: ["A clear check, such as examples or rules", "A polite greeting", "A long story"], a: 0 },
          { p: "An answer is wrong. What is the most useful reply?", o: ["That is wrong", "Say what you expected and what you saw", "Ask the same question again"], a: 1 }
        ]
      },
      {
        t: "Checking AI work: reading, testing and comparing",
        goal: "Use a simple routine to review anything an AI produced before you rely on it.",
        body: [
          "Trusting AI output without checking is like signing a contract without reading it. The routine below takes only a few minutes and catches most problems. It works for text, numbers, spreadsheets, web pages and small programs alike.",
          "Step one, read it all. Do not skim. Underline every fact, number, name, date and promise. These are the places where mistakes hide. Step two, check the facts against a reliable source such as the original document, an official website or your own records. Step three, test with examples where you already know the answer, including unusual cases (an empty list, a very large number, a name with an accent, a date at the end of the year).",
          "Step four, look for changes you did not ask for. When AI edits something, it may quietly remove a check, rename things or delete a paragraph. When a change is shown side by side (a comparison, often called a diff), read it line by line. Ask, 'Did I ask for this?' Step five, look for missing parts: things you expected but that are not there, such as error messages, safety checks or the last item on the list.",
          "Finally, decide. Accept, accept with changes, or reject and try again with a better brief. Record what you checked. If you are unsure about something you cannot judge yourself, such as a legal point, ask an expert. Being responsible does not mean knowing everything; it means knowing what needs checking and who can check it."
        ],
        example: "A small agency asked an AI to update its price table. The assistant returned a nice new table, and at first glance it was fine. Comparing old and new side by side, the owner spotted that two services had vanished and one price had changed although nobody asked. The assistant had 'tidied up' quietly. Because she compared, she restored the missing rows before the table went to clients.",
        steps: [
          "Read the whole answer slowly and mark every fact, number, name and promise.",
          "Check the marked items against a reliable source.",
          "Test with normal and unusual examples where you know the right result.",
          "Compare old and new versions to find changes you did not ask for.",
          "Look for what is missing, then accept, fix or reject."
        ],
        mistakes: [
          "Skimming instead of reading.",
          "Testing only the easy, typical case.",
          "Not comparing old and new, so hidden changes slip through."
        ],
        terms: [["Diff", "A side-by-side comparison that shows exactly what changed."], ["Edge case", "An unusual situation that often breaks things, such as empty or very large input."], ["Source of truth", "The reliable place you check facts against."], ["Review", "Reading and testing work before accepting it."]],
        tryit: "Ask an AI tool to rewrite a short table or paragraph of yours. Then compare original and new line by line and list every difference. Count how many you did not ask for.",
        pts: ["Read everything and mark facts and numbers.", "Test typical and unusual cases.", "Compare old and new to catch quiet changes."],
        qs: [
          { p: "What is the minimum before accepting AI-generated work?", o: ["Check that it looks tidy", "Read it, check the facts and test it", "Ask the AI if it is correct"], a: 1 },
          { p: "What is a 'diff' used for?", o: ["To see exactly what changed between two versions", "To print faster", "To colour a page"], a: 0 }
        ]
      },
      {
        t: "Fixing problems with AI as a helper",
        goal: "Use a calm method to find out why something is not working and ask an AI tool for useful help.",
        body: [
          "Sooner or later something you built or a tool you use stops working. Panic makes people change five things at once, after which nobody knows what fixed it or broke it further. Fixing problems is a calm, step-by-step activity, and AI can be a good helper when you feed it the right facts.",
          "First, describe the problem exactly. What did you do? What did you expect? What happened instead? Was there a message on the screen? Copy the message word for word. Second, make the problem repeatable: find the smallest set of steps that reliably shows it. A problem that appears 'sometimes' is hard to fix; one you can trigger in three steps is nearly solved.",
          "Third, form a guess (a hypothesis) about the cause and test only that one guess. Change one thing at a time, then check. When you ask an AI tool for help, give it the exact message, what you did, what you expected and what you already tried. Ask it for several possible causes, ranked by likelihood, and how to test each. This is far better than 'it does not work, fix it'.",
          "Fourth, confirm the fix: repeat the original steps and check the problem is gone and nothing else broke. Finally, write a two-line note of what the problem was and how you solved it, so that next time you or a colleague saves an hour. Never paste private data into a tool while asking for help; replace names and numbers with examples first."
        ],
        example: "A wedding planner's booking spreadsheet suddenly showed 'Error' in the total. She wrote: 'Yesterday the total in cell F20 worked. I added a new row at row 15 and now F20 shows an error. The formula is =SUM(F2:F14). I expected the new row to be included.' The assistant explained that the new row sat outside the range and showed how to extend it. She tested with a known total and made a note for next time.",
        steps: [
          "Write down what you did, what you expected and what happened, with any message copied exactly.",
          "Find the shortest steps that repeat the problem every time.",
          "Guess one cause and test only that; change one thing at a time.",
          "Ask an AI tool with the exact facts and request several ranked causes with ways to test.",
          "Confirm the fix by repeating the original steps, and write a short note."
        ],
        mistakes: [
          "Changing many things at once.",
          "Describing the problem vaguely ('it's broken').",
          "Pasting private information into the help request."
        ],
        terms: [["Reproduce", "To make a problem happen again on purpose so it can be studied."], ["Hypothesis", "A specific guess about the cause that you can test."], ["Root cause", "The real reason a problem happens, not just its symptom."], ["Regression", "A new problem caused by a fix for an old one."]],
        tryit: "Recall a technology problem you had recently. Write it in the form: what I did, what I expected, what happened, what I tried. See how much clearer it is than 'it did not work'.",
        pts: ["Describe the problem exactly and make it repeatable.", "Change one thing at a time and test one guess.", "Confirm the fix and write a short note."],
        qs: [
          { p: "What should you do before asking for help with a bug?", o: ["Describe exactly what you did, expected and saw", "Restart everything ten times", "Delete the project"], a: 0 },
          { p: "Why change only one thing at a time?", o: ["So you know which change fixed or broke something", "Because it is faster", "It is a legal rule"], a: 0 }
        ]
      },
      {
        t: "Trusting outside tools, add-ons and packages",
        goal: "Recognise the risks of using other people's tools and ask the right questions before adding them.",
        body: [
          "Almost nothing is built from scratch today. Websites and apps use ready-made building blocks made by others, called libraries, packages, plugins or add-ons. Using them saves months of work, but each one also becomes a part of your product, and their weaknesses become yours. When a problem appears in a widely used building block, thousands of products are affected at once.",
          "AI assistants add an extra risk here. They may recommend a package that does not exist, because they invented a believable name. Criminals sometimes register such invented names and fill them with harmful code, hoping that someone will install it. So a name suggested by an AI must always be checked before you use it.",
          "Ask a few simple questions about any outside tool. Does it really exist and can I find its official page? Who makes it and are they trustworthy? Is it still maintained (updated recently)? Do many people use it? What permissions or data does it ask for? What is its licence, meaning the rules about how you may use it, for example for business? Could I do without it?",
          "Keep a simple list of the outside tools you use, why, and which version. Update them regularly, because updates fix known weaknesses. Remove ones you no longer need. The fewer outside pieces you rely on, the fewer things can break or be attacked."
        ],
        example: "A developer asked an assistant for a tool to create PDF invoices. It suggested 'easy-invoice-pro'. A quick search showed no official page, no reviews and a package created only two days earlier. A careful colleague found a well-known, actively maintained alternative with millions of users and a clear licence. The invented package might have contained harmful code.",
        steps: [
          "Search for the tool's official page and read a bit about who makes it.",
          "Check when it was last updated and how many people use it.",
          "Read what data or access it asks for.",
          "Check the licence allows your kind of use.",
          "Add it to your list of outside tools and plan to update it regularly."
        ],
        mistakes: [
          "Installing whatever name an assistant suggests without checking it exists.",
          "Adding a tool for a tiny job that you could do without it.",
          "Never updating outside tools."
        ],
        terms: [["Package / library", "A ready-made building block of code made by someone else."], ["Licence", "The rules that say how you may use a tool or content."], ["Maintained", "Still being updated and fixed by its makers."], ["Supply chain", "All the outside pieces that your product depends on."]],
        tryit: "Choose any add-on you use (a browser extension, a spreadsheet add-in). Find its official page, its last update date and the data it can access. Would you still install it?",
        pts: ["Every outside tool becomes part of your product and your risk.", "AI may suggest tools that do not exist, so verify first.", "Check existence, maker, updates, popularity, permissions and licence."],
        qs: [
          { p: "An AI assistant recommends a tool you have never heard of. What should you do?", o: ["Install it immediately", "Verify it exists, is maintained and has a clear licence", "Ignore all tools forever"], a: 1 },
          { p: "What is a licence?", o: ["The rules for how you may use a tool or content", "A type of update", "A password"], a: 0 }
        ]
      },
      {
        t: "Being honest about AI's part, and protecting privacy",
        goal: "Explain when and how to say that AI helped, and follow simple rules to keep private information safe.",
        body: [
          "Honesty builds trust. If AI wrote part of a report, drafted an image or helped design a solution, the people who rely on your work deserve to know when it matters. The simplest approach is a short note: 'Drafted with an AI assistant and checked by [name].' Some organisations, schools and clients require this, and some laws and platforms do too. When in doubt, tell your manager or client and follow their rule.",
          "Being honest also means never presenting AI output as your own expert judgement when you have not checked it, never inventing sources or quotes, and never claiming an AI tool did something it did not. If a mistake turns out to be AI's, you are still the one who used it, so you correct it openly and quickly.",
          "Privacy is the other half. Many AI tools keep what you type. Before using one, ask: is this tool approved by my organisation? What does it do with my inputs? Never enter passwords, identity numbers, financial or health details, customer lists, contracts or anything marked confidential unless the tool is specifically approved for it. A useful trick is to swap real names and numbers for placeholders ('Customer A', '5,000') when you only need help with the structure.",
          "Finally, think about fairness and harm. AI can repeat biases from its training and can produce content that is hurtful or wrong about people. Never use it alone to decide things that affect people's lives, such as hiring, lending or discipline. Use it for support, and keep a human responsible for decisions."
        ],
        example: "A recruiter wanted an AI tool to shortlist candidates from 200 CVs. Her manager pointed out that the tool might favour or penalise people unfairly and that the CVs contained private details. Instead she used the tool to summarise job descriptions and to draft interview questions, using no personal data, while a human read every CV. She saved time without risking people's fair treatment.",
        steps: [
          "Find out your organisation's rule on AI tools and follow it.",
          "Replace real names and numbers with placeholders when possible.",
          "Keep confidential or personal data out of tools not approved for it.",
          "Add a short honest note when AI helped with something others rely on.",
          "Keep a person responsible for decisions that affect people."
        ],
        mistakes: [
          "Pasting customer or staff data into an unapproved tool.",
          "Presenting AI's unchecked answer as your own expert opinion.",
          "Letting AI alone decide matters that affect people."
        ],
        terms: [["Disclosure", "Openly saying that AI helped produce something."], ["Confidential", "Information that should only reach people who need it."], ["Placeholder", "A stand-in such as 'Customer A' used instead of real details."], ["Bias", "An unfair leaning in results, often inherited from the data a tool learned from."]],
        tryit: "Write the two-sentence honesty note you would attach to a report where AI drafted the first version. Then list three things you would never paste into an unapproved tool.",
        pts: ["Be open about AI's part when it matters and follow your organisation's rules.", "Keep private and confidential data out of unapproved tools.", "Keep a human responsible for decisions about people."],
        qs: [
          { p: "Which information is it NOT safe to paste into an unapproved AI tool?", o: ["A general question about spreadsheets", "A customer list with phone numbers", "A public news article"], a: 1 },
          { p: "Should AI alone decide who gets hired?", o: ["Yes, it is objective", "No, a human should stay responsible for decisions about people", "Only on weekends"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Review an AI's change before it goes live",
      scenario: "A small online shop used an AI assistant to add a 'discount code' feature to its checkout. The assistant returned a change summary. You are the reviewer. Your manager wants to know what to accept, what to reject, what risks each unrequested change carries and how to write honest notes about the AI's part. Use the summary below.",
      cols: ["What the AI changed", "What you noticed"],
      rows: [["Added a field 'discount code' to the checkout", "This was requested."], ["Removed the check that an email address looks valid", "Not requested; the assistant said it was 'simplifying'."], ["Added a tool called 'easy-coupon-pro'", "You cannot find it on any official site; it was created three days ago."], ["Tests", "Two new tests were added, but one older test about totals was deleted."], ["Price calculation", "Discounts are applied before delivery is added; the shop's rule is to discount only the goods, not delivery."]],
      tasks: ["For each of the five changes, say 'accept', 'accept with changes' or 'reject' and give a one-sentence reason.", "Explain the risk of the unrequested changes in plain words for the shop owner.", "Write the message you would send back to the AI assistant to correct the work (be specific, using what you expected and what you saw).", "Write the honesty note you would add to the change record."],
      hints: ["A deleted test is a warning sign: something that used to be checked no longer is.", "An unknown tool should be checked before it is used at all.", "Remember the shop's own rule about delivery costs."],
      rubric: ["Each decision has a reasoned explanation.", "Risks are explained clearly without jargon.", "The correction message says what was expected and what was seen.", "The honesty note states AI's part and who checked it."],
      deliverable: "A review sheet with five decisions, a plain-language risk explanation, the correction message and the honesty note."
    }
  }
};
