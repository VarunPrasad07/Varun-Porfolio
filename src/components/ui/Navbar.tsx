'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';
import { useTheme } from '@/lib/ThemeContext';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setIsScrolled(scrollTop > 50);

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop - 200 <= scrollTop) {
        setActiveSection(NAV_ITEMS[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '2px' }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #E10600, #A60000, #FF2B2B)',
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px rgba(225, 6, 0, 0.5)',
          }}
        />
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: '2px',
          left: 0,
          right: 0,
          zIndex: 999,
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isScrolled ? '0 1rem' : '0.5rem 1rem',
          transition: 'padding 0.5s ease',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            background: isScrolled
                ? (isLight ? 'rgba(245,245,245,0.88)' : 'rgba(10, 10, 10, 0.85)')
                : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(225, 6, 0, 0.1)' : '1px solid transparent',
            borderLeft: isScrolled ? '1px solid rgba(225, 6, 0, 0.05)' : '1px solid transparent',
            borderRight: isScrolled ? '1px solid rgba(225, 6, 0, 0.05)' : '1px solid transparent',
            transition: 'all 0.5s ease',
          }}>
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              data-cursor="HOME"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                background: 'linear-gradient(135deg, rgba(225,6,0,0.2), rgba(166,0,0,0.2))',
                border: '1px solid rgba(225,6,0,0.3)',
                color: '#E10600',
                boxShadow: '0 0 10px rgba(225,6,0,0.15)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                VP
              </div>
              <div className="header-titles">
                <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--c-text-1)' }}>
                  VARUN PRASAD
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--c-text-3)' }}>
                  RTL DESIGN ENGINEER
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="desktop-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  data-cursor={item.label.toUpperCase()}
                  style={{
                    position: 'relative',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: activeSection === item.id ? '#E10600' : 'var(--c-text-3)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 10 }}>{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-active"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '8px',
                        background: 'rgba(225, 6, 0, 0.08)',
                        border: '1px solid rgba(225, 6, 0, 0.15)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                data-cursor="THEME"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                  border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                  color: isLight ? '#111111' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
                }}
              >
                <AnimatePresence mode="wait">
                  {isLight ? (
                    <motion.svg
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu button */}
              <button
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="MENU"
              aria-label="Toggle navigation menu"
              style={{
                flexDirection: 'column',
                gap: '6px',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              <motion.div
                style={{ width: '20px', height: '1.5px', borderRadius: '2px', background: '#E10600' }}
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7.5 : 0 }}
              />
              <motion.div
                style={{ width: '20px', height: '1.5px', borderRadius: '2px', background: '#E10600' }}
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.div
                style={{ width: '20px', height: '1.5px', borderRadius: '2px', background: '#E10600' }}
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7.5 : 0 }}
              />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
            }}
            className="lg:hidden"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '16px',
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 32px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    letterSpacing: '0.05em',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: activeSection === item.id ? '#E10600' : 'var(--c-text-3)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        marginLeft: '8px',
                        background: '#E10600',
                        boxShadow: '0 0 8px #E10600',
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
