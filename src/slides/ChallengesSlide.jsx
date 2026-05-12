import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Database, RefreshCw, Link2 } from 'lucide-react';

const systems = [
  { id: 'erp', label: 'ERP System', icon: Server, x: 15, y: 22, color: '#ff3366', desc: 'Enterprise Resource Planning — manages business processes' },
  { id: 'crm', label: 'CRM', icon: Database, x: 85, y: 22, color: '#7b61ff', desc: 'Customer Relationship Management — tracks sales and support' },
  { id: 'cloud', label: 'Cloud API', icon: Cloud, x: 50, y: 8, color: '#00f0ff', desc: 'Central cloud gateway that connects all services' },
  { id: 'analytics', label: 'Analytics', icon: RefreshCw, x: 15, y: 72, color: '#ffaa00', desc: 'Data analytics and reporting pipeline' },
  { id: 'payment', label: 'Payments', icon: Link2, x: 85, y: 72, color: '#00ff88', desc: 'Payment processing and billing system' },
];

const connections = [
  { from: 'erp', to: 'cloud', label: 'Sync inventory data' },
  { from: 'crm', to: 'cloud', label: 'Sync customer records' },
  { from: 'analytics', to: 'cloud', label: 'Send metrics' },
  { from: 'payment', to: 'cloud', label: 'Process transactions' },
  { from: 'erp', to: 'crm', label: 'Share order info' },
  { from: 'analytics', to: 'payment', label: 'Revenue reports' },
];

export default function ChallengesSlide() {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState({});
  const [selectedConn, setSelectedConn] = useState(null);

  useEffect(() => {
    if (!syncing) return;
    connections.forEach((_, i) => {
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, [i]: 'syncing' }));
        setTimeout(() => {
          setSyncStatus(prev => ({ ...prev, [i]: 'done' }));
          if (i === connections.length - 1) setTimeout(() => setSyncing(false), 600);
        }, 800 + Math.random() * 400);
      }, i * 500);
    });
  }, [syncing]);

  const startSync = () => { setSyncStatus({}); setSyncing(true); setSelectedConn(null); };
  const allDone = Object.values(syncStatus).filter(s => s === 'done').length === connections.length;

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Additional Challenges</h2>
      <p className="slide-subtitle">Integrating legacy systems with cloud services requires careful synchronization</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '🔗', title: 'Integration Work', desc: 'Legacy systems use older protocols and APIs that may be incompatible with cloud services, requiring custom middleware or API adapters.' },
            { icon: '📊', title: 'Business Case Alignment', desc: 'Migration ROI must align with organizational goals — stakeholders need clear metrics showing cost savings and performance gains.' },
            { icon: '🔄', title: 'Data Synchronization', desc: 'During hybrid operation, data must stay consistent between on-premise and cloud. Conflicts and latency create sync challenges.' },
          ].map((t, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{t.icon}</span>
                <div><div className="card-title">{t.title}</div><p className="card-desc">{t.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 440px', padding: 28 }}>
          <div className="sim-instruction">⚡ Click <strong>"Simulate Sync"</strong> to watch systems connect to the cloud one by one</div>

          <svg viewBox="0 0 100 85" style={{ width: '100%', height: 220 }}>
            {connections.map((conn, i) => {
              const a = systems.find(s => s.id === conn.from);
              const b = systems.find(s => s.id === conn.to);
              const status = syncStatus[i];
              const color = status === 'done' ? '#00ff88' : status === 'syncing' ? '#00f0ff' : 'rgba(255,255,255,0.07)';
              const isSelected = selectedConn === i;
              return (
                <g key={i} onClick={() => setSelectedConn(isSelected ? null : i)} style={{ cursor: 'pointer' }}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={isSelected ? 1 : (status ? 0.7 : 0.3)}>
                    {status === 'syncing' && <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />}
                  </line>
                  {status === 'done' && <circle cx={(a.x + b.x) / 2} cy={(a.y + b.y) / 2} r={1.8} fill="#00ff88"><animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" /></circle>}
                  <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 3} textAnchor="middle" fill={status === 'done' ? '#00ff88' : '#3a4060'} fontSize={2.2} fontWeight={500}>{conn.label}</text>
                </g>
              );
            })}
            {systems.map(s => {
              const Icon = s.icon;
              return (
                <g key={s.id}>
                  <circle cx={s.x} cy={s.y} r={6} fill={s.color + '18'} stroke={s.color + '55'} strokeWidth={0.6} />
                  <text x={s.x} y={s.y + 11} textAnchor="middle" fill={s.color} fontSize={3} fontWeight={700}>{s.label}</text>
                </g>
              );
            })}
          </svg>

          {allDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center', marginBottom: 12 }}>
              ✅ All Systems Synchronized Successfully
            </motion.div>
          )}

          <div style={{ textAlign: 'center' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="neon-btn" onClick={startSync} disabled={syncing} style={{ fontSize: '0.95rem' }}>
              {syncing ? '🔄 Syncing Systems...' : allDone ? '✅ Done — Run Again' : '⚡ Simulate Sync'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
