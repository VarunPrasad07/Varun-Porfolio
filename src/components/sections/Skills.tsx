'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { useTheme } from '@/lib/ThemeContext';
import { useInView } from 'react-intersection-observer';

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  });

  return (
    <section id="skills" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          {...fadeUp(0)}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E10600' }}>
            02 // SYSTEMS CHECK
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.1)}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '56px', color: 'var(--c-text-1)' }}
        >
          Technical{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Skills</span>
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          {...fadeUp(0.2)}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActive(i)}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                border: `1px solid ${active === i ? `${cat.color}45` : 'rgba(225,6,0,0.10)'}`,
                background: active === i ? `${cat.color}12` : (isLight ? 'rgba(0,0,0,0.03)' : 'rgba(225,6,0,0.02)'),
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.08em',
                color: active === i ? cat.color : 'var(--c-text-3)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span>{cat.icon}</span>
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}
          >
            {SKILL_CATEGORIES[active].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '24px 26px',
                  borderRadius: '12px',
                  background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26,26,26,0.5), rgba(10,10,10,0.7))',
                  border: `1px solid ${SKILL_CATEGORIES[active].color}15`,
                  boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: `${SKILL_CATEGORIES[active].color}10`,
                      border: `1px solid ${SKILL_CATEGORIES[active].color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '14px', height: '14px', borderRadius: '3px',
                        background: `${SKILL_CATEGORIES[active].color}35`,
                      }} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-text-1)' }}>{skill.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: SKILL_CATEGORIES[active].color }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ height: '4px', borderRadius: '99px', background: 'rgba(225,6,0,0.08)', overflow: 'hidden', position: 'relative' }}>
                  <motion.div
                    key={`${active}-${skill.name}`}
                    initial={{ width: '0%' }}
                    animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
                    transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%',
                      borderRadius: '99px',
                      background: `linear-gradient(90deg, #E1060080, #E10600)`,
                      boxShadow: '0 0 10px rgba(225, 6, 0, 0.5)',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Status footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            marginTop: '48px',
            padding: '16px 24px',
            borderRadius: '10px',
            background: 'rgba(225,6,0,0.02)',
            border: '1px solid rgba(225,6,0,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(91,107,122,0.8)',
          }}
        >
          <span>SUBSYSTEMS: {SKILL_CATEGORIES.length} ACTIVE</span>
          <span>MODULES: {SKILL_CATEGORIES.reduce((a, c) => a + c.skills.length, 0)} LOADED</span>
          <span>STATUS: ALL SYSTEMS OPERATIONAL</span>
        </motion.div>
      </div>
    </section>
  );
}
