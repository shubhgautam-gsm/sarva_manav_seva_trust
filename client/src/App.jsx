import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import OmDroplets from './components/OmDroplets.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Donate from './pages/Donate.jsx';
import Media from './pages/Media.jsx';
import Join from './pages/Join.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';

// Import the enhanced JS effects for healthcare (particle system, animations, etc.)
import './scripts/healthcare-effects.js';

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const toggleTheme = () => setIsLight(!isLight);

  useEffect(() => {
    // Optional: any global initialization for the particle system or effects can go here
    // healthcareEffects.init() if your healthcare-effects.js exposes such method
  }, []);

  return (
    <div className={isLight ? 'light' : 'dark'}>
      <OmDroplets />
      <Navbar onThemeToggle={toggleTheme} isLight={isLight} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/media" element={<Media />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
