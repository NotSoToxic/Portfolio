import React, { useEffect, useRef } from 'react';
import { Bio } from '../../data/constants';

const ICONS = {
  email: `<svg width="18" height="18" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="1" width="16" height="12" rx="1"/><path d="M1 4l8 5 8-5"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.5 1.5h4l2 5-2.5 1.5a11 11 0 005 5L12.5 11l5 2v4c0 .8-4 3-9-2s-7.8-9-6-12.5z"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><rect x="1" y="6" width="3.5" height="11"/><circle cx="2.75" cy="2.75" r="1.75"/><path d="M6.5 6h3v1.6s.8-1.6 3-1.6c2.4 0 4 1.4 4 4.4V17h-3.5v-6c0-1.3-.6-2-1.7-2s-1.8.8-1.8 2V17H6.5V6z"/></svg>`,
  github: `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path fill-rule="evenodd" d="M9 0C4 0 0 4 0 9c0 4 2.6 7.4 6.2 8.6.5.1.6-.2.6-.5v-1.7c-2.6.6-3.1-1.2-3.1-1.2-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.3.8 1.3.8.7 1.2 1.9 1 2.3.8.1-.5.3-.9.5-1.1-1.9-.2-3.8-1-3.8-4.3 0-1 .3-1.8.8-2.5-.1-.2-.4-1.1.1-2.4 0 0 .7-.2 2.4.8.7-.2 1.4-.3 2.1-.3s1.4.1 2.1.3c1.7-1 2.4-.8 2.4-.8.4 1.2.2 2.1.1 2.4.5.6.8 1.4.8 2.5 0 3.4-2 4.2-3.9 4.4.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4C15.4 16.4 18 13 18 9 18 4 14 0 9 0z"/></svg>`,
  portfolio: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="9" cy="9" r="7.5"/><ellipse cx="9" cy="9" rx="3.2" ry="7.5"/><line x1="1.5" y1="9" x2="16.5" y2="9"/></svg>`,
};

const Contact = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    observer.observe(grid);

    // Contact stagger
    const links = grid.querySelectorAll('.c-link');
    links.forEach((link, i) => { link.style.transitionDelay = (i * 70) + 'ms'; });
    const sObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { grid.classList.add('contact-revealed'); sObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    sObs.observe(grid);

    const label = grid.parentElement?.querySelector('.sec-label');
    if (label) {
      const labelObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('label-in'); labelObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      labelObs.observe(label);
    }

    return () => { observer.disconnect(); sObs.disconnect(); };
  }, []);

  const contactLinks = [
    { type: 'Email', label: Bio.email || 'sarthak.joshi52@gmail.com', icon: 'email', href: `mailto:${Bio.email || 'sarthak.joshi52@gmail.com'}`, external: false },
    { type: 'Phone', label: `+91 ${Bio.phone || '9654298033'}`, icon: 'phone', href: `tel:+91${Bio.phone || '9654298033'}`, external: false },
    { type: 'LinkedIn', label: 'LinkedIn Profile', icon: 'linkedin', href: Bio.linkedin, external: true },
    { type: 'GitHub', label: 'GitHub Profile', icon: 'github', href: Bio.github, external: true },
  ];

  return (
    <section id="contact" data-chapter="05" data-chapter-name="Contact">
      <div className="sec-label"><span className="sec-num">05</span> Contact</div>
      <div className="contact-grid reveal" ref={gridRef}>
        <div>
          <div className="contact-big">
            Let's build something<strong>together.</strong>
          </div>
          <p className="contact-note">
            I'm always interested in hearing about new opportunities,
            collaborative projects, or even just a friendly hello. If you have a question
            or just want to say hi, my inbox is always open.
          </p>
        </div>
        <div className="contact-links">
          {contactLinks.map((link, i) => (
            <a key={i} className="c-link" href={link.href} target={link.external ? '_blank' : '_self'} rel="noreferrer">
              <div className="c-link-icon" dangerouslySetInnerHTML={{ __html: ICONS[link.icon] }}></div>
              <div className="c-link-l">
                <span className="c-link-type">{link.type}</span>
                <span className="c-link-label">{link.label}</span>
              </div>
              <span className="c-link-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
