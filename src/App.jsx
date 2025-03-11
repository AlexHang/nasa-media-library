import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ShowPage from './pages/ShowPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/show/:nasaId" element={<ShowPage />} />
            <Route path="*" element={<Navigate to="/search" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;