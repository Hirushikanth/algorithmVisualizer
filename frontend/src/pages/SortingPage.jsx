import React, { useState, useEffect, useCallback, useRef } from 'react';
import ArrayVisualizer from '../components/ArrayVisualizer';
import ControlPanel from '../components/ControlPanel';
import TerminalLog from '../components/TerminalLog';
import useAnimation from '../hooks/useAnimation';
import { sortAPI } from '../services/api';
import { BarChart2, LayoutGrid } from 'lucide-react';

const ARRAY_SIZE = 15;

// --- KINETIC TRACKING ALGORITHM ---
// This takes the raw backend arrays and assigns stable IDs so Framer Motion knows how to slide them
const processStepsWithIds = (baseObjects, apiSteps) => {
  let currentElements = [...baseObjects];
  
  return apiSteps.map((step) => {
    let newElements = new Array(step.array.length).fill(null);
    let availableElements = [...currentElements];
    
    // Pass 1: Keep elements that haven't moved in their same spots
    step.array.forEach((val, i) => {
      if (currentElements[i] && currentElements[i].val === val) {
        newElements[i] = currentElements[i];
        const idx = availableElements.findIndex(e => e.id === currentElements[i].id);
        if (idx !== -1) availableElements.splice(idx, 1);
      }
    });
    
    // Pass 2: Track elements that moved (Swaps/Shifts)
    step.array.forEach((val, i) => {
      if (!newElements[i]) {
        const matchIdx = availableElements.findIndex(e => e.val === val);
        if (matchIdx !== -1) {
          newElements[i] = availableElements[matchIdx];
          availableElements.splice(matchIdx, 1);
        } else {
          // Failsafe
          newElements[i] = { id: `item-failsafe-${Math.random()}`, val };
        }
      }
    });
    
    currentElements = newElements;
    return { ...step, arrayObjects: newElements }; // Attach the tracked objects to the step
  });
};

const SortingPage = ({ activeAlgorithm, setActiveAlgorithm }) => {
  const [baseArray, setBaseArray] = useState([]);
  const [baseArrayObjects, setBaseArrayObjects] = useState([]); // NEW: Tracks physical objects
  const [sortSteps, setSortSteps] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [visualMode, setVisualMode] = useState('bars');

  const {
    currentStep, currentStepIndex, isPlaying, isFinished, progress, speedMs, setSpeedMs, play, pause, reset
  } = useAnimation(sortSteps);

  const logEndRef = useRef(null);
  const prevIsPlayingRef = useRef(false);

  const generateNewArray = useCallback(() => {
    const newArr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 90) + 10);
    // Create stable IDs for the physical UI elements
    const newArrObjects = newArr.map((val) => ({ 
      id: `item-${Math.random().toString(36).substr(2, 9)}`, 
      val 
    }));
    
    setBaseArray(newArr);
    setBaseArrayObjects(newArrObjects);
    setSortSteps([]); 
    reset(); 
  }, [reset]);

  useEffect(() => { generateNewArray(); }, [generateNewArray]);

  useEffect(() => {
    setSortSteps([]);
    reset();
  }, [activeAlgorithm, reset]);

  useEffect(() => {
    if (isPlaying && !prevIsPlayingRef.current) window.scrollTo({ top: 0, behavior: 'smooth' });
    prevIsPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const handleSort = async () => {
    setIsFetching(true);
    try {
      let steps = [];
      if (activeAlgorithm === 'bubble') steps = await sortAPI.getBubbleSortSteps(baseArray);
      else if (activeAlgorithm === 'selection') steps = await sortAPI.getSelectionSortSteps(baseArray);
      else if (activeAlgorithm === 'insertion') steps = await sortAPI.getInsertionSortSteps(baseArray);
      else if (activeAlgorithm === 'merge') steps = await sortAPI.getMergeSortSteps(baseArray);
      else if (activeAlgorithm === 'quick') steps = await sortAPI.getQuickSortSteps(baseArray);
      
      // Process the steps to attach stable IDs before setting state
      const processedSteps = processStepsWithIds(baseArrayObjects, steps);
      
      setSortSteps(processedSteps);
      setTimeout(() => play(), 100); 
    } catch (error) {
      console.error("Sorting failed", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Switch to using Objects instead of raw numbers
  const displayArrayObjects = sortSteps.length > 0 ? currentStep.arrayObjects : baseArrayObjects;
  const displayHighlight = sortSteps.length > 0 ? currentStep.highlight : [];
  const currentPointerInfo = sortSteps.length > 0 ? currentStep.pointerInfo : '';
  const logHistory = sortSteps.slice(0, currentStepIndex + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      
      {/* HEADER */}
      <div style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          position: 'absolute', right: 0, top: 0, display: 'flex', background: 'rgba(255,255,255,0.05)', 
          padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button onClick={() => setVisualMode('bars')} title="Bar Chart Mode" style={{ padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: visualMode === 'bars' ? 'rgba(212, 168, 75, 0.2)' : 'transparent', color: visualMode === 'bars' ? 'var(--accent-gold)' : 'var(--text-muted)' }}><BarChart2 size={20} /></button>
          <button onClick={() => setVisualMode('boxes')} title="Array Box Mode" style={{ padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: visualMode === 'boxes' ? 'rgba(212, 168, 75, 0.2)' : 'transparent', color: visualMode === 'boxes' ? 'var(--accent-gold)' : 'var(--text-muted)' }}><LayoutGrid size={20} /></button>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', textTransform: 'capitalize' }}>
          {activeAlgorithm} Sort
        </h1>
        <div style={{ width: '100%', maxWidth: '1000px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-gold)', transition: 'width 0.1s linear', boxShadow: '0 0 10px rgba(212, 168, 75, 0.8)' }} />
        </div>
      </div>

      {/* STAGE */}
      <div style={{ position: 'relative' }}>
        {isFetching && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(7,7,11,0.5)', zIndex: 10, borderRadius: '20px' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Calculating Trajectories...</div>
          </div>
        )}
        <ArrayVisualizer 
          arrayObjects={displayArrayObjects} 
          highlight={displayHighlight} 
          pointerInfo={currentPointerInfo}
          algorithm={activeAlgorithm}
          mode={visualMode}
        />
      </div>

      <TerminalLog logHistory={logHistory} logEndRef={logEndRef} />
      <ControlPanel isPlaying={isPlaying} isFinished={isFinished} onPlay={play} onPause={pause} onReset={reset} onGenerate={generateNewArray} onSort={handleSort} speedMs={speedMs} setSpeedMs={setSpeedMs} hasSteps={sortSteps.length > 0} />
      
    </div>
  );
};

export default SortingPage;