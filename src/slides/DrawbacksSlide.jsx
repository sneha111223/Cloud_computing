import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const decisions = [
  { q: '📋 Have you inventoried all applications and dependencies?', good: 'Yes — full inventory completed', bad: 'No — we will discover them during migration', impact: 20, explanation: { good: 'Smart! Knowing all dependencies prevents broken connections during migration.', bad: 'Dangerous! Unknown dependencies cause application failures when migrated out of order.' } },
  { q: '💰 Have you estimated total migration cost including hidden fees?', good: 'Yes — included data transfer, licensing, and training', bad: 'No — we only budgeted for cloud compute costs', impact: 25, explanation: { good: 'Excellent! Data egress, re-licensing, and training often add 40-60% to base costs.', bad: 'Risky! Organizations that skip full cost analysis overspend by 2-3x on average.' } },
  { q: '🔄 Did you choose the right migration strategy per application?', good: 'Yes — matched strategy to each app', bad: 'No — using lift-and-shift for everything', impact: 25, explanation: { good: 'Perfect! Complex apps benefit from rearchitecting while simple ones can be rehosted.', bad: 'Problematic! Lift-and-shift for complex apps misses cloud-native benefits and wastes money.' } },
  { q: '🧪 Did you plan rollback procedures and test in staging?', good: 'Yes — staging environment with rollback plan', bad: 'No — we will migrate directly to production', impact: 30, explanation: { good: 'Great! Staging tests catch 90% of issues before they impact real users.', bad: 'Critical! Without rollback, a failed migration means extended downtime and data risk.' } },
];

export default function DrawbacksSlide() {
  const [step, setStep] = useState(0);
  const [risk, setRisk] = useState(0);
  const [choices, setChoices] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const handleChoice = useCallback((bad) => {
    if (waiting) return;
    const currentDecision = decisions[step];
    if (!currentDecision) return;

    const addedRisk = bad ? currentDecision.impact : 0;
    const fb = bad ? currentDecision.explanation.bad : currentDecision.explanation.good;

    setWaiting(true);
    setRisk(prev => prev + addedRisk);
    setFeedback({ bad, msg: fb });

    setTimeout(() => {
      setChoices(prev => [...prev, bad]);
      setStep(prev => prev + 1);
      setFeedback(null);
      setWaiting(false);
    }, 1800);
  }, [step, waiting]);

  const reset = () => { setStep(0); setRisk(0); setChoices([]); setFeedback(null); setWaiting(false); };

  const finished = step >= decisions.length && !feedback;

  const drawbacks = [
    { icon: '⏱️', title: 'Downtime Risk', desc: 'Migration windows cause service interruptions — proper scheduling and blue-green deployments minimize user impact.' },
    { icon: '💰', title: 'Hidden Costs', desc: 'Data transfer fees, new licensing, cloud training, and consulting costs frequently exceed initial budget estimates.' },
    { icon: '🔗', title: 'Integration Challenges', desc: 'Legacy applications may use protocols or APIs incompatible with cloud services, requiring middleware development.' },
    { icon: '🧩', title: 'Operational Complexity', desc: 'Managing hybrid or multi-cloud environments requires new skills, tools, and processes your team may not have.' },
  ];

  const riskColor = risk > 60 ? '#ff3366' : risk > 30 ? '#ffaa00' : '#00ff88';
  const riskLabel = risk > 60 ? 'CRITICAL — Migration will likely fail' : risk > 30 ? 'MODERATE — Address gaps before migrating' : 'LOW — Migration should succeed';

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Drawbacks of Cloud Migration</h2>
      <p className="slide-subtitle">Test your migration readiness — make decisions and watch the risk meter respond</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {drawbacks.map((d, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{d.icon}</span>
                <div><div className="card-title">{d.title}</div><p className="card-desc">{d.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 420px', padding: 28, textAlign: 'center' }}>
          <div className="sim-instruction">⚠️ Answer 4 real migration planning questions — see how poor decisions increase failure risk</div>

          {/* Risk gauge */}
          <div style={{ position: 'relative', width: 170, height: 85, margin: '10px auto 12px', overflow: 'hidden' }}>
            <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%' }}>
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round" />
              <motion.path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={riskColor} strokeWidth="8" strokeLinecap="round"
                animate={{ strokeDasharray: `${(risk / 100) * 126} 126` }}
                transition={{ duration: 0.8, ease: 'easeOut' }} />
            </svg>
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
              <motion.div key={risk} initial={{ scale: 1.3 }} animate={{ scale: 1 }} style={{ fontSize: '1.8rem', fontWeight: 900, color: riskColor }}>{risk}%</motion.div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: riskColor, fontWeight: 700, marginBottom: 16 }}>{riskLabel}</div>

          {/* Decision progress */}
          <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 16 }}>
            {decisions.map((_, i) => (
              <div key={i} style={{
                width: 30, height: 5, borderRadius: 3, transition: 'all 0.3s',
                background: i < choices.length ? (choices[i] ? '#ff3366' : '#00ff88') : i === step ? '#7b61ff' : 'rgba(255,255,255,0.06)',
              }} />
            ))}
          </div>

          {feedback && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ padding: '12px 18px', borderRadius: 12, marginBottom: 14, background: feedback.bad ? 'rgba(255,51,102,0.06)' : 'rgba(0,255,136,0.06)', border: `1px solid ${feedback.bad ? 'rgba(255,51,102,0.2)' : 'rgba(0,255,136,0.2)'}`, color: feedback.bad ? '#ff3366' : '#00ff88', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>
              {feedback.bad ? '❌ ' : '✅ '}{feedback.msg}
            </motion.div>
          )}

          {step < decisions.length && !feedback ? (
            <div>
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.1)', marginBottom: 16 }}>
                <p style={{ color: '#c0c8e0', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5 }}>
                  Question {step + 1} of {decisions.length}
                </p>
                <p style={{ color: '#e0e8ff', fontSize: '1.1rem', fontWeight: 700, marginTop: 6, lineHeight: 1.5 }}>{decisions[step].q}</p>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={() => handleChoice(false)} style={{ background: 'rgba(0,255,136,0.06)', borderColor: 'rgba(0,255,136,0.25)', color: '#00ff88', fontSize: '0.88rem', padding: '12px 20px' }}>
                  ✓ {decisions[step].good}
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={() => handleChoice(true)} style={{ background: 'rgba(255,51,102,0.06)', borderColor: 'rgba(255,51,102,0.25)', color: '#ff3366', fontSize: '0.88rem', padding: '12px 20px' }}>
                  ✗ {decisions[step].bad}
                </motion.button>
              </div>
            </div>
          ) : finished ? (
            <div>
              <p style={{ color: riskColor, fontSize: '1.1rem', fontWeight: 700, marginBottom: 14, lineHeight: 1.5 }}>
                {risk > 60 ? '💥 High failure probability! Too many shortcuts taken.' : risk > 30 ? '⚠️ Migration has risks — address the gaps before proceeding.' : '🎉 Excellent planning! This migration has strong odds of success.'}
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                {choices.map((bad, i) => (
                  <div key={i} style={{ padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, background: bad ? 'rgba(255,51,102,0.08)' : 'rgba(0,255,136,0.08)', border: `1px solid ${bad ? 'rgba(255,51,102,0.2)' : 'rgba(0,255,136,0.2)'}`, color: bad ? '#ff3366' : '#00ff88' }}>
                  {bad ? '✗' : '✓'} Q{i + 1}: {bad ? `+${decisions[i].impact}% risk` : 'Safe'}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={reset}>🔄 Try Again with Different Choices</motion.button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
