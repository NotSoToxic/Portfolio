import React, { useEffect, useRef } from 'react';
import { skills } from '../../data/constants';

const Skills = () => {
  const outerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    observer.observe(outer);

    // Skill tag stagger
    const tags = outer.querySelectorAll('.sk-tag');
    tags.forEach((tag, i) => { tag.style.transitionDelay = (i * 38) + 'ms'; });
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { outer.classList.add('skills-revealed'); skillObs.unobserve(e.target); } });
    }, { threshold: 0.05 });
    skillObs.observe(outer);

    const label = outer.parentElement?.querySelector('.sec-label');
    if (label) {
      const labelObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('label-in'); labelObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      labelObs.observe(label);
    }

    return () => { observer.disconnect(); skillObs.disconnect(); };
  }, []);

  return (
    <section id="skills" data-chapter="04" data-chapter-name="Tech Stack">
      <div className="sec-label"><span className="sec-num">04</span> Tech Stack</div>
      <div className="skills-outer reveal" ref={outerRef}>
        <div className="skills-intro">
          Tools I <em>build</em> with, technologies I <em>trust</em>.
        </div>
        <div className="skills-cols">
          {skills.map((category, index) => (
            <div key={index} className="sk-row">
              <div className="sk-cat">{category.title}</div>
              <div className="sk-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="sk-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
