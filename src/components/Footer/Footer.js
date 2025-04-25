import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="robot-tracks">
        <div className="track"></div>
        <div className="track"></div>
        <div className="track"></div>
        <div className="track"></div>
        <div className="track"></div>
        <div className="track"></div>
      </div>
      <div className="container">
        <p>© {currentYear} Amr Eslim | Computer Engineer & Embedded Systems Developer</p>
        <p>Berlin, Germany</p>
      </div>
    </footer>
  );
};

export default Footer;