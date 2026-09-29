// DB-08 DB-22 Final Assessment Challenge — how to prepare for and complete the final challenge.
module.exports = {
  "DB-08": {
    outcome: "Prepare for, complete and defend an end-to-end piece of work on a fresh business scenario under time pressure, and understand how it is reviewed and independently verified.",
    units: [
      {
        t: "How the final challenge works",
        goal: "Understand what the challenge is, what it tests, how it is judged and why it is different from the lessons.",
        body: [
          "The final challenge (called DB-22) is the point where you show that you can do real work on your own, not only follow lessons. You receive a fresh, fictional small business with a problem you have not seen before. In a fixed time you plan a solution, build a small working piece of it, handle a surprise change, and explain your choices to a reviewer.",
          "It is not a test of memory. Nobody asks you to recite definitions. It tests judgement: can you understand a situation, choose sensible priorities, make something useful and safe, be honest about limits and talk about your reasoning clearly? That is exactly what employers and clients value.",
          "The challenge follows a fixed path. First you read and accept an assessment contract, which lists the time window, the tools allowed, what you must submit and how it will be judged. Then a constrained working period. During it, the assessor may introduce an injected incident, such as a change request or a new fault, to see how you cope. At the end you submit an evidence pack and defend your work in a conversation.",
          "Judging is done by a human reviewer using a published rubric (a list of what good looks like), so nothing is secret. Separately, independent verification may be carried out by a different qualified person who has no personal or professional connection to you and who declares any conflict of interest. Completing the challenge and being independently verified are two different things, and your certificate will say clearly which one you have."
        ],
        example: "Imagine you are given 'BlueDune Cleaning', a fictional company that takes bookings by phone and loses jobs to double bookings. You have four hours. You read the brief, ask clarifying questions, plan a simple booking table and process, build a small version, respond when the assessor says 'the owner now wants a cancellation policy', and finally explain why you chose a simple solution first. Your reviewer scores each part against the rubric.",
        steps: [
          "Read the challenge rules and the rubric carefully before the window begins.",
          "Note the time window, allowed tools, what to submit and how you will be judged.",
          "Confirm what independent verification means and that it is a separate step.",
          "Plan how to divide your time: understand, plan, build, check, prepare to explain.",
          "Get ready with a quiet place, your notes and a working device."
        ],
        mistakes: [
          "Treating it like a memory test.",
          "Not reading the rubric, so you optimise the wrong things.",
          "Assuming that completing equals verification."
        ],
        terms: [["Assessment contract", "The agreement that states the rules, time, tools, evidence and judging for the challenge."], ["Rubric", "The published list of what good work looks like at each level."], ["Injected incident", "A surprise change or fault introduced during the challenge to test judgement."], ["Independent verification", "A separate check of your evidence by someone with no connection to you."]],
        tryit: "Write down, in your own words, what the final challenge tests and three things you would do in the first ten minutes after receiving a brief.",
        pts: ["The challenge tests judgement on a fresh scenario, not memory.", "It follows a fixed path: contract, work period, surprise change, evidence and defence.", "Human review and independent verification are separate."],
        qs: [
          { p: "What does the assessment contract fix in advance?", o: ["The exact answers", "The time window, tools, evidence and how work is judged", "Nothing"], a: 1 },
          { p: "Who may carry out independent verification?", o: ["The person who coached you", "A qualified person with no connection to you and no conflict of interest", "Anyone you choose"], a: 1 }
        ]
      },
      {
        t: "Preparing: the checklist before the clock starts",
        goal: "Use a preparation routine that removes avoidable stress and problems.",
        body: [
          "People who do well in timed work usually prepared well. Preparation is not about learning more facts. It is about removing avoidable trouble so that all your attention goes to the task. Prepare your place, your tools, your knowledge and yourself.",
          "For your place and tools: choose a quiet spot with a reliable internet connection and a charged device. Test every tool you are allowed to use, such as your document editor, spreadsheet, drawing tool and the way you will submit work. Make sure you can sign in to each of them without needing a password reset during the challenge. Close everything that could distract you, and switch off notifications.",
          "For your knowledge: reread your own notes from lessons 1 to 6 of the earlier courses, particularly the short lists (for example the five parts of a brief, the questions for a problem, the steps of an incident). Prepare a one-page personal cheat sheet if the rules allow notes. Practise once with the earlier practice labs and time yourself so you know how long typical tasks take you.",
          "For yourself: sleep, eat and drink water. Decide beforehand how you will handle panic: take a slow breath, write down the next small step, and do only that. Agree a plan for the clock, for example 15 percent understanding, 15 percent planning, 50 percent building, 10 percent checking and 10 percent preparing your explanation. And read the rules about what help is allowed: using AI, asking questions and working with others may be limited."
        ],
        example: "Two learners took the same challenge. One arrived five minutes late, had to reset a forgotten password and used the first thirty minutes to stop shaking. The other had tested her tools the night before, brought a one-page cheat sheet and split her time as planned. She finished with time to check, while the first left key parts blank. Their skill was similar. The preparation was not.",
        steps: [
          "Choose a quiet place and test your internet and device the day before.",
          "Test every allowed tool and confirm you can sign in without help.",
          "Review your notes and make a one-page cheat sheet if notes are allowed.",
          "Write your time plan as percentages of the total window.",
          "Rest, eat and prepare a calming routine for stressful moments."
        ],
        mistakes: [
          "Discovering tool problems after the clock has started.",
          "Cramming new facts instead of reviewing what you know.",
          "Not planning how to use the time."
        ],
        terms: [["Time plan", "A decision on how to divide the available time between activities."], ["Cheat sheet", "A short personal summary of key points, used only if the rules allow."], ["Dry run", "A practice attempt done under similar conditions."], ["Distraction", "Anything that pulls attention from the task."]],
        tryit: "Write your own time plan for a four-hour challenge: how many minutes for understanding, planning, building, checking and preparing your explanation.",
        pts: ["Preparation removes avoidable problems and stress.", "Test tools, review notes and plan the clock.", "Look after sleep, food and calm."],
        qs: [
          { p: "Which is the most useful use of the day before the challenge?", o: ["Learning a completely new topic", "Testing your tools, reviewing notes and resting", "Staying up all night"], a: 1 },
          { p: "Why plan how to divide your time in advance?", o: ["So no single stage swallows the whole window", "Because the assessor requires a diagram", "To make the challenge longer"], a: 0 }
        ]
      },
      {
        t: "Reading the brief and making a plan",
        goal: "Understand an unfamiliar scenario quickly, ask the right questions and turn it into a short plan.",
        body: [
          "The first stage of the challenge is to understand the scenario. Resist the urge to start building at once. A few minutes of careful reading save an hour of wrong work. Read the whole brief twice: once to get the story, once with a pen to mark the goal, the people, the limits and the deadlines.",
          "Write the problem in one sentence in your own words. Then list who is involved (customers, staff, owner) and what each of them needs. List the rules and limits stated in the brief (budget, time, tools, privacy). List what is unclear. If you are allowed to ask questions, ask the most important two or three. If you cannot ask, write down your assumptions clearly, because a stated assumption shows good judgement.",
          "Now plan. Choose the smallest solution that solves the main problem well. Write three to five steps you will take, in order, with rough times. Decide what you will leave out on purpose and why (for example 'payment integration is out of scope for this window'). Being clear about what you are not doing is a sign of maturity, not weakness.",
          "Finally, decide how you will know you are done, in other words your own definition of done: a short checklist of results that must be true (for example 'a customer can book a slot; staff see only their jobs; the owner sees totals'). Write it at the top of your page and check it at the end."
        ],
        example: "For BlueDune Cleaning, one learner wrote: 'Problem: bookings are taken by phone and jobs are double-booked. People: customers, cleaners, owner. Limits: four hours, no payments, simple tools. Unclear: how many cleaners? Assumption: five cleaners, jobs of two hours.' She planned five steps, decided to leave out payments and reminders, and defined done as three checkable results. She was calm because she always knew the next step.",
        steps: [
          "Read the brief twice and mark goal, people, limits and deadlines.",
          "Write the problem in one sentence.",
          "List unclear points and ask questions if allowed; otherwise write assumptions.",
          "Plan three to five ordered steps with rough times and decide what to leave out.",
          "Write your definition of done as a short checklist."
        ],
        mistakes: [
          "Starting to build before understanding.",
          "Trying to solve everything at once.",
          "Hiding assumptions instead of stating them."
        ],
        terms: [["Brief", "The written description of the scenario and the task."], ["Assumption", "A stated belief you rely on when facts are missing."], ["Out of scope", "Deliberately left out of the work."], ["Definition of done", "A checklist of results that must be true before you can say you are finished."]],
        tryit: "Take any short business description (a paragraph). In ten minutes write the problem in one sentence, three questions, two assumptions, four steps and a three-item definition of done.",
        pts: ["Understand before building.", "State assumptions and what you will leave out.", "Write a definition of done and check it at the end."],
        qs: [
          { p: "The brief leaves out how many staff the business has. What is a good move?", o: ["Guess silently", "Ask if allowed, or write down a clear assumption", "Ignore staff completely"], a: 1 },
          { p: "What is a 'definition of done'?", o: ["A checklist of results that must be true when the work is finished", "The date on the calendar", "The assessor's name"], a: 0 }
        ]
      },
      {
        t: "Building small and complete",
        goal: "Deliver a modest solution that works from start to finish rather than a big one that is half finished.",
        body: [
          "In timed work, a small solution that works completely beats a large one that does not. A reviewer can judge only what exists and works. An unfinished grand plan proves little. A simple, finished flow that solves the core problem proves a lot. So choose a slice of the problem that is small enough to finish and meaningful enough to matter, and complete it end to end.",
          "Build in layers. First the simplest possible version of the main journey (a customer requests a booking and the owner sees it). Test it. Then add the most valuable improvement (a check against double booking). Test again. Then add polish (clear messages, tidy layout). If time runs out you still have a working version. This approach is often called 'walking skeleton': a thin but complete path from beginning to end.",
          "Keep notes as you go: what you decided and why, what you tried, what you left out. These notes become your evidence and your explanation. Save often, name your files clearly (as you learned in Digital Foundations), and keep a backup in case something goes wrong.",
          "Check your work at fixed points, not only at the end. After each layer, run through the main journey as if you were the customer, then as if you were the owner. Try one strange case, such as an empty field or a booking for a full day. Fix what you find, and keep the last twenty minutes free for a final review against your definition of done."
        ],
        example: "A learner facing the BlueDune scenario spent 90 minutes on a beautiful design but never connected the booking form to the diary. Another learner built a plain table and a simple form first, then added a check that stopped double bookings, then made messages friendly. The second solution looked plainer but worked, and scored much higher.",
        steps: [
          "Pick the smallest slice of the problem that still delivers real value.",
          "Build the simplest version of the main journey first and test it.",
          "Add the most valuable improvement next, then polish.",
          "Keep notes of decisions and save your work with clear names.",
          "Check after each layer and leave time for a final review."
        ],
        mistakes: [
          "Starting with polish and leaving the core unfinished.",
          "Building many half-working features.",
          "Testing only at the very end."
        ],
        terms: [["Walking skeleton", "A thin but complete working version of the main journey."], ["Layer", "One stage of improvement added on top of the working version."], ["Polish", "Finishing touches such as clear wording and neat layout."], ["Evidence", "The notes, files and results that show what you did."]],
        tryit: "Choose a small problem (a club sign-up). Write three layers you would build in order: the simplest working version, the most valuable improvement and the polish.",
        pts: ["Small and complete beats big and unfinished.", "Build in layers and test after each.", "Keep notes and leave time to check."],
        qs: [
          { p: "Which approach fits a timed build best?", o: ["Start many features and finish none", "Deliver a small solution that works from start to finish", "Spend the time planning only"], a: 1 },
          { p: "What should you do after building each layer?", o: ["Run through the main journey and test one strange case", "Nothing until the end", "Delete the previous layer"], a: 0 }
        ]
      },
      {
        t: "Handling the surprise: the injected change",
        goal: "Respond calmly and sensibly when the assessor introduces a new request or a fault mid-challenge.",
        body: [
          "Real work is never fully predictable. During the challenge, the assessor introduces a surprise on purpose, often a new request from the fictional owner, such as 'add a cancellation policy: free until 24 hours before, otherwise a fee', or a fault such as 'the customer list has duplicates'. The surprise is not a trap. It shows how you behave when plans change.",
          "Good responses follow a simple pattern. First, pause and understand: read the change carefully and, if allowed, confirm what it means. Second, judge the impact: what parts of my work are affected, how much time will it take, and what does it cost in the rest of the plan? Third, decide and say it: you may fit it in, do a simple version, or postpone something else. Fourth, communicate the trade-off in one or two sentences, as you would to a real client.",
          "Do not panic-rewrite everything, and do not ignore the change. Protect the work you already finished. Make the smallest adjustment that honours the new request, note it in your change log (as in the client delivery course) and update your definition of done. If the change cannot fit in the time, explain that clearly and describe how you would handle it next.",
          "Reviewers look for maturity: staying calm, thinking about consequences, keeping the working parts intact and being transparent. A learner who says 'This adds about 30 minutes. To fit it, I will use a simple fixed rule now and leave the fee calculation for the next phase' will usually score better than one who silently adds a fragile feature or one who refuses."
        ],
        example: "Halfway through, the assessor says the owner wants a cancellation policy. The learner thinks for a minute and replies: 'This changes the booking status and needs a rule about time. I will add a 'cancelled' status and a note showing whether a fee applies, using a simple 24-hour rule. Charging the fee automatically is out of this window, and I will list it as next phase.' She spends 25 minutes, tests, and updates her checklist.",
        steps: [
          "Pause, read the change carefully and confirm what it means.",
          "Judge its impact on what you have built and on the remaining time.",
          "Decide: fit it in, do a simple version, or postpone something else.",
          "State the trade-off in one or two clear sentences.",
          "Protect finished work, make the smallest change, test it and update your notes."
        ],
        mistakes: [
          "Ignoring the change.",
          "Rewriting everything in a panic.",
          "Adding the change silently without checking what it breaks."
        ],
        terms: [["Impact", "The effect of a change on work, time and cost."], ["Trade-off", "Giving up one thing to gain another."], ["Change log", "A record of changes to the plan and their effects."], ["Fragile", "Working in ordinary cases but easily broken by anything unusual."]],
        tryit: "Imagine the owner suddenly asks for a weekend price. Write your reply in three sentences: your understanding, the impact on time and your plan.",
        pts: ["Stay calm and assess the impact before acting.", "Make the smallest change that honours the request and protect finished work.", "Explain the trade-off clearly."],
        qs: [
          { p: "A change request arrives mid-challenge. What is the best first response?", o: ["Ignore it", "Pause, assess the impact and state the trade-off", "Start again from scratch"], a: 1 },
          { p: "What does 'trade-off' mean?", o: ["Giving up one thing to gain another", "A type of discount", "A kind of report"], a: 0 }
        ]
      },
      {
        t: "Defending your work and preparing the evidence",
        goal: "Explain and justify your choices clearly and package everything a reviewer needs.",
        body: [
          "The last stage is to submit an evidence pack and defend your work in a conversation. Defending does not mean arguing. It means explaining what you did, why, what you were unsure about and what you would do next. The reviewer wants to see that the work is yours and that you understand it.",
          "A good evidence pack is easy to read. It includes: a short summary of the problem in your own words; your assumptions; what you built, with screenshots or files; your definition of done and whether each item is met; how you handled the surprise change; how you tested; what you left out and why; and how AI or other help was used, if at all. Keep it tidy, with clear file names, so the reviewer finds each part in seconds.",
          "Prepare for typical questions: Why did you choose this approach? What would break first? Who could see what? What would you do with another day? What did you learn? Practise answering each in two or three plain sentences. Honest answers about limits ('this does not yet handle two bookings at the same second, and I would add a check') are stronger than pretending everything is perfect.",
          "Independent verification is different. Later, a different qualified person examines your evidence and may ask further questions to confirm that the work reflects your own capability. They must have no personal or professional connection to you, and they must declare any potential conflict of interest. Passing the challenge and being independently verified are recorded separately, so your certificate is honest about which one you have earned."
        ],
        example: "At the end, a reviewer asked a learner, 'What would break first if the business doubled in size?' The learner answered: 'The diary is one shared table. With many staff booking at once we could get conflicts, so I would add a check that rejects a slot already taken and move to a proper database. I tested the check with two bookings for the same time and it worked.' The reviewer noted honest, specific thinking.",
        steps: [
          "Collect your problem summary, assumptions, files and screenshots in one tidy folder.",
          "Check each item of your definition of done and mark it met or not met.",
          "Write a short note on the surprise change, your testing, what you left out and any AI help.",
          "Practise two-sentence answers to the likely questions.",
          "In the conversation, be honest about limits and clear about your reasoning."
        ],
        mistakes: [
          "Submitting a messy pile of files.",
          "Claiming everything works when you have not tested it.",
          "Not being able to explain your own choices."
        ],
        terms: [["Evidence pack", "The organised set of files and notes that shows what you did and why."], ["Defence", "The conversation where you explain and justify your work."], ["Conflict of interest", "A relationship that could stop someone from judging fairly."], ["Verification record", "The separate record showing that independent checking took place."]],
        tryit: "Write short answers (two sentences each) to: 'Why did you choose this approach?' and 'What would you do with one more day?'.",
        pts: ["Evidence should be organised, honest and easy to review.", "Defending means explaining your reasoning, including limits.", "Completion and independent verification are separate records."],
        qs: [
          { p: "Which answer to 'What are the limits of your solution?' is best?", o: ["There are none", "It does not yet handle X; I would add Y to fix it", "I do not remember"], a: 1 },
          { p: "Who may verify your work independently?", o: ["The person who reviewed and coached it", "An independent person with no conflict of interest", "Any friend"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Final challenge dossier: BlueDune Cleaning",
      scenario: "You are given a practice version of the final challenge. BlueDune Cleaning is a fictional cleaning company with five cleaners. Customers currently book by phone, and the office writes jobs in a paper diary. Double bookings happen, and cleaners often do not know their jobs for the day. Choose a small but complete solution, describe how you would build it and handle a surprise change, then prepare to defend it. This dossier is your evidence pack.",
      cols: ["Requirement", "Detail"],
      rows: [["Customers", "Want to request a two-hour cleaning slot online and get a confirmation."], ["Cleaners", "Should see only their own jobs for the day."], ["Owner", "Should see all jobs and a weekly total of hours."], ["Limits", "Four hours, simple tools, no online payments in this version."], ["Surprise change", "The owner asks: add a cancellation rule. Free up to 24 hours before the job; after that a 50% fee applies."]],
      tasks: ["Write the problem in one sentence, list your assumptions and write a definition of done with three to five checkable items.", "Describe your smallest complete solution: the information you would store (tables and columns), the steps a booking goes through and how double bookings are prevented.", "Explain how each person (customer, cleaner, owner) sees only what they should, and where that is enforced.", "Describe how you handled the cancellation change: impact, what you built now, what you postponed and why.", "Write short honest answers to two questions: 'What would break first as the business grows?' and 'How did you test your work?'."],
      hints: ["Keep the first version small: a booking table, a status and a check for the same cleaner at the same time.", "Remember that hiding information on screen is not enough; the system itself must refuse.", "It is fine to postpone automatic fee charging, as long as you say so and explain how you would do it."],
      rubric: ["The problem, assumptions and definition of done are clear and checkable.", "The solution is small, complete and prevents double bookings.", "Visibility rules are stated and enforced by the system, not just the screen.", "The change is handled calmly with an explained trade-off.", "The answers about limits and testing are honest and specific."],
      deliverable: "A dossier of about 300 to 400 words covering the problem, assumptions, definition of done, solution, visibility rules, the handling of the cancellation change and the two defence answers."
    }
  }
};
