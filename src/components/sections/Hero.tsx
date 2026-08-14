'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

// Typewriter skills sequence for 'Also building:'
const HERO_SKILLS = [
  'Physical Design (OpenLane & KLayout)',
  'Embedded Systems & IoT',
  'PCB Design',
  'Robotics',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isHeroVisible = useRef(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Typewriter animation state
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor toggle
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect loop
  useEffect(() => {
    const currentFullSkill = HERO_SKILLS[skillIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Type character by character
      if (displayText.length < currentFullSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullSkill.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Pause for 1.8 seconds after full skill displayed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Delete character by character
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullSkill.slice(0, displayText.length - 1));
        }, 35);
      } else {
        // Wait 0.4 seconds before typing next skill
        timer = setTimeout(() => {
          setIsDeleting(false);
          setSkillIndex((prev) => (prev + 1) % HERO_SKILLS.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, skillIndex]);

  // Track mouse — only update when hero section is visible
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible.current) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reset chip to center when hero scrolls out of view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          // Smoothly snap chip back to neutral center position
          setMousePos({ x: 0, y: 0 });
        }
      },
      { threshold: 0.2 } // trigger when less than 20% of hero is visible
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '7rem 1.5rem 4rem 1.5rem',
      }}
    >
      {/* Background glow follow */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: isLight
            ? 'radial-gradient(circle, rgba(225, 6, 0, 0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(225, 6, 0, 0.08) 0%, transparent 70%)',
          left: `calc(50% + ${mousePos.x * 150}px - 300px)`,
          top: `calc(50% + ${mousePos.y * 150}px - 300px)`,
          transition: 'left 0.4s ease-out, top 0.4s ease-out',
        }}
      />

      {/* Background Concentric Radar Rings */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '1000px',
        pointerEvents: 'none',
        opacity: isLight ? 0.08 : 0.15,
      }}>
        {[400, 600, 800, 1000].map((size) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              width: `${size}px`,
              height: `${size}px`,
              border: '1px solid rgba(225, 6, 0, 0.15)',
            }}
          />
        ))}
      </div>

      {/* Main 2-Column Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}>

        {/* LEFT COLUMN: Hero Text & Actions */}
        <div style={{ textAlign: 'left' }}>
          
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              marginBottom: '28px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              background: isLight ? 'rgba(225, 6, 0, 0.06)' : 'rgba(225, 6, 0, 0.08)',
              border: isLight ? '1px solid rgba(225, 6, 0, 0.2)' : '1px solid rgba(225, 6, 0, 0.25)',
              color: '#E10600',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--c-red)',
                boxShadow: '0 0 8px var(--c-red)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            SYSTEM ONLINE — READY FOR DEPLOYMENT
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              backgroundImage: isLight
                ? 'linear-gradient(135deg, #111111 0%, #E10600 45%, #A60000 70%, #111111 100%)'
                : 'linear-gradient(135deg, #FFFFFF 0%, #E10600 45%, #A60000 70%, #FFFFFF 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            VARUN PRASAD
          </motion.h1>

          {/* Main Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ marginBottom: '14px' }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.05rem, 2.1vw, 1.6rem)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: isLight ? '#111111' : 'var(--c-text-1)',
                lineHeight: 1.35,
              }}
            >
              RTL Design &amp; Verification Engineer{' '}
              <span
                style={{
                  color: isLight ? '#8B000A' : '#E10600',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                @ Kiwistron
              </span>
            </h2>
          </motion.div>

          {/* Clean Typewriter Line with 'Also building:' prefix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{
              marginBottom: '28px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)',
              color: isLight ? '#444444' : 'var(--c-text-2)',
              display: 'flex',
              alignItems: 'center',
              minHeight: '1.8em',
            }}
          >
            <span style={{ color: 'var(--c-red)', fontWeight: 600, marginRight: '8px' }}>
              Also building:
            </span>
            <span style={{ color: isLight ? '#111111' : '#FFFFFF', fontWeight: 600 }}>
              {displayText}
            </span>
            <span
              style={{
                color: 'var(--c-red)',
                fontWeight: 600,
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.08s ease',
                marginLeft: '2px',
                userSelect: 'none',
              }}
            >
              |
            </span>
          </motion.div>

          {/* Specializations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
            }}
          >
            {['RTL Design', 'VLSI', 'FPGA', 'SystemVerilog/UVM', 'Embedded AIoT'].map((spec) => (
              <span
                key={spec}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isLight ? '#333333' : 'var(--c-text-2)',
                  background: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid rgba(225, 6, 0, 0.2)' : '1px solid rgba(225, 6, 0, 0.15)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                }}
              >
                <span style={{ color: '#E10600' }}>◈</span>
                {spec}
              </span>
            ))}
          </motion.div>

          {/* Telemetry data readout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '18px',
              marginBottom: '36px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: isLight ? '#555555' : 'var(--c-text-3)',
              background: isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(225, 6, 0, 0.03)',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(225, 6, 0, 0.08)',
              borderRadius: '8px',
              padding: '10px 16px',
              maxWidth: 'fit-content',
            }}
          >
            <span><strong style={{ color: '#E10600' }}>CLK:</strong> 200MHz</span>
            <span><strong style={{ color: '#E10600' }}>PROCESS:</strong> 28nm</span>
            <span><strong style={{ color: '#E10600' }}>STATUS:</strong> ACTIVE</span>
          </motion.div>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor="VIEW"
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                background: '#E10600',
                border: '1px solid #E10600',
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: isLight ? '0 4px 16px rgba(225, 6, 0, 0.25)' : '0 0 20px rgba(225, 6, 0, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#FF2B2B';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(225, 6, 0, 0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#E10600';
                (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 4px 16px rgba(225, 6, 0, 0.25)' : '0 0 20px rgba(225, 6, 0, 0.3)';
              }}
            >
              <span>View Projects ➔</span>
            </button>

            <a
              href="/resume.pdf"
              download="Varun_Prasad_Resume.pdf"
              data-cursor="DOWNLOAD"
              style={{
                padding: '12px 26px',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: isLight ? 'rgba(225, 6, 0, 0.08)' : 'rgba(225, 6, 0, 0.08)',
                border: isLight ? '1px solid rgba(225, 6, 0, 0.3)' : '1px solid rgba(225, 6, 0, 0.4)',
                color: '#E10600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(225, 6, 0, 0.16)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(225, 6, 0, 0.08)';
              }}
            >
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor="CONTACT"
              style={{
                padding: '12px 26px',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: isLight ? '#FFFFFF' : 'transparent',
                border: isLight ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
                color: isLight ? '#333333' : 'var(--c-text-2)',
                cursor: 'pointer',
                boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(225, 6, 0, 0.5)';
                (e.currentTarget as HTMLElement).style.color = '#E10600';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
                (e.currentTarget as HTMLElement).style.color = isLight ? '#333333' : 'var(--c-text-2)';
              }}
            >
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: 'absolute',
              width: 'min(100%, 450px)',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(225, 6, 0, 0.18) 0%, transparent 70%)',
              filter: 'blur(24px)',
              pointerEvents: 'none',
            }}
          />

          {/* Photo Card */}
          <div
            style={{
              position: 'relative',
              width: 'min(100%, 380px)',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              border: isLight
                ? '3px solid rgba(225, 6, 0, 0.4)'
                : '3px solid rgba(225, 6, 0, 0.6)',
              boxShadow: isLight
                ? '0 16px 48px rgba(0,0,0,0.15), 0 0 40px rgba(225, 6, 0, 0.15)'
                : '0 20px 60px rgba(0,0,0,0.85), 0 0 50px rgba(225, 6, 0, 0.25)',
              overflow: 'hidden',
              transform: `perspective(1000px) translateX(${mousePos.x * 14}px) translateY(${mousePos.y * 14}px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
              transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Profile Image */}
            <img
              src="/pannu.png"
              alt="Varun Prasad — RTL Design Engineer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />

            {/* Subtle scan line overlay */}
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, rgba(225, 6, 0, 0.5), transparent)',
                boxShadow: '0 0 12px rgba(225, 6, 0, 0.6)',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Floating Tag Badge — bottom right */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 10,
              padding: '7px 14px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : '#111111',
              border: isLight ? '1px solid rgba(225, 6, 0, 0.4)' : '1px solid #E10600',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#E10600',
              boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.7), 0 0 10px rgba(225,6,0,0.15)',
              whiteSpace: 'nowrap',
            }}
          >
            RTL Design Engineer
          </motion.div>

          {/* Floating Tag Badge — top left */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 10,
              padding: '7px 14px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : '#111111',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(225,6,0,0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: isLight ? '#333333' : '#FFFFFF',
              boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.7)',
              whiteSpace: 'nowrap',
            }}
          >
            Kiwistron · VLSI
          </motion.div>

          {/* Rotating dashed orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 'min(100%, 420px)',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              border: '1.5px dashed rgba(225, 6, 0, 0.22)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
