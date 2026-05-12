import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, CheckCircle, XCircle } from 'lucide-react';

const flowchart = [
  { q: '📝 Do you have a comprehensive migration plan?', yes: 1, no: 'fail', fail: 'Without a migration plan, organizations face 60% higher failure rates. Planning defines scope, timeline, risks, and rollback procedures.', tip: 'A migration plan should cover: inventory, dependencies, timeline, risk mitigation, and success criteria.' },
  { q: '💰 Have you performed a thorough cost analysis?', yes: 2, no: 'fail', fail: 'Skipping cost analysis leads to budget overruns of 2-3x. Hidden costs include data transfer, re-licensing, training, and consultant fees.', tip: 'Include: compute costs, storage, bandwidth, licensing, staff training, and a 20% contingency buffer.' },
  { q: '🔀 Have you selected the correct migration approach?', yes: 'success', no: 'fail', fail: 'The wrong approach causes expensive rework. Lift-and-shift for complex apps wastes cloud potential; rearchitecting simple apps wastes time.', tip: 'Match strategy to app complexity: simple apps → rehost, moderate → refactor, complex → rearchitect.' },
];

export default function PitfallsSlide() {
  const [step, setStep] = useState(-1);
  const [result, setResult] = useState(null);

  const handleChoice = (isYes) => {
    if (isYes) {
      if (flowchart[step].yes === 'success') setResult({ type: 'success', msg: '🎉 Your migration path is well-planned and has a high probability of success! All critical checkpoints passed.' });
      else setStep(flowchart[step].yes);
    } else {
      setResult({ type: 'fail', msg: flowchart[step].fail });
    }
  };

  const reset = () => { setStep(-1); setResult(null); };

  const pitfalls = [
    { icon: '📝', title: 'Lack of Planning', desc: 'Rushing into migration without a comprehensive strategy, timeline, and risk assessment leads to delays, failures, and cost overruns.' },
    { icon: '💸', title: 'Poor Cost Analysis', desc: 'Underestimating total cost of ownership — including hidden fees for data transfer, licensing, and training — derails budgets.' },
    { icon: '🔀', title: 'Wrong Migration Approach', desc: 'Choosing lift-and-shift when rearchitecting is needed (or vice versa) results in wasted effort and suboptimal cloud utilization.' },
  ];

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Common Pitfalls to Avoid</h2>
      <p className="slide-subtitle">Navigate the decision flowchart to test if your migration approach would succeed or fail</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {pitfalls.map((p, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{p.icon}</span>
                <div><div className="card-title">{p.title}</div><p className="card-desc">{p.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 430px', padding: 28, textAlign: 'center' }}>
          <div className="sim-instruction">🔀 Answer <strong>Yes/No</strong> at each checkpoint — wrong answers reveal why migrations fail</div>

          {step === -1 && !result && (
            <div style={{ padding: '20px 0' }}>
              <GitBranch size={48} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: '#a0a8c0', fontSize: '1.05rem', marginBottom: 20, lineHeight: 1.6 }}>This flowchart simulates 3 critical decision points in migration planning. See if you'd pass all checkpoints!</p>
              <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={() => setStep(0)}>🚀 Start Decision Flowchart</motion.button>
            </div>
          )}

          {step >= 0 && !result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ padding: '18px 22px', borderRadius: 14, background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', marginBottom: 14 }}>
                <p style={{ color: '#e0e8ff', fontSize: '1.1rem', fontWeight: 700 }}>{flowchart[step].q}</p>
              </div>
              <div style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.12)', marginBottom: 18, textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', color: '#7b61ff', fontWeight: 600 }}>💡 Tip: </span>
                <span style={{ fontSize: '0.85rem', color: '#8890a8' }}>{flowchart[step].tip}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={() => handleChoice(true)} style={{ background: 'rgba(0,255,136,0.06)', borderColor: 'rgba(0,255,136,0.25)', color: '#00ff88', padding: '12px 28px' }}>
                  <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />Yes
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={() => handleChoice(false)} style={{ background: 'rgba(255,51,102,0.06)', borderColor: 'rgba(255,51,102,0.25)', color: '#ff3366', padding: '12px 28px' }}>
                  <XCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />No
                </motion.button>
              </div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 18 }}>
                {flowchart.map((_, i) => (
                  <div key={i} style={{ width: 30, height: 5, borderRadius: 3, background: i < step ? '#00ff88' : i === step ? '#00f0ff' : 'rgba(255,255,255,0.06)', transition: 'all 0.3s' }} />
                ))}
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ padding: '20px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 14 }}>{result.type === 'success' ? '✅' : '❌'}</div>
              <p style={{ color: result.type === 'success' ? '#00ff88' : '#ff3366', fontSize: '1.05rem', fontWeight: 600, marginBottom: 18, lineHeight: 1.6, maxWidth: 400, margin: '0 auto 18px' }}>{result.msg}</p>
              <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={reset}>🔄 Try Again</motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
