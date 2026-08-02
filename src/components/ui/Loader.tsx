'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADER_STEPS } from '@/lib/constants';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [binaryStream, setBinaryStream] = useState<string[]>([]);

  // Generate binary stream for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryStream((prev) => {
        const newLine = Array.from({ length: 40 }, () =>
          Math.random() > 0.5 ? '1' : '0'
        ).join(' ');
        const next = [...prev, newLine];
        return next.length > 12 ? next.slice(-12) : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const advanceLoader = useCallback(() => {
    const stepDuration = 350;
    const totalSteps = LOADER_STEPS.length;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        setProgress(Math.round((next / totalSteps) * 100));
        if (next >= totalSteps) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 600);
          }, 400);
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const cleanup = advanceLoader();
    return cleanup;
  }, [advanceLoader]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: 'var(--c-bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Binary stream background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="font-mono text-[10px] leading-relaxed text-cyan-400 whitespace-pre p-8">
              {binaryStream.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[1px] opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, #E10600, transparent)',
              animation: 'scan 2s linear infinite',
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full px-6">
            {/* Chip visualization */}
            <motion.div
              className="relative w-24 h-24"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Chip body */}
              <div
                className="absolute inset-3 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #0B1B3D, #111128)',
                  border: '1px solid #E1060030',
                  boxShadow: `0 0 ${10 + progress * 0.3}px #E10600${Math.round(progress * 0.6).toString(16).padStart(2, '0')}, inset 0 0 15px #E1060010`,
                }}
              />
              {/* Chip pins - top */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`t-${i}`}
                  className="absolute top-0 w-[2px] h-3"
                  style={{
                    left: `${18 + i * 12}%`,
                    background: progress > (i * 15) ? '#E10600' : '#E1060020',
                    boxShadow: progress > (i * 15) ? '0 0 6px #E10600' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
              {/* Chip pins - bottom */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`b-${i}`}
                  className="absolute bottom-0 w-[2px] h-3"
                  style={{
                    left: `${18 + i * 12}%`,
                    background: progress > (i * 15 + 10) ? '#E10600' : '#E1060020',
                    boxShadow: progress > (i * 15 + 10) ? '0 0 6px #E10600' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
              {/* Chip pins - left */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`l-${i}`}
                  className="absolute left-0 h-[2px] w-3"
                  style={{
                    top: `${18 + i * 12}%`,
                    background: progress > (i * 15 + 5) ? '#E10600' : '#E1060020',
                    boxShadow: progress > (i * 15 + 5) ? '0 0 6px #E10600' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
              {/* Chip pins - right */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`r-${i}`}
                  className="absolute right-0 h-[2px] w-3"
                  style={{
                    top: `${18 + i * 12}%`,
                    background: progress > (i * 15 + 8) ? '#E10600' : '#E1060020',
                    boxShadow: progress > (i * 15 + 8) ? '0 0 6px #E10600' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
              {/* Center die */}
              <motion.div
                className="absolute inset-6 rounded flex items-center justify-center font-mono text-xs"
                style={{
                  background: progress > 90 ? 'rgba(225, 6, 0, 0.1)' : 'transparent',
                  color: '#E10600',
                  transition: 'all 0.5s',
                }}
              >
                {progress}%
              </motion.div>
            </motion.div>

            {/* Loading steps */}
            <div className="w-full space-y-1.5">
              {LOADER_STEPS.slice(0, currentStep + 1).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i === currentStep ? 1 : 0.4, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 font-mono text-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: i < currentStep ? '#D0D0D0' : i === currentStep ? '#E10600' : '#E1060020',
                      boxShadow: i === currentStep ? '0 0 8px #E10600' : 'none',
                    }}
                  />
                  <span style={{ color: i < currentStep ? '#9A9A9A' : i === currentStep ? '#E10600' : '#9A9A9A' }}>
                    {i < currentStep ? '✓' : '›'} {step}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: '#E1060010' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #E10600, #A60000)',
                  boxShadow: '0 0 10px #E1060080',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Status text */}
            <motion.p
              className="font-mono text-xs tracking-wider"
              style={{ color: 'var(--c-text-3)' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              VARUN PRASAD // RTL DESIGN ENGINEER // PORTFOLIO v1.0
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
