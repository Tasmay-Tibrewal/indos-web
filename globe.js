/* Dotted earth globe for the hero. Land mask: 1° grid (360x180) rasterized from Natural Earth 110m land. */
(function(){
  const canvas=document.getElementById('globe');
  if(!canvas) return;
  const MASK_B64="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/v8/AOD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+///D/////5//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAH/j/+//////8PAAAAgB0AAHgAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAOD//wP8//////8BAACAfx4AAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAA4+I73//n///////8AAAAAfwAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAOAQACDwP4D///////8BAAAAPAQAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAADzAgPP5H8D//////38AAAAAAAAAAAAA4AEAAAD+DwAAAAAAAAAAAAAAAAAAAIC/g7PfBwAA/v////8AAAAAAAAAAADgBwAAwP//PwAA4B8AAAAAAAAAAAAAAAAMAAD8AgAA+P////8AAAAAAAAAAABwAAAA/P//AwAAAAAAAAAAAAAAAAAAAP8Ahvc5OwAA8P///38AAAAAAAAAAAAcAADg////34cHAAcAAAAAAAAAAAAAgN9/xzf8RwAA4P///z8AAAAAAAAAAAAPAB7g//////8fgB8AAAAAAT4AAAAAAO//B3f8/wsA4P///z8AAAAAAAAAAAAPAG////////8f2f8HAAAAAAD4HwAAAAD8H/D4/38A4P///xMAAAAAAPAHAAAAgN//////////////DwAAAAD+///h/4//H+/Bg/8BwP7//w8AAAAAwP8fAAAAj9///////////////88//h8AAAAAAAD8+Dsw+AH//wAAAP//////DwAA/P8cgEEAAAAAAAAAAAAAAAAA8P8AAAAAAAAAAAAQeAbwPwAA+P//////AwAA4AwAAGAAAAAAAAAAAAAAAAAAIH4DAAAAAAAAAAAA/gPAfwAA/v//////AQBg4AAAABAAAAAAAAAAAAAAAAAAAQ8AAAAAAAAAAACg/wPnfwDw/x/A////AByADwAAAAAAAAAAAAAAAAAAAAAAQID4///////////Pw/0DAP8HAMAfAACA//F//v////////////////////8/AAP4///////////BBPAHAP4HAAAAAADg//z///////////////////////9/AID///////////8AQ8ABAPwBAAAAAAD8P/7///////////////////////9fAMD//////////z8AwA8AAPgBAAAAAAD+H/7/////////////////////Of8BAID///z//////z8AwD8AAMABAAAAAAD+P/z///////////////////9/wH8AAAD8MwD//////x8AwH8MAAAAAAAAAAD+P2D///////////////////95cAAAAACAAwD8/////38AwP8eAAAAAAAAgAGcH/D//////////////////wEAOAAAAADADgDA/////38AgP8/AAAAAAAAwANAH/T//////////////////wAAfgAAAAAwAAAA//////8PgP8/AAAAAAAAwAFwD/7/////////////////PwAAfwAAAAAGAAAA//////8/wP//AAAAAAAAwAOwA/7/////////////////DwCAPwAAAIAAAAAA/v//////8///BwAAAAAAOAcgcP//////////////////HwAAHwAAAAAAAACA+P//////4///DwAAAAAAOA74/////////////////////wUADwAAAAAAAAAA8P//////4///DwAAAAAAGD///////////////////////wUAAwAAAAAAAAAA8P//////7///FwAAAAAAAB///////////////////////wUAAgAAAAAAAAAA0P//////////CAAAAAAAgOH//////////////////////w0AAAAAAAAAAAAAYP////////8xLAAAAAAAAPz//////////////////////wwAAAAAAAAAAAAAAP7//////38HfgAAAAAAgP///////////////////////wQAAAAAAAAAAAAAAP3///////8HUAAAAAAAAP7/////////////////////fwQAAAAAAAAAAAAAAP////////+XAAAAAAAAAPz///93/D/+////////////PwwAAAAAAAAAAAAAAP////////9/AAAAAAAAAPj//f9j/g/+////////////HwAAAAAAAAAAAAAAAP////////8MAAAAAAAAAPj/+P8B/Mf/////////////DwQAAAAAAAAAAAAAAP///////z8AAAAAAAAAcPzH8/8A8I//////////////Bx4AAAAAAAAAAAAAAP///////x8AAAAAAAAA+H+Aw/8AwA/+//////////9/AA8AAAAAAAAAAAAAAP///////x8AAAAAAAAA+D8Aj//w4R/8//////////8/AAAAAAAAAAAAAAAAAP///////wMAAAAAAAAA+B8wuE/+/z/+/////////98fAAMAAAAAAAAAAAAAAP///////wMAAAAAAAAA+A8wEMf//x/+/////////0cOAAMAAAAAAAAAAAAAAP7//////wEAAAAAAAAA+A8AAI7//x/8/////////wMOAAEAAAAAAAAAAAAAAP7//////wAAAAAAAAAA+AcABob//z/8/////////zccwAEAAAAAAAAAAAAAAPz//////wAAAAAAAAAAQOB/AAQ2/////////////x8c8AEAAAAAAAAAAAAAAPj//////wAAAAAAAAAAQPx/AAAA/////////////w8Y/gEAAAAAAAAAAAAAAPD/////fwAAAAAAAAAA4P8/AAAA/////////////w+EGwAAAAAAAAAAAAAAAMD/////HwAAAAAAAAAA8P9/AACA/////////////x/AAwAAAAAAAAAAAAAAAID/////DwAAAAAAAAAA+P//BwaA/////////////x/AAAAAAAAAAAAAAAAAAID9////BwAAAAAAAAAA/P//D3+E/////////////z9AAAAAAAAAAAAAAAAAAAD5////BwAAAAAAAAAA/P//f////////////////x8AAAAAAAAAAAAAAAAAAADy/x8GBgAAAAAAAAAA/P/////v/8///////////z8AAAAAAAAAAAAAAAAAAAD0/w8ABgAAAAAAAAAA/v////+//4///////////z8AAAAAAAAAAAAAAAAAAADu/wcADgAAAAAAAACA//////8f/x/+/////////x8AAAAAAAAAAAAAAAAAAACI/wcALAAAAAAAAADA//////8//z/g/////////w8AAAAAAAAAAAAAAAAAAACQ/wcACAAAAAAAAADg//////9//r+A/////////wcAAAAAAAAAAAAAAAAAAAAQ/wMAAAAAAAAAAADg//////9//n8cgP///////ycAAAAAAAAAAAAAAAAAAAAA/gMAAAAAAAAAAADw////////+P9/AP///////xEAAAAAAAAAAAAAAAAAAAAA/AMAHQAAAAAAAADw////////+P//APz/f///fxAAAAAAAAAAAAAAAAAAAAAA+AcAYAAAAAAAAAD4////////+f9/APz/B///BgAAAAAAAAAAAAAAAAAAAAAA/AccgAEAAAAAAADw////////8f9/AOD/B/5/AAAAAAAAAAAAAAAAAQAAAAAA+A8eADgAAAAAAADw////////4f8/AOD/Afw/BgAAAAAAAAAAAAAAAAAAAAAA8J8PAPwCAAAAAADw////////4/8fAOD/APw/AgAAAAAAAAAAAAAAAAAAAAAAgP8PAAAAAAAAAADw////////x/8HAOB/APx/ADAAAAAAAAAAAAAAAAAAAAAAAP4PAAAAAAAAAAD4////////h/8BAOA/APz/ADAAAAAAAAAAAAAAAAAAAAAAAID/AAAAAAAAAAD4////////j/8AAMAPAMD/ATAAAAAAAAAAAAAAAAAAAAAAAAD/AQAAAAAAAAD4////////nx8AAMAPAMD/ATAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAD4////////vwcAAIAPAMD/AcAAAAAAAAAAAAAAAAAAAAAAAADgAQAAAAAAAAD4////////fwAAAIAPAMD8AQABAAAAAAAAAAAAAAAAAAAAAADAAAgAAAAAAADw////////f2AAAAAPAID4AUACAAAAAAAAAAAAAAAAAAAAAADAAe9zAAAAAADg/////////34AAAAPAEBwAAgAAAAAAAAAAAAAAAAAAAAAAAAAE+9/AAAAAADA/////////38AAAAXAEAgAAQCAAAAAAAAAAAAAAAAAAAAAAAAz///AAAAAACA/////////z8AAAASAMAAAIACAAAAAAAAAAAAAAAAAAAAAAAAyP//AQAAAACA/////////z8AAAAwAIAAAEAHAAAAAAAAAAAAAAAAAAAAAAAAgP//AwAAAAAA/v///////x8AAAAwAAADAAMBAAAAAAAAAAAAAAAAAAAAAAAAwP//fwAAAAAA/A/+/////x8AAAAAAAAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAgP///wAAAAAAEAD8/////w8AAAAAADAGwAcAAAAAAAAAAAAAAAAAAAAAAAAAgP///wEAAAAAAADA/////wcAAAAAAGAG4AEAAAAAAAAAAAAAAAAAAAAAAAAA4P///wEAAAAAAADA/////wMAAAAAAMAM+AMAAAAAAAAAAAAAAAAAAAAAAAAA4P///wMAAAAAAADg/////wEAAAAAAIAL/gMQAAAAAAAAAAAAAAAAAAAAAAAA8P///wMAAAAAAADg////fwAAAAAAAIAH/vMQAAAAAAAAAAAAAAAAAAAAAAAA8P///wcAAAAAAADg////PwAAAAAAAAAP/gMAAQAAAAAAAAAAAAAAAAAAAAAA+P///38AAAAAAADg////PwAAAAAAAAAO/DmAAwAAAAAAAAAAAAAAAAAAAAAA+P///38BAAAAAADA////HwAAAAAAAAA+/DkA8gAAAAAAAAAAAAAAAAAAAAAA8P////8fAAAAAACA////DwAAAAAAAAA8wChE/gcAAAAAAAAAAAAAAAAAAAAA+P////8/AAAAAACA////BwAAAAAAAAA4AEAA8B8AAAAAAAAAAAAAAAAAAAAA+P//////AQAAAAAA////BwAAAAAAAAAwAEAAxD8NAAAAAAAAAAAAAAAAAAAA+P//////AQAAAAAA////BwAAAAAAAADAAQAAxP+AAAAAAAAAAAAAAAAAAAAA8P//////AQAAAAAA/v//BwAAAAAAAACAHwAAwH8ABAAAAAAAAAAAAAAAAAAA4P//////AQAAAAAA/v//BwAAAAAAAAAAQFYEAMcAAAAAAAAAAAAAAAAAAAAA4P//////AAAAAAAA/v//DwAAAAAAAAAAAAgBAIABMAAAAAAAAAAAAAAAAAAAwP//////AAAAAAAA/v//DwAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAgP////9/AAAAAAAA/P//DwAAAAAAAAAAAAAAAQQAAAAAAAAAAAAAAAAAAAAAgP////8/AAAAAAAA/v//HyAAAAAAAAAAAACAHwQAAAAAAAAAAAAAAAAAAAAAAP////8fAAAAAAAA/v//HyAAAAAAAAAAAADADwwAAAAAAAAAAAAAAAAAAAAAAP////8fAAAAAAAA////HzAAAAAAAAAAAADsDxwAAAAAAAAAAAAAAAAAAAAAAP7///8fAAAAAAAA////DzgAAAAAAAAAAAD/DxwAAAAA/////////////////wcAAADg////////AAAA8MD///////////8AwMH///d/AAAAAAAAAAAAAAAAAOD///8fAAAAAAAA////Ax8AAAAAAAAAAMD//z4AAABAAAAAAAAAAAAAAAAAAMD///8PAAAAAAAA////AB8AAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAMD///8PAAAAAAAA/v9/AB8AAAAAAAAAAOD//38AAAAAAAAAAAAAAAAAAAAAAMD///8PAAAAAAAA/v9/AB8AAAAAAAAAAPz///8BAAEAAAAAAAAAAAAAAAAAAMD///8HAAAAAAAA/P9/gA8AAAAAAAAAgP////8BAAIAAAAAAAAAAAAAAAAAAMD///8DAAAAAAAA/P//gA8AAAAAAAAAwP////8DAAAAAAAAAAAAAAAAAAAAAMD//38AAAAAAAAA/P9/AA8AAAAAAAAAwP////8HAAAAAAAAAAAAAAAAAAAAAOD//x8AAAAAAAAA+P9/AAcAAAAAAAAA4P////8PAAAAAAAAAAAAAAAAAAAAAOD//w8AAAAAAAAA+P8fAAIAAAAAAAAAwP////8fAAAAAAAAAAAAAAAAAAAAAOD//wcAAAAAAAAA+P8fAAAAAAAAAAAA4P////8fAAAAAAAAAAAAAAAAAAAAAOD//wcAAAAAAAAA+P8fAAAAAAAAAAAAwP////8fAAAAAAAAAAAAAAAAAAAAAOD//wcAAAAAAAAA8P8PAAAAAAAAAAAAgP////8/AAAAAAAAAAAAAAAAAAAAAOD//wMAAAAAAAAA4P8HAAAAAAAAAAAAgP////8fAAAAAAAAAAAAAAAAAAAAAPD//wMAAAAAAAAA4P8HAAAAAAAAAAAAgP////8fAAAAAAAAAAAAAAAAAAAAAPD//wEAAAAAAAAAwP8DAAAAAAAAAAAAAP////8fAAAAAAAAAAAAAAAAAAAAAOD//wAAAAAAAAAAwP8BAAAAAAAAAAAAAP8D/P8PAAAAAAAAAAAAAAAAAAAAAPD/fwAAAAAAAAAAwH8AAAAAAAAAAAAAgP8A2P8HAAAAAAAAAAAAAAAAAAAAAPD/OwAAAAAAAAAAgAEAAAAAAAAAAAAAAAcA6P8HAAAAAAAAAAAAAAAAAAAAAPj/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP8DAAACAAAAAAAAAAAAAAAAAPj/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8DAAAEAAAAAAAAAAAAAAAAAPz/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8DAAAIAAAAAAAAAAAAAAAAAPj/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAAAA4AAAAAAAAAAAAAAAAAPg/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAPw/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAPwHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAALAAAAAAAAAAAAAAAAAPwfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAIADAAAAAAAAAAAAAAAAAPgHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAMABAAAAAAAAAAAAAAAAAPwHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAP4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAP4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAP4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH6AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAIAfAAAAAAAeeADADwAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAPD/AADA/////////z8AAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAgP///wH4//////////8DAAAAAAAAAAAAAAAAAAAAADAfAAAAAAAAAAAAAADw8////wP+////////////AwAAAAAAAAAAAAAAAAAAAHA/AAAAAAAAAAA8//P//////+D/////////////HwAAAAAAAAAAAAAAAAAAAP5+AAAAAAAA5v////////////D//////////////38AAAAAAAAAAAAAAAAAAAB+AAAAAACA/////////////////////////////38AAAAAAAAAYAYA4ON/OPh/AAAAAADw/////////////////////////////x8AAAAAAADwv/MXgP////8fAAAAAADw/////////////////////////////wMAAAAAAPz///////////8HAAAAAAD+/////////////////////////////wAAAAAAAPz//////////z8AAAAAAP///////////////////////////////wAAAADA/////////////wEAAAAA8P///////////////////////////////wAAAACH////////////PwAAAPgA/////////////////////////////////wcAAAAcgP//////////fwAAAP4BwP//////////////////////////////HwAAAAAAAP7//////////wf8wD8AwP//////////////////////////////DwAAAAAA/v////////////8HAAD4////////////////////////////////HwAAAAAA+P//////////////4f///////////////////////////////////wAAAAAA/P///////////////////////////////////////////////////x8A3x8AAP7/////////////////////////////////////////////fwAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const bin=atob(MASK_B64); const mask=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) mask[i]=bin.charCodeAt(i);
  const land=(lat,lon)=>{ // lat -90..90, lon -180..180
    let j=Math.floor(90-lat), i=Math.floor(lon+180);
    if(j<0)j=0; if(j>179)j=179; i=((i%360)+360)%360;
    const idx=j*360+i; return (mask[idx>>3]>>(idx&7))&1;
  };

  // Build dot set: even angular spacing, longitude step widened by 1/cos(lat) for uniform density.
  // Each dot is stored as a unit vector (x,y,z) so a frame only needs a rotation, no trig.
  const STEP=2.1, pts=[];
  for(let lat=-60;lat<=86;lat+=STEP){ // Antarctica left out, as on most dotted globes
    const la=lat*Math.PI/180, c=Math.cos(la); const step=STEP/Math.max(c,.12);
    for(let lon=-180;lon<180;lon+=step){
      const lo=lon*Math.PI/180;
      pts.push({x:c*Math.sin(lo), y:Math.sin(la), z:c*Math.cos(lo), land:land(lat,lon)});
    }
  }

  // Sites: our offices and clinics.
  const sites=[
    {name:'Houston', lat:29.76, lon:-95.37, kind:'office'},
    {name:'San Francisco', lat:37.77, lon:-122.42, kind:'office', align:'right', hub:true},
    {name:'Pasadena, TX', lat:29.69, lon:-95.21, kind:'clinic', quiet:true},
    {name:'La Porte, TX', lat:29.67, lon:-95.02, kind:'clinic', quiet:true},
    {name:'Corpus Christi, TX', lat:27.80, lon:-97.40, kind:'clinic', quiet:true},
    {name:'Los Angeles, CA', lat:34.05, lon:-118.24, kind:'clinic', quiet:true},
    {name:'Paris', lat:48.86, lon:2.35, kind:'office', hub:true},
    {name:'Bangalore', lat:12.97, lon:77.59, kind:'office', hub:true},
    {name:'Chennai', lat:13.08, lon:80.27, kind:'office', align:'right', below:true},
    {name:'Delhi', lat:28.61, lon:77.21, kind:'office'},
  ];
  const byName=n=>sites.find(s=>s.name===n);
  const arcs=[[byName('San Francisco'),byName('Bangalore')],[byName('San Francisco'),byName('Los Angeles, CA')],[byName('San Francisco'),byName('Houston')],[byName('San Francisco'),byName('Paris')],[byName('Paris'),byName('Bangalore')],[byName('Bangalore'),byName('Chennai')],[byName('Bangalore'),byName('Delhi')]];

  const ARC_N=96;
  const arcPts=arcs.map(([a,b])=>{ const out=[]; for(let i=0;i<=ARC_N;i++){ const tt=i/ARC_N, g=slerp(a,b,tt), lift=1+0.07*Math.sin(Math.PI*tt); const la=g.lat*Math.PI/180, lo=g.lon*Math.PI/180; out.push([Math.cos(la)*Math.sin(lo)*lift, Math.sin(la)*lift, Math.cos(la)*Math.cos(lo)*lift]); } return out; });

  const ctx=canvas.getContext('2d');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W=0,H=0,dpr=1,R=0;
  function resize(){
    const r=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2);
    W=Math.round(r.width*dpr); H=Math.round(r.height*dpr);
    canvas.width=W; canvas.height=H; R=Math.min(W,H)*0.40;
  }
  resize(); window.addEventListener('resize',resize);

  function css(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  let colDot=css('--globe-dot'), colLand=css('--globe-land'), colAccent=css('--accent'), colInk=css('--ink'), colBg=css('--bg');

  const TILT=22*Math.PI/180, sinT=Math.sin(TILT), cosT=Math.cos(TILT);
  function project(lat,lon,rot){
    const la=lat*Math.PI/180, lo=lon*Math.PI/180+rot;
    let x=Math.cos(la)*Math.sin(lo), y=Math.sin(la), z=Math.cos(la)*Math.cos(lo);
    // tilt around x axis
    const y2=y*cosT - z*sinT, z2=y*sinT + z*cosT;
    return {x:x*R+W/2, y:-y2*R+H/2, z:z2};
  }
  function slerp(a,b,t){
    const la1=a.lat*Math.PI/180, lo1=a.lon*Math.PI/180, la2=b.lat*Math.PI/180, lo2=b.lon*Math.PI/180;
    const d=Math.acos(Math.sin(la1)*Math.sin(la2)+Math.cos(la1)*Math.cos(la2)*Math.cos(lo1-lo2));
    const A=Math.sin((1-t)*d)/Math.sin(d), B=Math.sin(t*d)/Math.sin(d);
    const x=A*Math.cos(la1)*Math.cos(lo1)+B*Math.cos(la2)*Math.cos(lo2);
    const y=A*Math.cos(la1)*Math.sin(lo1)+B*Math.cos(la2)*Math.sin(lo2);
    const z=A*Math.sin(la1)+B*Math.sin(la2);
    return {lat:Math.atan2(z,Math.sqrt(x*x+y*y))*180/Math.PI, lon:Math.atan2(y,x)*180/Math.PI};
  }

  // Start with the Americas facing front, drift east slowly.
  let rot=100*Math.PI/180; const SPEED=(2*Math.PI)/110; // one turn per 110s
  let last=performance.now();
  function frame(now){
    const dt=Math.min((now-last)/1000,.034); last=now;
    if(!reduce) rot+=SPEED*dt;
    draw();
    if(!reduce) requestAnimationFrame(frame);
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    // sphere ground: faint disk + rim
    ctx.beginPath(); ctx.arc(W/2,H/2,R,0,Math.PI*2);
    ctx.fillStyle=`rgba(${colDot},.025)`; ctx.fill();
    ctx.lineWidth=1*dpr; ctx.strokeStyle=`rgba(${colDot},.10)`; ctx.stroke();
    // dots: rotate precomputed unit vectors, bucket by depth, one fill per bucket
    const cr=Math.cos(rot), sr=Math.sin(rot);
    const rDot=Math.max(1.1*dpr, R*0.0075), NB=6;
    const landB=Array.from({length:NB},()=>[]), seaB=Array.from({length:NB},()=>[]);
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      const x=p.x*cr+p.z*sr, z=-p.x*sr+p.z*cr, y=p.y;
      const z2=y*sinT+z*cosT; if(z2<=0) continue;
      const y2=y*cosT-z*sinT;
      const b=Math.min(NB-1,Math.floor(z2*NB));
      (p.land?landB:seaB)[b].push(x*R+W/2, -y2*R+H/2);
    }
    for(let b=0;b<NB;b++){
      const depth=(b+0.5)/NB;
      let arr=seaB[b];
      if(arr.length){ ctx.fillStyle=`rgba(${colDot},${(.05+.09*depth).toFixed(3)})`; ctx.beginPath(); const r=rDot*0.62; for(let i=0;i<arr.length;i+=2){ ctx.moveTo(arr[i]+r,arr[i+1]); ctx.arc(arr[i],arr[i+1],r,0,6.2832); } ctx.fill(); }
      arr=landB[b];
      if(arr.length){ ctx.fillStyle=`rgba(${colLand},${(.22+.78*depth).toFixed(3)})`; ctx.beginPath(); const r=rDot*(0.85+0.35*depth); for(let i=0;i<arr.length;i+=2){ ctx.moveTo(arr[i]+r,arr[i+1]); ctx.arc(arr[i],arr[i+1],r,0,6.2832); } ctx.fill(); }
    }
    // arcs: solid lines, split exactly at the horizon so nothing pops as the globe turns
    ctx.lineCap='round'; ctx.lineJoin='round';
    for(const ap of arcPts){
      const proj=ap.map(v=>{ const x=v[0]*cr+v[2]*sr, z=-v[0]*sr+v[2]*cr, y=v[1]; return [x*R+W/2, -(y*cosT-z*sinT)*R+H/2, y*sinT+z*cosT]; });
      const front=[], back=[];
      for(let i=0;i<proj.length-1;i++){
        const a=proj[i], b=proj[i+1];
        if(a[2]>0 && b[2]>0){ front.push(a,b); }
        else if(a[2]<=0 && b[2]<=0){ back.push(a,b); }
        else { const tt=a[2]/(a[2]-b[2]); const m=[a[0]+(b[0]-a[0])*tt, a[1]+(b[1]-a[1])*tt, 0]; if(a[2]>0){ front.push(a,m); back.push(m,b); } else { back.push(a,m); front.push(m,b); } }
      }
      const drawSegs=(segs)=>{ if(!segs.length) return; ctx.beginPath(); for(let i=0;i<segs.length;i+=2){ ctx.moveTo(segs[i][0],segs[i][1]); ctx.lineTo(segs[i+1][0],segs[i+1][1]); } ctx.stroke(); };
      ctx.strokeStyle=colAccent;
      ctx.lineWidth=1*dpr; ctx.globalAlpha=.3; drawSegs(back);
      ctx.lineWidth=1.3*dpr; ctx.globalAlpha=.95; drawSegs(front);
      ctx.globalAlpha=1;
    }
    // sites
    ctx.font=`${11*dpr}px "IBM Plex Mono", ui-monospace, Menlo, monospace`; ctx.textBaseline='middle';
    const labels=[];
    for(const s of sites){
      const q=project(s.lat,s.lon,rot);
      if(q.z<=0.05){
        // office on the far side: faint marker and label so arcs visibly end somewhere
        if(s.kind!=='office') continue;
        ctx.globalAlpha=s.hub?.55:.4; ctx.strokeStyle=colAccent; ctx.lineWidth=1*dpr; ctx.setLineDash([2*dpr,3*dpr]);
        ctx.beginPath(); ctx.arc(q.x,q.y,5*dpr,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
        if(!s.quiet){ labels.push({t:s.name.toUpperCase(), x:q.x+(s.align==='right'?-11:11)*dpr, y:q.y+(s.below?12*dpr:0), align:s.align==='right'?'right':'left', hub:s.hub, alpha:s.hub?.55:.4, pri:0}); }
        ctx.globalAlpha=1; continue;
      }
      const a=Math.min(1,(q.z-0.05)*3);
      ctx.globalAlpha=a;
      if(s.kind==='office'){
        if(s.hub){
          ctx.fillStyle=colAccent; ctx.globalAlpha=a*.18; ctx.beginPath(); ctx.arc(q.x,q.y,14*dpr,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=a;
          ctx.beginPath(); ctx.arc(q.x,q.y,4.2*dpr,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle=colAccent; ctx.lineWidth=1.4*dpr; ctx.beginPath(); ctx.arc(q.x,q.y,9*dpr,0,Math.PI*2); ctx.stroke();
        } else {
          ctx.fillStyle=colAccent; ctx.beginPath(); ctx.arc(q.x,q.y,3*dpr,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle=colAccent; ctx.lineWidth=1*dpr; ctx.beginPath(); ctx.arc(q.x,q.y,6.5*dpr,0,Math.PI*2); ctx.stroke();
        }
      } else {
        ctx.fillStyle=colBg; ctx.strokeStyle=colAccent; ctx.lineWidth=1.4*dpr;
        ctx.beginPath(); ctx.arc(q.x,q.y,2.8*dpr,0,Math.PI*2); ctx.fill(); ctx.stroke();
      }
      if(!s.quiet){
        const off=(s.hub?15:12)*dpr;
        if(s.align==='right') labels.push({t:s.name.toUpperCase(), x:q.x-off, y:q.y+(s.below?12*dpr:0), align:'right', hub:s.hub, alpha:a, pri:s.hub?3:2});
        else labels.push({t:s.name.toUpperCase(), x:q.x+off, y:q.y-(s.kind==='office'&&!s.hub?10*dpr:0), align:'left', hub:s.hub, alpha:a, pri:s.hub?3:2});
      }
      ctx.globalAlpha=1;
    }
    // labels: draw by priority, skip any that would overlap one already placed
    labels.sort((p,q)=>q.pri-p.pri);
    const placed=[]; const lh=13*dpr;
    for(const L of labels){
      ctx.font=`${L.hub?500:400} ${(L.hub?12.5:11)*dpr}px "IBM Plex Mono", ui-monospace, Menlo, monospace`;
      const w=ctx.measureText(L.t).width;
      const x0=L.align==='right'?L.x-w:L.x, x1=x0+w, y0=L.y-lh/2, y1=L.y+lh/2;
      if(placed.some(r=>x0<r.x1+4*dpr&&x1>r.x0-4*dpr&&y0<r.y1&&y1>r.y0)) continue;
      placed.push({x0,x1,y0,y1});
      ctx.globalAlpha=L.alpha; ctx.fillStyle=colInk; ctx.textAlign=L.align; ctx.fillText(L.t,L.x,L.y);
    }
    ctx.globalAlpha=1;
  }
  requestAnimationFrame(frame);
})();
