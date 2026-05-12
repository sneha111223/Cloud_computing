import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizSlide({ question, options, correctIndex, quizId, onAnswer, answered: alreadyAnswered }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null || alreadyAnswered;

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(quizId, index === correctIndex);
  };

  return (
    <div className="slide-container">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: 10 }}>
        <span style={{
          display: 'inline-block', padding: '8px 28px', borderRadius: 30,
          background: 'linear-gradient(135deg, rgba(0,240,255,0.12), rgba(123,97,255,0.12))',
          border: '1px solid rgba(0,240,255,0.3)',
          color: '#00f0ff', fontWeight: 700, fontSize: '0.9rem',
          letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16,
        }}>
          ❓ Quiz Time
        </span>
      </motion.div>

      <h2 className="slide-title">Question</h2>

      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ fontSize: '1.35rem', color: '#c0c8e0', textAlign: 'center', maxWidth: 750, marginBottom: 40, lineHeight: 1.7 }}>
        {question}
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, width: '100%' }}>
        {options.map((opt, i) => {
          let className = 'quiz-option';
          if (answered && selected !== null) {
            if (i === correctIndex) className += ' correct';
            else if (i === selected) className += ' incorrect';
          }
          return (
            <motion.button key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
              className={className} disabled={answered} onClick={() => handleSelect(i)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{
                  width: 38, height: 38, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                  background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)',
                  fontSize: '0.95rem', color: '#00f0ff', flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: '1.1rem' }}>{opt}</span>
                {answered && selected !== null && i === correctIndex && <CheckCircle size={22} color="#00ff88" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                {answered && selected === i && i !== correctIndex && <XCircle size={22} color="#ff3366" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
              </span>
            </motion.button>
          );
        })}
      </div>

      {answered && selected !== null && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{
            marginTop: 30, padding: '18px 36px', borderRadius: 14,
            background: selected === correctIndex ? 'rgba(0,255,136,0.08)' : 'rgba(255,51,102,0.08)',
            border: `1px solid ${selected === correctIndex ? 'rgba(0,255,136,0.3)' : 'rgba(255,51,102,0.3)'}`,
            color: selected === correctIndex ? '#00ff88' : '#ff3366',
            fontWeight: 700, fontSize: '1.15rem',
          }}>
          {selected === correctIndex ? '🎉 Correct! Great job!' : `❌ Incorrect. The correct answer is: ${options[correctIndex]}`}
        </motion.div>
      )}
    </div>
  );
}
