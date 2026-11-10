import React from 'react';

// A continuously deformed fabric surface, lit from the upper left.
export default function WindFabric() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame, width = 1, height = 1, start = performance.now();
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (motion.matches) draw(performance.now());
    });
    const smooth = x => { x = Math.max(0, Math.min(1, x)); return x*x*(3-2*x); };
    function draw(now) {
      const t = motion.matches ? 12 : (now-start)/1000;
      const opening = smooth((t-1.2)/6.8);
      ctx.clearRect(0,0,width,height);
      for (const side of [0,1]) {
        const cols=76, rows=38;
        const point = (u,v) => {
          const wind = Math.sin(t*1.15-v*5+u*3)*.65 + Math.sin(t*2.1-v*8+u*5)*.25;
          const fold = Math.sin(u*66 + v*1.8 + Math.sin(t*.8-v*3)*v*.7);
          const gather = 1-opening*(.86-.045*Math.sin(v*3.14));
          const free = Math.pow(v,.85);
          const x = u*.505*gather + opening*.026*Math.sin(v*4+t)*free + wind*.012*free + fold*.004*free;
          const y = v*.98 + Math.sin(u*Math.PI)*.035 + opening*.055*Math.sin(u*4+v*3+t*.9)*free;
          return {x:(side ? 1-x : x)*width,y:y*height,z:fold*(.5+free*.5)+wind*free*.5};
        };
        for(let j=0;j<rows;j++) for(let i=0;i<cols;i++) {
          const u=i/cols,v=j/rows;
          const a=point(u,v),b=point((i+1)/cols,v),c=point((i+1)/cols,(j+1)/rows),d=point(u,(j+1)/rows);
          const slope=(b.z-a.z)*6;
          const light=Math.max(13,Math.min(49,29+slope*11+a.z*6-v*4));
          ctx.fillStyle=`hsl(${350+a.z*3} 69% ${light}%)`;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.lineTo(d.x,d.y);ctx.closePath();ctx.fill();
          // Matching stroke seals subpixel seams between fabric panels.
          ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.65;ctx.stroke();
        }
      }
      // A lightweight drape remains across the top after the reveal.
      const grad=ctx.createLinearGradient(0,0,0,height*.14);
      grad.addColorStop(0,'#650c22');grad.addColorStop(.45,'#c5444c');grad.addColorStop(1,'#800d29');
      ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(width,0);
      for(let i=100;i>=0;i--){const u=i/100;ctx.lineTo(u*width,height*(.025+.052*Math.abs(Math.sin(u*Math.PI*2))+.007*Math.sin(u*15-t)*Math.sin(u*Math.PI)));}
      ctx.closePath();ctx.fill();
    }
    function tick(now) { if(!document.hidden) draw(now); frame=requestAnimationFrame(tick); }
    function change(){cancelAnimationFrame(frame);if(motion.matches)draw(performance.now());else{start=performance.now();frame=requestAnimationFrame(tick);}}
    resize.observe(canvas); motion.addEventListener('change',change);change();
    return () => {cancelAnimationFrame(frame);resize.disconnect();motion.removeEventListener('change',change);};
  }, []);
  return <canvas ref={ref} className="wind-fabric" aria-hidden="true" />;
}
