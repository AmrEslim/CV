import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [enlarged, setEnlarged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let rafId;
    const updateCursorPosition = (e) => {
      // Use requestAnimationFrame for smoother cursor movement
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setHidden(false);
      });
    };

    const handleMouseOver = (e) => {
      const isDraggableElement = e.target.closest('#robot-assistant') !== null;
      
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

      // Update dragging state based on robot interaction
      if (isDraggableElement) {
        document.body.style.cursor = 'grab';
      } else {
        document.body.style.cursor = '';
      }
    };

    const handleMouseDown = (e) => {
      if (e.target.closest('#robot-assistant') !== null) {
        setIsDragging(true);
        document.body.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
    };

    const handleMouseOut = () => {
      setHidden(true);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${hidden ? 'hidden' : ''} ${enlarged ? 'enlarged' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default CustomCursor;