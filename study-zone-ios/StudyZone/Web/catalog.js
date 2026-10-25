export const SOURCES={caps:'https://www.education.gov.za/Curriculum/CurriculumAssessmentPolicyStatements(CAPS)/CAPSFET/tabid/570/Default.aspx',papers:'https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers.aspx',guides:'https://www.education.gov.za/Curriculum/LearningandTeachingSupportMaterials(LTSM)/MindtheGapStudyGuides.aspx',languages:'https://www.thutong.doe.gov.za/Default.aspx?alias=www.thutong.doe.gov.za%2Fnonofficiallanguages',ieb:'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate'};
const mk=(id,name,group,icon,description,rows,q,choices,answer,why,worked)=>({id,name,group,icon,description,topics:rows.map((r,i)=>{const [title,summary]=r.split('|');return{id:id+'-'+i,title,summary,lessons:[['The idea',summary],['Make it stick','Close your notes. Explain '+title.toLowerCase()+' in your own words, add a labelled example, then compare with your textbook.'],['Exam approach','Read the command word, choose relevant evidence and connect each point to the question. Use the official curriculum and your prescribed material to check the full scope.']],tip:'Use the question’s context. A definition alone may not answer an application question.'}}),quiz:{q,choices,correct:answer,why},worked});
const W=(question,steps)=>({question,steps:steps.map((text,i)=>({title:['Read the task','Choose the method','Apply the idea','Check the answer'][Math.min(i,3)],text}))});
export const subjects=[
mk('mathematics','Mathematics','Numbers & science','∑','Patterns, graphs and the satisfying moment it clicks.',[], '',[],0,''),
mk('physical-sciences','Physical Sciences','Numbers & science','⚛','From moving trolleys to reacting particles.',[], '',[],0,''),
mk('maths-literacy','Mathematical Literacy','Numbers & science','%','Make sense of the numbers in everyday life.',[], '',[],0,''),
mk('accounting','Accounting','Business & society','R','Every entry tells a story. Follow the money.',[], '',[],0,''),
mk('life-sciences','Life Sciences','Numbers & science','✿','Life, inheritance and the connections between them.',[
'DNA & protein synthesis|DNA carries genetic information. Transcription produces mRNA from a DNA template; translation uses the mRNA code at a ribosome to assemble amino acids into a protein.',
'Meiosis|One DNA replication is followed by two divisions, producing haploid cells. Crossing over and independent assortment create variation. Homologous chromosomes separate in meiosis I.',
'Genetics & inheritance|Distinguish an allele from a gene, and genotype from phenotype. Use the parental genotypes to form gametes before completing a genetic cross.',
'Human reproduction|Follow gamete formation, fertilisation, implantation and hormonal control. Fertilisation usually occurs in an oviduct; implantation occurs in the uterine lining.',
'Responding to the environment|Receptors detect stimuli; nervous and endocrine systems coordinate responses. Negative feedback counteracts a deviation from a normal range.',
'Evolution & human origins|Natural selection acts on inherited variation. Individuals with advantageous traits may leave more offspring; populations change across generations, not because organisms decide to adapt.'
],'Which process produces haploid gametes?',['Mitosis','Meiosis','Fertilisation','Translation'],1,'Meiosis halves the chromosome number; fertilisation restores the diploid number.',W('Two heterozygous parents, Aa × Aa, have a child. Find the probability of genotype aa under simple Mendelian inheritance.',['Each parent can contribute an A or an a allele.','Combine gametes in a 2 × 2 Punnett square: AA, Aa, Aa, aa.','One of the four equally likely combinations is aa.','P(aa) = 1/4 = 25%. Each conception is a new independent event.'])),
mk('geography','Geography','Business & society','◎','Read the landscape, the weather and the map.',[
'Climate & weather|Track pressure, wind and moisture through mid-latitude cyclones, tropical cyclones and anticyclonic circulation. Explain causes before describing weather effects.',
'Geomorphology|A drainage basin is the area drained by a river and its tributaries. Link river profiles, erosion, deposition and river capture to landscape evidence.',
'Rural & urban settlement|Describe settlement patterns, land use, migration and urban challenges. Distinguish the site of a settlement from its situation relative to other places.',
'Economic geography of South Africa|Connect primary, secondary and tertiary activities to location, resources, infrastructure and markets. Use evidence when evaluating development strategies.',
'Mapwork & GIS|Read scale, contours, bearings and coordinates. GIS stores and analyses spatial data; vector points, lines and polygons differ from raster cells.',
'Geographical investigation|Formulate a geographical question, gather suitable evidence, represent it clearly and evaluate limitations before drawing conclusions.'
],'At a scale of 1 : 50 000, 2 cm represents…',['100 m','1 km','10 km','100 km'],1,'2 × 50 000 = 100 000 cm = 1 km.',W('A road measures 6 cm on a 1 : 50 000 map. Calculate the real distance.',['Keep map and ground distances in the same starting unit.','Ground distance = 6 × 50 000 = 300 000 cm.','There are 100 000 cm in one kilometre.','300 000 ÷ 100 000 = 3 km.'])),
mk('history','History','Business & society','⌛','Evidence first. Then build an argument.',[
'The Cold War|Compare the competing ideologies and power interests of the USA and USSR. Separate long-term causes, immediate triggers and consequences in case studies.',
'Independent Africa|Use prescribed case studies to analyse political, social and economic challenges after independence. Avoid treating the continent as one identical experience.',
'Civil society protests|Explain how civil rights and Black Power movements challenged discrimination. Link aims, methods, leadership and outcomes to specific evidence.',
'Civil resistance in South Africa|Trace resistance and state responses during the 1970s and 1980s. Explain the contribution of organisations, communities and international pressure.',
'The coming of democracy|Analyse negotiation, conflict and compromise in the transition to democracy. Distinguish a chronology of events from an explanation of why they mattered.',
'Source skills & globalisation|Identify origin, purpose, perspective and context. Evaluate usefulness for a particular enquiry and corroborate claims across sources.'
],'Which best strengthens a historical argument?',['A long introduction','Relevant evidence linked to the claim','Repeating the question','Ignoring opposing evidence'],1,'An argument needs a clear position supported by relevant evidence and explanation.',W('How would you evaluate a political speech as a source?',['Identify who spoke, when, to whom and in what context.','Consider the purpose: persuasion, mobilisation, justification or information.','Select a specific claim and compare it with other contemporary evidence.','Explain usefulness and limitations for the enquiry; bias does not make a source automatically useless.'])),
mk('business-studies','Business Studies','Business & society','↗','Turn business concepts into practical decisions.',[
'Business environments|Analyse macro, market and micro environments. A business controls its micro environment more directly than the external environments.',
'Business strategies|Use SWOT to identify strengths, weaknesses, opportunities and threats. Match a strategy to the actual problem and evaluate its likely effect.',
'Human resources|Distinguish recruitment, selection, induction, placement and training. Apply the relevant workplace principles to the scenario.',
'Business roles|Connect ethics, professionalism, social responsibility and teamwork to business conduct. Support recommendations with reasons.',
'Business ventures|Compare forms of ownership, investment choices, insurance and presentation methods using the requirements and risks given.',
'Business operations|Connect quality management to purchasing, production, administration and customer service. Explain how a control improves an outcome.'
],'Which belongs in the macro environment?',['A staff roster','A firm’s filing system','A nationwide economic downturn','A company logo'],2,'The wider economy is outside a single firm’s direct control.',W('A shop receives repeated complaints about late deliveries. Recommend a practical improvement.',['Identify the problem: delivery reliability, rather than product quality alone.','Record promised dates, actual dates and reasons for delays.','Set supplier performance targets and arrange alternatives for repeated failures.','Review on-time delivery rates and customer feedback to judge the improvement.'])),
mk('economics','Economics','Business & society','▥','Follow incentives, markets and the bigger picture.',[
'Circular flow|Households, firms, government and the foreign sector exchange goods, services and income. Injections and leakages affect the level of economic activity.',
'Business cycles|Distinguish expansion, peak, contraction and trough. Use indicators as evidence rather than assuming one observation proves a trend.',
'Public sector & foreign exchange|Explain government’s economic role and how currency markets respond to demand and supply. Distinguish appreciation from depreciation.',
'Market structures|Compare competition, monopolistic competition, oligopoly and monopoly using entry barriers, product type and pricing power.',
'Growth & development|Economic growth concerns real output; development also concerns living standards and opportunities. Compare indicators and their limits.',
'Inflation, tourism & sustainability|Inflation is a sustained rise in the general price level. Evaluate economic benefits alongside distributional and environmental costs.'
],'If nominal income rises by 4% and prices rise by 7%, purchasing power generally…',['Rises','Falls','Stays exactly the same','Cannot ever change'],1,'Prices have risen faster than income, so the income buys fewer goods and services.',W('A price index rises from 120 to 126. Calculate the inflation rate over the period.',['Find the change: 126 − 120 = 6 index points.','Use the original index as the base.','Inflation rate = 6 ÷ 120 × 100.','The increase is 5%.'])),
mk('life-orientation','Life Orientation','Life & services','☀','Your wellbeing, your choices, your next chapter.',[
'Development of the self|Identify personal goals, stressors and coping strategies. Break a large goal into realistic actions and seek support when a problem exceeds your resources.',
'Social & environmental responsibility|Evaluate how individual, community and institutional choices affect others. Support proposals with realistic actions and responsibilities.',
'Democracy & human rights|Distinguish rights from responsibilities and examine how participation, media and institutions can support democratic life.',
'Careers & career choices|Compare courses using entry requirements, interests, costs and application dates. Verify requirements with the institution itself.',
'Study skills|Use active recall, spaced practice and past-paper reflection. A study plan needs breaks and opportunities to correct mistakes.',
'Physical education|Plan participation suited to your circumstances and the school’s assessment requirements. Balance activity, rest and gradual progression.'
],'Which is a specific, measurable study action?',['Get clever','Study everything','Complete and check five algebra questions by 6 pm','Never take breaks'],2,'The action states what to do, how much to do and a clear deadline.',W('Turn “I want to improve in maths” into a workable weekly goal.',['Choose a focus using recent mistakes, for example quadratic equations.','Plan three 25-minute practice sessions on different days.','Complete five questions each session and correct errors using a memo.','Review the repeated errors at the end of the week and adjust the next goal.'])),
mk('cat','Computer Applications Technology','Technology','⌘','Documents, spreadsheets and information that works.',[
'Systems technologies|Compare hardware, software, storage and input/output devices for a user’s needs. Distinguish RAM from persistent storage.',
'Networks & internet|Explain network components, connection choices and internet services. Consider bandwidth, reliability, access and security.',
'Word processing & presentations|Use styles, sections, references and consistent layouts. Choose presentation features that help communication rather than distract.',
'Spreadsheets|Use cell references, formulas, functions and charts. Distinguish relative references such as A1 from absolute references such as $A$1.',
'Databases & web authoring|Organise tables with suitable field types and keys. Use queries to extract information and semantic HTML to structure a page.',
'Information management & PAT|Define an investigation question, assess sources and present findings. A practical assessment needs evidence of the process as well as the final product.'
],'Which reference stays fixed when a formula is copied?',['A1','A$1 only','Column A','$A$1'],3,'Dollar signs before both the column and row fix the complete reference.',W('B2 contains a price excluding tax; F1 contains a tax rate. Write a formula for a tax-inclusive total that can be copied down.',['The price should change row when the formula is copied.','The rate in F1 must stay fixed.','Use =B2*(1+$F$1).','Check that F1 is stored as a percentage or a decimal rate, not the whole number 15 for 15%.'])),
mk('it','Information Technology','Technology','</>','Think clearly. Design a solution. Test the edge cases.',[
'Systems technologies|Explain processing, memory, storage and software choices. Relate technical specifications to the problem rather than quoting them alone.',
'Communication & networks|Describe data transmission, network services and security. Distinguish authentication from authorisation.',
'Data & databases|Use keys and relationships to organise data. Query only the fields needed and consider validation, integrity and privacy.',
'Programming & algorithms|Break problems into inputs, processing and outputs. Trace variables, branches and loops before writing the full program.',
'Object-oriented development|Use objects to combine state and behaviour. Understand encapsulation and the relationships required by the prescribed programming environment.',
'Practical assessment & testing|Plan, build and document a solution. Test normal, boundary and invalid inputs and record how defects were resolved.'
],'Which input is especially useful when testing a minimum age of 18?',['Only age 40','Only age 30','Ages 17, 18 and 19','No input'],2,'These values test just below, exactly at and just above the boundary.',W('Design an algorithm that counts passing marks in a list, using 50 as the pass threshold.',['Initialise count to 0.','For each mark in the list, test whether mark is at least 50.','If it is, increase count by 1; otherwise continue.','For [49, 50, 72], the result is 2. Test an empty list and invalid marks separately.'])),
mk('agricultural-sciences','Agricultural Sciences','Agriculture','✾','Science behind healthy production systems.',[
'Animal nutrition|Distinguish maintenance from production needs. Explain digestion, feed quality and balanced rations in the prescribed livestock systems.',
'Animal production & reproduction|Connect housing, health, breeding and reproduction to productivity and welfare. Explain a method’s purpose before describing it.',
'Agricultural genetics|Use inheritance concepts to explain selection and breeding. A favourable genotype still interacts with environmental conditions.',
'Agricultural management|Distinguish fixed and variable costs, income and profit. Use farm records to support decisions.',
'Marketing & production factors|Analyse land, labour, capital and management. Compare marketing channels and explain how risk affects a farming enterprise.'
],'Which is generally a variable production cost?',['Annual land rent fixed by contract','Feed used as livestock numbers increase','The purchase value of existing land','A fixed annual licence'],1,'Feed use usually changes with the scale of livestock production.',W('A farm earns R80 000 in sales and has total costs of R62 000. Calculate profit.',['Identify revenue: R80 000.','Identify all costs included in the question: R62 000.','Profit = revenue − total costs.','R80 000 − R62 000 = R18 000.'])),
mk('agricultural-management','Agricultural Management Practices','Agriculture','▧','Plan, record and evaluate a farming enterprise.',[
'Farm planning|Match an enterprise to resources, climate and markets. A plan needs realistic production targets and a sequence of operations.',
'Financial management|Use budgets, cash-flow forecasts and records to monitor an enterprise. Cash availability and profitability are different measures.',
'Production management|Schedule labour, materials and equipment. Monitor actual performance against targets and identify causes of deviations.',
'Marketing|Identify customers and compare prices, packaging, channels and transport costs. Evaluate net returns rather than selling price alone.',
'Practical assessment|Record the planning, execution and evaluation of your practical work. Keep evidence that explains decisions and outcomes.'
],'A cash-flow forecast mainly helps predict…',['Only soil colour','When money enters and leaves the business','The exact weather','A guaranteed profit'],1,'It shows expected receipts, payments and periods of cash pressure.',W('A delivery sells for R1 500 but transport costs R220 and packaging costs R80. Find the return before other costs.',['Start with sales of R1 500.','Add the specified marketing costs: R220 + R80 = R300.','Subtract these costs from sales.','R1 500 − R300 = R1 200 before production and other costs.'])),
mk('agricultural-technology','Agricultural Technology','Agriculture','⚙','Practical systems that keep a farm moving.',[
'Safety & materials|Identify hazards and select appropriate protection. Match construction materials to durability, strength and environmental exposure.',
'Construction & welding|Read plans and explain joining processes. Distinguish a good joint’s design from the quality of its execution.',
'Tools & machinery|Explain machine components, maintenance and operating principles. Follow the prescribed safe procedures for practical work.',
'Irrigation & water|Compare irrigation systems using efficiency, energy, terrain and crop needs. Connect flow rate to volume and operating time.',
'Energy & communication|Explain electrical and alternative-energy systems at the level prescribed. Use records and communication tools to support farm operations.'
],'A flow of 20 litres per minute for 15 minutes delivers…',['35 litres','300 litres','1.33 litres','200 litres'],1,'Volume = flow rate × time = 20 × 15 = 300 litres.',W('An irrigation line delivers 12 ℓ/min. How long is needed for 180 ℓ?',['Use volume = flow rate × time.','Rearrange: time = volume ÷ flow rate.','180 ÷ 12 = 15.','The required time is 15 minutes at a constant flow.'])),
mk('tourism','Tourism','Life & services','✈','A world of places, people and practical planning.',[
'Mapwork & tour planning|Read time zones and plan routes using supplied schedules. Check whether times are local and whether daylight-saving adjustments are specified.',
'Foreign exchange|Identify which currency is being bought and which quoted rate applies. State the currency of every result.',
'Tourism attractions|Connect an attraction’s location, significance and visitor experience. Learn the prescribed icons using maps and retrieval practice.',
'Sustainable tourism|Evaluate economic, social and environmental effects. Suggest measures that can be implemented and monitored.',
'Marketing & customer care|Match marketing choices to a target market. Resolve service problems using clear communication and realistic action.'
],'At R20 per euro, R1 000 buys…',['€20','€50','€200','€20 000'],1,'Divide rand by rand per euro: 1 000 ÷ 20 = €50, before fees.',W('A traveller changes R2 400 at R24 per pound, with no fees. How many pounds do they receive?',['Identify the rate as rand for each pound.','To convert rand to pounds, divide by the rate.','R2 400 ÷ R24/£ = £100.','Check: £100 × R24/£ returns R2 400.'])),
mk('hospitality','Hospitality Studies','Life & services','♧','Food, service and thoughtful guest experiences.',[
'Nutrition & menu planning|Match dishes to guest requirements, nutrition, seasonality and available resources. A menu needs practical balance as well as variety.',
'Food commodities & preparation|Explain properties, preparation methods and quality indicators of prescribed food commodities. Link a technique to its effect.',
'Food safety & hygiene|Prevent contamination through suitable handling, storage and cleaning. Follow school and official food-safety procedures.',
'Service & beverages|Plan service sequences, mise en place and guest communication. Use the prescribed procedures for beverage and food service.',
'Costing & entrepreneurship|Calculate ingredient and portion costs. Distinguish mark-up on cost from profit margin on sales.'
],'A dish costs R40 and sells for R60. Its mark-up on cost is…',['20%','33.3%','50%','150%'],2,'Mark-up = (60 − 40) ÷ 40 × 100 = 50%.',W('Ingredients cost R240 for 12 portions. Find the ingredient cost per portion.',['Confirm that the recipe produces 12 equal portions.','Divide total ingredient cost by number of portions.','R240 ÷ 12 = R20.','R20 is ingredient cost only; labour and other overheads may still apply.'])),
mk('consumer-studies','Consumer Studies','Life & services','⌂','Informed choices for households and enterprises.',[
'Consumer rights & responsibilities|Evaluate purchase decisions using reliable information and the context given. Keep evidence such as receipts and written terms.',
'Food & nutrition|Connect nutrient functions and food choices to stated needs. Compare labels using equivalent serving sizes.',
'Clothing|Analyse fashion cycles, wardrobe planning and textile choices. Balance suitability, care, quality and cost.',
'Housing & interiors|Compare housing options and interior arrangements using budget, function, accessibility and available space.',
'Entrepreneurship & production|Plan production, calculate costs, set prices and evaluate quality. Distinguish revenue from profit.'
],'The best comparison of two different-sized food packs uses…',['Colour alone','Price per equal unit','Only the largest label','Only the total price'],1,'A common unit, such as R per 100 g, makes pack prices comparable.',W('Pack A costs R30 for 500 g; Pack B costs R42 for 750 g. Which has the lower price per 100 g?',['A: R30 ÷ 500 × 100 = R6 per 100 g.','B: R42 ÷ 750 × 100 = R5.60 per 100 g.','Compare the same unit: R5.60 is less than R6.','Pack B has the lower unit price; consider budget and waste before buying.'])),
mk('religion-studies','Religion Studies','Business & society','☼','Understand beliefs with evidence and respect.',[
'Diversity of religions|Distinguish internal diversity from differences between religions. Use accurate terms and avoid stereotypes.',
'Common features of religion|Compare beliefs, narratives, rituals, ethics and institutions while recognising that traditions organise these differently.',
'Topical issues|Analyse a social issue using relevant religious perspectives and evidence. Separate description from evaluation.',
'Religious freedom|Explain respect, dialogue and constitutional principles within the prescribed curriculum. Distinguish disagreement from discrimination.',
'Research & argument|Frame a question, compare credible sources and acknowledge variation within a tradition. Support conclusions with examples.'
],'A balanced comparison should…',['Assume all believers are identical','Use evidence and acknowledge internal diversity','Rank beliefs by popularity','Ignore context'],1,'Traditions contain different interpretations and practices; accurate comparisons acknowledge this.',W('Plan a paragraph comparing a practice in two traditions.',['Name the precise feature you are comparing.','Describe one relevant example from each tradition using accurate terminology.','Explain a similarity or difference supported by those examples.','Avoid claiming that every member practises in the same way.'])),
mk('visual-arts','Visual Arts','Arts & expression','◒','Look closely. Make boldly. Explain your choices.',[
'Visual literacy|Analyse line, shape, colour, texture, space and composition. Explain how formal elements contribute to meaning.',
'South African art|Use prescribed artists and works to connect visual choices to historical and social contexts.',
'Art movements & themes|Compare selected works through a clear theme. Distinguish description of appearance from interpretation.',
'Creative process|Research, explore alternatives, develop an idea and reflect. Your sourcebook should show decisions and change.',
'Practical production|Match materials and techniques to intention. Evaluate the relationship between the process, final work and brief.'
],'An interpretation is strongest when it…',['Lists only colours','Links visual evidence to meaning','Ignores the artwork','Uses an artist’s name alone'],1,'Specific visual details give support to an interpretation.',W('How could you analyse the use of contrast in an artwork?',['Identify a visible contrast, such as light against dark or large against small.','Describe exactly where it appears in the composition.','Explain its effect on emphasis, mood or movement.','Connect that effect to a supported interpretation of the work.'])),
mk('design','Design','Arts & expression','◇','Solve a real problem with thoughtful form.',[
'Design literacy|Analyse form, function, materials, usability and visual communication. A design decision should respond to a need.',
'Design history|Compare prescribed movements and designers in context. Support comparisons using named examples and characteristics.',
'South African design|Explore local designers, materials and social contexts. Distinguish inspiration from copying.',
'Design process|Research a brief, generate options, prototype and evaluate. Record why you accepted or rejected an approach.',
'Sustainable practice|Consider material use, durability, repair and disposal. Evaluate trade-offs over a product’s life.'
],'A prototype is mainly used to…',['Avoid user feedback','Test and improve an idea','Guarantee commercial success','Replace the brief'],1,'A prototype makes assumptions visible so they can be tested.',W('A school needs a clearer wayfinding sign. Outline a design process.',['Observe where users become confused and define the sign’s purpose.','Sketch alternatives with readable lettering, contrast and clear arrows.','Test a prototype with users at the intended viewing distance.','Revise using feedback and document why the final design meets the brief.'])),
mk('dramatic-arts','Dramatic Arts','Arts & expression','◐','Find the intention behind every performance choice.',[
'Dramatic theory|Use prescribed theatre forms, practitioners and terminology to explain performance choices.',
'Prescribed plays|Analyse character, conflict, structure and themes with detailed reference to the text studied at your school.',
'South African theatre|Connect selected works and theatre practices to their social and historical contexts.',
'Voice & movement|Link breath, articulation, posture and movement to intention. Rehearse within safe, teacher-guided practice.',
'Performance & reflection|Document research, rehearsal decisions, collaboration and evaluation. Explain how a choice affects the audience.'
],'A performance choice should be justified through…',['Volume alone','Character intention and textual evidence','Costume price alone','Ignoring context'],1,'Choices become purposeful when connected to intention, text and audience effect.',W('A character says “I am fine” but appears distressed. Plan a performance interpretation.',['Identify the conflict between spoken words and the scene’s evidence.','Choose a plausible intention, such as hiding fear.','Use a specific pause, gesture or vocal choice to convey the subtext.','Explain how the choice communicates meaning without contradicting the text.'])),
mk('dance','Dance Studies','Arts & expression','♬','Technique, expression and the thinking behind movement.',[
'Dance performance|Link technique, musicality and expression to the prescribed dance form and assessment criteria.',
'Choreography|Develop a motif through repetition, variation, contrast and transitions. Explain the relationship between movement and intention.',
'Anatomy & safe practice|Understand alignment, muscle function and the purpose of warm-up and recovery. Follow teacher-guided safe practice.',
'Dance history|Study prescribed choreographers, works and contexts. Support observations using specific movement examples.',
'Music & production|Analyse rhythm, phrasing, space and production choices as part of the full performance.'
],'A choreographic motif is…',['A short movement idea that can be developed','Only a costume','A lighting cable','Always a complete ballet'],0,'A motif supplies movement material that can be repeated, varied and transformed.',W('Develop a short movement motif in three ways.',['Identify the motif’s defining action and rhythm.','Repeat it at a different level or in a different direction.','Vary its speed or size while retaining a recognisable feature.','Explain how the changes serve the choreographic intention.'])),
mk('music','Music','Arts & expression','♫','Listen, perform and understand the structure.',[
'Music literacy|Read notation, rhythm, scales and intervals in the prescribed syllabus. Connect a symbol to its sound.',
'Harmony & analysis|Analyse chords, progressions, form and texture using the conventions of your selected stream.',
'Aural skills|Practise recognising intervals, rhythms and musical features. Compare what you hear with a written representation.',
'Music history & industry|Study prescribed works and contexts. Explain characteristics using musical evidence.',
'Performance|Plan technical practice, interpretation and ensemble preparation. Record short sections and use feedback to improve.'
],'In common time, a standard 4/4 bar contains…',['Four crotchet beats','Four semibreve beats','Only one quaver','No beat grouping'],0,'The upper 4 gives the number of beats; the lower 4 identifies a crotchet beat.',W('A 4/4 bar contains a minim and a crotchet. What duration remains?',['A complete 4/4 bar contains four crotchet beats.','A minim occupies two crotchet beats.','A crotchet occupies one more beat: total used = 3.','One crotchet beat remains.'])),
mk('egd','Engineering Graphics & Design','Technology','⌑','See the object. Read the drawing. Show the detail.',[
'Civil drawings|Interpret plans, elevations and sections using the specified conventions, scales and annotations.',
'Mechanical drawings|Read orthographic views, sectional views and component details. Keep projection conventions consistent.',
'Perspective & isometric|Distinguish true-shape orthographic views from pictorial representations. Follow construction steps carefully.',
'Loci & developments|Use geometric construction to trace paths and develop surfaces. Retain construction evidence where required.',
'Practical assessment|Work from the design brief, produce alternatives and communicate the final solution through correct drawings.'
],'At 1 : 20 scale, a 2 m length is drawn as…',['10 mm','100 mm','200 mm','1 000 mm'],1,'2 m = 2 000 mm; 2 000 ÷ 20 = 100 mm.',W('A component is 80 mm long and drawn at 2 : 1. Find its drawn length.',['The scale means two drawing units for one actual unit.','Multiply actual length by 2.','80 mm × 2 = 160 mm.','The drawing is enlarged; use the stated dimension for manufacturing.'])),
mk('civil-technology','Civil Technology','Technology','▰','Construction, woodwork and civil services.',[
'Construction|Read building drawings and explain foundations, walls, roofs and materials within the chosen specialisation.',
'Woodworking|Explain timber properties, joints, setting out and finishing in the relevant specialisation.',
'Civil services|Study water, drainage and related service systems according to your school’s specialisation.',
'Tools, safety & materials|Match tools and protective equipment to a task. Follow teacher supervision and prescribed safe procedures.',
'Calculations & PAT|Convert units, estimate quantities and retain the design and production evidence required for the practical task.'
],'A volume calculation for a rectangular slab uses…',['Length × width only','Length × width × thickness','Length + width','Perimeter only'],1,'Three perpendicular dimensions are needed to calculate volume.',W('Find the concrete volume of a 4 m × 3 m slab, 0.1 m thick, before wastage.',['All dimensions are already in metres.','Volume = length × width × thickness.','4 × 3 × 0.1 = 1.2.','The volume is 1.2 m³, excluding any specified wastage.'])),
mk('electrical-technology','Electrical Technology','Technology','ϟ','Electrical systems, electronics and digital ideas.',[
'Electrical specialisations|Select Electrical, Electronics or Digital Systems resources that match the subject you are registered for.',
'Circuit principles|Use the appropriate relationships for voltage, current, resistance and power. Distinguish AC and DC quantities.',
'Machines & control|Explain prescribed motor, transformer and control-system behaviour with suitable diagrams.',
'Electronics & logic|Analyse the components or logic functions prescribed in the selected specialisation. Use truth tables where appropriate.',
'Safety & PAT|Follow isolation, supervision and workshop rules. Use simulations for independent practice, not live electrical work.'
],'For a 12 V source across 6 Ω, ideal current is…',['0.5 A','2 A','18 A','72 A'],1,'I = V/R = 12/6 = 2 A.',W('A 24 V DC supply drives a 12 Ω resistor. Find current and power.',['Use Ohm’s law: I = V/R.','I = 24/12 = 2 A.','Power P = VI = 24 × 2.','P = 48 W for the ideal resistor.'])),
mk('mechanical-technology','Mechanical Technology','Technology','⚙','Automotive, fitting and machining, welding and metalwork.',[
'Mechanical specialisations|Match resources to Automotive, Fitting and Machining, or Welding and Metalwork.',
'Materials & forces|Explain material properties, stress and the effects of loads at the prescribed level.',
'Machines & systems|Interpret mechanical transmission, motion and system diagrams. Track input, output and losses.',
'Measurement & calculations|Read measuring instruments and use consistent units. Distinguish diameter, radius and tolerance.',
'Safety & practical work|Plan safe operations and retain practical evidence. Independent study does not replace workshop supervision.'
],'A force of 100 N acts 0.2 m from a pivot at right angles. Its moment is…',['20 N·m','500 N·m','0.002 N·m','100.2 N·m'],0,'Moment = perpendicular force × distance = 100 × 0.2 = 20 N·m.',W('A driver gear has 20 teeth and turns a 40-tooth driven gear. Compare their ideal speeds.',['For meshing gears, speed is inversely proportional to tooth count.','Driven speed / driver speed = 20/40.','The driven gear turns at half the driver’s speed.','External meshing gears rotate in opposite directions.'])),
mk('technical-mathematics','Technical Mathematics','Technology','√','Mathematical tools for technical applications.',[
'Algebra & equations|Apply exponent laws, factorisation and equation-solving with domain restrictions and clear working.',
'Functions & graphs|Connect equations, intercepts and graph features. Explain the effect of parameter changes.',
'Finance & growth|Match rates and periods when modelling growth and decay. State assumptions in the context.',
'Trigonometry & geometry|Apply identities and geometric relationships using the conventions prescribed for Technical Mathematics.',
'Calculus & measurement|Use derivatives and relevant area or volume relationships in prescribed technical contexts.'
],'The derivative of 3x² is…',['3x','6x','6','x³'],1,'The power rule gives 3 × 2x = 6x.',W('Differentiate f(x) = 2x³ − 5x + 4.',['Differentiate each term separately.','d(2x³)/dx = 6x².','d(−5x)/dx = −5 and d(4)/dx = 0.','f′(x) = 6x² − 5.'])),
mk('technical-sciences','Technical Sciences','Technology','↔','Apply scientific ideas to technical situations.',[
'Mechanics|Draw forces, choose directions and apply the prescribed relationships to motion and equilibrium.',
'Matter & materials|Connect material properties to microscopic structure and technical uses.',
'Waves, sound & light|Relate wave behaviour, frequency, wavelength and speed using appropriate units.',
'Electricity & magnetism|Analyse prescribed circuits and electrical effects. Use a clear circuit diagram and correct unit conventions.',
'Chemical change|Apply the prescribed electrochemical and chemical concepts, with balanced equations where needed.'
],'A 4 kg object has acceleration 3 m·s⁻². Its net force is…',['0.75 N','7 N','12 N','1.33 N'],2,'Fnet = ma = 4 × 3 = 12 N.',W('A wave travels at 300 m·s⁻¹ and has frequency 50 Hz. Find wavelength.',['Use v = fλ.','Rearrange: λ = v/f.','λ = 300/50.','The wavelength is 6 m.'])),
mk('marine-sciences','Marine Sciences','Numbers & science','≈','Explore oceans as connected living systems.',[
'Oceanography|Connect ocean circulation, salinity, temperature and physical processes to marine conditions.',
'Marine biology|Explain how marine organisms are adapted to their environments. Relate structure to function.',
'Marine ecology|Trace energy flow, food webs and interactions. Distinguish a population from a community and an ecosystem.',
'Humans & the ocean|Evaluate use, pollution and conservation using evidence, scale and realistic interventions.',
'Scientific enquiry|Frame a testable question, identify variables and evaluate sampling limitations in marine investigations.'
],'A producer in a marine food web is most likely…',['Phytoplankton','A shark','A seal','A fishing boat'],0,'Photosynthetic phytoplankton convert light energy into chemical energy.',W('Explain why removing a predator may affect more than one species in a food web.',['Identify the predator’s direct prey.','Predict how reduced predation may change that prey population.','Trace how the changed prey population affects its own food sources.','Describe the chain as a possible trophic effect; real outcomes also depend on other interactions.'])),
mk('maritime-economics','Maritime Economics','Business & society','⚓','Trade, shipping and the economics of the sea.',[
'Maritime trade|Explain why goods move by sea and how trade patterns connect producers, ports and markets.',
'Shipping operations|Compare ship types, cargoes and service arrangements within the prescribed curriculum.',
'Ports & logistics|Analyse handling, storage and transport links. A delay at one stage can affect an entire supply chain.',
'Costs & markets|Distinguish fixed and variable costs and explain how demand and capacity affect shipping markets.',
'Maritime environment|Evaluate environmental responsibilities and the economic effects of disruption or pollution.'
],'A port bottleneck can…',['Affect only a ship’s colour','Delay the wider supply chain','Eliminate all transport costs','Guarantee lower prices'],1,'Ports link transport stages; delays may propagate through deliveries and inventories.',W('A shipment earns R90 000 with voyage costs of R68 000. Find the contribution before other costs.',['Identify the stated revenue and voyage costs.','Subtract voyage costs from revenue.','R90 000 − R68 000 = R22 000.','This is before any other costs excluded from the question.'])),
mk('nautical-science','Nautical Science','Technology','⌖','Navigation, seamanship and careful observation.',[
'Navigation|Read positions, bearings, charts and supplied navigational information using the prescribed conventions.',
'Seamanship|Explain vessel equipment and operations with attention to roles, communication and safety.',
'Meteorology|Interpret weather information and explain its relevance to maritime decisions.',
'Vessel stability|Study the prescribed principles of flotation, loading and stability. Use diagrams to explain relationships.',
'Practical applications|Work methodically through navigation calculations and keep units and reference directions explicit.'
],'A speed of one knot means…',['One kilometre per hour','One nautical mile per hour','One metre per second','One mile per second'],1,'A knot is one nautical mile per hour.',W('At a constant 12 knots, how far does a vessel travel in 2.5 hours?',['Use distance = speed × time.','12 knots means 12 nautical miles per hour.','12 × 2.5 = 30.','The distance is 30 nautical miles.'])),
mk('equine-studies','Equine Studies','Life & services','♞','Understand horse care, management and performance.',[
'Anatomy & physiology|Relate prescribed body structures to movement and function. Use labelled diagrams and accurate terminology.',
'Nutrition & husbandry|Explain balanced feeding, water, housing and routine care within the curriculum and professional guidance.',
'Health & welfare|Recognise the importance of observation, records and timely professional assistance. Study does not replace veterinary assessment.',
'Equine behaviour|Connect behaviour, handling and learning principles to safe, humane management.',
'Industry & practical work|Understand roles, records and practical assessment requirements in the equine industry.'
],'Reliable routine records help a manager…',['Replace all professional advice','Notice changes and support decisions','Guarantee no illness','Ignore feeding patterns'],1,'Records support observation and communication; they do not replace professional care.',W('Design a simple daily observation record for a stable.',['Identify the horse, date and responsible observer.','Record prescribed feed, water, activity and routine observations.','Use consistent terms and note changes from that horse’s usual pattern.','Record actions taken and any professional advice obtained.'])),
mk('sport-science','Sport & Exercise Science','Life & services','↝','Movement, performance and evidence-based reflection.',[
'Anatomy & physiology|Connect body systems to exercise and recovery. Explain the function of structures rather than memorising labels alone.',
'Training principles|Apply specificity, progressive overload, recovery and individualisation to a stated training goal.',
'Biomechanics|Use forces, motion and leverage to analyse a movement at the prescribed level.',
'Performance & psychology|Examine preparation, motivation and evaluation. Distinguish an observation from an unsupported conclusion.',
'Practical investigation|Choose repeatable measurements, control relevant conditions and record limitations.'
],'Training specificity means…',['Every activity improves every skill equally','Training should match the target demands','Recovery is unnecessary','Only experts can exercise'],1,'Adaptations depend on the type and demands of the training performed.',W('Plan how to compare sprint times before and after a training block.',['Use the same distance, timing method and starting procedure.','Keep conditions as comparable as practical and allow appropriate recovery.','Record more than one valid attempt and use a consistent summary measure.','Compare results and discuss timing error, conditions and other possible influences.']))
];
const official=['English','Afrikaans','isiZulu','isiXhosa','isiNdebele','Sepedi','Sesotho','Setswana','Siswati','Tshivenda','Xitsonga'];
const other=['Arabic','French','German','Gujarati','Hebrew','Hindi','Italian','Latin','Mandarin','Modern Greek','Portuguese','Serbian','Spanish','Tamil','Telugu','Urdu'];
for(const name0 of [...official,...other]){
 const shown=name0;
 const id='language-'+shown.toLowerCase().replaceAll(' ','-');
 const levels=official.includes(name0)?['HL','FAL','SAL']:['Arabic','French','Hebrew','Italian','Latin','Mandarin','Modern Greek','Spanish'].includes(shown)?['SAL']:['German','Portuguese','Serbian'].includes(shown)?['HL','SAL']:['HL','FAL','SAL'];
 const s=mk(id,shown,'Languages','Aa','Reading, literature, writing and language skills.',[
 'Comprehension & visual literacy|Read the complete text, identify the speaker and purpose, and support each inference with evidence. A language study roadmap is provided in English; practise responses in your registered language.',
 'Summary skills|Identify the required focus, select distinct main ideas and express them concisely. Follow the word limit and format in your actual paper.',
 'Language in context|Use the sentence and surrounding meaning to analyse grammar, vocabulary, tone and register. Apply the terminology used in your language curriculum.',
 'Literature|Study the texts prescribed for your school, language and level. Build a record of theme, character, technique and evidence without inventing quotations.',
 'Writing & presenting|Identify audience, purpose and format. Plan, draft, revise and proofread using the assessment criteria for your registered level.',
 'Oral work|Prepare a clear structure and practise timing and delivery. Use credible sources and follow the task requirements set by your teacher.'
 ],'An inference should be supported by…',['The title alone','Evidence from the text','An invented quotation','Your opinion only'],1,'An inference goes beyond the literal words but must still be supported by the text.',W('Plan a literature paragraph responding to a theme in your prescribed text.',['State one relevant point that answers the question.','Choose a short, accurate quotation or precise reference from the prescribed text.','Explain how the evidence supports the point and the theme.','Link back to the question. Write in the language and format required by your paper.']));
 s.levels=levels;s.language=true;s.specialist=other.includes(name0);subjects.push(s);
}
subjects.push(mk('sasl','South African Sign Language','Languages','✋','Visual language, signed texts and expressive communication.',[
'Signed comprehension|Study the signed text in full and use visual evidence to support interpretation. This roadmap is in English; signed learning requires the appropriate teacher and visual resources.',
'Language structures|Analyse handshape, location, movement, orientation and non-manual features using the prescribed SASL curriculum.',
'Signed literature|Study prescribed signed works and discuss theme, character, visual technique and context.',
'Presenting & recording|Plan the signed response, check framing and visibility, and follow the assessment task’s instructions.'
],'Which belongs to signed-language expression?',['Non-manual features','Only written spelling','Only sound volume','Only punctuation marks'],0,'Facial expression and other non-manual features contribute to meaning in signed language.',W('Prepare a recorded signed response.',['Read the actual task and plan a clear sequence.','Choose a plain background and framing that keeps signing visible.','Rehearse expression, transitions and timing with teacher feedback.','Review the recording for clarity and compliance with the task.'])));
subjects.at(-1).language=true;subjects.at(-1).levels=['HL'];
export const collections=[
{name:'Quantum Jump',subject:'Physical Sciences',url:'../quantum-jump/',icon:'⚛',text:'The original science studio: deeper practice, diagrams and experiments.'},
{name:'Plot Twist',subject:'Mathematics',url:'../plot-twist/',icon:'∑',text:'A little less mystery. A lot more maths. Graphs, examples and revision.'},
{name:'Sum Sense',subject:'Mathematical Literacy',url:'../maths-literacy/',icon:'%',text:'Real-life numbers, finance, measurement and paper practice.'},
{name:'Ledger Legends',subject:'Accounting',url:'../accounting/',icon:'R',text:'Financial statements, adjustments, control and worked practice.'},
{name:'Mind Weather',subject:'Study & focus',url:'https://mymindweather.study/',icon:'☁',text:'Study planning and focus support from an Umuzi team project.'},
{name:'Career Orbit',subject:'Life after matric',url:'https://cosmicbubblegumgirl.github.io/career-orbit/',icon:'↗',text:'Turn your next big goal into small, practical actions.'}
];

subjects.find(s=>s.id==='civil-technology').pathways=['Construction','Woodworking','Civil Services'];
subjects.find(s=>s.id==='electrical-technology').pathways=['Electrical','Electronics','Digital Systems'];
subjects.find(s=>s.id==='mechanical-technology').pathways=['Automotive','Fitting and Machining','Welding and Metalwork'];
