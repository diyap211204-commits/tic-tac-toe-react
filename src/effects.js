export const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let ac=null;
export function beep(freq,dur,type){
  try{
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();
    const o=ac.createOscillator(),g=ac.createGain();
    o.type=type||'triangle';o.frequency.value=freq;
    g.gain.setValueAtTime(.12,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+dur);
    o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+dur);
  }catch(e){}
}

let raf=0;
export function confetti(colors){
  if(reduce) return;
  const cv=document.getElementById('fx'),ctx=cv.getContext('2d');
  cv.width=innerWidth;cv.height=innerHeight;
  const ps=Array.from({length:110},()=>({x:innerWidth/2+(Math.random()-.5)*120,y:innerHeight*.55,
    vx:(Math.random()-.5)*12,vy:-Math.random()*14-4,r:Math.random()*6+4,a:Math.random()*6,
    c:colors[Math.floor(Math.random()*colors.length)]}));
  const t0=performance.now();
  cancelAnimationFrame(raf);
  (function frame(t){
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);ctx.restore();});
    if(t-t0<2400) raf=requestAnimationFrame(frame); else ctx.clearRect(0,0,cv.width,cv.height);
  })(t0);
}
