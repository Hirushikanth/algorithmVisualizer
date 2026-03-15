import React from 'react';
import { motion } from 'framer-motion';

const ArrayVisualizer = ({ array = [], highlight = [] }) => {
  // Find the maximum value to scale the bars proportionally
  const maxVal = Math.max(...array, 1);

  return (
    <div className="glass-panel" style={{
      width: '100%',
      maxWidth: '1000px',
      height: '50vh', // Takes up half the screen vertically
      minHeight: '400px',
      margin: '0 auto',
      padding: '2rem 1rem 0 1rem',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '4px', // Space between bars
    }}>
      {array.map((value, index) => {
        const isHighlighted = highlight.includes(index);
        
        return (
          <motion.div
            key={index}
            // Framer motion automatically smoothly interpolates these changes
            animate={{
              height: `${(value / maxVal) * 95}%`, // 95% to leave a tiny gap at the top
              backgroundColor: isHighlighted ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: isHighlighted ? '0 0 20px rgba(212, 168, 75, 0.6)' : '0 0 0px rgba(0,0,0,0)',
            }}
            transition={{
              type: "spring",
              stiffness: 400, // How fast it snaps
              damping: 25   // How much it bounces (lower = more bounce)
            }}
            style={{
              flex: 1, // Automatically scales width based on array size
              maxWidth: '40px', // Prevents bars from getting too fat on small arrays
              borderRadius: '6px 6px 0 0',
              border: '1px solid rgba(255,255,255,0.05)',
              borderBottom: 'none',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Only show numbers if the array is small enough to not clutter */}
            {array.length <= 25 && (
              <span style={{ 
                position: 'absolute', 
                bottom: '-25px', 
                color: isHighlighted ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: isHighlighted ? 700 : 500,
                transition: 'color 0.2s ease'
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