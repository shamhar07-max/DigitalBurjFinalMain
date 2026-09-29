// DB-01 Product Discovery & Validation — for people who have never run a project.
module.exports = {
  "DB-01": {
    outcome: "Take a fuzzy business problem, talk to the right people, prove the problem is real and write a clear recommendation: build it, reshape it, or stop.",
    units: [
      {
        t: "What discovery is and why projects fail without it",
        goal: "Explain why we investigate a problem before building anything, and name the three questions discovery answers.",
        body: [
          "Most failed projects did not fail because the builders were careless. They failed because they built the wrong thing. Somebody had an idea, everyone got excited, money was spent, and only at the end did people discover that the customers did not care or that the real problem was somewhere else. Discovery is the short, cheap investigation done before building, so that nobody wastes months on the wrong answer.",
          "Discovery answers three plain questions. First: what is the real problem, and who has it? Second: is it big enough to matter, meaning does it happen often and cost real time or money? Third: what is the smallest useful step we could take to fix it? Notice that none of these questions is about technology. Discovery is mostly listening, watching and thinking.",
          "A common trap is starting with a solution. 'We need an app.' 'We need a chatbot.' A solution is an answer, and you cannot judge an answer until you understand the question. A good discovery person keeps asking why until the true problem appears. 'We need an app' becomes 'customers cannot see their delivery status', which becomes 'they phone us six times a day', which becomes 'our staff lose two hours daily answering the same question'. Now you know what to fix and how you will measure success.",
          "Discovery also protects people's trust. Saying 'we studied this and the best move is to stop' is a success, not a failure, because it saves the money for something better."
        ],
        example: "A furniture shop owner says, 'I need a mobile app.' A discovery conversation finds that customers really only want to know when their sofa will arrive. The shop sends a simple text message on delivery day. The problem is solved in a week for a few dollars, and the app is never built. The owner is delighted.",
        steps: [
          "Write the idea down exactly as it was first said, so you can compare it later.",
          "Ask 'why do you want that?' at least three times to reach the real problem.",
          "List who has the problem and how often it happens.",
          "Note what it costs today in time, money or lost customers.",
          "Only then think about possible solutions, starting with the smallest."
        ],
        mistakes: [
          "Starting from a favourite solution such as an app or a website.",
          "Asking only people who already agree with the idea.",
          "Skipping discovery because the project 'is obviously needed'."
        ],
        terms: [["Discovery", "The early investigation that finds out what problem is real before anything is built."], ["Stakeholder", "Anyone who is affected by the problem or the solution, or has a say in it."], ["Problem statement", "One or two clear sentences describing who has what problem and what it costs."], ["Solution", "A proposed way of fixing the problem."]],
        tryit: "Think of an idea you or your workplace once wanted ('we need a new system'). Ask 'why?' three times and write each answer. Notice how the real problem is usually different from the first idea.",
        pts: ["Discovery finds the right problem before money is spent.", "Start from the problem, never from a favourite solution.", "A clear 'stop' is also a good result."],
        qs: [
          { p: "What is the main purpose of discovery?", o: ["To design the logo", "To find the real problem before building anything", "To write the final report"], a: 1 },
          { p: "A manager says: 'We need a chatbot.' What should you do first?", o: ["Start building the chatbot", "Ask why, to find the real problem behind the request", "Buy the cheapest chatbot"], a: 1 }
        ]
      },
      {
        t: "Talking to people: how to run a good interview",
        goal: "Ask questions that reveal what people really do, and avoid questions that simply make them agree with you.",
        body: [
          "An interview is a friendly, structured conversation whose purpose is to learn, not to sell. You are like a detective who is curious about how the work really happens. The person you interview is the expert on their own day. Your job is to help them describe it in detail.",
          "The most powerful rule is to ask about the past, not the future. 'Would you use an app that fixes this?' is a poor question, because people are polite and will say yes. 'Tell me about the last time an order was lost' is a strong question, because it produces a real story with real details: what happened, who was involved, what it cost. What people did is far more reliable than what they say they might do.",
          "Avoid leading questions. 'Don't you think our replies are too slow?' pushes the person towards your answer. A neutral version is 'How do customers usually find out about their order?' Use open questions that start with what, how, when and tell me about. Then use follow-ups: 'What happened next?' 'How did that feel?' 'How often does that happen?'",
          "Take notes of exact words, and keep facts separate from your opinions. Write down what they said, then in another column what you think it means. After the interview, thank them and look for patterns across several people. One story is a story. Five similar stories are evidence."
        ],
        example: "A recruiter wants to improve her interview scheduling. Instead of asking 'Would a booking tool help?', she asks the office manager, 'Walk me through the last time you arranged an interview.' The manager describes seven emails, two phone calls, and a double booking that embarrassed the company. Those specific details show exactly where the process breaks.",
        steps: [
          "Prepare five or six open questions, mostly about the last time something happened.",
          "Begin by explaining that you are here to learn and that there are no wrong answers.",
          "Ask, then stay quiet. Let the person fill silences with more detail.",
          "Follow up with 'what happened next?', 'why?' and 'how often?'.",
          "Write down the exact words and mark facts separately from your interpretations.",
          "Thank the person and summarise back what you heard to check you understood."
        ],
        mistakes: [
          "Talking more than the other person.",
          "Asking 'would you like...' questions that only collect polite yeses.",
          "Mixing what people said with what you assumed."
        ],
        terms: [["Open question", "A question that cannot be answered with just yes or no."], ["Leading question", "A question that pushes the person towards a particular answer."], ["Follow-up", "A short question that digs deeper into what was just said."], ["Evidence", "Facts and stories that back up a claim."]],
        tryit: "Interview a friend or colleague about the last time they were frustrated by a process at work. Use only open questions and at least three follow-ups. Write down two exact phrases they used.",
        pts: ["Ask about specific past events, not opinions about the future.", "Use open, neutral questions and follow-ups.", "Record the person's exact words, then interpret separately."],
        qs: [
          { p: "Which is the best interview question?", o: ["Would you use an app that fixes this?", "Tell me about the last time an order got lost.", "Don't you think this is far too slow?"], a: 1 },
          { p: "Why do we write down the person's exact words?", o: ["Because they are more reliable than our memory or opinions", "To make the notes longer", "So we can quote them in adverts without asking"], a: 0 }
        ]
      },
      {
        t: "Drawing the journey: where time, money and trust leak",
        goal: "Map how a customer or worker gets from start to finish, and mark the painful points.",
        body: [
          "A journey map is a simple picture of the steps a person goes through to get something done, from the moment they need it until they are finished. It can be a row of boxes on a page. It looks basic, but it is one of the best tools in discovery because it makes hidden effort visible.",
          "Draw the journey from the person's side, not the company's side. For a customer ordering flowers, the steps may be: notice an occasion, choose flowers, send an enquiry, wait for a price, confirm, pay, wait for delivery, check the flowers arrived. Under each step write what the person does, thinks and feels. Then mark the pain points: places where they wait, repeat themselves, get confused or lose confidence.",
          "Pain points usually fall into three types. Time leaks are waiting and repeating work. Money leaks are mistakes, refunds and lost sales. Trust leaks are moments when the person feels unsure, such as not knowing whether the order was received. Fixing a trust leak often costs very little and improves everything.",
          "Draw two maps if you can: how it works today and how you imagine it could work. The difference between them shows what really needs to change, and it gives everybody a shared picture to talk about instead of arguing over opinions."
        ],
        example: "A small clinic mapped a patient's journey to book a check-up: search online, call, wait on hold, book, receive a paper reminder, arrive, fill in a form, wait, see the doctor. The pain points were the phone hold (time), forgotten appointments (money) and not knowing which documents to bring (trust). Sending one text message with a reminder and a checklist fixed two of the three.",
        steps: [
          "Choose one person and one goal (for example a customer buying flowers).",
          "List the steps from the first need to the final result, in order.",
          "Under each step add what they do, think and feel.",
          "Mark each pain point and label it time, money or trust.",
          "Circle the one or two worst leaks and estimate how often they occur."
        ],
        mistakes: [
          "Drawing the company's internal process instead of the person's experience.",
          "Making the map too detailed and losing the big picture.",
          "Guessing without checking with real people."
        ],
        terms: [["Journey map", "A step-by-step picture of what a person goes through to reach a goal."], ["Pain point", "A step where the person is slowed, confused or frustrated."], ["Trust leak", "A moment when the person becomes unsure whether things are going well."], ["Touchpoint", "Any moment where the person meets the business."]],
        tryit: "Map your own morning journey to get a coffee or breakfast in six to eight steps. Mark one time leak, one money leak and one trust leak. Notice how a few small changes could save effort.",
        pts: ["A journey map shows the real steps from the person's point of view.", "Pain points come in three types: time, money and trust.", "Fixing trust leaks is often cheap and powerful."],
        qs: [
          { p: "From whose point of view should a journey map be drawn?", o: ["The manager's", "The person going through the steps", "The software developer's"], a: 1 },
          { p: "A customer is never told whether their order was received. What type of pain point is this?", o: ["Trust leak", "Money leak", "It is not a problem"], a: 0 }
        ]
      },
      {
        t: "Proving a problem is real and worth solving",
        goal: "Use simple evidence to check whether a problem is frequent, costly and already being worked around.",
        body: [
          "Hearing a problem once is not proof. People complain about many things that matter little. Before recommending action, we check three things. Frequency: how often does it happen? Cost: how much time, money or trust is lost each time? Workarounds: are people already spending effort to get around the problem? A problem that happens often, costs a lot and already has clumsy workarounds is very likely real.",
          "Workarounds are the best signal of all. If staff keep a private spreadsheet to track something the official system does not, or customers phone three times because they cannot find information, the pain is real enough that people are paying to avoid it with their own time. A problem nobody works around is often not painful enough to solve.",
          "Gather simple numbers. Count how many enquiries arrive each week. Time how long a task takes, three times, and take the average. Estimate the cost: a task that takes twenty minutes, twelve times a week, at a wage of ten dollars an hour costs about forty dollars weekly. Rough numbers are fine, as long as you say how you found them and stay honest about uncertainty.",
          "Be careful of confirmation bias. That is our habit of noticing evidence that supports what we already believe. Deliberately look for evidence against your idea too. If several people you interview do not see the problem, write that down. A fair investigator is glad to be proven wrong early."
        ],
        example: "A hardware shop owner says customers complain that stock is often unavailable. The investigator checks the last month: 40 customers asked for an out-of-stock item, and 14 of them left without buying. The average purchase is 30 dollars, so about 420 dollars of sales were lost. Staff also keep a handwritten 'missing items' list on the wall, a clear workaround. The problem is frequent, costly and already worked around, so it is real.",
        steps: [
          "State the problem in one sentence.",
          "Count or estimate how often it happens over a typical week or month.",
          "Estimate the cost each time (time, money, trust) and multiply by frequency.",
          "Look for workarounds such as private lists, extra phone calls or manual checks.",
          "Ask at least one person who might disagree, and write down what they say."
        ],
        mistakes: [
          "Treating one loud complaint as proof.",
          "Using exact-looking numbers you invented.",
          "Ignoring evidence that the problem is smaller than hoped."
        ],
        terms: [["Frequency", "How often something happens."], ["Workaround", "A clumsy extra effort people use to get around a problem."], ["Confirmation bias", "The habit of noticing only evidence that supports what we already believe."], ["Estimate", "A sensible rough number with a note on how it was found."]],
        tryit: "Choose a small problem at work or home. Estimate how often it happens and what it costs each time. Multiply to get a weekly cost. Name one workaround people use.",
        pts: ["A real problem is frequent, costly and already worked around.", "Use simple numbers and be honest about how you got them.", "Look for evidence against your idea as well as for it."],
        qs: [
          { p: "Which piece of evidence best shows a problem is real?", o: ["Everyone agreed it sounds useful", "People already spend time or money working around it", "A competitor has a similar product"], a: 1 },
          { p: "What is confirmation bias?", o: ["Noticing mostly the evidence that agrees with what we already think", "Asking too many questions", "Counting numbers twice"], a: 0 }
        ]
      },
      {
        t: "Setting goals you can measure",
        goal: "Turn a wish such as 'make it better' into a number with a starting point, a target and a date.",
        body: [
          "'Improve customer service' sounds fine, but nobody can tell whether it has been achieved. A measurable goal can be checked by anyone. It has three parts: a baseline (where we are now), a target (where we want to be) and a date (by when). For example, 'reduce the time to reply to a customer from two days to four hours by June'.",
          "Good measures are simple, honest and influenced by the work. Time to reply, number of mistakes per month, number of repeat phone calls and percentage of orders delivered on time are all easy to understand. Avoid vanity numbers that look impressive but change nothing, such as 'page views'. Ask, 'If this number improves, will the business really be better?'",
          "Decide how and when you will measure before you start. Who will collect the number? From what source? How often? If you do not agree this in advance you will argue later about whether the goal was reached. Measure the baseline first, so you know your starting point.",
          "Also state the limit or trade-off. Answering faster is good, but not if quality falls. A pair of measures, such as speed and customer satisfaction, keeps you honest. Finally, keep the number of goals small. Three clear goals beat ten vague ones."
        ],
        example: "A laundry service wanted to 'be more reliable'. After discovery they set: 'Deliver 95 percent of orders on the day promised (today it is 78 percent) by the end of September, measured weekly from the delivery log.' Everyone now knew what winning looked like, and the weekly number showed progress.",
        steps: [
          "Write the goal as a wish in plain words.",
          "Choose one number that shows whether the wish is coming true.",
          "Measure the baseline today, even roughly.",
          "Set a realistic target and a date.",
          "Decide who will measure it, from what source and how often."
        ],
        mistakes: [
          "Setting goals with no number, such as 'be better'.",
          "Choosing a number that is easy to raise but does not help the business.",
          "Forgetting to measure the starting point."
        ],
        terms: [["Baseline", "The measurement at the start, before any change."], ["Target", "The number you want to reach."], ["Metric", "A number used to track progress."], ["Vanity number", "A figure that looks good but does not show real improvement."]],
        tryit: "Take a vague goal from your work ('faster', 'happier customers'). Rewrite it with a baseline, a target, a date and the way you will measure it.",
        pts: ["A measurable goal has a baseline, a target and a date.", "Choose numbers that show real improvement.", "Agree in advance who measures and how."],
        qs: [
          { p: "Which is a measurable goal?", o: ["Make quoting better", "Cut quote turnaround from 2 days to 4 hours by June", "Improve customer happiness"], a: 1 },
          { p: "What is a baseline?", o: ["The target you hope to reach", "The measurement at the start before any change", "The final report"], a: 1 }
        ]
      },
      {
        t: "Build, reshape or stop: writing your recommendation",
        goal: "Weigh the evidence and write a short, clear recommendation that leaders can act on.",
        body: [
          "Discovery ends with a decision, and there are three honest options. Build means the problem is real, the goal is clear and a small first step is safe to try. Reshape means the problem is real but the proposed solution is wrong or too big, so we change the plan. Stop means the problem is rare, cheap, or nobody owns it, so spending money is not worth it.",
          "To choose, compare four things: value (how much is the problem worth solving?), effort (how much work and money?), risk (what could go wrong?) and readiness (does someone own it and are people willing to change how they work?). A simple table with scores from one to five for each helps the conversation, though the reasons matter more than the numbers.",
          "Write the recommendation on one page in plain language. Start with the answer: 'We recommend reshaping the project.' Then give the problem in one sentence, the evidence (two or three facts with numbers and quotes), the proposed first step, the goal with its measure, the main risks and what you need from the reader. A busy leader should understand your advice in one minute.",
          "Be brave and fair. If the evidence says stop, say so kindly and clearly, and describe what would change your mind. Leaders trust advisers who are willing to say no when the evidence supports it."
        ],
        example: "A shop wanted a full online store. Discovery showed that 80 percent of sales came from twenty regular customers who order by phone. The advisers recommended reshaping: build a simple order form and a weekly text reminder for those twenty customers first (two weeks of work) and revisit the store after six months of results. The owner saved months of effort and money.",
        steps: [
          "Collect the evidence: problem, frequency, cost, workarounds and the goal.",
          "Score value, effort, risk and readiness from 1 to 5 and write a reason for each.",
          "Choose build, reshape or stop.",
          "Write the one-page recommendation with the answer first.",
          "List what would change your mind and the next step for the reader."
        ],
        mistakes: [
          "Hiding the answer at the bottom of a long document.",
          "Recommending 'build' because it is exciting rather than because the evidence supports it.",
          "Writing without numbers or quotes to back up the claims."
        ],
        terms: [["Recommendation", "Your clear advice on what to do next, with reasons."], ["Risk", "Something that could go wrong and how likely and serious it is."], ["Readiness", "Whether people and resources are in place to make a change work."], ["Trade-off", "Giving up one good thing to gain another."]],
        tryit: "Take an idea from your workplace and write a five-line recommendation: the answer (build, reshape or stop), the problem, two pieces of evidence, the first step and one risk.",
        pts: ["The three honest answers are build, reshape or stop.", "Compare value, effort, risk and readiness.", "Put the answer first and back it with numbers and quotes."],
        qs: [
          { p: "The problem is real, but the requested feature would not fix it. What is the best recommendation?", o: ["Build it anyway", "Reshape the solution", "Stop and never discuss it again"], a: 1 },
          { p: "Where should the answer be in a one-page recommendation?", o: ["At the very end", "At the start", "It should be left out"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Advise Al Noor Trading: build, reshape or stop?",
      scenario: "Al Noor Trading sells building materials. Customers ask for quotes through WhatsApp, email and phone calls, and the sales team re-types the details every time. The owner wants a 'full customer portal' costing a large sum. You have four interview notes and some numbers. Your job is to say whether the portal is the right move, or whether something smaller would work better.",
      cols: ["Source", "What was said or measured"],
      rows: [["Sales lead", "I re-type the same quote three times: once from WhatsApp, once into the price sheet, once into the invoice."], ["Owner", "We lost two big deals last month. Both customers said we replied too slowly."], ["Accountant", "Every Friday I chase sales for the figures. It takes about three hours."], ["Customer (phone call)", "I asked on WhatsApp and never heard back, so I went to another shop."], ["Numbers", "About 30 quote requests a week; average reply time 2 days; 6 of 30 lost to slow replies."]],
      tasks: ["List the two biggest pain points and back each with a quote or number from the notes.", "Draw the customer's journey from 'needs a quote' to 'accepts the quote' in six to eight steps and mark one time leak and one trust leak.", "Write one measurable goal with a baseline, a target and a date.", "Write your recommendation (build, reshape or stop) in about 120 words, answer first, with one risk."],
      hints: ["Count the cost: 6 lost deals in 30 requests is a fifth of all quotes.", "Ask whether a portal is really needed, or only a single place to receive requests and reply faster.", "Remember to say what would change your mind."],
      rubric: ["Pain points are supported by quotes or numbers, not opinions.", "The journey is from the customer's side and shows time and trust leaks.", "The goal has a baseline, target, date and measure.", "The recommendation puts the answer first and gives a fair risk."],
      deliverable: "A one-page recommendation containing the two pain points with evidence, the journey summary, your measurable goal and the build / reshape / stop advice."
    }
  }
};
