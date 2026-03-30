import React from 'react';
import { motion } from 'framer-motion';

const BoxVisualizer = ({ arrayObjects, highlight, sortedIndices, getLabels, algorithm }) => {
  
  const isSearchAlgo = ['linear', 'binary'].includes(algorithm);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', height: '100%', width: '100%', paddingTop: '2rem' }}>
      {arrayObjects.map((item, index) => {
        const value = item.val;
        
        const activeHighlights = isSearchAlgo ? [highlight[0]] : highlight;
        const isHighlighted = activeHighlights.includes(index);
        
        const isSorted = sortedIndices.includes(index);
        const labels = getLabels(index);
        
        let boxColor = 'rgba(255, 255, 255, 0.05)';
        let glow = 'none';
        let borderColor = 'rgba(255, 255, 255, 0.1)';

        if (isHighlighted) {
          boxColor = 'rgba(212, 168, 75, 0.15)';
          glow = '0 0 20px rgba(212, 168, 75, 0.4)';
          borderColor = 'var(--accent-gold)';
        } else if (isSorted) {
          boxColor = 'rgba(128, 239, 128, 0.1)'; 
          glow = '0 0 15px rgba(128, 239, 128, 0.2)';
          borderColor = '#80EF80';
        }

        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: isHighlighted ? 1.1 : 1, backgroundColor: boxColor, boxShadow: glow, borderColor }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              width: '50px', height: '50px', borderRadius: '12px',
              border: '2px solid', position: 'relative', display: 'flex', 
              alignItems: 'center', justifyContent: 'center',
              zIndex: isHighlighted ? 10 : 1
            }}
          >
            {labels && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ position: 'absolute', top: '-30px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: '"Fira Code", monospace', padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 10 }}>
                {labels}
              </motion.div>
            )}
            <span style={{ color: isHighlighted ? 'var(--accent-gold)' : isSorted ? '#80EF80' : 'var(--text-main)', fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Fira Code", monospace' }}>
              {value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BoxVisualizer;