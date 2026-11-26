(() => {
'use strict';

/* Content is loaded from js/content.js */
const { RIGHT, WRONG, LEVELS, LETTER } = window.GAME_CONTENT;

/* =====================================================
   ENGINE
   ===================================================== */
const $ = s => document.querySelector(s);
const stage = $('#stage');
const rand = a => a[Math.floor(Math.random()*a.length)];
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const TOTAL = LEVELS.reduce((n,l)=>n+l.qs.length,0);
const LET = ['A','B','C','D','E'];

let S = {lv:0,qi:0,score:0,lvScore:0,streak:0,done:0,cur:null};
let endTok = 0, heartTimer = null, padTimer = null;

/* ---------- Sound ---------- */
let ac = null, muted = false;
try { muted = localStorage.getItem('lgou-muted') === '1'; } catch(e){}
function initAudio(){
  if(!ac){ try{ ac = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
  if(ac && ac.state==='suspended') ac.resume();
}
function tone(f,d=.15,type='sine',v=.07,delay=0){
  if(muted||!ac) return;
  const t=ac.currentTime+delay, o=ac.createOscillator(), g=ac.createGain();
  o.type=type; o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(v,t+.03);
  g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+d+.05);
}
const sfx = {
  click(){ tone(740,.07,'triangle',.06); },
  good(){ [523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,.3,'sine',.08,i*.07)); },
  oops(){ tone(392,.2,'sine',.06); tone(311,.3,'sine',.06,.14); },
  level(){ [392,523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>tone(f,.45,'triangle',.07,i*.09)); },
  chime(){ tone(880,1.3,'sine',.05); tone(1318.5,1.8,'sine',.035,.12); }
};
function startPad(){
  stopPad();
  const chords=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]]; let i=0;
  const play=()=>{ chords[i++%4].forEach(f=>tone(f,3.8,'sine',.022)); };
  play(); padTimer=setInterval(play,3300);
}
function stopPad(){ clearInterval(padTimer); padTimer=null; }
function paintMute(){ $('#mute').textContent = muted ? '🔇' : '🔊'; }
$('#mute').addEventListener('click',()=>{
  initAudio(); muted=!muted; try{localStorage.setItem('lgou-muted',muted?'1':'0');}catch(e){}
  paintMute(); if(!muted) sfx.click();
});
paintMute();

/* ---------- Sky canvas ---------- */
const cv=$('#sky'), cx=cv.getContext('2d');
let W,H,DPR,stars=[],motes=[],shooters=[],nextShoot=3000;
function newMote(init){
  return {x:Math.random()*W,y:init?Math.random()*H:H+20,r:Math.random()*3+1,vy:Math.random()*.35+.1,vx:(Math.random()-.5)*.25,
          a:Math.random()*.4+.15,ph:Math.random()*6.28,c:Math.random()<.5?'184,169,255':'127,178,255'};
}
function resize(){
  DPR=Math.min(window.devicePixelRatio||1,2); W=window.innerWidth; H=window.innerHeight;
  cv.width=W*DPR; cv.height=H*DPR; cv.style.width=W+'px'; cv.style.height=H+'px'; cx.setTransform(DPR,0,0,DPR,0,0);
  const n=Math.floor(W*H/5200);
  stars=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.25,p:Math.random()*6.28,s:Math.random()*1.6+.4,g:Math.random()<.1}));
  motes=Array.from({length:Math.min(42,Math.floor(W/24))},()=>newMote(true));
}
function frame(t){
  cx.clearRect(0,0,W,H);
  for(const s of stars){
    const a=.35+.65*(.5+.5*Math.sin(t*.001*s.s+s.p));
    cx.globalAlpha=a; cx.fillStyle=s.g?'#dcd3ff':'#fff';
    if(s.g){ cx.shadowBlur=10; cx.shadowColor='#b8a9ff'; }
    cx.beginPath(); cx.arc(s.x,s.y,s.g?s.r+.5:s.r,0,6.283); cx.fill();
    if(s.g) cx.shadowBlur=0;
  }
  cx.globalAlpha=1;
  for(const m of motes){
    m.y-=m.vy; m.x+=m.vx+Math.sin(t*.0008+m.ph)*.15;
    if(m.y<-20){ Object.assign(m,newMote(false)); }
    const g=cx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*5);
    g.addColorStop(0,`rgba(${m.c},${m.a})`); g.addColorStop(1,`rgba(${m.c},0)`);
    cx.fillStyle=g; cx.beginPath(); cx.arc(m.x,m.y,m.r*5,0,6.283); cx.fill();
  }
  if(t>nextShoot){
    shooters.push({x:Math.random()*W*.8+W*.1,y:Math.random()*H*.35,vx:7+Math.random()*4,vy:3+Math.random()*2,l:1});
    nextShoot=t+6000+Math.random()*6000;
  }
  shooters=shooters.filter(s=>s.l>0);
  for(const s of shooters){
    s.x+=s.vx; s.y+=s.vy; s.l-=.014;
    const g=cx.createLinearGradient(s.x,s.y,s.x-s.vx*9,s.y-s.vy*9);
    g.addColorStop(0,`rgba(255,255,255,${s.l})`); g.addColorStop(1,'rgba(255,255,255,0)');
    cx.strokeStyle=g; cx.lineWidth=2; cx.beginPath(); cx.moveTo(s.x,s.y); cx.lineTo(s.x-s.vx*9,s.y-s.vy*9); cx.stroke();
  }
  requestAnimationFrame(frame);
}
window.addEventListener('resize',resize); resize(); requestAnimationFrame(frame);

/* ---------- Effects ---------- */
function burst(x,y,emojis,n=16){
  for(let i=0;i<n;i++){
    const e=document.createElement('span'); e.className='fx'; e.textContent=rand(emojis);
    const a=Math.random()*6.283, d=70+Math.random()*130;
    e.style.left=x+'px'; e.style.top=y+'px';
    e.style.setProperty('--dx',Math.cos(a)*d+'px'); e.style.setProperty('--dy',(Math.sin(a)*d-70)+'px');
    e.style.setProperty('--r',(Math.random()*120-60)+'deg'); e.style.fontSize=(15+Math.random()*18)+'px';
    document.body.appendChild(e); setTimeout(()=>e.remove(),1250);
  }
}
function confetti(n=3){
  for(let k=0;k<n;k++) setTimeout(()=>burst(innerWidth*(.2+Math.random()*.6),innerHeight*(.25+Math.random()*.3),['💙','✨','💫','🌙','⭐','💜','🩵'],18),k*220);
}
function startHearts(){
  stopHearts();
  heartTimer=setInterval(()=>{
    const h=document.createElement('span'); h.className='heart'; h.textContent=rand(['💙','💜','🩵','✨','💫']);
    h.style.left=Math.random()*100+'vw'; h.style.fontSize=(14+Math.random()*20)+'px';
    h.style.setProperty('--sx',(Math.random()*120-60)+'px'); h.style.setProperty('--rot',(Math.random()*80-40)+'deg');
    h.style.animationDuration=(7+Math.random()*6)+'s';
    document.body.appendChild(h); setTimeout(()=>h.remove(),14000);
  },650);
}
function stopHearts(){ clearInterval(heartTimer); heartTimer=null; }

/* ---------- Rendering ---------- */
function render(html){
  return new Promise(res=>{
    const old=stage.querySelector('.scene');
    const swap=()=>{ stage.innerHTML='<div class="scene">'+html+'</div>'; $('#app').scrollTo(0,0); res(); };
    if(old){ old.classList.add('leave'); setTimeout(swap,280); } else swap();
  });
}
function hud(){
  const L=LEVELS[S.lv];
  $('#lvLabel').textContent = `${L.icon} Level ${S.lv+1} · ${L.name}`;
  $('#score').textContent = S.score;
  $('#barFill').style.width = (S.done/TOTAL*100)+'%';
}
function pulseScore(){ const c=$('#scoreChip'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }

/* ---------- Screens ---------- */
function intro(){
  document.body.classList.remove('playing','ending');
  stopHearts(); stopPad(); endTok++;
  render(`
   <div class="card">
     <div class="big-emoji">🌙</div>
     <p class="eyebrow">Two years · Nov 26, 2024 → Nov 26, 2026</p>
     <h1>The Little Game of Us</h1>
     <p class="script">How well do you know us?</p>
     <p class="small">5 levels · wrong answers only get cuddles 🫶</p>
     <p>Made with love, for my wifeey 💙</p>
     <button class="btn big" data-act="start" data-primary>Start Playing ✨</button>
     <p class="small" style="margin-top:18px">Best with sound on 🎧 (speaker button = mute)</p>
   </div>`);
}
function levelIntro(){
  S.qi=0; S.lvScore=0; hud(); document.body.classList.add('playing');
  const L=LEVELS[S.lv];
  render(`
   <div class="card">
     <p class="eyebrow">Level ${S.lv+1} of ${LEVELS.length}</p>
     <div class="big-emoji">${L.icon}</div>
     <h2 style="font-size:clamp(28px,6vw,40px)">${L.name}</h2>
     <p class="script" style="font-size:clamp(20px,4.5vw,26px)">${L.sub}</p>
     <p class="small">${L.qs.length} questions</p>
     <button class="btn big" data-act="begin" data-primary>Let's go →</button>
   </div>`);
}
function question(){
  const L=LEVELS[S.lv], Q=L.qs[S.qi];
  const order=shuffle(Q.o.map((t,i)=>({t,i})));
  S.cur={Q,order,locked:false};
  hud();
  render(`
   <div class="card">
     <div class="qmeta"><span>${L.icon} ${L.name}</span><span>Question ${S.qi+1} / ${L.qs.length}</span></div>
     <h2 class="qtext">${Q.q}</h2>
     <div class="opts">
       ${order.map((o,k)=>`<button class="opt" data-k="${k}"><span class="badge">${LET[k]}</span><span>${o.t}</span></button>`).join('')}
     </div>
     <div class="fb" id="fb"></div>
     <button class="btn" id="next" data-act="next" hidden>${S.qi===L.qs.length-1?'Finish level ✓':'Next →'}</button>
   </div>`);
}
function answer(btn){
  const c=S.cur; if(!c||c.locked) return; c.locked=true;
  const {Q,order}=c, idx=+btn.dataset.k, ok = Q.all || order[idx].i===0;
  stage.querySelectorAll('.opt').forEach((b,k)=>{
    b.disabled=true; const good = Q.all || order[k].i===0;
    if(good) b.classList.add('correct'); else if(k===idx) b.classList.add('wrong'); else b.classList.add('dim');
  });
  S.done++;
  if(ok){ S.score++; S.lvScore++; S.streak++; } else S.streak=0;
  let msg = ok ? (Q.right||rand(RIGHT)) : (Q.wrong||rand(WRONG));
  if(ok && S.streak>=3) msg += `  🔥 ${S.streak} in a row!`;
  const fb=$('#fb'); fb.textContent=msg; fb.className='fb show '+(ok?'ok':'no');
  const r=btn.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
  if(ok){ sfx.good(); burst(x,y,['💙','✨','💫','⭐','🩵'],18); pulseScore(); }
  else { sfx.oops(); burst(x,y,['🫶','🥺','💫'],7); }
  hud();
  $('#next').hidden=false;
}
function nextQ(){
  const L=LEVELS[S.lv]; S.qi++;
  if(S.qi>=L.qs.length) levelDone(); else question();
}
function levelDone(){
  const L=LEVELS[S.lv], n=L.qs.length, ratio=S.lvScore/n;
  const line = ratio===1?L.done[0]:ratio>=.5?L.done[1]:L.done[2];
  const last = S.lv===LEVELS.length-1;
  sfx.level(); confetti(2);
  render(`
   <div class="card">
     <div class="big-emoji">${ratio===1?'🌟':'💫'}</div>
     <h2>Level ${S.lv+1} complete!</h2>
     <p class="script" style="font-size:34px">${S.lvScore} / ${n}</p>
     <p>${line}</p>
     <button class="btn big" data-act="${last?'final':'nextlevel'}" data-primary>${last?'See my final score ✨':'Next level →'}</button>
   </div>`);
}
function finalScreen(){
  const ratio=S.score/TOTAL, pct=Math.round(ratio*100);
  const title = ratio===1?"Soulmate Certified 💫":ratio>=.75?"Wifeey knows her slave well 😌":ratio>=.5?"Cute & almost there 🌙":"Honorary Slave Whisperer 🫶";
  const line = ratio===1?"Perfect score. I'm not even surprised.":ratio>=.75?"So close to perfect! I'm impressed.":ratio>=.5?"A solid effort, and I loved every second.":"Rematch with cuddles? I'll go easy on you 😘";
  sfx.level(); confetti(3);
  render(`
   <div class="card">
     <p class="eyebrow">Final score</p>
     <div class="ring" id="ring"><div><span id="ringNum">0</span></div></div>
     <p class="script" style="font-size:34px;margin:0">${S.score} / ${TOTAL} correct</p>
     <h2 style="margin-top:10px">${title}</h2>
     <p>${line}</p>
     <p class="small">...but wait. No matter your score, there's a secret waiting for you 🌌</p>
     <button class="btn big" data-act="secret" data-primary>🔓 Open your secret</button>
     <button class="btn ghost" data-act="replay">Play again 🔁</button>
   </div>`).then(()=>{
    const ring=$('#ring'), num=$('#ringNum'); let v=0;
    const tick=()=>{ v+=Math.max(1,Math.round((pct-v)/8)); if(v>pct)v=pct; ring.style.setProperty('--p',v); num.textContent=v+'%'; if(v<pct) setTimeout(tick,35); };
    tick();
  });
}

/* ---------- Secret ending ---------- */
async function secretEnding(){
  const tok=++endTok;
  document.body.classList.remove('playing'); document.body.classList.add('ending');
  stopHearts(); initAudio();
  await render(`
   <div class="endwrap">
     <p id="l1">Well, you might not have gotten every answer right...</p>
     <p id="l2">But there's one thing I know for sure.</p>
     <p id="l3" class="last">I'd still choose you in every version of this little game.</p>
   </div>
   <button class="skip" data-act="skip">skip ›</button>`);
  if(tok!==endTok) return;
  startPad();
  const seq=[['#l1',900],['#l2',3800],['#l3',3800]];
  for(const [sel,wait] of seq){
    await sleep(wait); if(tok!==endTok) return;
    const el=$(sel); if(!el) return; el.classList.add('show'); sfx.chime();
    if(sel==='#l3') startHearts();
  }
  await sleep(6500); if(tok!==endTok) return;
  showLetter(tok);
}
async function showLetter(tok){
  if(tok===undefined) tok=++endTok;
  if(tok!==endTok) return;
  startHearts(); if(!padTimer) startPad();
  let d=.3;
  const paras=LETTER.paras.map(p=>{ const h=`<p class="l" style="animation-delay:${d}s">${p}</p>`; d+=1.5; return h; }).join('');
  const key=`<p class="l key" style="animation-delay:${d}s">${LETTER.key}</p>`; d+=1.8;
  const sign=`<p class="l sign" style="animation-delay:${d}s">${LETTER.sign}</p>`; d+=1.6;
  await render(`
   <div class="card letter">
     <h2>${LETTER.title}</h2>
     <div class="date">${LETTER.date}</div>
     ${paras}${key}${sign}
     <div class="btnrow" style="animation-delay:${d}s">
       <button class="btn ghost" data-act="replayEnding">Watch the ending again 🌙</button>
       <button class="btn" data-act="replay">Play again 🔁</button>
     </div>
   </div>`);
  sfx.level(); confetti(3);
}

/* ---------- Flow ---------- */
function resetGame(){
  endTok++; stopHearts(); stopPad();
  document.body.classList.remove('ending');
  S={lv:0,qi:0,score:0,lvScore:0,streak:0,done:0,cur:null};
  hud(); levelIntro();
}
const actions = {
  start(){ initAudio(); sfx.click(); resetGame(); },
  begin(){ sfx.click(); question(); },
  next(){ sfx.click(); nextQ(); },
  nextlevel(){ sfx.click(); S.lv++; levelIntro(); },
  final(){ sfx.click(); finalScreen(); },
  secret(){ sfx.click(); secretEnding(); },
  skip(){ sfx.click(); showLetter(); },
  replay(){ sfx.click(); resetGame(); },
  replayEnding(){ sfx.click(); secretEnding(); }
};
let lock=false;
stage.addEventListener('click',e=>{
  const o=e.target.closest('.opt'); if(o){ answer(o); return; }
  const b=e.target.closest('[data-act]'); if(!b||lock) return;
  lock=true; setTimeout(()=>lock=false,450);
  const fn=actions[b.dataset.act]; if(fn) fn();
});
document.body.addEventListener('click',e=>{
  const b=e.target.closest('.skip'); if(b && !stage.contains(b)){ actions.skip(); }
});
window.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    const n=document.querySelector('#next:not([hidden])') || stage.querySelector('[data-primary]');
    if(n){ e.preventDefault(); n.click(); }
    return;
  }
  const k={'1':0,'2':1,'3':2,'4':3,a:0,b:1,c:2,d:3}[e.key.toLowerCase()];
  if(k!==undefined){ const o=stage.querySelectorAll('.opt')[k]; if(o&&!o.disabled) o.click(); }
});

intro();
})();
