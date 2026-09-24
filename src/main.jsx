import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createClient} from '@supabase/supabase-js';
import './style.css';

const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase=(SUPABASE_URL&&SUPABASE_KEY)?createClient(SUPABASE_URL,SUPABASE_KEY):null;
const defaultGifts=[
 {id:'g1',code:'G1',name:'Gift 1',weight:60,stock:100,unlimited:false,active:true,order:1},
 {id:'g2',code:'G2',name:'Gift 2',weight:20,stock:50,unlimited:false,active:true,order:2},
 {id:'g3',code:'G3',name:'Gift 3',weight:15,stock:20,unlimited:false,active:true,order:3},
 {id:'g4',code:'G4',name:'Gift 4',weight:5,stock:10,unlimited:false,active:true,order:4},
 {id:'g5',code:'G5',name:'Gift 5',weight:0,stock:5,unlimited:false,active:true,order:5}
];
const initial={gifts:defaultGifts,spins:[],settings:{maxSpins:1}};
const colors=['#7c3aed','#ec4899','#f97316','#06b6d4','#22c55e','#eab308','#3b82f6','#ef4444','#14b8a6','#8b5cf6'];
function localLoad(){try{const s=JSON.parse(localStorage.getItem('spinwin-local'));return s?{...initial,...s}:initial}catch{return initial}}
function localSave(s){localStorage.setItem('spinwin-local',JSON.stringify(s))}
function rowToGift(r){return {id:r.id,code:r.code,name:r.name,weight:Number(r.weight||0),stock:Number(r.stock||0),unlimited:!!r.unlimited,active:!!r.active,order:Number(r.sort_order||r.order||0)}}
function giftToRow(g){return {id:g.id,code:g.code,name:g.name,weight:Number(g.weight)||0,stock:Number(g.stock)||0,unlimited:!!g.unlimited,active:!!g.active,sort_order:Number(g.order)||0}}
async function loadRemote(){
 if(!supabase)return null;
 const [{data:gifts,error:ge},{data:spins,error:se},{data:settings,error:te}]=await Promise.all([
  supabase.from('gifts').select('*').order('sort_order'),
  supabase.from('spins').select('*').order('created_at',{ascending:false}),
  supabase.from('spin_settings').select('*').eq('id',1).maybeSingle()
 ]);
 if(ge||se||te) throw ge||se||te;
 return {gifts:(gifts||[]).map(rowToGift),spins:(spins||[]).map(s=>({id:s.id,name:s.customer_name,mobile:s.mobile,giftId:s.gift_id,code:s.gift_code,at:s.created_at})),settings:{maxSpins:Number(settings?.max_spins||1)}};
}
async function seedRemote(){
 const {data:gifts}=await supabase.from('gifts').select('id').limit(1);
 if(!gifts?.length){await supabase.from('gifts').insert(defaultGifts.map(giftToRow));}
 await supabase.from('spin_settings').upsert({id:1,max_spins:1});
 return loadRemote();
}
function weighted(gifts){const eligible=gifts.filter(g=>g.active&&Number(g.weight)>0&&(g.unlimited||Number(g.stock)>0));const total=eligible.reduce((a,g)=>a+Number(g.weight),0);if(!total)return null;let r=Math.random()*total;for(const g of eligible){r-=Number(g.weight);if(r<0)return g}return eligible[eligible.length-1]}
function App(){
 const [state,setState]=useState(initial); const [ready,setReady]=useState(false); const [dbError,setDbError]=useState(''); const [admin,setAdmin]=useState(false); const [adminCodeOpen,setAdminCodeOpen]=useState(false); const [adminCode,setAdminCode]=useState(''); const [name,setName]=useState(''); const [mobile,setMobile]=useState(''); const [spinning,setSpinning]=useState(false); const [winner,setWinner]=useState(null); const [rotation,setRotation]=useState(0); const [tab,setTab]=useState('dashboard');
 useEffect(()=>{(async()=>{if(!supabase){setState(localLoad());setReady(true);return}try{let s=await loadRemote();if(!s||!s.gifts.length)s=await seedRemote();setState(s);setDbError('')}catch(e){console.error(e);setDbError(`Supabase connection error: ${e?.message||'Unknown error'}`);setState(localLoad())}finally{setReady(true)}})()},[]);
 useEffect(()=>{if(ready&&!supabase)localSave(state)},[state,ready]);
 const gifts=[...state.gifts].sort((a,b)=>a.order-b.order); const totalWeight=gifts.filter(g=>g.active&&Number(g.weight)>0&&(g.unlimited||Number(g.stock)>0)).reduce((a,g)=>a+Number(g.weight),0); const segments=Math.max(gifts.length,1); const segment=360/segments;
 async function spin(){
  if(spinning)return;

  if(!name.trim())
    return alert('Please enter your name.');

  if(!/^\d{10}$/.test(mobile.trim()))
    return alert('Please enter a valid 10-digit mobile number.');if(state.spins.filter(s=>s.mobile===mobile.trim()).length>=Number(state.settings.maxSpins))return alert('You have already used your Spin & Win chance.');const g=weighted(gifts);if(!g)return alert('No prizes are currently available.');setSpinning(true);setWinner(null);const idx=gifts.findIndex(x=>x.id===g.id);const target=idx*segment+segment/2;const current=((rotation%360)+360)%360;const delta=(360-current+360-target)%360;setRotation(rotation+360*6+delta);setTimeout(async()=>{try{if(supabase){const {error}=await supabase.from('spins').insert({customer_name:name.trim(),mobile:mobile.trim(),gift_id:g.id,gift_code:g.code});if(error)throw error;if(!g.unlimited){const {error:ue}=await supabase.from('gifts').update({stock:Math.max(0,g.stock-1)}).eq('id',g.id);if(ue)throw ue}const fresh=await loadRemote();setState(fresh)}else{setState(s=>({...s,gifts:s.gifts.map(x=>x.id===g.id&&!x.unlimited?{...x,stock:Math.max(0,x.stock-1)}:x),spins:[...s.spins,{id:crypto.randomUUID(),name:name.trim(),mobile:mobile.trim(),giftId:g.id,code:g.code,at:new Date().toISOString()}]}))}setWinner(g)}catch(e){console.error(e);alert('Spin could not be saved. Please try again.')}finally{setSpinning(false)}},5200)}
 function updateGift(id,patch){setState(s=>({...s,gifts:s.gifts.map(g=>g.id===id?{...g,...patch}:g)})); if(supabase){const p={};if('name'in patch)p.name=patch.name;if('weight'in patch)p.weight=Number(patch.weight);if('stock'in patch)p.stock=Number(patch.stock);if('unlimited'in patch)p.unlimited=!!patch.unlimited;if('active'in patch)p.active=!!patch.active;supabase.from('gifts').update(p).eq('id',id).then(()=>{}).catch(console.error)}}
 async function addGift(){const n=gifts.length+1;const g={id:crypto.randomUUID(),code:`G${n}`,name:`Gift ${n}`,weight:0,stock:10,unlimited:false,active:true,order:n};if(supabase){const {error}=await supabase.from('gifts').insert(giftToRow(g));if(error)return alert(error.message);setState(await loadRemote())}else setState(s=>({...s,gifts:[...s.gifts,g]}))}
 async function del(id){if(!confirm('Delete this gift?'))return;if(supabase){const {error}=await supabase.from('gifts').delete().eq('id',id);if(error)return alert(error.message);setState(await loadRemote())}else setState(s=>({...s,gifts:s.gifts.filter(g=>g.id!==id)}))}
 async function resetSpins(){if(!confirm('Reset Winner History only? Gift items and their settings will remain unchanged.'))return;if(supabase){const {error}=await supabase.from('spins').delete().not('id','is',null);if(error)return alert(error.message);setState(await loadRemote())}else setState(s=>({...s,spins:[]}))}
 async function saveSettings(v){setState(s=>({...s,settings:{...s.settings,maxSpins:v}}));if(supabase)await supabase.from('spin_settings').upsert({id:1,max_spins:v})}
 function openAdmin(){setAdminCode('');setAdminCodeOpen(true)} function verifyAdmin(){if(adminCode==='709828'){setAdmin(true);setAdminCodeOpen(false);setAdminCode('')}else alert('Incorrect admin code.')}
 if(!ready)return <div className="loading">Loading Spin & Win…</div>;
 if(admin)return <Admin state={state} setState={setState} tab={tab} setTab={setTab} gifts={gifts} totalWeight={totalWeight} addGift={addGift} updateGift={updateGift} del={del} resetSpins={resetSpins} saveSettings={saveSettings} exit={()=>setAdmin(false)}/>;
 return <div className="app"><header><div className="brand">INDRANI ELECTRONICS</div><button className="adminBtn" onClick={openAdmin}>Admin</button></header><main><section className="hero"><div><p className="eyebrow">LUCKY SPIN</p><h1>Spin. Win. Celebrate.</h1><p className="sub">Enter your details and spin the wheel for a chance to win an exciting gift.</p>{dbError&&<div className="dbNotice">{dbError}<br/><small>Running in local fallback mode until Supabase is connected.</small></div>}</div><div className="card"><div className="wheelWrap"><div className="pointer"></div><div className="wheel" style={{transform:`rotate(${rotation}deg)`,background:`conic-gradient(${gifts.map((g,i)=>`${colors[i%colors.length]} ${i*segment}deg ${(i+1)*segment}deg`).join(',')})`}}>{gifts.map((g,i)=>{const angle=(i*segment+segment/2-90)*Math.PI/180;const radius=37;const x=50+Math.cos(angle)*radius;const y=50+Math.sin(angle)*radius;return <div key={g.id} className="label" style={{left:`${x}%`,top:`${y}%`}}><span>{g.name}</span></div>})}</div><div className="hub">SPIN</div></div><div className="form"><input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} disabled={spinning}/><input
  type="tel"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength="10"
  placeholder="Mobile number"
  value={mobile}
  onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))}
  disabled={spinning}
/><button className="spinBtn" onClick={spin} disabled={spinning}>{spinning?'SPINNING…':'SPIN NOW'}</button></div></div></section></main>{winner&&<div className="modal"><div className="modalBox"><div className="confetti">🎉</div><p className="eyebrow">CONGRATULATIONS</p><h2>You won!</h2><p className="winnerGift">{winner.name}</p><button onClick={()=>setWinner(null)}>Done</button></div></div>}{adminCodeOpen&&<div className="modal adminGate"><div className="modalBox"><div className="lockIcon">🔐</div><p className="eyebrow">ADMIN ACCESS</p><h2>Enter Admin Code</h2><p className="gateText">Enter the 6-digit code to open the Admin Panel.</p><input className="adminCodeInput" type="password" inputMode="numeric" maxLength="6" placeholder="••••••" value={adminCode} onChange={e=>setAdminCode(e.target.value.replace(/\D/g,'').slice(0,6))} onKeyDown={e=>{if(e.key==='Enter')verifyAdmin()}} autoFocus/><div className="gateActions"><button className="secondary" onClick={()=>setAdminCodeOpen(false)}>Cancel</button><button className="primary" onClick={verifyAdmin}>Unlock Admin</button></div></div></div>}</div>
}
function Admin({state,setState,tab,setTab,gifts,totalWeight,addGift,updateGift,del,resetSpins,saveSettings,exit}){return <div className="admin"><header><div className="brand">INDRANI ELECTRONICS</div><button className="adminBtn" onClick={exit}>View Site</button></header><div className="adminBody"><aside>{['dashboard','gifts','spins','settings'].map(t=><button className={tab===t?'sel':''} onClick={()=>setTab(t)} key={t}>{t[0].toUpperCase()+t.slice(1)}</button>)}</aside><section className="panel">{tab==='dashboard'&&<><h1>Dashboard</h1><div className="stats"><Stat n={state.spins.length} l="Total spins"/><Stat n={state.spins.filter(s=>s.at.slice(0,10)===new Date().toISOString().slice(0,10)).length} l="Today's spins"/><Stat n={gifts.filter(g=>g.active).length} l="Active gifts"/><Stat n={gifts.filter(g=>!g.unlimited).reduce((a,g)=>a+Number(g.stock),0)} l="Prize stock"/></div><h2>Probability overview</h2><Table gifts={gifts} totalWeight={totalWeight}/></>}{tab==='gifts'&&<><div className="titleRow"><div><h1>Gift Management</h1><p>Add G6, G7, G8… anytime without code changes.</p></div><button className="primary" onClick={addGift}>+ Add Gift</button></div><Table gifts={gifts} totalWeight={totalWeight} updateGift={updateGift} del={del} editable/></>}{tab==='spins'&&<><h1>Winner History</h1><Table spins={state.spins} gifts={gifts}/></>}{tab==='settings'&&<><h1>Settings</h1><div className="setting"><label>Maximum spins per mobile<input type="number" min="1" value={state.settings.maxSpins} onChange={e=>saveSettings(Math.max(1,Number(e.target.value)))}/></label></div><button className="danger" onClick={resetSpins}>Reset Demo Data</button></>}</section></div></div>}
function Stat({n,l}){return <div className="stat"><b>{n}</b><span>{l}</span></div>}
function Table({gifts,spins,totalWeight,updateGift,del,editable}){if(spins)return <div className="table"><div className="tr th"><span>Customer</span><span>Mobile</span><span>Gift Won</span><span>Date</span></div>{spins.map(s=><div className="tr spinRow" key={s.id}><span>{s.name}</span><span>{s.mobile}</span><span>{gifts?.find(g=>g.id===s.giftId)?.name||s.giftName||'—'}</span><span>{new Date(s.at).toLocaleString()}</span></div>)}</div>;return <div className="table"><div className="tr th giftHeader"><span>Gift</span><span>Weight</span><span>Probability</span><span>Stock</span><span>Status</span><span>Action</span></div>{gifts.map(g=>{const p=totalWeight&&g.active&&g.weight>0&&(g.unlimited||g.stock>0)?Number(g.weight)/totalWeight*100:0;return <div className="tr giftRow" key={g.id}><span><b>{g.code}</b> {editable?<input value={g.name} onChange={e=>updateGift(g.id,{name:e.target.value})}/>:g.name}</span><span>{editable?<input className="small" type="number" min="0" value={g.weight} onChange={e=>updateGift(g.id,{weight:Math.max(0,Number(e.target.value))})}/>:g.weight}</span><span>{p.toFixed(2)}%</span><span>{editable?<>{g.unlimited?'∞':<input className="small" type="number" min="0" value={g.stock} onChange={e=>updateGift(g.id,{stock:Math.max(0,Number(e.target.value))})}/>}<label className="check"><input type="checkbox" checked={g.unlimited} onChange={e=>updateGift(g.id,{unlimited:e.target.checked})}/> ∞</label></>:g.unlimited?'∞':g.stock}</span><span><label className="check"><input type="checkbox" checked={g.active} disabled={!editable} onChange={e=>updateGift(g.id,{active:e.target.checked})}/> Active</label></span><span>{editable&&<button className="link dangerText" onClick={()=>del(g.id)}>Delete</button>}</span></div>})}</div>}
createRoot(document.getElementById('root')).render(<App/>);
