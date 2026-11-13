import './style.css';

const app = document.querySelector('#app');

const initial = () => ({
  day: 1, maxDays: 10, acted: false, oxygen: 78, power: 76, food: 72, shield: 58,
  science: 0, morale: 80, log: [], used: [], event: null, ended: false,
  outcome: null, difficulty: 'standard'
});

let state = initial();

const events = [
  { id:'solar', title:'Solar weather alert', icon:'☀️', text:'Mission control reports increased solar activity. Your crew should reduce time outside and review the storm shelter.', choices:[
    {label:'Move crew into the shielded room', cost:{power:8}, change:{shield:7, morale:3}, note:'You used extra power to improve protection.'},
    {label:'Pause outdoor science work', cost:{science:0}, change:{shield:2, morale:-2}, note:'Less exposure, but the crew misses a research window.'}
  ]},
  { id:'dust', title:'Lunar dust is building up', icon:'🌘', text:'Dust is collecting around the solar panels. Output may fall unless the crew spends time cleaning them.', choices:[
    {label:'Clean the solar panels', cost:{oxygen:2, food:2}, change:{power:12, morale:-1}, note:'Panel output improves after a careful clean.'},
    {label:'Leave them for now', cost:{}, change:{power:-8}, note:'You save crew time, but power generation drops.'}
  ]},
  { id:'garden', title:'Greenhouse check', icon:'🌱', text:'The plant-growth chamber is healthy. The crew can spend energy to support the next harvest.', choices:[
    {label:'Run the grow lights longer', cost:{power:9}, change:{food:12, morale:4}, note:'More light supports food production.'},
    {label:'Use the low-energy cycle', cost:{power:3}, change:{food:5}, note:'A smaller harvest saves power.'}
  ]},
  { id:'comms', title:'Delayed message from Earth', icon:'📡', text:'A message from Earth arrives after a communication delay. The crew must make this decision locally rather than waiting for a reply.', choices:[
    {label:'Follow the pre-agreed safety plan', cost:{power:3}, change:{morale:7, shield:3}, note:'The crew acts using its mission plan.'},
    {label:'Spend time sending a detailed report', cost:{power:7}, change:{science:5, morale:2}, note:'More information is sent, using extra power.'}
  ]},
  { id:'repair', title:'Habitat maintenance needed', icon:'🧰', text:'A routine inspection finds a small seal issue. Fixing it now is easier than waiting.', choices:[
    {label:'Repair it now', cost:{power:7, food:2}, change:{shield:8, morale:2}, note:'Preventive maintenance strengthens the habitat.'},
    {label:'Monitor the seal', cost:{}, change:{shield:-7}, note:'You keep resources now, but habitat integrity slips.'}
  ]}
];

const actionData = {
  recycle: {name:'Run water & air recycling', icon:'♻️', desc:'Recover useful water and oxygen from the habitat systems.', cost:{power:9}, gain:{oxygen:13}, lesson:'Recycling reduces the amount of supplies a mission must carry.'},
  panels: {name:'Optimize solar panels', icon:'🔆', desc:'Adjust the panels and check the power system.', cost:{oxygen:2}, gain:{power:13}, lesson:'Solar power is useful, but dust, darkness, and panel direction matter.'},
  grow: {name:'Tend the food garden', icon:'🥬', desc:'Care for plants in the controlled greenhouse.', cost:{power:8, oxygen:2}, gain:{food:13, morale:3}, lesson:'Growing food takes energy, water, time, and careful environmental control.'},
  shelter: {name:'Improve storm shelter', icon:'🛡️', desc:'Use supplies and energy to strengthen the protected area.', cost:{power:10, food:3}, gain:{shield:13}, lesson:'Radiation protection has a cost: mass, materials, and sometimes power.'},
  research: {name:'Run a science experiment', icon:'🔬', desc:'Collect useful lunar science while the crew is healthy.', cost:{oxygen:6, power:8, food:4}, gain:{science:15}, lesson:'Science is valuable, but crew time and life-support resources are limited.'},
  rest: {name:'Crew rest period', icon:'🛌', desc:'Give everyone time to recover and keep morale steady.', cost:{food:4}, gain:{morale:12}, lesson:'Crew wellbeing is part of mission planning, not an optional extra.'}
};

function clamp(n){ return Math.max(0, Math.min(100, n)); }
function addLog(text){ state.log.unshift({day:state.day, text}); state.log = state.log.slice(0,7); }
function canPay(cost){ return Object.entries(cost).every(([k,v]) => state[k] >= v); }
function pay(cost){ for(const [k,v] of Object.entries(cost)) state[k] -= v; }
function apply(gain){ for(const [k,v] of Object.entries(gain)) state[k] = clamp(state[k] + v); }
function stat(label,key,icon){
  const value = Math.round(state[key]);
  const tone = value < 25 ? 'danger' : value < 45 ? 'warning' : '';
  return `<div class="resource ${tone}"><div class="resource-top"><span>${icon} ${label}</span><b>${value}%</b></div><div class="meter"><i style="width:${value}%"></i></div></div>`;
}
function render(){
  if(!state.started){ renderIntro(); return; }
  const event = state.event;
  app.innerHTML = `
    <div class="shell">
      <header class="topbar"><a class="brand" href="#" id="brandHome"><span class="brand-mark">M</span><span>MOONBASE <b>ONE</b><small>JUNIOR MISSION CONTROL</small></span></a><div class="top-meta"><span class="live-dot"></span> SIMULATION MODE <span class="top-divider"></span> <span>🌕 LUNAR OUTPOST</span></div><button class="quiet-btn" id="restartTop">↻ Restart</button></header>
      <main>
        <section class="hero-row"><div><p class="eyebrow">ARTEMIS-INSPIRED TRAINING SIMULATION</p><h1>Your mission.<br><em>Your decisions.</em></h1><p class="subhead">Keep your crew and lunar outpost running for 10 lunar days. Every choice uses something.</p></div>
        <div class="mission-stamp"><span>MISSION</span><strong>MOON-01</strong><small>10 SOL OBJECTIVE</small></div></section>
        <section class="overview">
          <div class="day-card"><div class="day-head"><span>MISSION PROGRESS</span><b>DAY ${state.day} <small>/ 10</small></b></div><div class="progress"><i style="width:${(state.day-1)/state.maxDays*100}%"></i></div><div class="day-foot"><span>🌍 Earth departure complete</span><span>🏁 Return-ready target</span></div></div>
          <div class="crew-card"><div class="crew-icon">👩‍🚀</div><div><span>CREW STATUS</span><b>${state.morale>=65?'Feeling strong':state.morale>=35?'A little tired':'Needs attention'}</b><small>Team wellbeing: ${Math.round(state.morale)}%</small></div></div>
        </section>
        <section class="dashboard">
          <div class="panel resources-panel"><div class="panel-heading"><div><p class="eyebrow">LIFE SUPPORT SYSTEMS</p><h2>Outpost resources</h2></div><span class="tag">LIVE STATUS</span></div>
            ${stat('Oxygen','oxygen','🫧')}${stat('Power','power','⚡')}${stat('Food','food','🥫')}${stat('Shielding','shield','🛡️')}
            <p class="tiny-note">Resource levels are simplified game values, not real spacecraft limits.</p>
          </div>
          <div class="panel action-panel"><div class="panel-heading"><div><p class="eyebrow">MISSION CONTROL</p><h2>Choose an action</h2></div><span class="tag blue">ONE ACTION / DAY</span></div>
            <div class="action-grid">${Object.entries(actionData).map(([id,a])=>`<button class="action-card" data-action="${id}" ${(state.ended||state.acted)?'disabled':''}><span class="action-icon">${a.icon}</span><span class="action-name">${a.name}</span><small>${a.desc}</small><span class="cost">${Object.entries(a.cost).map(([k,v])=>`${k} −${v}`).join(' · ') || 'No direct cost'}</span></button>`).join('')}</div>
            <p class="action-hint">Choose carefully. You can’t do everything with limited supplies.</p>
          </div>
        </section>
        <section class="lower-grid">
          <div class="panel event-panel">${event ? `<p class="eyebrow">INCOMING MISSION EVENT</p><div class="event-title"><span>${event.icon}</span><h2>${event.title}</h2></div><p>${event.text}</p><div class="event-choices">${event.choices.map((c,i)=>`<button class="choice-btn" data-choice="${i}"><b>${c.label}</b><small>${c.note}</small></button>`).join('')}</div>` : `<p class="eyebrow">MISSION BRIEFING</p><h2>Ready for your next decision?</h2><p>Each day brings a new challenge. Pick one action above, then advance the mission to see what changes.</p><div class="brief-tip">💡 <b>Mission tip:</b> Keep an eye on every resource. A high science score won’t help if the crew runs out of oxygen.</div>`}</div>
          <div class="panel log-panel"><div class="panel-heading"><div><p class="eyebrow">FLIGHT DIRECTOR'S NOTES</p><h2>Mission log</h2></div><span class="tag">RECENT</span></div><div class="log-list">${state.log.length?state.log.map(x=>`<div class="log-entry"><span>DAY ${x.day}</span><p>${x.text}</p></div>`).join(''):'<p class="muted">Your mission log will appear here.</p>'}</div></div>
        </section>
        <section class="bottom-bar"><div><span class="signal">●</span> <b>MISSION CONTROL CONNECTED</b><small>Local training simulation · No account needed</small></div><button class="advance-btn" id="advance" ${state.ended||event?'disabled':''}>${state.day===10?'Complete mission':'End day & continue'} <span>→</span></button></section>
        <section class="science-footer"><span>SCIENCE CORNER</span><a href="https://ccmc.gsfc.nasa.gov/tools/DONKI/" target="_blank" rel="noreferrer">NASA DONKI ↗</a><a href="https://osdr.nasa.gov/" target="_blank" rel="noreferrer">Open Science Data Repository ↗</a><a href="https://visualization.osdr.nasa.gov/radlab/gui/data-api/" target="_blank" rel="noreferrer">RadLab ↗</a><small>Educational simulation. Not affiliated with or endorsed by NASA.</small></section>
      </main>
    </div>
    ${state.ended?endModal():''}
    ${state.notice?`<div class="toast">${state.notice}</div>`:''}
  `;
  document.querySelector('#restartTop').onclick=restart;
  document.querySelector('#brandHome').onclick=(e)=>{e.preventDefault();if(confirm('Return to the start screen? Your current mission will reset.')){state=initial();renderIntro();}};
  document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>doAction(b.dataset.action));
  document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>chooseEvent(Number(b.dataset.choice)));
  const advance=document.querySelector('#advance'); if(advance) advance.onclick=nextDay;
  const again=document.querySelector('#playAgain'); if(again) again.onclick=()=>{state=initial();state.started=true;addLog('New mission started. Systems are ready for crew arrival.');render();};
}
function renderIntro(){
  app.innerHTML = `<div class="intro-screen"><div class="stars"></div><nav class="intro-nav"><div class="brand"><span class="brand-mark">M</span><span>MOONBASE <b>ONE</b><small>JUNIOR MISSION CONTROL</small></span></div><span class="intro-pill">A SPACE SURVIVAL GAME</span></nav><div class="intro-content"><div class="intro-copy"><p class="eyebrow">NASA SPACE APPS CHALLENGE · YOUTH STEM</p><h1>Could you keep<br>the Moon <em>alive?</em></h1><p class="intro-desc">Lead a tiny lunar outpost. Balance oxygen, power, food, and radiation protection. Make tough calls, learn real space science, and bring your crew home.</p><div class="intro-buttons"><button class="primary-btn" id="start">Start your mission <span>→</span></button><span class="no-install">◉ Browser game · No download needed</span></div><div class="intro-facts"><div><b>10</b><small>LUNAR DAYS</small></div><div><b>4</b><small>CORE RESOURCES</small></div><div><b>∞</b><small>WAYS TO PLAY</small></div></div></div><div class="moon-scene"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="moon"></div><div class="base"><div class="module m1"></div><div class="module m2"></div><div class="solar"></div><div class="flag">✦</div></div><div class="astronaut">👩‍🚀</div><div class="scene-label">LUNAR SOUTH POLE<br><b>OUTPOST 01</b></div></div></div><footer class="intro-footer"><span>MISSION CONTROL IS WAITING</span><span>LEARN · DECIDE · EXPLORE</span><span>INDEPENDENT EDUCATIONAL PROJECT</span></footer></div>`;
  document.querySelector('#start').onclick=()=>{state=initial();state.started=true;addLog('Touchdown complete. Your crew is ready to begin the 10-day outpost mission.');render();};
}
function doAction(id){
  const a=actionData[id];
  if(!canPay(a.cost)){state.notice='Not enough resources for that action. Try another plan.';render();return;}
  pay(a.cost);apply(a.gain);state.acted=true;addLog(`${a.name}: ${a.lesson}`);
  state.notice='Action completed. Resources updated.'; render();
}
function chooseEvent(i){
  const c=state.event.choices[i];
  if(!canPay(c.cost)){state.notice='Not enough resources for that choice. Choose the other option.';render();return;}
  pay(c.cost);apply(c.change);addLog(`${state.event.title}: ${c.note}`);state.event=null;state.notice='Decision recorded.';render();
}
function nextDay(){
  // Daily baseline consumption: every system has a real trade-off.
  state.oxygen=clamp(state.oxygen-7);
  state.food=clamp(state.food-6);
  state.power=clamp(state.power-5);
  state.morale=clamp(state.morale-2);
  addLog('Daily life-support use: oxygen, food, and power were consumed by the crew and habitat.');
  if(state.oxygen===0||state.food===0||state.power===0||state.shield===0||state.morale===0){finish(false,'The outpost could not sustain the crew. Review your resource choices and try a new strategy.');return;}
  if(state.day>=state.maxDays){finish(true,'Your crew completed the 10-day lunar outpost mission. Great planning, astronaut!');return;}
  state.day++;
  // Event sequence varies between runs but is reproducible and avoids repeating an event.
  const available=events.filter(e=>!state.used.includes(e.id));
  if(available.length && (state.day===3 || state.day===5 || state.day===7 || Math.random()>.45)){
    const ev=available[Math.floor(Math.random()*available.length)];
    state.event=ev;state.used.push(ev.id);
  }
  render();
}
function finish(won,message){state.ended=true;state.outcome=won?'success':'failure';state.endMessage=message;render();}
function endModal(){
  const win=state.outcome==='success';
  return `<div class="modal-backdrop"><div class="modal"><div class="modal-symbol">${win?'🏆':'🛰️'}</div><p class="eyebrow">MISSION DEBRIEF</p><h2>${win?'Mission accomplished!':'Mission ended early'}</h2><p>${state.endMessage}</p><div class="score-grid"><div><b>${Math.round(state.science)}</b><small>SCIENCE POINTS</small></div><div><b>${Math.round(state.morale)}%</b><small>CREW WELLBEING</small></div><div><b>${state.day}/10</b><small>DAYS COMPLETED</small></div></div><div class="debrief-tip"><b>What did you learn?</b><br>Space missions are systems problems. Protecting the crew, making power, producing food, and doing science all compete for limited resources.</div><button class="primary-btn full" id="playAgain">Try another mission <span>↻</span></button><small class="modal-foot">Try a different strategy and compare what happens.</small></div></div>`;
}
function restart(){if(confirm('Restart this mission from Day 1?')){state=initial();state.started=true;addLog('New mission started. Systems are ready for crew arrival.');render();}}
renderIntro();
