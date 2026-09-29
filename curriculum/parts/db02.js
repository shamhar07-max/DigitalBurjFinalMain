// DB-02 Interface Design & Accessibility — for non-designers.
module.exports = {
  "DB-02": {
    outcome: "Design simple, clear and accessible screens for a website or app, test them with real people and explain your choices in plain words.",
    units: [
      {
        t: "Design starts with people, not with pictures",
        goal: "Describe who you are designing for and what they are trying to do before drawing anything.",
        body: [
          "Many people think design means making things look pretty. In practice, good design means making things easy to use. A screen is well designed when a person can finish what they came to do without help, without confusion and without stress. Looks matter, but they come second to clarity.",
          "Start by describing the person. Not a huge crowd, but one realistic example: 'Mrs Hassan, 58, owns a bakery, uses her phone for everything, does not like reading long text.' This description is sometimes called a persona. Then describe the job they want done: 'order flour from the supplier in under two minutes'. Every design decision can now be tested against one question: does this help Mrs Hassan finish her job?",
          "Designers use a few simple principles. Clarity: it is obvious what this screen is for. Simplicity: remove anything that does not help the goal. Consistency: similar things look and behave the same everywhere, so people learn once. Feedback: the screen tells you what is happening ('Order sent'). Forgiveness: people can undo mistakes.",
          "Remember that you are not your user. What seems obvious to you, because you know the system, may be confusing for someone seeing it for the first time. The only reliable way to know is to watch real people try."
        ],
        example: "A ticket-selling website put six buttons on the home page, all the same size, all shouting for attention. Visitors could not tell which was the main one. Designers asked what most visitors wanted, which was to buy tickets, and made that one button large and coloured while shrinking the rest. Sales rose because people no longer hesitated.",
        steps: [
          "Describe one realistic person in three lines: who they are, how comfortable they are with technology and what they want.",
          "Write the main job as one sentence starting with a verb.",
          "List every element you think the screen needs. Cross out anything that does not help the job.",
          "Decide the one main action and make it stand out.",
          "Check the design against clarity, simplicity, consistency, feedback and forgiveness."
        ],
        mistakes: [
          "Designing for yourself instead of for the real person.",
          "Adding features 'just in case'. Every extra thing makes the main thing harder to find.",
          "Making everything equally loud so nothing stands out."
        ],
        terms: [["Persona", "A realistic example person used to keep design decisions honest."], ["Interface", "The screens and controls a person uses to talk to a system."], ["Consistency", "Similar things looking and behaving the same way everywhere."], ["Feedback", "A visible response that tells the person what just happened."]],
        tryit: "Choose a website you use often. Write the main job people come to do, then count how many things on the home page do NOT help that job. Circle the three you would remove first.",
        pts: ["Good design means easy to use, not just pretty.", "Design for one realistic person and their main job.", "Clarity, simplicity, consistency, feedback and forgiveness are the basic principles."],
        qs: [
          { p: "What is the first thing to do before you draw a screen?", o: ["Choose the colours", "Understand who will use it and what they want to do", "Write the code"], a: 1 },
          { p: "A button says 'Order sent' after you press it. Which principle is this?", o: ["Feedback", "Decoration", "Speed"], a: 0 }
        ]
      },
      {
        t: "Organising information: menus, flows and pathways",
        goal: "Group content the way people think and draw the path a person follows to finish one task.",
        body: [
          "Information architecture sounds grand, but it only means arranging things so people can find them. Imagine a supermarket. Milk is near the cheese, not next to the batteries. The shop is organised the way shoppers think. A website should be the same. Group content by what people are looking for, not by how your company is organised inside.",
          "A useful exercise is card sorting. Write each page or item on a small card, then ask a few people to sort them into groups that make sense to them and name each group. You will often be surprised. What the company calls 'Solutions' the customer may call 'What you can do for me'. Use their words.",
          "Keep main menus short: five to seven items is plenty. People remember short lists. Put the most important choices first and use clear, ordinary words rather than clever names. 'Contact' beats 'Let us connect'.",
          "Next, draw the flow: the path a person takes to complete one task, screen by screen, from start to finish. For 'book a table', it may be: home, choose date, choose number of guests, enter details, confirm, see confirmation. Include the unhappy paths as well: what if the date is full, or the phone number is missing? Good designers plan the mistakes and empty situations as carefully as the perfect path."
        ],
        example: "A yoga studio's site had menus named 'Journey', 'Practice' and 'Community'. Visitors could not find the timetable. After card sorting with ten customers, the studio renamed the menu to 'Timetable', 'Prices', 'Teachers' and 'Contact'. Booking questions to the front desk dropped by a third in a month.",
        steps: [
          "List all the pages or pieces of content you have on separate cards.",
          "Ask three to five people to sort them into groups and name the groups.",
          "Turn the most common groups into a menu of five to seven clear items.",
          "Choose one important task and draw its flow, one box per screen.",
          "Add a side path for each thing that could go wrong (nothing found, error, empty list)."
        ],
        mistakes: [
          "Organising the site like the company's internal departments.",
          "Using clever labels instead of plain words.",
          "Drawing only the perfect path and forgetting errors and empty states."
        ],
        terms: [["Information architecture", "The way content is grouped and labelled so people can find it."], ["Card sorting", "Asking people to group cards to discover how they think about content."], ["User flow", "The path a person follows through screens to complete a task."], ["Empty state", "What the screen shows when there is nothing to display yet."]],
        tryit: "Write ten things a small bakery website should show on cards. Ask two people to group them and name the groups. Compare their groups with your own.",
        pts: ["Organise content by how people think, not how the company is organised.", "Keep menus short and use plain words.", "Draw the flow of one task, including problems and empty states."],
        qs: [
          { p: "Why do designers use card sorting?", o: ["To discover how real people group information", "To choose colours", "To print the final design"], a: 0 },
          { p: "What should a task flow include besides the happy path?", o: ["Nothing else", "Errors and empty states", "Only advertising"], a: 1 }
        ]
      },
      {
        t: "Sketching screens with wireframes",
        goal: "Draw simple black-and-white layouts to test structure before spending time on looks.",
        body: [
          "A wireframe is a rough drawing of a screen that shows what goes where, using boxes, lines and plain words. It has no colours, no photos and no fancy fonts. This is deliberate. When a design looks finished, people comment on the colours. When it is a sketch, they comment on the structure, which is exactly what you want to test.",
          "Start on paper. Draw a rectangle for the screen and place blocks: a title, an image, some text, a button. Ask yourself what a person should see first, second and third. The eye is drawn to size, contrast and position, so put the most important thing large and near the top left (for languages read left to right) or top right (for languages read right to left).",
          "Use grouping and space to show what belongs together. Related items sit close; unrelated items have breathing room. Align things along clear lines. A page that is tidy and evenly spaced feels calm, and calm feels trustworthy.",
          "Design for small screens first. Most people use phones. On a phone there is no room for extras, so you are forced to decide what really matters. Once it works on a phone, expanding to a wider screen is easy. Test the wireframe with one person before you improve it, by asking, 'Where would you tap to do this?'"
        ],
        example: "A florist drew three wireframes for the top of her online shop on paper in ten minutes. Version A had a giant picture and a small button. Version B had a search box first. Version C had three big category tiles. She showed each to five friends and asked, 'How would you buy a birthday bouquet?' Version C won easily. She had not touched a colour yet.",
        steps: [
          "Draw a phone-sized rectangle on paper.",
          "Place blocks for the essential content only, and label each with plain words.",
          "Rank them: what should the eye see first, second, third?",
          "Group related items and leave space between groups.",
          "Show it to one person, ask them to find the main action and note where they hesitate."
        ],
        mistakes: [
          "Polishing colours before the structure works.",
          "Squeezing too much onto one screen.",
          "Never showing the sketch to anyone until it is finished."
        ],
        terms: [["Wireframe", "A rough black-and-white drawing of where things sit on a screen."], ["Hierarchy", "The order of importance shown by size, position and contrast."], ["Layout", "How elements are arranged on the screen."], ["Mobile first", "Designing for small phone screens before larger ones."]],
        tryit: "Sketch a phone screen for 'check today's opening hours of a shop'. Use only boxes and words. Show it to someone and see how fast they find the hours.",
        pts: ["Wireframes let you test structure without distracting looks.", "Size, contrast and position show what matters most.", "Design for phones first, and test early with one person."],
        qs: [
          { p: "Why are wireframes usually black and white?", o: ["Because colour printing is expensive", "So feedback focuses on structure, not decoration", "Because colours are not allowed"], a: 1 },
          { p: "What does 'hierarchy' mean in design?", o: ["The order of importance shown by size, position and contrast", "The number of pages", "The colour of the background"], a: 0 }
        ]
      },
      {
        t: "Colour, type and spacing: the visual basics",
        goal: "Make a design look clean and professional using a few simple choices and stay consistent.",
        body: [
          "Once the structure works, you dress it. Three things do most of the work: colour, type (the letters) and space. You do not need talent. You need to make a few decisions and then stick to them.",
          "For colour, pick one main colour that represents the brand, one or two neutral colours (white, grey, near-black) for backgrounds and text, and one accent for the main button. Using the accent only for the most important action guides the eye. Do not use ten colours. Colour must also never be the only way to give information. Red alone for an error does not help a person who cannot tell red from green, so add words or an icon.",
          "For type, choose one or two fonts and keep them. Use size to show importance: a large heading, a medium sub-heading, comfortable body text. Body text should be at least 16 pixels on a screen. Keep lines to a sensible length (about 50 to 75 characters) and leave generous space between lines.",
          "Space is the most underrated tool. Give elements room. Use the same spacing steps everywhere (for example 8, 16, 24 and 32 pixels). A design that feels cramped looks cheap and tiring. A design with generous, consistent space looks confident. A design system, a small written set of these choices, keeps everyone on your team consistent, so screens made by different people still look like one product."
        ],
        example: "A small accountant's page used four fonts, six colours and no spacing rules. It looked chaotic and clients said it seemed unreliable. The redesign used one font, one blue, one orange button colour and spacing in steps of 8. The content did not change at all, yet the enquiry rate went up because the site now looked trustworthy.",
        steps: [
          "Choose one brand colour, two neutrals and one accent for the main action.",
          "Choose one clear font (or two at most) and set sizes for heading, sub-heading and body.",
          "Set body text to at least 16 pixels and keep lines a comfortable length.",
          "Choose spacing steps and use only those.",
          "Write these choices down as a mini design system so anyone can follow them."
        ],
        mistakes: [
          "Using many fonts and colours because they are available.",
          "Using colour alone to mean something.",
          "Squeezing text tightly to fit more on the screen."
        ],
        terms: [["Typeface / font", "The style of the letters."], ["Accent colour", "A strong colour saved for the most important action."], ["Whitespace", "Empty space around items that lets them breathe."], ["Design system", "A written set of colours, type, spacing and reusable parts used consistently."]],
        tryit: "Look at one website you admire. Write down its main colour, accent colour, fonts and the size of its body text. Notice how few choices it uses.",
        pts: ["A few consistent choices beat many varied ones.", "Never rely on colour alone to give information.", "Generous, consistent space makes a design feel professional."],
        qs: [
          { p: "What is the accent colour normally used for?", o: ["The whole background", "The most important action, such as the main button", "Every heading"], a: 1 },
          { p: "A form marks errors only by turning the box red. What is wrong with this?", o: ["Nothing", "Some people cannot tell the colours apart, so it needs words or an icon too", "Red is too bright"], a: 1 }
        ]
      },
      {
        t: "Making it work for everyone: accessibility",
        goal: "Explain what accessibility means and check a design against the most important rules.",
        body: [
          "Accessibility means that people with different abilities can use what you make. This includes people who are blind or have low vision, people who are deaf, people who cannot use a mouse, people with dyslexia or attention difficulties, older people, and anyone using a phone in bright sunshine with one hand. Many people have a temporary or situational difficulty at some point, such as a broken arm or a noisy train.",
          "Accessible design helps everybody and, in many countries, it is also a legal expectation. The international guide is called WCAG (Web Content Accessibility Guidelines). Four ideas sit at its heart: content should be perceivable (people can see or hear it), operable (people can use it with different devices, including a keyboard), understandable (the language and behaviour are clear) and robust (it works with helper tools such as screen readers).",
          "Some practical rules go a long way. Text needs enough contrast with its background, at least a ratio of 4.5 to 1 for normal text, so grey text on white often fails. Every image that carries meaning needs a short text description (alt text) for screen readers. Every form field needs a proper label, not only a faint hint inside the box. Everything you can click must also be reachable and usable with the Tab and Enter keys, with a clearly visible highlight showing where you are. Videos need captions.",
          "Test with simple methods. Try using your design with only the keyboard. Zoom the page to 200 percent. Use a free contrast checker. Turn on a screen reader for two minutes. You will find real problems fast, and fixing them improves the design for everybody."
        ],
        example: "A clinic's booking form used pale grey placeholder text as the only label. A visitor with low vision could not read it, and a screen reader announced only 'edit text'. The clinic added proper labels above each box, darkened the text, and made the button reachable by keyboard. Booking completion went up for all patients, not just those with disabilities.",
        steps: [
          "Check text contrast with a free checker: normal text needs at least 4.5 to 1.",
          "Add a short description (alt text) to every meaningful image.",
          "Give every form field a visible label placed above or beside it.",
          "Try the whole task using only the Tab, Enter and Space keys, and make sure the focus highlight is visible.",
          "Zoom to 200 percent and test again. Add captions to any video."
        ],
        mistakes: [
          "Using a faint placeholder inside a box instead of a real label.",
          "Removing the focus outline because it 'looks ugly'.",
          "Assuming accessibility is only for a small group of users."
        ],
        terms: [["Accessibility", "Making sure people with different abilities can use a product."], ["Alt text", "A short written description of an image for people who cannot see it."], ["Contrast ratio", "A measure of how clearly text stands out from its background."], ["Screen reader", "Software that reads out what is on the screen for people who cannot see it."]],
        tryit: "Open any website and put your mouse aside. Use only the Tab key to reach the main button. Note if you always know where you are, and where the focus becomes invisible.",
        pts: ["Accessibility helps everyone, not only people with disabilities.", "Contrast, labels, alt text, keyboard use and captions are the essentials.", "Test with the keyboard, zoom and a contrast checker."],
        qs: [
          { p: "What is the minimum contrast ratio for normal body text?", o: ["2 to 1", "4.5 to 1", "10 to 1"], a: 1 },
          { p: "Why should every form field have a visible label?", o: ["It looks neater", "People and screen readers can tell what to type in each box", "It makes the page load faster"], a: 1 }
        ]
      },
      {
        t: "Prototypes and testing with real people",
        goal: "Turn sketches into a clickable prototype and learn from watching five people use it.",
        body: [
          "A prototype is a pretend version of the product that people can click through, even though nothing real is happening behind it. It can be a series of paper drawings, or images linked together in a free tool. Its purpose is to find problems while they are still cheap to fix. Changing a drawing takes minutes; changing a finished product takes weeks.",
          "Usability testing means watching real people try to do real tasks with your prototype. Five people are enough to reveal most big problems. Give each person a task ('You want to book a table for two on Friday'), and then stay quiet. Do not help, do not explain. The moments where they hesitate, click the wrong thing or say 'hmm' are gold: each one is a design problem, not a user mistake.",
          "Ask people to think aloud, saying what they see and expect. Record what they do, not only what they say. Afterwards, group the problems and rate them: which stopped the person completely (serious), which slowed them down (medium), and which were minor? Fix the serious ones first.",
          "Testing is not a one-time event. Design, test, fix and test again. Each round makes the product simpler. Also be kind to the people testing: you are testing the design, not them. Thank them and tell them that any difficulty was helpful."
        ],
        example: "A small charity tested its donation page prototype with five volunteers. Four of the five could not find the 'monthly' option because it was hidden under a small link. The team moved it next to the amount buttons and tested again. All five found it. A change that took twenty minutes probably saved thousands in lost donations.",
        steps: [
          "Link your sketches or screens so a person can tap through the main task.",
          "Write three realistic tasks in plain words with no hints about where to click.",
          "Invite five people who resemble your real users.",
          "Watch quietly, note hesitations and mistakes, and ask them to think aloud.",
          "List the problems, rate each as serious, medium or minor, fix the serious ones and test again."
        ],
        mistakes: [
          "Helping the person during the test, which hides the real problem.",
          "Testing only with colleagues who already know the product.",
          "Blaming the user instead of fixing the design."
        ],
        terms: [["Prototype", "A pretend clickable version used to test ideas early."], ["Usability testing", "Watching real people try to complete tasks with your design."], ["Think aloud", "Asking people to say out loud what they see and expect."], ["Severity", "How badly a problem affects the person's ability to finish the task."]],
        tryit: "Ask someone who has never seen a website you know to find one piece of information on it, while you stay silent and time them. Write down where they hesitated.",
        pts: ["Prototypes find problems while they are cheap to fix.", "Five test users reveal most major problems.", "Watch what people do, stay quiet and fix the serious problems first."],
        qs: [
          { p: "During a usability test, a person cannot find the button. What should you do?", o: ["Point it out immediately", "Stay quiet, note the problem and later fix the design", "Tell them they are wrong"], a: 1 },
          { p: "How many people are usually enough to find most big design problems in a round of testing?", o: ["About five", "Over five hundred", "Only one"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Review and fix the clinic's booking form",
      scenario: "A dental clinic's online booking form has many complaints. Patients say it is hard to read, some elderly patients cannot complete it, and a blind patient's screen reader says only 'edit text' for every box. Below is the audit the clinic collected. You are the designer asked to explain what is wrong, what to fix first and how to make sure the fixes really work.",
      cols: ["Part of the form", "Problem found"],
      rows: [["Name, email, phone boxes", "Only a faint grey hint inside each box, no separate label. Screen readers announce 'edit text'."], ["Helper text", "Light grey (#999999) on white. Contrast ratio 2.8 to 1."], ["'Book now' button", "Cannot be reached with the Tab key."], ["Error message", "The box turns red but no words explain the problem."], ["Layout on phone", "Two columns squeezed onto a small screen; text is 11 pixels."]],
      tasks: ["Rank the five problems by how badly they stop people from booking (1 = worst) and explain your order in one sentence each.", "Write a concrete fix for each problem using the rules from lessons 4 and 5.", "Describe how you would test the fixed form with five real people, including the three tasks you would give them.", "List two things the clinic should measure to learn whether the redesign helped."],
      hints: ["Anything that makes booking impossible ranks above anything that only makes it unpleasant.", "A visible label, darker text and a keyboard-reachable button are all quick fixes.", "Good measures are the share of people who finish booking and the number of calls to the front desk."],
      rubric: ["The ranking is reasoned and puts blocking problems first.", "Each fix is specific and matches an accessibility rule.", "The test plan has realistic tasks with no hints.", "The measures relate to real outcomes, not just looks."],
      deliverable: "A prioritised fix list with reasons, a five-person test plan with three tasks, and two success measures."
    }
  }
};
