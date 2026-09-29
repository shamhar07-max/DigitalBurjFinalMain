// PC-AC01 Accounting Support — the basics of recording money accurately.
module.exports = {
  "PC-AC01": {
    outcome: "Record everyday business money movements correctly, keep books that balance, reconcile with the bank and prepare simple reports.",
    units: [
      {
        t: "What accounting is and what support staff do",
        goal: "Explain why businesses keep accounts and what an accounting support person does daily.",
        body: [
          "Accounting is the system of recording, sorting and reporting the money movements of a business. It answers questions owners and others ask: How much did we earn? What do we owe? Who owes us? Are we making a profit? Do we have enough cash to pay next month's bills? Without records, nobody can answer honestly.",
          "Accounting serves several people. Owners and managers use it to make decisions. Banks use it to decide on loans. Tax authorities need it to calculate tax. Investors and partners use it to judge the business. Because so many people rely on it, it must be accurate, complete, consistent and honest.",
          "An accounting support person does the everyday work that keeps the books right. Typical tasks: entering invoices from suppliers and to customers, recording payments received and made, checking receipts and expense claims, filing documents, preparing bank reconciliations, tracking who owes money and helping the accountant prepare reports. You are the guardian of the details.",
          "The key qualities are accuracy, honesty, confidentiality and organisation. Numbers must be right, records must be kept in order and financial information must be kept private. When you find an error, report and correct it. When someone asks you to hide something or 'adjust' numbers, refuse and inform a senior person: that is fraud, and it can harm you as well as the business."
        ],
        example: "A small shop owner kept receipts in a shoebox and thought she was making money. A support person sorted the papers, recorded each sale and expense and found that the shop was losing money on one popular product because the supplier's price had risen. With correct records, the owner raised the price and returned to profit.",
        steps: [
          "Collect all documents: invoices, receipts, bank statements and payment slips.",
          "Sort them by date and type.",
          "Record each in the books accurately and promptly.",
          "Check totals and investigate differences.",
          "File documents so they can be found later."
        ],
        mistakes: [
          "Delaying recording so that documents are lost.",
          "Guessing amounts instead of checking documents.",
          "Agreeing to 'adjust' numbers on request."
        ],
        terms: [["Accounting", "Recording, sorting and reporting a business's money movements."], ["Bookkeeping", "The everyday recording of transactions."], ["Transaction", "One money event, such as a sale, a purchase or a payment."], ["Fraud", "Deliberate deception to gain money or hide the truth."]],
        tryit: "List ten documents an accounting support person might handle in a week and say what each is for.",
        pts: ["Accounting answers what we earn, owe and are owed.", "Accuracy, honesty and organisation matter most.", "Never alter numbers to hide the truth."],
        qs: [
          { p: "Who uses a company's accounts?", o: ["Only the owner", "Owners, banks, tax authorities and others", "Nobody"], a: 1 },
          { p: "You are asked to change a number to hide a loss. What is right?", o: ["Do it quietly", "Refuse and tell a senior person", "Ask for a bonus"], a: 1 }
        ]
      },
      {
        t: "The building blocks: assets, liabilities, income and expenses",
        goal: "Recognise the five kinds of accounts and understand the accounting equation.",
        body: [
          "All business money items fall into five groups. Assets are things the business owns or is owed that have value: cash, money in the bank, stock, equipment, vehicles and money that customers owe. Liabilities are what the business owes to others: supplier bills, bank loans, taxes to pay. Equity (or capital) is the owners' share: what would be left for the owners if all assets were sold and all liabilities paid.",
          "The other two groups measure the business's activity over a period. Income (or revenue) is money earned from selling goods or services. Expenses are the costs of running the business: rent, salaries, electricity, materials and marketing. Profit is income minus expenses. If expenses are greater, the result is a loss.",
          "These are tied together by the accounting equation: Assets = Liabilities + Equity. It always holds. If a business has 100,000 dollars of assets and owes 40,000 dollars, the owners' equity is 60,000 dollars. Every transaction changes at least two things, and the equation must always stay in balance. That is the foundation of every accounting system.",
          "It is important to distinguish cash from profit. A business can be profitable on paper but run out of cash, for example if customers pay late while suppliers and salaries must be paid now. Likewise, buying equipment uses cash but is not an expense in the same way; it becomes an asset. Keeping these ideas clear will help you understand every report."
        ],
        example: "A bakery starts the month with 10,000 dollars in the bank (asset) from the owner (equity). It buys an oven for 4,000 dollars (asset), buys flour on credit for 1,000 dollars (liability), and sells bread for 3,000 dollars in cash (income). Assets: bank 9,000 + oven 4,000 + flour stock 1,000 = 14,000. Liabilities: 1,000. Equity: 10,000 + earnings 3,000 = 13,000. 14,000 = 1,000 + 13,000. The equation balances.",
        steps: [
          "For any item, ask: is it owned, owed, earned or spent?",
          "Classify it as asset, liability, equity, income or expense.",
          "Check the accounting equation after every set of entries.",
          "Calculate profit as income minus expenses.",
          "Keep cash and profit separate in your thinking."
        ],
        mistakes: [
          "Treating buying equipment as a normal expense.",
          "Confusing cash with profit.",
          "Not checking that the equation balances."
        ],
        terms: [["Asset", "Something the business owns or is owed that has value."], ["Liability", "Something the business owes."], ["Equity", "The owners' share: assets minus liabilities."], ["Profit", "Income minus expenses."]],
        tryit: "Classify these: rent paid, money owed by a customer, bank loan, sales of services, delivery van. State asset, liability, income or expense.",
        pts: ["Five groups: assets, liabilities, equity, income and expenses.", "Assets = Liabilities + Equity.", "Cash and profit are not the same thing."],
        qs: [
          { p: "A company owes a supplier 500 dollars. What is this?", o: ["Asset", "Liability", "Income"], a: 1 },
          { p: "Profit equals:", o: ["Income minus expenses", "Assets plus liabilities", "Cash in the bank"], a: 0 }
        ]
      },
      {
        t: "Double entry and the ledger",
        goal: "Explain debits and credits in simple words and record a transaction in two places.",
        body: [
          "Double-entry bookkeeping records every transaction twice: once as a debit and once as a credit, in different accounts, for equal amounts. This is why the books balance and why errors are easier to find. The words debit and credit only mean left side and right side. They do not mean 'good' or 'bad', and they do not mean 'increase' or 'decrease' by themselves.",
          "The rule of thumb: debits increase assets and expenses; credits increase liabilities, equity and income. The opposite reduces them. So when a business pays 500 dollars rent by bank transfer: debit Rent expense 500 (expenses go up), credit Bank 500 (asset goes down). When it sells goods for 200 cash: debit Cash 200 (asset up), credit Sales 200 (income up).",
          "Transactions are first written in a journal, a chronological list, with date, accounts, debit and credit amounts and a short description. Then they are posted to the ledger, where each account has its own page or sheet showing all entries and a running balance. A trial balance lists all ledger balances; the total of the debits must equal the total of the credits. If not, there is an error to find.",
          "Modern software does this for you, but you must understand what you are choosing. If you pick the wrong account when entering an invoice, the reports will be wrong even though the system looks 'balanced'. Always check the account, the amount, the date and the supporting document. Add a clear description and a reference number so anyone can trace the entry back to the paper."
        ],
        example: "On 5 May, a shop bought stationery for 80 dollars and paid by card. Journal: Debit Office supplies (expense) 80; Credit Bank 80; Description: 'Stationery, receipt 431'. The Office supplies account now shows 80 more expense, and the Bank account shows 80 less. The trial balance still balances because one debit of 80 matches one credit of 80.",
        steps: [
          "Identify the two accounts affected by the transaction.",
          "Decide which is debited and which is credited using the rule of thumb.",
          "Write the journal entry with date, accounts, amounts and reference.",
          "Post to the ledger and check the balances.",
          "Run a trial balance to check debits equal credits."
        ],
        mistakes: [
          "Choosing the wrong account.",
          "Recording only one side of a transaction.",
          "Leaving out the reference and description."
        ],
        terms: [["Debit / credit", "The left and right sides of an entry; every transaction has both."], ["Journal", "The first record of transactions in date order."], ["Ledger", "The collection of accounts showing all entries and balances."], ["Trial balance", "A list of all balances that checks that debits equal credits."]],
        tryit: "Write the debit and credit for these: (1) the business receives 1,000 from a customer for an earlier invoice; (2) it pays 300 for electricity from the bank.",
        pts: ["Every transaction has a debit and a credit for equal amounts.", "Debits increase assets and expenses; credits increase liabilities, equity and income.", "A trial balance checks that the books balance."],
        qs: [
          { p: "Paying 500 rent from the bank: which is correct?", o: ["Debit Rent expense, credit Bank", "Debit Bank, credit Rent expense", "Credit both"], a: 0 },
          { p: "What does a trial balance check?", o: ["That total debits equal total credits", "How many customers you have", "The bank's profits"], a: 0 }
        ]
      },
      {
        t: "Invoices, payments and who owes whom",
        goal: "Handle sales and purchase invoices, track receivables and payables and understand payment terms.",
        body: [
          "Most businesses sell and buy on credit, which means the money is paid later. When you send a sales invoice, the customer owes you: this is an account receivable (an asset). When you get a supplier's purchase invoice, you owe them: this is an account payable (a liability). Tracking both accurately is a core part of accounting support.",
          "A good invoice has a unique number, the date, seller and buyer details, a clear description of goods or services, quantity, price, tax if any, the total, payment terms and payment details. Payment terms such as 'net 30' mean payment is due 30 days from the invoice date. Purchase invoices must be checked against the purchase order and delivery record before they are entered and approved.",
          "Keep an ageing list for receivables: who owes what and for how long (current, 30 days, 60 days, over 90). Money that is long overdue is less likely to be paid, so follow up early with a polite reminder, then firmer ones, and inform the manager if it becomes serious. For payables, plan payments to be on time, and use the available time without paying late, since late payments harm relationships and may carry penalties.",
          "Credit notes correct mistakes or record returns: a credit note reduces what a customer owes. Never delete or overwrite a posted invoice; issue a credit note and a new invoice so the trail stays clear. Keep every document in a sensible order, and record payments promptly by matching them to the invoice they pay, so the balance for each customer and supplier is always right."
        ],
        example: "A design company invoiced a client 2,000 dollars, net 30, on 1 March. On 31 March nothing had arrived. The support person sent a friendly reminder. On 15 April, still nothing, so she phoned. The client said the invoice had gone to the wrong person; it was paid two days later. Without the ageing list, the debt might have gone unnoticed for months.",
        steps: [
          "Create and send accurate invoices with a unique number and payment terms.",
          "Check purchase invoices against the order and delivery before entry.",
          "Record payments and match them to the correct invoices.",
          "Review the receivables ageing list every week and follow up.",
          "Use credit notes to correct mistakes instead of deleting."
        ],
        mistakes: [
          "Deleting or overwriting a posted invoice.",
          "Not chasing overdue payments.",
          "Paying supplier invoices without checking them."
        ],
        terms: [["Receivable", "Money a customer owes the business."], ["Payable", "Money the business owes a supplier."], ["Credit note", "A document that reduces the amount owed, for a return or correction."], ["Ageing list", "A list showing how long invoices have been unpaid."]],
        tryit: "Invoice 300 dated 1 June, net 30. Today is 20 July. How overdue is it and what would you do first?",
        pts: ["Receivables are owed to you; payables are owed by you.", "Check purchase invoices against orders and deliveries.", "Follow overdue invoices early and correct with credit notes."],
        qs: [
          { p: "What does 'net 30' mean?", o: ["Payment due 30 days after the invoice date", "A 30 percent discount", "Thirty items"], a: 0 },
          { p: "You find a mistake in a posted invoice. What should you do?", o: ["Delete it", "Issue a credit note and a corrected invoice", "Ignore it"], a: 1 }
        ]
      },
      {
        t: "Bank reconciliation and petty cash",
        goal: "Match the company's records with the bank statement and control small cash safely.",
        body: [
          "A bank reconciliation compares your accounting record of the bank account with the bank's own statement, to make sure both agree and to find any mistakes or missing items. It is one of the most important checks you will do, ideally every month or even every week.",
          "Differences occur for normal reasons. Timing differences: a cheque you wrote has not yet been cashed, or a deposit you made is not yet shown by the bank. Items you have not yet recorded: bank charges, interest or a customer payment made directly into the account. And real errors: a wrong amount, a duplicated entry or a payment you do not recognise. Your job is to explain every difference.",
          "The method is simple. Start with the bank statement's closing balance. Add deposits recorded in your books but not yet on the statement. Subtract payments recorded in your books but not yet on the statement. The result should equal the balance in your books. Tick each matching line on both lists. Anything left without a match needs investigation. Record missing items (such as bank fees) in your books and follow up on anything unexplained straight away, because it might be error or fraud.",
          "Petty cash is a small amount of physical cash kept for minor expenses. Control is essential: keep it locked, keep one person responsible, record every payment with a receipt or voucher, and count it regularly. At any time, cash in the box plus vouchers should equal the fixed starting amount (the float). When it is low, the custodian gets it topped up by presenting the vouchers. Never mix personal money with petty cash and never lend from it."
        ],
        example: "At month-end, the books showed 12,450 dollars but the bank statement showed 12,900 dollars. The support person found a 500-dollar cheque not yet cashed, subtracting it gave 12,400, and a 50-dollar bank fee not yet recorded in the books, which explained the last difference (12,450 minus 50 gives 12,400). Everything matched after the fee was recorded, and nothing was missing.",
        steps: [
          "Get the bank statement and your bank ledger for the same period.",
          "Tick each item that appears in both.",
          "List unmatched items and identify the reason for each.",
          "Adjust for timing differences and record missing items such as fees.",
          "Investigate any difference that remains and report it."
        ],
        mistakes: [
          "Skipping reconciliation for months.",
          "Forcing the numbers to agree without finding the reason.",
          "Keeping petty cash without receipts."
        ],
        terms: [["Bank reconciliation", "Comparing your bank records with the bank's statement and explaining differences."], ["Outstanding cheque", "A cheque issued but not yet cashed."], ["Petty cash", "A small amount of cash kept for minor expenses."], ["Float", "The fixed starting amount of petty cash."]],
        tryit: "Books: 8,200. Statement: 8,700. Uncashed cheque: 600. Bank fee not recorded: 100. Reconcile and show the steps.",
        pts: ["Reconcile the bank regularly and explain every difference.", "Timing differences, unrecorded items and errors are the usual causes.", "Control petty cash with vouchers, counts and one responsible person."],
        qs: [
          { p: "Which is a normal timing difference?", o: ["A cheque issued but not yet cashed", "A deleted invoice", "A new employee"], a: 0 },
          { p: "What should cash plus vouchers in the petty cash box equal?", o: ["The fixed float", "Zero", "The bank balance"], a: 0 }
        ]
      },
      {
        t: "Expenses, payroll basics and tax awareness",
        goal: "Process expense claims properly and understand simple payroll and tax duties.",
        body: [
          "Employees sometimes spend their own money for the business and claim it back. An expense claim should always be supported by a receipt, show the date, purpose and amount and be approved by the right manager before repayment. Check that the expense is allowed by policy, is not personal, is not claimed twice and is recorded in the right expense account.",
          "Payroll is paying employees. The basic ideas are: gross pay (the total before deductions), deductions (tax and social contributions required by law, and other agreed deductions) and net pay (what the employee receives). Every payment needs an accurate record: hours or salary, allowances, deductions and the payslip. Payroll data is strictly confidential and errors are serious, because people depend on their pay. Always double-check changes such as new bank details, and confirm them with the employee directly.",
          "Businesses may have to collect and pay taxes to the government, such as sales or value-added tax (VAT) and income tax. The details differ by country, so learn the rules in your workplace. As a support person, you help by recording taxes on invoices correctly, keeping documents in order and meeting deadlines. Paying late usually brings penalties. When you are not sure, ask the accountant instead of guessing.",
          "Finally, keep records for the period required by law, often five to ten years, in an organised way, so that they can be found. Back up digital records and protect them with passwords. Good records are your best defence in an audit, which is a check by an independent person on whether the accounts are correct and honest."
        ],
        example: "An employee claimed 60 dollars for a taxi with no receipt. The accounting supporter asked for the receipt, and the employee found the app receipt in his email. Another claim included a 45-dollar dinner that the receipt showed was for two people, one of them a friend. The claim was reduced to the business part. Clear rules and checks protected both the employee and the company.",
        steps: [
          "Require a receipt, date, purpose and amount for every claim.",
          "Check policy, duplicates and approval before repaying.",
          "For payroll, verify changes directly with the employee and check totals.",
          "Record taxes correctly and note deadlines.",
          "Keep and back up records for the legal period."
        ],
        mistakes: [
          "Repaying claims without receipts.",
          "Changing an employee's bank details on an email request alone.",
          "Missing tax deadlines."
        ],
        terms: [["Expense claim", "A request to be repaid for business money spent personally."], ["Gross / net pay", "Pay before deductions / pay received after deductions."], ["VAT", "Value-added tax: a tax added to sales of goods and services in many countries."], ["Audit", "An independent check of whether accounts are correct and honest."]],
        tryit: "Write a checklist of five questions you would ask before paying an expense claim.",
        pts: ["Every claim needs a receipt, purpose and approval.", "Payroll is confidential and changes must be verified.", "Keep records for the legal period and meet tax deadlines."],
        qs: [
          { p: "What is net pay?", o: ["Pay after deductions", "Pay before deductions", "A company's profit"], a: 0 },
          { p: "You receive an email asking to change an employee's bank details. What should you do?", o: ["Change them at once", "Verify directly with the employee first", "Ignore payroll"], a: 1 }
        ]
      },
      {
        t: "Reports, month-end and spotting mistakes",
        goal: "Prepare a simple month-end routine and read basic reports to spot problems.",
        body: [
          "Month-end is the routine that closes the books for the month so that reports can be produced. A checklist helps: record all invoices and payments, reconcile the bank and petty cash, check receivables and payables, record depreciation (the gradual using-up of equipment) and accrued costs (costs you have incurred but not yet been billed for), review unusual entries and run the trial balance.",
          "Two main reports come out of the books. The profit and loss statement (income statement) shows income, expenses and profit for a period. The balance sheet shows assets, liabilities and equity on a given date. A cash flow statement shows where cash came from and where it went. Together they show whether the business is profitable, what it owns and owes and whether it has enough cash.",
          "To read a report, do not stare at every number. Ask questions. Is income up or down against last month and last year? Which expenses are unusually high? Are receivables growing faster than sales, meaning customers pay slowly? Is cash falling even though profit is positive? Compare with the budget, the plan set in advance, and note big differences with reasons.",
          "Look for mistakes as well. Common ones: duplicated invoices, wrong account, wrong period (a January cost recorded in February), missing entries, transposed digits (54 instead of 45), and unusual round numbers. Tips: check totals with a rough estimate, look at large or odd entries and compare against last month. When you find an issue, correct it with a proper journal entry and a note, never by deleting. Report to your supervisor what you found and how you fixed it."
        ],
        example: "During month-end review, a support person noticed that electricity expense was 4,300 dollars, versus the usual 430. It was a typing slip, an extra zero. She corrected it with a journal entry and a note. Without the check, the profit and loss statement would have shown a 3,870-dollar phantom cost and the owner would have panicked about why costs had shot up.",
        steps: [
          "Follow a month-end checklist: record, reconcile, review and run the trial balance.",
          "Produce the profit and loss statement and the balance sheet.",
          "Compare with last month and the budget and ask why for big differences.",
          "Look for duplicates, wrong accounts, wrong periods and typing errors.",
          "Correct with journal entries and notes, and report to your supervisor."
        ],
        mistakes: [
          "Closing the month without reconciling.",
          "Correcting errors by deleting entries.",
          "Reading reports without comparing to anything."
        ],
        terms: [["Profit and loss statement", "A report of income, expenses and profit for a period."], ["Balance sheet", "A report of assets, liabilities and equity on a date."], ["Depreciation", "The gradual spreading of an asset's cost over its useful life."], ["Budget", "A plan of expected income and spending."]],
        tryit: "Income 20,000; salaries 8,000; rent 3,000; materials 5,000; other 1,500. Calculate the profit and say if you would be worried.",
        pts: ["Month-end uses a checklist to close the books.", "Profit and loss, balance sheet and cash flow together show the whole picture.", "Compare, ask why and correct mistakes properly."],
        qs: [
          { p: "Which report shows income, expenses and profit for a period?", o: ["Profit and loss statement", "Balance sheet", "Delivery note"], a: 0 },
          { p: "You find a wrong entry. What is the right way to fix it?", o: ["Delete it", "Correct it with a journal entry and a note", "Ignore it"], a: 1 }
        ]
      }
    ],
    lab: {
      title: "Reconcile the bank and fix the month-end",
      scenario: "You are an accounting assistant for a small design studio. It is 31 May and you must reconcile the bank account, check the customer and supplier lists and prepare a short summary for the owner. Some entries are wrong. Find them, correct them properly and explain the results in simple words.",
      cols: ["Item", "Details"],
      rows: [["Books: bank balance", "USD 14,200 at 31 May."], ["Bank statement closing balance", "USD 15,050 at 31 May."], ["Outstanding cheque", "Cheque 118 to a supplier, USD 900, issued 30 May, not yet cashed."], ["Bank statement items not in books", "Bank fee USD 50. Direct customer payment USD 0 (none)."], ["Deposit in books not yet at bank", "USD 100 cash deposited 31 May, will show 2 June."], ["Ledger checks", "Electricity expense recorded USD 6,200 (usual USD 620). Supplier invoice 344 for USD 750 entered twice. Customer invoice 91 for USD 1,800 is 65 days old and unpaid."]],
      tasks: ["Prepare the bank reconciliation: show each step and prove whether it agrees. State clearly if there is a difference that remains.", "List each ledger error and the correction you would make (journal entry and note), and state its effect on profit.", "Write the message you would send about invoice 91: a polite first reminder.", "Write a five-line month-end summary for the owner in simple words, including one risk and one suggestion."],
      hints: ["Start with the bank statement: 15,050. Subtract the outstanding cheque. Add the deposit in transit. Compare with the books adjusted for the bank fee.", "The electricity figure looks like an extra zero. The duplicated supplier invoice inflates both expenses and payables.", "Do not delete entries; correct them through journal entries."],
      rubric: ["The reconciliation is calculated step by step and any remaining difference is explained.", "Each ledger error is identified with a proper correction and effect on profit.", "The reminder is polite, clear and gives a next step.", "The owner summary is short, honest and in plain words."],
      deliverable: "A reconciliation, a list of corrections, a reminder message and an owner summary."
    }
  }
};
