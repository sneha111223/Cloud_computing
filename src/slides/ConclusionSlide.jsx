import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function ConclusionSlide({ quizScore, totalQuizzes }) {
  const pct = totalQuizzes > 0 ? Math.round((quizScore / totalQuizzes) * 100) : 0;
  const grade = pct >= 80 ? { label: 'Cloud Expert', color: '#00ff88', emoji: '🏆' } : pct >= 50 ? { label: 'Intermediate', color: '#ffaa00', emoji: '⭐' } : { label: 'Beginner', color: '#ff3366', emoji: '📚' };

  const takeaways = [
    { icon: '📋', text: 'Thorough assessment and inventory are the foundation — know your systems before migrating them.' },
    { icon: '🎯', text: 'Choosing the right strategy (rehost, refactor, rearchitect) determines migration success and ROI.' },
    { icon: '🔒', text: 'Security and compliance must be embedded at every stage — not bolted on at the end.' },
    { icon: '📊', text: 'Comprehensive testing and continuous monitoring ensure post-migration reliability.' },
    { icon: '⚠️', text: 'Avoiding common pitfalls (no planning, poor cost analysis, wrong approach) prevents costly failures.' },
  ];

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Conclusion</h2>
      <p className="slide-subtitle">Key takeaways from this presentation and your migration readiness score</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {takeaways.map((t, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="card-icon">{t.icon}</span>
                <span style={{ color: '#b8c0d8', fontSize: '1rem', lineHeight: 1.55 }}>{t.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-strong" style={{ flex: '1 1 340px', padding: 32, textAlign: 'center' }}>
          <Award size={48} color={grade.color} style={{ marginBottom: 14 }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#e0e8ff', marginBottom: 8 }}>Cloud Migration Success Score</h3>
          <p style={{ color: '#5a6080', fontSize: '0.9rem', marginBottom: 16 }}>Based on your quiz answers throughout this presentation</p>
          <div style={{ position: 'relative', width: 150, height: 150, margin: '0 auto 16px' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" />
              <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke={grade.color} strokeWidth="3.5" strokeLinecap="round" initial={{ strokeDasharray: '0 97.4' }} animate={{ strokeDasharray: `${(pct / 100) * 97.4} 97.4` }} transition={{ duration: 1.5, delay: 0.5 }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: grade.color }}>{pct}%</span>
              <span style={{ fontSize: '0.8rem', color: '#5a6080' }}>{quizScore}/{totalQuizzes} correct</span>
            </div>
          </div>
          <div style={{ fontSize: '2rem', marginBottom: 6 }}>{grade.emoji}</div>
          <div style={{ color: grade.color, fontWeight: 800, fontSize: '1.2rem' }}>{grade.label}</div>
          <p style={{ color: '#5a6080', fontSize: '0.85rem', marginTop: 10, lineHeight: 1.5 }}>
            {pct >= 80 ? 'Outstanding! You have a strong understanding of cloud migration.' : pct >= 50 ? 'Good foundation! Review the topics you missed to strengthen your knowledge.' : 'Keep learning! Review the slides to improve your cloud migration knowledge.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
