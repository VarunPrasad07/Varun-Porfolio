'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_EVENTS } from '@/lib/constants';

const typeColors: Record<string, string> = {
  work:          '#E10600',
  internship:    '#A60000',
  education:     'var(--c-text-1)',
  certification: 'var(--c-text-2)',
  research:      '#FF2B2B',
};

const getAlphaColor = (color: string, percent: number) => {
  if (color.startsWith('var')) {
    return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
  }
  const hexOpacity = Math.round((percent / 100) * 255).toString(16).padStart(2, '0');
  return `${color}${hexOpacity}`;
};

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="timeline" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E10600' }}>
            06 // RESEARCH TIMELINE
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '72px', color: 'var(--c-text-1)' }}
        >
          Experience & Education{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Timeline
          </span>
        </motion.h2>

        {/* ── Timeline list ── */}
        <div style={{ position: 'relative', paddingLeft: '36px' }}>

          {/* Vertical trace line */}
          <div style={{
            position: 'absolute',
            left: '6px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(180deg, rgba(225,6,0,0.5) 0%, rgba(225,6,0,0.05) 100%)',
          }} />

          {TIMELINE_EVENTS.map((event, i) => {
            const color = typeColors[event.type] || '#E10600';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{ position: 'relative', marginBottom: i < TIMELINE_EVENTS.length - 1 ? '48px' : '0' }}
              >
                {/* Node dot */}
                <div style={{
                  position: 'absolute',
                  left: '-33px',
                  top: '6px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: color,
                  boxShadow: `0 0 12px ${getAlphaColor(color, 50)}, 0 0 24px ${getAlphaColor(color, 20)}`,
                  zIndex: 2,
                }} />

                {/* Card */}
                <div style={{
                  background: isLight ? '#FFFFFF' : `linear-gradient(135deg, ${getAlphaColor(color, 4)}, rgba(10,10,10,0.5))`,
                  border: `1px solid ${getAlphaColor(color, 10)}`,
                  borderRadius: '12px',
                  padding: '24px 28px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                }}>
                  {/* Year + badge row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: `${color}`,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}>
                      {event.year}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: color,
                      background: getAlphaColor(color, 8),
                      border: `1px solid ${getAlphaColor(color, 15)}`,
                      borderRadius: '99px',
                      padding: '3px 10px',
                    }}>
                      {event.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--c-text-1)',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em',
                  }}>
                    {event.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    color: color,
                    marginBottom: '14px',
                    letterSpacing: '0.02em',
                    opacity: 0.9,
                  }}>
                    {event.subtitle}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: 'var(--c-text-3)',
                    margin: 0,
                  }}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
