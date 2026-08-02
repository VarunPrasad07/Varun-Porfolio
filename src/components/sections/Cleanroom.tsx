'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/lib/ThemeContext';

const FABRICATION_STEPS = [
  {
    step: '01',
    title: 'Wafer Preparation',
    description: 'Foundation of the journey — learning fundamentals of electronics, digital design, and semiconductor physics.',
    icon: '◉',
    color: '#E10600',
  },
  {
    step: '02',
    title: 'Photolithography',
    description: 'Pattern definition — mastering Verilog HDL, understanding RTL abstractions, and writing first synthesizable designs.',
    icon: '◎',
    color: '#A60000',
  },
  {
    step: '03',
    title: 'Etching & Doping',
    description: 'Precision engineering — advanced verification with UVM, timing analysis, and FPGA prototyping on Xilinx platforms.',
    icon: '⬡',
    color: 'var(--c-text-2)',
  },
  {
    step: '04',
    title: 'Metallization',
    description: 'Connecting layers — integrating embedded systems, AI inference engines, and IoT connectivity into hardware designs.',
    icon: '⬢',
    color: 'var(--c-text-1)',
  },
  {
    step: '05',
    title: 'Testing & Packaging',
    description: 'Quality assurance — full verification suites, coverage-driven testing, and production-ready implementations.',
    icon: '◆',
    color: '#FF2B2B',
  },
];

const getAlphaColor = (color: string, percent: number) => {
  if (color.startsWith('var')) {
    return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
  }
  const hexOpacity = Math.round((percent / 100) * 255).toString(16).padStart(2, '0');
  return `${color}${hexOpacity}`;
};

export default function Cleanroom() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="cleanroom" ref={ref} style={{ padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Cleanroom grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.3,
        backgroundImage: `
          linear-gradient(rgba(225, 6, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(225, 6, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
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
              05 // SEMICONDUCTOR CLEANROOM
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--c-text-1)' }}>
            The <span style={{
              background: 'linear-gradient(135deg, #E10600 0%, #A60000 50%, #FF2B2B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Fabrication</span> Journey
          </h2>
          <p style={{ marginTop: '16px', fontSize: '15px', lineHeight: '1.8', color: 'var(--c-text-3)', maxWidth: '600px' }}>
            My RTL design journey visualized as a semiconductor fabrication process — 
            from wafer preparation to final packaging.
          </p>
        </motion.div>

        {/* Fabrication timeline */}
        <div style={{ position: 'relative' }}>
          {/* Central trace line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(180deg, #E1060020, #E1060008, #E1060020)',
            }}
          />

          {FABRICATION_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                marginBottom: '64px',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              }}
            >
              {/* Node */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                marginTop: '32px',
              }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: step.color,
                    boxShadow: `0 0 15px ${getAlphaColor(step.color, 40)}, 0 0 30px ${getAlphaColor(step.color, 20)}`,
                    animation: 'pulse-glow 3s ease-in-out infinite',
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              </div>

              {/* Content card */}
              <div
                style={{
                  width: 'calc(50% - 2rem)',
                  marginRight: i % 2 === 0 ? 'auto' : 0,
                  marginLeft: i % 2 === 0 ? 0 : 'auto',
                  paddingRight: i % 2 === 0 ? '48px' : 0,
                  paddingLeft: i % 2 === 0 ? 0 : '48px',
                }}
              >
                <div
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    background: isLight 
                      ? '#FFFFFF' 
                      : `linear-gradient(135deg, ${getAlphaColor(step.color, 3)}, rgba(10, 10, 10, 0.5))`,
                    border: isLight
                      ? '1px solid rgba(225, 6, 0, 0.15)'
                      : `1px solid ${getAlphaColor(step.color, 8)}`,
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.5s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = isLight 
                      ? `${getAlphaColor(step.color, 50)}` 
                      : `${getAlphaColor(step.color, 25)}`;
                    (e.currentTarget as HTMLElement).style.background = isLight 
                      ? '#FFFFFF' 
                      : `linear-gradient(135deg, ${getAlphaColor(step.color, 6)}, rgba(10, 10, 10, 0.8))`;
                    if (isLight) {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = isLight 
                      ? 'rgba(225, 6, 0, 0.15)' 
                      : `${getAlphaColor(step.color, 8)}`;
                    (e.currentTarget as HTMLElement).style.background = isLight 
                      ? '#FFFFFF' 
                      : `linear-gradient(135deg, ${getAlphaColor(step.color, 3)}, rgba(10, 10, 10, 0.5))`;
                    if (isLight) {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                    } else {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }
                  }}
                >
                  {/* Step number */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: getAlphaColor(step.color, 20),
                      }}
                    >
                      {step.step}
                    </span>
                    <div style={{ height: '1px', flex: 1, background: getAlphaColor(step.color, 10) }} />
                    <span style={{ fontSize: '18px' }}>{step.icon}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--c-text-1)', marginBottom: '8px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--c-text-3)' }}>
                    {step.description}
                  </p>

                  {/* Laser pulse effect on hover */}
                  <div
                    style={{
                      marginTop: '16px',
                      height: '4px',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      background: getAlphaColor(step.color, 5),
                    }}
                  >
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={inView ? { width: '100%' } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        borderRadius: '9999px',
                        background: `linear-gradient(90deg, transparent, ${getAlphaColor(step.color, 40)}, ${step.color}, ${getAlphaColor(step.color, 40)}, transparent)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wafer visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'relative', width: '256px', height: '256px' }}>
            {/* Wafer circle */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(225, 6, 0, 0.03) 0%, rgba(225, 6, 0, 0.01) 50%, transparent 70%)',
                border: '1px solid rgba(225, 6, 0, 0.08)',
              }}
            />
            {/* Die grid */}
            <div style={{
              position: 'absolute',
              inset: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '4px',
            }}>
              {Array.from({ length: 36 }).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const dist = Math.sqrt(Math.pow(row - 2.5, 2) + Math.pow(col - 2.5, 2));
                const isInCircle = dist < 2.8;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView && isInCircle ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.5 + i * 0.03 }}
                    style={{
                      borderRadius: '2px',
                      background: isInCircle ? `rgba(225, 6, 0, ${0.05 + Math.random() * 0.1})` : 'transparent',
                      border: isInCircle ? '1px solid rgba(225, 6, 0, 0.08)' : 'none',
                    }}
                  />
                );
              })}
            </div>
            {/* Notch */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '8px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                background: 'var(--c-bg)',
                border: '1px solid rgba(225, 6, 0, 0.1)',
                borderBottom: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-32px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: 'var(--c-text-3)',
                opacity: 0.4,
                whiteSpace: 'nowrap',
              }}
            >
              SILICON WAFER — 300mm
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
