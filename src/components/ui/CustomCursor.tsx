'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const dx = pos.current.x - trailPos.current.x;
    const dy = pos.current.y - trailPos.current.y;
    trailPos.current.x += dx * 0.35;
    trailPos.current.y += dy * 0.35;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
    }
    if (labelRef.current) {
      labelRef.current.style.transform = `translate(${pos.current.x + 20}px, ${pos.current.y + 20}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isHovering]);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);
    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], input, textarea, select');
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute('data-cursor') || 'INTERACT';
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], input, textarea, select');
      if (interactive) {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            background: '#E10600',
            boxShadow: isHovering
              ? '0 0 20px #E10600, 0 0 40px #E1060080, 0 0 60px #E1060040'
              : '0 0 10px #E1060080, 0 0 20px #E1060040',
          }}
        />
      </div>

      {/* Trail ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: '36px',
            height: '36px',
            border: `1.5px solid ${isHovering ? '#E1060080' : '#E1060030'}`,
            boxShadow: isHovering ? '0 0 20px #E1060020' : 'none',
            background: isHovering ? 'rgba(225, 6, 0, 0.05)' : 'transparent',
          }}
        />
      </div>

      {/* Label */}
      {cursorLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ willChange: 'transform' }}
        >
          <span
            className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded"
            style={{
              color: '#E10600',
              background: 'rgba(225, 6, 0, 0.08)',
              border: '1px solid rgba(225, 6, 0, 0.15)',
            }}
          >
            [{cursorLabel}]
          </span>
        </div>
      )}
    </>
  );
}
