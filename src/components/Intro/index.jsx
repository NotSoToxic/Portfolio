import React, { useEffect, useRef, useState } from 'react';

const Intro = ({ onFinish, isDark, toggleTheme }) => {
  const introRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const finishedRef = useRef(false);
  const touchYRef = useRef(null);
  const rafRef = useRef(null);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.__bgSpeed = 1;
    const intro = introRef.current;
    if (intro) intro.classList.add('hidden');
    document.body.classList.remove('intro-locked');
    document.body.classList.add('intro-revealing');
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.body.classList.remove('intro-revealing');
      if (intro) {
        intro.setAttribute('aria-hidden', 'true');
        intro.style.display = 'none';
      }
      if (onFinish) onFinish();
    }, 1000);
  };

  useEffect(() => {
    const STEP = 1 / 32;
    const TOUCH_STEP = 1 / 420;

    const onWheel = (e) => {
      if (finishedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      const dir = Math.sign(e.deltaY);
      const mag = clamp(Math.abs(e.deltaY) / 100, 0.4, 1.8);
      targetRef.current = clamp(targetRef.current + dir * STEP * mag, 0, 1);
    };

    const onTouchStart = (e) => {
      if (finishedRef.current) return;
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (finishedRef.current || touchYRef.current == null) return;
      e.preventDefault();
      e.stopPropagation();
      const y = e.touches[0].clientY;
      const dy = touchYRef.current - y;
      touchYRef.current = y;
      targetRef.current = clamp(targetRef.current + dy * TOUCH_STEP, 0, 1);
    };

    const onTouchEnd = () => { touchYRef.current = null; };

    const onKey = (e) => {
      if (finishedRef.current) return;
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      finish();
    };

    const onClick = (e) => {
      if (finishedRef.current) return;
      if (e.target.closest && e.target.closest('#intro-theme-btn')) return;
      finish();
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('keydown', onKey, { capture: true });
    if (introRef.current) introRef.current.addEventListener('click', onClick, { capture: true });

    try { window.history.scrollRestoration = 'manual'; } catch (ex) { /* ignore */ }

    const tick = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, 0.14);
      if (Math.abs(currentRef.current - targetRef.current) < 0.0005) currentRef.current = targetRef.current;
      setProgress(currentRef.current);

      if (!finishedRef.current && targetRef.current >= 0.999 && currentRef.current >= 0.995) {
        finish();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('touchend', onTouchEnd, { capture: true });
      window.removeEventListener('keydown', onKey, { capture: true });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line
  }, []);

  const p = progress;
  const phase = p < 0.33 ? 'boot' : p < 0.60 ? 'identity' : p < 0.95 ? 'pipeline' : 'ready';

  // Scene opacities
  const termOp = clamp(1 - (p - 0.33) / 0.07, 0, 1);
  const glyphIn = clamp((p - 0.33) / 0.09, 0, 1);
  const glyphOut = clamp(1 - (p - 0.60) / 0.08, 0, 1);
  const glyphOp = glyphIn * glyphOut;
  const glyphScale = lerp(0.88, 1.0, smooth(glyphIn));
  const pipeIn = clamp((p - 0.58) / 0.10, 0, 1);
  const pipeOut = clamp(1 - (p - 0.93) / 0.07, 0, 1);
  const pipeOp = pipeIn * pipeOut;

  const recCount = Math.floor(lerp(0, 1247832, smooth(clamp((p - 0.55) / 0.40, 0, 1)))).toLocaleString();
  const dagN = Math.floor(lerp(0, 23, smooth(clamp((p - 0.05) / 0.25, 0, 1))));

  // Term lines visibility (Linux commands)
  const termLines = [
    { show: 0.00, content: <><span className="pr">sarthak@linux-node:~$</span> uname -srmo</> },
    { show: 0.02, content: <><span className="dim">Linux 6.8.0-aws-cloud x86_64 GNU/Linux</span></> },
    { show: 0.05, content: <><span className="pr">sarthak@linux-node:~$</span> whoami && id -un</> },
    { show: 0.09, content: <>sarthak_joshi <span className="dim">{"// software_engineer · devops"}</span></> },
    { show: 0.13, content: <><span className="pr">sarthak@linux-node:~$</span> systemctl status portfolio.service</> },
    { show: 0.17, content: <><span className="ok">●</span> portfolio.service - Active: <span className="ok">active (running)</span> <span className="dim">· 99.95% uptime</span></> },
    { show: 0.21, content: <><span className="pr">sarthak@linux-node:~$</span> ls -la /opt/stack/</> },
    { show: 0.25, content: <><span className="dim">drwxr-xr-x</span> <span className="ok">aws/</span>  <span className="ok">react/</span>  <span className="ok">python/</span>  <span className="ok">docker/</span>  <span className="ok">django/</span>  <span className="ok">node/</span></> },
    { show: 0.28, content: <><span className="pr">sarthak@linux-node:~$</span> ./deploy_portfolio.sh --env=production<span className="cur">▋</span></> },
    { show: 0.31, content: <><span className="ok">[✓]</span> System initialized. Launching interactive portfolio...</> },
  ];

  // DAG nodes data for Sarthak's timeline
  const dagYears = [
    { x: 110, at: 0.60, label: '2003' },
    { x: 280, at: 0.62, label: '2019' },
    { x: 450, at: 0.64, label: '2021' },
    { x: 620, at: 0.66, label: '2022' },
    { x: 790, at: 0.70, label: '2024' },
    { x: 960, at: 0.74, label: 'now' },
    { x: 1120, at: 0.78, label: '?' },
  ];

  const dagNodes = [
    { x: 70, y: 160, w: 130, at: 0.60, label: 'start', status: 'ok' },
    { x: 225, y: 160, w: 145, at: 0.62, label: 'hello_world', status: 'ok' },
    { x: 395, y: 160, w: 145, at: 0.64, label: 'enroll.vit', status: 'ok' },
    { x: 565, y: 160, w: 145, at: 0.66, label: 'first_intern', status: 'ok' },
    { x: 735, y: 160, w: 145, at: 0.68, label: 'build_apps', status: 'ok' },
    { x: 905, y: 110, w: 145, at: 0.72, label: 'ship_things', status: 'ok' },
    { x: 905, y: 210, w: 145, at: 0.72, label: 'stay_curious', status: 'run' },
    { x: 1075, y: 160, w: 65, at: 0.76, label: '???', status: 'pending' },
  ];

  const dagEdges = [
    { x1: 200, y1: 180, x2: 225, y2: 180, at: 0.62 },
    { x1: 370, y1: 180, x2: 395, y2: 180, at: 0.64 },
    { x1: 540, y1: 180, x2: 565, y2: 180, at: 0.66 },
    { x1: 710, y1: 180, x2: 735, y2: 180, at: 0.68 },
    { x1: 880, y1: 180, x2: 905, y2: 130, at: 0.72 },
    { x1: 880, y1: 180, x2: 905, y2: 230, at: 0.72 },
    { x1: 1050, y1: 130, x2: 1075, y2: 180, at: 0.76 },
    { x1: 1050, y1: 230, x2: 1075, y2: 180, at: 0.76 },
  ];

  const packetT = clamp((p - 0.60) / 0.30, 0, 1);
  const packetX = lerp(100, 970, packetT);

  return (
    <div id="intro" ref={introRef} aria-hidden="false">
      <div className="intro-bg"></div>
      <div className="intro-grid"></div>

      {/* HUD corners */}
      <div className="intro-hud hud-tl">
        <div className="hud-line">sys.portfolio.boot</div>
        <div className="hud-line dim">build <span id="hud-build">2026.09.21</span></div>
        <div className="hud-line dim">host <span id="hud-host">sj.exe</span></div>
      </div>
      <div className="intro-hud hud-tr">
        <div className="hud-line">progress <span id="hud-prog">{String(Math.round(p * 100)).padStart(2, '0')}%</span></div>
        <div className="hud-line dim">strike any key to breach</div>
        <div className="hud-line dim">esc / click to bypass</div>
      </div>
      <div className="intro-hud hud-bl">
        <div className="hud-line dim">[phase] <span id="hud-phase">{phase}</span></div>
      </div>
      <div className="intro-hud hud-br">
        <div className="hud-line dim">records <span id="hud-rec">{recCount}</span></div>
        <div className="hud-line dim">tasks   <span id="hud-dags">{dagN}/23</span></div>
      </div>

      {/* Scene 1: Terminal */}
      <div className={`intro-scene scene-term${termOp > 0.01 ? ' on' : ''}`} id="scene-term" style={{ opacity: termOp.toFixed(3) }}>
        <div className="term-window">
          <div className="term-head">
            <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
            <span className="term-title">sarthak@linux-node: ~ (bash)</span>
          </div>
          <div className="term-body" id="term-body">
            {termLines.map((line, i) => (
              <div key={i} className={`t-line${p >= line.show ? ' visible' : ''}`}>{line.content}</div>
            ))}

            <div className={`t-line${p >= 0.1 ? ' visible' : ''} term-niche-hint`}>
              {"/* ⚡ strike any key to bootstrap consciousness · breach system */"}
            </div>
            <div className={`t-line${p >= 0.12 ? ' visible' : ''} term-cli-line`} style={{ cursor: 'pointer' }}>
              <span className="pr">sarthak@linux-node:~$</span>
              <span style={{ color: '#ede8de', opacity: 0.9 }}>press any key to breach</span>
              <span className="cur">▋</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scene 2: SJ glyph */}
      <div className={`intro-scene scene-glyph${glyphOp > 0.01 ? ' on' : ''}`} id="scene-glyph" style={{ opacity: glyphOp.toFixed(3) }}>
        <div className="glyph-wrap" id="glyph-wrap" style={{ transform: `scale(${glyphScale})` }}>
          <div className="glyph-meta top">{"// identity.resolved"}</div>
          <div className="glyph-at"><em>SJ</em><span className="glyph-dot">·</span></div>
          <div className="glyph-tag">Sarthak Joshi - Software Engineer</div>
          <div className="glyph-rule"></div>
          <div className="glyph-meta bot">FSD / SDE / DOE</div>
        </div>
      </div>

      {/* Scene 3: Life DAG */}
      <div className={`intro-scene scene-pipe${pipeOp > 0.01 ? ' on' : ''}`} id="scene-pipe" style={{ opacity: pipeOp.toFixed(3) }}>
        <div className="pipe-title">{"// life.dag - run_id: since_2003 · state: "}<span className="lbl-ok">running</span></div>
        <svg className="pipe-svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <g className="pipe-rules">
            <line x1="60" x2="1140" y1="60" y2="60" className="rule" />
            <line x1="60" x2="1140" y1="320" y2="320" className="rule" />
            <text x="60" y="48" className="lane-label">timeline</text>
            <text x="1140" y="340" textAnchor="end" className="lane-label">→ present</text>
          </g>
          <g className="pipe-years">
            {dagYears.map((yr, i) => (
              <g key={i} className={`yr${p >= yr.at ? ' on' : ''}`}><text x={yr.x} y="88">{yr.label}</text></g>
            ))}
          </g>
          <g className="pipe-edges" stroke="currentColor" fill="none" strokeWidth="1.2">
            {dagEdges.map((e, i) => (
              <line key={i} className={`edge${p >= e.at ? ' on' : ''}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} markerEnd="url(#ah)" />
            ))}
          </g>
          <g className="pipe-nodes airflow">
            {dagNodes.map((n, i) => (
              <g key={i} className={`node ${n.status}${p >= n.at ? ' on' : ''}`}>
                <rect x={n.x} y={n.y} width={n.w} height="40" rx="4" />
                <circle cx={n.x + 15} cy={n.y + 20} r="4" className="status" />
                <text x={n.x + 30} y={n.y + 25}>{n.label}</text>
              </g>
            ))}
          </g>
          <circle id="packet" className="packet" r="3.5" cx={packetX} cy="180" style={{ opacity: pipeOp < 0.1 ? 0 : 0.95 }} />
        </svg>
        <div className="pipe-legend">
          <span className="lg"><span className="lg-dot ok"></span>success</span>
          <span className="lg"><span className="lg-dot run"></span>running</span>
          <span className="lg"><span className="lg-dot pending"></span>scheduled</span>
          <span className="lg muted">tasks 8 · failed 0 · retries: who's counting</span>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="intro-progress">
        <div className="intro-progress-bar" id="intro-bar" style={{ '--p': `${(p * 100).toFixed(1)}%` }}></div>
        <div className="intro-progress-ticks">
          <span className="tick" style={{ left: '0%' }}></span>
          <span className="tick" style={{ left: '33%' }}></span>
          <span className="tick" style={{ left: '66%' }}></span>
          <span className="tick" style={{ left: '100%' }}></span>
        </div>
        <div className="intro-progress-labels">
          <span>boot</span><span>identity</span><span>pipeline</span><span>ready</span>
        </div>
      </div>

      {/* Scroll hint with niche reference */}
      <div className={`intro-hint${p > 0.04 ? ' fade' : ''}`}>
        <div className="hint-chev"><span>↓</span><span>↓</span><span>↓</span></div>
        <div className="hint-text">strike any key to breach · scroll to decrypt</div>
      </div>

      {/* Theme toggle */}
      <button className="intro-theme-btn" id="intro-theme-btn" onClick={(e) => { e.stopPropagation(); toggleTheme(); }}>
        <span className="tb-icon" id="intro-theme-icon">{isDark ? '☀' : '☾'}</span>
        <span id="intro-theme-label">{isDark ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </div>
  );
};

export default Intro;
