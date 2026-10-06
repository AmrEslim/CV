import React, { useState, useEffect, useMemo } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getPosts } from '../../content';
import './Navigation.css';

const Navigation = ({ onMenuOpenChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { t } = useTranslation();
  const { language } = useLanguage();
  const hasPosts = useMemo(() => getPosts(language).length > 0, [language]);

  const sections = useMemo(
    () => [
      'hero', 'about', 'skills', 'experience', 'projects',
      ...(hasPosts ? ['posts'] : []),
      'languages', 'interests', 'contact',
    ],
    [hasPosts]
  );

  useEffect(() => {
    const handleScroll = () => {
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
  }, [sections]);

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
      {sections.map((id) => (
        <li key={id}>
          {/* "/#id" keeps anchors working from sub-pages such as /posts */}
          <HashLink
            smooth
            to={`/#${id}`}
            onClick={onClick}
            className={activeSection === id ? 'active' : ''}
          >
            {t(`nav.${id === 'hero' ? 'home' : id}`)}
          </HashLink>
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
