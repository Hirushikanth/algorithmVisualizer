import React from 'react';
import { motion } from 'framer-motion';

const ArrayVisualizer = ({ array = [], highlight = [], pointerInfo = '', algorithm = 'bubble' }) => {
  const maxVal = Math.max(...array, 1);

  // --- INTELLIGENCE LOGIC: DEDUCE SORTED PORTION ---
  let sortedIndices = [];
  if (pointerInfo.includes('sorted successfully')) {
    // If finished, everything is sorted
    sortedIndices = array.map((_, idx) => idx);
  } else if (algorithm === 'selection') {
    // Selection sort sorts from the left. i represents the current unsorted boundary.
    const match = pointerInfo.match(/i=(\d+)/);
    if (match) {
      const iVal = parseInt(match[1], 10);
      for (let k = 0; k < iVal; k++) sortedIndices.push(k);
    }
  } else if (algorithm === 'bubble') {
    // Bubble sort locks elements at the right end after each pass.
    const match = pointerInfo.match(/Pass (\d+)/);
    if (match) {
      const passVal = parseInt(match[1], 10);
      const sortedCount = passVal - 1; // Pass 1 = 0 sorted. Pass 2 = 1 sorted.
      for (let k = array.length - sortedCount; k < array.length; k++) {
        sortedIndices.push(k);
      }
    }
  }

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
    }
    return labels.join(', '); // If multiple pointers land on one bar (e.g., 'i, min')
  };

  return (
    <div className="glass-panel" style={{
      width: '100%', maxWidth: '1000px', height: '50vh', minHeight: '400px',
      margin: '0 auto', padding: '3rem 1rem 0 1rem', // Increased top padding for labels
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px',
    }}>
      {array.map((value, index) => {
        const isHighlighted = highlight.includes(index);
        const isSorted = sortedIndices.includes(index);
        const labels = getLabels(index);
        
        // Determine Color Priority
        let barColor = 'rgba(255, 255, 255, 0.15)'; // Default Unsorted
        let glow = 'none';

        if (isHighlighted) {
          barColor = 'var(--accent-gold)';
          glow = '0 0 20px rgba(212, 168, 75, 0.6)';
        } else if (isSorted) {
          barColor = '#80EF80'; // Sorted Portion
          glow = '0 0 15px rgba(128, 239, 128, 0.2)';
        }

        return (
          <motion.div
            key={index}
            animate={{
              height: `${(value / maxVal) * 90}%`, 
              backgroundColor: barColor,
              boxShadow: glow,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              flex: 1, maxWidth: '40px', borderRadius: '6px 6px 0 0',
              border: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none',
              position: 'relative', display: 'flex', justifyContent: 'center',
            }}
          >
            {/* FLOATING TARGET LABELS (i, min, j) */}
            {labels && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  position: 'absolute', top: '-25px', color: 'var(--accent-gold)',
                  fontSize: '0.85rem', fontWeight: 700, fontFamily: '"Fira Code", monospace',
                  padding: '2px 6px', borderRadius: '4px',
                  whiteSpace: 'nowrap', zIndex: 10
                }}
              >
                {labels}
              </motion.div>
            )}

            {/* Values at the bottom */}
            {array.length <= 25 && (
              <span style={{ 
                position: 'absolute', bottom: '-25px', 
                color: isHighlighted ? 'var(--accent-gold)' : isSorted ? '#80EF80' : 'var(--text-muted)',
                fontSize: '0.8rem', fontWeight: isHighlighted || isSorted ? 700 : 500,
              }}>
                {value}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ArrayVisualizer;