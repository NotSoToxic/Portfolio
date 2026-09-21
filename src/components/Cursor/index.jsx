import React, { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const xhair = document.getElementById('xhair');
    if (!xhair) return;

    const onMove = (e) => {
      xhair.style.left = e.clientX + 'px';
      xhair.style.top = e.clientY + 'px';
    };
    const onLeave = () => {
      xhair.style.left = '-200px';
      xhair.style.top = '-200px';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // Observe DOM for interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a,button,.sk-tag,.proj-card,.c-link,.exp-pts li,.switch,.nav-id,.proj-dot').forEach(el => {
        el.addEventListener('mouseenter', () => xhair.classList.add('big'));
        el.addEventListener('mouseleave', () => xhair.classList.remove('big'));
      });
    };

    // Initial + MutationObserver for dynamic content
    addHoverListeners();
    const observer = new MutationObserver(() => { setTimeout(addHoverListeners, 100); });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, []);

  return <div id="xhair"></div>;
};

export default Cursor;
