import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      background: 'rgba(7, 7, 11, 0.5)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Subtle glowing icon */}
        <Activity size={24} style={{ color: 'var(--accent-gold)', filter: 'drop-shadow(0 0 8px rgba(212, 168, 75, 0.5))' }} />
        
        <span style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          letterSpacing: '0.5px',
          background: 'linear-gradient(to right, #FFF, var(--text-muted))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AlgoVisual
        </span>
      </div>
    </nav>
  );
};

export default Navbar;