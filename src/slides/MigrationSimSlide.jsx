import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Play } from 'lucide-react';

const phases = [
  { id: 'assess', label: 'Assessment', icon: '📋', color: '#00f0ff',
    desc: 'Inventory all applications, map dependencies, and benchmark current performance.',
    action: 'Scan Infrastructure',
    metrics: { apps: 12, deps: 47, servers: 8 },
    result: 'Found 12 apps with 47 dependencies across 8 servers' },
  { id: 'plan', label: 'Strategy & Planning', icon: '🗺️', color: '#7b61ff',
    desc: 'Select migration approach for each app and build a phased timeline.',
    action: 'Create Migration Plan',
    metrics: { rehost: 3, refactor: 5, rearchitect: 4 },
    result: '3 Rehost + 5 Refactor + 4 Rearchitect = 12 apps planned' },
  { id: 'secure', label: 'Security Setup', icon: '🔒', color: '#ffaa00',
    desc: 'Enable encryption, configure access controls, and verify compliance.',
    action: 'Harden Security',
    metrics: { encryption: 100, mfa: 100, compliance: 100 },
    result: 'TLS 1.3 + AES-256 + MFA + GDPR/HIPAA verified' },
  { id: 'migrate', label: 'Data Migration', icon: '📦', color: '#ff3366',
    desc: 'Transfer databases, configs, and media to cloud with integrity checks.',
    action: 'Transfer Data',
    metrics: { database: 2.4, configs: 0.15, media: 8.1 },
    result: '10.65 GB transferred with SHA-256 integrity verified' },
  { id: 'test', label: 'Testing & Validation', icon: '🧪', color: '#00ff88',
    desc: 'Compare pre vs post migration performance on all critical metrics.',
    action: 'Run Tests',
    metrics: { response: 45, throughput: 950, uptime: 99.99 },
    result: 'Response: 45ms, Throughput: 950 req/s, Uptime: 99.99%' },
  { id: 'deploy', label: 'Go Live!', icon: '🚀', color: '#00f0ff',
    desc: 'Switch traffic, enable monitoring, decommission old infrastructure.',
    action: 'Deploy to Production',
    metrics: { downtime: 0, traffic: 100, monitoring: true },
    result: 'Zero-downtime deployment — all traffic on cloud' },
];

export default function MigrationSimSlide() {
  const [activePhase, setActivePhase] = useState(-1);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const ref = useRef(null);

  const executePhase = (idx) => {
    if (animating || idx !== activePhase + 1) return;
    setAnimating(true);
    setActivePhase(idx);
    setProgress(0);

    let p = 0;
    ref.current = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(ref.current);
        setCompletedPhases(prev => [...prev, phases[idx].id]);
        setTimeline(prev => [...prev, { phase: phases[idx].label, result: phases[idx].result, color: phases[idx].color }]);
        setAnimating(false);
      }
    }, 50);
  };

  const reset = () => {
    clearInterval(ref.current);
    setActivePhase(-1); setCompletedPhases([]); setAnimating(false);
    setProgress(0); setTimeline([]);
  };

  useEffect(() => () => clearInterval(ref.current), []);

  const allDone = completedPhases.length === phases.length;
  const nextIdx = completedPhases.length;
  const overallPct = Math.round((completedPhases.length / phases.length) * 100);

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 40 }}>
      <h2 className="slide-title">Planning & Executing Cloud Migration</h2>
      <p className="slide-subtitle">Execute each phase step-by-step — click the button to advance through the migration journey</p>

      <div style={{ display: 'flex', gap: 24, width: '100%', maxWidth: 1100, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Left: Interactive Phase Pipeline */}
        <div style={{ flex: '1 1 520px' }}>
          {/* Overall progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '0.8rem', color: '#5a6080' }}>Migration Progress</span>
              <span style={{ fontSize: '0.8rem', color: allDone ? '#00ff88' : '#00f0ff', fontWeight: 700 }}>{overallPct}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div animate={{ width: overallPct + '%' }} transition={{ duration: 0.5 }}
                style={{ height: '100%', background: allDone ? '#00ff88' : 'linear-gradient(90deg, #00f0ff, #7b61ff)', borderRadius: 3 }} />
            </div>
          </div>

          {/* Phase cards as a vertical pipeline */}
          {phases.map((phase, i) => {
            const isCompleted = completedPhases.includes(phase.id);
            const isActive = activePhase === i && animating;
            const isNext = i === nextIdx && !animating && !allDone;
            const isLocked = i > nextIdx;

            return (
              <div key={phase.id} style={{ position: 'relative' }}>
                {/* Connector line */}
                {i > 0 && (
                  <div style={{
                    position: 'absolute', left: 28, top: -8, width: 2, height: 8,
                    background: completedPhases.includes(phases[i - 1].id) ? '#00ff88' : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.3s',
                  }} />
                )}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                    borderRadius: 14, marginBottom: 8, cursor: isNext ? 'pointer' : 'default',
                    background: isActive ? phase.color + '08' : isCompleted ? 'rgba(0,255,136,0.03)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? phase.color + '44' : isCompleted ? 'rgba(0,255,136,0.2)' : isNext ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.04)'}`,
                    opacity: isLocked ? 0.4 : 1,
                    transition: 'all 0.3s',
                  }}
                  onClick={() => isNext && executePhase(i)}
                >
                  {/* Phase number / icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: isCompleted ? 'rgba(0,255,136,0.1)' : isActive ? phase.color + '15' : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${isCompleted ? 'rgba(0,255,136,0.3)' : isActive ? phase.color + '44' : 'rgba(255,255,255,0.06)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                  }}>
                    {isCompleted ? <CheckCircle size={20} color="#00ff88" /> : phase.icon}
                  </div>

                  {/* Phase info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: isCompleted ? '#00ff88' : isActive ? phase.color : '#c0c8e0' }}>
                        {phase.label}
                      </span>
                      {isCompleted && <span style={{ fontSize: '0.7rem', color: '#00ff88', fontWeight: 600 }}>DONE</span>}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#5a6080', marginTop: 2, lineHeight: 1.3 }}>{phase.desc}</p>

                    {/* Active phase progress bar */}
                    {isActive && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                          <motion.div animate={{ width: progress + '%' }} transition={{ duration: 0.05 }}
                            style={{ height: '100%', background: phase.color, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: phase.color, fontWeight: 600, marginTop: 3, display: 'block' }}>
                          Processing... {progress}%
                        </span>
                      </div>
                    )}

                    {/* Completed metrics */}
                    {isCompleted && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 4 }}>
                        <span style={{ fontSize: '0.75rem', color: '#4a6060' }}>{phase.result}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Action button for next phase */}
                  {isNext && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); executePhase(i); }}
                      style={{
                        padding: '8px 16px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700,
                        background: phase.color + '15', border: `1px solid ${phase.color}44`,
                        color: phase.color, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        whiteSpace: 'nowrap', flexShrink: 0,
                      }}>
                      <Play size={12} /> {phase.action}
                    </motion.button>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Dashboard */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass-strong" style={{ flex: '1 1 380px', padding: 24, alignSelf: 'flex-start' }}>

          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e0e8ff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            📊 Migration Dashboard
            {(animating || allDone) && (
              <motion.span animate={animating ? { opacity: [1, 0.3, 1] } : {}} transition={{ duration: 1, repeat: Infinity }}
                style={{ marginLeft: 'auto', fontSize: '0.75rem', color: allDone ? '#00ff88' : '#00f0ff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: allDone ? '#00ff88' : '#00f0ff' }} />
                {allDone ? 'COMPLETE' : 'LIVE'}
              </motion.span>
            )}
          </div>

          {/* Bar chart showing phase completion */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: '0.78rem', color: '#5a6080', marginBottom: 8 }}>Phase Completion</div>
            {phases.map((phase, i) => {
              const isCompleted = completedPhases.includes(phase.id);
              const isActive = activePhase === i && animating;
              const barWidth = isCompleted ? 100 : isActive ? progress : 0;
              return (
                <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 18, fontSize: '0.9rem', textAlign: 'center' }}>{phase.icon}</span>
                  <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div animate={{ width: barWidth + '%' }} transition={{ duration: 0.1 }}
                      style={{ height: '100%', background: isCompleted ? '#00ff88' : phase.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ width: 32, fontSize: '0.7rem', color: isCompleted ? '#00ff88' : '#3a4060', fontWeight: 600, textAlign: 'right' }}>
                    {isCompleted ? '100%' : isActive ? progress + '%' : '—'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div className="glass" style={{ padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00f0ff' }}>{completedPhases.length}</div>
              <div style={{ fontSize: '0.72rem', color: '#5a6080' }}>Phases Done</div>
            </div>
            <div className="glass" style={{ padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: phases.length - completedPhases.length === 0 ? '#00ff88' : '#ffaa00' }}>
                {phases.length - completedPhases.length}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#5a6080' }}>Remaining</div>
            </div>
            <div className="glass" style={{ padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#7b61ff' }}>{overallPct}%</div>
              <div style={{ fontSize: '0.72rem', color: '#5a6080' }}>Progress</div>
            </div>
            <div className="glass" style={{ padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: allDone ? '#00ff88' : animating ? '#ffaa00' : '#3a4060' }}>
                {allDone ? '✓' : animating ? '⏳' : '—'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#5a6080' }}>Status</div>
            </div>
          </div>

          {/* Activity log */}
          <div style={{ fontSize: '0.78rem', color: '#5a6080', marginBottom: 6 }}>Activity Log</div>
          <div style={{ maxHeight: 120, overflowY: 'auto', padding: '8px 10px', borderRadius: 10, background: 'rgba(0,0,0,0.15)' }}>
            {timeline.length === 0 && (
              <div style={{ color: '#2a3050', fontSize: '0.75rem' }}>No activity yet — start the first phase...</div>
            )}
            {timeline.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: entry.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <span style={{ color: entry.color, fontWeight: 700, fontSize: '0.75rem' }}>{entry.phase}: </span>
                  <span style={{ color: '#7080a0', fontSize: '0.75rem' }}>{entry.result}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {allDone && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ marginTop: 14, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
              🎉 Migration Complete!
            </motion.div>
          )}

          {allDone && (
            <motion.button whileHover={{ scale: 1.05 }} className="neon-btn" onClick={reset}
              style={{ marginTop: 10, width: '100%', justifyContent: 'center', display: 'flex', fontSize: '0.9rem', padding: '10px' }}>
              🔄 Replay Simulation
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
