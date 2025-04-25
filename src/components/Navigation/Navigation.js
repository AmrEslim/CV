import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import './Navigation.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="nav-container">
        <button className="nav-toggle" onClick={toggleMenu}>☰</button>
      </div>
      
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <button className="nav-close" onClick={closeMenu}>✕</button>
        <ul className="nav-links">
          <li><HashLink smooth to="#hero" onClick={closeMenu}>Home</HashLink></li>
          <li><HashLink smooth to="#about" onClick={closeMenu}>About</HashLink></li>
          <li><HashLink smooth to="#skills" onClick={closeMenu}>Technical Skills</HashLink></li>
          <li><HashLink smooth to="#experience" onClick={closeMenu}>Education & Experience</HashLink></li>
          <li><HashLink smooth to="#projects" onClick={closeMenu}>Projects</HashLink></li>
          <li><HashLink smooth to="#robotics-diagram" onClick={closeMenu}>System Architecture</HashLink></li>
          <li><HashLink smooth to="#languages" onClick={closeMenu}>Languages</HashLink></li>
          <li><HashLink smooth to="#interests" onClick={closeMenu}>Interests</HashLink></li>
          <li><HashLink smooth to="#contact" onClick={closeMenu}>Contact</HashLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;