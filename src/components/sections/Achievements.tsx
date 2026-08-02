'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ACHIEVEMENTS } from '@/lib/constants';

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="achievements" ref={ref} style={{ padding: '8rem 1.5rem', background: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E10600' }}>
            AWARDS & ACHIEVEMENTS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '72px', color: 'var(--c-text-1)' }}
        >
          Recognition &{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #FF2B2B 50%, var(--c-text-1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Milestones</span>
        </motion.h2>

        {/* Cards grid — 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {ACHIEVEMENTS.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'var(--c-bg-2)',
                border: '1px solid var(--c-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px)';
                el.style.borderColor = 'rgba(225,6,0,0.5)';
                el.style.boxShadow = '0 28px 80px rgba(0,0,0,0.6), 0 0 40px rgba(225,6,0,0.35)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'var(--c-border)';
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
              }}
            >
              {/* Top highlight line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--c-border), transparent)',
              }} />

              {/* Icon */}
              <div style={{
                width: '52px', height: '52px',
                borderRadius: '14px',
                background: 'rgba(225,6,0,0.08)',
                border: '1px solid rgba(225,6,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', lineHeight: 1,
              }}>
                {achievement.icon}
              </div>

              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <h3 style={{
                  fontSize: '16px', fontWeight: 700,
                  color: 'var(--c-text-1)', letterSpacing: '-0.01em', lineHeight: 1.3,
                }}>
                  {achievement.title}
                </h3>
                <p style={{
                  fontSize: '14px', lineHeight: '1.75',
                  color: 'var(--c-text-3)', margin: 0,
                }}>
                  {achievement.description}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div style={{ height: '2px', borderRadius: '99px', background: 'rgba(225,6,0,0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: '99px',
                    background: 'linear-gradient(90deg, #A60000, #E10600)',
                    boxShadow: '0 0 8px rgba(225,6,0,0.6)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
