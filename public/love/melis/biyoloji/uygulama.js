// Sera: ana sayfa, konu sayfası, karışık deneme. İlerleme bu tarayıcıda saklanır.
// P.t[id].mc[i] = seçilen şık, P.t[id].op[i] = "ok" | "again", P.best = en iyi deneme puanı.
const KEY="melis-sera-biyoloji-v1";
let P={};
try{P=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){P={}}
P.t=P.t||{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};
const tp=id=>(P.t[id]=P.t[id]||{mc:{},op:{}});
const mcDone=t=>Object.keys(tp(t.id).mc).length;
const mcOk=t=>t.mc.filter((q,i)=>tp(t.id).mc[i]===q.a).length;
const complete=t=>mcDone(t)>=t.mc.length;
const totalMc=KONULAR.reduce((a,t)=>a+t.mc.length,0);
const totalOk=()=>KONULAR.reduce((a,t)=>a+mcOk(t),0);
const YAZ={y1:["y1","1. yazılı"],y2:["y2","2. yazılı"],"":["","dönem içi"]};
const chip=t=>`<span class="chip ${YAZ[t.yaz][0]}">${YAZ[t.yaz][1]}</span>`;

const app=document.getElementById("app");
const toastEl=document.getElementById("toast");
let toastTimer;
function toast(msg){
  toastEl.innerHTML=msg+'<span style="display:block;font-size:1.05rem;margin-top:2px">— Muhammet</span>';
  toastEl.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toastEl.hidden=true},4500);
}
toastEl.addEventListener("click",()=>{toastEl.hidden=true});
let moralIdx=Math.floor(Math.random()*MORAL.length);
const moral=()=>{moralIdx=(moralIdx+1)%MORAL.length;toast(MORAL[moralIdx])};

function burst(el){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  const icons=["🍃","🌱","💚","✨","🌿"];
  for(let i=0;i<12;i++){
    const h=document.createElement("span");h.className="pop";h.textContent=icons[i%icons.length];
    const a=Math.random()*Math.PI*2,d=60+Math.random()*80;
    h.style.setProperty("--x0",(cx-11)+"px");h.style.setProperty("--y0",(cy-11)+"px");
    h.style.setProperty("--x1",(cx-11+Math.cos(a)*d)+"px");h.style.setProperty("--y1",(cy-11+Math.sin(a)*d-30)+"px");
    h.style.setProperty("--r",(Math.random()*240-120)+"deg");
    document.body.appendChild(h);setTimeout(()=>h.remove(),1150);
  }
}

let cleanup=null;
function route(){
  if(cleanup){cleanup();cleanup=null}
  const h=decodeURIComponent(location.hash.slice(1));
  if(h==="deneme")deneme();
  else if(KONULAR.some(t=>t.id===h))konu(h);
  else home();
  window.scrollTo(0,0);
}
const go=h=>{if(location.hash.slice(1)===h)route();else location.hash=h};
addEventListener("hashchange",route);
app.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b){e.preventDefault();go(b.dataset.go)}});

/* ---------- ana sayfa ---------- */
function plantSVG(){
  const done=KONULAR.filter(complete);const n=done.length;
  const ys=[...Array(10)].map((_,i)=>192-i*15);
  const grow=n?Math.min(1,(210-ys[n-1]+14)/172):.08;
  const leaves=ys.map((y,i)=>{
    const r=i%2===0,on=i<n,h=on?done[i].hue:"leaf";
    const d=r?`M150,${y} C162,${y-14} 186,${y-12} 196,${y-2} C184,${y+7} 162,${y+6} 150,${y} Z`:`M150,${y} C138,${y-14} 114,${y-12} 104,${y-2} C116,${y+7} 138,${y+6} 150,${y} Z`;
    const tip=r?196:104;
    return `<g class="h-${h}"><path class="plant-leaf ${r?"r":"l"} off" data-on="${on?1:0}" d="${d}" fill="var(--c)"/>${on?`<circle class="o2b" cx="${tip}" cy="${y-6}" r="3" fill="none" stroke="var(--water)" stroke-width="1.3" style="animation-delay:${(i*0.37).toFixed(2)}s"/>`:""}</g>`}).join("");
  const rays=[...Array(8)].map((_,i)=>{const a=i*Math.PI/4;return `<line x1="${(258+Math.cos(a)*24).toFixed(1)}" y1="${(40+Math.sin(a)*24).toFixed(1)}" x2="${(258+Math.cos(a)*32).toFixed(1)}" y2="${(40+Math.sin(a)*32).toFixed(1)}" stroke="#f4b23a" stroke-width="3" stroke-linecap="round"/>`}).join("");
  const pet=[...Array(6)].map((_,i)=>`<ellipse cx="150" cy="22" rx="7" ry="13" fill="var(--berry)" opacity=".9" transform="rotate(${i*60} 150 36)"/>`).join("");
  return `<svg viewBox="0 0 300 250" role="img" aria-label="Melis'in bitkisi: ${n} yaprak açtı">
    <g class="sunrays">${rays}</g><circle cx="258" cy="40" r="17" fill="#f4b23a"/>
    <g class="plant-sway">
      <path class="plant-stem" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" data-g="${(1-grow).toFixed(3)}" d="M150,210 C146,170 156,140 150,110 C145,85 152,60 150,38"/>
      <path d="M150,205 C143,195 132,195 127,199 C134,207 144,208 150,205 Z M150,205 C157,195 168,195 173,199 C166,207 156,208 150,205 Z" fill="var(--leaf)"/>
      ${leaves}
      <g class="flower ${n===10?"":"off"}" data-on="${n===10?1:0}"><g class="pet">${pet}</g><circle cx="150" cy="36" r="7" fill="var(--sun)"/></g>
    </g>
    <ellipse cx="150" cy="210" rx="44" ry="6" fill="#6b4a35"/>
    <path d="M104,206 L196,206 L192,218 L108,218 Z" fill="var(--pot)"/>
    <path d="M110,218 L190,218 L180,246 L120,246 Z" fill="var(--pot)" opacity=".85"/>
  </svg>`;
}
function growPlant(){
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const st=app.querySelector(".plant-stem");if(st)st.style.strokeDashoffset=st.dataset.g;
    app.querySelectorAll(".plant-leaf[data-on='1']").forEach((l,i)=>{l.style.transitionDelay=(.5+i*.12)+"s";l.classList.remove("off")});
    app.querySelectorAll(".flower[data-on='1']").forEach(f=>f.classList.remove("off"));
  }));
}
function card(t){
  const ok=mcOk(t),pct=Math.round(mcDone(t)/t.mc.length*100);
  return `<button class="tcard h-${t.hue}" data-go="${t.id}">
    <span class="em" aria-hidden="true">${t.em}</span>
    <span class="tt">${t.title}</span>
    <span class="ts">${t.sub}</span>
    <span class="meta">${chip(t)}<span class="bar"><i style="width:${pct}%"></i></span><span class="done">${complete(t)?"🍃 ":""}${ok}/${t.mc.length}</span></span>
  </button>`;
}
function home(){
  app.className="wrap h-leaf";
  const n=KONULAR.filter(complete).length,ok=totalOk();
  const y1=KONULAR.filter(t=>t.yaz==="y1"),y2=KONULAR.filter(t=>t.yaz==="y2");
  const lnk=t=>`<button class="chip ${YAZ[t.yaz][0]}" style="border:0;cursor:pointer" data-go="${t.id}">${t.em} ${t.title}</button>`;
  app.innerHTML=`
  <div class="top"><span class="brand"><i aria-hidden="true">🌱</i>Melis'in Serası</span>
    <div class="acts"><a class="pill" href="../ders/">📒 Diğer dersler</a><button class="pill" id="moral">Moral lazım 💌</button></div></div>
  <div class="note">Selam Melis 💚 Bu sefer biyoloji: 10. sınıf, 1. dönem, "Enerji" teması. Her konunun bir <b>canlı sahnesi</b> var; dokun, kaydır, oynat. Mini testini bitirdiğin her konu seranda bir yaprak açar. Hepsi açılınca küçük bir sürprizim var 🌸<span class="sig">— Muhammet</span></div>
  <section class="sera" aria-label="İlerleme">
    ${plantSVG()}
    <div class="row"><span>🍃 ${n} / ${KONULAR.length} yaprak</span><span>✔ ${ok} / ${totalMc} doğru</span></div>
    <div class="bar"><i style="width:${Math.round(ok/totalMc*100)}%"></i></div>
  </section>
  <section class="exam h-sun">
    <h2>📝 Yazılıda ne çıkıyor?</h2>
    <div class="ex-row"><span class="badge" style="background:var(--sun-soft)">1. yazılı</span><div class="chips">${y1.map(lnk).join("")}</div></div>
    <div class="ex-row"><span class="badge" style="background:var(--water-soft)">2. yazılı</span><div class="chips"><span class="small" style="font-weight:700">1. yazılının konuları +</span>${y2.map(lnk).join("")}</div></div>
    <p class="small">MEB'in 2026-2027 ortak yazılı konu-soru dağılımına göre. Kemosentez ve enerji-metabolizma konularına doğrudan soru ayrılmamış ama öbür konuları anlamak için gerekli. Öğretmeninin duyurusu her zaman önce gelir.</p>
    <button class="btn" data-go="deneme">🎯 Karışık deneme (10 soru)${P.best!=null?` · en iyi: ${P.best}/10`:""}</button>
  </section>
  ${GRUPLAR.map(g=>`<section class="group"><div class="group-h"><span class="kick">${g.kick}</span><h2>${g.title}</h2><span class="small">${g.sub}</span></div>
    <div class="list">${KONULAR.filter(t=>t.grup===g.id).map(card).join("")}</div></section>`).join("")}
  <section class="group"><div class="group-h"><span class="kick">Tekrar</span><h2>Kavram kartları</h2><span class="small">Programdaki anahtar kavramlar. Karta dokun, arkasını çevir.</span></div>
    <div class="flash">${KAVRAMLAR.map(k=>`<button class="fc h-${k.hue}" aria-label="${k.k}: ${k.d}"><span class="in"><span class="fa"><span>kavram</span><b>${k.k}</b><span>çevir ↻</span></span><span class="fb">${k.d}</span></span></button>`).join("")}</div></section>
  <section class="group"><div class="group-h"><span class="kick">Hepsi bir arada</span><h2>Büyük karşılaştırma</h2><span class="small">Enerji temasının dört süreci tek tabloda.</span></div>
    <div class="kcard h-plum">${BUYUK_TABLO}</div></section>
  <p class="foot">Muhammet'ten sevgiyle 💚</p>`;
  document.getElementById("moral").onclick=moral;
  app.querySelectorAll(".fc").forEach(b=>b.onclick=()=>b.classList.toggle("flip"));
  growPlant();
}

/* ---------- konu sayfası ---------- */
function noteHTML(t){
  if(!complete(t))return `<div class="note locked" id="note">🔒 Mini testi bitirince Muhammet'in notu açılacak.</div>`;
  return `<div class="note" id="note">${t.note}<span class="sig">— Muhammet</span></div>`;
}
function mcHTML(t,q,i){
  const ch=tp(t.id).mc[i],ans=ch!==undefined,ok=ch===q.a;
  return `<div class="mcq${ans?(ok?" right":" wrong"):""}" data-i="${i}">
    <span class="lvl">${i+1}. soru</span><p class="q">${q.q}</p>
    <div class="opts">${q.o.map((o,j)=>`<button class="opt${ans&&j===q.a?" ok":""}${ans&&j===ch&&!ok?" no":""}" data-j="${j}"${ans?" disabled":""}><span class="k">${"ABCDE"[j]}</span><span>${o}</span></button>`).join("")}</div>
    ${ans?`<div class="why"><b>${ok?"Doğru! 💚":"Olmadı 🌧️ Doğrusu "+"ABCDE"[q.a]+"."}</b> ${q.e}</div>`:""}
  </div>`;
}
function opHTML(t,q,i){
  const st=tp(t.id).op[i];
  return `<div class="qcard${st==="ok"?" ok":""}" data-q="${i}">
    <span class="lvl">${q.l}</span><p class="q">${q.q}</p>
    <div class="btns"><button class="btn ghost" data-act="hint">İpucu 💡</button><button class="btn" data-act="ans"${st?" hidden":""}>Cevabı göster</button></div>
    <div class="hint" hidden>${q.h}</div>
    <div class="ans"${st?"":" hidden"}>${q.a}</div>
    <div class="mark"${st?"":" hidden"}>
      <button class="btn good${st==="ok"?" sel":""}" data-act="ok">Ben de böyle yazdım 💚</button>
      <button class="btn ghost${st==="again"?" sel":""}" data-act="again">Tekrar bakacağım</button>
    </div>
    <p class="cheer"${st==="again"?"":" hidden"}>Sorun değil. Bilgi kartlarına bir daha bak, yarın yeniden dene 🌱</p>
  </div>`;
}
function konu(id){
  const i=KONULAR.findIndex(t=>t.id===id);const t=KONULAR[i];const nx=KONULAR[(i+1)%KONULAR.length];
  app.className="wrap h-"+t.hue;
  app.innerHTML=`
  <div class="top"><button class="pill" data-go="">← Sera</button><button class="pill" id="moral">Moral lazım 💌</button></div>
  <div class="hero"><span class="em" aria-hidden="true">${t.em}</span><span class="kod">${t.kod} · ${YAZ[t.yaz][1]}</span><h1>${t.title}</h1></div>
  <div class="idea"><p class="big">${t.idea}</p><p>${t.analogy}</p></div>

  <div class="sec-h"><span class="num">1</span><div><h2>Canlı sahne</h2><span class="sub">Dokun, kaydır, oynat</span></div></div>
  <div class="scene" id="scene"></div>

  <div class="sec-h"><span class="num">2</span><h2>Bilmen gerekenler</h2></div>
  <div class="know">${t.know.map((k,j)=>`<div class="kcard" style="animation-delay:${j*60}ms"><h3>${k.h}</h3><div>${k.b}</div></div>`).join("")}</div>
  <div class="trap"><b>⚠️ Sık yapılan hatalar</b><ul>${t.trap.map(x=>`<li>${x}</li>`).join("")}</ul></div>
  <div class="skip"><span aria-hidden="true">🙅</span><span><b>Bunu bilmen gerekmiyor:</b> ${t.skip}</span></div>

  <div class="sec-h"><span class="num">3</span><h2>Birlikte çözelim</h2></div>
  <div class="ex"><p class="q">${t.ex.q}</p>
    <ol class="steps" id="steps">${t.ex.steps.map((s,j)=>`<li${j?" hidden":""}><span>${s}</span></li>`).join("")}</ol>
    <button class="btn" id="nextStep">Sonraki adım →</button></div>

  <div class="sec-h"><span class="num">4</span><div><h2>Mini test</h2><span class="sub">Bitirince seranda bir yaprak açar</span></div></div>
  <div class="score"><span id="sc"></span><button class="pill" id="retry">↺ Yeniden çöz</button></div>
  <div id="mcs" style="display:flex;flex-direction:column;gap:12px">${t.mc.map((q,j)=>mcHTML(t,q,j)).join("")}</div>

  <div class="sec-h"><span class="num">5</span><div><h2>Yazılı provası</h2><span class="sub">Önce kendin cevapla, sonra bak</span></div></div>
  ${t.open.map((q,j)=>opHTML(t,q,j)).join("")}

  ${noteHTML(t)}
  <button class="btn ghost next" data-go="${nx.id}">Sıradaki konu: ${nx.em} ${nx.title} →</button>
  <p class="foot">Muhammet'ten sevgiyle 💚</p>`;

  document.getElementById("moral").onclick=moral;
  const sc=document.getElementById("scene");
  try{cleanup=SAHNE[t.id](sc)}catch(err){console.error(err);sc.innerHTML=`<p class="small">Sahne yüklenemedi.</p>`}
  const gr=document.getElementById("grafikler");if(gr)SAHNE.grafikler(gr);
  const eb=document.getElementById("enerjibar");if(eb)SAHNE.enerjibar(eb);

  const steps=[...app.querySelectorAll("#steps li")],ns=document.getElementById("nextStep");
  ns.onclick=()=>{const h=steps.find(s=>s.hidden);if(h)h.hidden=false;
    if(!steps.some(s=>s.hidden)){ns.textContent="Anladım 💚";ns.disabled=true;burst(ns)}};

  const score=()=>{document.getElementById("sc").textContent=`${mcOk(t)} / ${t.mc.length} doğru${complete(t)?" · 🍃 yaprak açıldı":""}`};
  score();
  const mcs=document.getElementById("mcs");
  mcs.addEventListener("click",e=>{
    const b=e.target.closest(".opt");if(!b||b.disabled)return;
    const card=b.closest(".mcq"),qi=+card.dataset.i,j=+b.dataset.j,q=t.mc[qi];
    const wasDone=complete(t),allBefore=KONULAR.every(complete);
    tp(t.id).mc[qi]=j;save();
    card.outerHTML=mcHTML(t,q,qi);
    const nc=mcs.querySelector(`.mcq[data-i="${qi}"]`);
    if(j===q.a)burst(nc.querySelector(".opt.ok"));else nc.classList.add("shake");
    score();
    if(!wasDone&&complete(t)){
      const n=document.getElementById("note");n.outerHTML=noteHTML(t);
      const nn=document.getElementById("note");nn.classList.add("pop");
      setTimeout(()=>{nn.scrollIntoView({behavior:"smooth",block:"center"});burst(nn)},300);
      if(!allBefore&&KONULAR.every(complete))setTimeout(()=>toast("Bütün yapraklar açıldı ve seranda çiçek açtı 🌸 Bu dönemin bütün konularını bitirdin. Seninle çok gurur duyuyorum."),1200);
      else setTimeout(()=>toast(`Seranda yeni bir yaprak açtı! 🍃 ${mcOk(t)}/${t.mc.length} doğru.`),900);
    }
  });
  document.getElementById("retry").onclick=()=>{tp(t.id).mc={};save();mcs.innerHTML=t.mc.map((q,j)=>mcHTML(t,q,j)).join("");score();mcs.scrollIntoView({behavior:"smooth",block:"start"})};

  app.querySelectorAll(".qcard").forEach(c=>{
    const qi=+c.dataset.q;
    c.addEventListener("click",e=>{
      const b=e.target.closest("[data-act]");if(!b)return;const act=b.dataset.act;
      if(act==="hint"){const h=c.querySelector(".hint");h.hidden=!h.hidden;return}
      if(act==="ans"){c.querySelector(".ans").hidden=false;c.querySelector(".mark").hidden=false;b.hidden=true;return}
      tp(t.id).op[qi]=act;save();
      c.classList.toggle("ok",act==="ok");
      c.querySelectorAll(".mark .btn").forEach(x=>x.classList.toggle("sel",x===b));
      c.querySelector(".cheer").hidden=act!=="again";
      if(act==="ok")burst(b);
    });
  });
}

/* ---------- karışık deneme ---------- */
function deneme(){
  app.className="wrap h-coral";
  const havuz=[];KONULAR.forEach(t=>t.mc.forEach((q,i)=>havuz.push({t,q,i})));
  havuz.sort(()=>Math.random()-.5);
  const sec=[],say={};
  for(const h of havuz){if((say[h.t.id]||0)>=2)continue;say[h.t.id]=(say[h.t.id]||0)+1;sec.push(h);if(sec.length===10)break}
  sec.sort(()=>Math.random()-.5);
  const cev=[];let k=0;
  app.innerHTML=`
  <div class="top"><button class="pill" data-go="">← Sera</button><button class="pill" id="moral">Moral lazım 💌</button></div>
  <div class="hero"><span class="em" aria-hidden="true">🎯</span><span class="kod">10 soru · bütün konulardan karışık</span><h1>Karışık deneme</h1></div>
  <div class="deneme-top"><div class="dots">${sec.map(()=>"<i></i>").join("")}</div><span id="dk"></span></div>
  <div id="dq"></div>`;
  document.getElementById("moral").onclick=moral;
  const dq=document.getElementById("dq"),dots=[...app.querySelectorAll(".dots i")];
  function goster(){
    dots.forEach((d,i)=>{d.className=i<k?(cev[i]?"ok":"no"):i===k?"cur":""});
    document.getElementById("dk").textContent=`${Math.min(k+1,10)} / 10`;
    if(k>=sec.length)return bitir();
    const {t,q}=sec[k];
    dq.innerHTML=`<div class="mcq h-${t.hue}" style="animation:fadein .35s ease"><span class="lvl">${t.em} ${t.title}</span><p class="q">${q.q}</p>
      <div class="opts">${q.o.map((o,j)=>`<button class="opt" data-j="${j}"><span class="k">${"ABCDE"[j]}</span><span>${o}</span></button>`).join("")}</div></div>`;
    dq.querySelector(".opts").onclick=e=>{
      const b=e.target.closest(".opt");if(!b||b.disabled)return;const j=+b.dataset.j,ok=j===q.a;cev[k]=ok;
      dq.querySelectorAll(".opt").forEach((x,xi)=>{x.disabled=true;if(xi===q.a)x.classList.add("ok");else if(xi===j)x.classList.add("no")});
      const c=dq.querySelector(".mcq");c.classList.add(ok?"right":"wrong");if(!ok)c.classList.add("shake");else burst(b);
      c.insertAdjacentHTML("beforeend",`<div class="why"><b>${ok?"Doğru! 💚":"Olmadı 🌧️ Doğrusu "+"ABCDE"[q.a]+"."}</b> ${q.e}</div><button class="btn" id="dn">${k<9?"Sonraki soru →":"Sonucu gör 🎉"}</button>`);
      document.getElementById("dn").onclick=()=>{k++;goster();window.scrollTo({top:0,behavior:"smooth"})};
    };
  }
  function bitir(){
    const p=cev.filter(Boolean).length;const rekor=P.best==null||p>P.best;if(rekor){P.best=p;save()}
    const msg=p===10?"Tam puan! Sen yürüyen bir fotosentez makinesisin ☀️💚":p>=8?"Harika! Birkaç küçük şey kaldı, onlara da birlikte bakarız.":p>=5?"Güzel gidiyor. Yanlış yaptığın konulara bir daha bakalım, ben yanındayım.":"Sorun yok, bu daha başlangıç. Konuları birlikte tekrar edelim; her deneme bir öncekinden iyi olacak 🌱";
    const yanlis=[...new Set(sec.filter((_,i)=>!cev[i]).map(s=>s.t))];
    dq.innerHTML=`<div class="result"><span class="big">${p}/10</span>${rekor&&p>0?`<span class="chip y1">yeni rekor!</span>`:""}
      <div class="note" style="text-align:left;width:100%">${msg}<span class="sig">— Muhammet</span></div>
      ${yanlis.length?`<p class="small" style="font-weight:700">Tekrar bakmaya değer:</p><div class="chips" style="justify-content:center">${yanlis.map(t=>`<button class="chip" style="border:0;cursor:pointer" data-go="${t.id}">${t.em} ${t.title}</button>`).join("")}</div>`:""}
      <div class="btns" style="width:100%"><button class="btn" id="yeni">↺ Yeni deneme</button><button class="btn ghost" data-go="">Seraya dön</button></div></div>`;
    document.getElementById("yeni").onclick=deneme;
    if(p>=8)burst(dq.querySelector(".big"));
  }
  goster();
}

route();
