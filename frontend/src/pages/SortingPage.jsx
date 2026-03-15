import React, { useState, useEffect, useCallback } from 'react';
import ArrayVisualizer from '../components/ArrayVisualizer';
import ControlPanel from '../components/ControlPanel';
import useAnimation from '../hooks/useAnimation';
import { sortAPI } from '../services/api'; // The API we built in Phase 1

const ARRAY_SIZE = 15; // Golden ratio size for visual balance

const SortingPage = () => {
  const [baseArray, setBaseArray] = useState([]);
  const [sortSteps, setSortSteps] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Initialize our custom animation hook
  const {
    currentStep,
    isPlaying,
    isFinished,
    progress,
    speedMs,
    setSpeedMs,
    play,
    pause,
    reset
  } = useAnimation(sortSteps);

  // Generate a random array
  const generateNewArray = useCallback(() => {
    const newArr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 90) + 10);
    setBaseArray(newArr);
    setSortSteps([]); // Clear old steps
    reset(); // Reset animation hook
  }, [reset]);

  // Generate an array immediately on first load
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  // The main action: Call Spring Boot backend
  const handleSort = async () => {
    setIsFetching(true);
    try {
      // Hit the Spring Boot endpoint
      const steps = await sortAPI.getBubbleSortSteps(baseArray);
      setSortSteps(steps);
      
      // Auto-play as soon as data arrives (instant gratification)
      setTimeout(() => play(), 100); 
    } catch (error) {
      console.error("Sorting failed", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Determine what to show on screen
  // If we have steps, show the current animated frame. Otherwise, show the base unsorted array.
  const displayArray = sortSteps.length > 0 ? currentStep.array : baseArray;
  const displayHighlight = sortSteps.length > 0 ? currentStep.highlight : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      
      {/* Header Info */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>Bubble Sort</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          O(n²) time complexity • O(1) space complexity
        </p>
        
        {/* Subtle Progress Bar */}
        <div style={{ 
          width: '100%', maxWidth: '1000px', height: '4px', 
          background: 'rgba(255,255,255,0.05)', margin: '0 auto', borderRadius: '2px', overflow: 'hidden' 
        }}>
          <div style={{ 
            height: '100%', width: `${progress}%`, 
            background: 'var(--accent-gold)', 
            transition: 'width 0.1s linear',
            boxShadow: '0 0 10px rgba(212, 168, 75, 0.8)'
          }} />
        </div>
      </div>

      {/* The Visualizer Component */}
      <div style={{ position: 'relative' }}>
        {isFetching && (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            background: 'rgba(7,7,11,0.5)', zIndex: 10, borderRadius: '20px'
          }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Calculating Trajectories...</div>
          </div>
        )}
        <ArrayVisualizer array={displayArray} highlight={displayHighlight} />
      </div>

      {/* The Command Center */}
      <ControlPanel 
        isPlaying={isPlaying}
        isFinished={isFinished}
        onPlay={play}
        onPause={pause}
        onReset={reset}
        onGenerate={generateNewArray}
        onSort={handleSort}
        speedMs={speedMs}
        setSpeedMs={setSpeedMs}
        hasSteps={sortSteps.length > 0}
      />
      
    </div>
  );
};

export default SortingPage;