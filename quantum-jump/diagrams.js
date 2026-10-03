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

function forcesDiagram() {
  let b = rect(285, 142, 150, 80, 12, 'diagram-object') + line(90, 223, 665, 223, 'class="diagram-ground"');
  b += arrow(360, 140, 360, 72) + txt(374, 84, 'N', 'diagram-label');
  b += arrow(360, 224, 360, 292) + txt(374, 286, 'w (F_g)', 'diagram-label');
  b += arrow(435, 182, 575, 182) + txt(520, 165, 'applied / resultant', 'diagram-label');
  b += arrow(285, 198, 170, 198) + txt(178, 183, 'friction if present', 'diagram-label');
  b += txt(325, 188, 'object', 'diagram-object-label');
  return b;
}

function gravityDiagram() {
  let b = circle(250, 176, 48, 'diagram-object') + circle(520, 176, 66, 'diagram-object');
  b += line(298, 176, 454, 176, 'class="diagram-measure"') + txt(368, 160, 'r', 'diagram-label');
  b += arrow(305, 210, 390, 210) + arrow(465, 210, 380, 210);
  b += txt(222, 182, 'm₁', 'diagram-object-label') + txt(493, 182, 'm₂', 'diagram-object-label');
  b += txt(318, 235, 'equal and opposite attraction', 'diagram-label');
  return b;
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

function energyDiagram() {
  let b = line(105, 235, 660, 235, 'class="diagram-ground"') + rect(210, 165, 130, 70, 10, 'diagram-object');
  b += arrow(340, 170, 485, 105) + txt(425, 105, 'F', 'diagram-label');
  b += arrow(340, 255, 565, 255) + txt(445, 282, 'Δx', 'diagram-label');
  b += '<path d="M395 235 A55 55 0 0 0 385 205" class="diagram-measure"></path>' + txt(395, 210, 'θ', 'diagram-label');
  b += txt(245, 205, 'trolley', 'diagram-object-label');
  return b;
}

function dopplerDiagram() {
  let b = circle(235, 175, 34, 'diagram-object') + txt(219, 181, 'S', 'diagram-object-label') + circle(585, 175, 28, 'diagram-person');
  b += txt(570, 227, 'listener', 'diagram-label') + arrow(270, 105, 355, 105) + txt(292, 90, 'v_S', 'diagram-label');
  b += '<path d="M300 125 Q365 175 300 225 M345 105 Q435 175 345 245 M400 90 Q520 175 400 260" class="diagram-wave"></path>';
  b += txt(305, 292, 'wavefront spacing changes when source and listener move relative to one another', 'diagram-note');
  return b;
}

function electrostaticsDiagram() {
  let b = circle(225, 175, 42, 'diagram-object') + circle(535, 175, 42, 'diagram-object');
  b += txt(205, 181, 'q₁', 'diagram-object-label') + txt(515, 181, 'q₂', 'diagram-object-label');
  b += line(267, 175, 493, 175, 'class="diagram-measure"') + txt(373, 156, 'r', 'diagram-label');
  b += arrow(270, 225, 185, 225) + arrow(490, 225, 575, 225) + txt(342, 252, 'force direction depends on charge signs', 'diagram-note');
  return b;
}

function circuitsDiagram() {
  let b = '<path d="M165 105 H325 M435 105 H600 V245 H165 V105" class="diagram-wire"></path>';
  b += line(325, 88, 325, 122, 'class="diagram-cell"') + line(350, 78, 350, 132, 'class="diagram-cell thick"') + txt(320, 68, 'ε, r', 'diagram-label');
  b += rect(380, 84, 110, 42, 4, 'diagram-resistor') + txt(416, 112, 'R', 'diagram-object-label');
  b += arrow(515, 245, 430, 245) + txt(462, 272, 'I', 'diagram-label') + txt(225, 205, 'V = IR', 'diagram-note');
  return b;
}

function machinesDiagram() {
  let b = rect(120, 85, 120, 170, 12, 'diagram-magnet') + rect(520, 85, 120, 170, 12, 'diagram-magnet');
  b += txt(168, 175, 'N', 'diagram-object-label') + txt(568, 175, 'S', 'diagram-object-label');
  b += '<path d="M300 110 V240 H460 V110 Z" class="diagram-coil"></path>' + arrow(380, 90, 455, 90) + txt(395, 74, 'rotation', 'diagram-label');
  b += arrow(245, 175, 505, 175) + txt(350, 160, 'B', 'diagram-label') + txt(290, 290, 'changing magnetic flux induces an emf', 'diagram-note');
  return b;
}

function acDiagram() {
  let b = line(100, 175, 660, 175, 'class="diagram-axis"') + line(380, 70, 380, 280, 'class="diagram-axis"');
  b += '<path d="M105 175 C165 80 225 80 285 175 C345 270 405 270 465 175 C525 80 585 80 655 175" class="diagram-wave strong"></path>';
  b += txt(570, 155, 'V or I', 'diagram-label') + txt(592, 205, 'time', 'diagram-label') + txt(145, 296, 'RMS value gives the equivalent heating effect for a sinusoidal supply', 'diagram-note');
  return b;
}

function photoelectricDiagram() {
  let b = rect(460, 105, 36, 150, 4, 'diagram-metal') + txt(444, 285, 'metal', 'diagram-label');
  b += arrow(120, 115, 430, 150) + arrow(120, 165, 430, 175) + arrow(120, 215, 430, 200);
  b += txt(125, 95, 'photons: E = hf', 'diagram-label') + arrow(500, 145, 620, 105) + arrow(500, 180, 630, 180) + arrow(500, 215, 610, 250);
  b += txt(535, 82, 'electrons', 'diagram-label') + txt(150, 292, 'emission occurs only when hf ≥ W₀', 'diagram-note');
  return b;
}

function organicNamesDiagram() {
  let b = circle(230, 175, 30, 'diagram-atom') + circle(350, 175, 30, 'diagram-atom') + circle(470, 175, 30, 'diagram-atom');
  b += line(260, 175, 320, 175, 'class="diagram-bond"') + line(380, 175, 440, 175, 'class="diagram-bond"');
  b += txt(220, 182, 'C', 'diagram-object-label') + txt(340, 182, 'C', 'diagram-object-label') + txt(460, 182, 'C', 'diagram-object-label');
  b += rect(545, 140, 120, 70, 10, 'diagram-callout') + txt(566, 172, 'functional', 'diagram-label') + txt(585, 194, 'group', 'diagram-label');
  b += line(500, 175, 545, 175, 'class="diagram-bond"') + txt(176, 285, 'identify the functional group first, then number the parent chain', 'diagram-note');
  return b;
}

function organicPropertiesDiagram() {
  let b = rect(150, 115, 160, 80, 35, 'diagram-molecule') + rect(450, 115, 160, 80, 35, 'diagram-molecule');
  b += txt(205, 162, 'molecule', 'diagram-object-label') + txt(505, 162, 'molecule', 'diagram-object-label');
  b += line(312, 155, 448, 155, 'class="diagram-imf"') + txt(335, 137, 'intermolecular attraction', 'diagram-label');
  b += arrow(380, 215, 380, 270) + txt(398, 252, 'energy needed to separate', 'diagram-label');
  return b;
}

function organicReactionsDiagram() {
  let b = rect(110, 125, 180, 80, 14, 'diagram-molecule') + rect(470, 125, 180, 80, 14, 'diagram-molecule');
  b += txt(158, 172, 'reactant(s)', 'diagram-object-label') + txt(525, 172, 'product(s)', 'diagram-object-label');
  b += arrow(310, 165, 445, 165) + txt(332, 142, 'reagents + conditions', 'diagram-label');
  b += txt(165, 270, 'track atoms and functional groups across the reaction', 'diagram-note');
  return b;
}

function ratesDiagram() {
  let b = line(120, 255, 120, 75, 'class="diagram-axis"') + line(120, 255, 650, 255, 'class="diagram-axis"');
  b += '<path d="M125 225 C220 225 260 100 350 100 C440 100 470 185 645 185" class="diagram-profile"></path>';
  b += txt(62, 92, 'energy', 'diagram-label') + txt(555, 285, 'reaction progress', 'diagram-label');
  b += arrow(350, 220, 350, 110) + txt(365, 165, 'E_a', 'diagram-label') + txt(505, 173, 'products', 'diagram-label') + txt(150, 212, 'reactants', 'diagram-label');
  return b;
}

function equilibriumDiagram() {
  let b = rect(105, 125, 200, 90, 14, 'diagram-molecule') + rect(455, 125, 200, 90, 14, 'diagram-molecule');
  b += txt(175, 178, 'reactants', 'diagram-object-label') + txt(525, 178, 'products', 'diagram-object-label');
  b += arrow(325, 145, 435, 145) + arrow(435, 195, 325, 195) + txt(337, 118, 'forward', 'diagram-label') + txt(342, 224, 'reverse', 'diagram-label');
  b += txt(178, 285, 'at equilibrium the forward and reverse rates are equal', 'diagram-note');
  return b;
}

function acidsDiagram() {
  let b = '<path d="M235 95 H525 L490 260 H270 Z" class="diagram-beaker"></path>';
  b += circle(330, 165, 24, 'diagram-ion') + circle(430, 205, 24, 'diagram-ion') + circle(445, 135, 24, 'diagram-ion');
  b += txt(304, 171, 'H₃O⁺', 'diagram-label') + txt(410, 211, 'OH⁻', 'diagram-label') + txt(421, 141, 'H₃O⁺', 'diagram-label');
  b += txt(248, 292, 'pH depends on hydronium concentration, not on colour alone', 'diagram-note');
  return b;
}

function titrationDiagram() {
  let b = rect(345, 65, 48, 150, 6, 'diagram-glass') + line(369, 215, 369, 245, 'class="diagram-glass-line"');
  b += '<path d="M300 275 L330 220 H410 L440 275 Z" class="diagram-flask"></path>' + circle(370, 252, 5, 'diagram-drop');
  b += txt(408, 120, 'burette', 'diagram-label') + txt(450, 258, 'flask', 'diagram-label') + txt(120, 130, 'use n = cV', 'diagram-note') + txt(120, 160, 'then apply the mole ratio', 'diagram-note');
  return b;
}

function galvanicDiagram() {
  let b = '<path d="M130 120 H285 V260 H130 Z M475 120 H630 V260 H475 Z" class="diagram-cell-beaker"></path>';
  b += line(205, 92, 205, 225, 'class="diagram-electrode"') + line(555, 92, 555, 225, 'class="diagram-electrode"');
  b += '<path d="M205 92 Q380 38 555 92" class="diagram-wire"></path>' + arrow(280, 58, 475, 58);
  b += '<path d="M285 180 Q380 125 475 180" class="diagram-saltbridge"></path>';
  b += txt(180, 285, 'anode', 'diagram-label') + txt(525, 285, 'cathode', 'diagram-label') + txt(350, 48, 'e⁻', 'diagram-label') + txt(325, 145, 'salt bridge', 'diagram-label');
  return b;
}

function electrolysisDiagram() {
  let b = '<path d="M195 125 H565 V270 H195 Z" class="diagram-cell-beaker"></path>';
  b += line(285, 105, 285, 235, 'class="diagram-electrode"') + line(475, 105, 475, 235, 'class="diagram-electrode"');
  b += rect(315, 58, 130, 50, 7, 'diagram-supply') + txt(342, 88, 'DC supply', 'diagram-object-label');
  b += line(285, 105, 330, 105, 'class="diagram-wire"') + line(430, 105, 475, 105, 'class="diagram-wire"');
  b += txt(244, 294, 'cathode', 'diagram-label') + txt(455, 294, 'anode', 'diagram-label') + txt(255, 235, 'reduction', 'diagram-label') + txt(445, 235, 'oxidation', 'diagram-label');
  return b;
}

export function questionDiagram(topic, example) {
  let body = '';
  let caption = 'Use the diagram together with the values stated in the question.';
  switch (topic.id) {
    case 'forces': body = forcesDiagram(); caption = 'Free-body sketch: identify only the forces acting on the chosen object.'; break;
    case 'gravity': body = gravityDiagram(); caption = 'Centre-to-centre separation matters in the inverse-square relationship.'; break;
    case 'momentum': body = momentumDiagram(example); caption = 'Take one direction as positive and keep the velocity signs consistent before and after the interaction.'; break;
    case 'projectiles': body = projectileDiagram(example); caption = 'Choose a vertical sign convention first. Gravitational acceleration remains downward throughout the motion.'; break;
    case 'energy': body = energyDiagram(); caption = 'Compare the force direction with the displacement before calculating work.'; break;
    case 'doppler': body = dopplerDiagram(); caption = 'Decide first whether the source and listener are approaching or moving apart.'; break;
    case 'electrostatics': body = electrostaticsDiagram(); caption = 'Mark charge signs and the separation before deciding force or field direction.'; break;
    case 'circuits': body = circuitsDiagram(); caption = 'Simplify the external circuit first, then include the cell internal resistance if it is given.'; break;
    case 'machines': body = machinesDiagram(); caption = 'Track magnetic field direction, coil motion and changing flux.'; break;
    case 'ac': body = acDiagram(); caption = 'RMS and peak values are different. Use the value requested by the question.'; break;
    case 'photoelectric': body = photoelectricDiagram(); caption = 'Compare photon energy with the work function before considering electron kinetic energy.'; break;
    case 'organic-names': body = organicNamesDiagram(); caption = 'Find the functional group, choose the parent chain and then number the structure.'; break;
    case 'organic-properties': body = organicPropertiesDiagram(); caption = 'Keep intramolecular bonds separate from attractions between molecules.'; break;
    case 'organic-reactions': body = organicReactionsDiagram(); caption = 'Write reagents and conditions above the reaction arrow and check atom conservation.'; break;
    case 'rates': body = ratesDiagram(); caption = 'Read energy changes vertically and reaction progress horizontally.'; break;
    case 'equilibrium': body = equilibriumDiagram(); caption = 'Dynamic equilibrium means both reactions continue at equal rates in a closed system.'; break;
    case 'acids': body = acidsDiagram(); caption = 'Use concentrations and the stated temperature relationship rather than judging acidity by appearance.'; break;
    case 'titrations': body = titrationDiagram(); caption = 'Convert the measured volume to dm³, calculate moles and then use the balanced ratio.'; break;
    case 'galvanic': body = galvanicDiagram(); caption = 'Electrons travel through the external circuit from anode to cathode; ions move through the electrolyte and salt bridge.'; break;
    case 'electrolysis': body = electrolysisDiagram(); caption = 'The external supply drives the reaction. Reduction remains at the cathode and oxidation at the anode.'; break;
    default: body = txt(210, 170, 'Read the given values and sketch the physical situation.', 'diagram-note');
  }
  return baseFigure(topic, example, body, caption);
}
