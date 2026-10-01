import {videos} from './data/videos.js';
import {topics} from './data/content.js';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={'explainer':'Explanations','worked-example':'Worked examples','past-paper':'Past papers','revision':'Revision'};
const pageSize=12;
const states=new WeakMap();

export function videoLibrary({topic='',paper=0,kind=''}={}) {
 const list=videos.filter(v=>(!topic||v.topic===topic)&&(!paper||v.paper===paper));
 return `<section class="video-library" data-topic="${escape(topic)}" data-paper="${paper}" data-kind="${escape(kind)}" aria-label="YouTube video lessons">
 <div class="section-heading"><div><h2>${kind==='past-paper'?'Past-paper walkthroughs':'Watch it, pause it, work it out.'}</h2><p>Pick one lesson. Pause before the answer and try the working yourself.</p></div><span class="pill">${list.length} videos${topic?' in this topic':''}</span></div>
 <div class="video-filters"><label>Find a video<input type="search" data-video-filter="query" placeholder="Search title or educator…"></label>
 ${!topic?`<label>Topic<select data-video-filter="topic"><option value="">All topics</option>${topics.filter(t=>!paper||t.paper===paper).map(t=>`<option value="${t.id}">${escape(t.title)}</option>`).join('')}</select></label>`:''}
 <label>Lesson type<select data-video-filter="kind"><option value="">All lesson types</option>${Object.entries(labels).map(([key,label])=>`<option value="${key}" ${key===kind?'selected':''}>${label}</option>`).join('')}</select></label>
 <label>Educator<select data-video-filter="source"><option value="">All educators</option>${[...new Set(list.map(v=>v.source))].sort().map(s=>`<option>${escape(s)}</option>`).join('')}</select></label></div>
 <div class="video-results"></div><p class="caption video-credit">Lessons belong to their credited YouTube educators. South African exam lessons are marked “SA exam support”; other lessons build the same concepts. Follow CAPS notes and official memos for exam requirements. If a player is unavailable, use “Open on YouTube”.</p></section>`;
}
function card(v) {
 return `<article class="video-card"><div class="video-frame"><button class="video-play" data-video-play="${v.id}" aria-label="Play ${escape(v.title)}"><img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt=""><span class="play-symbol" aria-hidden="true">▶</span><span class="play-caption">Play lesson${v.duration?' · '+escape(v.duration):''}</span></button></div><div class="video-copy"><div class="actions"><span class="pill">${labels[v.type]||'Lesson'}</span><span class="pill">${v.scope==='caps'?'SA exam support':'Concept support'}</span></div><h3>${escape(v.title)}</h3><small>${escape(v.source)}</small><a class="link-button" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open on YouTube</a></div></article>`;
}
function renderResults(root,focus=false) {
 let state=states.get(root);
 if(!state){state={page:0,query:'',topic:root.dataset.topic,kind:root.dataset.kind,source:''};states.set(root,state)}
 const list=videos.filter(v=>(!root.dataset.paper||root.dataset.paper==='0'||v.paper===Number(root.dataset.paper))&&(!state.topic||v.topic===state.topic)&&(!state.kind||v.type===state.kind)&&(!state.source||v.source===state.source)&&`${v.title} ${v.source}`.toLowerCase().includes(state.query.toLowerCase().trim()));
 const pages=Math.max(1,Math.ceil(list.length/pageSize));state.page=Math.min(state.page,pages-1);
 const start=state.page*pageSize,end=Math.min(start+pageSize,list.length);
 root.querySelector('.video-results').innerHTML=`<p class="video-count" role="status">${list.length?`Showing ${start+1}–${end} of ${list.length} videos`:'No videos match these filters.'}</p>${list.length?`<div class="video-grid">${list.slice(start,end).map(card).join('')}</div>`:`<button class="button secondary" data-video-reset>Clear filters</button>`}<div class="video-pagination" aria-label="Video pages"><button class="button secondary" data-video-page="-1" ${state.page===0?'disabled':''}>Previous videos</button><span>Page ${state.page+1} of ${pages}</span><button class="button secondary" data-video-page="1" ${state.page>=pages-1?'disabled':''}>Next videos</button></div>`;
 if(focus){const status=root.querySelector('.video-count');status.tabIndex=-1;status.focus({preventScroll:true});status.scrollIntoView({block:'start',behavior:'auto'})}
}
export function mountVideoLibraries(){document.querySelectorAll('.video-library').forEach(root=>renderResults(root))}
function filter(event){const control=event.target.closest('[data-video-filter]');if(!control)return;const root=control.closest('.video-library');const state=states.get(root);if(!state)return;state[control.dataset.videoFilter]=control.value;state.page=0;renderResults(root)}
document.addEventListener('input',event=>{if(event.target.type==='search')filter(event)});
document.addEventListener('change',event=>{if(event.target.tagName==='SELECT')filter(event)});
document.addEventListener('click',event=>{
 const play=event.target.closest('[data-video-play]');
 if(play){
  document.querySelectorAll('.video-frame iframe').forEach(frame=>{const old=frame.closest('.video-card');const video=videos.find(v=>v.id===frame.dataset.videoId);if(video)old.querySelector('.video-frame').innerHTML=card(video).match(/<div class="video-frame">([\s\S]*?)<\/div>/)[1]});
  const v=videos.find(v=>v.id===play.dataset.videoPlay);if(!v)return;
  const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;frame.title=v.title;frame.dataset.videoId=v.id;frame.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;play.replaceWith(frame);return;
 }
 const button=event.target.closest('[data-video-page],[data-video-reset]');if(!button)return;
 const root=button.closest('.video-library'),state=states.get(root);if(!state)return;
 if(button.hasAttribute('data-video-reset')){root.querySelectorAll('[data-video-filter]').forEach(el=>{el.value=''});Object.assign(state,{page:0,query:'',topic:root.dataset.topic,kind:'',source:''})}else state.page+=Number(button.dataset.videoPage);
 renderResults(root,true);
});
