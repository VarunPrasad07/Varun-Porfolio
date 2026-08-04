'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CONTACT_INFO } from '@/lib/constants';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [submittedPayload, setSubmittedPayload] = useState<{ name: string; email: string; message: string; time: string; note?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');

    const payloadData = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleTimeString(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('sent');
        setSubmittedPayload({ ...payloadData, note: data.message });
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        console.error('[Contact] Submission failed:', data.message);
        setStatus('failed');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Transmission API dispatch error:', err);
      setStatus('failed');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const fields = [
    { label: 'Signal Identifier', hint: 'NAME', key: 'name' as const, type: 'text', placeholder: 'Your full name' },
    { label: 'Return Address', hint: 'EMAIL', key: 'email' as const, type: 'email', placeholder: 'you@example.com' },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #E10600, transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E10600' }}>
            GET IN TOUCH
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', color: 'var(--c-text-1)' }}
        >
          Let&apos;s{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E10600 0%, #FF2B2B 50%, var(--c-text-1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ fontSize: '16px', color: 'var(--c-text-3)', lineHeight: '1.7', marginBottom: '64px', maxWidth: '560px' }}
        >
          Open to opportunities in RTL Design, Embedded Systems, and AIoT. Feel free to reach out for collaborations or just a conversation about engineering.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* ── Left: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Communication channels */}
            <div style={{
              padding: '32px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(255,43,43,0.03), rgba(225,6,0,0.03))',
              border: '1px solid rgba(255,43,43,0.12)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#FF2B2B', marginBottom: '28px' }}>
                COMMUNICATION_CHANNELS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'ROLE', value: CONTACT_INFO.role, href: null, isLink: false },
                  { label: 'EMAIL', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, isLink: true },
                  { label: 'PHONE', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, isLink: true },
                  { label: 'LOCATION', value: CONTACT_INFO.location, href: null, isLink: false },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: '#E10600', paddingTop: '3px', flexShrink: 0, minWidth: '80px' }}>
                      {item.label}
                    </span>
                    {item.isLink ? (
                      <a href={item.href!} style={{ fontSize: '14px', color: 'var(--c-text-2)', textDecoration: 'none', lineHeight: '1.5', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#E10600')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-2)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '14px', color: 'var(--c-text-3)', lineHeight: '1.5' }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Network suites */}
            <div style={{
              padding: '32px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(255,43,43,0.03), rgba(225,6,0,0.03))',
              border: '1px solid rgba(255,43,43,0.12)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#FF2B2B', marginBottom: '24px' }}>
                NETWORK_SUITES
              </h3>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: CONTACT_INFO.github },
                  { label: 'LinkedIn', href: CONTACT_INFO.linkedin },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={link.label.toUpperCase()}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '10px 24px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      color: 'var(--c-text-3)',
                      border: '1px solid rgba(255,43,43,0.15)',
                      background: 'rgba(255,43,43,0.04)',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#FF2B2B';
                      el.style.borderColor = 'rgba(255,43,43,0.4)';
                      el.style.background = 'rgba(255,43,43,0.08)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = 'var(--c-text-3)';
                      el.style.borderColor = 'rgba(255,43,43,0.15)';
                      el.style.background = 'rgba(255,43,43,0.04)';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              padding: '36px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26,26,26,0.45), rgba(10,10,10,0.65))',
              border: '1px solid rgba(225,6,0,0.08)',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Name & Email fields */}
              {fields.map((field) => (
                <div key={field.key}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    color: 'var(--c-text-3)',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}>
                    {field.label} <span style={{ color: '#FF2B2B', opacity: 0.7 }}>/ {field.hint}</span>
                  </label>
                  <input
                    type={field.type}
                    required
                    disabled={status !== 'idle'}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '13px 18px',
                      borderRadius: '8px',
                      background: isLight ? '#F5F5F5' : 'rgba(10,10,10,0.8)',
                      border: '1px solid rgba(225,6,0,0.10)',
                      color: isLight ? '#111111' : 'var(--c-text-1)',
                      fontSize: '15px',
                      fontFamily: 'var(--font-inter)',
                      outline: 'none',
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(225,6,0,0.45)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(225,6,0,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(225,6,0,0.10)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              {/* Message field */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: 'var(--c-text-3)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  Message <span style={{ color: '#FF2B2B', opacity: 0.7 }}>/ PAYLOAD</span>
                </label>
                <textarea
                  required
                  disabled={status !== 'idle'}
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your transmission..."
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    borderRadius: '8px',
                    background: isLight ? '#F5F5F5' : 'rgba(10,10,10,0.8)',
                    border: '1px solid rgba(225,6,0,0.10)',
                    color: isLight ? '#111111' : 'var(--c-text-1)',
                    fontSize: '15px',
                    fontFamily: 'var(--font-inter)',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: '1.7',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(225,6,0,0.45)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(225,6,0,0.06)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(225,6,0,0.10)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                data-cursor={status === 'idle' ? 'TRANSMIT' : ''}
                style={{
                  padding: '15px 32px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--c-text-1)',
                  background: 'linear-gradient(135deg, rgba(255,43,43,0.15), rgba(166,0,0,0.25))',
                  border: '1px solid rgba(255,43,43,0.40)',
                  cursor: status !== 'idle' ? 'default' : 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: status === 'sent' ? '0 0 20px rgba(208,208,208,0.2)' : 'none',
                }}
                onMouseEnter={e => {
                  if (status === 'idle') {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255,43,43,0.25), rgba(166,0,0,0.35))';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(10,10,10,0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (status === 'idle') {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255,43,43,0.15), rgba(166,0,0,0.25))';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      TRANSMIT PAYLOAD
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>◌</span>
                      TRANSMITTING...
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: 'var(--c-text-2)' }}>
                      ✓ LINK ESTABLISHED
                    </motion.span>
                  )}
                  {status === 'failed' && (
                    <motion.span key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: '#FF4444' }}>
                      ✗ TRANSMISSION FAILED — RETRY
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>

            {/* Transmission Log Receipt Card */}
            <AnimatePresence>
              {submittedPayload && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    marginTop: '20px',
                    padding: '18px 20px',
                    borderRadius: '10px',
                    background: 'rgba(0, 230, 118, 0.05)',
                    border: '1px solid rgba(0, 230, 118, 0.3)',
                    boxShadow: '0 0 15px rgba(0, 230, 118, 0.1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: isLight ? '#007E33' : '#00E676',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>
                    <span>✓</span> TRANSMISSION LOG RECORDED & DISPATCHED
                  </div>
                  <div><strong style={{ opacity: 0.7 }}>TARGET:</strong> {CONTACT_INFO.email}</div>
                  <div><strong style={{ opacity: 0.7 }}>SENDER:</strong> {submittedPayload.name} &lt;{submittedPayload.email}&gt;</div>
                  <div><strong style={{ opacity: 0.7 }}>PAYLOAD:</strong> &quot;{submittedPayload.message}&quot;</div>
                  <div style={{ marginTop: '6px', opacity: 0.6, fontSize: '10px' }}>TIMESTAMP: {submittedPayload.time}</div>
                  {submittedPayload.note && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed rgba(0,230,118,0.2)', color: '#FFD700', fontSize: '11px' }}>
                      ⚡ STATUS: {submittedPayload.note}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
