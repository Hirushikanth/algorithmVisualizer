import { useMemo } from 'react';

const useArrayVisualization = (array, highlight, pointerInfo, algorithm) => {
  const sortedIndices = useMemo(() => {
    let indices = [];
    // Sorting logic...
    if (pointerInfo.includes('sorted successfully')) {
      indices = array.map((_, idx) => idx);
    } else if (algorithm === 'selection') {
      const match = pointerInfo.match(/i=(\d+)/);
      if (match) {
        const iVal = parseInt(match[1], 10);
        for (let k = 0; k < iVal; k++) indices.push(k);
      }
    } else if (algorithm === 'bubble') {
      const match = pointerInfo.match(/Pass (\d+)/);
      if (match) {
        const passVal = parseInt(match[1], 10);
        for (let k = array.length - (passVal - 1); k < array.length; k++) indices.push(k);
      }
    } else if (algorithm === 'insertion') {
      const match = pointerInfo.match(/Pass (\d+)/);
      if (match) {
        const iVal = parseInt(match[1], 10);
        for (let k = 0; k <= iVal; k++) indices.push(k);
      }
    } else if (algorithm === 'quick') {
      const match = pointerInfo.match(/Pivot=(\d+)/);
      if (match) {
        const pivotVal = parseInt(match[1], 10);
        const pivotIndex = array.indexOf(pivotVal);
        if (pivotIndex !== -1) indices.push(pivotIndex);
      }
    } 
    // Searching Logic - Lock in the Found item as Green
    else if (['linear', 'binary'].includes(algorithm)) {
      if (pointerInfo.includes('MATCH FOUND')) {
        const match = pointerInfo.match(/arr\[(\d+)\]/);
        if (match) indices.push(parseInt(match[1], 10));
      }
    }
    return indices;
  }, [array, pointerInfo, algorithm]);

  const safeHighlights = useMemo(() => {
    if (!highlight || highlight.length === 0) return [];
    if (algorithm === 'linear') return [highlight[0]];
    if (algorithm === 'binary') {
      if (pointerInfo.includes('Calculate') || pointerInfo.includes('half')) {
        return highlight;
      }
      return [highlight[0], highlight[1]];
    }
    return highlight;
  }, [highlight, algorithm, pointerInfo]);

  const getLabels = (index) => {
    let labels = [];
    // Sort logic...
    if (algorithm === 'selection' && highlight.length >= 3) {
      if (index === highlight[0]) labels.push('i');
      if (index === highlight[1]) labels.push('min');
      if (index === highlight[2] && !pointerInfo.includes('SWAP')) labels.push('j');
    } else if (algorithm === 'bubble' && highlight.length >= 2) {
      if (index === highlight[0]) labels.push('j');
      if (index === highlight[1]) labels.push('j+1');
    } else if (algorithm === 'insertion' && highlight.length >= 2) {
      if (index === highlight[0]) labels.push('key');
      if (index === highlight[1]) labels.push('j');
    } else if (algorithm === 'quick' && highlight.length >= 3) {
      if (index === highlight[0]) labels.push('low');
      if (index === highlight[1]) labels.push('high');
      if (index === highlight[2]) labels.push('pivot');
    }
    // Search logic
    else if (algorithm === 'linear' && highlight.length >= 1) {
      if (index === highlight[0]) labels.push('scan');
    }

    else if (algorithm === 'binary') {
      if (index === highlight[0]) labels.push('L');
      if (index === highlight[1] && highlight[0] !== highlight[1]) labels.push('R');
      if (index === highlight[2] && (pointerInfo.includes('Calculate') || pointerInfo.includes('half'))) {
        labels.push('mid');
      }
    }
    return [...new Set(labels)].join(', ');
  };

  return { sortedIndices, safeHighlights, getLabels };
};

export default useArrayVisualization;