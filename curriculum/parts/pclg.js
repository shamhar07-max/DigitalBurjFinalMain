// PC-LG01 Logistics & Freight Operations — from quote to reconciliation, in plain language.
module.exports = {
  "PC-LG01": {
    outcome: "Follow a shipment from first enquiry to final invoice, understand who does what and which documents are needed, and handle delays and mistakes calmly.",
    units: [
      {
        t: "The journey of a shipment",
        goal: "Describe every stage a shipment goes through from the first enquiry to the final invoice.",
        body: [
          "Logistics is the business of moving goods from one place to another, on time, undamaged and at a fair price. When a company in one country sells to a customer in another, the goods travel through a chain of people, places and paperwork. Understanding the whole journey is the first step to running it well.",
          "A typical international shipment has stages. Enquiry and quote: the customer asks how much and how long. Booking: the customer accepts and space is reserved. Pick-up: the goods are collected from the seller and packed. Export clearance: the goods are declared to customs in the country of origin and allowed to leave. Main transport: the goods travel by sea, air or road. Import clearance: customs in the destination country checks the paperwork, calculates any duty or tax and releases the goods. Delivery: the goods reach the buyer. Invoicing: the freight company bills for its services.",
          "Each stage has a milestone, a clear event that shows it is complete, for example 'goods collected' or 'cleared by customs'. Each has an owner, a person or company responsible, and a document that proves it. Tracking milestones tells you whether the shipment is on schedule. When a milestone is late, everything after it is delayed, so early problems must be raised early.",
          "The three main ways of moving goods have different strengths. Sea freight is cheap for large volumes but slow. Air freight is fast but costly, used for urgent or valuable items. Road freight is flexible for shorter distances and the final delivery. Often a shipment uses more than one, called multimodal transport, for example truck to a port, ship across the sea and truck to the customer."
        ],
        example: "A furniture maker in Vietnam sold 12 cartons of chairs to a shop in Dubai. The freight company quoted, booked space on a ship, collected the cartons from the factory, arranged export clearance, shipped them, handled import clearance in Dubai, delivered to the shop and sent an invoice. The shop's owner tracked each milestone and, when the ship was two days late, was warned early enough to tell her own customers.",
        steps: [
          "Write the stages of a shipment in order, from enquiry to invoice.",
          "For each stage note the owner, the milestone and the document.",
          "Choose the transport mode by balancing cost, speed and the type of goods.",
          "Plan the date each milestone should be reached.",
          "Watch milestones and raise late ones early."
        ],
        mistakes: [
          "Looking only at the main journey and forgetting clearance and delivery.",
          "Not agreeing who is responsible for each stage.",
          "Ignoring small delays that grow into large ones."
        ],
        terms: [["Logistics", "Planning and moving goods from one place to another."], ["Milestone", "A clear event that shows a stage is complete."], ["Customs", "The government authority that controls goods entering or leaving a country."], ["Multimodal", "Using more than one type of transport in a single shipment."]],
        tryit: "Choose any product you own that was made in another country. Write the likely stages it travelled through, with the transport mode you think was used at each stage.",
        pts: ["A shipment moves through enquiry, booking, pick-up, export clearance, transport, import clearance, delivery and invoicing.", "Every stage has an owner, a milestone and a document.", "Early delays grow, so raise them early."],
        qs: [
          { p: "Which stage comes right after booking?", o: ["Invoicing", "Pick-up of the goods", "Import clearance"], a: 1 },
          { p: "Which mode is usually cheapest for large volumes but slowest?", o: ["Air freight", "Sea freight", "Courier by hand"], a: 1 }
        ]
      },
      {
        t: "Who is who in a shipment",
        goal: "Name the main parties and explain what each of them does and is responsible for.",
        body: [
          "Many organisations work together on a single shipment, and confusion about roles causes delays. Learn the key names. The shipper (or exporter) is the seller who sends the goods. The consignee (or importer) is the buyer who receives them. The carrier is the company that physically moves the goods: a shipping line, an airline or a trucking firm.",
          "The freight forwarder is the organiser. It does not usually own ships or planes. It arranges the whole journey for its customer: it gets prices, books space, prepares documents, handles customs paperwork and tracks the shipment. Think of it as a travel agent for cargo. A customs broker is a specialist who prepares and submits the customs declarations, and often works for the forwarder.",
          "Other players include the warehouse, which stores goods before or after transport, the port or airport terminal, which loads and unloads, and the insurance company, which pays if goods are lost or damaged. Customs authorities in each country are the rule-keepers.",
          "Responsibility matters. Contracts state who is responsible for the goods at each point, who pays for each part of the journey and when the risk passes from seller to buyer. Misunderstanding this creates expensive disputes: who pays if the goods are damaged in the port? Always confirm in writing who is responsible for what."
        ],
        example: "A Turkish clothing factory (shipper) sold jackets to a shop in Riyadh (consignee). A freight forwarder in Istanbul booked a shipping line (carrier), a trucking firm and a customs broker. When two cartons arrived damaged, everyone asked who was responsible. Because the sales contract said the risk passed to the buyer when the goods were loaded on the ship, the damage claim went to the buyer's insurance, and the dispute ended quickly.",
        steps: [
          "For a shipment, write the name and role of the shipper, consignee, carrier and forwarder.",
          "List the other parties: customs broker, warehouse, port and insurer.",
          "Write who is responsible for the goods at each stage.",
          "Write who pays for each part of the journey.",
          "Confirm all of this in writing before the shipment starts."
        ],
        mistakes: [
          "Mixing up the forwarder and the carrier.",
          "Assuming everyone knows who is responsible.",
          "Leaving insurance until something goes wrong."
        ],
        terms: [["Shipper / exporter", "The seller who sends the goods."], ["Consignee / importer", "The buyer who receives the goods."], ["Carrier", "The company that physically moves the goods."], ["Freight forwarder", "A company that organises the whole journey for its customer."]],
        tryit: "Draw a simple diagram with the shipper, forwarder, carrier, customs broker and consignee. Draw arrows showing who contacts whom.",
        pts: ["Shipper sends, consignee receives, carrier moves, forwarder organises.", "Contracts decide who is responsible and who pays at each stage.", "Confirm roles in writing before the shipment."],
        qs: [
          { p: "Who organises the whole journey on behalf of the customer?", o: ["The freight forwarder", "The consignee", "The port"], a: 0 },
          { p: "Who is the consignee?", o: ["The seller", "The buyer who receives the goods", "The ship's captain"], a: 1 }
        ]
      },
      {
        t: "The paperwork that travels with goods",
        goal: "Recognise the main shipping documents, what each is for and why they must match.",
        body: [
          "Goods do not move without paper. The paper proves what the goods are, who owns them, what they are worth and that the rules have been followed. Missing or wrong documents are among the most common reasons for delay at customs.",
          "The commercial invoice is the seller's bill to the buyer. It states what is sold, quantity, price, currency and terms, and customs use it to work out duty. The packing list describes how the goods are packed: number of cartons, weights, sizes and what is inside each. It helps the carrier, the warehouse and customs check what physically arrives.",
          "The bill of lading (for sea freight) or air waybill (for air freight) is issued by the carrier. It is the contract of transport and a receipt for the goods. A sea bill of lading may also be a document of title, meaning that whoever holds the original controls the goods. Other papers may be needed, such as a certificate of origin (where the goods were made), an insurance certificate, and special licences or health certificates for certain products.",
          "The golden rule is that details must match across documents: the names, addresses, quantities, weights, descriptions and values. If the invoice says 12 cartons and the packing list says 11, customs may hold the shipment until the difference is explained, and storage fees start to run. Always check the documents against each other before sending them on."
        ],
        example: "A shipment of 12 cartons was held at customs because the commercial invoice listed 12 cartons at 480 kilograms, but the packing list listed 11 cartons at 455 kilograms. It turned out that one carton had been packed separately and sent on a later truck. Correcting the packing list took three days, and storage fees added 600 dollars. A simple cross-check before sending the documents would have found the mistake.",
        steps: [
          "Collect the commercial invoice, packing list and bill of lading or air waybill.",
          "Check the parties' names and addresses are identical on all documents.",
          "Check quantities, weights and descriptions match across all documents.",
          "Confirm whether special documents are needed for this product or country.",
          "Send the documents to the customs broker early and keep copies."
        ],
        mistakes: [
          "Sending documents that do not match each other.",
          "Waiting until the goods arrive to prepare paperwork.",
          "Forgetting special certificates for regulated goods."
        ],
        terms: [["Commercial invoice", "The seller's bill that states goods, quantity, price and terms."], ["Packing list", "A description of how the goods are packed, with numbers and weights."], ["Bill of lading / air waybill", "The carrier's contract of transport and receipt for the goods."], ["Certificate of origin", "A document stating the country where the goods were made."]],
        tryit: "Compare these three lines: Invoice 20 boxes 300 kg; Packing list 19 boxes 285 kg; Bill of lading 20 boxes 300 kg. Write what is wrong and what you would do.",
        pts: ["Key documents: commercial invoice, packing list and bill of lading or air waybill.", "Details must match across all documents.", "Prepare documents early to avoid delays and fees."],
        qs: [
          { p: "Which document is the carrier's contract of transport and receipt for the goods?", o: ["Packing list", "Bill of lading", "Quote"], a: 1 },
          { p: "Why must document details match?", o: ["Mismatches can hold goods at customs", "It is a matter of style", "Customs enjoys checking"], a: 0 }
        ]
      },
      {
        t: "Quotes, price terms and who pays for what",
        goal: "Read and write a clear freight quote and understand simple price terms.",
        body: [
          "A quote is the forwarder's written offer to move goods at a stated price. A good quote leaves no doubt about what is included. It lists each charge separately: pick-up, export clearance, main freight, import clearance, delivery, insurance and any fees at the ports. It states the currency, how long the quote is valid (prices change often) and any conditions, such as weight limits.",
          "Price terms, called Incoterms (International Commercial Terms), are a set of short standard codes that say who pays for and who is responsible for each part of the journey between seller and buyer. You do not need to memorise them all at first. A few common examples: EXW (Ex Works) means the buyer takes responsibility from the seller's door. FOB (Free On Board) means the seller is responsible until the goods are loaded on the ship. CIF (Cost, Insurance and Freight) means the seller pays for transport and insurance to the destination port. DAP (Delivered at Place) means the seller delivers to the buyer's place, with the buyer clearing import.",
          "The code always works together with a named place, for example 'FOB Shanghai'. The term decides who books the transport, who pays the freight, who arranges customs at each end and, importantly, who bears the risk if the goods are damaged in each part of the trip. Both sides should confirm the term in writing.",
          "When you compare quotes, compare like with like. One quote may include delivery to the door and another only to the port. One may leave out import charges. Ask what is not included, and watch for extra charges that can appear later, such as storage, waiting time or documentation fees. The cheapest headline price is not always the cheapest total."
        ],
        example: "Two forwarders quoted for a shipment from Guangzhou to Dubai. Forwarder A offered 1,500 dollars, forwarder B offered 1,750 dollars. A's price covered only port to port; B's included clearance and delivery to the customer's warehouse. When the customer added the missing charges to A's offer, A came to 2,050 dollars. B was in fact the cheaper option.",
        steps: [
          "Ask for a quote that lists every charge separately, with currency and validity.",
          "Confirm the price term and the named place, such as FOB Shanghai.",
          "Check what is included and what is not, especially at the destination.",
          "Ask about possible extra charges such as storage and waiting time.",
          "Compare total costs to the door, not just headline prices."
        ],
        mistakes: [
          "Comparing quotes that cover different things.",
          "Not knowing who bears the risk at each stage.",
          "Forgetting that quotes expire."
        ],
        terms: [["Quote", "A written offer to do the work at a stated price."], ["Incoterm", "A standard code that sets who pays for and is responsible for each part of the journey."], ["Validity", "How long a quoted price stays available."], ["Surcharge", "An extra charge added to the basic price, such as for fuel."]],
        tryit: "Two quotes: A costs 1,200 port to port; B costs 1,500 door to door including clearance and delivery. Write the questions you would ask before deciding.",
        pts: ["A good quote lists every charge and its validity.", "Incoterms show who pays and who bears risk at each stage.", "Compare total costs like for like."],
        qs: [
          { p: "What should a freight quote always include?", o: ["A slogan", "Itemised charges, currency and validity period", "Only a total with no detail"], a: 1 },
          { p: "What do Incoterms decide?", o: ["Who pays for and is responsible for each part of the journey", "The colour of the boxes", "The name of the ship"], a: 0 }
        ]
      },
      {
        t: "Tracking milestones and keeping people informed",
        goal: "Monitor a shipment against its plan and give customers clear, timely updates.",
        body: [
          "A shipment that is being watched rarely surprises anyone. Tracking means comparing what has happened with what was planned, at each milestone. Most carriers offer online tracking, and forwarders keep their own records. The point is not only to know where the goods are, but to know whether they are on time and what to do if they are not.",
          "Start with a simple plan: a list of milestones with the expected date of each (for example goods collected 3 June, departed port 6 June, arrived destination port 20 June, cleared customs 22 June, delivered 24 June). Update each with the actual date as it happens. When an actual date is later than planned, calculate the effect on the final delivery date and decide what needs to be done.",
          "Customers value honest, early, plain updates. A good message says what has happened, what it means for delivery and what happens next. For example: 'Your shipment left port on 6 June as planned. It is expected to reach Jebel Ali on 20 June. We will update you when it arrives.' When something goes wrong, tell the customer early, with a new date and what you are doing about it, even if the new date is uncertain. Silence is the biggest cause of angry customers.",
          "Keep a shipment record: quote, booking, documents, milestone dates, messages and any problems. If a dispute happens later, this record protects everybody. Regular routines help: check every active shipment each morning, mark those at risk and contact customers before they contact you."
        ],
        example: "A forwarder noticed on a morning check that a vessel had been delayed by three days at a transhipment port. It immediately emailed the customer: 'Your goods are delayed by about three days. New arrival: 23 June. We are keeping your delivery slot flexible and will confirm.' The customer, who had a warehouse team booked, rearranged their staff and thanked the forwarder. A late but early-announced delay caused no complaint.",
        steps: [
          "List milestones with planned dates at booking.",
          "Check active shipments every morning and record actual dates.",
          "When a date slips, work out the effect on delivery.",
          "Message the customer early with what happened, the new date and the next step.",
          "Keep a written record of all dates and messages."
        ],
        mistakes: [
          "Waiting for the customer to ask where the goods are.",
          "Giving updates without a next step or a date.",
          "Not recording what was said and when."
        ],
        terms: [["Tracking", "Following a shipment's progress against its plan."], ["ETA / ETD", "Estimated time of arrival and estimated time of departure."], ["Transhipment", "Moving goods from one vessel or vehicle to another during the journey."], ["Shipment record", "The file of all documents, dates and messages for one shipment."]],
        tryit: "Write a 40-word update to a customer whose shipment is delayed by four days. Include what happened, the new date and what you will do next.",
        pts: ["Compare actual milestone dates with the plan every day.", "Tell customers early, plainly and with a next step.", "Keep a written shipment record."],
        qs: [
          { p: "A vessel is delayed. What is the best action?", o: ["Wait until the customer complains", "Tell the customer early with a new date and next steps", "Change the documents secretly"], a: 1 },
          { p: "What does ETA mean?", o: ["Estimated time of arrival", "Extra tax added", "Early transport agreement"], a: 0 }
        ]
      },
      {
        t: "When things go wrong: delays, damage and customs problems",
        goal: "Handle common problems in a calm, step-by-step way that protects the customer and the company.",
        body: [
          "Problems are normal in logistics: weather delays a ship, a carton is crushed, customs asks a question, a document is wrong, the consignee is not available to receive the goods. What matters is a calm, organised response. Customers remember how you handled the problem more than the problem itself.",
          "Use a simple routine. Record: write down exactly what happened, when and where, with photos or reports if you can. Notify: tell the customer and the relevant parties quickly. Protect: prevent further damage and keep costs from growing (for example, move goods from a port where storage fees are high). Resolve: follow the agreed procedure, whether that is correcting a document, filing an insurance claim or arranging redelivery. Learn: note the cause and how to avoid it next time.",
          "Damage needs special care. Note damage on the delivery receipt at the moment of delivery, before signing, and take clear photos. Report it to the carrier and the insurer within the time limits stated in the contract (often very short). Keep the packaging. A claim without proof, or filed late, is often refused.",
          "For customs problems, act fast, because storage and waiting fees grow every day. Find out exactly what customs is asking for. Often it is a missing or mismatched document, a question about the value or a need for a licence. Supply what is asked clearly and completely, and keep the customer updated. Never alter documents or hide information to speed things up. That is illegal and much more costly than a delay."
        ],
        example: "When a truck delivered 12 cartons to a shop, the driver rushed. The manager noticed two crushed cartons after signing a clean receipt. The insurer refused the claim because damage had not been noted at delivery. Next time she wrote 'two cartons crushed' on the receipt, took photos in front of the driver and emailed the forwarder within two hours. The claim was paid in full.",
        steps: [
          "Record what happened with times, places and photos.",
          "Notify the customer and other parties quickly.",
          "Protect the goods and prevent extra costs, such as storage fees.",
          "Follow the agreed procedure: correct documents, file the claim or arrange redelivery.",
          "Note the cause and how to prevent it next time."
        ],
        mistakes: [
          "Signing for damaged goods without noting the damage.",
          "Delaying a claim past the deadline.",
          "Altering documents to hurry things along."
        ],
        terms: [["Claim", "A request for payment for loss or damage, usually to an insurer or carrier."], ["Demurrage / storage", "Fees charged when goods stay in a port or warehouse beyond free time."], ["Delivery receipt", "The paper signed when goods are delivered."], ["Redelivery", "Delivering the goods again after a failed delivery."]],
        tryit: "A carton arrives with a torn corner. Write the exact note you would put on the delivery receipt and the first message you would send to the forwarder.",
        pts: ["Record, notify, protect, resolve and learn.", "Note damage on the delivery receipt and photograph it straight away.", "Never alter documents to avoid delays."],
        qs: [
          { p: "When should damage be noted?", o: ["At the moment of delivery, on the receipt, with photos", "Next month", "Never"], a: 0 },
          { p: "Customs holds your shipment for a document mismatch. What is the best action?", o: ["Change the paperwork quietly", "Find out what is needed, correct it honestly and keep the customer informed", "Ignore the message"], a: 1 }
        ]
      },
      {
        t: "Warehouses, reconciliation and invoicing",
        goal: "Understand what happens to goods at a warehouse and how to check charges before sending or paying the final invoice.",
        body: [
          "Warehouses are where goods wait, are counted, sorted, packed and sent on. When goods arrive, the warehouse checks them against the paperwork: are the number of cartons and the description correct, and is anything damaged? This is called receiving or goods-in. Discrepancies are recorded immediately and reported. Goods are then stored in labelled locations so they can be found, and when they leave, they are picked, packed and checked again.",
          "Good warehousing depends on accurate records. Every movement (in, out, moved, counted) is written down so that the system always shows how much of each item is where. Regular counts, called stocktakes, compare the records with what is physically on the shelves. Differences are investigated, not ignored.",
          "At the end of a shipment comes reconciliation: comparing what was quoted with what was actually charged, and what was planned with what happened. Go through every line: freight, clearance, port fees, delivery, storage, waiting time. Note each difference and its reason. Extra costs need a clear explanation, such as 'three extra days of storage due to the customs query'. Any extra cost that the customer did not agree to should be explained to them before it appears on the invoice.",
          "Finally, the invoice. A correct freight invoice has a unique number, the date, customer details, a description of each service, the amounts, the currency, the payment terms and the shipment reference. Check it against your reconciliation before it goes out, and after sending, follow up on payment. Careful reconciliation prevents disputes, protects profit and builds the trust that brings repeat business."
        ],
        example: "A forwarder quoted 1,850 dollars for a shipment. At the end, actual costs were 2,140 dollars because of three extra days of storage and a fuel surcharge. The account manager reconciled the shipment, wrote a short explanation for each extra charge and phoned the customer before sending the invoice. The customer, prepared and informed, paid without complaint. Another forwarder who sent the same extra charges without explanation lost the customer.",
        steps: [
          "At goods-in, check cartons and condition against the documents and record any difference immediately.",
          "Store goods in labelled locations and record every movement.",
          "Do regular stocktakes and investigate differences.",
          "At the end of the shipment, compare quoted and actual costs line by line and explain each difference.",
          "Send a correct, clear invoice and follow up on payment."
        ],
        mistakes: [
          "Ignoring small stock differences.",
          "Adding surprise charges without explaining them.",
          "Sending an invoice without reconciling it first."
        ],
        terms: [["Goods-in / receiving", "Checking goods when they arrive at a warehouse."], ["Stocktake", "A physical count compared with the records."], ["Reconciliation", "Comparing two sets of figures and explaining every difference."], ["Payment terms", "The agreed time and way of paying an invoice, such as 30 days."]],
        tryit: "Quoted 1,850, actual 2,140. Extra: storage 240, fuel surcharge 50. Write the explanation you would give the customer in three sentences.",
        pts: ["Warehouses check goods in, record every movement and count regularly.", "Reconciliation compares quote and actual costs line by line.", "Explain any extra charge before invoicing."],
        qs: [
          { p: "Actual charges exceed the quote. What is the best first step?", o: ["Hide the difference", "Explain the reason and inform the customer before invoicing", "Cancel the shipment"], a: 1 },
          { p: "What is a stocktake?", o: ["A physical count compared with the records", "A type of tax", "A shipping document"], a: 0 }
        ]
      }
    ],
    lab: {
      title: "Fix a shipment held at customs",
      scenario: "A customer in Dubai imported 12 cartons of office chairs from Vietnam. The shipment has arrived, but customs has held it because the paperwork does not match. Storage fees are growing by 60 dollars a day. You are the forwarder's operations coordinator. You must find the problem, plan the correction, protect the customer from extra cost as far as possible and inform them clearly.",
      cols: ["Document", "What it says"],
      rows: [["Commercial invoice", "12 cartons, 480 kg, total value USD 6,000."], ["Packing list", "11 cartons, 455 kg."], ["Bill of lading", "12 cartons, 480 kg, consignee: Al Noor Trading LLC."], ["Customs message", "Quantity on packing list does not match invoice and bill of lading. Hold until corrected."], ["Quote", "USD 1,850 including origin charges, freight, clearance and delivery. Storage not included."], ["Factory email", "One carton was packed separately and left on a later truck; it is now on the next sailing."]],
      tasks: ["Explain the mismatch and its most likely cause in two or three sentences.", "List the corrective steps, who does each one and in what order (think about the factory, the forwarder, the customs broker and the customer).", "Write the customer update message (about 80 words): what happened, what you are doing, what it may cost and the next update time.", "Calculate the likely extra cost if correction takes four days and explain who should bear it and why."],
      hints: ["The invoice and bill of lading agree with each other, but the packing list does not.", "The factory's email suggests that the true number of cartons on this ship may be 11, not 12. Decide what documents need to be corrected and how to be honest with customs.", "Storage was not included in the quote; think about how to explain this fairly."],
      rubric: ["The mismatch and its probable cause are correctly identified.", "Corrective steps are ordered logically with responsible parties.", "The customer message is honest, clear and gives next steps and timing.", "The cost calculation is correct and the reasoning about responsibility is fair."],
      deliverable: "A corrective action list, the customer message and the cost explanation."
    }
  }
};
