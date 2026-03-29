import { useState, useEffect, useCallback } from 'react';

const useAnimation = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(150);

  useEffect(() => {
    let timeoutId;

    if (isPlaying && steps.length > 0) {
      if (currentStepIndex < steps.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isPlaying, currentStepIndex, steps, speedMs]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const currentStep = steps[currentStepIndex] || { array: [], highlight: [], pointerInfo: 'Awaiting initialization command...' };
  
  const progress = steps.length > 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;
  const isFinished = steps.length > 0 && currentStepIndex === steps.length - 1;

  return {
    currentStep,
    currentStepIndex,
    isPlaying,
    isFinished,
    progress,
    speedMs,
    setSpeedMs,
    play,
    pause,
    reset,
  };
};

export default useAnimation;