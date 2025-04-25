import React, { useEffect, useRef } from 'react';
import './CircuitBackground.css';

const CircuitBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const createCircuitBackground = () => {
      const background = backgroundRef.current;
      if (!background) return;

      // Clear any existing elements
      background.innerHTML = '';

      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Create horizontal lines
      for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line');
        
        const top = Math.random() * height;
        const lineWidth = Math.random() * 300 + 100;
        const left = Math.random() * (width - lineWidth);
        
        line.style.top = `${top}px`;
        line.style.left = `${left}px`;
        line.style.width = `${lineWidth}px`;
        line.style.height = '1px';
        
        background.appendChild(line);
        
        // Add circuit nodes to some lines
        if (Math.random() > 0.5) {
          const node = document.createElement('div');
          node.classList.add('circuit-node');
          node.style.top = `${top - 3}px`;
          node.style.left = `${left + lineWidth - 3}px`;
          background.appendChild(node);
        }
      }
      
      // Create vertical lines
      for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line');
        
        const left = Math.random() * width;
        const lineHeight = Math.random() * 300 + 100;
        const top = Math.random() * (height - lineHeight);
        
        line.style.top = `${top}px`;
        line.style.left = `${left}px`;
        line.style.width = '1px';
        line.style.height = `${lineHeight}px`;
        
        background.appendChild(line);
        
        // Add circuit nodes to some lines
        if (Math.random() > 0.5) {
          const node = document.createElement('div');
          node.classList.add('circuit-node');
          node.style.top = `${top + lineHeight - 3}px`;
          node.style.left = `${left - 3}px`;
          background.appendChild(node);
        }
      }
    };

    // Initial creation
    createCircuitBackground();

    // Recreate on window resize
    const handleResize = () => {
      createCircuitBackground();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className="circuit-background" ref={backgroundRef}></div>;
};

export default CircuitBackground;