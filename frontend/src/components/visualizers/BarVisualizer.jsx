import React from 'react';
import { motion } from 'framer-motion';

const BarVisualizer = ({ arrayObjects, highlight, sortedIndices, getLabels, algorithm }) => {
  const maxVal = Math.max(...arrayObjects.map(o => o.val), 1);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '100%', width: '100%', paddingTop: '2rem',paddingBottom: '2rem' }}>
      {arrayObjects.map((item, index) => {
        const value = item.val;
        const isHighlighted = highlight.includes(index);
        const isSorted = sortedIndices.includes(index);
        const labels = getLabels(index);
        
        let barColor = 'rgba(255, 255, 255, 0.15)';
        let glow = 'none';

        if (isHighlighted) {
          barColor = 'var(--accent-gold)';
          glow = '0 0 20px rgba(212, 168, 75, 0.6)';
        } else if (isSorted) {
          barColor = '#80EF80'; 
          glow = '0 0 15px rgba(128, 239, 128, 0.2)';
        }

        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1, height: `${(value / maxVal) * 90}%`, backgroundColor: barColor, boxShadow: glow }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              flex: 1, maxWidth: '40px', borderRadius: '6px 6px 0 0',
              border: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none',
              position: 'relative', display: 'flex', justifyContent: 'center',
              zIndex: isHighlighted ? 10 : 1
            }}
          >
            {labels && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ position: 'absolute', top: '-25px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: '"Fira Code", monospace', padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 10 }}>
                {labels}
              </motion.div>
            )}
            <span style={{ position: 'absolute', bottom: '-25px', color: isHighlighted ? 'var(--accent-gold)' : isSorted ? '#80EF80' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: isHighlighted || isSorted ? 700 : 500, fontFamily: '"Fira Code", monospace' }}>
              {value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BarVisualizer;