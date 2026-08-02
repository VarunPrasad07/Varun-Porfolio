'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useInView } from 'react-intersection-observer';

const profiles = [
  { title: 'RTL Design Engineer', desc: 'Crafting efficient digital logic at the register-transfer level', icon: '⬡', color: '#E10600' },
  { title: 'Embedded Systems Developer', desc: 'Building intelligent hardware-software interfaces', icon: '⚙', color: 'var(--c-text-2)' },
  { title: 'AI & IoT Enthusiast', desc: 'Exploring the convergence of intelligence and connectivity', icon: '◎', color: '#A60000' },
  { title: 'Electronics Engineer', desc: 'From transistors to systems — full-stack hardware', icon: '◆', color: 'var(--c-text-1)' },
];

const getAlphaColor = (color: string, percent: number) => {
  if (color.startsWith('var')) {
    return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
  }
  const hexOpacity = Math.round((percent / 100) * 255).toString(16).padStart(2, '0');
  return `${color}${hexOpacity}`;
};

const interests = ['Digital Design', 'Computer Architecture', 'Verification', 'ASIC Flow', 'Signal Processing', 'Edge AI', 'Robotics', 'IoT'];

const cards = [
  {
    title: 'Engineering Philosophy',
    text: 'I believe in bridging the gap between silicon and software — designing digital systems that are not only functionally correct but also efficient, scalable, and elegant. Every register, every state machine, every timing constraint tells a story of engineering precision.',
  },
  {
    title: 'Career Objective',
    text: "To contribute to the advancement of semiconductor technology through innovative RTL design methodologies, pushing the boundaries of what's possible in VLSI, FPGA, and embedded systems while integrating AI and IoT capabilities for next-generation intelligent hardware solutions.",
  },
  {
    title: 'Education',
    text: 'B.E. in Electronics & Communication Engineering with specialization in VLSI Design and Embedded Systems. Focused on digital design, computer architecture, and semiconductor physics.',
  },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="about" ref={ref} style={{ padding: '8rem 1.5rem' }}>
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
            01 // MISSION BRIEF
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '64px', color: 'var(--c-text-1)' }}
        >
          About{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Me</span>
        </motion.h2>

        {/* Two-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>

          {/* Left — narrative cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {cards.map((card, i) => (
              <div key={i} style={{
                padding: '28px 32px',
                borderRadius: '14px',
                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(225,6,0,0.03), rgba(166,0,0,0.03))',
                border: '1px solid rgba(225,6,0,0.10)',
              }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--c-text-1)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', margin: 0 }}>
                  {card.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Right — profile cards + interests */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {profiles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '22px 26px',
                  borderRadius: '12px',
                  background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26,26,26,0.5), rgba(10,10,10,0.7))',
                  border: `1px solid ${getAlphaColor(p.color, 8)}`,
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
                data-cursor={p.title.toUpperCase()}
              >
                <div style={{
                  width: '48px', height: '48px', flexShrink: 0,
                  borderRadius: '12px',
                  background: getAlphaColor(p.color, 6),
                  border: `1px solid ${getAlphaColor(p.color, 15)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--c-text-1)', marginBottom: '5px' }}>{p.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#6B7A8D', margin: 0 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Interests */}
            <div style={{
              padding: '26px 28px',
              borderRadius: '14px',
              background: isLight ? '#F8F8F8' : 'linear-gradient(135deg, rgba(225,6,0,0.02), rgba(166,0,0,0.04))',
              border: '1px solid rgba(225,6,0,0.08)',
              marginTop: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D0D0D0', boxShadow: '0 0 6px #D0D0D0' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', color: '#E10600' }}>
                  TECHNICAL INTERESTS
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map((item) => (
                  <span key={item} style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.04em',
                    color: 'var(--c-text-3)',
                    background: 'rgba(225,6,0,0.05)',
                    border: '1px solid rgba(225,6,0,0.10)',
                  }}>{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
