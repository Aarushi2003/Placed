import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import Home from './HomePage.jsx';
import App from './App.jsx'; // Import the About page component
import { Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Main Profile page */}
        <Route path="/about" element={<App />} /> {/* About page */}
      </Routes>
    </Router>
  </StrictMode>,
);
