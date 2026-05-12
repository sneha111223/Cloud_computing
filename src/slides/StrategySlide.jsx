import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Layers, Wrench } from 'lucide-react';

const strategies = [
  {
    id: 'rehost', title: 'Rehosting', subtitle: 'Lift & Shift', icon: Server, color: '#00f0ff',
    desc: 'Move applications exactly as they are to cloud VMs — no code changes needed. This is the fastest and lowest-risk approach, ideal for quick migrations.',
    steps: ['Current Server', 'Package As-Is', 'Deploy to Cloud VM', 'Running in Cloud'],
    best: 'Quick timelines, minimal risk tolerance',
  },
  {
    id: 'refactor', title: 'Refactoring', subtitle: 'Optimize & Move', icon: Wrench, color: '#7b61ff',
    desc: 'Make targeted code optimizations to take advantage of cloud services (managed databases, caching) while keeping the core architecture intact.',
    steps: ['Current App', 'Optimize Code', 'Use Cloud APIs', 'Cloud-Optimized'],
    best: 'Balance of speed and cloud benefits',
  },
  {
    id: 'rearchitect', title: 'Rearchitecting', subtitle: 'Cloud-Native Rebuild', icon: Layers, color: '#00ff88',
    desc: 'Completely redesign the application using cloud-native patterns — microservices, containers, serverless. Maximum cloud benefits but requires the most effort.',
    steps: ['Monolith App', 'Decompose', 'Build Microservices', 'Cloud-Native'],
    best: 'Long-term scalability and innovation',
  },
];

export default function StrategySlide() {
  const [active, setActive] = useState(null);

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Choosing the Right Strategy</h2>
      <p className="slide-subtitle">Three approaches to migrate applications — click each to see how the migration path works</p>

      <div style={{ display: 'flex', gap: 22, width: '100%', maxWidth: 1100, flexWrap: 'wrap', justifyContent: 'center' }}>
        {strategies.map((s, i) => {
          const isActive = active === s.id;
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -5 }}
              onClick={() => setActive(isActive ? null : s.id)}
              className="glass"
              style={{
                flex: '1 1 300px', padding: 26, cursor: 'pointer',
                borderColor: isActive ? s.color + '55' : undefined,
                background: isActive ? s.color + '08' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: s.color + '15', border: `2px solid ${s.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={26} color={s.color} />
                </div>
                <div>
                  <strong style={{ color: '#e0e8ff', fontSize: '1.15rem' }}>{s.title}</strong>
                  <p style={{ color: s.color, fontSize: '0.85rem', fontWeight: 600 }}>{s.subtitle}</p>
                </div>
              </div>

              <p style={{ color: '#9098b0', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 18 }}>{s.desc}</p>

              {/* Best for */}
              <div style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 }}>
                <span style={{ fontSize: '0.8rem', color: '#5a6080' }}>Best for: </span>
                <span style={{ fontSize: '0.85rem', color: s.color, fontWeight: 600 }}>{s.best}</span>
              </div>

              {/* Animated migration path */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                {s.steps.map((step, j) => (
                  <React.Fragment key={j}>
                    <motion.span
                      animate={isActive ? { background: s.color + '20', borderColor: s.color + '55', color: s.color } : {}}
                      transition={{ delay: j * 0.35 }}
                      style={{
                        padding: '6px 12px', borderRadius: 8, fontSize: '0.8rem',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                        color: '#6a7090', fontWeight: 600, whiteSpace: 'nowrap',
                      }}
                    >
                      {step}
                    </motion.span>
                    {j < s.steps.length - 1 && (
                      <motion.span animate={isActive ? { color: s.color, opacity: 1 } : { opacity: 0.3 }} transition={{ delay: j * 0.35 + 0.15 }}>
                        <ArrowRight size={16} />
                      </motion.span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {isActive && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 14, padding: '8px 16px', borderRadius: 10, background: s.color + '12', border: `1px solid ${s.color}22`, fontSize: '0.85rem', color: s.color, fontWeight: 700, textAlign: 'center' }}>
                  ✓ Migration Path Activated — Follow the steps above
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
