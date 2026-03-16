import { useCallback } from 'react';

/**
 * Custom hook to handle speed control logic
 * Converts slider input to inverse speed values (higher = faster)
 */
const useSpeedControl = (speedMs, setSpeedMs) => {
  const handleSpeedChange = useCallback((e) => {
    // Inverse speed for the slider (User thinks: higher = faster. Code needs: lower ms = faster)
    // Range: 10ms (fast) to 500ms (slow)
    const val = 510 - e.target.value;
    setSpeedMs(val);
  }, [setSpeedMs]);

  return {
    handleSpeedChange,
  };
};

export default useSpeedControl;
