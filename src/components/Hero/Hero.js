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
            <p className="hero-subtitle">Computer Engineer & <span className="title-effect">Embedded Systems Developer</span></p>
            
            <div className="hero-info">
              <p>{t('hero.greeting')} Amr Eslim</p>
              <p>{t('hero.role')} based in Berlin</p>
              <p>Recently graduated from HTW Berlin with a degree in Computer Engineering</p>
              <p>Specializing in Linux-based embedded systems and web applications</p>
              <p>Scroll down to explore my portfolio...</p>
            </div>
            
            <div className="cta-buttons">
              <HashLink smooth to="#about" className="cta-button">EXPLORE</HashLink>
              <HashLink smooth to="#contact" className="cta-button">CONNECT</HashLink>
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