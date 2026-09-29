// PC-PR01 Procurement — buying the right thing, at the right price, from the right supplier.
module.exports = {
  "PC-PR01": {
    outcome: "Run a fair and safe buying process: define needs, find and compare suppliers, negotiate, order, receive goods and manage supplier relationships.",
    units: [
      {
        t: "What procurement is and why it matters",
        goal: "Explain procurement, its goals beyond low price and the difference between buying and procuring.",
        body: [
          "Procurement is the whole process of getting the goods and services an organisation needs from outside suppliers. Buying is one step, placing the order. Procurement includes everything around it: understanding what is needed, finding suppliers, comparing offers, agreeing terms, ordering, receiving, paying and reviewing how the supplier performed.",
          "Why does it matter? For many organisations, more than half of every dollar earned is spent on outside purchases. A small saving or a small mistake repeated many times has a large effect. Good procurement lowers cost, but it also protects quality, on-time delivery, safety and reputation.",
          "Cheapest is not always best. The right measure is total cost, which includes the price, delivery, installation, maintenance, training, waste, and the cost of problems if the supplier fails. A cheap machine that breaks every month is more expensive than a fair-priced one that works for years. Procurement people often speak of value for money rather than lowest price.",
          "Procurement also protects the organisation from risk and unfairness. Clear rules stop fraud, favouritism and secret deals. Written records let auditors and managers see why a supplier was chosen. And ethical buying, such as avoiding suppliers who use child labour or damage the environment, protects the organisation's good name."
        ],
        example: "A school needed 200 chairs. Supplier A offered 25 dollars each, delivered in eight weeks; Supplier B offered 29 dollars each, delivered in two weeks with a five-year guarantee. The cheaper chairs would have arrived after term began and had a one-year guarantee. The buyer calculated total cost and risk and chose Supplier B, because the school could use the chairs from day one and would not need to replace them.",
        steps: [
          "Write down what is needed and by when.",
          "Consider total cost, not only price.",
          "Consider quality, delivery, service and risk.",
          "Follow the organisation's approval and record rules.",
          "Review supplier performance afterwards."
        ],
        mistakes: [
          "Choosing only on lowest price.",
          "Buying without a written record of why.",
          "Letting one person control the whole process."
        ],
        terms: [["Procurement", "The whole process of getting goods and services from suppliers."], ["Supplier / vendor", "A company that sells goods or services to you."], ["Total cost", "Price plus all other costs over the life of the purchase."], ["Value for money", "The best balance of cost, quality and service."]],
        tryit: "Compare two offers for a printer: 120 dollars with 1-year support and expensive ink, or 160 dollars with 3-year support and cheap ink. Explain what else you would need to know to decide.",
        pts: ["Procurement is the whole process, not just placing an order.", "Judge on total cost and value for money.", "Rules and records protect against fraud and unfairness."],
        qs: [
          { p: "What does 'total cost' include?", o: ["Only the price", "Price plus delivery, maintenance and other costs", "Only the delivery time"], a: 1 },
          { p: "Why keep written records of buying decisions?", o: ["To show why a supplier was chosen", "For decoration", "They are not needed"], a: 0 }
        ]
      },
      {
        t: "Defining what you need",
        goal: "Turn a request into a clear written specification before asking suppliers for offers.",
        body: [
          "Most purchasing problems begin with an unclear need. If you do not know exactly what you want, you cannot compare offers or judge whether you received the right thing. The first job is to describe the need clearly, and to separate what is essential from what is just nice to have.",
          "Talk to the people who will use the item. Ask what problem it solves, how often it is used, where it will be used and what would make it fail. Then write a specification, often called a spec. It states what is needed (size, quantity, quality, standards), when and where it is delivered, any service or training required, and the budget limit. Use measurable words such as '500 sheets per pack, 80 grams' rather than 'good paper'.",
          "Split requirements into must-have and nice-to-have. Must-haves are conditions that every supplier must meet, such as safety approval or delivery by 1 September. Nice-to-haves add value, but you can trade them off. Giving each a weight later makes comparison fair, for example price 40 percent, quality 30 percent, delivery 20 percent and service 10 percent.",
          "Check whether you already have something suitable, whether an existing contract covers it, and whether a smaller or different item would do the job. Get the budget owner's approval before asking suppliers for offers, so you do not waste their time or raise expectations you cannot meet."
        ],
        example: "A clinic asked for 'better chairs for the waiting room'. The buyer met the receptionist and learned that patients were elderly, chairs needed arms and a firm seat, cleaning must be easy and the budget was 3,000 dollars for 20 chairs. The written spec named these points. Suppliers could now quote for the real need, and the clinic could compare their offers fairly.",
        steps: [
          "Talk to the users and understand the real problem.",
          "Write a specification with measurable requirements, quantity, delivery and budget.",
          "Separate must-haves from nice-to-haves.",
          "Decide how you will weigh price, quality, delivery and service.",
          "Get approval before contacting suppliers."
        ],
        mistakes: [
          "Asking suppliers for offers before knowing what you need.",
          "Using vague words such as 'good quality'.",
          "Not checking whether you already own or have a contract for it."
        ],
        terms: [["Specification (spec)", "A written description of exactly what is needed."], ["Must-have", "A requirement every supplier must meet."], ["Nice-to-have", "A feature that adds value but is not essential."], ["Budget", "The maximum amount approved to spend."]],
        tryit: "Write a short spec, with must-haves and nice-to-haves, for 10 laptops for an accounting office.",
        pts: ["Clear needs come before offers.", "Write measurable specifications.", "Separate must-haves from nice-to-haves and get budget approval."],
        qs: [
          { p: "Which is a measurable requirement?", o: ["Good paper", "80 gram paper, 500 sheets per pack", "Nice paper"], a: 1 },
          { p: "What is a must-have?", o: ["A requirement every supplier must meet", "An optional extra", "A colour choice"], a: 0 }
        ]
      },
      {
        t: "Finding suppliers and asking for offers",
        goal: "Find suitable suppliers, check them and request comparable offers in writing.",
        body: [
          "Once the need is clear, you look for suppliers. Sources include existing suppliers, trade directories, exhibitions, online marketplaces, recommendations from colleagues and searches. Aim for at least three suppliers for larger purchases, so that you can compare and show that you obtained a fair price.",
          "Check suppliers before you trust them. Is the company real and properly registered? Does it have a good history, references from other customers and financial stability? Does it hold the licences or certificates required? Can it deliver the quantity and the quality needed on time? Ask for samples for important items. Search for news or reviews about problems. A supplier that looks attractive but cannot deliver is very costly.",
          "Ask for offers in a structured way. For small purchases, a simple request for quotation (RFQ) sent to several suppliers is enough. It states the spec, quantity, delivery date and place, payment terms, how the offer must be presented and the deadline for replies. For large or complex purchases, a more formal tender is used with detailed rules, so that everyone competes on equal terms.",
          "Treat all suppliers equally. Give the same information to each, the same deadline and the same chance to ask questions, and answer questions to all in writing. Do not reveal one supplier's price to another. Keep the process transparent, because favouritism or leaking information can lead to legal problems and lost trust."
        ],
        example: "A hotel wanted cleaning services. The buyer sent the same RFQ to four companies, with the areas, times, tasks and required insurance. One supplier gave a very low price but had no insurance certificate and no references. Another had slightly higher price, three good references and full certificates. Because the checks were done, the hotel avoided a dangerous choice.",
        steps: [
          "List possible suppliers from several sources.",
          "Check registration, references, capacity and required certificates.",
          "Write a request for quotation with the spec, dates, terms and a reply deadline.",
          "Send the same information to all suppliers and answer questions in writing to all.",
          "Keep all replies for the record."
        ],
        mistakes: [
          "Asking only one supplier.",
          "Skipping checks because the price looks attractive.",
          "Giving one supplier extra information or another's prices."
        ],
        terms: [["RFQ", "Request for quotation: a written request to suppliers for a price offer."], ["Tender", "A formal, competitive bidding process for large purchases."], ["Reference", "A past customer who can confirm a supplier's quality."], ["Due diligence", "Careful checking of a supplier before doing business."]],
        tryit: "Write the ten lines of an RFQ for 50 office desks: spec, quantity, delivery place, date, payment terms and reply deadline.",
        pts: ["Use at least three suppliers for larger purchases.", "Check suppliers before trusting them.", "Ask all suppliers the same way and treat them equally."],
        qs: [
          { p: "Why give all suppliers the same information?", o: ["To keep the process fair and comparable", "To save paper", "It is not important"], a: 0 },
          { p: "A supplier has the lowest price but no certificates. What is best?", o: ["Choose them anyway", "Check them properly before deciding", "Hide the problem"], a: 1 }
        ]
      },
      {
        t: "Comparing offers fairly",
        goal: "Compare offers using a scoring table and total cost so the decision can be explained and defended.",
        body: [
          "Offers arrive in different shapes: different prices, delivery times, warranties and conditions. To compare fairly, put them side by side in a table on the same basis. Convert to the same currency and unit, add delivery and other costs, and note what each offer includes or excludes.",
          "Start by removing any offer that fails a must-have. Then score the rest against your chosen criteria. A simple method: give each criterion a weight (for example price 40, quality 30, delivery 20, service 10 percent), score each supplier from 1 to 5 on each criterion, multiply by the weights and add up. The highest total wins. The method is not magic, but it forces you to be clear and consistent, and it gives a written reason for your decision.",
          "Look beyond the price. Read the terms: payment terms (do they want 100 percent in advance?), warranty, penalties for lateness, who pays for returns and how long the offer is valid. Ask about hidden costs such as installation, training, extra fees and price increases. Calculate the total cost of ownership across the life of the item.",
          "Watch for warning signs: a price far below all others (perhaps something is left out, or quality is poor), pressure to decide today, unusual payment requests or vague answers. Ask questions and, if needed, clarify in writing. Record the comparison and the reasons in the file so that anybody can later see how the decision was made."
        ],
        example: "Three offers for 10 laptops: A at 900 dollars each with 1-year warranty, delivery in 4 weeks; B at 980 dollars each with 3-year warranty, delivery in 1 week; C at 850 dollars each but payment 100 percent in advance and no warranty stated. After scoring, B won on quality, warranty and delivery. C was rejected because the risk of paying everything in advance without a warranty was too high.",
        steps: [
          "Put all offers into one table, using the same units and currency.",
          "Remove offers that fail a must-have.",
          "Score each criterion, apply the weights and total.",
          "Read the terms and calculate total cost.",
          "Record the reasoning and the decision."
        ],
        mistakes: [
          "Comparing offers that include different things.",
          "Ignoring warranty and payment terms.",
          "Choosing first and finding reasons afterwards."
        ],
        terms: [["Weighting", "Giving each criterion a share of the total importance."], ["Total cost of ownership", "All costs of owning and using an item over its life."], ["Warranty", "A promise to repair or replace faulty goods for a period."], ["Payment terms", "When and how the buyer pays, such as 30 days after delivery."]],
        tryit: "Create a scoring table with four criteria and three imaginary suppliers. Fill in scores and find the winner.",
        pts: ["Compare on the same basis in one table.", "Score against weighted criteria and total the results.", "Read terms, calculate total cost and record reasons."],
        qs: [
          { p: "What should you do first with an offer that fails a must-have?", o: ["Remove it from the comparison", "Give it top score", "Ignore all others"], a: 0 },
          { p: "An offer is far below all others. What should you do?", o: ["Accept at once", "Ask questions to see what is missing or risky", "Hide it"], a: 1 }
        ]
      },
      {
        t: "Negotiation and contracts in plain words",
        goal: "Prepare a simple negotiation and recognise the key parts of a purchase agreement.",
        body: [
          "Negotiation is a conversation to reach an agreement that works for both sides. The best deals are not won by pressure but by preparation. Know your needs, your alternatives, your budget and your walk-away point, the position at which you would rather not buy at all. Know the supplier's likely needs too: perhaps they want a regular customer or a quick payment.",
          "You can negotiate more than the price. Delivery dates, payment terms (30 days instead of advance payment), warranty length, training, free delivery, discounts for larger quantities and price protection for a year are all valuable. Trading between them often gets a better outcome: 'If we commit to 100 units, can you include delivery and a two-year warranty?'",
          "Be polite, patient and honest. Ask questions and listen. Do not bluff about things that can be checked, and do not accept the first offer automatically. Take notes and confirm what was agreed in writing right after the conversation, so that nobody remembers it differently later.",
          "A contract or purchase agreement puts the deal in writing. Key parts are: the parties, the goods or services and quantity, price and currency, delivery date and place, payment terms, quality standards and acceptance, warranty, what happens if either party is late or fails (penalties or remedies), how to end the agreement and how disputes are settled. Read every clause. If you do not understand it, ask for it to be explained or reviewed by someone qualified before you sign. Only people with authority should sign."
        ],
        example: "A buyer wanted 100 chairs from a supplier who first said 30 dollars each. Instead of only pushing on price, the buyer said, 'If we order all 100 now and pay within 14 days, can you deliver free and give a three-year warranty?' The supplier agreed to 29 dollars, free delivery and the warranty. The buyer confirmed it in an email the same afternoon and it was included in the contract.",
        steps: [
          "Prepare: needs, alternatives, budget and walk-away point.",
          "List what else you could negotiate besides price.",
          "Listen, ask questions and trade options.",
          "Confirm what was agreed in writing straight away.",
          "Read the contract carefully and have it approved by the person with authority."
        ],
        mistakes: [
          "Negotiating without knowing your walk-away point.",
          "Focusing only on price.",
          "Relying on verbal promises."
        ],
        terms: [["Negotiation", "A conversation to reach an agreement acceptable to both sides."], ["Walk-away point", "The point beyond which you will not accept a deal."], ["Contract", "A written agreement setting out the rights and duties of both parties."], ["Clause", "One numbered section of a contract."]],
        tryit: "List five things besides price that you could negotiate when buying 50 phones.",
        pts: ["Prepare needs, alternatives and walk-away point.", "Negotiate delivery, payment terms and warranty as well as price.", "Confirm agreements in writing and read every contract clause."],
        qs: [
          { p: "What is a walk-away point?", o: ["The point beyond which you will not accept the deal", "A part of the office", "A type of tax"], a: 0 },
          { p: "How should agreed points be recorded?", o: ["In writing, straight away", "Only verbally", "Not at all"], a: 0 }
        ]
      },
      {
        t: "Ordering, receiving and paying correctly",
        goal: "Use purchase orders, check deliveries and match documents before payment.",
        body: [
          "After the decision, place a written purchase order (PO). It should carry a unique number, the date, both parties' details, an exact description, quantity, agreed price, delivery date and place, and payment terms. The PO turns the deal into a formal commitment and lets everyone see later what was ordered. Never order without approval within your spending limit.",
          "When goods arrive, check them at the moment of delivery. Count the packages, compare them with the PO and the delivery note, look for damage and test the item if possible. Note any shortage or damage on the delivery paper before signing, take photos and report it to the supplier at once. Record what was received in a goods received note (GRN), so the finance team knows it is correct to pay.",
          "Before paying an invoice, do the three-way match: PO (what was ordered), GRN (what was received) and invoice (what is being charged). Quantity, price and terms must agree. Investigate differences and resolve them before paying. Check that bank details match the supplier's record, and phone a known number to confirm any change. Pay on time and in line with terms, because reliable payment builds good supplier relationships.",
          "Keep the whole file: request, approval, offers, comparison, contract, PO, delivery note, GRN, invoice and proof of payment. This paper trail supports audits, disputes and future purchases. And separate the duties: the person who orders should not also be the only one to receive and to pay. It reduces error and fraud."
        ],
        example: "A company ordered 100 boxes of printer paper at 4 dollars a box. The delivery brought 90 boxes, and the invoice was for 100. Because the storekeeper counted the boxes and wrote 'received 90' on the note, the buyer could ask the supplier to correct the invoice to 90 boxes or deliver the missing 10. Without the check, the company would have paid 40 dollars for nothing, and, at scale, thousands.",
        steps: [
          "Issue a PO with approval, exact details and agreed terms.",
          "Check deliveries: count, compare, inspect and note problems before signing.",
          "Write a goods received note.",
          "Match PO, GRN and invoice before paying.",
          "Pay on time and keep the complete file."
        ],
        mistakes: [
          "Ordering by phone without a written PO.",
          "Signing for delivery without checking.",
          "Paying an invoice that does not match."
        ],
        terms: [["Purchase order (PO)", "A written order to a supplier with all agreed details."], ["Delivery note", "A paper that comes with goods listing what is delivered."], ["GRN", "Goods received note: a record of what was actually received."], ["Three-way match", "Checking PO, GRN and invoice agree before payment."]],
        tryit: "PO: 50 chairs at 40 dollars. Delivered: 48 chairs. Invoice: 50 chairs at 40. Write what you will do and who you will tell.",
        pts: ["Use a written PO for every order.", "Check deliveries at once and write a GRN.", "Do a three-way match before every payment."],
        qs: [
          { p: "What is compared in a three-way match?", o: ["PO, goods received note and invoice", "Three suppliers", "Three prices from one supplier"], a: 0 },
          { p: "Goods arrive damaged. What should you do?", o: ["Sign quietly", "Note it on the delivery paper, photograph and tell the supplier", "Throw them away"], a: 1 }
        ]
      },
      {
        t: "Managing suppliers and doing the right thing",
        goal: "Track supplier performance, resolve problems and act ethically in every purchase.",
        body: [
          "Buying does not end when the goods arrive. Good suppliers become partners, and a good relationship gives better service, better prices and priority when supplies are short. Review supplier performance regularly: were deliveries on time, complete and correct? Was quality good? Did they respond quickly to problems? Keep a simple score sheet and share the results with the supplier.",
          "When things go wrong, address them early and factually. State what happened, refer to the agreement, say what you need (repair, replacement, credit, better process) and by when. Keep records and communicate in writing. Most problems are solved with a calm conversation; serious or repeated failures may need a formal warning, penalties under the contract or a change of supplier.",
          "Think about risk. Depending on a single supplier for something important is dangerous. Have a backup, keep a safety stock of critical items and know about the supplier's own dependencies, such as one factory or one port. Watch the supplier's financial health, because a supplier going out of business can stop your operations.",
          "Ethics matter in every step. Never accept gifts or favours that could influence your decision, declare any personal link to a supplier (a conflict of interest) and refuse bribes. Treat all suppliers fairly, keep their prices and secrets confidential and follow the law. Consider the wider effects: is the supplier treating workers fairly and looking after the environment? A reputation for honesty takes years to build and one bad choice to lose."
        ],
        example: "A restaurant relied on one vegetable supplier. One winter the supplier's warehouse flooded, and the restaurant had no vegetables for three days. Afterwards, the manager approved a second supplier for the most important items and agreed a small monthly minimum order with both. Prices rose slightly, but the restaurant never had to close for lack of supplies again.",
        steps: [
          "Score suppliers regularly on delivery, quality, price and responsiveness.",
          "Share the results and agree improvements.",
          "Handle problems early, factually and in writing.",
          "Reduce risk: backup suppliers and safety stock for critical items.",
          "Declare conflicts of interest and refuse gifts that could influence you."
        ],
        mistakes: [
          "Depending on one supplier for something critical.",
          "Accepting gifts from suppliers who are bidding.",
          "Ignoring repeated small failures until a big one happens."
        ],
        terms: [["Supplier scorecard", "A simple record that rates a supplier on delivery, quality and service."], ["Conflict of interest", "A personal link that could influence a business decision."], ["Safety stock", "Extra stock kept in case supply is interrupted."], ["Bribe", "Something offered to influence a decision unfairly."]],
        tryit: "Create a four-line supplier scorecard for a cleaning company and give it scores for last month.",
        pts: ["Review supplier performance regularly.", "Reduce risk with backups and safety stock.", "Declare conflicts of interest and refuse bribes."],
        qs: [
          { p: "A supplier offers you a gift while bidding for your contract. What is right?", o: ["Accept quietly", "Refuse and report it according to policy", "Ask for a larger one"], a: 1 },
          { p: "Why avoid relying on one supplier for something critical?", o: ["If they fail, you have no supply", "It is against the law", "It costs less"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Choose a supplier for 30 office laptops",
      scenario: "You are a procurement officer at a growing accounting firm. The firm needs 30 laptops for new staff starting 1 October. The budget is 30,000 dollars. The director wants the 'cheapest good option'. You have received three offers and must recommend a supplier with a clear, defensible reason, then plan the order and receiving process.",
      cols: ["Supplier", "Offer"],
      rows: [["Alpha IT", "USD 950 each (28,500). Delivery in 3 weeks. 1-year warranty. Payment: 30 days after delivery. References: 4 good."], ["BestTech", "USD 1,020 each (30,600). Delivery in 1 week. 3-year warranty with on-site repair. Payment: 30 days. References: 6 good."], ["QuickDeals", "USD 820 each (24,600). Delivery 'as soon as possible'. Warranty not mentioned. Payment: 100% in advance. No references provided."], ["Requirements", "Must-haves: 16 GB memory, 512 GB storage, delivered by 24 September, warranty of at least 1 year. Nice-to-have: on-site repair, 3-year warranty."], ["Weights", "Price 35, quality/specification 20, delivery 20, warranty/service 15, supplier reliability 10."]],
      tasks: ["Decide which offers pass the must-haves and explain why one or more are removed.", "Build a scoring table (1 to 5 per criterion) for the remaining suppliers and calculate weighted totals.", "Write a short negotiation plan for the preferred supplier: two things you will ask for besides price, and your walk-away point.", "List the steps and documents from purchase order to payment, including what you will check when the laptops arrive."],
      hints: ["QuickDeals fails on warranty and delivery certainty, and its payment terms are risky.", "BestTech is over budget by 600 dollars; think about negotiating, not only about price.", "The delivery must be before 24 September. Check each supplier's lead time from today's date."],
      rubric: ["Offers are screened against must-haves with clear reasons.", "The scoring table is complete, consistent and calculated correctly.", "The negotiation plan is realistic and includes a walk-away point.", "The order-to-payment steps include PO, GRN and three-way match."],
      deliverable: "A supplier recommendation with scoring table, negotiation plan and order-to-payment checklist."
    }
  }
};
