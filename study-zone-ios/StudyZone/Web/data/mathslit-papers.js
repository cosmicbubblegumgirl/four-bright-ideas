const collection={2023:'https://www.education.gov.za/Curriculum/NationalSeniorCertificate%28NSC%29Examinations/2023NSCNovemberpastpapers.aspx',2024:'https://www.education.gov.za/2024NSCNovemberpastpapers.aspx',2025:'https://www.education.gov.za/Curriculum/NationalSeniorCertificate%28NSC%29Examinations/2025NovemberExamPapers.aspx'};
export const sources={
 '2023-1':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=2JxLqGZq7Cw%3D&mid=13723&portalid=0&tabid=5193',paper:'https://www.education.gov.za/LinkClick.aspx?fileticket=5VCFfxPhz6k%3D&mid=12680&portalid=0&tabid=4682'},
 '2023-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=qVim9petgX4%3D&mid=12680&portalid=0&tabid=4682'},
 '2024-1':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=AY2Qj8huxtE%3D&mid=13723&portalid=0&tabid=5193',paper:'https://www.education.gov.za/LinkClick.aspx?fileticket=r3H6xWQUYXg%3D&mid=13723&portalid=0&tabid=5193'},
 '2024-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=xrUiB59LW4E%3D&mid=13723&portalid=0&tabid=5193',paper:'https://www.education.gov.za/Portals/0/CD/2024%20November%20past%20papers/Mathematical%20Literacy%20P2%20Nov%202024%20Eng.pdf'},
 '2025-1':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=yfBLrkeMk2o%3D&mid=14844&portalid=0&tabid=5742',paper:'https://www.education.gov.za/LinkClick.aspx?fileticket=0fZnlOqdEo0%3D&mid=14844&portalid=0&tabid=5742'},
 '2025-2':{memo:'https://www.education.gov.za/LinkClick.aspx?fileticket=anKb8eamj_M%3D&mid=14844&portalid=0&tabid=5742',paper:'https://www.education.gov.za/LinkClick.aspx?fileticket=SlY1pYy3GT4%3D&mid=14844&portalid=0&tabid=5742'}
};
const Q=(year,paper,ref,topic,title,prompt,value,unit,steps,extra={})=>({id:`${year}-p${paper}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,year,paper,ref,topic,title,prompt,value,unit,steps,precision:2,source:{...sources[`${year}-${paper}`],collection:collection[year]},...extra});
export const pastPapers=[
 Q(2023,1,'1.1.5','data','A ratio with a clear order','Write 690 160 : 8 120 031 as 1 : n. Enter n to two decimals.',11.77,'n in 1 : n',[
 'Keep the quantities in the stated order.',
 'Divide both sides by 690 160: 690 160 ÷ 690 160 : 8 120 031 ÷ 690 160.',
 'The ratio is 1 : 11.7654… ≈ 1 : 11.77.'
 ],{memoPage:3}),
 Q(2023,1,'1.3.3','budget','Round the repayment','Round the stated monthly repayment of R41 610.78 to the nearest thousand rand.',42000,'R',[
 'The neighbouring thousands are R41 000 and R42 000.',
 'The midpoint is R41 500. R41 610.78 lies above it.',
 'The nearest thousand is R42 000.'
 ],{precision:0,memoPage:4}),
 Q(2023,1,'2.1.3','budget','What share goes to insurance?','Gross salary: R10 078.41. Deductions: R2 100.35. Insurance: R940.39 twice monthly. Find insurance as a percentage of net salary.',23.57,'%',[
 'Net salary = 10 078.41 − 2 100.35 = R7 978.06.',
 'Monthly insurance = 2 × 940.39 = R1 880.78.',
 'Percentage = 1 880.78 ÷ 7 978.06 × 100 = 23.57%. This is below 25%.'
 ],{memoPage:6}),
 Q(2023,1,'2.1.4','tax','Reverse the VAT, then change it','A R110 charge includes 15% VAT. Keep the underlying price unchanged and recalculate the charge at 14% VAT.',109.04,'R',[
 'Remove the included tax: 110 ÷ 1.15 = R95.65217391.',
 'Apply the replacement rate: 95.65217391 × 1.14.',
 'Round the final charge to cents: R109.04. Keep intermediate decimals.'
 ],{memoPage:7}),
 Q(2023,1,'2.2.1','tax','From monthly income to annual income','The monthly taxable income in this question is R8 978. Find the annual taxable income.',107736,'R',[
 'There are 12 months in a year.',
 'Annual taxable income = monthly taxable income × 12.',
 '8 978 × 12 = R107 736. Use the original paper’s tax table for the bracket.'
 ],{precision:0,memoPage:7}),
 Q(2023,1,'2.3.4','budget','Give the deficit its sign','Income is 313 792 and expenditure is 322 891, both in thousands of rand. Find the signed net result in those same units.',-9099,'thousand rand',[
 'Net result = income − expenditure.',
 '313 792 − 322 891 = −9 099.',
 'The negative result is a deficit of R9 099 thousand, not a surplus.'
 ],{precision:0,memoPage:9}),
 Q(2023,2,'1.2.3','maps','Add the whole route','A route has four labelled sections: 980 m, 435 m, 870 m and 1 100 m. Find the total distance.',3385,'m',[
 'All four sections already use metres.',
 '980 + 435 + 870 + 1 100 = 3 385.',
 'Total route distance = 3 385 m, or 3.385 km.'
 ],{precision:0,memoPage:3}),
 Q(2023,2,'2.1.5(b)','maps','The KZN plan scale','Use the KZN measurement: 12.5 cm on the plan represents 12 m. Express the scale as 1 : n. Enter n.',96,'n in 1 : n',[
 'Convert the real length to centimetres: 12 m = 1 200 cm.',
 'The ratio is 12.5 : 1 200. Divide both parts by 12.5.',
 'Scale = 1 : 96. Other print versions can have different measured lengths.'
 ],{precision:0,memoPage:5}),
 Q(2023,2,'2.3.6','travel','Will she reach work on time?','Departure is 04:55. Journey stages take 10, 20 and 5 minutes. Find the arrival time and compare it with a 05:30 start.',null,'24-hour time',[
 'Total journey time = 10 + 20 + 5 = 35 minutes.',
 '04:55 + 5 minutes = 05:00; another 30 minutes gives 05:30.',
 'Arrival is 05:30, exactly the stated starting time.'
 ],{accepted:['05:30','5:30'],answer:'05:30 · on time',memoPage:7}),
 Q(2023,2,'3.1.1','basics','Write the big number in full','Write 2.7 million eggs as an ordinary whole number.',2700000,'eggs',[
 'One million means 1 000 000.',
 'Multiply 2.7 × 1 000 000.',
 'The full number is 2 700 000 eggs.'
 ],{precision:0,memoPage:8}),
 Q(2023,2,'3.2.1','measurement','Twelve holes, one total volume','Each of 12 rectangular holes measures 30 cm × 30 cm × 60 cm. Find their combined volume in cubic metres.',.648,'m³',[
 'Convert dimensions: 30 cm = 0.3 m; 60 cm = 0.6 m.',
 'One hole: 0.3 × 0.3 × 0.6 = 0.054 m³.',
 'Twelve holes: 12 × 0.054 = 0.648 m³. Actual concrete would exclude space taken by the posts.'
 ],{precision:3,memoPage:8}),
 Q(2023,2,'3.2.3','measurement','Scale a concrete mixture','For 0.75 m³ of concrete, use 5.5 cement bags and two sand wheelbarrows per bag. Each wheelbarrow holds 102 kg. Find sand mass for 1 m³.',1496,'kg',[
 'Sand for 0.75 m³: 5.5 × 2 = 11 wheelbarrows.',
 'Mass for 0.75 m³: 11 × 102 = 1 122 kg.',
 'Mass for 1 m³: 1 122 ÷ 0.75 = 1 496 kg.'
 ],{precision:0,memoPage:9}),
 Q(2024,1,'1.2.2','budget','The basket total','Add the receipt amounts: R12.60, R45.56, R52.97, R40.68, R22.07, R37.73 and R86.80.',298.41,'R',[
 'Keep cents aligned while adding the seven amounts.',
 '12.60 + 45.56 + 52.97 + 40.68 + 22.07 + 37.73 + 86.80.',
 'The receipt total is R298.41.'
 ],{memoPage:3}),
 Q(2024,1,'1.2.3','budget','What does a dozen cost?','A pack of 18 eggs costs R52.97. Find the equivalent cost for 12 eggs.',35.31,'R',[
 '18 eggs = 1.5 dozen.',
 'Price per dozen = 52.97 ÷ 1.5 = R35.313333…',
 'Round only at the end: R35.31 per dozen.'
 ],{memoPage:3}),
 Q(2024,1,'2.1.2','tax','Find the tax inside the payment','The electricity payment is R1 300 including VAT; the exclusive amount is R1 130.43. Find the VAT by subtraction.',169.57,'R',[
 'An inclusive total contains both the underlying price and VAT.',
 'VAT = 1 300.00 − 1 130.43.',
 'VAT = R169.57. Multiplying the rounded exclusive amount can differ by one cent.'
 ],{memoPage:5}),
 Q(2024,1,'2.1.3','tariffs','Two blocks, one electricity purchase','Use R1 130.43 before VAT: the first 350 kWh cost R2.19/kWh; further units cost R2.91/kWh. Find total kWh purchased.',475.06,'kWh',[
 'First block cost = 350 × 2.19 = R766.50.',
 'Money left = 1 130.43 − 766.50 = R363.93.',
 'Second block = 363.93 ÷ 2.91 = 125.0618557 kWh.',
 'Total = 350 + 125.0618557 ≈ 475.06 kWh.'
 ],{memoPage:5}),
 Q(2024,1,'4.2.2','data','Find the middle of the list','Find the median of 90, 150, 160, 180, 200, 215, 230, 350 and 400.',200,'',[
 'The nine values are already in ascending order.',
 'Middle position = (9 + 1) ÷ 2 = 5.',
 'The fifth value is 200, so the median is 200.'
 ],{precision:0,memoPage:13}),
 Q(2024,1,'4.2.3','data','Compare the spread','For 2022 the minimum and maximum are 70 and 360; for 2023 they are 90 and 400. How much larger is the 2023 range?',20,'',[
 'Range for 2022 = 360 − 70 = 290.',
 'Range for 2023 = 400 − 90 = 310.',
 'Difference = 310 − 290 = 20. The 2023 range is larger.'
 ],{precision:0,focus:'Range comparison within the original item',memoPage:14}),
 Q(2024,2,'1.2.1','measurement','Millimetres to metres','Convert the stated brick length of 220 mm to metres.',.22,'m',[
 'There are 1 000 millimetres in one metre.',
 'Metres = millimetres ÷ 1 000.',
 '220 ÷ 1 000 = 0.22 m.'
 ],{memoPage:2}),
 Q(2024,2,'1.2.3','measurement','How many bricks fit?','A row is 2 860 mm long. Each brick is 220 mm long. Using the paper’s measurements, find the number of bricks in the row.',13,'bricks',[
 'The row and brick lengths have matching units.',
 'Number = 2 860 ÷ 220.',
 'Exactly 13 bricks fit the stated length.'
 ],{precision:0,memoPage:2}),
 Q(2024,2,'2.1.5','probability','Three sites out of thirteen','The favourable set has 3 sites out of 13 equally likely sites. Express the probability as a percentage to two decimals.',23.08,'%',[
 'Probability = favourable outcomes ÷ total outcomes = 3/13.',
 'Convert to a percentage: 3 ÷ 13 × 100 = 23.076923…',
 'Rounded to two decimals: 23.08%.'
 ],{memoPage:4}),
 Q(2024,2,'2.1.6(b)','maps','Reduce a measured scale','A measured 90 mm represents 8.2 m. Find 1 : n, rounding n to the nearest whole number.',91,'n in 1 : n',[
 'Match units: 8.2 m = 8 200 mm.',
 '90 : 8 200 = 1 : (8 200 ÷ 90) = 1 : 91.111…',
 'The requested rounded scale is 1 : 91.'
 ],{precision:0,memoPage:5}),
 Q(2024,2,'3.1.1','travel','A clock that crosses the hour','Calculate the elapsed time from 12:55 to 14:13 on the same day. Enter total minutes.',78,'minutes',[
 '12:55 to 13:00 takes 5 minutes.',
 '13:00 to 14:00 takes 60 minutes; 14:00 to 14:13 takes 13.',
 'Total = 5 + 60 + 13 = 78 minutes, or 1 hour 18 minutes.'
 ],{precision:0,memoPage:7}),
 Q(2024,2,'3.2.2','measurement','Halfway across the circle','A circular shape has a diameter of 8 cm. Find its radius.',4,'cm',[
 'A diameter is twice the radius.',
 'Radius = diameter ÷ 2.',
 '8 ÷ 2 = 4 cm.'
 ],{precision:0,memoPage:8}),
 Q(2025,1,'1.1.2','budget','Bring the pack down to one kilogram','A 5 kg pack costs R41.41. Find its unit price per kilogram.',8.28,'R/kg',[
 'Divide the pack price by its mass.',
 '41.41 ÷ 5 = R8.282 per kilogram.',
 'To the nearest cent: R8.28/kg.'
 ],{memoPage:2}),
 Q(2025,1,'2.1.3','budget','Split the medical contribution','The employee’s R2 531.54 contribution is twice the employer’s contribution. Find the employer’s share.',1265.77,'R',[
 'The employee pays two equal parts and the employer one.',
 'One part = 2 531.54 ÷ 2.',
 'The employer contributes R1 265.77.'
 ],{memoPage:5}),
 Q(2025,1,'2.1.4(b)','budget','The salary that reaches the account','Gross salary is R35 000. Deduct UIF R177.12, PAYE R6 298 and medical aid R2 531.54. Find net salary.',25993.34,'R',[
 'Total deductions = 177.12 + 6 298 + 2 531.54 = R9 006.66.',
 'Net salary = gross salary − deductions.',
 '35 000 − 9 006.66 = R25 993.34.'
 ],{memoPage:6}),
 Q(2025,1,'2.2.1','budget','A smaller fare, a bigger saving','A fare drops from R14.20 to R4.20. Find the percentage saving against the original fare.',70.42,'%',[
 'Saving per trip = 14.20 − 4.20 = R10.',
 'Compare with the original fare: 10 ÷ 14.20 × 100.',
 'The saving is 70.422535…% ≈ 70.42%.'
 ],{memoPage:8}),
 Q(2025,1,'3.1.1','data','The median between two values','Find the median of 43%, 46%, 51%, 54%, 56% and 57%.',52.5,'%',[
 'Six values means two middle positions: third and fourth.',
 'The middle values are 51% and 54%.',
 'Median = (51 + 54) ÷ 2 = 52.5%.'
 ],{memoPage:11}),
 Q(2025,1,'3.1.3(a)','data','Recover the whole population','405 000 000 users represent 54% of the total. Find the total number of users.',750000000,'users',[
 '54% of the whole is 405 000 000.',
 'Whole = part ÷ proportion = 405 000 000 ÷ 0.54.',
 'The total is 750 000 000 users.'
 ],{precision:0,memoPage:11}),
 Q(2025,2,'1.2.2','basics','One third of the passengers','Find one third of 189 passengers.',63,'passengers',[
 'One third means divide the total into three equal groups.',
 '189 ÷ 3 = 63.',
 'One group contains 63 passengers.'
 ],{precision:0,memoPage:3}),
 Q(2025,2,'1.3.3','measurement','A geyser in millimetres','Convert the geyser’s length of 1.2 m to millimetres.',1200,'mm',[
 'One metre equals 1 000 mm.',
 'Millimetres = metres × 1 000.',
 '1.2 × 1 000 = 1 200 mm.'
 ],{precision:0,memoPage:4}),
 Q(2025,2,'2.1.1','maps','Count the usable seats','Use the seating figures: 59 + 22 seats, with 4 excluded. Calculate the usable total.',77,'seats',[
 'Start with both groups: 59 + 22 = 81.',
 'Subtract the four excluded seats.',
 '81 − 4 = 77 usable seats.'
 ],{precision:0,memoPage:5}),
 Q(2025,2,'2.2.4','maps','Trace the tour on the map','A scale bar measures 1.3 cm for 500 m. How many centimetres on the map represent 19.2 km?',49.92,'cm',[
 'Convert 500 m to 0.5 km.',
 'Number of scale-bar lengths = 19.2 ÷ 0.5 = 38.4.',
 'Map length = 38.4 × 1.3 = 49.92 cm.'
 ],{memoPage:5}),
 Q(2025,2,'3.2.2','measurement','Round the circumference sensibly','The circle’s radius is 14 mm. Use π = 3.142 and round the circumference to the nearest millimetre.',88,'mm',[
 'Circumference = 2πr.',
 '2 × 3.142 × 14 = 87.976 mm.',
 'To the nearest millimetre, the circumference is 88 mm.'
 ],{precision:0,memoPage:9}),
 Q(2025,2,'4.2.5','travel','Compare kilometres with miles','Compare 770 km with 311.72 miles, using 1 mile = 1.60934 km. Find the extra distance in kilometres, to two decimals.',268.34,'km',[
 'Convert miles first: 311.72 × 1.60934 = 501.6634648 km.',
 'Extra distance = 770 − 501.6634648 = 268.3365352 km.',
 'Rounded extra distance = 268.34 km.'
 ],{focus:'Distance calculation within the original comparison',memoPage:11})
];
