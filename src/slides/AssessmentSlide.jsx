import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, Cpu, Monitor, HardDrive, Info } from 'lucide-react';

const nodes = [
  { id: 'web', label: 'Web Server', icon: Globe, x: 50, y: 8, deps: ['app', 'db'], color: '#00f0ff', detail: 'Handles HTTP requests, serves frontend. Depends on App Server for API calls and Database for user sessions.' },
  { id: 'app', label: 'App Server', icon: Cpu, x: 15, y: 45, deps: ['db', 'storage'], color: '#7b61ff', detail: 'Core business logic layer. Depends on Database for data and Storage for file uploads.' },
  { id: 'db', label: 'Database', icon: Database, x: 50, y: 50, deps: ['storage'], color: '#ff3366', detail: 'Primary data store (PostgreSQL). Depends on Storage for backups and binary large objects.' },
  { id: 'storage', label: 'File Storage', icon: HardDrive, x: 85, y: 45, deps: [], color: '#ffaa00', detail: 'Stores static assets, logs, and backups. No dependencies — this is a leaf node.' },
  { id: 'monitor', label: 'Monitoring', icon: Monitor, x: 50, y: 88, deps: ['web', 'app', 'db'], color: '#00ff88', detail: 'Observability system that monitors all other services. Depends on Web, App, and Database for health data.' },
];

export default function AssessmentSlide() {
  const [selected, setSelected] = useState(null);
  const selectedNode = nodes.find(n => n.id === selected);

  const points = [
    { icon: '📋', title: 'Understand Applications & Workloads', desc: 'Catalog every application, its resource needs, and how often it is used to prioritize migration order.' },
    { icon: '🔗', title: 'Identify Dependencies & Critical Data', desc: 'Map which systems depend on each other — this determines the safe order for migration.' },
    { icon: '📊', title: 'Analyze Infrastructure & Performance', desc: 'Benchmark current CPU, memory, and network usage to set cloud sizing and performance targets.' },
  ];

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Assessment and Inventory</h2>
      <p className="slide-subtitle">Before migrating, you must fully understand your current infrastructure and dependencies</p>

      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {points.map((p, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.15 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span className="card-icon">{p.icon}</span>
                <div>
                  <div className="card-title">{p.title}</div>
                  <p className="card-desc">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-strong" style={{ flex: '1 1 440px', padding: 28 }}>
          <div className="sim-instruction">
            🖱️ <strong>Click any component</strong> in the map below to see what it depends on and why it matters
          </div>

          <svg viewBox="0 0 100 100" style={{ width: '100%', height: 240 }}>
            {nodes.map(node =>
              node.deps.map(depId => {
                const dep = nodes.find(n => n.id === depId);
                const isHighlighted = selected === node.id || selected === depId;
                return (
                  <line key={`${node.id}-${depId}`} x1={node.x} y1={node.y} x2={dep.x} y2={dep.y}
                    stroke={isHighlighted ? '#00f0ff' : 'rgba(0,240,255,0.1)'}
                    strokeWidth={isHighlighted ? 0.7 : 0.3}
                    strokeDasharray={isHighlighted ? '0' : '2,2'} />
                );
              })
            )}
            {nodes.map(node => {
              const isSelected = selected === node.id;
              const isDep = selectedNode?.deps.includes(node.id);
              const opacity = selected === null ? 1 : (isSelected || isDep ? 1 : 0.25);
              return (
                <g key={node.id} onClick={() => setSelected(selected === node.id ? null : node.id)} style={{ cursor: 'pointer' }}>
                  <circle cx={node.x} cy={node.y} r={isSelected ? 8 : 6} fill={isSelected ? node.color + '33' : 'rgba(6,11,31,0.9)'} stroke={node.color} strokeWidth={isSelected ? 0.8 : 0.4} opacity={opacity} />
                  {isSelected && <circle cx={node.x} cy={node.y} r={11} fill="none" stroke={node.color} strokeWidth={0.2} opacity={0.6}><animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" /></circle>}
                  <text x={node.x} y={node.y + (node.y < 20 ? -4 : 14)} textAnchor="middle" fill={isSelected ? node.color : '#8890a8'} fontSize={3.2} fontWeight={isSelected ? 700 : 500} opacity={opacity}>{node.label}</text>
                </g>
              );
            })}
          </svg>

          {selectedNode ? (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              style={{ padding: '14px 18px', borderRadius: 12, background: selectedNode.color + '0a', border: `1px solid ${selectedNode.color}22` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedNode.color }} />
                <strong style={{ color: selectedNode.color, fontSize: '1rem' }}>{selectedNode.label}</strong>
              </div>
              <p style={{ color: '#a0a8c0', fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedNode.detail}</p>
              {selectedNode.deps.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: '#5a6080' }}>Dependencies:</span>
                  {selectedNode.deps.map(d => {
                    const dn = nodes.find(n => n.id === d);
                    return <span key={d} style={{ padding: '3px 10px', borderRadius: 6, background: dn.color + '15', color: dn.color, fontSize: '0.8rem', fontWeight: 600 }}>{dn.label}</span>;
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', color: '#4a5070', fontSize: '0.9rem', padding: 10 }}>
              👆 Select a component above to explore its dependencies
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
