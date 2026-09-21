import React, { useEffect, useRef } from 'react';
import { education } from '../../data/constants';

const Education = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    observer.observe(list);

    const label = list.parentElement?.querySelector('.sec-label');
    if (label) {
      const labelObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('label-in'); labelObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      labelObs.observe(label);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" data-chapter="03" data-chapter-name="Education">
      <div className="sec-label"><span className="sec-num">03</span> Education</div>
      <div className="edu-list reveal" ref={listRef}>
        {education.map((edu, index) => (
          <div key={index} className="edu-item">
            <div>
              <div className="edu-date">{edu.date}</div>
              <div className="edu-inst">{edu.school}</div>
              <div className="edu-tag">{edu.grade}</div>
            </div>
            <div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-detail">{edu.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
