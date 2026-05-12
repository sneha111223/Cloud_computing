import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Cloud } from 'lucide-react';

export default function ThankYouSlide({ onRestart }) {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 5,
    dur: 4 + Math.random() * 6, size: 2 + Math.random() * 4,
  })), []);

  return (
    <div className="slide-container" style={{ justifyContent: 'center', overflow: 'hidden' }}>
      {/* Cloud particles */}
      {particles.map(p => (
        <motion.div key={p.id}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-10%', opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          style={{ position: 'absolute', left: p.x + '%', width: p.size, height: p.size, borderRadius: '50%', background: p.id % 3 === 0 ? '#7b61ff' : '#00f0ff' }}
        />
      ))}

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}
        style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(123,97,255,0.15))', border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <Cloud size={40} color="#00f0ff" />
      </motion.div>

      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        className="glow-text"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', background: 'linear-gradient(135deg, #00f0ff, #7b61ff, #00f0ff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gradient-shift 3s ease infinite', marginBottom: 12, textAlign: 'center' }}>
        Thank You!
      </motion.h1>

      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ color: 'rgba(224,232,255,0.5)', fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 40, textAlign: 'center' }}>
        We hope you enjoyed this interactive presentation on<br />Cloud Migration Planning
      </motion.p>

      <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(0,240,255,0.4)' }} whileTap={{ scale: 0.95 }}
        className="neon-btn" onClick={onRestart}
        style={{ fontSize: '1.05rem', padding: '14px 36px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <RotateCcw size={18} /> Restart Presentation
      </motion.button>
    </div>
  );
}
