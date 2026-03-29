import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Layers, 
  Binary, 
  Activity,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

const Sidebar = ({ activeAlgorithm, onAlgorithmChange, isCollapsed, setIsCollapsed }) => {
  const [expandedCategories, setExpandedCategories] = useState(['sorting', 'searching']);

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const categories = [
    {
      id: 'sorting',
      name: 'Sorting',
      icon: <BarChart2 size={20} />,
      algorithms: [
        { id: 'bubble', name: 'Bubble Sort' },
        { id: 'selection', name: 'Selection Sort' },
        { id: 'insertion', name: 'Insertion Sort' },
        { id: 'merge', name: 'Merge Sort' },
        { id: 'quick', name: 'Quick Sort' },
      ]
    },
    {
      id: 'searching',
      name: 'Searching',
      icon: <Search size={20} />,
      algorithms: [
        { id: 'linear', name: 'Linear Search', disabled: true },
        { id: 'binary', name: 'Binary Search', disabled: true },
      ]
    }
  ];

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  return (
    <motion.aside 
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-panel" 
      style={{
        height: 'calc(100vh - 110px)',
        position: 'fixed',
        top: '90px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        padding: isCollapsed ? '1.5rem 0.5rem' : '1.5rem 1rem',
        zIndex: 100,
        overflowX: 'hidden'
      }}
    >
      {/* HEADER SECTION */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isCollapsed ? 'center' : 'space-between',
        padding: '0 0.5rem',
        marginBottom: '2rem'
      }}>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Activity size={24} style={{ color: 'var(--accent-gold)' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '1px', color: 'white' }}>
              ALGO LAB
            </h2>
          </motion.div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: 'var(--accent-gold)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          className="sidebar-item-hover"
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Category Header */}
              <div 
                onClick={() => !isCollapsed && toggleCategory(category.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  gap: '10px', 
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  padding: '8px 10px',
                  cursor: isCollapsed ? 'default' : 'pointer',
                  borderRadius: '8px',
                  background: isExpanded && !isCollapsed ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {category.icon}
                  {!isCollapsed && <span>{category.name}</span>}
                </div>
                {!isCollapsed && (
                  <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                )}
              </div>

              {/* Algorithm List */}
              <AnimatePresence>
                {(isExpanded || isCollapsed) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px' }}
                  >
                    {category.algorithms.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => !algo.disabled && onAlgorithmChange(algo.id)}
                        disabled={algo.disabled}
                        title={isCollapsed ? algo.name : ''}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isCollapsed ? 'center' : 'space-between',
                          padding: isCollapsed ? '12px' : '10px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: activeAlgorithm === algo.id ? 'rgba(212, 168, 75, 0.15)' : 'transparent',
                          color: activeAlgorithm === algo.id ? 'var(--accent-gold)' : (algo.disabled ? 'rgba(255,255,255,0.2)' : 'var(--text-muted)'),
                          cursor: algo.disabled ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          fontSize: '0.9rem',
                          fontWeight: activeAlgorithm === algo.id ? 600 : 400,
                        }}
                        className={!algo.disabled ? 'sidebar-item-hover' : ''}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: activeAlgorithm === algo.id ? 'var(--accent-gold)' : 'currentColor',
                            boxShadow: activeAlgorithm === algo.id ? '0 0 8px var(--accent-gold)' : 'none',
                            transition: 'all 0.3s ease'
                          }} />
                          {!isCollapsed && <span>{algo.name}</span>}
                        </div>
                        {!isCollapsed && activeAlgorithm === algo.id && (
                          <motion.div layoutId="activeHighlight" style={{ color: 'var(--accent-gold)' }}>
                            <ChevronRight size={16} />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

  
    </motion.aside>
  );
};

export default Sidebar;
