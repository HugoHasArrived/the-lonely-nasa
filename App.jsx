import React, { useEffect, useMemo, useState } from "react";
import { Activity, ArrowRight, Atom, BatteryCharging, Check, ChevronDown, CircleDollarSign, Cpu, Gauge, Globe2, Radio, Rocket, Satellite, Save, ShieldCheck, Sparkles, Target, Telescope, Timer, Zap } from "lucide-react";
import SpaceScene from "./SpaceScene.jsx";

const missions = [
  { id: "earth", name: "Earth Watch", type: "Earth observation", destination: "Low Earth Orbit", objective: "Monitor changing forests, oceans, and weather patterns.", budget: 120, science: "Map vegetation health and coastal change.", difficulty: "Beginner" },
  { id: "moon", name: "Lunar Scout", type: "Lunar exploration", destination: "Lunar Orbit", objective: "Survey the Moon for water ice and future landing sites.", budget: 190, science: "Identify promising regions near permanently shadowed craters.", difficulty: "Intermediate" },
  { id: "mars", name: "Red Planet Relay", type: "Planetary science", destination: "Mars Transfer", objective: "Study the Martian atmosphere and relay science data.", budget: 260, science: "Track atmospheric dust and seasonal change.", difficulty: "Advanced" }
];
const parts = [
  { id: "camera", name: "Multispectral camera", group: "Science payload", mass: 18, power: 32, cost: 18, data: 8, science: 24, desc: "Captures visible and infrared images." },
  { id: "radar", name: "Synthetic aperture radar", group: "Science payload", mass: 32, power: 48, cost: 29, data: 13, science: 31, desc: "Observes surfaces through clouds and darkness." },
  { id: "spectrometer", name: "Imaging spectrometer", group: "Science payload", mass: 22, power: 39, cost: 23, data: 10, science: 27, desc: "Measures light to identify materials." },
  { id: "solar", name: "Deployable solar arrays", group: "Power", mass: 14, power: -75, cost: 16, data: 0, science: 0, desc: "Generates electrical power in sunlight." },
  { id: "battery", name: "High-capacity battery", group: "Power", mass: 9, power: 18, cost: 11, data: 0, science: 0, desc: "Stores energy for eclipse periods." },
  { id: "antenna", name: "High-gain antenna", group: "Communications", mass: 8, power: 12, cost: 13, data: -18, science: 0, desc: "Improves the ability to send data home." },
  { id: "computer", name: "Radiation-tolerant computer", group: "Avionics", mass: 6, power: 10, cost: 12, data: 0, science: 0, desc: "Controls spacecraft operations." },
  { id: "propulsion", name: "Electric propulsion module", group: "Propulsion", mass: 20, power: 24, cost: 21, data: 0, science: 4, desc: "Provides efficient orbital adjustments." }
];
const launchers = [
  { id: "small", name: "Small launch vehicle", capacity: 120, cost: 24, note: "Lower cost, limited payload" },
  { id: "medium", name: "Medium launch vehicle", capacity: 350, cost: 43, note: "Balanced payload and cost" },
  { id: "heavy", name: "Heavy launch vehicle", capacity: 900, cost: 72, note: "Large payload capacity" }
];
const fmt = n => Math.round(n * 10) / 10;

export default function App() {
  const [missionId, setMissionId] = useState("earth");
  const [selected, setSelected] = useState(["camera", "solar", "battery", "antenna", "computer"]);
  const [launcherId, setLauncherId] = useState("small");
  const [duration, setDuration] = useState(24);
  const [tab, setTab] = useState("design");
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState("");
  const mission = missions.find(m => m.id === missionId);
  const launcher = launchers.find(l => l.id === launcherId);
  const totals = useMemo(() => {
    const chosen = parts.filter(p => selected.includes(p.id));
    const mass = 55 + chosen.reduce((s, p) => s + p.mass, 0);
    const power = 24 + chosen.reduce((s, p) => s + p.power, 0);
    const cost = 31 + chosen.reduce((s, p) => s + p.cost, 0) + launcher.cost;
    const data = Math.max(2, 22 + chosen.reduce((s, p) => s + p.data, 0));
    const science = chosen.reduce((s, p) => s + p.science, 0);
    return { mass, power, cost, data, science, chosen };
  }, [selected, launcher]);
  const issues = [
    ...(totals.mass > launcher.capacity ? ["Spacecraft exceeds the launch vehicle's payload capacity."] : []),
    ...(totals.power > 80 ? ["Power demand is higher than the current generation and storage allowance."] : []),
    ...(totals.cost > mission.budget ? ["Estimated mission cost exceeds the mission budget."] : []),
    ...(!selected.includes("computer") ? ["Add an onboard computer to coordinate spacecraft systems."] : []),
    ...(!selected.includes("antenna") ? ["Communications capacity is limited without a high-gain antenna."] : [])
  ];
  const powerBalance = 100 - Math.max(0, totals.power - 80) * 1.6;
  const budgetLeft = mission.budget - totals.cost;
  const togglePart = id => setSelected(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const notify = msg => { setToast(msg); window.setTimeout(() => setToast(""), 2400); };
  const save = () => {
    localStorage.setItem("spaceMissionDesign", JSON.stringify({ missionId, selected, launcherId, duration }));
    notify("Mission design saved in this browser.");
  };
  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("spaceMissionDesign"));
      if (!saved) return notify("No saved mission found on this browser.");
      setMissionId(saved.missionId || "earth"); setSelected(saved.selected || []); setLauncherId(saved.launcherId || "small"); setDuration(saved.duration || 24);
      setResult(null); notify("Saved mission loaded.");
    } catch { notify("Could not load the saved design."); }
  };
  useEffect(() => {
    const onKey = e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); save(); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  });
  const runSimulation = () => {
    const fit = issues.length === 0;
    const score = Math.max(0, Math.min(100, Math.round(38 + totals.science * 0.72 + (fit ? 18 : -issues.length * 9) + Math.min(duration, 36) * 0.25 - Math.max(0, totals.cost - mission.budget) * 0.3)));
    setResult({ score, fit, issues: [...issues], science: totals.science, mission: mission.name, duration });
    setTab("report");
  };
  const groups = [...new Set(parts.map(p => p.group))];

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Rocket size={20}/></div><div><strong>MISSION CONTROL</strong><span>SPACE MISSION DESIGN SIMULATOR</span></div></div>
      <div className="top-status"><span className="live-dot"/> SIMULATION ENVIRONMENT <span className="divider-v"/> v1.0.0</div>
      <button className="save-btn" onClick={save}><Save size={15}/> Save design</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> YOUR MISSION STARTS HERE</div>
          <h1>Think like an engineer.<br/><em>Explore like a pioneer.</em></h1>
          <p>Design a spacecraft, balance real mission constraints, and see whether your team can turn a bold scientific idea into a successful mission.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => {setTab("design"); document.getElementById("workspace")?.scrollIntoView({behavior:"smooth"});}}>Build your mission <ArrowRight size={17}/></button>
            <button className="ghost-btn" onClick={load}>Load saved design</button>
          </div>
          <div className="hero-facts"><span><ShieldCheck size={15}/> Learn by experimenting</span><span><Atom size={15}/> Engineering trade-offs</span><span><Globe2 size={15}/> Explore space</span></div>
        </div>
        <div className="hero-visual"><SpaceScene/><div className="orbit-label label-earth"><span/> EARTH / HOME</div><div className="orbit-label label-sat"><Satellite size={13}/> ORBITAL ASSET</div><div className="visual-caption"><span>LIVE 3D VIEW</span><b>LOW EARTH ORBIT</b></div></div>
      </section>

      <section className="mission-strip">
        <div><span className="strip-label">MISSION DESIGNER</span><strong>From concept to launch</strong></div>
        <div className="strip-stat"><Target/><span>01</span><b>Define</b></div><div className="strip-stat"><Cpu/><span>02</span><b>Design</b></div><div className="strip-stat"><Rocket/><span>03</span><b>Launch</b></div><div className="strip-stat"><Activity/><span>04</span><b>Evaluate</b></div>
      </section>

      <section className="workspace" id="workspace">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> MISSION WORKSPACE</div><h2>Build your mission</h2><p>Every decision changes the spacecraft. Keep an eye on your constraints.</p></div><div className="workspace-actions"><button className="secondary-btn" onClick={load}>Load</button><button className="secondary-btn" onClick={save}><Save size={14}/> Save</button></div></div>
        <div className="tabs">
          <button className={tab==="design"?"active":""} onClick={()=>setTab("design")}>01 / Design</button>
          <button className={tab==="launch"?"active":""} onClick={()=>setTab("launch")}>02 / Launch setup</button>
          <button className={tab==="report"?"active":""} onClick={()=>setTab("report")}>03 / Mission report</button>
        </div>

        {tab === "design" && <div className="workspace-grid">
          <div className="design-column">
            <div className="panel">
              <div className="panel-title"><span className="number">01</span><div><h3>Choose your mission</h3><p>Start with a scientific question worth answering.</p></div></div>
              <div className="mission-cards">{missions.map(m=><button key={m.id} className={`mission-card ${missionId===m.id?"chosen":""}`} onClick={()=>{setMissionId(m.id);setResult(null);}}><div className="card-top"><span className="mission-icon">{m.id==="earth"?<Globe2/>:m.id==="moon"?<Sparkles/>:<Target/>}</span><span className="difficulty">{m.difficulty}</span></div><strong>{m.name}</strong><span className="mission-type">{m.type}</span><p>{m.objective}</p><div className="card-foot"><span>DESTINATION</span><b>{m.destination}</b></div>{missionId===m.id&&<span className="selected-check"><Check size={13}/></span>}</button>)}</div>
              <div className="mission-brief"><div><span>SCIENCE GOAL</span><p>{mission.science}</p></div><div><span>AVAILABLE BUDGET</span><b>${mission.budget}M</b></div></div>
            </div>

            <div className="panel">
              <div className="panel-title"><span className="number">02</span><div><h3>Configure your spacecraft</h3><p>Select the systems and instruments your mission needs.</p></div></div>
              {groups.map(group=><div className="part-group" key={group}><div className="group-label">{group}</div><div className="part-list">{parts.filter(p=>p.group===group).map(p=><label className={`part-row ${selected.includes(p.id)?"part-selected":""}`} key={p.id}><input type="checkbox" checked={selected.includes(p.id)} onChange={()=>togglePart(p.id)}/><span className="custom-check"><Check size={12}/></span><span className="part-info"><b>{p.name}</b><small>{p.desc}</small></span><span className="part-metrics"><b>{p.mass} kg</b><small>{p.power>0?`${p.power} W`: `${Math.abs(p.power)} W gen.`}</small></span><span className="part-cost">${p.cost}M</span></label>)}</div></div>)}
            </div>
          </div>

          <aside className="sidebar">
            <div className="panel resource-panel">
              <div className="panel-title compact"><div><h3>Mission resources</h3><p>Live design calculations</p></div><span className="live-pill"><span/> LIVE</span></div>
              <Metric icon={<Gauge/>} label="SPACECRAFT MASS" value={`${fmt(totals.mass)} kg`} note={`Launch capacity: ${launcher.capacity} kg`} percent={Math.min(100,totals.mass/launcher.capacity*100)} warn={totals.mass>launcher.capacity}/>
              <Metric icon={<Zap/>} label="POWER DEMAND" value={`${fmt(totals.power)} W`} note="Available power: 80 W" percent={Math.min(100,Math.max(0,totals.power)/80*100)} warn={totals.power>80}/>
              <Metric icon={<CircleDollarSign/>} label="ESTIMATED COST" value={`$${fmt(totals.cost)}M`} note={`${budgetLeft>=0?`$${fmt(budgetLeft)}M remaining`:`$${fmt(-budgetLeft)}M over budget`}`} percent={Math.min(100,totals.cost/mission.budget*100)} warn={budgetLeft<0}/>
              <Metric icon={<Radio/>} label="DATA RATE" value={`${fmt(totals.data)} GB/day`} note="Downlink planning estimate" percent={Math.min(100,totals.data/40*100)}/>
              <Metric icon={<Telescope/>} label="SCIENCE VALUE" value={`${totals.science} pts`} note="Instrument capability score" percent={Math.min(100,totals.science/90*100)}/>
              <div className="constraint-box"><div className="constraint-head"><ShieldCheck size={15}/> DESIGN CHECKS <span>{issues.length===0?"ALL CLEAR":`${issues.length} FLAGGED`}</span></div>{issues.length===0?<p className="clear-text"><Check size={14}/> No critical design conflicts detected.</p>:issues.slice(0,3).map((x,i)=><p className="issue" key={i}>! {x}</p>)}</div>
            </div>
            <div className="panel launch-mini"><div className="panel-title compact"><div><h3>Launch configuration</h3><p>Choose your ride to space.</p></div><Rocket size={19}/></div><select value={launcherId} onChange={e=>setLauncherId(e.target.value)}>{launchers.map(l=><option value={l.id} key={l.id}>{l.name} — {l.capacity} kg</option>)}</select><div className="launch-mini-foot"><span>{launcher.note}</span><b>${launcher.cost}M launch cost</b></div><button className="wide-btn" onClick={()=>setTab("launch")}>Review launch setup <ArrowRight size={15}/></button></div>
            <button className="simulate-btn" onClick={runSimulation}><Rocket size={17}/> RUN MISSION SIMULATION <ArrowRight size={16}/></button>
          </aside>
        </div>}

        {tab === "launch" && <div className="launch-layout">
          <div className="panel"><div className="panel-title"><span className="number">03</span><div><h3>Launch and operations plan</h3><p>Set your launch vehicle and planned mission lifetime.</p></div></div><div className="launcher-options">{launchers.map(l=><button className={`launcher-option ${launcherId===l.id?"chosen":""}`} onClick={()=>setLauncherId(l.id)} key={l.id}><Rocket/><div><b>{l.name}</b><small>{l.note}</small></div><strong>{l.capacity} kg</strong><span>${l.cost}M</span></button>)}</div><div className="duration-control"><label htmlFor="duration">Planned mission lifetime</label><strong>{duration} months</strong><input id="duration" type="range" min="6" max="60" step="6" value={duration} onChange={e=>setDuration(Number(e.target.value))}/><div className="range-labels"><span>6 months</span><span>60 months</span></div></div><div className="launch-summary"><h4>PRE-LAUNCH COMPATIBILITY</h4><div><span>Spacecraft mass</span><b>{fmt(totals.mass)} kg</b></div><div><span>Selected launcher capacity</span><b>{launcher.capacity} kg</b></div><div><span>Payload margin</span><b className={totals.mass<=launcher.capacity?"good":"bad"}>{fmt(launcher.capacity-totals.mass)} kg</b></div><div><span>Mission cost estimate</span><b>${fmt(totals.cost)}M / ${mission.budget}M</b></div>{issues.length===0?<p className="clear-text"><Check size={15}/> Current design passes the simplified pre-launch checks.</p>:<p className="issue">Resolve the design flags before attempting a clean mission.</p>}</div><button className="primary-btn" onClick={runSimulation}>Run mission simulation <ArrowRight size={16}/></button></div>
          <div className="panel"><div className="panel-title compact"><div><h3>Mission profile</h3><p>{mission.name}</p></div><Globe2/></div><SpaceScene/><div className="profile-row"><span>Destination</span><b>{mission.destination}</b></div><div className="profile-row"><span>Mission lifetime</span><b>{duration} months</b></div><div className="profile-row"><span>Scientific objective</span><b>{mission.type}</b></div><div className="profile-note">This simplified planning view checks payload mass, budget, and basic spacecraft resources. It does not calculate a real flight trajectory.</div></div>
        </div>}

        {tab === "report" && <div className="panel report-panel">{result?<><div className="report-top"><div><div className="eyebrow"><span className="eyebrow-line"/> POST-MISSION DEBRIEF</div><h3>{result.mission}</h3><p>Simulation complete · {result.duration}-month mission plan</p></div><div className={`score-ring ${result.score>=75?"score-good":result.score>=50?"score-mid":"score-low"}`}><strong>{result.score}</strong><span>MISSION SCORE</span></div></div><div className={`result-banner ${result.fit?"success":"warning"}`}>{result.fit?<><ShieldCheck/><div><b>Mission design passed all simplified checks</b><span>Your configuration is within the modeled constraints. This is a promising concept for the next design iteration.</span></div></>:<><Activity/><div><b>Mission design needs attention</b><span>Your mission may not meet all modeled requirements. Review the findings and revise your design.</span></div></>}</div><div className="report-grid"><div><span>SCIENCE VALUE</span><b>{result.science} pts</b></div><div><span>SPACECRAFT MASS</span><b>{fmt(totals.mass)} kg</b></div><div><span>POWER DEMAND</span><b>{fmt(totals.power)} W</b></div><div><span>ESTIMATED COST</span><b>${fmt(totals.cost)}M</b></div></div><h4 className="debrief-heading">ENGINEERING DEBRIEF</h4>{result.issues.length===0?<p className="clear-text"><Check size={15}/> No critical issues were identified in this simplified model. Consider improving science return or reducing mass and cost.</p>:<ul className="debrief-list">{result.issues.map((issue,i)=><li key={i}>{issue}</li>)}</ul>}<p className="disclaimer">Educational simulation only. Real missions require detailed systems engineering, trajectory analysis, testing, safety reviews, and verified launch-provider performance data.</p><div className="report-actions"><button className="secondary-btn" onClick={()=>setTab("design")}>Back to design</button><button className="primary-btn" onClick={()=>{setResult(null);setTab("design");}}>Revise and try again <ArrowRight size={15}/></button></div></>:<div className="empty-report"><div className="empty-icon"><Activity/></div><h3>Your mission report is waiting.</h3><p>Configure your spacecraft, review launch compatibility, then run the simulation to see your results.</p><button className="primary-btn" onClick={()=>setTab("design")}>Go to mission design <ArrowRight size={15}/></button></div>}</div>}
      </section>
      <footer><div className="footer-brand"><Rocket size={15}/> MISSION CONTROL</div><span>AN EDUCATIONAL SPACE MISSION DESIGN SIMULATOR</span><span>Built for curious minds and future explorers.</span></footer>
    </main>
    {toast&&<div className="toast"><Check size={15}/>{toast}</div>}
  </div>;
}

function Metric({icon,label,value,note,percent,warn}) {
  return <div className="metric"><div className="metric-top"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><b>{value}</b></div><div className="meter"><span className={warn?"meter-warn":""} style={{width:`${percent}%`}}/></div><small>{note}</small></div>;
}