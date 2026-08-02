'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let traces: Trace[] = [];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    interface TraceSegment {
      x: number;
      y: number;
    }

    interface Trace {
      segments: TraceSegment[];
      progress: number;
      speed: number;
      color: string;
      alpha: number;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.7 ? '#A60000' : '#E10600',
      }));
    };

    const initTraces = () => {
      traces = Array.from({ length: 8 }, () => {
        const segments: TraceSegment[] = [];
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        const segmentCount = Math.floor(Math.random() * 6) + 3;

        for (let i = 0; i < segmentCount; i++) {
          segments.push({ x, y });
          // PCB traces go in straight lines (horizontal or vertical)
          if (Math.random() > 0.5) {
            x += (Math.random() - 0.5) * 200;
          } else {
            y += (Math.random() - 0.5) * 200;
          }
        }

        return {
          segments,
          progress: 0,
          speed: Math.random() * 0.003 + 0.001,
          color: '#E10600',
          alpha: Math.random() * 0.08 + 0.02,
        };
      });
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(225, 6, 0, 0.02)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#E10600';
            ctx.globalAlpha = (1 - dist / 120) * 0.05;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const drawTraces = () => {
      traces.forEach((trace) => {
        trace.progress += trace.speed;
        if (trace.progress > 1) trace.progress = 0;

        const totalSegments = trace.segments.length - 1;
        const currentSegIdx = Math.floor(trace.progress * totalSegments);
        const segProgress = (trace.progress * totalSegments) % 1;

        ctx.beginPath();
        ctx.moveTo(trace.segments[0].x, trace.segments[0].y);

        for (let i = 1; i <= currentSegIdx && i < trace.segments.length; i++) {
          ctx.lineTo(trace.segments[i].x, trace.segments[i].y);
        }

        if (currentSegIdx < totalSegments) {
          const from = trace.segments[currentSegIdx];
          const to = trace.segments[currentSegIdx + 1];
          ctx.lineTo(
            from.x + (to.x - from.x) * segProgress,
            from.y + (to.y - from.y) * segProgress
          );
        }

        ctx.strokeStyle = trace.color;
        ctx.globalAlpha = trace.alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Glow at the head
        if (currentSegIdx < totalSegments) {
          const from = trace.segments[currentSegIdx];
          const to = trace.segments[currentSegIdx + 1];
          const headX = from.x + (to.x - from.x) * segProgress;
          const headY = from.y + (to.y - from.y) * segProgress;

          const gradient = ctx.createRadialGradient(headX, headY, 0, headX, headY, 8);
          gradient.addColorStop(0, 'rgba(225, 6, 0, 0.2)');
          gradient.addColorStop(1, 'rgba(225, 6, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(headX - 8, headY - 8, 16, 16);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawParticles();
      drawTraces();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    initTraces();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
