import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.classList.contains('robot-part') ||
          e.target.classList.contains('nav-toggle') ||
          e.target.classList.contains('language-item') ||
          e.target.classList.contains('interest-item') ||
          e.target.classList.contains('timeline-item') ||
          e.target.classList.contains('robot-project') ||
          e.target.classList.contains('control-btn')) {
        setEnlarged(true);
      } else {
        setEnlarged(false);
      }
    };

    const handleMouseOut = () => {
      setHidden(true);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${hidden ? 'hidden' : ''} ${enlarged ? 'enlarged' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    />
  );
};

export default CustomCursor;