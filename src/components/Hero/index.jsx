import React, { useEffect, useRef } from 'react';
import { Bio } from '../../data/constants';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const run = () => { hero.classList.add('hero-animated'); };
    if (document.body.classList.contains('intro-locked')) {
      const wait = () => {
        if (!document.body.classList.contains('intro-locked')) { run(); }
        else { setTimeout(wait, 120); }
      };
      wait();
    } else {
      setTimeout(run, 200);
    }

    // Parallax
    let ticking = false;
    const inner = hero.querySelector('.hero-l');
    const onScroll = () => {
      if (ticking || !inner) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          inner.style.transform = `translateY(${y * 0.12}px)`;
        } else {
          inner.style.transform = '';
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const triggerNameWave = () => {
    const chars = heroRef.current?.querySelectorAll('.hero-char');
    if (!chars) return;
    chars.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.remove('char-wave');
        void c.offsetWidth;
        c.classList.add('char-wave');
        setTimeout(() => c.classList.remove('char-wave'), 650);
      }, idx * 42);
    });
  };

  return (
    <section id="hero" data-chapter="00" data-chapter-name="Intro" ref={heroRef}>
      <div className="hero-l">
        <div className="hero-eyebrow">Hello, I'm</div>
        <h1 
          className="hero-name" 
          aria-label="Sarthak Joshi"
          onClick={triggerNameWave}
          title="Click to trigger animation"
        >
          <span className="hero-first-name" aria-hidden="true">
            {"Sarthak".split("").map((c, i) => (
              <span key={`fn-${i}`} className="hero-char" style={{ '--i': i }}>
                {c}
              </span>
            ))}
          </span>
          <em aria-hidden="true">
            {"Joshi".split("").map((c, i) => (
              <span key={`ln-${i}`} className="hero-char" style={{ '--i': i + 7 }}>
                {c}
              </span>
            ))}
          </em>
        </h1>
        <div className="hero-title">
          Full Stack Developer<br />
          Software Engineer · DevOps Engineer
        </div>
        <p className="hero-desc">{Bio.description}</p>
        <div className="hero-btns">
          <a className="btn-a" href="#projects">View Work</a>
          <a className="btn-b" href="#contact">Say hello →</a>
          <a className="btn-c" href={Bio.resume} target="_blank" rel="noopener noreferrer">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2.5 9.5 L9.5 2.5 M4 2.5 H9.5 V8" />
            </svg>
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
