import { useMemo } from 'react';

/**
 * Custom hook to handle array visualization logic
 * Deduces sorted portion and generates labels for array bars
 */
const useArrayVisualization = (array, highlight, pointerInfo, algorithm) => {
  // --- INTELLIGENCE LOGIC: DEDUCE SORTED PORTION ---
  const sortedIndices = useMemo(() => {
    let indices = [];
    if (pointerInfo.includes('sorted successfully')) {
      // If finished, everything is sorted
      indices = array.map((_, idx) => idx);
    } else if (algorithm === 'selection') {
      // Selection sort sorts from the left. i represents the current unsorted boundary.
      const match = pointerInfo.match(/i=(\d+)/);
      if (match) {
        const iVal = parseInt(match[1], 10);
        for (let k = 0; k < iVal; k++) indices.push(k);
      }
    } else if (algorithm === 'bubble') {
      // Bubble sort locks elements at the right end after each pass.
      const match = pointerInfo.match(/Pass (\d+)/);
      if (match) {
        const passVal = parseInt(match[1], 10);
        const sortedCount = passVal - 1; // Pass 1 = 0 sorted. Pass 2 = 1 sorted.
        for (let k = array.length - sortedCount; k < array.length; k++) {
          indices.push(k);
        }
      }
    } else if (algorithm === 'insertion') {
      // Insertion sort sorts from the left up to index i.
      const match = pointerInfo.match(/Pass (\d+)/);
      if (match) {
        const iVal = parseInt(match[1], 10);
        for (let k = 0; k <= iVal; k++) indices.push(k);
      }
    }
    return indices;
  }, [array, pointerInfo, algorithm]);

  // --- INTELLIGENCE LOGIC: LABEL TARGETING ---
  const getLabels = (index) => {
    let labels = [];
    if (algorithm === 'selection' && highlight.length >= 3) {
      if (index === highlight[0]) labels.push('i');
      if (index === highlight[1]) labels.push('min');
      // Only show 'j' if it's currently being used (j is usually the 3rd highlight, but we don't want to show it on 'i' during swap)
      if (index === highlight[2] && !pointerInfo.includes('SWAP')) labels.push('j');
    } else if (algorithm === 'bubble' && highlight.length >= 2) {
      if (index === highlight[0]) labels.push('j');
      if (index === highlight[1]) labels.push('j+1');
    } else if (algorithm === 'insertion' && highlight.length >= 2) {
      if (index === highlight[0]) labels.push('key');
      if (index === highlight[1]) labels.push('j');
    }
    return labels.join(', '); // If multiple pointers land on one bar (e.g., 'i, min')
  };

  return {
    sortedIndices,
    getLabels,
  };
};

export default useArrayVisualization;
