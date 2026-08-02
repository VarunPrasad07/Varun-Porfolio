'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ marginBottom: '20px' }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.85rem)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                color: isLight ? '#222222' : 'var(--c-text-1)',
              }}
            >
              RTL Design & Verification Engineer
            </h2>
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

        {/* RIGHT COLUMN: Interactive High-Tech Microchip Graphic with Authentic Orthogonal PCB Traces */}
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
          {/* Main Silicon Chip Package */}
          <div
            style={{
              position: 'relative',
              width: 'min(100%, 420px)',
              aspectRatio: '1 / 1',
              borderRadius: '24px',
              background: isLight
                ? 'linear-gradient(145deg, #FFFFFF 0%, #E8E8EE 100%)'
                : 'linear-gradient(145deg, #121214 0%, #08080A 100%)',
              border: isLight
                ? '1px solid rgba(225, 6, 0, 0.25)'
                : '1px solid rgba(225, 6, 0, 0.3)',
              boxShadow: isLight
                ? '0 16px 40px rgba(0,0,0,0.12), 0 0 25px rgba(225, 6, 0, 0.1)'
                : '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(225, 6, 0, 0.15), inset 0 0 20px rgba(225, 6, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              overflow: 'hidden',
              transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* PCB Trace Overlay Grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: isLight
                  ? `
                    linear-gradient(rgba(225, 6, 0, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(225, 6, 0, 0.08) 1px, transparent 1px)
                  `
                  : `
                    linear-gradient(rgba(225, 6, 0, 0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(225, 6, 0, 0.06) 1px, transparent 1px)
                  `,
                backgroundSize: '24px 24px',
                opacity: isLight ? 0.4 : 0.5,
              }}
            />

            {/* UNIFIED SVG: Pins + Traces + Signals — all in same coordinate space */}
            <svg
              viewBox="0 0 400 400"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {/* Gradient definitions for pin coloring */}
              <defs>
                <linearGradient id="pin-grad-down" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isLight ? '#E10600' : '#E10600'} stopOpacity={isLight ? '1' : '0.6'} />
                  <stop offset="100%" stopColor={isLight ? '#999' : '#444'} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="pin-grad-up" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={isLight ? '#E10600' : '#E10600'} stopOpacity={isLight ? '1' : '0.6'} />
                  <stop offset="100%" stopColor={isLight ? '#999' : '#444'} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="pin-grad-right" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isLight ? '#E10600' : '#E10600'} stopOpacity={isLight ? '1' : '0.6'} />
                  <stop offset="100%" stopColor={isLight ? '#999' : '#444'} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="pin-grad-left" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor={isLight ? '#E10600' : '#E10600'} stopOpacity={isLight ? '1' : '0.6'} />
                  <stop offset="100%" stopColor={isLight ? '#999' : '#444'} stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* ====== QFP PACKAGE PINS (rendered in SVG for exact alignment) ====== */}
              {(() => {
                // Pin center positions: (12 + i*7.2)% of 400
                const pinPositions = Array.from({ length: 12 }, (_, i) => Math.round((12 + i * 7.2) * 4));
                const pinW = 4;    // pin width (narrow dimension)
                const pinL = 14;   // pin length (long dimension)
                const pins: React.ReactElement[] = [];

                // Top pins
                pinPositions.forEach((cx, i) => {
                  pins.push(<rect key={`pt-${i}`} x={cx - pinW / 2} y={0} width={pinW} height={pinL} fill="url(#pin-grad-down)" />);
                });
                // Bottom pins
                pinPositions.forEach((cx, i) => {
                  pins.push(<rect key={`pb-${i}`} x={cx - pinW / 2} y={400 - pinL} width={pinW} height={pinL} fill="url(#pin-grad-up)" />);
                });
                // Left pins
                pinPositions.forEach((cy, i) => {
                  pins.push(<rect key={`pl-${i}`} x={0} y={cy - pinW / 2} width={pinL} height={pinW} fill="url(#pin-grad-right)" />);
                });
                // Right pins
                pinPositions.forEach((cy, i) => {
                  pins.push(<rect key={`pr-${i}`} x={400 - pinL} y={cy - pinW / 2} width={pinL} height={pinW} fill="url(#pin-grad-left)" />);
                });

                return pins;
              })()}

              {/* ====== PCB TRACES + SIGNAL PULSES ====== */}
              {(() => {
                // Exact pin centers matching the rects above
                const P = Array.from({ length: 12 }, (_, i) => Math.round((12 + i * 7.2) * 4));
                // Pin inner-tip coordinates (where trace connects)
                const TIP = 14; // inner edge of pin rect
                const DIE = { t: 82, b: 318, l: 82, r: 318 };

                // Route definitions: side, pinIndex, direction (rx=inward pin→die, tx=outward die→pin), delay
                const routes: { path: string; via: { x: number; y: number } | null; dir: 'tx' | 'rx'; delay: number }[] = [
                  // === TOP PINS ===
                  { path: `M ${P[0]},${TIP} L ${P[0]},${TIP + 34} L ${DIE.l},${DIE.t}`,  via: { x: P[0], y: TIP + 34 }, dir: 'rx', delay: 0 },
                  { path: `M ${P[2]},${TIP} L ${P[2]},${DIE.t}`,                           via: null,                      dir: 'tx', delay: 0.15 },
                  { path: `M ${P[4]},${TIP} L ${P[4]},${DIE.t}`,                           via: null,                      dir: 'rx', delay: 0.3 },
                  { path: `M ${P[5]},${TIP} L ${P[5]},${DIE.t}`,                           via: null,                      dir: 'tx', delay: 0.1 },
                  { path: `M ${P[7]},${TIP} L ${P[7]},${DIE.t}`,                           via: null,                      dir: 'rx', delay: 0.4 },
                  { path: `M ${P[9]},${TIP} L ${P[9]},${DIE.t}`,                           via: null,                      dir: 'tx', delay: 0.2 },
                  { path: `M ${P[11]},${TIP} L ${P[11]},${TIP + 34} L ${DIE.r},${DIE.t}`, via: { x: P[11], y: TIP + 34 }, dir: 'rx', delay: 0.35 },

                  // === BOTTOM PINS ===
                  { path: `M ${P[0]},${400 - TIP} L ${P[0]},${400 - TIP - 34} L ${DIE.l},${DIE.b}`,  via: { x: P[0], y: 400 - TIP - 34 }, dir: 'tx', delay: 0.1 },
                  { path: `M ${P[3]},${400 - TIP} L ${P[3]},${DIE.b}`,                                 via: null,                            dir: 'rx', delay: 0.25 },
                  { path: `M ${P[6]},${400 - TIP} L ${P[6]},${DIE.b}`,                                 via: null,                            dir: 'tx', delay: 0.05 },
                  { path: `M ${P[8]},${400 - TIP} L ${P[8]},${DIE.b}`,                                 via: null,                            dir: 'rx', delay: 0.45 },
                  { path: `M ${P[11]},${400 - TIP} L ${P[11]},${400 - TIP - 34} L ${DIE.r},${DIE.b}`, via: { x: P[11], y: 400 - TIP - 34 }, dir: 'tx', delay: 0.3 },

                  // === LEFT PINS ===
                  { path: `M ${TIP},${P[0]} L ${TIP + 34},${P[0]} L ${DIE.l},${DIE.t}`,  via: { x: TIP + 34, y: P[0] }, dir: 'rx', delay: 0.2 },
                  { path: `M ${TIP},${P[2]} L ${DIE.l},${P[2]}`,                           via: null,                     dir: 'tx', delay: 0.35 },
                  { path: `M ${TIP},${P[5]} L ${DIE.l},${P[5]}`,                           via: null,                     dir: 'rx', delay: 0.5 },
                  { path: `M ${TIP},${P[8]} L ${DIE.l},${P[8]}`,                           via: null,                     dir: 'tx', delay: 0.15 },
                  { path: `M ${TIP},${P[11]} L ${TIP + 34},${P[11]} L ${DIE.l},${DIE.b}`, via: { x: TIP + 34, y: P[11] }, dir: 'rx', delay: 0.4 },

                  // === RIGHT PINS ===
                  { path: `M ${400 - TIP},${P[0]} L ${400 - TIP - 34},${P[0]} L ${DIE.r},${DIE.t}`,  via: { x: 400 - TIP - 34, y: P[0] }, dir: 'tx', delay: 0.05 },
                  { path: `M ${400 - TIP},${P[3]} L ${DIE.r},${P[3]}`,                                 via: null,                            dir: 'rx', delay: 0.55 },
                  { path: `M ${400 - TIP},${P[5]} L ${DIE.r},${P[5]}`,                                 via: null,                            dir: 'tx', delay: 0.2 },
                  { path: `M ${400 - TIP},${P[9]} L ${DIE.r},${P[9]}`,                                 via: null,                            dir: 'rx', delay: 0.45 },
                  { path: `M ${400 - TIP},${P[11]} L ${400 - TIP - 34},${P[11]} L ${DIE.r},${DIE.b}`, via: { x: 400 - TIP - 34, y: P[11] }, dir: 'tx', delay: 0.3 },
                ];

                return routes.map((route, i) => (
                  <g key={`pcb-${i}`}>
                    {/* Copper Trace */}
                    <path
                      d={route.path}
                      fill="none"
                      stroke={isLight ? 'rgba(225, 6, 0, 0.35)' : 'rgba(225, 6, 0, 0.55)'}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Via Pad at bend */}
                    {route.via && (
                      <>
                        <circle cx={route.via.x} cy={route.via.y} r="3.5"
                          fill="#E10600"
                          opacity={isLight ? '0.85' : '1'}
                        />
                        <circle cx={route.via.x} cy={route.via.y} r="1.4"
                          fill={isLight ? '#FFFFFF' : '#0D0D10'}
                        />
                      </>
                    )}

                    {/* Signal Pulse — TX (outward die→pin) reverses via keyPoints */}
                    <circle r="3"
                      fill="#E10600"
                      style={{ filter: 'drop-shadow(0 0 6px #E10600)' }}
                    >
                      <animateMotion
                        path={route.path}
                        dur={`${1.6 + (i % 3) * 0.4}s`}
                        repeatCount="indefinite"
                        begin={`${route.delay}s`}
                        keyPoints={route.dir === 'tx' ? '1;0' : '0;1'}
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                ));
              })()}
            </svg>

            {/* Corner Accents */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '20px', height: '20px', borderTop: '2px solid #E10600', borderLeft: '2px solid #E10600' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', borderTop: '2px solid #E10600', borderRight: '2px solid #E10600' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '20px', height: '20px', borderBottom: '2px solid #E10600', borderLeft: '2px solid #E10600' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '20px', height: '20px', borderBottom: '2px solid #E10600', borderRight: '2px solid #E10600' }} />

            {/* Inner Silicon Die Core */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '70%',
                height: '70%',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1D1D22 0%, #0F0F12 100%)',
                border: '1.5px solid rgba(225, 6, 0, 0.5)',
                boxShadow: isLight
                  ? '0 8px 24px rgba(0,0,0,0.25), 0 0 20px rgba(225, 6, 0, 0.25)'
                  : '0 0 30px rgba(225, 6, 0, 0.35), inset 0 0 15px rgba(0,0,0,0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Die Core Circuit Internal Bus Grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '10px',
                  border: '1px stroke rgba(225, 6, 0, 0.2)',
                  background: 'radial-gradient(circle at 50% 50%, rgba(225, 6, 0, 0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Internal Signal Bus Activity Indicators */}
              <div style={{ position: 'absolute', top: '8px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#E10600', letterSpacing: '0.1em' }}>TX ▶ 4.8Gbps</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>RX ◀ ACTIVE</span>
              </div>

              {/* Central FPGA / RTL Branding */}
              <div style={{ position: 'relative', zIndex: 3, marginTop: '8px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: '#E10600',
                  marginBottom: '4px',
                  fontWeight: 700,
                }}>
                  RTL-CORE // VLSI-01
                </div>

                {/* Metallic Chip Title */}
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-head)',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  textShadow: '0 0 14px rgba(225,6,0,0.8)',
                  marginBottom: '4px',
                }}>
                  SoC
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '12px',
                }}>
                  SYSTEMVERILOG • UVM
                </div>

                {/* Signal Status Pulsing Nodes with Live Blink Animation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  {[
                    { name: 'AHB/APB', delay: 0 },
                    { name: 'FPGA', delay: 0.3 },
                    { name: 'ESP32', delay: 0.6 },
                  ].map((node) => (
                    <motion.div
                      key={node.name}
                      animate={{
                        borderColor: ['rgba(225,6,0,0.3)', 'rgba(225,6,0,0.8)', 'rgba(225,6,0,0.3)'],
                        boxShadow: ['0 0 0px #E10600', '0 0 8px #E10600', '0 0 0px #E10600'],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: node.delay }}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(225,6,0,0.18)',
                        border: '1px solid rgba(225,6,0,0.4)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: '#E10600',
                        fontWeight: 600,
                      }}
                    >
                      {node.name}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated Scan Line */}
              <motion.div
                animate={{ y: [-80, 80] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #E10600, transparent)',
                  boxShadow: '0 0 12px #E10600',
                  opacity: 0.8,
                  zIndex: 3,
                }}
              />
            </div>

            {/* Floating Tag Badges */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              right: '20px',
              zIndex: 10,
              padding: '6px 14px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : '#111111',
              border: isLight ? '1px solid rgba(225, 6, 0, 0.4)' : '1px solid #E10600',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#E10600',
              boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.6)',
            }}>
              ⚡ 200 MHz CLK FREQ
            </div>

            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '20px',
              zIndex: 10,
              padding: '6px 14px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : '#111111',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(225,6,0,0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: isLight ? '#333333' : '#FFFFFF',
              boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.6)',
            }}>
              🔬 28nm SILICON DIE
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
