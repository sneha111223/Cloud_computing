import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, FileText, Database, HardDrive, Cloud } from 'lucide-react';

const files = [
  { name: 'user_database.sql', size: '2.4 GB', icon: Database, color: '#7b61ff', desc: 'User accounts and profiles' },
  { name: 'app_configs.json', size: '156 MB', icon: FileText, color: '#00f0ff', desc: 'Application settings' },
  { name: 'media_assets.tar', size: '8.1 GB', icon: HardDrive, color: '#ffaa00', desc: 'Images, videos, documents' },
  { name: 'analytics_logs.csv', size: '1.7 GB', icon: FileText, color: '#00ff88', desc: 'Historical analytics data' },
];

export default function DataMigrationSlide() {
  const [transferring, setTransferring] = useState(false);
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [verified, setVerified] = useState([false, false, false, false]);
  const ref = useRef(null);

  const startTransfer = () => {
    setTransferring(true);
    setProgress([0, 0, 0, 0]);
    setVerified([false, false, false, false]);
    ref.current = setInterval(() => {
      setProgress(prev => {
        const next = prev.map((p, i) => Math.min(100, p + [2.5, 4, 1.5, 3][i] + Math.random() * 2));
        if (next.every(p => p >= 100)) {
          clearInterval(ref.current);
          setTimeout(() => setVerified([true, true, true, true]), 600);
        }
        return next;
      });
    }, 100);
  };

  useEffect(() => () => clearInterval(ref.current), []);

  const totalSize = 12.356;
  const transferred = (progress.reduce((a, b) => a + b, 0) / 400 * totalSize).toFixed(1);

  return (
    <div className="slide-container" style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
      <h2 className="slide-title">Data Migration</h2>
      <p className="slide-subtitle">Securely transfer all data from local storage to the cloud with integrity validation</p>
      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1050, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '📦', title: 'Data Packaging', desc: 'Data is compressed and encrypted before transfer to ensure security and reduce transfer time.' },
            { icon: '🔄', title: 'Incremental Sync', desc: 'Only changed files are transferred after the initial migration, minimizing downtime and bandwidth usage.' },
            { icon: '✅', title: 'Integrity Validation', desc: 'Checksums (SHA-256) are computed before and after transfer to verify zero data loss or corruption.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.12 }} className="glass info-card">
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="card-icon">{item.icon}</span>
                <div><div className="card-title">{item.title}</div><p className="card-desc">{item.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ flex: '1 1 460px', padding: 28 }}>
          <div className="sim-instruction">🚀 Click <strong>"Start Data Transfer"</strong> to watch files migrate with live progress tracking</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><HardDrive size={22} color="#ff3366" /><div><div style={{ fontSize: '0.9rem', color: '#c0c8e0', fontWeight: 600 }}>Local Storage</div><div style={{ fontSize: '0.75rem', color: '#5a6080' }}>On-Premise Servers</div></div></div>
            <motion.div animate={transferring ? { x: [0, 5, 0] } : {}} transition={{ duration: 0.8, repeat: Infinity }}><Upload size={20} color="#00f0ff" /></motion.div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.9rem', color: '#c0c8e0', fontWeight: 600 }}>Cloud Storage</div><div style={{ fontSize: '0.75rem', color: '#5a6080' }}>Encrypted S3 / Blob</div></div><Cloud size={22} color="#00f0ff" /></div>
          </div>
          {files.map((file, i) => {
            const Icon = file.icon;
            return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={18} color={file.color} />
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#c0c8e0', fontWeight: 600 }}>{file.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5a6080' }}>{file.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.8rem', color: '#5a6080' }}>{file.size}</span>
                    <span style={{ fontSize: '0.8rem', color: file.color, fontWeight: 700, width: 35, textAlign: 'right' }}>{Math.round(progress[i])}%</span>
                    {verified[i] && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle size={16} color="#00ff88" /></motion.span>}
                  </div>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                  <motion.div style={{ height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${file.color}66, ${file.color})` }} animate={{ width: progress[i] + '%' }} transition={{ duration: 0.1 }} />
                </div>
              </div>
            );
          })}
          {/* Total progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5a6080', marginTop: 4 }}>
            <span>Total: {transferred} / {totalSize} GB</span>
            <span>{Math.round(progress.reduce((a, b) => a + b, 0) / 4)}% complete</span>
          </div>
          {verified.every(Boolean) && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ marginTop: 14, padding: '12px 22px', borderRadius: 12, background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)', color: '#00ff88', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
              ✅ Data Integrity Verified — All Files Transferred Successfully
            </motion.div>
          )}
          {!transferring && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="neon-btn" onClick={startTransfer} style={{ marginTop: 16, width: '100%' }}>🚀 Start Data Transfer</motion.button>}
        </motion.div>
      </div>
    </div>
  );
}
