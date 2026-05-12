import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Zap, Globe } from 'lucide-react';

export default function TitleSlide() {
  return (
    <div className="slide-container" style={{ justifyContent: 'center', gap: 0 }}>
      {/* Floating cloud icons */}
      {[Cloud, Zap, Globe].map((Icon, i) => (
        <motion.div
          key={i}
          className="animate-float"
          style={{
            position: 'absolute',
            top: [15, 60, 30][i] + '%',
            left: [10, 80, 70][i] + '%',
            opacity: 0.12,
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          <Icon size={60 + i * 20} color="#00f0ff" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        style={{
          width: 90, height: 90, borderRadius: '50%', marginBottom: 28,
          background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(123,97,255,0.15))',
          border: '2px solid rgba(0,240,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Cloud size={44} color="#00f0ff" />
      </motion.div>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="glow-text"
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 3.8rem)',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7b61ff 50%, #00f0ff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', textAlign: 'center', lineHeight: 1.15,
          animation: 'gradient-shift 4s ease infinite',
        }}
      >
        Planning and Executing<br />Cloud Migration
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="slide-subtitle"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', maxWidth: 600, marginTop: 16 }}
      >
        Introduction to Cloud Computing and Virtualization
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {['Interactive Simulations', 'Real-time Demos', 'Quizzes'].map((t, i) => (
          <span key={i} style={{
            padding: '8px 20px', borderRadius: 30,
            background: 'rgba(0,240,255,0.06)',
            border: '1px solid rgba(0,240,255,0.15)',
            color: '#80d0e0', fontSize: '0.85rem', fontWeight: 500,
          }}>
            {['🎮', '📊', '❓'][i]} {t}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        style={{ marginTop: 50, color: 'rgba(0,240,255,0.5)', fontSize: '0.9rem' }}
      >
        Press → or click Next to begin
      </motion.p>
    </div>
  );
}
