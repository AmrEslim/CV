import React, { useRef, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import Terminal from '../Terminal/Terminal';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './Hero.css';

const Hero = () => {
  const robotModelRef = useRef(null);

  useEffect(() => {
    if (robotModelRef.current) {
      const handleMouseMove = (e) => {
        const rect = robotModelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        robotModelRef.current.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
      };
      
      const handleMouseLeave = () => {
        robotModelRef.current.style.transform = '';
      };
      
      robotModelRef.current.addEventListener('mousemove', handleMouseMove);
      robotModelRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (robotModelRef.current) {
          robotModelRef.current.removeEventListener('mousemove', handleMouseMove);
          robotModelRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);

  const terminalLines = [
    "> Hello, I'm Amr Eslim",
    "> Computer Engineer & Embedded Systems Developer based in Berlin",
    "> Recently graduated from HTW Berlin with a degree in Computer Engineering",
    "> Specializing in Linux-based embedded systems and web applications",
    "> Scroll down to explore my portfolio..."
  ];

  return (
    <section id="hero" className="scene">
      <div className="content-container">
        <div className="hero-flex">
          <div className="hero-text">
            <h1>Amr Eslim</h1>
            <p className="hero-subtitle">Computer Engineer & <span className="title-effect">Embedded Systems Developer</span></p>
            
            <Terminal lines={terminalLines} typingAnimation={true} />
            
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