import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SortingPage from './pages/SortingPage';
import SearchingPage from './pages/SearchingPage';

function App() {
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Define which category each algorithm belongs to
  const SORTING_ALGOS = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
  const SEARCHING_ALGOS = ['linear', 'binary'];

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Navbar />
      
      <Sidebar 
        activeAlgorithm={activeAlgorithm} 
        onAlgorithmChange={setActiveAlgorithm} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <main style={{ 
        flex: 1,
        paddingTop: '100px', 
        paddingBottom: '2rem',
        paddingLeft: isSidebarCollapsed ? '120px' : '320px', // Adjust padding based on sidebar
        paddingRight: '2rem',
        display: 'flex', 
        justifyContent: 'center',
        minHeight: '100vh',
        transition: 'padding-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}>
        
        {/* ROUTING LOGIC */}
        {SORTING_ALGOS.includes(activeAlgorithm) ? (
          <SortingPage activeAlgorithm={activeAlgorithm} setActiveAlgorithm={setActiveAlgorithm} />
        ) : SEARCHING_ALGOS.includes(activeAlgorithm) ? (
          <SearchingPage activeAlgorithm={activeAlgorithm} />
        ) : (
          <div style={{ color: 'white' }}>Algorithm not found.</div>
        )}

      </main>
    </div>
  );
}

export default App;