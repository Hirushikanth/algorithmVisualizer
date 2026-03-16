import React from 'react';
import { motion } from 'framer-motion';
import useArrayVisualization from '../hooks/useArrayVisualization';

const ArrayVisualizer = ({ array = [], highlight = [], pointerInfo = '', algorithm = 'bubble' }) => {
  const maxVal = Math.max(...array, 1);
  const { sortedIndices, getLabels } = useArrayVisualization(array, highlight, pointerInfo, algorithm);

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