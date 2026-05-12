import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, ArrowRight, Database } from 'lucide-react';

export default function IntroSlide() {
  const [started, setStarted] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [phase, setPhase] = useState(0);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => { setMigrating(true); setPhase(1); }, 500);
    setTimeout(() => setPhase(2), 2500);
    setTimeout(() => setPhase(3), 4000);
  };

  const items = [
    { icon: '🏢', text: 'Cloud migration is the process of moving digital assets — applications, data, and workloads — from on-premise infrastructure to cloud platforms.' },
    { icon: '⚡', text: 'It enables scalability, flexibility, and cost optimization, helping businesses adapt to growing demands.' },
    { icon: '🌍', text: 'Cloud migration is essential for digital transformation and staying competitive in a global market.' },
    { icon: '🔒', text: 'It improves disaster recovery, strengthens security posture, and ensures business continuity.' },
  ];

  const phases = [
    { label: 'Preparing...', detail: 'Packaging data for secure transfer' },
    { label: 'Transferring...', detail: 'Encrypted data moving to cloud servers' },
    { label: 'Verifying...', detail: 'Checking data integrity and connectivity' },
    { label: 'Complete!', detail: 'Migration successful — all systems operational' },
  ];

  return (
    <div className="slide-container">
      <h2 className="slide-title">Introduction to Cloud Migration</h2>
      <p className="slide-subtitle">Understanding why organizations are moving to the cloud</p>

      <div style={{ display: 'flex', gap: 32, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="glass info-card"
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
            >
              <span className="card-icon">{item.icon}</span>
              <span style={{ color: '#b8c0d8', fontSize: '1.05rem', lineHeight: 1.6 }}>{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-strong"
          style={{ flex: '1 1 400px', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <div className="sim-instruction">
            💡 Click "Start Journey" to watch a live migration simulation
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 50, position: 'relative', width: '100%', justifyContent: 'center' }}>
            {/* Local server */}
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={migrating ? { opacity: 0.4, scale: 0.85 } : {}}
                transition={{ duration: 1.5 }}
                style={{
                  width: 85, height: 85, borderRadius: 18,
                  background: 'rgba(255,51,102,0.1)', border: '2px solid rgba(255,51,102,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Server size={38} color="#ff3366" />
              </motion.div>
              <span style={{ fontSize: '0.9rem', color: '#999', marginTop: 8, display: 'block', fontWeight: 600 }}>On-Premise</span>
              <span style={{ fontSize: '0.75rem', color: '#555' }}>Local Servers</span>
            </div>

            {/* Animated data flow */}
            <div style={{ position: 'relative', width: 100, height: 6 }}>
              <div style={{ width: '100%', height: '100%', background: 'rgba(0,240,255,0.1)', borderRadius: 3 }} />
              {migrating && [0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ left: 0 }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                  style={{
                    position: 'absolute', top: -5, width: 14, height: 14, borderRadius: '50%',
                    background: '#00f0ff', boxShadow: '0 0 12px #00f0ff, 0 0 24px rgba(0,240,255,0.3)',
                  }}
                />
              ))}
              <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '0.75rem', color: '#4a6070' }}>{migrating ? '📡 Encrypted Transfer' : 'Data Path'}</span>
              </div>
            </div>

            {/* Cloud */}
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={migrating ? { scale: [1, 1.08, 1], boxShadow: ['0 0 0px rgba(0,240,255,0)', '0 0 35px rgba(0,240,255,0.35)', '0 0 0px rgba(0,240,255,0)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 85, height: 85, borderRadius: 18,
                  background: 'rgba(0,240,255,0.1)', border: '2px solid rgba(0,240,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Cloud size={38} color="#00f0ff" />
              </motion.div>
              <span style={{ fontSize: '0.9rem', color: '#999', marginTop: 8, display: 'block', fontWeight: 600 }}>Cloud</span>
              <span style={{ fontSize: '0.75rem', color: '#555' }}>AWS / Azure / GCP</span>
            </div>
          </div>

          {/* Phase indicator */}
          {started && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {phases.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= phase ? '#00f0ff' : 'rgba(255,255,255,0.06)', transition: 'background 0.5s' }} />
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: phase === 3 ? '#00ff88' : '#00f0ff', fontWeight: 700, fontSize: '1.05rem' }}>{phases[phase].label}</div>
                <div style={{ color: '#5a6a80', fontSize: '0.85rem', marginTop: 4 }}>{phases[phase].detail}</div>
              </div>
            </motion.div>
          )}

          {!started && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-btn"
              onClick={handleStart}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              🚀 Start Journey <ArrowRight size={20} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
