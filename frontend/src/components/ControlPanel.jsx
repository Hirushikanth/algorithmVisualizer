import React from 'react';
import { Play, Pause, RotateCcw, Shuffle, Zap, Search } from 'lucide-react';
import useSpeedControl from '../hooks/useSpeedControl';

const ControlPanel = ({ 
  isPlaying, 
  isFinished, 
  onPlay, 
  onPause, 
  onReset, 
  onGenerate, 
  onSort, 
  speedMs, 
  setSpeedMs, 
  hasSteps,
  actionName = "Sort"
}) => {
  const { handleSpeedChange } = useSpeedControl(speedMs, setSpeedMs);

  return (
    <div className="glass-panel" style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '1.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem', borderRadius: '20px'
    }}>
      
      {/* Left side: Setup Controls */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className="btn-premium" onClick={onGenerate} disabled={isPlaying}
          style={{ 
            background: isPlaying ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
            color: isPlaying ? 'var(--text-muted)' : 'white',
            display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'none'
          }}
        >
          <Shuffle size={18} /> New Array
        </button>
      </div>

      {/* Center: Playback Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={onReset} disabled={!hasSteps || isPlaying}
          style={{
            background: 'transparent', border: 'none', transition: 'color 0.2s',
            color: (!hasSteps || isPlaying) ? 'rgba(255,255,255,0.2)' : 'var(--text-main)',
            cursor: (!hasSteps || isPlaying) ? 'not-allowed' : 'pointer'
          }}
        >
          <RotateCcw size={24} />
        </button>

        {/* DYNAMIC PRIMARY ACTION BUTTON */}
        {!hasSteps ? (
          <button className="btn-premium" onClick={onSort} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {actionName === 'Search' ? <Search size={20} /> : <Zap size={20} />} 
            {actionName}
          </button>
        ) : (
          <button 
            className="btn-premium" onClick={isPlaying ? onPause : onPlay} disabled={isFinished && !isPlaying}
            style={{ 
              width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
              gap: '8px', opacity: (isFinished && !isPlaying) ? 0.5 : 1
            }}
          >
            {isPlaying ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Play</>}
          </button>
        )}
      </div>

      {/* Right side: Speed Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Speed</span>
        <input 
          type="range" min="10" max="500" value={510 - speedMs} onChange={handleSpeedChange}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-gold)' }}
        />
      </div>
    </div>
  );
};

export default ControlPanel;