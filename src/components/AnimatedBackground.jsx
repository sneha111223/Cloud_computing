import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLES = 30;

export default function AnimatedBackground() {
  const particles = useMemo(() =>
    Array.from({ length: PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Gradient orbs */}
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '10%', left: '15%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [p.y + '%', (p.y - 30) + '%', p.y + '%'], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.x + '%', top: p.y + '%',
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.id % 3 === 0 ? '#7b61ff' : '#00f0ff',
          }}
        />
      ))}
    </div>
  );
}
