import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, AlertTriangle, FileText } from 'lucide-react';

export default function DeploymentSlide() {
  const [data, setData] = useState({ cpu: 45, net: 230, errors: 0, logs: [] });

  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.48) * 12)),
        net: Math.max(50, Math.min(900, prev.net + (Math.random() - 0.45) * 80)),
        errors: Math.random() > 0.92 ? prev.errors + 1 : prev.errors,
        logs: [
          { time: new Date().toLocaleTimeString(), msg: ['Request processed successfully', 'Health check: all services OK', 'Cache hit ratio: 94%', 'Auto-scaling evaluation complete', 'Database query optimized'][Math.floor(Math.random() * 5)], type: Math.random() > 0.9 ? 'warn' : 'info' },
          ...prev.logs.slice(0, 4),
        ],
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const monitors = [
    { label: 'CPU Usage', value: data.cpu.toFixed(1) + '%', icon: Cpu, color: data.cpu > 75 ? '#ff3366' : '#00f0ff', pct: data.cpu, status: data.cpu > 75 ? 'High Load' : 'Normal' },
    { label: 'Network I/O', value: data.net.toFixed(0) + ' Mbps', icon: Wifi, color: '#7b61ff', pct: data.net / 10, status: data.net > 600 ? 'Heavy Traffic' : 'Stable' },
    { label: 'Error Count', value: data.errors, icon: AlertTriangle, color: data.errors > 3 ? '#ff3366' : '#00ff88', pct: Math.min(100, data.errors * 10), status: data.errors > 3 ? 'Investigate' : 'Healthy' },
  ];

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Deployment and Monitoring</h2>
      <p className="slide-subtitle">Real-time observability ensures your cloud applications run smoothly after deployment</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '🚀', title: 'Blue-Green Deployment', desc: 'Run two identical environments — switch traffic instantly with zero downtime and instant rollback capability.' },
            { icon: '📊', title: 'APM Tools', desc: 'Application Performance Monitoring with tools like Datadog, New Relic, and CloudWatch for deep visibility.' },
            { icon: '🔔', title: 'Automated Alerting', desc: 'Set threshold-based alerts for CPU, memory, error rates — get notified via Slack, email, or PagerDuty.' },
          ].map((t, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{t.icon}</span>
                <div><div className="card-title">{t.title}</div><p className="card-desc">{t.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 480px', padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div className="sim-instruction" style={{ marginBottom: 0, flex: 1 }}>🖥️ This dashboard updates <strong>automatically</strong> — watch the metrics change in real-time</div>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00ff88', fontSize: '0.85rem', fontWeight: 700, marginLeft: 12, flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88' }} /> LIVE
            </motion.div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
            {monitors.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="glass" style={{ flex: '1 1 130px', padding: '16px', textAlign: 'center' }}>
                  <Icon size={22} color={m.color} style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#8890a8', marginTop: 3, fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: '0.72rem', color: m.color, marginTop: 4, fontWeight: 600 }}>{m.status}</div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginTop: 10, overflow: 'hidden' }}>
                    <motion.div animate={{ width: m.pct + '%' }} style={{ height: '100%', background: m.color, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="glass" style={{ padding: 14 }}>
            <div style={{ fontSize: '0.85rem', color: '#6a7090', marginBottom: 10, fontWeight: 700 }}>📋 Live Server Logs</div>
            {data.logs.map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, fontSize: '0.82rem', marginBottom: 5, color: log.type === 'warn' ? '#ffaa00' : '#7080a0' }}>
                <span style={{ color: '#3a4060', flexShrink: 0, fontFamily: 'monospace' }}>{log.time}</span>
                <span>{log.type === 'warn' ? '⚠️' : '✓'} {log.msg}</span>
              </div>
            ))}
            {data.logs.length === 0 && <div style={{ color: '#3a4060', fontSize: '0.8rem' }}>Waiting for logs...</div>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
