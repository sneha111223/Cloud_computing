import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, CheckCircle, ArrowRight } from 'lucide-react';

const migrationPhases = [
  { id: 'transit', label: 'Data in Transit', icon: '📡', status: 'unprotected', protections: ['TLS 1.3 Encryption', 'VPN Tunnel', 'Checksum Validation'], desc: 'Data moving from on-premise to cloud must be encrypted to prevent interception.' },
  { id: 'rest', label: 'Data at Rest', icon: '💾', status: 'unprotected', protections: ['AES-256 Encryption', 'Key Management (KMS)', 'Access Policies'], desc: 'Once stored in the cloud, data must be encrypted at rest with managed encryption keys.' },
  { id: 'access', label: 'User Access', icon: '👤', status: 'unprotected', protections: ['Multi-Factor Auth', 'Role-Based Access (RBAC)', 'Least Privilege'], desc: 'Only authorized personnel should access migrated systems — enforce identity controls.' },
  { id: 'compliance', label: 'Compliance', icon: '📋', status: 'unprotected', protections: ['GDPR Data Residency', 'HIPAA Audit Logs', 'SOC 2 Controls'], desc: 'Regulatory requirements (GDPR, HIPAA) must be met in the new cloud environment.' },
];

const topics = [
  { icon: '🔐', title: 'Encryption', desc: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3) to prevent unauthorized access during the migration process.' },
  { icon: '🔑', title: 'Access Control', desc: 'Role-based access control (RBAC) and multi-factor authentication restrict who can initiate, monitor, and verify migration tasks.' },
  { icon: '📋', title: 'GDPR Compliance', desc: 'EU regulation requiring that personal data stays within approved regions and is processed with user consent during migration.' },
  { icon: '🏥', title: 'HIPAA Compliance', desc: 'US healthcare regulation requiring encrypted transfer and audit trails for any patient health information moved to the cloud.' },
];

export default function SecuritySlide() {
  const [secured, setSecured] = useState({});
  const [currentPhase, setCurrentPhase] = useState(null);

  const securePhase = (id) => {
    setCurrentPhase(id);
    setTimeout(() => {
      setSecured(prev => ({ ...prev, [id]: true }));
      setCurrentPhase(null);
    }, 1500);
  };

  const allSecured = migrationPhases.every(p => secured[p.id]);

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Security and Compliance</h2>
      <p className="slide-subtitle">Every phase of cloud migration must be protected — secure each layer below</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topics.map((t, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.1 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span className="card-icon">{t.icon}</span>
                <div><div className="card-title">{t.title}</div><p className="card-desc">{t.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-strong" style={{ flex: '1 1 420px', padding: 28 }}>
          <div className="sim-instruction">🛡️ Click each migration phase to <strong>apply security protections</strong> and see what gets enabled</div>

          {migrationPhases.map((phase, i) => {
            const isSecured = secured[phase.id];
            const isSecuring = currentPhase === phase.id;
            return (
              <motion.div key={phase.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => !isSecured && !isSecuring && securePhase(phase.id)}
                style={{
                  padding: '14px 18px', borderRadius: 14, marginBottom: 12, cursor: isSecured ? 'default' : 'pointer',
                  background: isSecured ? 'rgba(0,255,136,0.06)' : isSecuring ? 'rgba(0,240,255,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isSecured ? 'rgba(0,255,136,0.25)' : isSecuring ? 'rgba(0,240,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.3s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.3rem' }}>{phase.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: isSecured ? '#00ff88' : '#c0c8e0', fontSize: '1rem', fontWeight: 700 }}>{phase.label}</div>
                    <div style={{ color: '#5a6080', fontSize: '0.82rem', marginTop: 2 }}>{phase.desc}</div>
                  </div>
                  {isSecured ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#00ff88', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle size={16} /> Secured
                    </motion.span>
                  ) : isSecuring ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 18, height: 18, border: '2px solid rgba(0,240,255,0.3)', borderTopColor: '#00f0ff', borderRadius: '50%' }} />
                  ) : (
                    <span style={{ color: '#ff3366', fontSize: '0.78rem', fontWeight: 600 }}>⚠ Unprotected</span>
                  )}
                </div>
                {isSecured && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                    {phase.protections.map((p, j) => (
                      <motion.span key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: j * 0.15 }}
                        style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88', fontSize: '0.75rem', fontWeight: 600 }}>
                        ✓ {p}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {allSecured && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)', color: '#00ff88', fontWeight: 700, fontSize: '1rem', textAlign: 'center', marginTop: 4 }}>
              🛡️ All Migration Phases Secured — Ready to Migrate Safely!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
