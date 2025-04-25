import React, { useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ lines = [], typingAnimation = false }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Make terminal cursor blink
    if (cursorRef.current) {
      const blinkInterval = setInterval(() => {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
        }
      }, 500);
      
      return () => clearInterval(blinkInterval);
    }
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-button close"></div>
        <div className="terminal-button minimize"></div>
        <div className="terminal-button maximize"></div>
      </div>
      <div className="terminal-content">
        {lines.map((line, index) => (
          <p 
            key={index} 
            className={index === lines.length - 1 && typingAnimation ? "terminal-text" : ""}
          >
            {line}
          </p>
        ))}
        <div className="blinking-cursor" ref={cursorRef}></div>
      </div>
    </div>
  );
};

export default Terminal;