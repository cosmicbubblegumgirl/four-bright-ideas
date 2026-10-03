const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const marker = '<defs><marker id="qj-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" class="diagram-arrow-head"></path></marker></defs>';
const line = (x1, y1, x2, y2, extra = '') => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" ' + extra + '></line>';
const arrow = (x1, y1, x2, y2) => line(x1, y1, x2, y2, 'class="diagram-arrow" marker-end="url(#qj-arrow)"');
const txt = (x, y, value, cls = '') => '<text x="' + x + '" y="' + y + '" class="' + cls + '">' + esc(value) + '</text>';
const circle = (cx, cy, r, cls = '') => '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="' + cls + '"></circle>';
const rect = (x, y, w, h, rx = 10, cls = '') => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '" class="' + cls + '"></rect>';

const variantOf = (example) => Number(example?.variant) || ((Number(example?.index) || 0) % 4) + 1;
const seedOf = (example) => Number(example?.index) || 0;
function dataPanel(example, x = 520, y = 48, w = 210) {
  const parts = String(example?.known || '').split(';').map(s => s.trim()).filter(Boolean).slice(0, 3);
  if (!parts.length) return '';
  const h = 34 + parts.length * 18;
  let b = rect(x, y, w, h, 10, 'diagram-data-panel') + txt(x + 12, y + 20, 'QUESTION DATA', 'diagram-data-title');
  parts.forEach((part, idx) => {
    const short = part.length > 28 ? part.slice(0, 27) + '…' : part;
    b += txt(x + 12, y + 40 + idx * 18, short, 'diagram-data-text');
  });
  return b;
}

const symbolSets = {
  forces: [['ΣF', 'net/resultant force'], ['m', 'mass'], ['a', 'acceleration'], ['w / F_g', 'weight / gravitational force'], ['N', 'normal force'], ['f', 'frictional force']],
  gravity: [['F', 'gravitational force'], ['G', 'universal gravitational constant'], ['m₁, m₂', 'interacting masses'], ['r', 'centre-to-centre distance'], ['g', 'gravitational field strength']],
  momentum: [['p', 'momentum'], ['m', 'mass'], ['vᵢ', 'initial velocity'], ['v_f', 'final velocity'], ['Δp', 'change in momentum'], ['J', 'impulse'], ['F_net', 'net force'], ['Δt', 'time interval']],
  projectiles: [['vᵢ', 'initial velocity'], ['v_f', 'final velocity'], ['a', 'acceleration'], ['g', 'gravitational acceleration'], ['Δy', 'vertical displacement'], ['Δt', 'time interval']],
  energy: [['W', 'work'], ['F', 'force'], ['Δx', 'displacement'], ['θ', 'angle between force and displacement'], ['K', 'kinetic energy'], ['P', 'power'], ['Δt', 'time interval']],
  doppler: [['f_L', 'frequency heard by listener'], ['f_S', 'source frequency'], ['v', 'speed of sound'], ['v_L', 'listener velocity'], ['v_S', 'source velocity'], ['λ', 'wavelength']],
  electrostatics: [['F', 'electrostatic force'], ['k', 'Coulomb constant'], ['q₁, q₂', 'charges'], ['r', 'separation'], ['E', 'electric field strength']],
  circuits: [['V', 'potential difference'], ['I', 'current'], ['R', 'external resistance'], ['r', 'internal resistance'], ['ε', 'emf'], ['P', 'power']],
  machines: [['ε', 'induced emf'], ['N', 'number of turns'], ['Φ', 'magnetic flux'], ['B', 'magnetic field strength'], ['A', 'coil area'], ['θ', 'angle to the coil normal'], ['Δt', 'time interval']],
  ac: [['V_rms', 'rms voltage'], ['V_max', 'peak voltage'], ['I_rms', 'rms current'], ['I_max', 'peak current'], ['P', 'average power']],
  photoelectric: [['E', 'photon energy'], ['h', 'Planck constant'], ['f', 'frequency'], ['W₀', 'work function'], ['K_max', 'maximum electron kinetic energy'], ['λ', 'wavelength']],
  'organic-names': [['C', 'carbon'], ['H', 'hydrogen'], ['O', 'oxygen where present'], ['n', 'number of carbon atoms in a general formula']],
  'organic-properties': [['δ⁺ / δ⁻', 'partial charge where relevant'], ['T_b', 'boiling point'], ['IMF', 'intermolecular force']],
  'organic-reactions': [['→', 'reaction direction'], ['⇌', 'reversible reaction'], ['Δ', 'heating condition when shown']],
  rates: [['Δc', 'change in concentration'], ['Δt', 'time interval'], ['ΔH', 'enthalpy change'], ['E_a', 'activation energy']],
  equilibrium: [['K_c', 'equilibrium constant'], ['[X]', 'equilibrium concentration of X'], ['⇌', 'dynamic reversible reaction']],
  acids: [['pH', 'acidity scale value'], ['[H₃O⁺]', 'hydronium concentration'], ['[OH⁻]', 'hydroxide concentration'], ['K_w', 'water ion product']],
  titrations: [['n', 'amount of substance in moles'], ['c', 'concentration'], ['V', 'volume in dm³'], ['a, b', 'balanced-equation coefficients']],
  galvanic: [['E°_cell', 'standard cell potential'], ['E°_cathode', 'cathode reduction potential'], ['E°_anode', 'anode reduction potential'], ['e⁻', 'electron']],
  electrolysis: [['I', 'current'], ['Q', 'charge'], ['Δt', 'time interval'], ['e⁻', 'electron']]
};

export function symbolKey(topic) {
  const items = symbolSets[topic.id] || [];
  if (!items.length) return '';
  return '<section class="symbol-key" aria-label="Symbol key"><h3>Symbol key for this question</h3><div class="symbol-key-grid">' +
    items.map((item) => '<div class="symbol-key-item"><span class="diagram-symbol">' + esc(item[0]) + '</span><span>' + esc(item[1]) + '</span></div>').join('') +
    '</div></section>';
}

function baseFigure(topic, example, body, caption) {
  const number = Number(example.index) + 1;
  return '<figure class="question-visual">' +
    '<svg class="question-diagram" viewBox="0 0 760 320" role="img" aria-labelledby="diagram-title-' + esc(example.id) + '" preserveAspectRatio="xMidYMid meet">' +
    marker +
    '<title id="diagram-title-' + esc(example.id) + '">Question ' + number + ' diagram for ' + esc(topic.title) + '</title>' +
    txt(28, 34, 'QUESTION ' + number + ' · ' + topic.title.toUpperCase(), 'diagram-heading') +
    body +
    '</svg>' +
    '<figcaption>' + esc(caption + (example.diagramHint ? ' Question-specific setup: ' + example.diagramHint + '.' : '')) + '</figcaption>' +
    '<div class="diagram-givens"><strong>Given:</strong> ' + esc(example.known) + '</div>' +
    '</figure>';
}

function forcesDiagram(example) {
  const v = variantOf(example), s = seedOf(example);
  let b = '';
  if (v === 1) {
    b = line(75,235,500,235,'class="diagram-ground"') + rect(235,165,125,70,10,'diagram-object');
    b += arrow(360,195,455,195) + txt(400,178,'F','diagram-label') + arrow(235,215,155,215) + txt(160,198,'fₖ','diagram-label');
    b += arrow(295,165,295,105) + txt(310,115,'N','diagram-label') + arrow(295,235,295,292) + txt(310,282,'F_g','diagram-label');
    b += txt(210,312,'horizontal surface · net force along x','diagram-note');
  } else if (v === 2) {
    b = line(85,235,500,235,'class="diagram-ground"') + rect(245,165,115,70,10,'diagram-object');
    b += arrow(360,190,455,125) + txt(420,120,'F','diagram-label');
    b += arrow(245,215,165,215) + txt(170,198,'fₖ','diagram-label') + arrow(300,165,300,110) + txt(315,120,'N','diagram-label');
    b += '<path d="M360 190 A62 62 0 0 0 406 175" class="diagram-measure"></path>' + txt(397,170,'θ','diagram-label');
  } else if (v === 3) {
    b = rect(185,82,250,190,12,'diagram-lift') + rect(265,165,95,50,8,'diagram-object');
    b += arrow(312,165,312,105) + txt(328,118,'N','diagram-label') + arrow(312,215,312,262) + txt(328,255,'F_g','diagram-label');
    b += arrow(455,220,455,120) + txt(470,168,'a','diagram-label') + txt(222,300,'lift / apparent-weight setup','diagram-note');
  } else {
    const rise = 100 + (s % 4) * 8;
    b = '<path d="M90 250 L470 '+rise+' L500 250 Z" class="diagram-ramp"></path>' + rect(260,165,95,52,8,'diagram-object');
    b += arrow(305,165,280,115) + txt(260,105,'N','diagram-label') + arrow(305,217,305,275) + txt(320,268,'F_g','diagram-label');
    b += arrow(275,210,210,230) + txt(188,220,'fₖ','diagram-label') + txt(390,230,'θ','diagram-label');
  }
  return b + dataPanel(example);
}
function gravityDiagram(example) {
  const v=variantOf(example), s=seedOf(example);
  let b='';
  if(v===1){
    b=circle(170,175,42,'diagram-object')+circle(405,175,55,'diagram-object');
    b+=line(212,175,350,175,'class="diagram-measure"')+txt(275,158,'r','diagram-label');
    b+=arrow(215,220,285,220)+arrow(350,220,280,220)+txt(145,181,'m₁','diagram-object-label')+txt(382,181,'m₂','diagram-object-label');
  }else if(v===2){
    b=circle(240,178,92,'diagram-earth')+circle(420,95,20,'diagram-object');
    b+=line(240,178,420,95,'class="diagram-measure"')+txt(330,115,'R + h','diagram-label');
    b+=txt(205,184,'Earth','diagram-object-label')+arrow(415,120,360,145)+txt(370,136,'g','diagram-label');
  }else if(v===3){
    b=circle(170,175,38,'diagram-object')+circle(420,175,38,'diagram-object');
    b+=line(208,175,382,175,'class="diagram-measure"')+txt(270,155,'r₁ → r₂','diagram-label');
    b+=txt(110,270,'compare force using 1/r²','diagram-note')+arrow(220,220,275,220)+arrow(370,220,315,220);
  }else{
    b=circle(245,182,85,'diagram-moon')+rect(220,82,50,45,6,'diagram-object');
    b+=arrow(245,130,245,170)+txt(260,155,'weight','diagram-label')+txt(205,187,'moon','diagram-object-label');
    b+=txt(112,292,'mass stays constant · weight = mg','diagram-note');
  }
  return b+dataPanel(example);
}
function momentumDiagram(example) {
  const v = Number(example.variant) || 1;
  let b = txt(120, 72, 'BEFORE', 'diagram-subheading') + txt(505, 72, 'AFTER', 'diagram-subheading');
  if (v === 1) {
    b += rect(90, 146, 120, 60, 10, 'diagram-object') + arrow(210, 126, 310, 126) + txt(225, 108, 'vᵢ', 'diagram-label');
    b += rect(520, 146, 120, 60, 10, 'diagram-object') + arrow(520, 126, 430, 126) + txt(452, 108, 'v_f', 'diagram-label');
  } else if (v === 2) {
    b += rect(90, 146, 120, 60, 10, 'diagram-object') + arrow(210, 126, 310, 126) + txt(225, 108, 'vᵢ', 'diagram-label');
    b += rect(520, 146, 120, 60, 10, 'diagram-object') + txt(545, 126, 'v_f = 0', 'diagram-label');
  } else if (v === 3) {
    b += rect(80, 146, 100, 60, 10, 'diagram-object') + rect(235, 146, 100, 60, 10, 'diagram-object');
    b += arrow(180, 126, 245, 126) + txt(188, 108, 'v₁ᵢ', 'diagram-label') + txt(250, 126, 'v₂ᵢ = 0', 'diagram-label');
    b += rect(505, 146, 160, 60, 10, 'diagram-object') + arrow(585, 126, 675, 126) + txt(600, 108, 'v_f', 'diagram-label');
    b += txt(520, 238, 'trolleys move together', 'diagram-label');
  } else {
    b += line(120, 250, 120, 95, 'class="diagram-axis"') + line(120, 250, 650, 250, 'class="diagram-axis"');
    b += rect(230, 135, 260, 115, 0, 'diagram-graph-fill') + txt(335, 122, 'F_net', 'diagram-label') + txt(510, 270, 'Δt', 'diagram-label');
    b += txt(225, 292, 'area under F–t graph = impulse J = Δp', 'diagram-note');
  }
  return b;
}

function projectileDiagram(example) {
  const v = Number(example.variant) || 1;
  let b = line(130, 270, 650, 270, 'class="diagram-ground"');
  if (v === 3) {
    b += circle(380, 92, 18, 'diagram-object') + arrow(380, 118, 380, 225) + txt(395, 172, 'g = 9.8 m·s⁻²', 'diagram-label');
    b += line(420, 92, 420, 270, 'class="diagram-measure"') + txt(435, 190, 'Δy', 'diagram-label');
    b += txt(315, 300, 'dropped from rest: vᵢ = 0', 'diagram-note');
  } else {
    b += circle(380, 220, 18, 'diagram-object') + arrow(380, 202, 380, 102) + txt(395, 130, 'vᵢ', 'diagram-label');
    b += '<path d="M380 220 C380 150 380 105 380 82 C380 105 380 150 380 220" class="diagram-path"></path>';
    b += arrow(465, 104, 465, 190) + txt(480, 152, 'g', 'diagram-label') + txt(395, 82, 'v_f = 0 at top', 'diagram-label');
    if (v === 4) b += txt(240, 300, 'velocity changes continuously; acceleration stays downward', 'diagram-note');
  }
  return b;
}

function energyDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=line(80,235,500,235,'class="diagram-ground"')+rect(190,170,115,65,10,'diagram-object');
    b+=arrow(305,175,430,115)+txt(390,110,'F','diagram-label')+arrow(305,255,465,255)+txt(370,280,'Δx','diagram-label');
    b+='<path d="M350 235 A55 55 0 0 0 342 207" class="diagram-measure"></path>'+txt(355,210,'θ','diagram-label');
  }else if(v===2){
    b=rect(190,170,110,62,10,'diagram-object')+arrow(300,200,430,200)+txt(345,180,'vᵢ → v_f','diagram-label');
    b+=txt(120,270,'W_net = ΔK','diagram-note')+line(80,232,500,232,'class="diagram-ground"');
  }else if(v===3){
    b=rect(140,245,120,48,6,'diagram-load')+line(200,245,200,105,'class="diagram-rope"')+circle(200,90,24,'diagram-pulley');
    b+=arrow(245,245,245,115)+txt(260,180,'h','diagram-label')+txt(105,315,'motor lifts load in time Δt','diagram-note');
  }else{
    b='<path d="M80 115 C180 115 190 255 350 255 C430 255 460 200 500 170" class="diagram-track"></path>'+circle(120,105,18,'diagram-object');
    b+=arrow(120,125,150,170)+txt(95,80,'starts from rest','diagram-label')+txt(295,290,'energy converts along the track','diagram-note');
  }
  return b+dataPanel(example);
}
function dopplerDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2){
    b=circle(v===1?160:410,175,30,'diagram-object')+txt(v===1?150:400,181,'S','diagram-object-label')+circle(v===1?455:165,175,24,'diagram-person');
    b+=txt(v===1?430:140,220,'listener','diagram-label');
    const dir=v===1?1:-1;
    b+=arrow(v===1?190:380,105,v===1?285:285,105)+txt(225,90,'v_S','diagram-label');
    b+='<path d="M235 125 Q300 175 235 225 M280 105 Q370 175 280 245 M335 90 Q455 175 335 260" class="diagram-wave"></path>';
    b+=txt(120,295,v===1?'source approaching':'source receding','diagram-note');
  }else if(v===3){
    b=circle(180,175,30,'diagram-object')+txt(170,181,'S','diagram-object-label')+circle(430,175,24,'diagram-person');
    b+=arrow(430,110,345,110)+txt(365,95,'v_L','diagram-label')+txt(392,220,'listener moves','diagram-label');
    b+='<path d="M235 125 Q300 175 235 225 M280 105 Q370 175 280 245" class="diagram-wave"></path>';
  }else{
    b=circle(190,175,30,'diagram-object')+txt(180,181,'S','diagram-object-label');
    b+='<path d="M250 120 Q320 175 250 230 M305 95 Q405 175 305 255 M365 80 Q490 175 365 270" class="diagram-wave"></path>';
    b+=line(395,120,470,120,'class="diagram-measure"')+txt(425,105,'λ','diagram-label')+txt(120,292,'stationary-source wavelength','diagram-note');
  }
  return b+dataPanel(example);
}
function electrostaticsDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=circle(160,175,38,'diagram-object')+circle(420,175,38,'diagram-object');
    b+=txt(145,181,'q₁','diagram-object-label')+txt(405,181,'q₂','diagram-object-label');
    b+=line(198,175,382,175,'class="diagram-measure"')+txt(282,155,'r','diagram-label')+arrow(205,220,145,220)+arrow(375,220,435,220);
  }else if(v===2){
    b=circle(210,175,42,'diagram-object')+txt(195,181,'+Q','diagram-object-label')+circle(430,175,10,'diagram-point');
    b+=line(252,175,420,175,'class="diagram-measure"')+txt(330,155,'r','diagram-label')+arrow(430,175,495,175)+txt(462,160,'E','diagram-label');
  }else if(v===3){
    b+='<path d="M105 110 H485 M105 240 H485" class="diagram-fieldplate"></path>';
    for(let x=150;x<=440;x+=70)b+=arrow(x,225,x,125);
    b+=circle(300,175,18,'diagram-object')+txt(290,181,'q','diagram-object-label')+arrow(320,175,390,175)+txt(350,160,'F','diagram-label');
  }else{
    b=circle(160,175,34,'diagram-object')+circle(420,175,34,'diagram-object')+line(194,175,386,175,'class="diagram-measure"');
    b+=txt(265,150,'r₁ → r₂','diagram-label')+txt(120,275,'same charges · compare using inverse square','diagram-note');
  }
  return b+dataPanel(example);
}
function circuitsDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b='<path d="M100 110 H205 M315 110 H480 V240 H100 V110" class="diagram-wire"></path>';
    b+=line(205,92,205,128,'class="diagram-cell"')+line(230,82,230,138,'class="diagram-cell thick"')+rect(315,88,105,42,4,'diagram-resistor');
    b+=txt(345,116,'R','diagram-object-label')+txt(180,72,'V','diagram-label')+arrow(430,240,350,240)+txt(385,268,'I','diagram-label');
  }else if(v===2){
    b='<path d="M95 110 H210 M320 110 H495 V245 H95 V110" class="diagram-wire"></path>';
    b+=line(210,92,210,128,'class="diagram-cell"')+line(235,82,235,138,'class="diagram-cell thick"')+txt(190,70,'ε, r','diagram-label');
    b+=rect(335,88,100,42,4,'diagram-resistor')+txt(370,116,'R','diagram-object-label')+txt(120,285,'real cell: include internal resistance','diagram-note');
  }else if(v===3){
    b='<path d="M100 100 H190 V250 H100 V100 M190 100 H470 V250 H190" class="diagram-wire"></path>';
    b+=rect(270,80,90,38,4,'diagram-resistor')+rect(270,170,90,38,4,'diagram-resistor')+txt(305,106,'R₁','diagram-object-label')+txt(305,196,'R₂','diagram-object-label');
    b+=txt(115,290,'parallel branches share the same V','diagram-note');
  }else{
    b='<path d="M100 110 H490 V245 H100 V110" class="diagram-wire"></path>'+rect(275,88,105,42,4,'diagram-resistor');
    b+=txt(312,116,'R','diagram-object-label')+txt(130,165,'ideal supply','diagram-label')+txt(125,290,'power in the specified resistor','diagram-note');
  }
  return b+dataPanel(example);
}
function machinesDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=rect(105,85,95,170,12,'diagram-magnet')+rect(420,85,95,170,12,'diagram-magnet');
    b+=txt(143,175,'N','diagram-object-label')+txt(458,175,'S','diagram-object-label')+'<path d="M245 110 V240 H365 V110 Z" class="diagram-coil"></path>';
    b+=arrow(305,90,365,90)+txt(317,72,'rotation','diagram-label')+txt(165,292,'changing Φ induces ε','diagram-note');
  }else if(v===2){
    b=rect(150,110,260,130,8,'diagram-coil')+arrow(90,175,470,175)+txt(275,155,'B','diagram-label');
    b+=line(280,175,390,105,'class="diagram-normal"')+txt(395,105,'normal','diagram-label')+txt(350,138,'θ','diagram-label');
  }else if(v===3){
    b=rect(130,95,120,65,8,'diagram-supply')+txt(165,133,'input','diagram-object-label')+arrow(255,128,350,128)+rect(350,95,120,65,8,'diagram-motor');
    b+=txt(385,133,'motor','diagram-object-label')+arrow(410,165,410,245)+txt(425,218,'P_out','diagram-label');
  }else{
    b=rect(125,105,130,70,8,'diagram-generator')+txt(160,145,'generator','diagram-object-label')+line(255,140,445,140,'class="diagram-wire"')+rect(445,115,80,50,5,'diagram-resistor');
    b+=txt(470,145,'load','diagram-object-label')+txt(305,120,'V, I','diagram-label');
  }
  return b+dataPanel(example);
}
function acDiagram(example) {
  const v=variantOf(example);
  let b=line(90,175,490,175,'class="diagram-axis"')+line(285,70,285,275,'class="diagram-axis"');
  b+='<path d="M95 175 C140 85 185 85 230 175 C275 265 320 265 365 175 C410 85 450 90 485 175" class="diagram-wave strong"></path>';
  if(v===1){b+=line(145,90,145,175,'class="diagram-measure"')+txt(155,115,'V_max','diagram-label');}
  else if(v===2){b+=line(145,110,145,175,'class="diagram-measure"')+txt(155,132,'I_rms','diagram-label');}
  else if(v===3){b+=rect(355,215,115,46,4,'diagram-resistor')+txt(388,244,'R','diagram-object-label')+txt(110,300,'use RMS values for average power','diagram-note');}
  else{b+=line(95,250,230,250,'class="diagram-measure"')+txt(150,272,'one period T','diagram-label')+txt(340,295,'f = 1/T','diagram-note');}
  return b+dataPanel(example);
}
function photoelectricDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2||v===4){
    b=rect(390,105,34,150,4,'diagram-metal')+txt(375,285,'metal','diagram-label');
    b+=arrow(95,120,360,150)+arrow(95,175,360,175)+arrow(95,230,360,200);
    b+=txt(105,95,v===4?'λ given':'photons: E = hf','diagram-label');
    b+=arrow(425,145,500,115)+arrow(425,185,505,185)+txt(450,88,'e⁻','diagram-label');
    if(v===2)b+=txt(110,292,'K_max = hf − W₀','diagram-note');
  }else{
    b=line(100,250,100,90,'class="diagram-axis"')+line(100,250,490,250,'class="diagram-axis"');
    b+='<path d="M170 250 L455 105" class="diagram-profile"></path>'+txt(420,95,'K_max','diagram-label')+txt(455,273,'f','diagram-label')+txt(150,272,'f₀','diagram-label');
  }
  return b+dataPanel(example);
}
function organicNamesDiagram(example) {
  const v=variantOf(example), s=seedOf(example);
  let b='';
  if(v===1){
    b=txt(115,175,'CH₃','diagram-formula')+line(170,168,225,168,'class="diagram-bond"')+txt(235,175,'CH','diagram-formula')+line(280,168,335,168,'class="diagram-bond"')+txt(345,175,'CH₃','diagram-formula');
    b+=line(255,145,255,105,'class="diagram-bond"')+txt(235,92,'CH₃','diagram-formula')+txt(120,265,'identify parent chain + branch','diagram-note');
  }else if(v===2){
    b=txt(110,175,'CH₃','diagram-formula')+line(170,168,225,168,'class="diagram-bond double"')+txt(235,175,'CH','diagram-formula')+line(280,168,335,168,'class="diagram-bond"')+txt(345,175,'CH₃','diagram-formula');
    b+=txt(125,260,'locate the multiple bond before numbering','diagram-note');
  }else if(v===3){
    b=txt(115,175,'CH₃–CH₂–CH₂–OH','diagram-formula')+rect(350,135,90,55,8,'diagram-callout')+txt(372,168,'–OH','diagram-formula')+txt(120,255,'functional group determines suffix','diagram-note');
  }else{
    b=txt(105,145,'CH₃CH₂CH₂CH₃','diagram-formula')+txt(105,215,'CH₃CH(CH₃)CH₃','diagram-formula')+txt(120,275,'compare connectivity for isomerism','diagram-note');
  }
  return b+dataPanel(example);
}
function organicPropertiesDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=rect(115,115,130,72,32,'diagram-molecule')+rect(360,115,130,72,32,'diagram-molecule')+line(245,151,360,151,'class="diagram-imf"');
    b+=txt(260,132,'IMF strength','diagram-label')+txt(115,250,'compare boiling points','diagram-note');
  }else if(v===2){
    b=txt(115,150,'straight chain','diagram-label')+line(120,180,410,180,'class="diagram-chain"')+txt(115,245,'larger contact area','diagram-note');
  }else if(v===3){
    b=rect(125,100,135,120,12,'diagram-liquid')+rect(355,100,135,120,12,'diagram-liquid')+arrow(190,100,190,65)+arrow(420,100,420,65);
    b+=txt(140,250,'vapour pressure comparison','diagram-note');
  }else{
    b=rect(155,120,120,65,30,'diagram-molecule')+rect(345,120,120,65,30,'diagram-molecule')+arrow(310,205,310,270)+txt(330,248,'heat','diagram-label');
    b+=txt(110,300,'boiling overcomes attractions between molecules','diagram-note');
  }
  return b+dataPanel(example);
}
function organicReactionsDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=txt(105,165,'C=C + H₂','diagram-formula')+arrow(245,158,365,158)+txt(270,135,'catalyst','diagram-label')+txt(390,165,'C–C','diagram-formula');
  }else if(v===2){
    b=txt(95,165,'alcohol','diagram-formula')+arrow(205,158,345,158)+txt(240,132,'Δ / acid','diagram-label')+txt(370,165,'alkene + H₂O','diagram-formula');
  }else if(v===3){
    b=txt(80,155,'acid + alcohol','diagram-formula')+arrow(235,148,355,148)+txt(260,122,'H⁺','diagram-label')+txt(375,155,'ester + water','diagram-formula')+txt(120,225,'esterification','diagram-note');
  }else{
    b=txt(85,155,'n(CH₂=CHR)','diagram-formula')+arrow(245,148,360,148)+txt(380,155,'[–CH₂–CHR–]ₙ','diagram-formula')+txt(125,225,'addition polymerisation','diagram-note');
  }
  return b+dataPanel(example);
}
function ratesDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b=line(100,250,100,85,'class="diagram-axis"')+line(100,250,490,250,'class="diagram-axis"')+'<path d="M110 105 C200 145 270 205 480 235" class="diagram-profile"></path>';
    b+=txt(55,95,'c','diagram-label')+txt(455,275,'t','diagram-label')+txt(130,295,'rate from Δc/Δt','diagram-note');
  }else if(v===2||v===3){
    b=line(100,250,100,85,'class="diagram-axis"')+line(100,250,490,250,'class="diagram-axis"')+'<path d="M110 220 C210 220 245 105 325 105 C405 105 425 180 480 180" class="diagram-profile"></path>';
    if(v===2)b+=arrow(325,220,325,112)+txt(340,165,'E_a','diagram-label');
    else b+=line(110,220,480,180,'class="diagram-measure"')+txt(250,205,'ΔH','diagram-label');
  }else{
    b=rect(120,100,120,125,10,'diagram-flask')+rect(335,100,120,125,10,'diagram-flask')+arrow(180,80,180,45)+arrow(395,80,395,35);
    b+=txt(115,270,'compare gas production / time','diagram-note');
  }
  return b+dataPanel(example);
}
function equilibriumDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2){
    b=rect(90,125,150,80,12,'diagram-molecule')+rect(350,125,150,80,12,'diagram-molecule');
    b+=txt(125,172,v===1?'H₂ + I₂':'N₂O₄','diagram-formula')+txt(392,172,v===1?'2HI':'2NO₂','diagram-formula');
    b+=arrow(255,145,335,145)+arrow(335,190,255,190)+txt(115,275,'use equilibrium concentrations in Kc','diagram-note');
  }else if(v===3){
    b=rect(145,90,280,165,14,'diagram-vessel')+txt(195,145,'initial → change → equilibrium','diagram-label')+txt(185,185,'stoichiometric coefficients matter','diagram-note');
  }else{
    b=rect(100,115,170,100,12,'diagram-molecule')+rect(350,115,170,100,12,'diagram-molecule')+arrow(285,145,335,145)+arrow(335,185,285,185);
    b+=txt(120,275,'compare concentration changes','diagram-note');
  }
  return b+dataPanel(example);
}
function acidsDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1){
    b='<path d="M135 95 H395 L365 250 H165 Z" class="diagram-beaker"></path>'+circle(230,160,20,'diagram-ion')+circle(300,205,20,'diagram-ion');
    b+=txt(205,166,'H₃O⁺','diagram-label')+txt(115,290,'pH = −log[H₃O⁺]','diagram-note');
  }else if(v===2){
    b=rect(105,110,110,90,12,'diagram-display')+txt(130,165,'pH','diagram-object-label')+arrow(230,155,340,155)+txt(355,160,'[H₃O⁺]','diagram-formula');
  }else if(v===3){
    b=circle(190,155,24,'diagram-ion')+circle(350,155,24,'diagram-ion')+txt(160,161,'H₃O⁺','diagram-label')+txt(330,161,'OH⁻','diagram-label');
    b+=txt(120,245,'K_w = [H₃O⁺][OH⁻]','diagram-note');
  }else{
    b='<path d="M135 95 H395 L365 250 H165 Z" class="diagram-beaker"></path>'+circle(230,160,20,'diagram-ion')+circle(300,205,20,'diagram-ion');
    b+=txt(210,166,'OH⁻','diagram-label')+txt(115,290,'strong base → pOH → pH','diagram-note');
  }
  return b+dataPanel(example);
}
function titrationDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2){
    b=rect(285,55,42,145,5,'diagram-glass')+line(306,200,306,232,'class="diagram-glass-line"')+'<path d="M245 285 L275 225 H355 L385 285 Z" class="diagram-flask"></path>'+circle(306,243,5,'diagram-drop');
    b+=txt(340,105,'burette','diagram-label')+txt(110,125,v===2?'1:2 mole ratio':'1:1 mole ratio','diagram-note');
  }else if(v===3){
    b=rect(130,110,115,85,10,'diagram-beaker')+arrow(260,150,350,150)+rect(365,85,70,145,10,'diagram-volumetric');
    b+=txt(125,255,'n = cV','diagram-note')+txt(355,255,'solution volume','diagram-note');
  }else{
    b=rect(120,95,95,70,8,'diagram-balance')+txt(140,138,'mass','diagram-object-label')+arrow(230,130,330,130)+rect(345,75,80,160,10,'diagram-volumetric');
    b+=txt(110,285,'mass → moles → concentration','diagram-note');
  }
  return b+dataPanel(example);
}
function galvanicDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2||v===3){
    b='<path d="M80 120 H210 V250 H80 Z M345 120 H475 V250 H345 Z" class="diagram-cell-beaker"></path>';
    b+=line(145,90,145,220,'class="diagram-electrode"')+line(410,90,410,220,'class="diagram-electrode"')+'<path d="M145 90 Q278 35 410 90" class="diagram-wire"></path>'+'<path d="M210 180 Q278 125 345 180" class="diagram-saltbridge"></path>';
    if(v===1)b+=txt(225,55,'E°cell','diagram-label');
    if(v===2)b+=txt(95,285,'oxidation electrode?','diagram-note');
    if(v===3)b+=arrow(205,58,350,58)+txt(270,45,'e⁻','diagram-label');
  }else{
    b=line(105,225,105,85,'class="diagram-axis"')+line(105,225,485,225,'class="diagram-axis"')+rect(175,130,75,95,0,'diagram-graph-fill')+txt(180,120,'I','diagram-label')+txt(270,250,'t','diagram-label')+txt(145,285,'Q = IΔt','diagram-note');
  }
  return b+dataPanel(example);
}
function electrolysisDiagram(example) {
  const v=variantOf(example);
  let b='';
  if(v===1||v===2||v===3){
    b='<path d="M125 125 H465 V265 H125 Z" class="diagram-cell-beaker"></path>'+line(215,100,215,230,'class="diagram-electrode"')+line(375,100,375,230,'class="diagram-electrode"');
    b+=rect(245,55,100,45,6,'diagram-supply')+txt(265,82,'DC supply','diagram-object-label')+line(215,100,260,100,'class="diagram-wire"')+line(330,100,375,100,'class="diagram-wire"');
    if(v===1)b+=txt(165,290,'cathode half-reaction','diagram-note');
    if(v===2)b+=txt(335,290,'anode half-reaction','diagram-note');
    if(v===3)b+=txt(150,290,'cathode −   |   anode +','diagram-note');
  }else{
    b=line(105,225,105,85,'class="diagram-axis"')+line(105,225,485,225,'class="diagram-axis"')+rect(175,135,95,90,0,'diagram-graph-fill');
    b+=txt(185,120,'current','diagram-label')+txt(300,250,'time','diagram-label')+txt(155,285,'charge = area = IΔt','diagram-note');
  }
  return b+dataPanel(example);
}
export function questionDiagram(topic, example) {
  let body = '';
  let caption = 'Use the diagram together with the values stated in the question.';
  switch (topic.id) {
    case 'forces': body = forcesDiagram(example); caption = 'Free-body sketch: identify only the forces acting on the chosen object.'; break;
    case 'gravity': body = gravityDiagram(example); caption = 'Centre-to-centre separation matters in the inverse-square relationship.'; break;
    case 'momentum': body = momentumDiagram(example); caption = 'Take one direction as positive and keep the velocity signs consistent before and after the interaction.'; break;
    case 'projectiles': body = projectileDiagram(example); caption = 'Choose a vertical sign convention first. Gravitational acceleration remains downward throughout the motion.'; break;
    case 'energy': body = energyDiagram(example); caption = 'Compare the force direction with the displacement before calculating work.'; break;
    case 'doppler': body = dopplerDiagram(example); caption = 'Decide first whether the source and listener are approaching or moving apart.'; break;
    case 'electrostatics': body = electrostaticsDiagram(example); caption = 'Mark charge signs and the separation before deciding force or field direction.'; break;
    case 'circuits': body = circuitsDiagram(example); caption = 'Simplify the external circuit first, then include the cell internal resistance if it is given.'; break;
    case 'machines': body = machinesDiagram(example); caption = 'Track magnetic field direction, coil motion and changing flux.'; break;
    case 'ac': body = acDiagram(example); caption = 'RMS and peak values are different. Use the value requested by the question.'; break;
    case 'photoelectric': body = photoelectricDiagram(example); caption = 'Compare photon energy with the work function before considering electron kinetic energy.'; break;
    case 'organic-names': body = organicNamesDiagram(example); caption = 'Find the functional group, choose the parent chain and then number the structure.'; break;
    case 'organic-properties': body = organicPropertiesDiagram(example); caption = 'Keep intramolecular bonds separate from attractions between molecules.'; break;
    case 'organic-reactions': body = organicReactionsDiagram(example); caption = 'Write reagents and conditions above the reaction arrow and check atom conservation.'; break;
    case 'rates': body = ratesDiagram(example); caption = 'Read energy changes vertically and reaction progress horizontally.'; break;
    case 'equilibrium': body = equilibriumDiagram(example); caption = 'Dynamic equilibrium means both reactions continue at equal rates in a closed system.'; break;
    case 'acids': body = acidsDiagram(example); caption = 'Use concentrations and the stated temperature relationship rather than judging acidity by appearance.'; break;
    case 'titrations': body = titrationDiagram(example); caption = 'Convert the measured volume to dm³, calculate moles and then use the balanced ratio.'; break;
    case 'galvanic': body = galvanicDiagram(example); caption = 'Electrons travel through the external circuit from anode to cathode; ions move through the electrolyte and salt bridge.'; break;
    case 'electrolysis': body = electrolysisDiagram(example); caption = 'The external supply drives the reaction. Reduction remains at the cathode and oxidation at the anode.'; break;
    default: body = txt(210, 170, 'Read the given values and sketch the physical situation.', 'diagram-note');
  }
  return baseFigure(topic, example, body, caption);
}
