'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '@/lib/constants';
import { useTheme } from '@/lib/ThemeContext';

export default function Robotics() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const roboticsProjects = PROJECTS.filter((p) => p.category === 'Robotics' || p.category === 'Embedded');

  return (
    <section id="robotics" ref={ref} style={{ padding: '8rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.3em', color: '#E10600' }}>
              04 // ROBOTICS LAB
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--c-text-1)' }}>
            Robotics <span style={{
              background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Laboratory</span>
          </h2>
          <p style={{ marginTop: '16px', fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', maxWidth: '600px' }}>
            Hardware meets intelligence — exploring autonomous systems, embedded AI, and 
            human-robot interaction through hands-on engineering.
          </p>
        </motion.div>

        {/* Robot showcase grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {roboticsProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: isLight 
                  ? '#FFFFFF' 
                  : 'linear-gradient(135deg, rgba(26, 26, 26, 0.45), rgba(10, 10, 10, 0.7))',
                border: isLight
                  ? '1px solid rgba(225, 6, 0, 0.15)'
                  : `1px solid ${project.color}15`,
                boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                flexDirection: 'column',
              }}
              data-cursor={project.title.toUpperCase()}
            >
              {/* Robot visualization header */}
              <div
                style={{
                  position: 'relative',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  background: isLight 
                    ? `linear-gradient(135deg, ${project.color}10, #F5F5F5)`
                    : `linear-gradient(135deg, ${project.color}08, rgba(10, 10, 10, 0.9))`,
                }}
              >
                {/* Circuit board pattern */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }} viewBox="0 0 200 200">
                  <pattern id={`pcb-${project.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <line x1="20" y1="0" x2="20" y2="20" stroke={project.color} strokeWidth="0.5" />
                    <line x1="0" y1="20" x2="20" y2="20" stroke={project.color} strokeWidth="0.5" />
                    <circle cx="20" cy="20" r="2" fill={project.color} opacity="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pcb-${project.id})`} />
                </svg>

                {/* Robot icon */}
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                  <div
                    style={{
                      width: '80px', height: '80px', margin: '0 auto 12px auto',
                      borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}25`,
                      boxShadow: `0 0 30px ${project.color}10`,
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <div
                      style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                        border: `1px solid ${project.color}40`,
                        boxShadow: `0 0 15px ${project.color}20`,
                      }}
                    />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: `${project.color}80` }}>
                    {project.category.toUpperCase()} MODULE
                  </span>
                </div>

                {/* Sensor indicators */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: project.color,
                        boxShadow: `0 0 4px ${project.color}`,
                        animation: `pulse-glow ${1.5 + s * 0.3}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '4px' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '13px', color: project.color, marginBottom: '12px' }}>
                  {project.subtitle}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--c-text-3)', marginBottom: '20px', flex: 1 }}>
                  {project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description}
                </p>

                {/* Tech indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                        background: `${project.color}08`,
                        border: `1px solid ${project.color}12`,
                        color: `${project.color}90`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Status bar */}
                <div
                  style={{
                    paddingTop: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--c-text-3)', opacity: 0.6,
                    borderTop: `1px solid ${project.color}10`,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-red)', boxShadow: '0 0 6px var(--c-red)' }} />
                    OPERATIONAL
                  </span>
                  <span>{project.highlights.length} FEATURES</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hardware architecture bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            marginTop: '48px',
            padding: '28px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(225, 6, 0, 0.02), rgba(166, 0, 0, 0.02))',
            border: '1px solid rgba(225, 6, 0, 0.06)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E10600', marginBottom: '20px' }}>
            HARDWARE ECOSYSTEM
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['ESP32', 'Arduino Mega', 'STM32', 'Servo Motors', 'LIDAR', 'IMU', 'I2S Mic', 'OLED', 'BLE Module', 'Motor Driver'].map((hw) => (
              <div
                key={hw}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(225, 6, 0, 0.04)',
                  border: '1px solid rgba(225, 6, 0, 0.08)',
                  color: 'var(--c-text-3)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E1060030' }} />
                {hw}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
