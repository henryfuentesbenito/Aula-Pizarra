/* Topic registry and editor-style tabs. Existing lesson indices remain stable. */
(()=>{
const catalog=window.aulaTopics=[{id:'proporcionalidad',title:'Proporcionalidad',start:0,end:47},{id:'polinomios',title:'Polinomios',start:48,end:lessons.length-1}];
const selector=document.getElementById('topicSelect'), strip=document.getElementById('lessonTabs');
const opened=new Map();let active=current;
function topicFor(i){return catalog.find(t=>i>=t.start&&i<=t.end)||catalog[0]}
function syncTopics(){selector.replaceChildren(...catalog.map(t=>new Option(t.title,t.id)));selector.value=topicFor(current).id;}
function drawTabs(){strip.replaceChildren();for(const [i,state] of opened){const tab=document.createElement('div');tab.className='lesson-tab'+(i===current?' selected':'');const open=document.createElement('button');open.textContent=labels[i];open.title=lessons[i][0];open.setAttribute('role','tab');open.setAttribute('aria-selected',String(i===current));open.onclick=()=>activate(i);const close=document.createElement('button');close.className='tab-close';close.textContent='×';close.title='Cerrar '+labels[i];close.setAttribute('aria-label',close.title);close.onclick=()=>{const keys=[...opened.keys()],pos=keys.indexOf(i);if(i===current){const target=keys[pos+1]??keys[pos-1];if(target===undefined){opened.delete(i);drawTabs();document.body.classList.add('no-lesson');return}activate(target);}opened.delete(i);drawTabs()};tab.append(open,close);strip.append(tab);} }
function activate(i){if(document.getElementById('playAuto').textContent.includes('Pausar'))document.getElementById('playAuto').click();document.getElementById('v4Pause').click();current=i;revealed=opened.get(i)?.revealed||1;render();}
const base=render;render=function(){document.body.classList.remove('no-lesson');active=current;opened.set(current,{revealed});base();const t=topicFor(current);selector.value=t.id;groupPanels.forEach((p,j)=>{p.hidden=groups[j][1]<t.start||groups[j][2]>t.end});document.getElementById('topicHeading').textContent='Matemáticas · 3.º y 4.º ESO · '+t.title;drawTabs();};
stepButtons.forEach((b,i)=>b.onclick=()=>activate(i));selector.onchange=()=>{const t=catalog.find(t=>t.id===selector.value);activate([...opened.keys()].find(i=>i>=t.start&&i<=t.end)??t.start)};
syncTopics();render();
})();
