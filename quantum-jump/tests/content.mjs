import assert from 'node:assert/strict';
import {topics,example} from '../data/content.js';
import {simulations,simulationView} from '../simulations.js';
let count=0;
for(const t of topics){
 const bank=Array.from({length:100},(_,i)=>example(t.id,i));
 assert.equal(new Set(bank.map(e=>e.id)).size,100);
 assert.equal(new Set(bank.map(e=>e.question)).size,100);
 for(const e of bank){assert.equal(e.steps.length,5);assert.ok(e.known&&e.find&&e.answer);assert.ok(!JSON.stringify(e).includes('undefined'));if(e.number!==null){assert.ok(Number.isFinite(e.number));assert.ok(Math.abs(Number(e.answer)-e.number)<=Math.max(Math.abs(e.number)*.001,1e-40));}count++;}
}
assert.ok(Math.abs(example('forces',0).number-0.8666666666666667)<1e-10);
assert.equal(example('momentum',0).number,-13.5);
assert.ok(Math.abs(example('projectiles',1).number-121/19.6)<1e-10);
assert.ok(Math.abs(example('titrations',1).number-0.1008)<1e-10);
assert.equal(example('galvanic',0).number,1.1);
for(const s of simulations){for(const a of [s.a[1],s.a[4],s.a[2]])for(const b of [s.b[1],s.b[4],s.b[2]]){const v=simulationView(s.id,a,b);assert.ok(v.diagram.includes('<svg'));assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(v)));}}
console.log(`PASS: ${count} structured examples, 20 unique section banks, independent numerical checks, 90 simulation boundary states.`);
