// Her konunun "canlı sahnesi". SAHNE[id](kutu) sahneyi kurar ve temizleme fonksiyonu döner.
// Parçacıklar requestAnimationFrame ile, durum geçişleri CSS transition ile, sürekli akışlar SMIL animateMotion ile.

const NS="http://www.w3.org/2000/svg";
function S(tag,a,p){const e=document.createElementNS(NS,tag);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function T(p,x,y,txt,a){const t=S("text",Object.assign({x,y},a||{}),p);t.textContent=txt;return t}
function svgRoot(el,vb,label){const s=S("svg",{viewBox:vb,class:"sv",role:"img","aria-label":label});el.appendChild(s);return s}
function add(el,html){el.insertAdjacentHTML("beforeend",html);return el.lastElementChild}
const easeIO=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
const lin=k=>k;
const rand=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[Math.floor(Math.random()*a.length)];
function bump(el){el.classList.remove("bump");void el.offsetWidth;el.classList.add("bump")}
function tf(el,x,y,extra){el.style.transform=`translate(${x}px,${y}px)${extra?" "+extra:""}`}

function Engine(){
  const ps=[],ticks=[],timers=[];let raf=0,last=0,dead=false;
  function frame(t){
    const dt=last?Math.min(60,t-last):16;last=t;
    for(const f of ticks)f(dt);
    for(let i=ps.length-1;i>=0;i--){
      const p=ps[i];p.t+=dt;const k=Math.min(1,p.t/p.dur);const e=(p.ease||easeIO)(k);
      const x=(1-e)*(1-e)*p.x0+2*(1-e)*e*p.cx+e*e*p.x1,y=(1-e)*(1-e)*p.y0+2*(1-e)*e*p.cy+e*e*p.y1;
      p.el.setAttribute("transform",`translate(${x.toFixed(1)},${y.toFixed(1)})${p.scale?` scale(${p.scale(k).toFixed(3)})`:""}`);
      if(p.op)p.el.setAttribute("opacity",p.op(k).toFixed(3));
      if(k>=1){
        ps.splice(i,1);
        if(p.legs&&p.legs.length){const n=p.legs.shift();Object.assign(p,{x0:x,y0:y,t:0,cx:undefined,cy:undefined,op:undefined},n);
          if(p.cx===undefined){p.cx=(x+p.x1)/2;p.cy=(y+p.y1)/2}ps.push(p)}
        else{if(!p.keep)p.el.remove();if(p.done)p.done(p)}
      }
    }
    raf=requestAnimationFrame(frame);
  }
  function start(){if(!raf&&!dead){last=0;raf=requestAnimationFrame(frame)}}
  function stop(){cancelAnimationFrame(raf);raf=0}
  const vis=()=>{document.hidden?stop():start()};
  document.addEventListener("visibilitychange",vis);
  start();
  return{
    fly(el,o){const p=Object.assign({el,t:0,dur:1000},o);if(p.cx===undefined){p.cx=(p.x0+p.x1)/2;p.cy=(p.y0+p.y1)/2}
      el.setAttribute("transform",`translate(${p.x0},${p.y0})`);ps.push(p);return p},
    tick(f){ticks.push(f)},
    every(ms,f){const get=typeof ms==="function"?ms:()=>ms;let acc=0;ticks.push(dt=>{const m=get();if(!(m>0)){acc=0;return}acc+=dt;if(acc>=m){acc=0;f()}})},
    later(f,ms){const id=setTimeout(f,ms);timers.push(id);return id},
    clear(){timers.forEach(clearTimeout);timers.length=0},
    kill(){dead=true;stop();timers.forEach(clearTimeout);document.removeEventListener("visibilitychange",vis);ps.length=0;ticks.length=0}
  };
}
function emo(p,ch,size){const g=S("g",null,p);T(g,0,size*.35,ch,{"font-size":size,"text-anchor":"middle"});return g}
function tok(p,txt,fill,w){const g=S("g",null,p);w=w||(txt.length*5.6+8);S("rect",{x:-w/2,y:-6.5,width:w,height:13,rx:6.5,fill},g);T(g,0,3,txt,{class:"tk","text-anchor":"middle"});return g}
function ball(p,fill,txt){const g=S("g",{class:"tr"},p);const c=S("circle",{r:7.5,fill},g);const t=T(g,0,3.2,txt||"C",{class:"tk","text-anchor":"middle"});g._c=c;g._t=t;return g}
function hexMix(a,b,k){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);
  const r=Math.round(((pa>>16)&255)*(1-k)+((pb>>16)&255)*k),g=Math.round(((pa>>8)&255)*(1-k)+((pb>>8)&255)*k),bl=Math.round((pa&255)*(1-k)+(pb&255)*k);
  return "#"+((1<<24)|(r<<16)|(g<<8)|bl).toString(16).slice(1)}
function motion(el,href,dur,begin){const am=S("animateMotion",{dur:dur+"s",repeatCount:"indefinite",begin:begin+"s"},el);
  const mp=S("mpath",{href},am);mp.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",href);return am}
function seg(el,opts,on,cb){el.innerHTML=opts.map(([v,l])=>`<button type="button" data-v="${v}" class="${v===on?"on":""}">${l}</button>`).join("");
  el.onclick=e=>{const b=e.target.closest("button");if(!b)return;el.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));cb(b.dataset.v)}}

const SAHNE={

/* ⚡ ATP: harca / yükle döngüsü */
atp(el){
  const E=Engine();
  el.innerHTML=`<h3>🔋 ATP'yi harca, yeniden yükle</h3>`;
  const s=svgRoot(el,"0 0 360 215","ATP molekülü: adenin, riboz ve üç fosfat; uçtaki fosfat ayrılınca enerji açığa çıkar");
  const name=T(s,180,32,"ATP",{"text-anchor":"middle",class:"big","font-size":22});
  S("line",{x1:74,y1:84,x2:112,y2:84,stroke:"var(--muted)","stroke-width":3},s);
  S("line",{x1:148,y1:84,x2:164,y2:84,stroke:"var(--muted)","stroke-width":3},s);
  S("rect",{x:14,y:64,width:60,height:40,rx:12,fill:"var(--water)"},s);
  T(s,44,88,"A",{"text-anchor":"middle",class:"tk","font-size":13});
  const pent=[...Array(5)].map((_,i)=>{const a=(-90+72*i)*Math.PI/180;return `${130+21*Math.cos(a)},${84+21*Math.sin(a)}`}).join(" ");
  S("polygon",{points:pent,fill:"var(--sun)"},s);T(s,130,88,"R",{"text-anchor":"middle",class:"tk","font-size":13});
  const zig=x=>`M${x},84 l4,-6 l5,12 l5,-12 l5,12 l4,-6`;
  S("path",{d:zig(196),fill:"none",stroke:"var(--sun)","stroke-width":3,class:"glow"},s);
  const z2=S("path",{d:zig(253),fill:"none",stroke:"var(--sun)","stroke-width":3,class:"glow"},s);
  T(s,250,58,"yüksek enerjili bağlar",{"text-anchor":"middle",class:"lb"});
  const P=x=>{const g=S("g",{class:"tr"},s);S("circle",{cx:x,cy:84,r:16,fill:"var(--coral)"},g);T(g,x,88,"P",{"text-anchor":"middle",class:"tk","font-size":12});return g};
  P(180);P(237);const p3=P(294);p3.style.transformBox="fill-box";p3.style.transformOrigin="center";
  T(s,44,124,"Adenin",{"text-anchor":"middle",class:"lb"});T(s,130,124,"Riboz",{"text-anchor":"middle",class:"lb"});T(s,237,124,"Fosfatlar",{"text-anchor":"middle",class:"lb"});
  const isler=[["💪","Kas",50],["🧠","Sinir",135],["⛽","Pompa",220],["🧱","Yapım",305]].map(([e,l,x])=>{
    const g=S("g",{class:"tr"},s);g.style.transformBox="fill-box";g.style.transformOrigin="center";
    S("circle",{cx:x,cy:172,r:20,fill:"var(--c-soft)"},g);T(g,x,179,e,{"font-size":19,"text-anchor":"middle"});T(g,x,206,l,{"text-anchor":"middle",class:"lb"});
    g._x=x;return g});
  const cap=add(el,`<div class="cap"></div>`);
  const st=add(el,`<div class="stat"><span>Harcanan ATP: <b>0</b></span><span>Şu an: <b>ATP</b></span></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn" data-a="h">⚡ Enerji harca</button><button class="btn ghost" data-a="y" disabled>🍞 Besinle yükle</button><button class="btn ghost" data-a="o">▶ Döngüyü izle</button></div>`);
  const [bH,bY,bO]=ctrl.querySelectorAll("button");
  let state="ATP",n=0,auto=false;
  const eqH=`<b>Hidroliz:</b> ATP + H₂O → ADP + P + <b>enerji</b>. Uçtaki fosfat koptu, açığa çıkan enerji hücrenin işine gitti.`;
  const eqY=`<b>Yükleme:</b> ADP + P + enerji → ATP + H₂O. Enerji, besinin (glikozun) hücresel solunumla yıkılmasından geliyor.`;
  cap.innerHTML=`Uçtaki fosfat bağı enerji dolu. <b>Enerji harca</b>'ya bas ve enerjinin nereye gittiğini izle.`;
  function setState(v){state=v;st.children[1].querySelector("b").textContent=v==="ATP"?"ATP":"ADP + P";bH.disabled=v!=="ATP";bY.disabled=v!=="ADP"}
  function harca(){
    if(state!=="ATP")return;setState("busy");
    const w=emo(s,"💧",16);
    E.fly(w,{x0:330,y0:205,x1:268,y1:96,cx:340,cy:120,dur:550,done(){
      tf(p3,52,-46,"rotate(30deg)");p3.style.opacity=".55";z2.style.opacity=".15";
      name.textContent="ADP + P";
      const hedef=pick(isler);const sp=emo(s,"⚡",22);
      E.fly(sp,{x0:268,y0:84,x1:hedef._x,y1:168,cx:(268+hedef._x)/2,cy:20,dur:800,scale:k=>.7+k*.6,done(){
        hedef.style.transform="scale(1.3)";E.later(()=>hedef.style.transform="",350);
        n++;const b=st.children[0].querySelector("b");b.textContent=n;bump(st.children[0]);
        setState("ADP");cap.innerHTML=eqH}});
    }});
  }
  function yukle(){
    if(state!=="ADP")return;setState("busy");
    const f=emo(s,"🍞",20);
    E.fly(f,{x0:-10,y0:200,x1:268,y1:110,cx:120,cy:230,dur:800,op:k=>k<.85?1:(1-k)/.15,done(){
      const fire=emo(s,"🔥",18);E.fly(fire,{x0:268,y0:110,x1:268,y1:92,dur:350,op:k=>1-k});
      p3.style.transform="";p3.style.opacity="";z2.style.opacity="";name.textContent="ATP";
      setState("ATP");cap.innerHTML=eqY}});
  }
  bH.onclick=harca;bY.onclick=yukle;
  bO.onclick=()=>{auto=!auto;bO.textContent=auto?"⏸ Durdur":"▶ Döngüyü izle"};
  E.every(()=>auto?1500:0,()=>{state==="ATP"?harca():state==="ADP"&&yukle()});
  return ()=>E.kill();
},

/* ☀️ Fotosentez: kloroplast + yaprak renkleri */
foto(el){
  const E=Engine();
  el.innerHTML=`<h3>🌿 Kloroplastın içi</h3>`;
  const s=svgRoot(el,"0 0 360 250","Kloroplast: tilakoidde ışığın kullanıldığı tepkimeler, stromada Calvin döngüsü");
  const sun=S("g",null,s);const rays=S("g",{class:"spin"},sun);rays.style.animationDuration="12s";
  for(let i=0;i<8;i++){const a=i*Math.PI/4;S("line",{x1:38+Math.cos(a)*23,y1:36+Math.sin(a)*23,x2:38+Math.cos(a)*31,y2:36+Math.sin(a)*31,stroke:"#f4b23a","stroke-width":3,"stroke-linecap":"round"},rays)}
  S("circle",{cx:38,cy:36,r:17,fill:"#f4b23a"},sun);
  S("ellipse",{cx:205,cy:150,rx:148,ry:90,class:"mem"},s);
  S("ellipse",{cx:205,cy:150,rx:140,ry:82,fill:"none",stroke:"var(--leaf)","stroke-width":1.2,opacity:.45},s);
  const G=[[95,130],[150,108],[140,188]];
  S("path",{d:"M112,134 L134,110 M118,150 L130,172",stroke:"var(--leaf)","stroke-width":2.5,opacity:.55,fill:"none"},s);
  const gEl=G.map(([x,y])=>{const g=S("g",null,s);for(let i=0;i<4;i++)S("rect",{x:x-20,y:y-20+i*11,width:40,height:9,rx:4.5,class:"thy"},g);return g});
  const calvin=S("g",{class:"spin"},s);calvin.style.animationDuration="3.5s";
  S("circle",{cx:285,cy:150,r:38,fill:"none"},calvin);
  S("circle",{cx:285,cy:150,r:30,fill:"none",stroke:"var(--leaf)","stroke-width":3,"stroke-dasharray":"10 7"},calvin);
  S("polygon",{points:"285,113 294,120 285,127",fill:"var(--leaf)"},calvin);
  T(s,285,154,"Calvin",{"text-anchor":"middle",class:"big","font-size":12});
  T(s,95,100,"Tilakoid",{"text-anchor":"middle",class:"lb"});
  T(s,285,198,"Stroma",{"text-anchor":"middle",class:"lb"});
  T(s,14,242,"H₂O 💧",{class:"lb"});T(s,346,40,"CO₂",{class:"lb","text-anchor":"end"});T(s,346,246,"glikoz →",{class:"lb","text-anchor":"end"});T(s,200,14,"O₂ ↑",{class:"lb"});
  const cap=add(el,`<div class="cap"></div>`);
  const st=add(el,`<div class="stat"><span>Çıkan O₂: <b>0</b></span><span>Glikoz: <b>0</b></span><span>Stromadaki ATP+NADPH: <b>0</b></span></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn" data-a="l">🌙 Işığı kapat</button><button class="btn ghost" data-a="c">💨 CO₂'yi kes</button></div>`);
  const [bL,bC]=ctrl.querySelectorAll("button");
  let light=true,co2On=true,stock=3,co2=0,fixed=0,o2=0,glu=0,work=false;
  const sb=st.querySelectorAll("b");
  const upd=()=>{sb[0].textContent=o2;sb[1].textContent=glu;sb[2].textContent=stock};
  function photon(){const i=Math.floor(Math.random()*3);const[gx,gy]=G[i];const d=S("circle",{r:3,fill:"var(--sun)"},s);
    E.fly(d,{x0:38,y0:36,x1:gx+rand(-14,14),y1:gy+rand(-10,14),dur:650,ease:lin,done(){if(gEl[i].animate)gEl[i].animate([{opacity:.45},{opacity:1}],{duration:350})}})}
  function water(){const i=Math.floor(Math.random()*3);const[gx,gy]=G[i];const d=S("circle",{r:3.5,fill:"var(--water)"},s);
    E.fly(d,{x0:22,y0:236,x1:gx,y1:gy,cx:50,cy:gy+40,dur:1300,done(){
      if(!light||stock>=12)return;
      const b=S("g",null,s);S("circle",{r:4.5,fill:"var(--surface)",stroke:"var(--water)","stroke-width":1.5},b);T(b,7,3,"O₂",{"font-size":7,fill:"var(--water)"});
      E.fly(b,{x0:gx,y0:gy-20,x1:gx+rand(-30,30),y1:-12,dur:1700,ease:lin,done(){o2++;upd();bump(st.children[0])}});
      const atp=Math.random()<.5;const t=tok(s,atp?"ATP":"NADPH",atp?"var(--sun)":"var(--plum)");
      E.fly(t,{x0:gx,y0:gy,x1:285+rand(-10,10),y1:150+rand(-10,10),cy:gy-40,dur:1100,done(){stock=Math.min(12,stock+1);upd()}});
    }})}
  function gas(){const g=S("g",null,s);S("circle",{r:3.5,fill:"var(--muted)"},g);
    E.fly(g,{x0:362,y0:44,x1:285+rand(-12,12),y1:150+rand(-12,12),cx:330,cy:110,dur:1200,done(){co2=Math.min(10,co2+1)}})}
  function calvinTick(){
    work=stock>0&&co2>0;calvin.classList.toggle("paused",!work);
    if(!work)return;stock--;co2--;fixed++;upd();
    if(fixed%6===0){const h=S("g",null,s);S("polygon",{points:"0,-9 8,-4.5 8,4.5 0,9 -8,4.5 -8,-4.5",fill:"var(--sun-soft)",stroke:"var(--sun)","stroke-width":2},h);T(h,0,3,"C₆",{"font-size":7,"text-anchor":"middle"});
      E.fly(h,{x0:285,y0:170,x1:350,y1:236,dur:1300,done(){glu++;upd();bump(st.children[1])}})}
  }
  function caption(){
    if(light&&co2On&&stock<12)cap.innerHTML=`<b>Işık var:</b> klorofil ışığı yakalıyor, su parçalanıyor (<b>fotoliz</b>) ve O₂ çıkıyor. ATP ve NADPH stromaya akıyor; <b>Calvin döngüsü</b> 6 CO₂'den 1 glikoz yapıyor.`;
    else if(light&&!co2On)cap.innerHTML=stock>=12?`<b>CO₂ yok:</b> Calvin döngüsü durdu, ATP-NADPH stromada birikti ve doldu. Işıklı tepkimeler de yavaşladı: O₂ çıkışı kesildi. İki aşama birbirine muhtaç!`:`<b>CO₂ kesildi:</b> Calvin döngüsü çalışamıyor, ATP ve NADPH stromada birikiyor…`;
    else if(!light&&stock>0)cap.innerHTML=`<b>Işık kapandı!</b> Fotoliz ve O₂ çıkışı hemen durdu. Calvin döngüsü stokta kalan ATP-NADPH ile hâlâ çalışıyor (stok: ${stock}).`;
    else if(!light)cap.innerHTML=`<b>Stok bitti:</b> Calvin döngüsü de durdu. "Işığın kullanılmadığı" tepkimeler bile ışığa muhtaç!`;
    else cap.innerHTML=`Stroma dolu: Calvin döngüsü stoğu eritene kadar ışıklı tepkimeler bekliyor.`;
  }
  bL.onclick=()=>{light=!light;bL.textContent=light?"🌙 Işığı kapat":"💡 Işığı aç";sun.style.opacity=light?"":".2";rays.classList.toggle("paused",!light);caption()};
  bC.onclick=()=>{co2On=!co2On;bC.textContent=co2On?"💨 CO₂'yi kes":"💨 CO₂ ver";caption()};
  E.every(()=>light?240:0,photon);E.every(480,water);E.every(()=>co2On?520:0,gas);E.every(430,calvinTick);E.every(500,caption);
  caption();upd();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>🍂 Yaprağın renkleri</h3>`);
  const s2=svgRoot(el,"0 0 360 130","Yaprak: yazın yeşil, sonbaharda klorofil yıkılınca sarı-turuncu");
  const yap=S("g",{class:"sway"},s2);yap.style.animationDuration="4s";
  const leafD="M60,70 C110,10 220,8 300,62 C220,118 110,124 60,70 Z";
  const leaf=S("path",{d:leafD,fill:"#3f9a4a",stroke:"var(--ink)","stroke-opacity":.25,"stroke-width":1.5},yap);
  S("path",{d:"M30,74 L60,70 L296,62 M120,68 L150,40 M120,68 L150,96 M180,66 L212,36 M180,66 L212,98 M240,64 L262,46 M240,64 L262,84",stroke:"var(--surface)","stroke-opacity":.6,"stroke-width":2,fill:"none"},yap);
  const sl=add(el,`<label class="sl">Mevsim<output>Yaz ☀️</output><input type="range" min="0" max="100" value="0"></label>`);
  const pg=add(el,`<div class="seg"></div>`);
  const pc=add(el,`<div class="cap">Kaydırıcıyı sonbahara çek ya da bir pigmente dokun.</div>`);
  const PIG={kl:["Klorofil","#3f9a4a",`<b>Klorofil (yeşil):</b> asıl pigment. Kırmızı ve mavi-mor ışığı soğurur, yeşili yansıtır. Işık enerjisini kimyasal enerjiye çevirmeyi başlatır.`],
    ka:["Karoten","#e38a1f",`<b>Karoten (turuncu):</b> havucun rengi. Klorofilin kaçırdığı ışığı yakalayıp ona aktarır, fazla ışığa karşı korur.`],
    ks:["Ksantofil","#e3c12a",`<b>Ksantofil (sarı):</b> yardımcı pigment. Sonbaharda klorofil yıkılınca sarı renk ortaya çıkar.`],
    li:["Likopen","#d4402f",`<b>Likopen (kırmızı):</b> domatesin ve karpuzun rengi. O da yardımcı bir pigment 🍅`]};
  seg(pg,Object.entries(PIG).map(([k,v])=>[k,v[0]]),"",k=>{leaf.setAttribute("fill",PIG[k][1]);pc.innerHTML=PIG[k][2]});
  sl.querySelector("input").oninput=e=>{const v=+e.target.value/100;
    const c=v<.6?hexMix("#3f9a4a","#e3c12a",v/.6):hexMix("#e3c12a","#d8622a",(v-.6)/.4);leaf.setAttribute("fill",c);
    sl.querySelector("output").textContent=v<.3?"Yaz ☀️":v<.75?"Sonbahar başı 🍂":"Sonbahar 🍁";
    pg.querySelectorAll("button").forEach(b=>b.classList.remove("on"));
    pc.innerHTML=v<.3?`Yazın klorofil bol: diğer pigmentlerin rengini bastırıyor, yaprak yeşil.`:`Gün kısalınca klorofil yıkılıyor ve yenisi yapılmıyor. Zaten orada olan <b>karoten</b> ve <b>ksantofil</b> görünür hâle geliyor: sarı, turuncu.`};
  return ()=>E.kill();
},

/* 🔬 Fotosentez deneyi: su bitkisi + iyot testi */
fdeney(el){
  const E=Engine();
  el.innerHTML=`<h3>🧪 Su bitkisi laboratuvarı</h3>`;
  const s=svgRoot(el,"0 0 360 232","Su bitkisi deneyi: lamba, beher, kabarcıklar");
  S("line",{x1:0,y1:213,x2:360,y2:213,stroke:"var(--line)","stroke-width":3},s);
  const lamp=S("g",null,s);
  const cone=S("polygon",{points:"",opacity:.25},s);
  S("line",{x1:0,y1:118,x2:0,y2:212,stroke:"var(--muted)","stroke-width":4},lamp);
  S("rect",{x:-14,y:206,width:28,height:7,rx:3,fill:"var(--muted)"},lamp);
  S("path",{d:"M-12,96 L8,90 L8,130 L-12,124 Z",fill:"var(--muted)"},lamp);
  const bulb=S("circle",{cx:10,cy:110,r:9,class:"glow"},lamp);
  S("rect",{x:192,y:82,width:121,height:128,fill:"var(--water-soft)"},s);
  const dots=S("g",null,s);const DP=[...Array(40)].map(()=>[rand(198,306),rand(150,204)]);
  S("rect",{x:190,y:62,width:125,height:150,rx:10,fill:"none",stroke:"var(--water)","stroke-width":2.5},s);
  S("line",{x1:192,y1:82,x2:313,y2:82,stroke:"var(--water)","stroke-width":1.5,opacity:.6},s);
  const plant=S("g",{class:"sway"},s);plant.style.animationDuration="4s";
  ["M250,208 C240,170 262,140 245,105","M252,208 C268,175 248,150 268,112","M249,208 C232,180 228,150 232,125"].forEach(d=>S("path",{d,stroke:"var(--leaf)","stroke-width":4,fill:"none","stroke-linecap":"round"},plant));
  [[246,180],[256,160],[249,135],[262,175],[258,140],[238,170],[233,145]].forEach(([x,y],i)=>S("ellipse",{cx:x,cy:y,rx:9,ry:3.5,fill:"var(--leaf)",transform:`rotate(${i%2?25:-25} ${x} ${y})`},plant));
  const TIPS=[[245,105],[268,112],[232,125]];
  S("rect",{x:298,y:92,width:8,height:100,rx:4,fill:"var(--surface)",stroke:"var(--muted)","stroke-width":1.2},s);
  const merc=S("rect",{x:300,y:150,width:4,height:40,rx:2,fill:"var(--coral)"},s);
  const tLbl=T(s,302,88,"25°",{"text-anchor":"middle",class:"lb"});
  const dLine=S("line",{y1:222,y2:222,x2:190,stroke:"var(--muted)","stroke-width":1.2,"stroke-dasharray":"3 3"},s);
  const dLbl=T(s,0,229,"",{"text-anchor":"middle",class:"lb"});
  const cap=add(el,`<div class="cap"></div>`);
  const st=add(el,`<div class="stat"><span>Kabarcık/dk: <b>0</b></span><span>Sınırlayan: <b>–</b></span></div>`);
  add(el,`<p class="small">Kabarcıklar 3 kat hızlandırılmış gösteriliyor. Kabarcık sayısı = O₂ çıkışı = fotosentez hızı.</p>`);
  const sD=add(el,`<label class="sl">Lambanın uzaklığı<output>20 cm</output><input type="range" min="10" max="50" step="5" value="20"></label>`);
  const sC=add(el,`<label class="sl">CO₂ (suya katılan karbonat)<output>2 kaşık</output><input type="range" min="0" max="5" step="1" value="2"></label>`);
  const sT=add(el,`<label class="sl">Su sıcaklığı<output>25 °C</output><input type="range" min="5" max="50" step="5" value="25"></label>`);
  add(el,`<div class="small" style="font-weight:700">Işığın rengi</div>`);
  const col=add(el,`<div class="seg"></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">📋 Ölçümü tabloya yaz</button><button class="btn ghost">Tabloyu temizle</button></div>`);
  const tb=add(el,`<div class="tbl fit" hidden><table><thead><tr><th>#</th><th>Uzaklık</th><th>CO₂</th><th>Sıcaklık</th><th>Işık</th><th>Kabarcık</th></tr></thead><tbody></tbody></table></div>`);
  const RENK={beyaz:["Beyaz","#fff2b8",1],kirmizi:["Kırmızı","#ff6b5a",.9],mavi:["Mavi","#5a9cff",.95],yesil:["Yeşil","#5fd36a",.22]};
  let d=20,c=2,t=25,rk="beyaz",rate=0,row=0;
  function calc(){
    const I=100*Math.pow(10/d,2)*RENK[rk][2];
    const fl=Math.min(1,I/40),fc=Math.min(1,(c+.5)/3),g=Math.exp(-Math.pow((t-30)/(t<=30?14:9),2));
    rate=Math.round(60*Math.min(fl,fc)*g);
    const m=Math.min(fl,fc,g);const lim=m>.95?"yok, tam hız":m===g?(t>30?"sıcaklık (fazla)":"sıcaklık (az)"):m===fl?"ışık":"CO₂";
    const b=st.querySelectorAll("b");b[0].textContent=rate;b[1].textContent=lim;
    const lx=150-(d-10)*3.2;lamp.setAttribute("transform",`translate(${lx},0)`);
    bulb.setAttribute("fill",RENK[rk][1]);cone.setAttribute("fill",RENK[rk][1]);
    cone.setAttribute("points",`${lx+18},98 ${lx+18},122 192,${70} 192,${208}`);cone.setAttribute("opacity",(.08+.4*Math.min(1,I/100)).toFixed(2));
    dLine.setAttribute("x1",lx+10);dLbl.setAttribute("x",(lx+200)/2);dLbl.textContent=`${d} cm`;
    merc.setAttribute("y",192-t*1.9);merc.setAttribute("height",t*1.9);tLbl.textContent=t+"°";
    dots.innerHTML="";DP.slice(0,c*8).forEach(([x,y])=>S("circle",{cx:x,cy:y,r:1.6,fill:"var(--muted)",opacity:.6},dots));
    cap.innerHTML=lim==="ışık"?`Şu an hızı <b>ışık</b> sınırlıyor. Lambayı yaklaştır ya da rengini değiştir.`
      :lim==="CO₂"?`Işık bol ama <b>CO₂ yetersiz</b>. Lambayı yaklaştırmak artık işe yaramaz: <b>minimum kuralı</b>!`
      :lim.startsWith("sıcaklık")?(t>30?`Su çok sıcak: fotosentez <b>enzimlerinin</b> yapısı bozuluyor, hız düşüyor.`:`Su soğuk: enzimler yavaş çalışıyor, hız düşük.`)
      :`Bütün faktörler yeterli: bitki <b>tam hızda</b>. Artık hiçbirini artırmak hızı yükseltmez.`;
  }
  E.every(()=>rate>0?60000/rate/3:0,()=>{const[tx,ty]=pick(TIPS);const r=rand(2,3.6);const b=S("circle",{r,fill:"var(--surface)",stroke:"var(--water)","stroke-width":1.2},s);
    E.fly(b,{x0:tx+rand(-3,3),y0:ty,x1:tx+rand(-8,8),y1:84,dur:(ty-84)*45,ease:lin,op:k=>k<.9?1:(1-k)*10})});
  const bind=(lab,f,fmt)=>{const i=lab.querySelector("input"),o=lab.querySelector("output");i.oninput=()=>{f(+i.value);o.textContent=fmt(+i.value);calc()}};
  bind(sD,v=>d=v,v=>v+" cm");bind(sC,v=>c=v,v=>v+" kaşık");bind(sT,v=>t=v,v=>v+" °C");
  seg(col,Object.entries(RENK).map(([k,v])=>[k,v[0]]),"beyaz",k=>{rk=k;calc()});
  const [bW,bX]=ctrl.querySelectorAll("button");
  bW.onclick=()=>{row++;tb.hidden=false;tb.querySelector("tbody").insertAdjacentHTML("afterbegin",`<tr><td>${row}</td><td>${d} cm</td><td>${c}</td><td>${t} °C</td><td>${RENK[rk][0]}</td><td><b>${rate}</b></td></tr>`)};
  bX.onclick=()=>{row=0;tb.hidden=true;tb.querySelector("tbody").innerHTML=""};
  calc();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>🍃 Nişasta deneyi: folyo + iyot</h3>`);
  const s2=svgRoot(el,"0 0 360 150","Alacalı yaprakta iyot deneyi");
  const defs=S("defs",null,s2);const cp=S("clipPath",{id:"ic-clip"},defs);
  const inner="M95,75 C130,40 210,38 260,70 C210,104 130,108 95,75 Z";
  S("path",{d:inner},cp);
  const sunE=T(s2,330,30,"☀️",{"font-size":22,"text-anchor":"middle",opacity:0});
  const lf=S("g",null,s2);
  const outer=S("path",{d:"M50,75 C110,10 230,8 310,68 C230,130 110,136 50,75 Z",fill:"#eeeedd",stroke:"var(--ink)","stroke-opacity":.3,"stroke-width":1.5},lf);
  const inn=S("path",{d:inner,fill:"#3f9a4a"},lf);
  const under=S("rect",{x:150,y:20,width:44,height:110,fill:"#c99a3c",opacity:0,"clip-path":"url(#ic-clip)"},lf);
  S("path",{d:"M30,76 L50,75 L306,68",stroke:"var(--ink)","stroke-opacity":.25,"stroke-width":2,fill:"none"},lf);
  const foil=S("rect",{x:146,y:14,width:52,height:122,rx:5,fill:"#b5bcc2",stroke:"#8d959c",opacity:0},s2);
  const shade=S("rect",{x:0,y:0,width:360,height:150,fill:"var(--ink)",opacity:0,class:"tr"},s2);
  const cap2=add(el,`<div class="cap"></div>`);
  const c2=add(el,`<div class="ctrl"><button class="btn">Sonraki adım →</button><button class="btn ghost">Baştan</button></div>`);
  const ADIM=[
    ()=>{outer.setAttribute("fill","#eeeedd");inn.setAttribute("fill","#3f9a4a");under.setAttribute("opacity",0);foil.setAttribute("opacity",0);shade.setAttribute("opacity",0);sunE.setAttribute("opacity",0);
      cap2.innerHTML=`<b>Alacalı yaprak:</b> kenarları beyaz (klorofil yok), ortası yeşil.`},
    ()=>{shade.setAttribute("opacity",.45);cap2.innerHTML=`<b>1. adım:</b> Bitki 1-2 gün karanlıkta. Yapraktaki nişasta harcandı.`},
    ()=>{shade.setAttribute("opacity",0);foil.setAttribute("opacity",1);sunE.setAttribute("opacity",1);cap2.innerHTML=`<b>2. adım:</b> Yaprağın ortasına folyo sarıldı, bitki birkaç saat güneşte.`},
    ()=>{foil.setAttribute("opacity",0);sunE.setAttribute("opacity",0);outer.setAttribute("fill","#f1ead0");inn.setAttribute("fill","#e9e1bf");cap2.innerHTML=`<b>3. adım:</b> Yaprak kaynatıldı, sıcak alkolde klorofili çıkarıldı. Artık soluk ve renksiz.`},
    ()=>{outer.setAttribute("fill","#c99a3c");inn.setAttribute("fill","#3b3f74");under.setAttribute("opacity",1);
      cap2.innerHTML=`<b>4. adım: iyot!</b> Işık alan <b>yeşil</b> kısım mavi-mor oldu → nişasta var. Folyolu kısım (ışık yok) ve beyaz kenarlar (klorofil yok) sarı-kahverengi kaldı. Sonuç: fotosentez için <b>ışık</b> ve <b>klorofil</b> şart 🎉`}];
  let ad=0;ADIM[0]();
  const [n2,r2]=c2.querySelectorAll("button");
  n2.onclick=()=>{if(ad<4){ad++;ADIM[ad]()}n2.disabled=ad>=4};r2.onclick=()=>{ad=0;ADIM[0]();n2.disabled=false};
  return ()=>E.kill();
},

/* 🌋 Kemosentez: hidrotermal baca */
kemo(el){
  const E=Engine();
  el.innerHTML=`<h3>🌊 2500 metre derinlikte</h3>`;
  const s=svgRoot(el,"0 0 360 240","Okyanus dibinde hidrotermal baca, kükürt bakterileri ve tüp solucanları");
  const defs=S("defs",null,s);
  const lg=S("linearGradient",{id:"kemo-bg",x1:0,y1:0,x2:0,y2:1},defs);
  S("stop",{offset:0,style:"stop-color:#4f9cc0"},lg);S("stop",{offset:.28,style:"stop-color:var(--deep1)"},lg);S("stop",{offset:1,style:"stop-color:var(--deep2)"},lg);
  const bm=S("linearGradient",{id:"kemo-beam",x1:0,y1:0,x2:0,y2:1},defs);
  S("stop",{offset:0,"stop-color":"#fff8d0","stop-opacity":.5},bm);S("stop",{offset:1,"stop-color":"#fff8d0","stop-opacity":0},bm);
  S("rect",{x:0,y:0,width:360,height:240,fill:"url(#kemo-bg)"},s);
  [[120,95],[190,160],[260,215]].forEach(([a,b])=>S("polygon",{points:`${a},0 ${a+22},0 ${b+10},70 ${b-14},70`,fill:"url(#kemo-beam)"},s));
  [[8,"0 m"],[62,"200 m · ışığın sonu"],[126,"1000 m"],[186,"2500 m"]].forEach(([y,l])=>{S("line",{x1:0,y1:y,x2:8,y2:y,stroke:"#cfe6ef","stroke-width":1.5},s);T(s,12,y+4,l,{class:"lb on-dark","font-size":9})});
  S("path",{d:"M0,226 C60,214 110,230 160,222 C200,216 240,232 300,222 C330,218 350,226 360,224 L360,240 L0,240 Z",fill:"#3b3531"},s);
  const plume=S("g",null,s);
  S("polygon",{points:"176,232 210,232 200,168 187,168",fill:"var(--charcoal)"},s);
  S("polygon",{points:"268,234 292,234 285,200 276,200",fill:"var(--charcoal)",opacity:.85},s);
  const bak=S("g",null,s);
  const BP=[[168,226],[180,214],[214,222],[206,206],[196,190],[184,198],[226,230],[160,232],[272,226],[290,222],[262,232],[218,214]];
  const bEls=BP.map(([x,y],i)=>{const e=S("ellipse",{cx:x,cy:y,rx:4.5,ry:2.4,fill:"#8ef0a8",class:"glow",transform:`rotate(${i*37} ${x} ${y})`},bak);e.style.animationDelay=(i*.15)+"s";return e});
  const worms=[[140,186],[150,180],[128,194],[234,184],[244,190],[316,196]].map(([x,top],i)=>{
    const g=S("g",{class:"sway"},s);g.style.animationDelay=(-i*.4)+"s";
    S("rect",{x:x-3,y:top,width:6,height:232-top,rx:3,fill:"#e9e4d8"},g);
    const p=S("ellipse",{cx:x,cy:top-6,rx:6,ry:9,fill:"#e0453a"},g);g._p=p;return g});
  T(s,355,150,"tüp solucanları",{class:"lb on-dark","text-anchor":"end","font-size":9});
  T(s,214,160,"baca",{class:"lb on-dark","font-size":9});
  T(s,124,214,"kükürt bakterileri →",{class:"lb on-dark","text-anchor":"end","font-size":9});
  const crab=T(s,0,236,"🦀",{"font-size":15,"text-anchor":"middle"});
  const cap=add(el,`<div class="cap"></div>`);
  const st=add(el,`<div class="stat"><span>Bakterilerin ürettiği besin: <b>0</b></span><span>Işık: <b>yok</b></span></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">⛔ Bacayı kapat</button></div>`);
  const bV=ctrl.querySelector("button");
  let on=true,food=0,cx=150,dir=1;
  const write=()=>{cap.innerHTML=on?`Bacadan sıcak, <b>hidrojen sülfürlü</b> su çıkıyor. Kükürt bakterileri bu inorganik maddeyi oksitleyip enerji alıyor ve CO₂'den besin yapıyor: <b>kemosentez</b>. Tüp solucanları ve yengeçler bu besinle yaşıyor. Burada güneş ışığı hiç yok!`
    :`Baca sustu: inorganik "yakıt" bitti. Bakteriler besin üretemiyor, üretici olmayınca tüp solucanları ve yengeçler de aç kalıyor. Bu ekosistemin temeli <b>kemosentez</b>.`};
  bV.onclick=()=>{on=!on;bV.textContent=on?"⛔ Bacayı kapat":"🌋 Bacayı aç";
    bEls.forEach(e=>{e.classList.toggle("glow",on);e.setAttribute("opacity",on?1:.15)});
    worms.forEach(w=>{w.classList.toggle("paused",!on);w._p.setAttribute("fill",on?"#e0453a":"#8a7d78")});write()};
  E.every(()=>on?110:0,()=>{const h=Math.random()<.18;const g=S("g",null,plume);
    S("circle",{r:rand(2,4.5),fill:h?"#d9c95b":"#8f8f86"},g);if(h)T(g,6,3,"H₂S",{"font-size":7,fill:"#f3e9a0"});
    E.fly(g,{x0:193+rand(-4,4),y0:168,x1:193+rand(-45,45),y1:rand(70,110),cx:193+rand(-12,12),cy:130,dur:2400,ease:lin,op:k=>.85*(1-k)})});
  E.every(()=>on?700:0,()=>{food++;st.querySelector("b").textContent=food});
  E.tick(dt=>{cx+=dir*dt*(on?.025:.008);if(cx>300)dir=-1;if(cx<110)dir=1;crab.setAttribute("x",cx.toFixed(1))});
  write();
  return ()=>E.kill();
},

/* 🦷 Sindirim çeşitleri: amip + hayvanlar + oyun */
sindirim(el){
  const E=Engine();
  el.innerHTML=`<h3>🦠 Amipte hücre içi sindirim</h3>`;
  const s=svgRoot(el,"0 0 360 170","Amip besini yalancı ayaklarla alıp besin kofulunda sindiriyor");
  S("path",{d:"M90,85 C88,42 150,30 192,44 C234,58 246,100 214,126 C182,152 112,144 95,116 C90,108 90,96 90,85 Z",fill:"var(--berry-soft)",stroke:"var(--berry)","stroke-width":2.5},s);
  S("circle",{cx:135,cy:78,r:15,fill:"var(--berry)",opacity:.35},s);T(s,135,104,"çekirdek",{"text-anchor":"middle",class:"lb"});
  const pod=d=>{const p=S("path",{d,fill:"var(--berry-soft)",stroke:"var(--berry)","stroke-width":2.5,class:"tr"},s);p.style.transformBox="fill-box";p.style.transformOrigin="0% 50%";return p};
  const pt=pod("M212,52 C250,24 314,36 334,72 C306,58 256,56 222,74 Z"),pb=pod("M212,118 C250,146 314,134 334,98 C306,112 256,114 222,96 Z");
  const vac=S("circle",{cx:190,cy:85,r:18,fill:"none",stroke:"var(--berry)","stroke-width":2,"stroke-dasharray":"4 3",class:"tr"},s);
  const lys=S("circle",{cx:125,cy:120,r:7,fill:"var(--plum)",class:"tr"},s);
  const mols=[...Array(7)].map(()=>{const c=S("circle",{cx:190,cy:85,r:2.6,fill:"var(--leaf)",class:"tr"},s);c._o=[rand(-90,10),rand(-40,45)];return c});
  const res=S("circle",{cx:190,cy:85,r:5,fill:"var(--muted)",class:"tr"},s);
  const fd=S("g",{class:"tr"},s);S("circle",{cx:305,cy:85,r:11,fill:"var(--leaf)"},fd);S("circle",{cx:301,cy:81,r:3,fill:"var(--surface)",opacity:.6},fd);
  fd.style.transformBox="fill-box";fd.style.transformOrigin="center";
  const fl=T(s,305,110,"besin",{"text-anchor":"middle",class:"lb"});
  const cap=add(el,`<div class="cap"></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">▶ Oynat</button><button class="btn ghost">Sonraki adım</button></div>`);
  const CAP=[`Amip, yakınındaki besini (bir alg) fark ediyor.`,`<b>Yalancı ayaklar</b> besini sarıyor: hücre içine alma (<b>endositoz</b>).`,`Besin hücrenin içinde, zardan bir kesecikte: <b>besin kofulu</b>.`,`<b>Lizozom</b> kofulla kaynaşıp enzimlerini boşaltıyor: artık bir <b>sindirim kofulu</b>.`,`Küçük moleküller <b>sitoplazmaya</b> geçti; sindirilemeyen artık hücre dışına atıldı. Hücre içi sindirim tamam 🎉`];
  let k=0,auto=false;
  function ap(){
    pt.style.opacity=pb.style.opacity=k===1?"1":"0";pt.style.transform=pb.style.transform=k===1?"scaleX(1)":"scaleX(.2)";
    fd.style.transform=k<2?"":k<4?"translate(-115px,0)":"translate(-115px,0) scale(.4)";fl.style.opacity=k===0?1:0;
    vac.style.opacity=k>=2?(k===4?.5:1):0;vac.setAttribute("fill",k>=3?"var(--plum-soft)":"none");
    lys.style.transform=k>=3?"translate(65px,-35px)":"";lys.style.opacity=k>=3?0:1;
    mols.forEach(m=>{m.style.transform=k===4?`translate(${m._o[0]}px,${m._o[1]}px)`:"";m.style.opacity=k===4?1:0});
    res.style.transform=k===4?"translate(-140px,58px)":"";res.style.opacity=k===4?.85:0;
    cap.innerHTML=`<b>${k+1}/5</b> · ${CAP[k]}`;
  }
  const [bP,bN]=ctrl.querySelectorAll("button");
  bP.onclick=()=>{auto=!auto;bP.textContent=auto?"⏸ Durdur":"▶ Oynat"};
  bN.onclick=()=>{k=(k+1)%5;ap()};
  E.every(()=>auto?1900:0,()=>{k=(k+1)%5;ap()});
  ap();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>🔍 Dört canlı, dört tasarım</h3>`);
  const tabs=add(el,`<div class="seg"></div>`);
  const s2=svgRoot(el,"0 0 360 150","Seçilen canlının dişleri, midesi ve bağırsak uzunluğu");
  const cap2=add(el,`<div class="cap"></div>`);
  const H={
    kus:{ad:"🐦 Kuş",dis:"beak",mide:["Kursak","Bezli mide","Taşlık"],bag:.22,bagT:"kısa",tip:"Tohum ve böcekle beslenir",acik:`<b>Diş yok.</b> Besin kursakta depolanıp yumuşar, bezli midede enzimlerle karışır, kaslı <b>taşlıkta</b> yutulan taşlarla öğütülür. Uçmak için hafif olmalı: bağırsak kısa.`},
    kurt:{ad:"🐺 Kurt",dis:"iiiCppp",mide:["Mide"],bag:.3,bagT:"kısa",tip:"Etçil",acik:`Uzun, sivri <b>köpek dişleri</b> avı tutup yırtar; azılar da keskin. Mide tek bölmeli ve basit. Et kolay sindirildiği için bağırsak <b>kısa</b>.`},
    inek:{ad:"🐄 İnek",dis:"gggmmmm",mide:["İşkembe","Börkenek","Kırkbayır","Şirden"],bag:1,bagT:"çok uzun",tip:"Otçul, geviş getirir",acik:`Üst çenede kesici ve köpek dişi yok; geniş <b>düz azılar</b> otu öğütür. <b>4 bölmeli mide</b>: işkembedeki mikroorganizmalar selülozu sindirir, börkenekten besin ağza döner (<b>geviş</b>). Selüloz zor sindirildiği için bağırsak <b>çok uzun</b>.`},
    insan:{ad:"🧑 İnsan",dis:"iicnnn",mide:["Mide"],bag:.5,bagT:"orta",tip:"Hepçil",acik:`Kesici, köpek ve azı dişleri <b>dengeli</b>: hem et hem bitki yiyebiliriz. Mide tek bölmeli, bağırsak <b>orta</b> uzunlukta.`}};
  function ciz(id){
    const h=H[id];s2.innerHTML="";let n=0;const pi=e=>{e.classList.add("pop-in");e.style.animationDelay=(n++*70)+"ms";return e};
    T(s2,64,16,"Dişler",{"text-anchor":"middle",class:"lb"});T(s2,250,16,"Mide",{"text-anchor":"middle",class:"lb"});
    if(h.dis==="beak"){pi(S("polygon",{points:"16,46 116,60 16,78",fill:"var(--sun)"},s2));S("circle",{cx:34,cy:54,r:2.5,fill:"var(--ink)",opacity:.6},s2);T(s2,64,96,"gaga, diş yok",{"text-anchor":"middle",class:"lb"})}
    else{const gT=S("g",{transform:"translate(-10,-14) scale(1.2)"},s2);S("rect",{x:10,y:40,width:112,height:16,rx:7,fill:"var(--berry-soft)"},gT);let x=14;
      for(const ch of h.dis){
        if(ch==="i"){pi(S("rect",{x,y:56,width:9,height:17,rx:2.5,fill:"var(--surface)",stroke:"var(--muted)"},gT));x+=11}
        else if(ch==="C"||ch==="c"){const hh=ch==="C"?32:20;pi(S("polygon",{points:`${x},56 ${x+12},56 ${x+6},${56+hh}`,fill:"var(--surface)",stroke:"var(--muted)"},gT));x+=14}
        else if(ch==="p"){pi(S("polygon",{points:`${x},56 ${x+15},56 ${x+15},66 ${x+11},76 ${x+7.5},66 ${x+4},76 ${x},66`,fill:"var(--surface)",stroke:"var(--muted)"},gT));x+=17}
        else if(ch==="m"){pi(S("rect",{x,y:56,width:15,height:14,rx:2,fill:"var(--surface)",stroke:"var(--muted)"},gT));x+=17}
        else if(ch==="n"){pi(S("path",{d:`M${x},56 h15 v11 q-2,5 -4,0 q-2,5 -3.5,0 q-2,5 -3.5,0 q-2,5 -4,0 z`,fill:"var(--surface)",stroke:"var(--muted)"},gT));x+=17}
        else if(ch==="g"){S("rect",{x,y:56,width:10,height:14,rx:2,fill:"none",stroke:"var(--muted)","stroke-dasharray":"2 2"},gT);x+=12}}
      T(s2,64,104,h.dis.includes("g")?"köpek dişi yok":h.dis.includes("C")?"uzun köpek dişleri":"her çeşit diş",{"text-anchor":"middle",class:"lb"})}
    const m=h.mide.length,gap=12,cols=m>3?2:m,w=(200-gap*(cols-1))/cols,hh=m>3?26:52;
    h.mide.forEach((ad,i)=>{const x=150+(i%cols)*(w+gap),y=m>3?28+Math.floor(i/cols)*36:34;const g=pi(S("g",null,s2));
      S("rect",{x,y,width:w,height:hh,rx:12,fill:"var(--c-soft)",stroke:"var(--berry)","stroke-width":2},g);
      T(g,x+w/2,y+hh/2+4,ad,{"text-anchor":"middle","font-size":10.5});
      if(i%cols<cols-1)T(s2,x+w+gap/2,y+hh/2+4,"›",{"text-anchor":"middle","font-size":13})});
    if(id==="inek")T(s2,250,104,"börkenek → ağız → kırkbayır: geviş",{"text-anchor":"middle",class:"lb","font-size":8.5});
    T(s2,10,128,"Bağırsak",{class:"lb"});
    S("rect",{x:62,y:118,width:286,height:14,rx:7,fill:"var(--surface)",stroke:"var(--line)"},s2);
    const bar=S("rect",{x:62,y:118,width:286,height:14,rx:7,fill:"var(--berry)",class:"tr"},s2);bar.style.transformBox="fill-box";bar.style.transformOrigin="0 50%";bar.style.transform="scaleX(0)";
    T(s2,348,146,h.bagT,{"text-anchor":"end",class:"lb"});
    requestAnimationFrame(()=>requestAnimationFrame(()=>bar.style.transform=`scaleX(${h.bag})`));
    cap2.innerHTML=`<b>${h.ad} · ${h.tip}.</b> ${h.acik}`;
  }
  seg(tabs,Object.entries(H).map(([k,v])=>[k,v.ad]),"kurt",ciz);ciz("kurt");

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>🎯 Kimin özelliği?</h3>`);
  const OZ=[["Yuttuğu taşlarla besinini taşlıkta öğütür","kus"],["Besinini kursağında depolayıp yumuşatır","kus"],["Hiç dişi yoktur","kus"],
    ["Uzun ve sivri köpek dişleriyle avını yırtar","kurt"],["Midesi tek bölmeli, bağırsağı kısa; yalnızca et yer","kurt"],["Azı dişleri keskin ve yırtıcıdır","kurt"],
    ["Midesi 4 bölmelidir","inek"],["Geviş getirir","inek"],["Selülozu midesindeki mikroorganizmalar sayesinde sindirir","inek"],["Üst çenesinde kesici diş yoktur","inek"],
    ["Kesici, köpek ve azı dişleri dengelidir","insan"],["Hem bitkisel hem hayvansal besinle beslenir; bağırsağı orta uzunlukta","insan"]];
  const gm=add(el,`<div class="game"><p class="gq"></p><div class="gb"></div><p class="small gs"></p></div>`);
  let sira=[],dog=0,top=0,seri=0;
  function soru(){if(!sira.length)sira=OZ.slice().sort(()=>Math.random()-.5);const [q,a]=sira.pop();
    gm.querySelector(".gq").textContent=`"${q}"`;
    const gb=gm.querySelector(".gb");gb.innerHTML=Object.entries(H).map(([k,v])=>`<button class="opt" data-k="${k}"><span class="k">${v.ad.split(" ")[0]}</span>${v.ad.split(" ")[1]}</button>`).join("");
    gb.onclick=e=>{const b=e.target.closest("button");if(!b||gb.dataset.lock)return;gb.dataset.lock=1;top++;
      const ok=b.dataset.k===a;if(ok){dog++;seri++}else seri=0;
      b.classList.add(ok?"ok":"no");if(!ok)gb.querySelector(`[data-k="${a}"]`).classList.add("ok");
      gm.querySelector(".gs").textContent=`${ok?"Doğru! ":"Bu özellik "+{kus:"kuşa",kurt:"kurda",inek:"ineğe",insan:"insana"}[a]+" ait. "}Skor: ${dog}/${top} · Seri: ${seri}${seri>=5?" 🔥":""}`;
      E.later(()=>{delete gb.dataset.lock;soru()},1300)}}
  gm.querySelector(".gs").textContent="Özelliği oku, sahibine dokun.";soru();
  return ()=>E.kill();
},

/* 🍽️ İnsanda sindirim: lokma yolculuğu + villus */
insan(el){
  const E=Engine();
  el.innerHTML=`<h3>🚇 Bir lokmanın yolculuğu</h3>`;
  const s=svgRoot(el,"0 0 240 290","Sindirim kanalı: ağız, yemek borusu, mide, ince bağırsak, kalın bağırsak");
  s.style.maxWidth="330px";s.style.margin="0 auto";
  S("circle",{cx:120,cy:30,r:24,fill:"var(--surface)",stroke:"var(--line)","stroke-width":2},s);
  S("rect",{x:108,y:50,width:24,height:16,fill:"var(--surface)",stroke:"var(--line)","stroke-width":2},s);
  S("rect",{x:52,y:62,width:136,height:222,rx:56,fill:"var(--surface)",stroke:"var(--line)","stroke-width":2},s);
  S("path",{d:"M110,38 Q120,46 130,38",stroke:"var(--berry)","stroke-width":2.5,fill:"none","stroke-linecap":"round"},s);
  S("path",{d:"M62,94 C62,80 112,78 118,96 C120,110 102,120 80,118 C68,116 62,106 62,94 Z",fill:"var(--sun-soft)",stroke:"var(--sun)","stroke-width":1.5},s);
  T(s,84,104,"karaciğer",{"text-anchor":"middle",class:"lb","font-size":8});
  S("ellipse",{cx:104,cy:130,rx:14,ry:4.5,fill:"var(--berry-soft)",stroke:"var(--berry)"},s);T(s,104,124,"pankreas",{"text-anchor":"middle",class:"lb","font-size":7.5});
  const SEG=[
    ["Yemek borusu","M120,40 L120,92","var(--teal)",8],
    ["Mide","M120,92 C120,80 160,78 166,100 C171,120 150,134 132,128","var(--coral)",17],
    ["İnce bağırsak","M132,128 C112,128 96,140 104,150 C112,160 150,152 152,164 C154,176 100,170 98,182 C96,194 148,192 150,204 C152,216 104,214 108,226 C110,234 140,236 150,234","var(--berry)",7],
    ["Kalın bağırsak","M150,234 L170,234 C176,234 178,228 178,222 L178,146 C178,140 174,138 168,138 L74,138 C68,138 66,142 66,148 L66,240 C66,256 90,262 120,262 L120,276","var(--sun)",11]];
  const segEl=SEG.map(([ad,d,c,w])=>S("path",{d,stroke:c,"stroke-width":w,fill:"none","stroke-linecap":"round","stroke-linejoin":"round",opacity:.45},s));
  segEl.unshift(segEl.splice(3,1)[0]);s.insertBefore(segEl[0],segEl[1]);segEl.push(segEl.shift());
  const len=segEl.map(p=>p.getTotalLength()),cum=[0];len.forEach((l,i)=>cum.push(cum[i]+l));
  const at=L=>{let i=0;while(i<3&&L>cum[i+1])i++;return segEl[i].getPointAtLength(Math.max(0,L-cum[i]))};
  const STOP=[0,len[0]*.7,cum[1]+len[1]*.55,cum[2]+len[2]*.5,cum[4]-4];
  const lok=S("g",null,s);
  const nK=S("circle",{cx:-3,cy:-2,r:5.5,fill:"var(--sun)",class:"tr"},lok),nP=S("circle",{cx:4,cy:-1,r:5,fill:"var(--coral)",class:"tr"},lok),nY=S("circle",{cx:0,cy:5,r:4.5,fill:"var(--plum)",class:"tr"},lok);
  const posa=S("circle",{r:3.5,fill:"var(--muted)",opacity:0},lok);
  [nK,nP,nY].forEach(c=>{c.style.transformBox="fill-box";c.style.transformOrigin="center"});
  const cap=add(el,`<div class="cap"></div>`);
  const tb=add(el,`<div class="tbl fit"><table><tr><th>Besin</th><th>Durum</th></tr><tr><td>🍞 Karbonhidrat</td><td>bekliyor</td></tr><tr><td>🧀 Protein</td><td>bekliyor</td></tr><tr><td>🧈 Yağ</td><td>bekliyor</td></tr></table></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">▶ Lokmayı yolla</button><button class="btn ghost">Sonraki durak</button><button class="btn ghost">Baştan</button></div>`);
  const [bA,bN,bR]=ctrl.querySelectorAll("button");
  const INFO=[
    `<b>Ağız:</b> dişler parçalar, dil karıştırır (<b>mekanik</b>). Tükürükle <b>karbonhidrat</b> sindirimi başlar.`,
    `<b>Yemek borusu:</b> burada sindirim <b>yok</b>! Besin dalga gibi kasılmalarla (<b>peristaltik hareket</b>) mideye iner.`,
    `<b>Mide:</b> kaslı duvar besini çalkalar (mekanik). Asidik ortamda <b>protein</b> sindirimi başlar.`,
    `<b>İnce bağırsak:</b> safra yağı damlacıklara ayırır, pankreastan enzimler gelir. Karbonhidrat, protein ve <b>yağ</b> sindirimi burada <b>biter</b>; yapı taşları villuslardan kana <b>emilir</b>.`,
    `<b>Kalın bağırsak:</b> enzim salgılanmaz. Su ve mineraller emilir, bakteriler K ve B vitamini üretir. Geriye kalan posa dışarı atılır.`];
  const durum=(i,v)=>{tb.querySelectorAll("tr")[i+1].children[1].innerHTML=v};
  let pos=0,hedef=0,stop=0,auto=false,moving=false;
  function yerles(){const p=at(pos);lok.setAttribute("transform",`translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`)}
  function var_(i){
    stop=i;moving=false;cap.innerHTML=INFO[i];segEl.forEach((p,j)=>p.setAttribute("opacity",j===i-1||(i===1&&j===0)?1:.45));
    if(i===0){durum(0,"<b>başladı</b> (ağız)")}
    if(i===2){durum(1,"<b>başladı</b> (mide)");nK.style.transform="scale(.8)"}
    if(i===3){[nK,nP,nY].forEach(c=>{c.style.transform="scale(0)"});posa.setAttribute("opacity",1);
      durum(0,"bitti → <b>glikoz</b>, emildi ✓");durum(1,"bitti → <b>amino asit</b>, emildi ✓");durum(2,"bitti → <b>yağ asidi + gliserol</b>, emildi ✓");
      const p=at(pos);for(let j=0;j<8;j++){const d=S("circle",{r:2.2,fill:pick(["var(--sun)","var(--coral)","var(--plum)"])},s);E.fly(d,{x0:p.x,y0:p.y,x1:p.x+rand(-60,60),y1:p.y+rand(-40,30),dur:900,op:k=>1-k})}}
    if(i===4){posa.setAttribute("fill","#8a6a48");bA.disabled=bN.disabled=true}
    if(auto&&i<4)E.later(()=>git(),1700);
  }
  function git(){if(moving||stop>=4)return;hedef=STOP[stop+1];moving=true;segEl.forEach(p=>p.setAttribute("opacity",.45))}
  E.tick(dt=>{if(!moving)return;pos=Math.min(hedef,pos+dt*.075);yerles();if(pos>=hedef)var_(STOP.indexOf(hedef))});
  function reset(){E.clear();auto=false;moving=false;pos=0;stop=0;[nK,nP,nY].forEach(c=>c.style.transform="");posa.setAttribute("opacity",0);posa.setAttribute("fill","var(--muted)");
    [0,1,2].forEach(i=>durum(i,"bekliyor"));bA.disabled=bN.disabled=false;yerles();var_(0)}
  bA.onclick=()=>{auto=true;git()};bN.onclick=()=>{auto=false;git()};bR.onclick=reset;
  reset();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>🖐️ Villuslar: emilim yüzeyi</h3>`);
  const s2=svgRoot(el,"0 0 360 182","İnce bağırsak duvarındaki villuslar besinleri emip kılcal damara geçiriyor");
  T(s2,8,14,"bağırsak boşluğu",{class:"lb"});
  const vil=S("g",null,s2);const VX=[30,90,150,210,270,330];
  const vEls=VX.map(x=>{const g=S("g",{class:"tr"},vil);g.style.transformBox="fill-box";g.style.transformOrigin="50% 100%";
    S("path",{d:`M${x-17},132 L${x-17},62 Q${x-17},45 ${x},45 Q${x+17},45 ${x+17},62 L${x+17},132 Z`,fill:"var(--teal-soft)",stroke:"var(--teal)","stroke-width":2},g);
    S("path",{d:`M${x-6},132 L${x-6},62 Q${x},52 ${x+6},62 L${x+6},132`,stroke:"var(--coral)","stroke-width":2,fill:"none"},g);
    for(let i=0;i<5;i++)S("line",{x1:x-12+i*6,y1:46+(i%2),x2:x-12+i*6,y2:41+(i%2),stroke:"var(--teal)","stroke-width":1.5},g);return g});
  S("rect",{x:0,y:130,width:360,height:12,fill:"var(--teal-soft)"},s2);
  S("rect",{x:0,y:146,width:360,height:16,rx:8,fill:"var(--coral-soft)",stroke:"var(--coral)","stroke-width":1.5},s2);
  T(s2,180,178,"kılcal damar → bütün hücrelere (metro hattı 🚇)",{"text-anchor":"middle",class:"lb"});
  const cap2=add(el,`<div class="cap">Glikoz 🟡, amino asit 🔴 ve yağ asidi 🟣 bağırsak boşluğunda. Villuslar onları yakalayıp kana geçiriyor.</div>`);
  const st=add(el,`<div class="stat"><span>Emilen: <b>0</b></span><span>Emilemeden geçen: <b>0</b></span><span>Emilim: <b>–</b></span></div>`);
  const c2=add(el,`<div class="ctrl"><button class="btn">Villusları düzleştir</button></div>`);
  let duz=false,em=0,kac=0;
  const sb=st.querySelectorAll("b");const yaz=()=>{sb[0].textContent=em;sb[1].textContent=kac;sb[2].textContent=em+kac?Math.round(em/(em+kac)*100)+"%":"–"};
  c2.querySelector("button").onclick=e=>{duz=!duz;e.target.textContent=duz?"Villusları geri getir":"Villusları düzleştir";em=kac=0;yaz();
    vEls.forEach(g=>g.style.transform=duz?"scaleY(.2)":"");
    cap2.innerHTML=duz?`Villuslar olmasaydı yüzey çok küçük olurdu: besinlerin çoğu <b>emilemeden</b> geçip gider.`:`Kıvrımlar, villuslar ve mikrovilluslar yüzeyi katlanarak büyütüyor: emilim <b>çok daha fazla</b>.`};
  E.every(330,()=>{const x=rand(8,352),f=pick(["var(--sun)","var(--coral)","var(--plum)"]);const m=S("circle",{r:3.4,fill:f},s2);
    if(Math.random()<(duz?.3:.9)){const vx=VX.reduce((a,b)=>Math.abs(b-x)<Math.abs(a-x)?b:a);const top=duz?118:50;
      E.fly(m,{x0:x,y0:-6,x1:vx+rand(-4,4),y1:top+4,dur:1100,legs:[{x1:vx,y1:152,dur:700,ease:lin},{x1:372,y1:154,dur:(372-vx)*6+300,ease:lin}],done(){em++;yaz()}})}
    else E.fly(m,{x0:x,y0:-6,x1:Math.min(380,x+rand(40,120)),y1:rand(20,40),dur:900,legs:[{x1:380,y1:rand(10,40),dur:1200,ease:lin}],done(){kac++;yaz()}})});
  return ()=>E.kill();
},

/* 🔥 Hücresel solunum: karbon sayacıyla 4 aşama */
solunum(el){
  const E=Engine();
  el.innerHTML=`<h3>🔥 Bir glikozun yolculuğu</h3>`;
  const s=svgRoot(el,"0 0 360 244","Hücre: sitoplazmada glikoliz, mitokondride pirüvat oksidasyonu, Krebs döngüsü ve ETS");
  S("rect",{x:4,y:4,width:352,height:236,rx:22,fill:"none",stroke:"var(--line)","stroke-width":2,"stroke-dasharray":"6 4"},s);
  T(s,16,22,"Sitoplazma",{class:"lb"});
  const zG=S("rect",{x:14,y:34,width:116,height:130,rx:16,fill:"var(--sun-soft)",opacity:0,class:"tr"},s);
  T(s,72,182,"glikoliz",{"text-anchor":"middle",class:"lb"});
  S("ellipse",{cx:248,cy:124,rx:104,ry:94,fill:"var(--coral-soft)",stroke:"var(--coral)","stroke-width":2.5},s);
  const zM=S("ellipse",{cx:248,cy:124,rx:91,ry:80,fill:"var(--surface)",stroke:"var(--coral)","stroke-width":1.5,class:"tr"},s);
  ["M190,186 q6,-12 0,-22","M214,198 q6,-14 0,-26","M282,198 q6,-14 0,-26","M306,186 q6,-12 0,-22","M200,62 q6,12 0,22","M296,62 q6,12 0,22"].forEach(d=>S("path",{d,stroke:"var(--coral)","stroke-width":1.5,fill:"none"},s));
  T(s,248,60,"matriks",{"text-anchor":"middle",class:"lb"});T(s,248,236,"mitokondri",{"text-anchor":"middle",class:"lb"});
  const kr=S("g",{class:"spin paused"},s);kr.style.animationDuration="4s";
  S("circle",{cx:262,cy:112,r:37,fill:"none"},kr);
  S("circle",{cx:262,cy:112,r:30,fill:"none",stroke:"var(--coral)","stroke-width":2,"stroke-dasharray":"7 5"},kr);
  S("polygon",{points:"262,77 270,82 262,87",fill:"var(--coral)"},kr);
  const kT=T(s,262,116,"Krebs",{"text-anchor":"middle",class:"lb",opacity:.4});
  const ets=S("g",{opacity:.35,class:"tr"},s);
  for(let i=0;i<5;i++)S("rect",{x:206+i*18,y:180,width:14,height:12,rx:3,fill:"var(--plum)"},ets);
  T(ets,248,208,"ETS · iç zar",{"text-anchor":"middle",class:"lb"});
  const ring=[270,330,30,90].map(a=>{const b=ball(s,"var(--plum)");const r=a*Math.PI/180;tf(b,262+30*Math.cos(r),112+30*Math.sin(r));b.style.opacity=0;return b});
  const C=[...Array(6)].map(()=>ball(s,"var(--sun)"));
  const P0=i=>[30+i*16,96];
  const cap=add(el,`<div class="cap"></div>`);
  const st=add(el,`<div class="stat"></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">Sonraki aşama →</button><button class="btn ghost">Baştan</button></div>`);
  const o2s=add(el,`<div class="seg"></div>`);
  const [bN,bR]=ctrl.querySelectorAll("button");
  const AD=["ATP","NADH","FADH₂","CO₂","O₂ kullanılan","H₂O"];let V,stage,o2=true;
  const sv=()=>{st.innerHTML=AD.map(a=>`<span data-k="${a}">${a}: <b>${V[a]}</b></span>`).join("")};
  const inc=(k,n)=>{V[k]+=n;const sp=st.querySelector(`[data-k="${k}"]`);sp.querySelector("b").textContent=V[k];bump(sp)};
  function token(txt,fill,x,y,k,n,delay){E.later(()=>{const t=tok(s,txt,fill);E.fly(t,{x0:x,y0:y,x1:338,y1:14,cy:y-30,dur:800,done(){inc(k,n)}})},delay||0)}
  function co2(b,delay){E.later(()=>{b._c.setAttribute("fill","var(--muted)");b._t.textContent="CO₂";b._t.setAttribute("font-size",6);
    E.later(()=>{b.style.transform=`translate(${370}px,${rand(-30,10)}px)`;b.style.opacity=0;inc("CO₂",1)},450)},delay||0)}
  const lock=ms=>{bN.disabled=true;E.later(()=>{bN.disabled=stage>=4||stage===99},ms)};
  const CAP=[
    `<b>Başlangıç:</b> sitoplazmada 1 glikoz. 6 sarı top = 6 karbon. Sonraki aşamaya bas.`,
    `<b>1 · Glikoliz</b> (sitoplazma, O₂ gerekmez): glikoz (6C) ikiye bölündü → <b>2 pirüvat (3C)</b>. 2 ATP harcandı, 4 ATP üretildi: <b>net 2 ATP</b> ve 2 NADH.`,
    `<b>2 · Pirüvatın oksidasyonu</b> (matriks): her pirüvat 1 karbonunu <b>CO₂</b> olarak verdi → 2 asetil CoA (2C). 2 NADH daha.`,
    `<b>3 · Krebs döngüsü</b> (matriks): her 2C, döngüdeki 4C ile birleşip 6C oldu, 2 CO₂ verip yine 4C'ye döndü. 2 turda: <b>4 CO₂</b>, 2 ATP, 6 NADH, 2 FADH₂. Glikozun 6 karbonu da gitti!`,
    `<b>4 · ETS</b> (iç zar): NADH ve FADH₂ elektronlarını bıraktı. Son alıcı <b>O₂</b>, H⁺ ile birleşip <b>su</b> oldu. ATP'nin <b>büyük kısmı</b> burada üretildi. Toplam: çoğu kitaba göre <b>38 ATP</b> 🎉`];
  function reset(){E.clear();stage=0;V=Object.fromEntries(AD.map(a=>[a,0]));sv();
    C.forEach((b,i)=>{b._c.setAttribute("fill","var(--sun)");b._t.textContent="C";b._t.removeAttribute("font-size");b.style.opacity=1;const[x,y]=P0(i);tf(b,x,y)});
    ring.forEach(b=>b.style.opacity=0);zG.setAttribute("opacity",0);kr.classList.add("paused");kT.setAttribute("opacity",.4);ets.setAttribute("opacity",.35);ets.classList.remove("glow");
    bN.disabled=false;cap.innerHTML=CAP[0]}
  function next(){
    if(stage===0){stage=1;zG.setAttribute("opacity",.9);
      C.forEach((b,i)=>{const g=i<3?0:1;tf(b,40+(i%3)*16,g?120:72)});
      token("ATP","var(--sun)",72,96,"ATP",1,700);token("ATP","var(--sun)",72,96,"ATP",1,950);token("NADH","var(--plum)",72,96,"NADH",1,1200);token("NADH","var(--plum)",72,96,"NADH",1,1450);
      cap.innerHTML=CAP[1];lock(1800);return}
    if(stage===1&&!o2){stage=99;C.forEach(b=>b._c.setAttribute("fill","var(--moss)"));zG.setAttribute("opacity",.9);
      cap.innerHTML=`<b>O₂ yok!</b> ETS çalışamaz, ETS durunca Krebs ve pirüvat oksidasyonu da durur. Pirüvatlar sitoplazmada kalıp <b>fermantasyona</b> gider. Hücre glikolizin <b>2 ATP</b>'siyle yetinmek zorunda.`;bN.disabled=true;return}
    if(stage===1){stage=2;zG.setAttribute("opacity",0);
      C.forEach((b,i)=>{const g=i<3?0:1;tf(b,170+(i%3)*16,g?140:92)});
      co2(C[0],1000);co2(C[3],1150);token("NADH","var(--plum)",200,116,"NADH",1,1500);token("NADH","var(--plum)",200,116,"NADH",1,1700);
      cap.innerHTML=CAP[2];lock(2100);return}
    if(stage===2){stage=3;kr.classList.remove("paused");kT.setAttribute("opacity",1);ring.forEach(b=>b.style.opacity=1);
      const tur=(a,b,t0)=>{E.later(()=>{const r1=150*Math.PI/180,r2=210*Math.PI/180;tf(a,262+30*Math.cos(r1),112+30*Math.sin(r1));tf(b,262+30*Math.cos(r2),112+30*Math.sin(r2))},t0);
        co2(a,t0+1100);co2(b,t0+1250);token("ATP","var(--sun)",262,112,"ATP",1,t0+1500);
        [0,1,2].forEach(j=>token("NADH","var(--plum)",262,112,"NADH",1,t0+1650+j*200));token("FADH₂","var(--teal)",262,112,"FADH₂",1,t0+2250)};
      tur(C[1],C[2],0);tur(C[4],C[5],2700);
      cap.innerHTML=CAP[3];lock(5400);return}
    if(stage===3){stage=4;kr.classList.add("paused");ets.setAttribute("opacity",1);ets.classList.add("glow");
      for(let i=0;i<10;i++)E.later(()=>{const t=tok(s,i<8?"NADH":"FADH₂",i<8?"var(--plum)":"var(--teal)");E.fly(t,{x0:262,y0:112,x1:rand(212,286),y1:186,dur:700})},i*120);
      for(let i=0;i<6;i++)E.later(()=>{const o=S("g",null,s);S("circle",{r:4,fill:"var(--water)"},o);T(o,0,-6,"O₂",{"font-size":7,"text-anchor":"middle"});
        E.fly(o,{x0:-6,y0:224,x1:300,y1:192,cy:250,dur:1100,done(){inc("O₂ kullanılan",1);const w=emo(s,"💧",11);E.fly(w,{x0:300,y0:196,x1:330,y1:228,dur:700,done(){inc("H₂O",1)}})}})},300+i*260);
      for(let i=0;i<34;i++)E.later(()=>{const t=tok(s,"ATP","var(--sun)");E.fly(t,{x0:rand(212,290),y0:184,x1:338,y1:14,cx:rand(240,330),cy:120,dur:700,done(){inc("ATP",1)}})},1200+i*70);
      cap.innerHTML=CAP[4];lock(4200);return}
  }
  bN.onclick=next;bR.onclick=reset;
  seg(o2s,[["var","🫁 O₂ var"],["yok","🚫 O₂ yok"]],"var",v=>{o2=v==="var";reset();if(!o2)cap.innerHTML=`<b>O₂ yok</b> modu: glikolizden sonra ne olacak? Sonraki aşamaya bas.`});
  reset();
  return ()=>E.kill();
},

/* 🥚 Besinlerin solunuma giriş kapıları */
besinyol(el){
  const E=Engine();
  el.innerHTML=`<h3>🚪 Hangi besin hangi kapıdan girer?</h3>`;
  const foods=add(el,`<div class="seg"></div>`);
  const s=svgRoot(el,"0 0 360 300","Karbonhidrat, yağ ve proteinlerin hücresel solunuma katılma yolları");
  const E_={e1a:"M180,34 L180,78",e1b:"M180,78 L180,122",e2:"M180,146 L180,174",e3:"M180,198 L180,222",e4:"M206,250 L265,250",
    eG:"M104,78 L180,78",eF:"M300,146 C300,176 262,186 230,186",eA1:"M108,180 C134,176 118,134 135,134",eA2:"M108,186 L130,186",eA3:"M92,198 C100,238 126,250 154,250",eN:"M62,198 L62,250"};
  const pE={};for(const k in E_)pE[k]=S("path",{id:"by-"+k,d:E_[k],class:"ed",fill:"none"},s);
  const N={};const node=(k,x,y,w,txt)=>{const g=S("g",{class:"nd"},s);S("rect",{x:x-w/2,y:y-12,width:w,height:24,rx:12},g);T(g,x,y+4,txt,{"text-anchor":"middle","font-size":10.5});N[k]=g};
  node("glu",180,22,84,"Glikoz");node("pyr",180,134,84,"Pirüvat");node("ace",180,186,100,"Asetil CoA");node("ets",305,250,82,"ETS → ATP");
  node("gly",62,78,84,"Gliserol");node("fa",300,134,96,"Yağ asitleri");node("aa",60,186,96,"Amino asitler");node("nh3",62,262,96,"NH₃ → üre");
  const kg=S("g",{class:"nd"},s);S("circle",{cx:180,cy:250,r:26},kg);T(kg,180,254,"Krebs",{"text-anchor":"middle","font-size":11});N.krebs=kg;
  T(s,188,62,"glikoliz",{class:"lb"});
  T(s,214,214,"ortak yol",{class:"lb"});
  const dots=S("g",null,s);
  const cap=add(el,`<div class="cap">Bir besin seç: hangi kapılardan girdiğini izle.</div>`);
  const F={
    portakal:["🍊 Portakal suyu",["e1a","e1b","e2","e3","e4"],["glu","pyr","ace","krebs","ets"],`<b>Portakal suyu</b> çoğunlukla <b>karbonhidrat</b> (şeker). Glikoz olarak glikolize <b>en baştan</b> girer: hızlı ve ilk tercih edilen enerji.`],
    yag:["🧈 Tereyağı",["eG","e1b","e2","e3","e4","eF"],["gly","fa","pyr","ace","krebs","ets"],`<b>Tereyağı</b> çoğunlukla <b>yağ</b>. Gliserol glikolizin <b>ortasından</b>, yağ asitleri <b>asetil CoA</b> olarak Krebs'e girer. Gram başına en çok enerji (≈9 kcal).`],
    tavuk:["🍗 Tavuk",["eA1","eA2","eA3","eN","e2","e3","e4"],["aa","nh3","pyr","ace","krebs","ets"],`<b>Tavuk</b> çoğunlukla <b>protein</b>. Amino asitlerin amino grubu koparılır: <b>amonyak → üre</b> (azotlu atık!). Karbon iskeleti pirüvat, asetil CoA ya da Krebs ara ürünü olarak girer. Enerji için <b>son tercih</b>.`],
    yumurta:["🥚 Yumurta",["eA1","eA2","eA3","eN","eG","e1b","e2","e3","e4","eF"],["aa","nh3","gly","fa","pyr","ace","krebs","ets"],`<b>Yumurta</b> hem <b>protein</b> hem <b>yağ</b>. Amino asitler (üre atığıyla), gliserol ve yağ asitleri ayrı kapılardan girer, ama hepsi <b>Krebs + ETS</b>'de buluşur.`]};
  function sec(k){const [,ed,nd,txt]=F[k];
    for(const e in pE)pE[e].classList.toggle("on",ed.includes(e));for(const n in N)N[n].classList.toggle("on",nd.includes(n));
    dots.innerHTML="";ed.forEach(e=>[0,.7].forEach(b=>{const c=S("circle",{r:3.6,fill:"var(--c)"},dots);motion(c,"#by-"+e,1.4,b)}));
    cap.innerHTML=txt}
  seg(foods,Object.entries(F).map(([k,v])=>[k,v[0]]),"portakal",sec);sec("portakal");
  return ()=>E.kill();
},

/* 🍞 Fermantasyon: balonlu şişeler + iki tür */
ferm(el){
  const E=Engine();
  el.innerHTML=`<h3>🎈 Balonlu şişe deneyi</h3>`;
  const s=svgRoot(el,"0 0 360 236","Üç şişe: maya, şeker ve su; ağızlarında balon");
  const time=T(s,180,18,"0. dakika",{"text-anchor":"middle",class:"big"});
  const X=[70,180,290],FILL=["var(--berry)","var(--water)","var(--plum)"];
  const B=X.map((cx,i)=>{
    S("rect",{x:cx-34,y:105,width:68,height:100,rx:14,fill:"var(--surface)",stroke:"var(--water)","stroke-width":2},s);
    S("rect",{x:cx-31,y:140,width:62,height:62,rx:11,fill:"var(--moss-soft)"},s);
    S("rect",{x:cx-10,y:82,width:20,height:26,fill:"var(--surface)",stroke:"var(--water)","stroke-width":2},s);
    const bal=S("ellipse",{cx,cy:76,rx:6,ry:7,fill:FILL[i],opacity:.88},s);S("polygon",{points:`${cx-4},84 ${cx+4},84 ${cx},79`,fill:FILL[i]},s);
    T(s,cx,226,"ABC"[i],{"text-anchor":"middle",class:"big"});
    S("rect",{x:cx+38,y:162,width:11,height:40,rx:5,fill:"var(--water-soft)",stroke:"var(--water)"},s);
    const tube=S("rect",{x:cx+39,y:176,width:9,height:25,rx:4,fill:"var(--water-soft)"},s);const tt=T(s,cx+44,156,"",{"text-anchor":"middle",class:"lb","font-size":7.5});
    return{cx,bal,tube,tt,r:6}});
  const leg=add(el,`<div class="small"></div>`);
  const cap=add(el,`<div class="cap">C şişesinin suyunu seç, sonra deneyi başlat.</div>`);
  const ts=add(el,`<div class="seg"></div>`);
  const ctrl=add(el,`<div class="ctrl"><button class="btn">▶ Deneyi başlat (30 dk)</button><button class="btn ghost" disabled>🧪 Kireç suyu testi</button></div>`);
  const [bS,bK]=ctrl.querySelectorAll("button");
  const SIC={soguk:["Soğuk 5 °C",.18],ilik:["Ilık 35 °C",1],sicak:["Kaynar 90 °C",0]};
  let cT="soguk",t=0,run=false,R=[1,.05,.18];
  const lg=()=>{leg.innerHTML=`<b>A:</b> maya + şeker + ılık su · <b>B:</b> maya + ılık su, <b>şeker yok</b> (kontrol) · <b>C:</b> maya + şeker + ${SIC[cT][0].toLowerCase()} su`};
  function reset(){run=false;t=0;time.textContent="0. dakika";B.forEach(b=>{b.r=6;b.bal.setAttribute("rx",6);b.bal.setAttribute("ry",7);b.bal.setAttribute("cy",76);b.tube.setAttribute("fill","var(--water-soft)");b.tt.textContent=""});bS.disabled=false;bK.disabled=true}
  seg(ts,Object.entries(SIC).map(([k,v])=>[k,"C: "+v[0]]),cT,k=>{cT=k;R[2]=SIC[k][1];lg();reset();cap.innerHTML="Hazır. Deneyi başlat."});
  bS.onclick=()=>{reset();run=true;bS.disabled=true;cap.innerHTML="Maya mantarları şekeri <b>oksijensiz</b> ortamda yıkıyor…"};
  bK.onclick=()=>{B.forEach((b,i)=>{const gaz=R[i]>.1;b.tube.setAttribute("fill",gaz?"#e9e6d8":"var(--water-soft)");b.tt.textContent=gaz?"bulanık":"berrak"});
    cap.innerHTML=`Balondaki gaz kireç suyundan geçirildi. <b>Bulanıklaşma = CO₂</b>. Yani balonu şişiren gaz CO₂: <b>etil alkol fermantasyonu</b> oldu.`;bK.disabled=true};
  E.tick(dt=>{if(!run)return;t=Math.min(30,t+dt/8000*30);time.textContent=Math.floor(t)+". dakika";
    B.forEach((b,i)=>{b.r=6+26*(t/30)*R[i];b.bal.setAttribute("rx",b.r.toFixed(1));b.bal.setAttribute("ry",(b.r*1.15+1).toFixed(1));b.bal.setAttribute("cy",(83-b.r*1.15).toFixed(1))});
    if(t>=30){run=false;bK.disabled=false;
      cap.innerHTML=`<b>Sonuç:</b> A şişti (şeker var, ılık). B neredeyse hiç şişmedi: şeker yok, fermantasyon yok (<b>kontrol grubu</b>). C: ${cT==="ilik"?"ılık suda A gibi şişti.":cT==="soguk"?"soğukta enzimler yavaş, az şişti.":"kaynar suda maya öldü, hiç şişmedi."} Şimdi gazı test et.`}});
  E.every(()=>run?140:0,()=>{B.forEach((b,i)=>{if(Math.random()>R[i])return;const d=S("circle",{r:rand(1.5,2.6),fill:"var(--surface)",stroke:"var(--moss)","stroke-width":1},s);
    E.fly(d,{x0:b.cx+rand(-24,24),y0:198,x1:b.cx+rand(-24,24),y1:144,dur:900,ease:lin})})});
  lg();reset();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>⚗️ İki fermantasyon, iki son</h3>`);
  const tabs=add(el,`<div class="seg"></div>`);
  const s2=svgRoot(el,"0 0 360 150","Glikozun fermantasyonla yıkılması");
  const lb=T(s2,180,16,"Glikoz (6C)",{"text-anchor":"middle",class:"big"});
  const l1=T(s2,85,140,"",{"text-anchor":"middle",class:"lb"}),l2=T(s2,275,140,"",{"text-anchor":"middle",class:"lb"});
  const BB=[...Array(6)].map(()=>ball(s2,"var(--sun)"));
  const at1=S("g",{opacity:0,class:"tr"},s2);const a1=tok(at1,"+2 ATP","var(--sun)",48);a1.setAttribute("transform","translate(180,90)");
  const cap2=add(el,`<div class="cap"></div>`);
  const pl=add(el,`<div class="ctrl"><button class="btn">▶ Oynat</button></div>`).querySelector("button");
  let tur="alkol";
  function r2(){E.clear();BB.forEach((b,i)=>{b._c.setAttribute("fill","var(--sun)");b._t.textContent="C";b._t.removeAttribute("font-size");b.style.opacity=1;tf(b,105+i*30,46)});
    at1.setAttribute("opacity",0);l1.textContent=l2.textContent="";lb.textContent="Glikoz (6C)";
    cap2.innerHTML=tur==="alkol"?`<b>Maya mantarı</b> (ekmek hamuru). Oynat'a bas.`:`<b>Laktik asit bakterisi</b> (yoğurt) ya da yorgun kas. Oynat'a bas.`;pl.disabled=false}
  pl.onclick=()=>{r2();pl.disabled=true;
    E.later(()=>{BB.forEach((b,i)=>tf(b,(i<3?55:245)+(i%3)*30,92));lb.textContent="Glikoliz → 2 pirüvat (3C)";at1.setAttribute("opacity",1)},400);
    E.later(()=>{
      if(tur==="alkol"){[BB[0],BB[3]].forEach(b=>{b._c.setAttribute("fill","var(--muted)");b._t.textContent="CO₂";b._t.setAttribute("font-size",6);E.later(()=>{const p=b.style.transform.match(/-?[\d.]+/g);tf(b,+p[0],-20);b.style.opacity=0},400)});
        [1,2,4,5].forEach(i=>BB[i]._c.setAttribute("fill","var(--moss)"));l1.textContent=l2.textContent="etil alkol (2C)";lb.textContent="2 etil alkol + 2 CO₂ + 2 ATP";
        cap2.innerHTML=`Her pirüvat 1 karbonunu <b>CO₂</b> olarak verdi (hamuru kabartan gaz), geriye <b>etil alkol</b> kaldı. ATP'nin hepsi glikolizden: <b>net 2</b>.`}
      else{BB.forEach(b=>b._c.setAttribute("fill","var(--berry)"));l1.textContent=l2.textContent="laktik asit (3C)";lb.textContent="2 laktik asit + 2 ATP";
        cap2.innerHTML=`Pirüvatlar karbon kaybetmeden <b>laktik aside</b> dönüştü. <b>CO₂ çıkmadı!</b> ATP yine glikolizden: <b>net 2</b>.`}
      pl.disabled=false},1900)};
  seg(tabs,[["alkol","🍞 Maya (etil alkol)"],["laktik","🥛 Yoğurt bakterisi (laktik asit)"]],"alkol",v=>{tur=v;r2()});
  r2();
  return ()=>E.kill();
},

/* 🏃‍♀️ Metabolizma: tabak + enerji nereye gidiyor */
metab(el){
  const E=Engine();
  el.innerHTML=`<h3>🍽️ Tabağını doldur</h3>`;
  const YEM=[["🍞","Ekmek (1 dilim)",70],["🥚","Haşlanmış yumurta",75],["🧀","Beyaz peynir (1 dilim)",90],["🫒","Zeytin (5 tane)",40],["🍎","Elma",80],
    ["🍌","Muz",105],["🥛","Ayran (1 bardak)",75],["🍫","Çikolata (30 g)",160],["🍟","Patates kızartması",340],["🥤","Kola (1 kutu)",140]];
  const ch=add(el,`<div class="foods">${YEM.map((y,i)=>`<button class="food" data-i="${i}"><span>${y[0]}</span>${y[1]}<small>${y[2]} kcal</small></button>`).join("")}</div>`);
  const s=svgRoot(el,"0 0 360 140","Tabak");
  S("ellipse",{cx:180,cy:76,rx:150,ry:56,fill:"var(--surface)",stroke:"var(--line)","stroke-width":3},s);
  S("ellipse",{cx:180,cy:76,rx:112,ry:38,fill:"none",stroke:"var(--line)","stroke-width":1.5},s);
  const plate=S("g",null,s);
  const tot=T(s,180,22,"0 kcal",{"text-anchor":"middle",class:"big","font-size":17});
  const out=add(el,`<div class="acts"></div>`);
  add(el,`<p class="small">Değerler yaklaşık; kiloya, yaşa ve porsiyona göre değişir.</p>`);
  const clr=add(el,`<div class="ctrl"><button class="btn ghost">Tabağı boşalt</button></div>`).querySelector("button");
  let kcal=0,n=0;
  const AKT=[["🚶‍♀️","Yürüyüş",4],["🏃‍♀️","Koşu",10],["📚","Ders çalışma",1.5],["😴","Uyku",.9]];
  function yaz(){tot.textContent=kcal+" kcal";
    out.innerHTML=AKT.map(([e,l,r])=>{const dk=Math.round(kcal/r);return `<div class="act"><span>${e}</span><b>${l}</b><i style="--w:${Math.min(100,dk/4)}%"></i><em>${dk>=120?(dk/60).toFixed(1).replace(".",",")+" saat":dk+" dk"}</em></div>`}).join("")}
  ch.onclick=e=>{const b=e.target.closest(".food");if(!b)return;const y=YEM[+b.dataset.i];kcal+=y[2];
    const a=n*2.399,r=Math.min(104,16+n*10);const x=180+Math.cos(a)*r,yy=80+Math.sin(a)*r*.32;n++;
    const g=emo(plate,y[0],30);E.fly(g,{x0:x,y0:-20,x1:x,y1:yy,cx:x,cy:yy-60,dur:500,keep:true,scale:k=>.5+k*.5});yaz();bump(tot)};
  clr.onclick=()=>{kcal=0;n=0;plate.innerHTML="";yaz()};
  yaz();

  add(el,`<div class="divider"></div>`);
  add(el,`<h3>⚡ Enerji nereye gidiyor?</h3>`);
  const s2=svgRoot(el,"0 0 360 210","ATP'den kas, sinir, pompa, yapım ve ısıya enerji akışı");
  const H=[["💪","Kas",62,46,"<b>Kas faaliyeti:</b> yürümek, kalbin atması, nefes almak. Kas kasılması ATP'siz olmaz."],
    ["🧠","Sinir",298,46,"<b>Sinirsel iletim:</b> düşünmek, hissetmek, hatırlamak. Beyin, dinlenirken bile vücudun enerjisinin yaklaşık beşte birini kullanır."],
    ["⛽","Pompa",44,168,"<b>Aktif taşıma:</b> zar pompaları maddeleri az yoğundan çok yoğuna taşır. Örneğin bağırsakta emilim."],
    ["🧱","Yapım",316,168,"<b>Biyosentez:</b> amino asitlerden protein, nükleotitlerden DNA yapmak. Büyüme ve onarım."],
    ["🌡️","Isı",180,196,"<b>Vücut ısısı:</b> her enerji dönüşümünde bir kısım enerji ısıya dönüşür. 36,5 °C'yi bununla koruruz."]];
  H.forEach(([,, x,y],i)=>S("path",{id:"mt-"+i,d:`M180,104 L${x},${y}`,stroke:"var(--line)","stroke-width":3,fill:"none","stroke-dasharray":"5 5"},s2));
  H.forEach((_,i)=>[0,.6].forEach(b=>{const c=S("circle",{r:3.5,fill:"var(--sun)"},s2);motion(c,"#mt-"+i,1.2,b+i*.15)}));
  S("circle",{cx:180,cy:104,r:26,fill:"var(--sun)",class:"glow"},s2);T(s2,180,109,"ATP",{"text-anchor":"middle",class:"tk","font-size":13});
  const cap=add(el,`<div class="cap">Bir simgeye dokun.</div>`);
  H.forEach(([e,l,x,y,txt])=>{const g=S("g",{class:"tr",style:"cursor:pointer",tabindex:0,role:"button","aria-label":l},s2);g.style.transformBox="fill-box";g.style.transformOrigin="center";
    S("circle",{cx:x,cy:y,r:20,fill:"var(--surface)",stroke:"var(--c)","stroke-width":2},g);T(g,x,y+7,e,{"font-size":19,"text-anchor":"middle"});
    const f=()=>{cap.innerHTML=txt;g.style.transform="scale(1.2)";E.later(()=>g.style.transform="",300)};g.onclick=f;g.onkeydown=ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();f()}}});
  return ()=>E.kill();
},

/* Bilgi kartlarının içine giren küçük grafikler */
grafikler(el){
  const G=[["Işık şiddeti","M8,62 C30,30 46,14 70,12 L112,12"],["CO₂ miktarı","M8,62 C26,36 44,18 64,14 L112,13"],["Sıcaklık","M8,64 C40,62 52,8 74,10 C86,12 92,40 104,64"]];
  el.className="mini";
  el.innerHTML=G.map(([t,d])=>`<figure><svg viewBox="0 0 120 80" class="sv" role="img" aria-label="${t} arttıkça fotosentez hızı"><path d="M8,4 L8,68 L116,68" stroke="var(--muted)" stroke-width="1.5" fill="none"/><path class="cv" d="${d}" pathLength="1" stroke="var(--c)" stroke-width="3" fill="none" stroke-linecap="round"/><text x="12" y="10" class="lb" font-size="8">hız</text></svg><figcaption>${t} →</figcaption></figure>`).join("");
},
enerjibar(el){
  el.className="ebar";
  el.innerHTML=[["Karbonhidrat",4,"sun"],["Protein",4,"coral"],["Yağ",9,"plum"]].map(([a,v,h])=>`<div class="h-${h}"><span>${a}</span><i style="--w:${v/9*100}%"></i><b>≈${v} kcal/g</b></div>`).join("");
}
};
