import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [clock, setClock] = useState('--:--:--');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer>
      <div className="footer-sig">Sarthak Joshi</div>
      <div>VIT · B.Tech CSE</div>
      <div id="footer-clock">{clock}</div>
      <div>India · UTC+5:30</div>
      <div>built with precision · no templates</div>
    </footer>
  );
};

export default Footer;
