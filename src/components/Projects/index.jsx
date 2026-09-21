import React, { useEffect, useRef } from 'react';
import { projects } from '../../data/constants';

const Projects = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    observer.observe(grid);

    // Section label sweep
    const label = grid.parentElement?.querySelector('.sec-label');
    if (label) {
      const labelObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('label-in'); labelObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      labelObs.observe(label);
    }

    // Card tilt
    const cards = grid.querySelectorAll('.proj-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        const maxTilt = 5;
        card.style.transform = `perspective(800px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" data-chapter="01" data-chapter-name="Projects">
      <div className="sec-label"><span className="sec-num">01</span> Projects</div>
      <div className="proj-grid reveal" ref={gridRef}>
        {projects.map((project, index) => {
          const num = String(index + 1).padStart(2, '0');
          const hasRepo = Boolean(project.github && project.github.trim());
          const hasLive = Boolean(project.webapp && project.webapp.trim());

          return (
            <div key={index} className="proj-card" data-num={num}>
              <div className="proj-status">
                <span className={`proj-dot${hasLive ? '' : ' wip'}`}></span>
                {hasLive ? 'Live' : 'Source only'}
              </div>
              <div className="proj-title">{project.title}</div>
              <div className="proj-desc">
                {Array.isArray(project.description) ? (
                  <ul className="proj-desc-list">
                    {project.description.map((bullet, bi) => (
                      <li key={bi} className="proj-desc-item">
                        {bullet.replace(/^\[(.*?)\]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
              <div className="proj-stack">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="proj-chip">{tag}</span>
                ))}
              </div>
              {(hasRepo || hasLive) && (
                <div className="proj-actions">
                  {hasRepo && (
                    <a
                      className="proj-btn proj-btn--repo"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="View Project Repository"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      <span>Project Repo</span>
                    </a>
                  )}
                  {hasLive && (
                    <a
                      className="proj-btn proj-btn--live"
                      href={project.webapp}
                      target="_blank"
                      rel="noreferrer"
                      title="View Live Demo"
                    >
                      <span className="proj-live-indicator"></span>
                      <span>Live Demo</span>
                      <span className="proj-btn-arrow">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
