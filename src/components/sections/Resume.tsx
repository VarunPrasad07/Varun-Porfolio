'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logs = [
  'Initializing secure channel to VARUN-PRASAD-CORE...',
  'Fetching credentials from /sector_04/identity/...',
  'RTL_DESIGN_ENGINEER_v2.pdf located (286 KB)',
];

const summaryItems = [
  {
    heading: 'Education',
    lines: [
      'B.E. Electronics & Communication Engineering',
      'VLSI Design & Embedded Systems specialization',
      'Semiconductor physics & computer architecture',
    ],
  },
  {
    heading: 'Key Strengths',
    lines: [
      'Verilog, SystemVerilog, UVM Architecture',
      'FPGA Design, Simulation & Verification',
      'IoT Edge AI, ESP32, STM32 Prototyping',
    ],
  },
  {
    heading: 'Experience Highlights',
    lines: [
      'FPGA implementations & bus bridge protocols',
      'Multi-legged robotics & inverse kinematics',
      'Micro-hardware orchestration & edge AI',
    ],
  },
];

export default function Resume() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [terminalLogs, setTerminalLogs] = useState<string[]>(logs);
  const [compiling, setCompiling] = useState(false);
  const [compiled, setCompiled] = useState(false);

  const compileResume = () => {
    if (compiling || compiled) return;
    setCompiling(true);
    const steps = [
      'Reading experience vectors...',
      'Mapping RTL design coefficients (Verilog, SystemVerilog, FPGA)...',
      'Validating AMBA protocol bridge compliance...',
      'Injecting AI & IoT neural network nodes...',
      'Applying schema validation and linting...',
      'Compilation successful: resume_v2.pdf ✓',
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, `› ${step}`]);
        if (i === steps.length - 1) { setCompiling(false); setCompiled(true); }
      }, (i + 1) * 600);
    });
  };

  return (
    <section id="resume" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E10600' }}>
            08 // RESUME TERMINAL
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '56px', color: 'var(--c-text-1)' }}
        >
          Resume{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Terminal</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* ── Terminal panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: isLight ? '1px solid rgba(225,6,0,0.12)' : '1px solid rgba(225,6,0,0.2)',
              background: isLight ? '#FFFFFF' : 'var(--c-bg)',
              boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.05)' : '0 0 32px rgba(225,6,0,0.08)',
            }}
          >
            {/* Title bar */}
            <div style={{
              background: '#000000',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(225,6,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                  <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(225,6,0,0.5)' }}>
                VP_CMD_CONSOLE.EXE
              </span>
              <div style={{ width: '56px' }} />
            </div>

            {/* Terminal body */}
            <div style={{ padding: '24px', minHeight: '280px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {terminalLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i < logs.length ? 0 : 0 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: i < logs.length ? 'rgba(225,6,0,0.7)' : 'rgba(225,6,0,0.5)',
                  }}
                >
                  {log}
                </motion.div>
              ))}

              {compiling && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(225,6,0,0.6)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ animation: 'pulse 1s infinite' }}>◌</span> Processing...
                </div>
              )}

              {/* Action buttons */}
              <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {!compiled && !compiling && (
                  <button
                    onClick={compileResume}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      color: '#E10600',
                      background: 'rgba(225,6,0,0.06)',
                      border: '1px solid rgba(225,6,0,0.25)',
                      cursor: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    $ compile_resume.sh
                  </button>
                )}
                {compiled && (
                  <>
                    <motion.a
                      href="/resume.pdf"
                      download="Varun_Prasad_Resume.pdf"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '10px 22px',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: '#050505',
                        background: '#E10600',
                        border: '1px solid #E10600',
                        cursor: 'none',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                    >
                      Download PDF
                    </motion.a>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => { setTerminalLogs(logs); setCompiled(false); }}
                      style={{
                        padding: '10px 22px',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: 'rgba(225,6,0,0.5)',
                        background: 'transparent',
                        border: '1px solid rgba(225,6,0,0.15)',
                        cursor: 'none',
                      }}
                    >
                      Clear
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── Resume summary card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              padding: '36px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26,26,26,0.45), rgba(10,10,10,0.65))',
              border: '1px solid rgba(225,6,0,0.10)',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E10600', boxShadow: '0 0 8px #E10600' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E10600' }}>
                RESUME PREVIEW SUMMARY
              </span>
            </div>

            {summaryItems.map((item) => (
              <div key={item.heading}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--c-text-3)',
                  marginBottom: '14px',
                }}>
                  {item.heading}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.lines.map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: 'rgba(225,6,0,0.4)', fontSize: '12px', flexShrink: 0, paddingTop: '2px' }}>•</span>
                      <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--c-text-3)' }}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid rgba(225,6,0,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: '#3A4A5A',
            }}>
              <span>SHA256: 8f9b2d...1c4e7f</span>
              <span>VERIFIED ORIGINAL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
