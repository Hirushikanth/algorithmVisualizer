import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import ArrayVisualizer from '../components/ArrayVisualizer';
import ControlPanel from '../components/ControlPanel';
import useAnimation from '../hooks/useAnimation';
import { sortAPI } from '../services/api';
import { Terminal } from 'lucide-react';

const ARRAY_SIZE = 15;

const SortingPage = () => {
  const [baseArray, setBaseArray] = useState([]);
  const [sortSteps, setSortSteps] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [activeAlgorithm, setActiveAlgorithm] = useState('selection'); 

  const {
    currentStep, currentStepIndex, isPlaying, isFinished, progress, speedMs, setSpeedMs, play, pause, reset
  } = useAnimation(sortSteps);

  // Ref to handle auto-scrolling the log terminal
  const logEndRef = useRef(null);

  const generateNewArray = useCallback(() => {
    const newArr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 90) + 10);
    setBaseArray(newArr);
    setSortSteps([]); 
    reset(); 
  }, [reset]);

  useEffect(() => { generateNewArray(); }, [generateNewArray]);

  // Auto-scroll the terminal down when a new step plays
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentStepIndex]);

  const handleAlgorithmChange = (algo) => {
    setActiveAlgorithm(algo);
    setSortSteps([]); 
    reset(); 
  };

  const handleSort = async () => {
    setIsFetching(true);
    try {
      let steps = [];
      if (activeAlgorithm === 'bubble') steps = await sortAPI.getBubbleSortSteps(baseArray);
      else if (activeAlgorithm === 'selection') steps = await sortAPI.getSelectionSortSteps(baseArray);
      
      setSortSteps(steps);
      setTimeout(() => play(), 100); 
    } catch (error) {
      console.error("Sorting failed", error);
    } finally {
      setIsFetching(false);
    }
  };

  const displayArray = sortSteps.length > 0 ? currentStep.array : baseArray;
  const displayHighlight = sortSteps.length > 0 ? currentStep.highlight : [];
  const currentPointerInfo = sortSteps.length > 0 ? currentStep.pointerInfo : '';

  // Get history of logs up to the current frame
  const logHistory = sortSteps.slice(0, currentStepIndex + 1);

  // Helper to colorize specific words in the log
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
    if (text.includes('sorted successfully')) {
      return <span style={{ color: '#80EF80', fontWeight: 'bold' }}>{text}</span>;
    }
    return text;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      
      {/* HEADER & SELECTOR */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '5px', 
          borderRadius: '30px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {['bubble', 'selection'].map((algo) => (
            <button
              key={algo} onClick={() => handleAlgorithmChange(algo)}
              style={{
                padding: '8px 24px', borderRadius: '25px', border: 'none',
                background: activeAlgorithm === algo ? 'rgba(212, 168, 75, 0.15)' : 'transparent',
                color: activeAlgorithm === algo ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontWeight: activeAlgorithm === algo ? 600 : 400, cursor: 'pointer',
                transition: 'all 0.3s ease', textTransform: 'capitalize'
              }}
            >
              {algo} Sort
            </button>
          ))}
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', textTransform: 'capitalize' }}>
          {activeAlgorithm} Sort
        </h1>
        
        <div style={{ width: '100%', maxWidth: '1000px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-gold)', transition: 'width 0.1s linear', boxShadow: '0 0 10px rgba(212, 168, 75, 0.8)' }} />
        </div>
      </div>

      {/* THE MAIN STAGE */}
      <div style={{ position: 'relative' }}>
        {isFetching && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(7,7,11,0.5)', zIndex: 10, borderRadius: '20px' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Calculating Trajectories...</div>
          </div>
        )}
        <ArrayVisualizer 
          array={displayArray} 
          highlight={displayHighlight} 
          pointerInfo={currentPointerInfo}
          algorithm={activeAlgorithm}
        />
      </div>

      {/* --- NEW LOG TERMINAL --- */}
      <div className="glass-panel" style={{
        maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '1rem',
        display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '4px solid var(--accent-gold)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Terminal size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Execution Log</span>
        </div>
        
        {/* Scrollable Container */}
        <div style={{ 
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
          {/* Invisible div to target for auto-scrolling */}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* COMMAND CENTER */}
      <ControlPanel 
        isPlaying={isPlaying} isFinished={isFinished} onPlay={play} onPause={pause} onReset={reset}
        onGenerate={generateNewArray} onSort={handleSort} speedMs={speedMs} setSpeedMs={setSpeedMs}
        hasSteps={sortSteps.length > 0}
      />
      
    </div>
  );
};

export default SortingPage;