import React, { useState, useEffect, useRef } from 'react';
import { Bio } from '../../data/constants';

const TerminalModal = ({ isOpen, onClose, isDark, toggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'banner',
      content: [
        '┌─────────────────────────────────────────────────────────────┐',
        '│   SARTHAK JOSHI — INTERACTIVE PORTFOLIO TERMINAL v2.4       │',
        '│   Type a command or click a quick suggestion to begin       │',
        '└─────────────────────────────────────────────────────────────┘',
      ]
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Auto-focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runCommand = (cmdString) => {
    const raw = cmdString.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    setCmdHistory(prev => [...prev, raw]);
    setHistoryPointer(-1);

    const newEntries = [{ type: 'cmd', text: raw }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'help',
          lines: [
            'AVAILABLE COMMANDS:',
            '  skills      — Summarized technical stack (Languages, Frameworks, Cloud, DBs)',
            '  work / exp  — Work experience at Strategyz, Axlrate & Alphabet with metrics',
            '  projects    — Featured architectures & GitHub links',
            '  edu         — Education details (VIT CSE, Grades & Timeline)',
            '  contact     — Email, phone, GitHub, LinkedIn profiles',
            '  resume      — View & open Sarthak\'s resume PDF',
            '  whoami      — Biography & engineering overview',
            '  theme       — Toggle Light / Dark mode',
            '  clear       — Clear terminal history',
            '  exit        — Close terminal shell'
          ]
        });
        break;

      case 'skills':
      case 'stack':
        newEntries.push({
          type: 'skills',
          sections: [
            { cat: 'PROGRAMMING', items: 'Python, C++, Java, JavaScript, TypeScript, SQL, HTML5/CSS3' },
            { cat: 'FRAMEWORKS', items: 'React, Vite, Node.js, Express, Django, Spring Boot, Redux' },
            { cat: 'CLOUD & DEVOPS', items: 'AWS (EC2, Lambda, S3, VPC, ALB, CloudFront), Docker, Kubernetes, Git, GitHub Actions, Linux' },
            { cat: 'DATABASES', items: 'PostgreSQL, MongoDB, MySQL, DynamoDB' }
          ]
        });
        break;

      case 'work':
      case 'exp':
      case 'experience':
        newEntries.push({
          type: 'work',
          entries: [
            {
              role: 'Software Developer',
              company: 'Strategyz Inc.',
              period: '2025 – Present | Gurgaon, India',
              bullets: [
                'Engineered automated SharePoint trigger pipelines reducing manual follow-ups by 40%.',
                'Architected AWS backend microservices sustaining 99.9% uptime and slashing infrastructure costs by 30%.',
                'Executed frictionless M365 tenant migration for 100+ active enterprise users with zero downtime.',
                'Streamlined CI/CD automation via GitHub Actions, accelerating release cycles by 65%.'
              ]
            },
            {
              role: 'Data Science Intern',
              company: 'Axlrate Research',
              period: '2024 – 2025 | Bengaluru, India',
              bullets: [
                'Engineered predictive analytics pipelines boosting operational forecasting efficiency by 15%.',
                'Automated high-throughput data extraction, trimming weekly analysis overhead by 30%.'
              ]
            },
            {
              role: 'Process Developer',
              company: 'Alphabet Inc',
              period: '2023 – 2024 | Gurgaon, India',
              bullets: [
                'Automated enterprise HR workflows through SharePoint, eliminating 35% of manual administrative tasks.',
                'Scripted automated onboarding triggers accelerating cross-departmental processing by 20%.'
              ]
            }
          ]
        });
        break;

      case 'projects':
      case 'proj':
        newEntries.push({
          type: 'projects',
          projects: [
            {
              title: 'Auto Blog Scale Infra',
              stack: 'Python · Django · AWS · VPC · ALB · Lambda · DynamoDB · CloudFront · Route 53',
              bullets: [
                'Architected a secure, fault-tolerant blog application infrastructure on AWS using VPC, ALB, and Auto Scaling Groups across multiple AZs, ensuring high availability and zero single points of failure.',
                'Automated media processing by triggering AWS Lambda functions on S3 upload events to index objects into DynamoDB, streamlining data pipeline efficiency.',
                'Enhanced application security and performance by implementing CloudFront CDN with Route 53 failover routing and ACM-secured HTTPS connections across all traffic layers.'
              ],
              live: Bio.github ? 'Available' : 'N/A',
              repo: 'https://github.com/NotSoToxic/AutoBlog-Infra'
            },
            {
              title: 'Ware2Go',
              stack: 'React · Vite · Google Maps API · Gemini AI · Node.js · Spring Boot',
              bullets: [
                'Created a responsive logistics interface using React and Vite, integrating Google Maps API and Gemini AI for route optimization, reducing delivery distance by 25% in simulations.',
                'Enabled real-time, AI-assisted routing with dynamic UI updates, improving simulated order fulfillment speed by 30% over baseline models.',
                'Preparing Spring Boot backend migration to enable scalable order processing, RESTful APIs, and future integration of predictive analytics and a mobile-first interface.'
              ],
              live: Bio.github ? 'Available' : 'N/A',
              repo: 'https://github.com/sarthakjoshi52'
            },
            {
              title: 'Mala Spirit Counter',
              stack: 'TypeScript · React · TanStack Start · PWA · Capacitor · Web Audio API · Nitro',
              bullets: [
                'Architected an offline-first, devotional digital mala bead counter with zero logins, zero servers, and 100% client-side data privacy using TypeScript, React, and TanStack Start.',
                'Engineered an interactive 3D SVG progress ring with real-time Web Audio API chime synthesis and integrated Capacitor plugins for native haptic feedback and local meditation reminders across iOS and Android.',
                'Implemented Workbox PWA caching strategies and Nitro edge SSR build presets, achieving sub-second load times and flawless offline functionality without transmitting telemetry data.'
              ],
              live: 'https://mala-jaap.amplr.in',
              repo: 'https://github.com/NotSoToxic/mala-spirit-counter'
            }
          ]
        });
        break;

      case 'edu':
      case 'education':
        newEntries.push({
          type: 'edu',
          schools: [
            {
              inst: 'Vellore Institute of Technology (VIT)',
              degree: 'Bachelor of Technology in Computer Science & Engineering',
              dates: '2021 – 2025',
              grade: 'CGPA: 8.88 / 10.0'
            },
            {
              inst: 'Adarsh Jain Dharmic Shiksha Sadan',
              degree: 'Senior Secondary (Class XII) PCM',
              dates: '2020 – 2021',
              grade: 'Score: 86.0%'
            }
          ]
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'contact',
          info: [
            { label: 'Email', val: 'sarthak.joshi52@gmail.com', link: 'mailto:sarthak.joshi52@gmail.com' },
            { label: 'Phone', val: '+91 9654298033', link: 'tel:+919654298033' },
            { label: 'LinkedIn', val: 'linkedin.com/in/sarthak-joshi-51111621a', link: 'https://www.linkedin.com/in/sarthak-joshi-51111621a/' },
            { label: 'GitHub', val: 'github.com/sarthakjoshi52', link: 'https://github.com/sarthakjoshi52' }
          ]
        });
        break;

      case 'resume':
        window.open(Bio.resume, '_blank', 'noopener,noreferrer');
        newEntries.push({
          type: 'text',
          lines: [
            '[✓] Opening Sarthak Joshi\'s resume in a new tab...',
            'Direct Link: ' + Bio.resume
          ]
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'text',
          lines: [
            'Sarthak Joshi — Full Stack Engineer, Cloud Architect & SharePoint Developer.',
            'B.Tech CSE from VIT (CGPA: 8.88). Passionate about high-throughput distributed architectures, cloud automation (AWS), enterprise process flows, and modern interactive web engineering.'
          ]
        });
        break;

      case 'theme':
        if (toggleTheme) toggleTheme();
        newEntries.push({
          type: 'text',
          lines: [`[✓] Switched theme to: ${!isDark ? 'Dark mode' : 'Light mode'}`]
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
      case 'close':
        onClose();
        return;

      case 'sudo':
        newEntries.push({
          type: 'text',
          lines: ['[sudo] password for guest: *******', 'Nice try! User guest is not in sudoers file. This incident will be reported. 🎅']
        });
        break;

      case 'matrix':
        newEntries.push({
          type: 'text',
          lines: ['Wake up, Neo...', 'The Matrix has you.', 'Follow the white rabbit. 🐇']
        });
        break;

      default:
        newEntries.push({
          type: 'error',
          lines: [
            `zsh: command not found: ${raw}`,
            "Type 'help' to see valid commands or click any quick chip below."
          ]
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    }
  };

  const quickPills = ['skills', 'work', 'projects', 'edu', 'contact', 'resume', 'whoami', 'clear', 'exit'];

  return (
    <div className="term-modal-backdrop" onClick={onClose}>
      <div className="term-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Chrome Header */}
        <div className="term-modal-head">
          <div className="term-dots">
            <span className="dot r" onClick={onClose} title="Close terminal"></span>
            <span className="dot y" title="Minimize"></span>
            <span className="dot g" title="Expand"></span>
          </div>
          <div className="term-modal-title">sarthak@portfolio: ~ (zsh)</div>
          <div className="term-modal-esc" onClick={onClose}>[ESC]</div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="term-pills-bar">
          <span className="pills-label">QUICK:</span>
          {quickPills.map(p => (
            <button
              key={p}
              type="button"
              className="term-pill-btn"
              onClick={() => runCommand(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="term-modal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => {
            if (item.type === 'banner') {
              return (
                <div key={idx} className="term-entry banner">
                  {item.content.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              );
            }

            if (item.type === 'cmd') {
              return (
                <div key={idx} className="term-entry cmd-echo">
                  <span className="prompt-lead">sarthak@node:~$</span>
                  <span className="cmd-text">{item.text}</span>
                </div>
              );
            }

            if (item.type === 'help') {
              return (
                <div key={idx} className="term-entry help-box">
                  {item.lines.map((l, i) => (
                    <div key={i} className={i === 0 ? 'help-hdr' : 'help-row'}>{l}</div>
                  ))}
                </div>
              );
            }

            if (item.type === 'skills') {
              return (
                <div key={idx} className="term-entry skills-box">
                  <div className="entry-hdr">⚡ TECHNICAL SKILLS & STACK</div>
                  {item.sections.map((s, i) => (
                    <div key={i} className="skill-row">
                      <span className="skill-cat">▸ {s.cat}:</span>
                      <span className="skill-val">{s.items}</span>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'work') {
              return (
                <div key={idx} className="term-entry work-box">
                  <div className="entry-hdr">🏢 WORK EXPERIENCE & METRICS</div>
                  {item.entries.map((w, i) => (
                    <div key={i} className="tmodal-work-card">
                      <div className="tmodal-work-title">
                        <span className="idx">[{i + 1}]</span> <strong>{w.company}</strong> — <span className="role">{w.role}</span>
                      </div>
                      <div className="tmodal-work-meta">{w.period}</div>
                      <ul className="tmodal-work-bullets">
                        {w.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'projects') {
              return (
                <div key={idx} className="term-entry projects-box">
                  <div className="entry-hdr">🚀 FEATURED PROJECTS</div>
                  {item.projects.map((pr, i) => (
                    <div key={i} className="tmodal-proj-card">
                      <div className="tmodal-proj-title">
                        <span className="idx">[{i + 1}]</span> <strong>{pr.title}</strong>
                      </div>
                      <div className="tmodal-proj-stack">Stack: {pr.stack}</div>
                      {pr.bullets ? (
                        <ul className="tmodal-work-bullets" style={{ margin: '6px 0 8px' }}>
                          {pr.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="tmodal-proj-desc">{pr.desc}</div>
                      )}
                      <div className="tmodal-proj-links">
                        <a href={pr.repo} target="_blank" rel="noopener noreferrer" className="t-link">
                          GitHub Repo ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'edu') {
              return (
                <div key={idx} className="term-entry edu-box">
                  <div className="entry-hdr">🎓 EDUCATION</div>
                  {item.schools.map((sch, i) => (
                    <div key={i} className="tmodal-edu-card">
                      <div className="tmodal-edu-school"><strong>{sch.inst}</strong></div>
                      <div className="tmodal-edu-degree">{sch.degree}</div>
                      <div className="tmodal-edu-meta">{sch.dates} · <span className="grade">{sch.grade}</span></div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'contact') {
              return (
                <div key={idx} className="term-entry contact-box">
                  <div className="entry-hdr">📫 CONTACT DIRECTORY</div>
                  {item.info.map((c, i) => (
                    <div key={i} className="tmodal-contact-row">
                      <span className="c-label">▸ {c.label}:</span>
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="c-val t-link">
                        {c.val} ↗
                      </a>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'text') {
              return (
                <div key={idx} className="term-entry text-box">
                  {item.lines.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              );
            }

            if (item.type === 'error') {
              return (
                <div key={idx} className="term-entry error-box">
                  {item.lines.map((l, i) => <div key={i} className="err-line">{l}</div>)}
                </div>
              );
            }

            return null;
          })}

          {/* Active CLI Input Line */}
          <div className="term-active-line">
            <span className="prompt-lead">sarthak@node:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-modal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (e.g. 'skills', 'work', 'projects')..."
              spellCheck={false}
              autoComplete="off"
            />
            <span className="term-cursor">▋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
