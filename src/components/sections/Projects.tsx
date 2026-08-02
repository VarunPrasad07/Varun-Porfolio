'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '@/lib/constants';

type Tab = 'overview' | 'architecture' | 'highlights';

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<Tab>('overview');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const project = PROJECTS[active];

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E10600' }}>
            03 // PROJECTS LAB
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '56px', color: 'var(--c-text-1)' }}
        >
          Featured{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Projects</span>
        </motion.h2>

        {/* ── Project selector tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            paddingBottom: '4px',
            marginBottom: '40px',
          }}
        >
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => { setActive(i); setTab('overview'); }}
              style={{
                flexShrink: 0,
                padding: '10px 20px',
                borderRadius: '8px',
                border: `1px solid ${active === i ? `${proj.color}50` : 'rgba(225,6,0,0.10)'}`,
                background: active === i ? `${proj.color}12` : 'rgba(225,6,0,0.02)',
                cursor: 'none',
                textAlign: 'left',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 600,
                color: active === i ? (isLight ? 'var(--c-text-1)' : '#FFFFFF') : '#6B7A8D',
                marginBottom: '2px',
                whiteSpace: 'nowrap',
              }}>
                {proj.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: active === i ? proj.color : 'rgba(225,6,0,0.25)',
              }}>
                {proj.category}
              </div>
            </button>
          ))}
        </motion.div>

        {/* ── Project detail panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              background: isLight
                ? 'var(--c-bg-1)'
                : 'linear-gradient(135deg, rgba(26,26,26,0.45), rgba(10,10,10,0.65))',
              border: isLight
                ? '1px solid rgba(225, 6, 0, 0.15)'
                : `1px solid ${project.color}18`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Panel header */}
            <div style={{
              padding: '32px 36px',
              borderBottom: `1px solid ${project.color}10`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: project.color,
                    boxShadow: `0 0 8px ${project.color}`,
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: project.color }}>
                    {project.category.toUpperCase()}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--c-text-1)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7A8D', margin: 0, fontFamily: 'var(--font-mono)' }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Waveform graphic */}
              <div style={{ opacity: 0.35, flexShrink: 0, width: '120px', height: '50px' }}>
                <svg viewBox="0 0 120 50" width="120" height="50">
                  <path d="M0,35 L7,35 L7,15 L14,15 L14,35 L21,35 L21,15 L28,15 L28,35 L35,35 L35,15 L42,15 L42,35 L49,35 L49,15 L56,15 L56,35 L63,35 L63,15 L70,15 L70,35 L77,35 L77,15 L84,15 L84,35 L91,35 L91,15 L98,15 L98,35 L105,35 L105,15 L112,15 L112,35 L120,35"
                    fill="none" stroke={project.color} strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex',
              borderBottom: `1px solid ${project.color}10`,
            }}>
              {(['overview', 'architecture', 'highlights'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: '14px 28px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'capitalize',
                    color: tab === t ? project.color : 'var(--c-text-3)',
                    background: tab === t ? `${project.color}08` : 'transparent',
                    border: 'none',
                    borderBottom: tab === t ? `2px solid ${project.color}` : '2px solid transparent',
                    cursor: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: '36px' }}>
              <AnimatePresence mode="wait">
                {tab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                  >
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Description</h4>
                      <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', margin: 0 }}>{project.description}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Problem Statement</h4>
                      <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', margin: 0 }}>{project.problem}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Objectives</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                        {project.objectives.map((obj, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '10px',
                            padding: '12px 16px',
                            background: `${project.color}05`,
                            border: `1px solid ${project.color}12`,
                            borderRadius: '8px',
                          }}>
                            <span style={{ color: project.color, marginTop: '1px', flexShrink: 0 }}>▸</span>
                            <span style={{ fontSize: '13px', color: 'var(--c-text-3)', lineHeight: '1.5' }}>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tech Stack</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.techStack.map((tech) => (
                          <span key={tech} style={{
                            padding: '5px 14px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '0.08em',
                            color: project.color,
                            background: `${project.color}08`,
                            border: `1px solid ${project.color}20`,
                            borderRadius: '99px',
                          }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                  >
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Architecture Overview</h4>
                      <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', margin: 0 }}>{project.architecture}</p>
                    </div>

                    {/* Block diagram */}
                    <div style={{ padding: '28px', background: 'rgba(225,6,0,0.02)', border: '1px solid rgba(225,6,0,0.06)', borderRadius: '12px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: project.color, marginBottom: '24px' }}>BLOCK DIAGRAM</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {['INPUT', project.title.toUpperCase(), 'OUTPUT'].map((label, i) => (
                          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                              padding: '12px 20px',
                              border: `1px solid ${i === 1 ? project.color + '50' : project.color + '25'}`,
                              background: i === 1 ? `${project.color}10` : 'transparent',
                              borderRadius: '8px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: i === 1 ? project.color : 'var(--c-text-1)',
                              letterSpacing: '0.1em',
                              textAlign: 'center',
                              minWidth: '80px',
                            }}>{label}</div>
                            {i < 2 && (
                              <svg width="32" height="16" viewBox="0 0 32 16" style={{ opacity: 0.4 }}>
                                <line x1="0" y1="8" x2="24" y2="8" stroke={project.color} strokeWidth="1.5" />
                                <polygon points="24,4 32,8 24,12" fill={project.color} />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timing waveform */}
                    <div style={{ padding: '28px', background: 'rgba(225,6,0,0.02)', border: '1px solid rgba(225,6,0,0.06)', borderRadius: '12px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: project.color, marginBottom: '20px' }}>TIMING WAVEFORM</div>
                      <svg viewBox="0 0 400 100" style={{ width: '100%', maxHeight: '100px' }}>
                        <text x="0" y="16" fill="var(--c-text-3)" fontSize="8" fontFamily="monospace">CLK</text>
                        <path d="M35,20 L43,20 L43,8 L51,8 L51,20 L59,20 L59,8 L67,8 L67,20 L75,20 L75,8 L83,8 L83,20 L91,20 L91,8 L99,8 L99,20 L107,20 L107,8 L115,8 L115,20 L123,20 L123,8 L131,8 L131,20 L139,20 L139,8 L147,8 L147,20 L155,20 L155,8 L163,8 L163,20 L171,20 L171,8 L179,8 L179,20 L187,20 L187,8 L195,8 L195,20 L203,20" fill="none" stroke={project.color} strokeWidth="1.5" opacity="0.7" />
                        <text x="0" y="48" fill="var(--c-text-3)" fontSize="8" fontFamily="monospace">DATA</text>
                        <path d="M35,52 L51,52 L56,38 L99,38 L104,52 L147,52 L152,38 L195,38 L200,52 L203,52" fill="none" stroke="var(--c-text-2)" strokeWidth="1.5" opacity="0.55" />
                        <text x="0" y="78" fill="var(--c-text-3)" fontSize="8" fontFamily="monospace">VALID</text>
                        <path d="M35,82 L51,82 L51,68 L104,68 L104,82 L152,82 L152,68 L200,68 L200,82 L203,82" fill="none" stroke="var(--c-text-1)" strokeWidth="1.5" opacity="0.55" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {tab === 'highlights' && (
                  <motion.div
                    key="highlights"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}
                  >
                    {project.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{
                          padding: '20px 24px',
                          background: `${project.color}05`,
                          border: `1px solid ${project.color}12`,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                        }}
                      >
                        <div style={{
                          width: '28px', height: '28px', flexShrink: 0,
                          background: `${project.color}15`,
                          borderRadius: '6px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-mono)', fontSize: '11px',
                          color: project.color, fontWeight: 600,
                        }}>
                          {i + 1}
                        </div>
                        <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--c-text-1)' }}>{h}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
