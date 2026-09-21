import React, { useEffect, useRef } from 'react';
import { experiences } from '../../data/constants';

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reveal animation
    const reveals = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    reveals.forEach(el => observer.observe(el));

    // Section label
    const label = container.parentElement?.querySelector('.sec-label');
    if (label) {
      const labelObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('label-in'); labelObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      labelObs.observe(label);
    }

    return () => observer.disconnect();
  }, []);

  // Sort experiences by id descending (most recent first)
  const sortedExp = [...experiences].sort((a, b) => b.id - a.id);

  return (
    <section id="experience" data-chapter="02" data-chapter-name="Experience">
      <div className="sec-label"><span className="sec-num">02</span> Experience</div>
      <div className="exp-container" ref={containerRef}>
        {sortedExp.map((exp, index) => (
          <div key={index} className="exp reveal">
            <div className="exp-main">
              <div className="exp-meta-line">
                <span>{exp.date}</span>
                <span className="exp-meta-sep">·</span>
                <span>{exp.company}</span>
                <span className="exp-meta-sep">·</span>
                <span className="exp-tag-inline">{exp.role}</span>
              </div>
              <h3>{exp.role} at {exp.company}</h3>
              {exp.kpis && (
                <div className="exp-kpis">
                  {exp.kpis.map((kpi, i) => (
                    <div key={i} className="kpi">
                      <div className="kpi-val">{kpi.value}</div>
                      <div className="kpi-lab">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <ul className="exp-pts">
                {(Array.isArray(exp.desc)
                  ? exp.desc
                  : exp.desc.split('. ').filter(s => s.trim())
                ).map((bullet, i) => (
                  <li key={i}>{bullet.trim().endsWith('.') ? bullet.trim() : bullet.trim() + '.'}</li>
                ))}
              </ul>
              {exp.skills && (
                <div className="proj-stack" style={{ marginTop: '20px' }}>
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="proj-chip">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
