const collection={2023:'https://www.education.gov.za/Curriculum/NationalSeniorCertificate%28NSC%29Examinations/2023NSCNovemberpastpapers.aspx',2024:'https://www.education.gov.za/2024NSCNovemberpastpapers.aspx',2025:'https://www.education.gov.za/Curriculum/NationalSeniorCertificate%28NSC%29Examinations/2025NovemberExamPapers.aspx'};
export const sources={
 '2023-1':{memo:'https://www.education.gov.za/Portals/0/CD/2023%20NovPapers/Non-Languages%20Nov%202023%20MG%20PDF/Accounting/Accounting%20P1%20Nov%202023%20MG%20Eng.pdf'},
 '2023-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=M6qQtM-sSAs%3D&mid=12660&portalid=0&tabid=4682',paper:'https://www.education.gov.za/Portals/0/CD/2023%20NovPapers/Non-Languages%20November%202023%20PDF/Accounting/P2/Accounting%20P2%20Nov%202023%20Eng.pdf'},
 '2024-1':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=3dYVxFZTk1o%3D&mid=13703&portalid=0&tabid=5193'},
 '2024-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=ccWKxzmiifk%3D&mid=13703&portalid=0&tabid=5193',paper:'https://www.education.gov.za/LinkClick.aspx?fileticket=tJdE50Ec9zY%3D&mid=13703&portalid=0&tabid=5193'},
 '2025-1':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=oZyi7eQjyEo%3D&mid=14825&portalid=0&tabid=5742',paper:'https://www.education.gov.za/Portals/0/CD/2025%20Nov%20QP/Non-Languages%20Nov%202025%20PDF/Accounting/P1/Accounting%20P1%20Nov%202025%20Eng.pdf?ver=2025-10-28-071559-010'},
 '2025-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=xBkE4RhcBtc%3D&mid=14825&portalid=0&tabid=5742'}
};
const Q=(year,paper,ref,topic,title,prompt,value,unit,steps,extra={})=>({id:`${year}-p${paper}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,year,paper,ref,topic,title,prompt,value,unit,steps,precision:2,source:{...sources[`${year}-${paper}`],collection:collection[year]},...extra});
export const pastPapers=[
 Q(2023,1,'1.1','inventory','The last costs stay behind','Closing bicycles: 700 at R2 100 each and 309 at R2 020 each under FIFO. Calculate closing stock value.',2094180,'R',[
 'Recent layer: 700 × R2 100 = R1 470 000.',
 'Earlier remaining layer: 309 × R2 020 = R624 180.',
 'FIFO closing value = 1 470 000 + 624 180 = R2 094 180.'
 ],{memoPage:2}),
 Q(2023,1,'1.2','income','Find the stock deficit','Recorded trading stock is R2 125 380; the physical valuation is R2 094 180. Find the deficit for the income statement.',31200,'R',[
 'A deficit is recorded stock less the physical value.',
 '2 125 380 − 2 094 180 = R31 200.',
 'The shortage is an expense; do not use the full stock balance as the expense.'
 ],{focus:'Trading stock deficit line',memoPage:2}),
 Q(2023,1,'1.3','position','The tax still owing','Income tax expense is R1 152 000 and provisional tax paid is R1 049 000. Find the year-end tax liability.',103000,'R',[
 'Compare tax owed for the year with tax already paid.',
 '1 152 000 − 1 049 000 = R103 000.',
 'The unpaid balance is a current liability to SARS.'
 ],{focus:'SARS income tax line',memoPage:3}),
 Q(2023,1,'2.1','companies','Recover the share issue proceeds','Opening share capital is R7 200 000; closing share capital is R9 306 000 after a R594 000 capital reduction for repurchased shares. Find new share proceeds.',2700000,'R',[
 'Closing capital = opening capital + new proceeds − capital repurchased.',
 'New proceeds = 9 306 000 − 7 200 000 + 594 000.',
 'The issue brought in R2 700 000.'
 ],{focus:'New share issue line',memoPage:4}),
 Q(2023,1,'2.2','cashflow','Dividends that used cash','Opening dividends payable are R288 000; current dividends are R732 000; closing dividends payable are R282 000. Calculate dividends paid.',738000,'R',[
 'Paid = opening payable + current dividends − closing payable.',
 '288 000 + 732 000 − 282 000 = R738 000.',
 'Show (R738 000) as a cash outflow in the cash flow statement.'
 ],{focus:'Dividends paid line',memoPage:4}),
 Q(2023,1,'2.3','ratios','Net assets for every share','Shareholders’ equity is R10 200 000 and 1 410 000 shares are in issue. Find NAV per share in cents to one decimal.',723.4,'cents',[
 'NAV in rand = equity ÷ issued shares.',
 '10 200 000 ÷ 1 410 000 = R7.23404255…',
 'Multiply by 100 and round: 723.4 cents per share.'
 ],{precision:1,memoPage:5}),
 Q(2023,2,'1.1.1','reconciliation','Bring the bank ledger up to date','Opening Bank is R49 100 debit. Corrected cash receipts total R98 840; cash payments total R138 660. Find the closing balance.',9280,'R',[
 'A debit Bank balance increases with receipts and decreases with payments.',
 '49 100 + 98 840 − 138 660 = R9 280.',
 'The closing Bank balance is R9 280 debit, a favourable balance.'
 ],{focus:'Bank ledger balance after corrected journals',memoPage:2}),
 Q(2023,2,'1.2.2','reconciliation','Settle the supplier account','Start with R64 950, add the R990 correction and subtract R9 540. Find the amount due to the supplier.',56400,'R',[
 'Apply the omitted increase: 64 950 + 990 = R65 940.',
 'Apply the reduction: 65 940 − 9 540.',
 'The amount to settle is R56 400.'
 ],{memoPage:3}),
 Q(2023,2,'2.1.1','manufacturing','Direct material used','Materials available cost R958 800 for 20 400 units. Production uses 18 900 units. Find direct material cost.',888300,'R',[
 'Cost per unit = 958 800 ÷ 20 400 = R47.',
 'Materials used cost = 18 900 × R47.',
 'Direct material cost = R888 300.'
 ],{memoPage:4}),
 Q(2023,2,'2.1.2','manufacturing','Repair the factory overhead total','Begin with R600 000 overheads. Remove R7 000, remove R33 600 and add R11 250. Find corrected factory overheads.',570650,'R',[
 'Subtract the two overstatements: 600 000 − 7 000 − 33 600.',
 'Add the missing insurance allocation of R11 250.',
 'Correct factory overheads = R570 650.'
 ],{focus:'Final total after the original cost allocations',memoPage:4}),
 Q(2023,2,'2.2.1','manufacturing','Confirm the break-even claim','Fixed costs equal 163 000 × R18.30. Selling price is R46 and variable cost is R26 per bulb. Find break-even units.',149145,'units',[
 'Fixed costs = 163 000 × 18.30 = R2 982 900.',
 'Contribution per bulb = 46 − 26 = R20.',
 'BEP = 2 982 900 ÷ 20 = 149 145 bulbs.'
 ],{precision:0,memoPage:5}),
 Q(2023,2,'4.2.1','inventory','Value each printer model','Hawi: 90 opening + 340 purchased − 5 returned − 300 sold, at R3 800. Yama: 495 purchased − 430 sold, at R5 410. Value the remaining stock.',826650,'R',[
 'Hawi units = 90 + 340 − 5 − 300 = 125; value = 125 × 3 800 = R475 000.',
 'Yama units = 495 − 430 = 65; value = 65 × 5 410 = R351 650.',
 'Specific identification total = 475 000 + 351 650 = R826 650.'
 ],{memoPage:9}),
 Q(2024,1,'1.1.1','income','The equipment depreciation movement','Accumulated equipment depreciation rises from R344 700 to R472 500. Find the depreciation expense represented by this movement.',127800,'R',[
 'Use the change in accumulated depreciation for the equipment in this item.',
 '472 500 − 344 700 = R127 800.',
 'Depreciation reduces profit and carrying value; it is not a new cash payment.'
 ],{memoPage:2}),
 Q(2024,1,'1.1.2','position','Track the vehicle cost account','Opening vehicle cost is R1 250 000; dispose of cost R240 000 and add a vehicle costing R320 000. Find closing cost.',1330000,'R',[
 'Remove the disposed vehicle at its original cost.',
 '1 250 000 − 240 000 + 320 000.',
 'Closing vehicle cost = R1 330 000. This is cost, not carrying value.'
 ],{memoPage:2}),
 Q(2024,1,'1.1.3','income','Three depreciation pieces','New vehicle: R320 000 at 20% for six months. Traded vehicle: opening carrying value R166 400 at 20% for six months. Remaining vehicles’ charge: R132 720. Find total depreciation.',181360,'R',[
 'New vehicle: 320 000 × 20% × 6/12 = R32 000.',
 'Traded vehicle: 166 400 × 20% × 6/12 = R16 640.',
 'Total = 32 000 + 16 640 + 132 720 = R181 360.'
 ],{memoPage:2}),
 Q(2024,1,'1.1.4','income','Profit on the traded vehicle','Vehicle cost: R240 000. Accumulated depreciation at disposal: R90 240. Trade-in proceeds: R153 660. Find the disposal profit.',3900,'R',[
 'Carrying value = 240 000 − 90 240 = R149 760.',
 'Profit = proceeds − carrying value = 153 660 − 149 760.',
 'The disposal produces a profit of R3 900.'
 ],{memoPage:2}),
 Q(2024,1,'1.2','income','Keep next year’s insurance out','Insurance paid is R100 800 for 15 equal months, including three months after year-end. Find the current year’s expense.',80640,'R',[
 'Monthly cost = 100 800 ÷ 15 = R6 720.',
 'Prepaid insurance = 3 × 6 720 = R20 160.',
 'Current expense = 100 800 − 20 160 = R80 640.'
 ],{focus:'Insurance adjustment line',memoPage:3}),
 Q(2024,1,'2.2','cashflow','The full cash cost of a buy-back','Repurchase 34 000 shares. The average issue price is R7.60 and the additional retained-income part is R1.90 per share. Find total cash paid.',323000,'R',[
 'Capital part = 34 000 × 7.60 = R258 400.',
 'Retained-income part = 34 000 × 1.90 = R64 600.',
 'Cash paid = 258 400 + 64 600 = R323 000; show it as an outflow.'
 ],{focus:'Shares repurchased in financing activities',memoPage:5}),
 Q(2024,2,'1.2.1','reconciliation','Correct the debtors control balance','Start at R359 100. Apply +R4 500, −R11 000 and the net correction R5 200 − R2 500. Find the corrected control balance.',355300,'R',[
 'Net correction for the last item = 5 200 − 2 500 = R2 700.',
 'Corrected balance = 359 100 + 4 500 − 11 000 + 2 700.',
 'Debtors control = R355 300; compare it with the corrected debtors list.'
 ],{memoPage:2}),
 Q(2024,2,'1.4(B)','vat','Output VAT after sales returns','Use the question’s 15% VAT rate. Exclusive sales are R139 200 and exclusive returns are R9 200. Find the net output VAT.',19500,'R',[
 'Net taxable sales = 139 200 − 9 200 = R130 000.',
 'Output VAT = 130 000 × 15/100.',
 'Output VAT is R19 500 and increases VAT payable.'
 ],{memoPage:3}),
 Q(2024,2,'2.2.1','ratios','Mark-up is based on cost','Trousers sell at R920 and cost R500 each. Calculate the mark-up percentage on cost.',84,'%',[
 'Gross profit per pair = 920 − 500 = R420.',
 'Mark-up = gross profit ÷ cost × 100.',
 '420 ÷ 500 × 100 = 84%. Dividing by selling price would calculate a margin.'
 ],{focus:'Mark-up calculation',precision:0,memoPage:5}),
 Q(2024,2,'3.2.1','budgets','Work backwards to credit purchases','Cash sales of R103 200 are 60% of total sales. Mark-up on cost is 25%, and purchases replace goods sold in the same month. Find November credit purchases.',137600,'R',[
 'Total sales = 103 200 ÷ 60% = R172 000.',
 'With 25% mark-up, selling price is 125% of cost.',
 'Purchases at cost = 172 000 ÷ 1.25 = R137 600.'
 ],{memoPage:7}),
 Q(2024,2,'3.2.2(i)','budgets','Budget for the rental increase','Monthly rent is R29 000 before a 6% increase. Calculate the December rent after the increase.',30740,'R',[
 'Increase = 29 000 × 6% = R1 740.',
 'New rent = 29 000 + 1 740.',
 'December rent = R30 740. Equivalently, 29 000 × 1.06.'
 ],{memoPage:8}),
 Q(2024,2,'3.2.2(ii)','budgets','Interest after repaying part of a loan','A R300 000 loan is reduced by R60 000 before December. Use 14% annual interest to calculate one month’s interest on the remaining balance.',2800,'R',[
 'Remaining principal = 300 000 − 60 000 = R240 000.',
 'Annual interest at this balance = 240 000 × 14% = R33 600.',
 'One month’s interest = 33 600 ÷ 12 = R2 800.'
 ],{memoPage:8}),
 Q(2025,1,'1.1','inventory','Weighted average, then closing units','Opening: 300 shirts costing R97 500. Purchases: 4 800 shirts costing R1 605 000. Returns: 100 shirts costing R42 500. Value 820 closing shirts using weighted average.',272240,'R',[
 'Net units = 300 + 4 800 − 100 = 5 000.',
 'Net cost = 97 500 + 1 605 000 − 42 500 = R1 660 000.',
 'Average unit cost = 1 660 000 ÷ 5 000 = R332.',
 'Closing inventory = 820 × R332 = R272 240.'
 ],{memoPage:2}),
 Q(2025,1,'1.2','companies','Find the new share proceeds','Share capital starts at R11 395 000 and ends at R17 875 000, after R975 000 of capital is removed in a buy-back. Calculate new share proceeds.',7455000,'R',[
 'New proceeds must cover the net capital increase and the capital repurchased.',
 '17 875 000 − 11 395 000 + 975 000.',
 'New share proceeds = R7 455 000.'
 ],{focus:'Shares issued during the year',memoPage:2}),
 Q(2025,1,'1.3','position','The fixed deposit still invested','R320 000 represents 40% of the deposit. Find the remaining non-current 60%.',480000,'R',[
 'Full deposit = 320 000 ÷ 40% = R800 000.',
 'Remaining portion = 800 000 × 60%.',
 'The non-current fixed deposit is R480 000.'
 ],{focus:'Time Bank fixed deposit line',memoPage:3}),
 Q(2025,1,'1.3','ratios','Use the current ratio in reverse','Current assets total R5 798 000. The current ratio is 1.3 : 1. Find current liabilities.',4460000,'R',[
 'Current ratio = current assets ÷ current liabilities.',
 'Current liabilities = 5 798 000 ÷ 1.3.',
 'Current liabilities total R4 460 000.'
 ],{focus:'Current liabilities total',memoPage:3}),
 Q(2025,1,'1.3','position','Keep the long-term loan separate','The year-end loan balance is R3 200 000. Next year’s instalments total R540 000, including R290 000 interest. Find the non-current loan portion.',2950000,'R',[
 'Principal due next year = instalments − interest = 540 000 − 290 000 = R250 000.',
 'Classify this R250 000 as the current portion of the loan.',
 'Non-current portion = 3 200 000 − 250 000 = R2 950 000.'
 ],{focus:'Mortgage loan line; use the original item’s classification',memoPage:3}),
 Q(2025,1,'1.3','companies','The dividend still payable','There are 2 750 000 shares, with a declared final dividend of 90 cents per share. Find shareholders for dividends.',2475000,'R',[
 'Convert 90 cents to R0.90.',
 'Dividend payable = 2 750 000 × R0.90.',
 'Shareholders for dividends = R2 475 000, a current liability until paid.'
 ],{focus:'Shareholders for dividends line',memoPage:3}),
 Q(2025,2,'1.1.2','reconciliation','Reconcile the bank statement','Begin with R119 080. Add R41 850 and R11 000; subtract R7 650, R10 800 and R13 000, as classified in the original reconciliation. Find the Bank account balance.',140480,'R',[
 'Total additions = 41 850 + 11 000 = R52 850.',
 'Total deductions = 7 650 + 10 800 + 13 000 = R31 450.',
 'Adjusted balance = 119 080 + 52 850 − 31 450 = R140 480.'
 ],{memoPage:3}),
 Q(2025,2,'2.1.1','inventory','Close the FIFO layers','Closing stock is 980 juice units. The latest remaining layer is 850 − 32 units at R42; the other closing units cost R37. Find closing stock value.',40350,'R',[
 'Latest layer = 850 − 32 = 818 units; value = 818 × 42 = R34 356.',
 'Other closing units = 980 − 818 = 162; value = 162 × 37 = R5 994.',
 'FIFO closing stock = 34 356 + 5 994 = R40 350.'
 ],{memoPage:5}),
 Q(2025,2,'2.1.2','inventory','The expired juice layer','The source’s FIFO stock analysis identifies 12 expired units costing R37 each. Find the cost of that expired stock.',444,'R',[
 'Use cost rather than selling price for the stock valuation.',
 'Expired stock cost = 12 × R37.',
 'The expired layer is worth R444.'
 ],{memoPage:5}),
 Q(2025,2,'2.2.2','inventory','How long will the stock last?','Opening Punchies stock is 25 units; purchases are 110 units; closing stock is 35. Use closing stock to calculate the stockholding period in days.',127.8,'days',[
 'Units sold = 25 + 110 − 35 = 100.',
 'Closing stockholding period = 35 ÷ 100 × 365.',
 'The period is 127.75 days ≈ 127.8 days, using the requested one decimal.'
 ],{precision:1,focus:'Stockholding-period calculation',memoPage:6}),
 Q(2025,2,'3.2.1','manufacturing','Minimum output to break even','Fixed costs equal 28 750 × R80. Selling price is R265 and variable cost R146 per case. Find the minimum whole-unit break-even output.',19328,'units',[
 'Fixed costs = 28 750 × 80 = R2 300 000.',
 'Contribution per case = 265 − 146 = R119.',
 'BEP = 2 300 000 ÷ 119 = 19 327.731…; round up to 19 328 whole units.'
 ],{precision:0,memoPage:9}),
 Q(2025,2,'4.1.3','budgets','January cash paid to creditors','The relevant purchases are R1 203 125. The schedule requires an 80% payment in January. Calculate that payment.',962500,'R',[
 'Use the payment proportion from the schedule, not the sales figure.',
 'Payment = 1 203 125 × 80/100.',
 'January’s creditor payment is R962 500.'
 ],{focus:'Payments to creditors in January',memoPage:11}),
 Q(2023,2,'1.1.3','ethics','Two controls for missing cash','Give two practical controls that address missing cash during receiving and banking.',null,'',[
 'Identify where the cash can go missing: receiving, recording or transporting it.',
 'Separate receiving and banking duties; independently compare receipts with deposits.',
 'Add a second practical control, such as verified bank deposit alerts or secure cash transport.'
 ],{written:true,answer:'Two distinct, practical controls linked to receiving and banking cash.',memoPage:3}),
 Q(2024,2,'1.3.2','ethics','Help debtors pay on time','Give two specific steps the owner can take to improve collection from overdue debtors.',null,'',[
 'Link the response to overdue collection, rather than giving a vague instruction.',
 'Send scheduled reminders and follow up overdue accounts using the age analysis.',
 'Review credit limits or block further credit for debtors who repeatedly breach terms. This item’s memo does not accept discounts or interest as the advice.'
 ],{written:true,answer:'Two relevant collection controls, such as reminders and reviewing or suspending credit.',memoPage:3}),
 Q(2025,2,'1.1.3','ethics','Match each cash problem to a control','Use two source problems: R10 000 missing cash and an unpaid R2 700 debit order. Explain a different preventive control for each.',null,'',[
 'For missing R10 000, identify a cash-handling control such as independent deposit checks or secure collection.',
 'For the unpaid R2 700 debit order, use a cash forecast and a due-date alert to keep sufficient funds available.',
 'State the problem, its figure and a distinct matching solution for each case.'
 ],{written:true,answer:'A cash-handling control for R10 000 and a cash-planning control for R2 700.',memoPage:3})
];
