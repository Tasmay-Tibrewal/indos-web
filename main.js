/* Nav, sub-navigation highlight. */
(function(){
  const root=document.documentElement;
  // sticky nav border
  const nav=document.querySelector('.nav');
  const onScroll=()=>nav&&nav.classList.toggle('scrolled',window.scrollY>8);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  // mobile menu
  const btn=document.getElementById('navToggle'), links=document.getElementById('navLinks');
  if(btn&&links){
    btn.addEventListener('click',()=>{ const open=links.classList.toggle('open'); btn.setAttribute('aria-expanded',String(open)); });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded','false');}));
  }
  // subnav active state (products page)
  const sub=document.querySelector('.subnav');
  if(sub&&'IntersectionObserver' in window){
    const items=[...sub.querySelectorAll('a[href^="#"]')];
    const map=new Map(items.map(a=>[a.getAttribute('href').slice(1),a]));
    const io=new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting){ items.forEach(a=>a.classList.remove('active')); const a=map.get(e.target.id); if(a){a.classList.add('active'); a.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});} } });
    },{rootMargin:'-40% 0px -55% 0px'});
    map.forEach((a,id)=>{ const el=document.getElementById(id); if(el) io.observe(el); });
  }
  // patient flow: highlight the step nearest the viewport centre and fill the record up to it
  const steps=[...document.querySelectorAll('.fstep')];
  if(steps.length){
    const rows=[...document.querySelectorAll('.rec-rows li')], bar=document.querySelector('.flow-progress i');
    let cur=0;
    const update=()=>{
      // steps activate as they pass the viewport centre, except the first hand-off:
      // Clinics stays active until the record card has reached its sticky position at the top
      const mid=window.innerHeight*0.5; let best=0, bd=Infinity;
      steps.forEach((el,i)=>{ const r=el.getBoundingClientRect(); const d=Math.abs((r.top+r.bottom)/2-mid); if(d<bd){bd=d;best=i;} });
      if(steps[0].getBoundingClientRect().top>mid) best=-1;
      const sticky=document.querySelector('.flow-sticky');
      if(sticky && best>0 && sticky.getBoundingClientRect().top>97) best=0;
      if(best===cur) return; cur=best;
      steps.forEach((el,i)=>el.classList.toggle('on',i===best));
      rows.forEach((el,i)=>{ el.classList.toggle('on',i===best); el.classList.toggle('done',i<best); });
      if(bar) bar.style.width=((best+1)/steps.length*100)+'%';
    };
    cur=-2; update(); window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update);
  }
  // live sequences: inside the active step, transcript words turn white one by one,
  // then any .live-fill items (note rows, pipeline stages, pills) fill in, then it loops
  const txs=[...document.querySelectorAll('.live-tx')];
  txs.forEach(el=>{ el.innerHTML=el.dataset.text.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' '); });
  if(document.querySelector('.live-tx, .live-fill')){
    let timer=null, active=null;
    const reset=(scope)=>scope.querySelectorAll('.live-tx .w.said, .live-fill.said, .live-swap.said').forEach(w=>w.classList.remove('said'));
    // waveform driver: bars follow the real TTS envelope of the utterance being transcribed
    const idleWaves=(scope)=>scope.querySelectorAll('.live-wave i').forEach(b=>{ b.style.transform='scaleY(.14)'; });
    let wav=null; // {bars, env, start, dur}
    // envelope: 140 points from the TTS audio, smoothed so the scroll reads as speech rather than flicker
    // envelope: 140 points from the TTS audio, reduced to ~50 so fewer peaks pass per second while staying in sync with the words
    const ENV_POINTS=50;
    const parseEnv=(str)=>{ const a=[]; for(let k=0;k<str.length;k+=2) a.push(parseInt(str.substr(k,2),10)/99);
      const out=[], step=a.length/ENV_POINTS;
      for(let i=0;i<ENV_POINTS;i++){ const seg=a.slice(Math.floor(i*step),Math.max(Math.floor(i*step)+1,Math.floor((i+1)*step))); out.push(Math.max(...seg)); }
      // light smoothing across neighbours so adjacent bars never jump against each other
      return out.map((v,i)=>{ const w=[out[i-1],v,out[i+1]].filter(x=>x!==undefined); return w.reduce((p,q)=>p+q,0)/w.length; }); };
    const sample=(env,x)=>{ if(x<=0) return 0; const i=Math.floor(x), f=x-i; const a=env[Math.min(i,env.length-1)], b=env[Math.min(i+1,env.length-1)]; return a+(b-a)*f; };
    const STRIDE=1; // one envelope point per bar
    const waveFrame=()=>{
      if(wav){
        const t=Math.min(1,(performance.now()-wav.start)/wav.dur);
        const n=wav.bars.length, pos=t*(wav.env.length-1);
        for(let k=0;k<n;k++){
          const target=Math.max(.14,sample(wav.env,pos-(n-1-k)*STRIDE));
          wav.cur[k]+= (target-wav.cur[k])*0.22; // damped follow
          wav.bars[k].style.transform='scaleY('+wav.cur[k].toFixed(3)+')';
        }
      }
      requestAnimationFrame(waveFrame);
    };
    requestAnimationFrame(waveFrame);
    const startWave=(step,tx,who,words)=>{
      const el=step.querySelector('.live-wave.w-'+who)||step.querySelector('.live-wave');
      idleWaves(step);
      if(!el||!tx.dataset.env){ wav=null; return; }
      const bars=[...el.querySelectorAll('i')]; wav={bars, cur:bars.map(()=>.14), env:parseEnv(tx.dataset.env), start:performance.now(), dur:words*(parseInt(tx.dataset.speed)||160)+80};
    };
    const stopWave=(step)=>{ wav=null; idleWaves(step); };
    const run=(step)=>{
      // items run in DOM order unless a data-seq container says otherwise (lets two panels interleave)
      const raw=[...step.querySelectorAll('.live-tx .w, .live-fill, .live-swap')];
      const key=(el,idx)=>{ const c=el.closest('[data-seq]'); return (c?parseFloat(c.dataset.seq):1e6)*1e5+idx; };
      const items=raw.map((el,idx)=>[key(el,idx),el]).sort((a,b)=>a[0]-b[0]).map(p=>p[1]);
      let i=0, speaker=null, curTx=null; reset(step); clearTimeout(timer); delete step.dataset.speaking; stopWave(step);
      const tick=()=>{
        if(active!==step) return;
        if(i<items.length){
          const el=items[i];
          const isWord=el.classList.contains('w');
          if(isWord){
            const tx=el.closest('.live-tx'), who=tx.dataset.speaker||'x';
            if(tx!==curTx){ // new utterance: brief silence, then its own waveform starts
              curTx=tx; speaker=who; delete step.dataset.speaking; stopWave(step);
              const voiced=!!tx.dataset.env; // text being drafted (no voice) starts immediately, speech pauses first
              timer=setTimeout(()=>{ if(active!==step) return; if(voiced){ step.dataset.speaking=who; startWave(step,tx,who,tx.querySelectorAll('.w').length); } tick(); },voiced?520:0); return;
            }
            i++; el.classList.add('said'); timer=setTimeout(tick,parseInt(tx.dataset.speed)||160);
          } else {
            if(speaker!==null){ speaker=null; curTx=null; delete step.dataset.speaking; stopWave(step); }
            i++; el.classList.add('said');
            if(el.closest('[data-parallel]')){ tick(); return; } // fires alongside whatever comes next, no wait
            timer=setTimeout(tick,380);
          }
        } else { delete step.dataset.speaking; stopWave(step); timer=setTimeout(()=>{ if(active===step){ reset(step); i=0; speaker=null; curTx=null; timer=setTimeout(tick,500); } },1400); }
      };
      tick();
    };
    const check=()=>{
      const step=document.querySelector('.fstep.on');
      const has=step && step.querySelector('.live-tx, .live-fill');
      const next=has?step:null;
      if(next!==active){ active=next; clearTimeout(timer); document.querySelectorAll('.fstep').forEach(st=>{reset(st); delete st.dataset.speaking; idleWaves(st);}); wav=null; if(next) run(next); }
    };
    setInterval(check,250);
  }
})();
