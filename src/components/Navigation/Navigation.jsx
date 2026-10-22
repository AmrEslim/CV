import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import './Navigation.css';

// Home sections in page order, and the nav item each one belongs to.
const SECTION_NAV = {
  hero: 'hero',
  posts: 'posts',
  projects: 'projects',
  about: 'about',
  experience: 'about',
  skills: 'about',
  languages: 'about',
  interests: 'about',
  contact: 'contact',
};

const Navigation = ({ onMenuOpenChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const writingActive = pathname.startsWith('/posts') || (pathname === '/' && activeSection === 'posts');
  const navItems = [
    { key: 'home', section: 'hero', to: '/#hero' },
    { key: 'writing', to: '/posts' },
    { key: 'projects', section: 'projects', to: '/#projects' },
    { key: 'about', section: 'about', to: '/#about' },
    { key: 'contact', section: 'contact', to: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const readingLine = window.scrollY + window.innerHeight / 3;
      let current = 'hero';

      for (const [id, navKey] of Object.entries(SECTION_NAV)) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= readingLine) current = navKey;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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

  const renderLinks = (onClick) => (
    <ul className="nav-links">
      {navItems.map(({ key, section, to }) => (
        <li key={key}>
          {section ? (
            <HashLink smooth to={to} onClick={onClick} className={!writingActive && activeSection === section ? 'active' : ''}>
              {t(`nav.${key}`)}
            </HashLink>
          ) : (
            <Link to={to} onClick={onClick} className={writingActive ? 'active' : ''}>
              {t(`nav.${key}`)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Horizontal Navigation for Desktop */}
      <nav className="nav-horizontal">
        {renderLinks(() => {})}
      </nav>

      {/* Mobile Navigation */}
      <div className="nav-container">
        <button className="nav-toggle" onClick={toggleMenu}>☰</button>
      </div>

      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <button className="nav-close" onClick={closeMenu}>✕</button>
        {renderLinks(closeMenu)}
      </nav>
    </>
  );
};

export default Navigation;
