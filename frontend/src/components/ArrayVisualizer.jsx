import React from 'react';
import useArrayVisualization from '../hooks/useArrayVisualization';
import BarVisualizer from './visualizers/BarVisualizer';
import BoxVisualizer from './visualizers/BoxVisualizer';
import { AnimatePresence } from 'framer-motion';

const ArrayVisualizer = ({ arrayObjects = [], highlight = [], pointerInfo = '', algorithm = 'bubble', mode = 'bars' }) => {
  const arrayVals = arrayObjects.map(o => o.val);
  const { sortedIndices, safeHighlights, getLabels } = useArrayVisualization(arrayVals, highlight, pointerInfo, algorithm);

  return (
    <div className="glass-panel" style={{
      width: '100%', maxWidth: '1000px', height: '50vh', minHeight: '400px',
      margin: '0 auto', padding: '1rem', position: 'relative'
    }}>
      <AnimatePresence mode="wait">
        {mode === 'bars' ? (
          <BarVisualizer key="bars" arrayObjects={arrayObjects} highlight={safeHighlights} sortedIndices={sortedIndices} getLabels={getLabels} algorithm={algorithm} />
        ) : (
          <BoxVisualizer key="boxes" arrayObjects={arrayObjects} highlight={safeHighlights} sortedIndices={sortedIndices} getLabels={getLabels} algorithm={algorithm} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArrayVisualizer;