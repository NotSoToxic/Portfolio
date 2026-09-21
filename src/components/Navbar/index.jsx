import React, { useEffect, useState } from 'react';
import { Bio } from '../../data/constants';

const Navbar = ({ isDark, toggleTheme, onOpenTerminal }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0, rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll progress
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Work' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Stack' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <div id="scroll-progress"></div>
      <nav>
        <div className="nav-id" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Sarthak Joshi · Full Stack Developer · Software Engineer · DevOps Engineer">
          <span className="logo-at">SJ</span>
          <span className="logo-dot">·</span>
          <sup className="logo-tag">FSD / SDE / DOE</sup>
        </div>
        <div className="nav-quote" id="nav-quote">Code is poetry, deployment is art.</div>
        <div className="nav-r">
          {navLinks.map(link => (
            <a key={link.href} className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`} href={link.href}>{link.label}</a>
          ))}
          <button
            type="button"
            className="nav-terminal-btn"
            onClick={onOpenTerminal}
            title="Open Interactive Terminal (CLI)"
          >
            <svg className="term-icon-svg" width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H1.75zM3.22 4.47a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06-1.06L5.19 7.5 3.22 5.53a.75.75 0 0 1 0-1.06zM7.75 10a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5z"/>
            </svg>
            <span>Terminal</span>
          </button>
          <a className="nav-resume" href={Bio.resume} target="_blank" rel="noopener noreferrer" title="View resume PDF">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 9.5 L9.5 2.5 M4 2.5 H9.5 V8" />
            </svg>
            <span>Resume</span>
          </a>
          <div className="toggle-wrap">
            <span className={`toggle-label${!isDark ? ' active' : ''}`} id="lbl-light">Light</span>
            <label className="switch">
              <input type="checkbox" id="theme-switch" checked={isDark} onChange={() => toggleTheme()} />
              <div className="switch-track"><div className="switch-thumb"></div></div>
            </label>
            <span className={`toggle-label${isDark ? ' active' : ''}`} id="lbl-dark">Dark</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
