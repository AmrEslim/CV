import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import './Navigation.css';

const Navigation = ({ onMenuOpenChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {      const sections = [
        'hero', 'about', 'skills', 'experience', 
        'projects', 'languages', 
        'interests', 'contact'
      ];
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    if (onMenuOpenChange) {
      onMenuOpenChange(newMenuState);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (onMenuOpenChange) {
      onMenuOpenChange(false);
    }
  };

  const NavLinks = ({ onClick }) => (
    <ul className="nav-links">
      <li>
        <HashLink 
          smooth 
          to="#hero" 
          onClick={onClick}
          className={activeSection === 'hero' ? 'active' : ''}
        >
          {t('nav.home')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#about" 
          onClick={onClick}
          className={activeSection === 'about' ? 'active' : ''}
        >
          {t('nav.about')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#skills" 
          onClick={onClick}
          className={activeSection === 'skills' ? 'active' : ''}
        >
          {t('nav.skills')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#experience" 
          onClick={onClick}
          className={activeSection === 'experience' ? 'active' : ''}
        >
          {t('nav.experience')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#projects" 
          onClick={onClick}
          className={activeSection === 'projects' ? 'active' : ''}
        >
          {t('nav.projects')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#languages" 
          onClick={onClick}
          className={activeSection === 'languages' ? 'active' : ''}
        >
          {t('nav.languages')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#interests" 
          onClick={onClick}
          className={activeSection === 'interests' ? 'active' : ''}
        >
          {t('nav.interests')}
        </HashLink>
      </li>
      <li>
        <HashLink 
          smooth 
          to="#contact" 
          onClick={onClick}
          className={activeSection === 'contact' ? 'active' : ''}
        >
          {t('nav.contact')}
        </HashLink>
      </li>
    </ul>
  );

  return (
    <>
      {/* Horizontal Navigation for Desktop */}
      <nav className="nav-horizontal">
        <NavLinks onClick={() => {}} />
      </nav>

      {/* Mobile Navigation */}
      <div className="nav-container">
        <button className="nav-toggle" onClick={toggleMenu}>☰</button>
      </div>
      
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <button className="nav-close" onClick={closeMenu}>✕</button>
        <NavLinks onClick={closeMenu} />
      </nav>
    </>
  );
};

export default Navigation;