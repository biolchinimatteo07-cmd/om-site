'use strict';

/* ── CURSOR ── */
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
  });
  const raf = () => {
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px';
    requestAnimationFrame(raf);
  };
  raf();
  document.querySelectorAll('a,button,.btn,[data-hover]').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.classList.add('big'); cursorRing.classList.add('big'); });
    el.addEventListener('mouseleave',()=>{ cursor.classList.remove('big'); cursorRing.classList.remove('big'); });
  });
}

/* ── NAV SCROLL ── */
const nav = document.querySelector('nav');
if (nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* ── ACTIVE NAV LINK ── */
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
  if (a.getAttribute('href') === path) a.classList.add('active');
});

/* ── HAMBURGER ── */
const burger = document.querySelector('.hamburger');
const mMenu  = document.querySelector('.mobile-menu');
if (burger && mMenu) {
  burger.addEventListener('click',()=>{
    burger.classList.toggle('open');
    mMenu.classList.toggle('open');
    document.body.style.overflow = mMenu.classList.contains('open')?'hidden':'';
  });
  mMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open'); mMenu.classList.remove('open');
    document.body.style.overflow='';
  }));
}

/* ── SCROLL REVEAL ── */
const revEls = document.querySelectorAll('.reveal');
if (revEls.length) {
  const obs = new IntersectionObserver(ents=>{
    ents.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
  },{threshold:.1});
  revEls.forEach(el=>obs.observe(el));
}

/* ── LANGUAGE ── */
let lang = localStorage.getItem('om_lang')||'fr';
function applyLang() {
  document.querySelectorAll('[data-fr]').forEach(el=>{
    const v=el.getAttribute('data-'+lang); if(v) el.textContent=v;
  });
  document.querySelectorAll('[data-placeholder-fr]').forEach(el=>{
    const v=el.getAttribute('data-placeholder-'+lang); if(v) el.placeholder=v;
  });
  document.querySelectorAll('#langBtn').forEach(btn=>btn.textContent=lang==='fr'?'EN':'FR');
}
function toggleLanguage(){ lang=lang==='fr'?'en':'fr'; localStorage.setItem('om_lang',lang); applyLang(); }
applyLang();

/* ── COUNT UP ── */
function countUp(el,target,suffix=''){
  const dur=1800, t0=performance.now();
  const step=now=>{
    const p=Math.min((now-t0)/dur,1), ease=1-Math.pow(1-p,4);
    el.textContent=Math.round(ease*target)+suffix;
    if(p<1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterEls=document.querySelectorAll('[data-count]');
if(counterEls.length){
  const cObs=new IntersectionObserver(ents=>{
    ents.forEach(e=>{ if(e.isIntersecting){ countUp(e.target,+e.target.dataset.count,e.target.dataset.suffix||''); cObs.unobserve(e.target); } });
  },{threshold:.5});
  counterEls.forEach(el=>cObs.observe(el));
}

/* ── FIREWORKS ── */
function createFireworks(){
  const cols=['#009EE0','#0077B6','#C9A84C','#ffffff','#a8d8f0'];
  for(let i=0;i<45;i++){
    setTimeout(()=>{
      const d=document.createElement('div');
      const sz=Math.random()*10+5;
      const dx=(Math.random()-.5)*400, dy=-(Math.random()*400+100);
      d.style.cssText=`position:fixed;width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;top:${Math.random()*60+20}vh;background:${cols[Math.floor(Math.random()*cols.length)]};border-radius:50%;pointer-events:none;z-index:9995;transition:transform 1.8s cubic-bezier(.215,.61,.355,1),opacity 1.8s ease;opacity:1;`;
      document.body.appendChild(d);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        d.style.transform=`translate(${dx}px,${dy}px) scale(0.2)`;
        d.style.opacity='0';
      }));
      setTimeout(()=>d.remove(),1900);
    },i*55);
  }
}