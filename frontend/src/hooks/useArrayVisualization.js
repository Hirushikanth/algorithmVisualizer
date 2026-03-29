import { useMemo } from 'react';
const useArrayVisualization = (array, highlight, pointerInfo, algorithm) => {
  const sortedIndices = useMemo(() => {
    let indices = [];
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
        const sortedCount = passVal - 1;
        for (let k = array.length - sortedCount; k < array.length; k++) {
          indices.push(k);
        }
      }
    } else if (algorithm === 'insertion') {
      const match = pointerInfo.match(/Pass (\d+)/);
      if (match) {
        const iVal = parseInt(match[1], 10);
        for (let k = 0; k <= iVal; k++) indices.push(k);
      }
    } else if (algorithm === 'merge') {
      if (pointerInfo.includes('sorted successfully')) {
        return array.map((_, idx) => idx);
      }
    } else if (algorithm === 'quick') {
      const match = pointerInfo.match(/Pivot=(\d+)/);
      if (match) {
        const pivotVal = parseInt(match[1], 10);
        const pivotIndex = array.indexOf(pivotVal);
        if (pivotIndex !== -1) indices.push(pivotIndex);
      }
    }
    return indices;
  }, [array, pointerInfo, algorithm]);

  const getLabels = (index) => {
    let labels = [];
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
    } else if (algorithm === 'merge' && highlight.length >= 3) {
      if (index === highlight[0]) labels.push('L');
      if (index === highlight[1]) labels.push('R');
      if (index === highlight[2]) {
        if (pointerInfo.includes('DIVIDE')) labels.push('mid');
        if (pointerInfo.includes('MERGE')) labels.push('k');
      }
    } else if (algorithm === 'quick' && highlight.length >= 3) {
      if (index === highlight[0]) labels.push('low');
      if (index === highlight[1]) labels.push('high');
      if (index === highlight[2]) labels.push('pivot');
    }
    return labels.join(', ');
  };

  return {
    sortedIndices,
    getLabels,
  };
};

export default useArrayVisualization;
