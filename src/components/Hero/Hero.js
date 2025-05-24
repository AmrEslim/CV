import React, { useRef, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useTranslation } from '../../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const robotModelRef = useRef(null);

  useEffect(() => {
    const currentRef = robotModelRef.current;
    if (currentRef) {
      const handleMouseMove = (e) => {
        const rect = currentRef.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        currentRef.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
      };
      
      const handleMouseLeave = () => {
        currentRef.style.transform = '';
      };
      
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const { t } = useTranslation();

  return (
    <section id="hero" className="scene">
      <div className="content-container">
        <div className="hero-flex">
          <div className="hero-text">
            <h1>Amr Eslim</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            
            <div className="hero-info">
              <p>{t('hero.info.greeting')}</p>
              <p>{t('hero.info.location')}</p>
              <p>{t('hero.info.education')}</p>
              <p>{t('hero.info.specialization')}</p>
              <p>{t('hero.info.scroll')}</p>
            </div>
            
            <div className="cta-buttons">
              <HashLink smooth to="#about" className="cta-button">{t('ui.buttons.explore').toUpperCase()}</HashLink>
              <HashLink smooth to="#contact" className="cta-button">{t('ui.buttons.connect').toUpperCase()}</HashLink>
            </div>
          </div>
          
          <div className="hero-profile">
            <ProfilePicture />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;