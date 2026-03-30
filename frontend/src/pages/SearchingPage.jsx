import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Target, BarChart2, LayoutGrid } from 'lucide-react';
import ArrayVisualizer from '../components/ArrayVisualizer';
import ControlPanel from '../components/ControlPanel';
import TerminalLog from '../components/TerminalLog';
import useAnimation from '../hooks/useAnimation';
import { searchAPI } from '../services/api';

const ARRAY_SIZE = 15;

const SearchingPage = ({ activeAlgorithm }) => {
  const [baseArray, setBaseArray] = useState([]);
  const [baseArrayObjects, setBaseArrayObjects] = useState([]);
  const [target, setTarget] = useState(0);
  const [searchSteps, setSearchSteps] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [visualMode, setVisualMode] = useState('boxes');

  const { currentStep, currentStepIndex, isPlaying, isFinished, progress, speedMs, setSpeedMs, play, pause, reset } = useAnimation(searchSteps);
  const logEndRef = useRef(null);

  const generateNewArray = useCallback(() => {
    let newArr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 90) + 10);
    
    if (activeAlgorithm === 'binary') {
      newArr.sort((a, b) => a - b);
    }

    const newArrObjects = newArr.map(val => ({ id: `item-${Math.random().toString(36).substr(2, 9)}`, val }));
    const newTarget = Math.random() > 0.2 ? newArr[Math.floor(Math.random() * newArr.length)] : Math.floor(Math.random() * 90) + 10;

    setBaseArray(newArr);
    setBaseArrayObjects(newArrObjects);
    setTarget(newTarget);
    setSearchSteps([]); 
    reset(); 
  }, [reset, activeAlgorithm]);

  useEffect(() => { generateNewArray(); }, [generateNewArray, activeAlgorithm]);

  useEffect(() => {
    setSearchSteps([]);
    reset();
  }, [activeAlgorithm, reset]);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentStepIndex]);

  const handleSearch = async () => {
    setIsFetching(true);
    try {
      let steps = [];
      if (activeAlgorithm === 'linear') {
          steps = await searchAPI.getLinearSearchSteps(baseArray, target);
      } else if (activeAlgorithm === 'binary') {
          steps = await searchAPI.getBinarySearchSteps(baseArray, target);
      }
      const processedSteps = steps.map(step => ({ ...step, arrayObjects: baseArrayObjects }));
      
      setSearchSteps(processedSteps);
      setTimeout(() => play(), 100); 
    } catch (error) {
      console.error("Searching failed", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleTargetChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setTarget(isNaN(val) ? '' : val);
  };

  const displayArrayObjects = searchSteps.length > 0 ? currentStep.arrayObjects : baseArrayObjects;
  const displayHighlight = searchSteps.length > 0 ? currentStep.highlight : [];
  const currentPointerInfo = searchSteps.length > 0 ? currentStep.pointerInfo : '';
  const logHistory = searchSteps.slice(0, currentStepIndex + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {/* HEADER */}
      <div style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => setVisualMode('bars')} style={{ padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: visualMode === 'bars' ? 'rgba(212, 168, 75, 0.2)' : 'transparent', color: visualMode === 'bars' ? 'var(--accent-gold)' : 'var(--text-muted)' }}><BarChart2 size={20} /></button>
          <button onClick={() => setVisualMode('boxes')} style={{ padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: visualMode === 'boxes' ? 'rgba(212, 168, 75, 0.2)' : 'transparent', color: visualMode === 'boxes' ? 'var(--accent-gold)' : 'var(--text-muted)' }}><LayoutGrid size={20} /></button>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', textTransform: 'capitalize' }}>
          {activeAlgorithm} Search
        </h1>
        
        {/* INTERACTIVE TARGET UI DISPLAY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', background: 'rgba(212, 168, 75, 0.1)', border: '1px solid var(--accent-gold)', padding: '5px 20px', borderRadius: '20px', boxShadow: '0 0 20px rgba(212, 168, 75, 0.2)' }}>
            <Target size={24} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>TARGET:</span>
            <input 
              type="number" value={target} onChange={handleTargetChange} disabled={searchSteps.length > 0}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '1.5rem', fontWeight: 800, fontFamily: '"Fira Code", monospace', width: '60px', outline: 'none', borderBottom: searchSteps.length > 0 ? '1px solid transparent' : '1px dashed var(--accent-gold)', textAlign: 'center', padding: '0' }}
            />
        </div>

        <div style={{ width: '100%', maxWidth: '1000px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-gold)', transition: 'width 0.1s linear' }} />
        </div>
      </div>

      {/* STAGE */}
      <div style={{ position: 'relative' }}>
        <ArrayVisualizer arrayObjects={displayArrayObjects} highlight={displayHighlight} pointerInfo={currentPointerInfo} algorithm={activeAlgorithm} mode={visualMode} />
      </div>

      <TerminalLog logHistory={logHistory} logEndRef={logEndRef} />
      
      {/* COMMAND CENTER WITH NEW actionName PROP */}
      <ControlPanel 
        isPlaying={isPlaying} isFinished={isFinished} onPlay={play} onPause={pause} onReset={reset} 
        onGenerate={generateNewArray} onSort={handleSearch} speedMs={speedMs} setSpeedMs={setSpeedMs} 
        hasSteps={searchSteps.length > 0} actionName="Search"
      />
    </div>
  );
};

export default SearchingPage;