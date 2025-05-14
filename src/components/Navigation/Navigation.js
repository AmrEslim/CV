import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import './Navigation.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

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
          <li><HashLink smooth to="#hero" onClick={closeMenu}>{t('nav.home')}</HashLink></li>
          <li><HashLink smooth to="#about" onClick={closeMenu}>{t('nav.about')}</HashLink></li>
          <li><HashLink smooth to="#skills" onClick={closeMenu}>{t('nav.skills')}</HashLink></li>
          <li><HashLink smooth to="#experience" onClick={closeMenu}>{t('nav.experience')}</HashLink></li>
          <li><HashLink smooth to="#projects" onClick={closeMenu}>{t('nav.projects')}</HashLink></li>
          <li><HashLink smooth to="#robotics-diagram" onClick={closeMenu}>{t('nav.architecture')}</HashLink></li>
          <li><HashLink smooth to="#languages" onClick={closeMenu}>{t('nav.languages')}</HashLink></li>
          <li><HashLink smooth to="#interests" onClick={closeMenu}>{t('nav.interests')}</HashLink></li>
          <li><HashLink smooth to="#contact" onClick={closeMenu}>{t('nav.contact')}</HashLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;