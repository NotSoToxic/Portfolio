import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = ({ isDark }) => {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const tRef = useRef(0);
  const introStartRef = useRef(performance.now());
  const INTRO_DUR = 4200;

  const buildWordMask = (word, width, height) => {
    const off = document.createElement('canvas');
    off.width = width; off.height = height;
    const c = off.getContext('2d');
    c.fillStyle = '#000';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    const fontSize = Math.min(width, height) * 0.7;
    c.font = `900 italic ${fontSize}px Fraunces, "Times New Roman", Georgia, serif`;
    c.fillText(word, width / 2, height / 2);
    const data = c.getImageData(0, 0, width, height).data;
    return (px, py) => {
      const x = px | 0, y = py | 0;
      if (x < 0 || y < 0 || x >= width || y >= height) return false;
      return data[(y * width + x) * 4 + 3] > 80;
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    const initCanvas = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const lines = [];
      const step = 30;
      const cols = Math.ceil(W / step);
      const rows = Math.ceil(H / step);
      const mask = buildWordMask('SJ', W, H);
      introStartRef.current = performance.now();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const jx = (Math.random() - .5) * 8;
          const jy = (Math.random() - .5) * 8;
          const bx = i * step + step / 2 + jx;
          const by = j * step + step / 2 + jy;
          const onGlyph = mask(bx, by);
          const cx = W / 2, cy = H / 2;
          const patternAngle = Math.atan2(by - cy, bx - cx) + Math.PI / 2;
          lines.push({
            x: bx, y: by, baseX: bx, baseY: by,
            vx: 0, vy: 0,
            angle: patternAngle + (Math.random() - .5) * 0.3,
            baseAngle: patternAngle, spin: 0,
            speed: .22 + Math.random() * .3,
            len: onGlyph ? 16 + Math.random() * 4 : 9 + Math.random() * 6,
            alpha: onGlyph ? .28 : .2 + Math.random() * .12,
            exploded: 0, onGlyph,
            revealDelay: onGlyph ? (bx / W) * 1400 : 600 + Math.random() * 1400
          });
        }
      }
      linesRef.current = lines;
    };

    initCanvas();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initCanvas);
    }

    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(initCanvas, 150); };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Click explosion
    const onDocClick = (e) => {
      const cx = e.clientX, cy = e.clientY;
      const radius = 280;
      linesRef.current.forEach(ln => {
        const dx = ln.baseX - cx, dy = ln.baseY - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < radius) {
          const falloff = 1 - d / radius;
          const ang = Math.atan2(dy, dx);
          const force = 14 + falloff * 22 + Math.random() * 4;
          ln.vx += Math.cos(ang) * force;
          ln.vy += Math.sin(ang) * force;
          ln.spin = (Math.random() - 0.5) * 0.6 * falloff;
          ln.exploded = Math.max(ln.exploded, 0.55 + falloff * 0.45);
        }
      });

      // Shockwave ring
      const ring = document.createElement('div');
      ring.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:4px;height:4px;border:1px solid var(--accent);border-radius:50%;transform:translate(-50%,-50%);z-index:9996;pointer-events:none;will-change:transform,opacity;`;
      document.body.appendChild(ring);
      let r = 4, op = 0.7;
      const grow = () => {
        r += 14; op -= 0.035;
        ring.style.width = r + 'px'; ring.style.height = r + 'px';
        ring.style.opacity = op;
        ring.style.borderWidth = Math.max(0.3, 1.5 - r / 240) + 'px';
        if (op > 0) requestAnimationFrame(grow); else ring.remove();
      };
      requestAnimationFrame(grow);

      // Spark particles
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
        p.className = 'burst-p';
        p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:1.5px;height:${6 + Math.random() * 6}px;background:var(--accent);z-index:9996;pointer-events:none;transform:translate(-50%,-50%) rotate(${ang}rad);opacity:.8;`;
        document.body.appendChild(p);
        let px = cx, py = cy, vx = Math.cos(ang) * (6 + Math.random() * 8), vy = Math.sin(ang) * (6 + Math.random() * 8), o = 0.8;
        const fly = () => {
          vx *= 0.94; vy *= 0.94; vy += 0.15;
          px += vx; py += vy; o -= 0.035;
          p.style.left = px + 'px'; p.style.top = py + 'px'; p.style.opacity = o;
          if (o > 0) requestAnimationFrame(fly); else p.remove();
        };
        requestAnimationFrame(fly);
      }
    };
    document.addEventListener('click', onDocClick);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      tRef.current += .007 * (window.__bgSpeed !== undefined ? window.__bgSpeed : 1);
      const dark = document.body.classList.contains('dark');
      const fl = dark ? '238,220,195' : '45,30,18';
      const fa = dark ? '245,158,11' : '217,101,11';
      const now = performance.now();
      const intro = Math.min(1, Math.max(0, (now - introStartRef.current) / INTRO_DUR));
      const mouse = mouseRef.current;
      const lines = linesRef.current;
      const t = tRef.current;

      lines.forEach(ln => {
        const localT = Math.max(0, (now - introStartRef.current - ln.revealDelay) / 900);
        const revealed = Math.min(1, localT);
        const dissolve = Math.max(0, (intro - 0.85) / 0.15);

        if (ln.exploded > 0.001) {
          ln.x += ln.vx; ln.y += ln.vy;
          ln.vx *= 0.955; ln.vy *= 0.955;
          ln.angle += ln.spin; ln.spin *= 0.96;
          ln.x += (ln.baseX - ln.x) * 0.012 * (1 - ln.exploded);
          ln.y += (ln.baseY - ln.y) * 0.012 * (1 - ln.exploded);
          ln.exploded *= 0.975;
          if (ln.exploded < 0.02) {
            ln.exploded = 0;
            ln.x += (ln.baseX - ln.x) * 0.08;
            ln.y += (ln.baseY - ln.y) * 0.08;
          }
        } else {
          ln.x += (ln.baseX - ln.x) * 0.1;
          ln.y += (ln.baseY - ln.y) * 0.1;
        }

        const dx = mouse.x - ln.x, dy = mouse.y - ln.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - dist / 160);

        if (ln.exploded < 0.05) {
          let target;
          if (dist < 160) {
            target = Math.atan2(dy, dx) + Math.PI / 2;
          } else if (intro < 1 && ln.onGlyph) {
            target = ln.baseAngle;
          } else {
            target = ln.angle + Math.sin(t * ln.speed + ln.baseX * .016 + ln.baseY * .016) * .65;
          }
          ln.angle += (target - ln.angle) * (ln.onGlyph && intro < 1 ? .12 : .05);
        }

        const glyphBoost = ln.onGlyph ? (1 - dissolve) * 0.18 : 0;
        const a = (ln.alpha + glyphBoost + inf * .1 + ln.exploded * .25) * revealed;
        const isAcc = inf > .4 || ln.exploded > 0.15 || (ln.onGlyph && intro < 0.95);

        ctx.beginPath();
        ctx.moveTo(ln.x - Math.cos(ln.angle) * ln.len * .5, ln.y - Math.sin(ln.angle) * ln.len * .5);
        ctx.lineTo(ln.x + Math.cos(ln.angle) * ln.len * .5, ln.y + Math.sin(ln.angle) * ln.len * .5);
        ctx.strokeStyle = isAcc
          ? `rgba(${fa},${Math.min(a * 1.4, .35)})`
          : `rgba(${fl},${a})`;
        ctx.lineWidth = isAcc ? 1.1 : .6;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
};

export default BackgroundCanvas;
