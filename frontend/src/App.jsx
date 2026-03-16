import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SortingPage from './pages/SortingPage';

function App() {
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleAlgorithmChange = (algo) => {
    setActiveAlgorithm(algo);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--space-dark)' }}>
        <Sidebar 
          activeAlgorithm={activeAlgorithm} 
          onAlgorithmChange={handleAlgorithmChange} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        
        <main style={{ 
          paddingTop: '100px', 
          paddingBottom: '2rem',
          paddingLeft: isSidebarCollapsed ? '100px' : '320px', // Dynamic padding
          paddingRight: '2rem',
          flexGrow: 1,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'padding-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
          minWidth: 0
        }}>
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <SortingPage 
              activeAlgorithm={activeAlgorithm} 
              setActiveAlgorithm={handleAlgorithmChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;