import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

// REMOVED `logEndRef` from props
const TerminalLog = ({ logHistory }) => {
  // MOVED useRef and useEffect INSIDE this component
  const logEndRef = useRef(null);

  useEffect(() => {
    // This effect now runs whenever logHistory changes, AFTER the component has re-rendered.
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [logHistory]); // The dependency is now the log data itself, which is perfect.

  const colorizeLog = (text) => {
    if (!text) return text;
    if (text.includes('SWAP!')) {
      const parts = text.split('SWAP!');
      return <>{parts[0]}<span style={{ color: '#ef4444', fontWeight: 'bold' }}>SWAP!</span>{parts[1]}</>;
    }
    if (text.includes('New minimum found')) {
      const parts = text.split('New minimum found');
      return <>{parts[0]}<span style={{ color: '#80EF80', fontWeight: 'bold' }}>New minimum found</span>{parts[1]}</>;
    }
    if (text.includes('Shifted')) {
      const parts = text.split('Shifted');
      return <>{parts[0]}<span style={{ color: '#F59E0B', fontWeight: 'bold' }}>Shifted</span>{parts[1]}</>;
    }
    if (text.includes('Inserted')) {
      const parts = text.split('Inserted');
      return <>{parts[0]}<span style={{ color: '#80EF80', fontWeight: 'bold' }}>Inserted</span>{parts[1]}</>;
    }
    if (text.includes('sorted successfully')) {
      return <span style={{ color: '#80EF80', fontWeight: 'bold' }}>{text}</span>;
    }
    return text;
  };

  return (
    <div className="glass-panel" style={{
      maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '1rem',
      display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '4px solid var(--accent-gold)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Terminal size={18} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Execution Log</span>
      </div>
      
      <div className="hide-scrollbar" style={{ 
        height: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px',
        fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', paddingRight: '10px'
      }}>
        {logHistory.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>{'>'} System standing by. Initialize sort sequence.</div>
        ) : (
          logHistory.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              style={{ 
                color: idx === logHistory.length - 1 ? 'var(--text-main)' : 'var(--text-muted)',
                display: 'flex', gap: '10px',
                background: idx === logHistory.length - 1 ? 'rgba(255,255,255,0.03)' : 'transparent',
                padding: '4px 8px', borderRadius: '4px'
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none' }}>{(idx + 1).toString().padStart(3, '0')}</span>
              <span>{colorizeLog(step.pointerInfo)}</span>
            </motion.div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default TerminalLog;