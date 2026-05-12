import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function TestingSlide() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState(0);
  const ref = useRef(null);

  const runTest = () => {
    setRunning(true); setDone(false); setTick(0);
    let t = 0;
    ref.current = setInterval(() => {
      t++;
      setTick(t);
      if (t >= 20) { clearInterval(ref.current); setRunning(false); setDone(true); }
    }, 200);
  };

  useEffect(() => () => clearInterval(ref.current), []);

  const tests = [
    { title: 'Performance Testing', desc: 'Compare response times before and after migration to ensure the cloud meets or exceeds on-premise performance.', icon: '⚡' },
    { title: 'Scalability Testing', desc: 'Verify that cloud auto-scaling handles 2x, 5x, and 10x traffic spikes without degradation.', icon: '📈' },
    { title: 'Reliability Testing', desc: 'Simulate server failures in the cloud to confirm automatic failover and data recovery work correctly.', icon: '🛡️' },
  ];

  // Pre vs Post migration comparison
  const comparisons = [
    { metric: 'Response Time', pre: '340ms', post: Math.max(45, 340 - tick * 15) + 'ms', preVal: 340, postVal: Math.max(45, 340 - tick * 15), unit: 'ms', better: 'lower', color: '#00f0ff' },
    { metric: 'Throughput', pre: '200 req/s', post: Math.min(950, 200 + tick * 38) + ' req/s', preVal: 200, postVal: Math.min(950, 200 + tick * 38), unit: 'req/s', better: 'higher', color: '#7b61ff' },
    { metric: 'Uptime', pre: '99.5%', post: (Math.min(99.99, 99.5 + tick * 0.025)).toFixed(2) + '%', preVal: 99.5, postVal: Math.min(99.99, 99.5 + tick * 0.025), unit: '%', better: 'higher', color: '#00ff88' },
    { metric: 'Cost/Hour', pre: '$12.50', post: '$' + (Math.max(4.2, 12.5 - tick * 0.42)).toFixed(2), preVal: 12.5, postVal: Math.max(4.2, 12.5 - tick * 0.42), unit: '$', better: 'lower', color: '#ffaa00' },
  ];

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Testing and Validation</h2>
      <p className="slide-subtitle">Compare on-premise vs cloud performance to validate the migration was successful</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tests.map((t, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{t.icon}</span>
                <div><div className="card-title">{t.title}</div><p className="card-desc">{t.desc}</p></div>
              </div>
            </motion.div>
          ))}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="neon-btn" onClick={runTest} disabled={running} style={{ marginTop: 8 }}>
            {running ? '⏳ Running Migration Tests...' : done ? '🔄 Run Again' : '▶️ Run Post-Migration Test'}
          </motion.button>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 500px', padding: 28 }}>
          <div className="sim-instruction">📊 Click <strong>"Run Post-Migration Test"</strong> to compare on-premise vs cloud performance metrics</div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginBottom: 16 }}>
            <span style={{ fontSize: '0.9rem', color: '#ff3366', fontWeight: 700 }}>🏢 On-Premise (Before)</span>
            <span style={{ fontSize: '0.9rem', color: '#00f0ff', fontWeight: 700 }}>☁️ Cloud (After)</span>
          </div>

          {comparisons.map((c, i) => {
            const improved = done && ((c.better === 'lower' && c.postVal < c.preVal) || (c.better === 'higher' && c.postVal > c.preVal));
            return (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.95rem', color: '#c0c8e0', fontWeight: 700 }}>{c.metric}</span>
                  {done && <span style={{ marginLeft: 8, fontSize: '0.8rem', color: '#00ff88' }}>
                    {c.better === 'lower' ? '↓' : '↑'} {Math.abs(Math.round((1 - c.postVal / c.preVal) * 100))}% improvement
                  </span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Pre value */}
                  <div style={{ width: 90, textAlign: 'right' }}>
                    <span style={{ fontSize: '1rem', color: '#ff3366', fontWeight: 700 }}>{c.pre}</span>
                  </div>
                  {/* Bars */}
                  <div style={{ flex: 1, display: 'flex', gap: 4 }}>
                    <div style={{ flex: 1, height: 12, background: 'rgba(255,51,102,0.15)', borderRadius: 6, overflow: 'hidden', direction: 'rtl' }}>
                      <div style={{ width: '70%', height: '100%', background: 'rgba(255,51,102,0.5)', borderRadius: 6 }} />
                    </div>
                    <div style={{ flex: 1, height: 12, background: 'rgba(0,240,255,0.08)', borderRadius: 6, overflow: 'hidden' }}>
                      <motion.div animate={{ width: (tick > 0 ? Math.min(95, 30 + tick * 3.5) : 0) + '%' }} transition={{ duration: 0.15 }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${c.color}66, ${c.color})`, borderRadius: 6 }} />
                    </div>
                  </div>
                  {/* Post value */}
                  <div style={{ width: 90 }}>
                    <span style={{ fontSize: '1rem', color: c.color, fontWeight: 700 }}>{tick > 0 ? c.post : '—'}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ marginTop: 8, padding: '12px 18px', borderRadius: 12, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', fontSize: '1rem', textAlign: 'center', fontWeight: 700 }}>
              <CheckCircle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
              Migration Validated — Cloud outperforms on-premise on all metrics!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
