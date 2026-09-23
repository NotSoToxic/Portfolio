import React, { useState, useEffect } from 'react';
import Intro from './components/Intro/index.jsx';
import BackgroundCanvas from './components/BackgroundCanvas/index.jsx';
import Cursor from './components/Cursor/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import Hero from './components/Hero/index.jsx';
import Ticker from './components/Ticker/index.jsx';
import Projects from './components/Projects/index.jsx';
import Experience from './components/Experience/index.jsx';
import Education from './components/Education/index.jsx';
import Skills from './components/Skills/index.jsx';
import Contact from './components/Contact/index.jsx';
import Footer from './components/Footer/index.jsx';
import TerminalModal from './components/TerminalModal/index.jsx';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme-v2');
    if (saved !== null) {
      return saved === 'dark';
    }
    return false; // Default to light theme
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('portfolio-theme-v2', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('portfolio-theme-v2', 'light');
    }
  }, [isDark]);

  // Keyboard shortcut: ` (backtick) toggles terminal
  useEffect(() => {
    const onGlobalKey = (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  const toggleTheme = (val) => {
    setIsDark(prev => (typeof val === 'boolean' ? val : !prev));
  };

  return (
    <>
      <Intro isDark={isDark} toggleTheme={toggleTheme} />
      <BackgroundCanvas isDark={isDark} />
      <Cursor />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />
      <main>
        <Hero />
        <Ticker />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </>
  );
}

export default App;
