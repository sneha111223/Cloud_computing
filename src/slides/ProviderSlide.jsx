import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, DollarSign, Shield, Headphones } from 'lucide-react';

const providers = [
  {
    id: 'aws', name: 'Amazon Web Services', short: 'AWS', color: '#ff9900',
    pricing: 85, scalability: 95, security: 90, support: 80,
    desc: 'Market leader with the broadest service portfolio (200+ services) and largest global infrastructure.',
    highlight: 'Best for: enterprises needing maximum service variety',
  },
  {
    id: 'azure', name: 'Microsoft Azure', short: 'Azure', color: '#0078d4',
    pricing: 80, scalability: 90, security: 92, support: 88,
    desc: 'Best integration with Microsoft ecosystem — ideal for organizations using Office 365, Active Directory.',
    highlight: 'Best for: Microsoft-centric organizations',
  },
  {
    id: 'gcp', name: 'Google Cloud', short: 'GCP', color: '#4285f4',
    pricing: 88, scalability: 88, security: 88, support: 78,
    desc: 'Leading in AI/ML capabilities, data analytics (BigQuery), and open-source technologies (Kubernetes).',
    highlight: 'Best for: AI/ML and data-driven workloads',
  },
];

const features = [
  { key: 'pricing', label: 'Cost Efficiency', icon: DollarSign, desc: 'Lower score = higher costs' },
  { key: 'scalability', label: 'Scalability', icon: Cloud, desc: 'Auto-scaling and global reach' },
  { key: 'security', label: 'Security', icon: Shield, desc: 'Compliance certs and encryption' },
  { key: 'support', label: 'Support Quality', icon: Headphones, desc: 'Documentation and response time' },
];

export default function ProviderSlide() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const active = providers.filter(p => selected.includes(p.id));

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Cloud Provider Selection</h2>
      <p className="slide-subtitle">Click providers below to compare them side-by-side on key features</p>

      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24, width: '100%', maxWidth: 1050 }}>
        {providers.map((p, i) => (
          <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }}
            whileHover={{ y: -4 }} onClick={() => toggle(p.id)} className="glass"
            style={{ flex: '1 1 280px', padding: 22, cursor: 'pointer', borderColor: selected.includes(p.id) ? p.color + '66' : undefined, background: selected.includes(p.id) ? p.color + '08' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: p.color + '18', border: `2px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: p.color, fontSize: '0.85rem' }}>
                {p.short}
              </div>
              <div>
                <strong style={{ color: '#e0e8ff', fontSize: '1.05rem' }}>{p.name}</strong>
                <p style={{ color: p.color, fontSize: '0.8rem', fontWeight: 600 }}>{selected.includes(p.id) ? '✓ Selected for comparison' : '🖱️ Click to select'}</p>
              </div>
            </div>
            <p style={{ color: '#8890a8', fontSize: '0.95rem', lineHeight: 1.55, marginBottom: 10 }}>{p.desc}</p>
            <div style={{ padding: '6px 12px', borderRadius: 8, background: p.color + '0a', border: `1px solid ${p.color}15`, fontSize: '0.82rem', color: p.color, fontWeight: 600 }}>
              {p.highlight}
            </div>
          </motion.div>
        ))}
      </div>

      {active.length > 0 ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-strong" style={{ width: '100%', maxWidth: 1050, padding: 28 }}>
          <h3 style={{ color: '#e0e8ff', fontSize: '1.15rem', fontWeight: 700, marginBottom: 22, textAlign: 'center' }}>
            📊 Feature Comparison — {active.map(p => p.short).join(' vs ')}
          </h3>
          {features.map((f, fi) => {
            const Icon = f.icon;
            return (
              <div key={f.key} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Icon size={18} color="#00f0ff" />
                  <span style={{ color: '#c0c8e0', fontSize: '0.95rem', fontWeight: 700 }}>{f.label}</span>
                  <span style={{ color: '#4a5070', fontSize: '0.8rem' }}>— {f.desc}</span>
                </div>
                {active.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <span style={{ width: 55, fontSize: '0.85rem', color: p.color, fontWeight: 700 }}>{p.short}</span>
                    <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: p[f.key] + '%' }} transition={{ duration: 1, delay: fi * 0.12 }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${p.color}66, ${p.color})`, borderRadius: 5 }} />
                    </div>
                    <span style={{ width: 40, fontSize: '0.9rem', color: p.color, fontWeight: 800, textAlign: 'right' }}>{p[f.key]}%</span>
                  </div>
                ))}
              </div>
            );
          })}
        </motion.div>
      ) : (
        <div style={{ color: '#4a5070', fontSize: '1rem', textAlign: 'center', padding: 20 }}>
          👆 Select one or more providers above to see the comparison chart
        </div>
      )}
    </div>
  );
}
