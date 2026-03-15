import React from 'react';
import Navbar from './components/Navbar';
import SortingPage from './pages/SortingPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main style={{ 
        paddingTop: '100px', 
        paddingBottom: '2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: 'flex', 
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        {/* The Orchestrator takes over here */}
        <SortingPage />
      </main>
    </div>
  );
}

export default App;