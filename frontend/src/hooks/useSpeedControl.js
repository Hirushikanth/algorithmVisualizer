import { useCallback } from 'react';

const useSpeedControl = (speedMs, setSpeedMs) => {
  const handleSpeedChange = useCallback((e) => {
    const val = 510 - e.target.value;
    setSpeedMs(val);
  }, [setSpeedMs]);

  return {
    handleSpeedChange,
  };
};

export default useSpeedControl;
