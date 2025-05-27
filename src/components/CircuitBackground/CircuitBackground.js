import React, { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const backgroundRef = useRef(null);

  // Embedded styles for sophisticated circuit background
  const styles = {
    circuitBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #0a0a0f 0%, #151520 25%, #1a1a2e 50%, #16213e 75%, #0f3460 100%)',
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    gridPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(0, 136, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 136, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      animation: 'gridPulse 12s ease-in-out infinite',
    },
    circuitLine: {
      position: 'absolute',
      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.4), rgba(0, 136, 255, 0.6), rgba(0, 255, 157, 0.4), transparent)',
      boxShadow: '0 0 10px rgba(0, 255, 157, 0.3), inset 0 0 5px rgba(0, 136, 255, 0.2)',
      borderRadius: '1px',
    },
    circuitLineHorizontal: {
      height: '2px',
      animation: 'circuitFlow 8s linear infinite',
    },
    circuitLineVertical: {
      width: '2px',
      animation: 'circuitFlowVertical 8s linear infinite',
    },
    circuitNode: {
      position: 'absolute',
      width: '6px',
      height: '6px',
      background: 'radial-gradient(circle, rgba(0, 255, 157, 0.8), rgba(0, 136, 255, 0.4))',
      borderRadius: '50%',
      boxShadow: '0 0 12px rgba(0, 255, 157, 0.6), 0 0 24px rgba(0, 136, 255, 0.3)',
      animation: 'nodePulse 4s ease-in-out infinite',
    },
    dataStream: {
      position: 'absolute',
      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.8), rgba(0, 204, 126, 0.6), transparent)',
      borderRadius: '2px',
      filter: 'blur(0.5px)',
    },
    dataStreamHorizontal: {
      width: '80px',
      height: '3px',
      animation: 'streamFlowH 12s linear infinite',
    },
    dataStreamVertical: {
      width: '3px',
      height: '80px',
      animation: 'streamFlowV 12s linear infinite',
    },
    ambientGlow: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0, 136, 255, 0.15), rgba(0, 255, 157, 0.05), transparent)',
      filter: 'blur(20px)',
      animation: 'ambientBreath 15s ease-in-out infinite',
    },
    floatingDot: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'rgba(0, 255, 157, 0.6)',
      borderRadius: '50%',
      boxShadow: '0 0 8px rgba(0, 255, 157, 0.4)',
      animation: 'floatUp 20s linear infinite',
    },
  };

  // CSS animations as a style element
  const cssAnimations = `
    @keyframes gridPulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    @keyframes circuitFlow {
      0% { 
        background: linear-gradient(90deg, transparent, transparent, transparent, transparent, transparent);
        box-shadow: none;
      }
      25% { 
        background: linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.2), rgba(0, 136, 255, 0.3), transparent, transparent);
        box-shadow: 0 0 5px rgba(0, 255, 157, 0.2);
      }
      50% { 
        background: linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.4), rgba(0, 136, 255, 0.6), rgba(0, 255, 157, 0.4), transparent);
        box-shadow: 0 0 10px rgba(0, 255, 157, 0.3), inset 0 0 5px rgba(0, 136, 255, 0.2);
      }
      75% { 
        background: linear-gradient(90deg, transparent, transparent, rgba(0, 255, 157, 0.3), rgba(0, 136, 255, 0.2), transparent);
        box-shadow: 0 0 5px rgba(0, 136, 255, 0.2);
      }
      100% { 
        background: linear-gradient(90deg, transparent, transparent, transparent, transparent, transparent);
        box-shadow: none;
      }
    }
    
    @keyframes circuitFlowVertical {
      0% { 
        background: linear-gradient(180deg, transparent, transparent, transparent, transparent, transparent);
        box-shadow: none;
      }
      25% { 
        background: linear-gradient(180deg, transparent, rgba(0, 255, 157, 0.2), rgba(0, 136, 255, 0.3), transparent, transparent);
        box-shadow: 0 0 5px rgba(0, 255, 157, 0.2);
      }
      50% { 
        background: linear-gradient(180deg, transparent, rgba(0, 255, 157, 0.4), rgba(0, 136, 255, 0.6), rgba(0, 255, 157, 0.4), transparent);
        box-shadow: 0 0 10px rgba(0, 255, 157, 0.3), inset 0 0 5px rgba(0, 136, 255, 0.2);
      }
      75% { 
        background: linear-gradient(180deg, transparent, transparent, rgba(0, 255, 157, 0.3), rgba(0, 136, 255, 0.2), transparent);
        box-shadow: 0 0 5px rgba(0, 136, 255, 0.2);
      }
      100% { 
        background: linear-gradient(180deg, transparent, transparent, transparent, transparent, transparent);
        box-shadow: none;
      }
    }
    
    @keyframes nodePulse {
      0%, 100% { 
        transform: scale(1);
        opacity: 0.6;
        box-shadow: 0 0 12px rgba(0, 255, 157, 0.6), 0 0 24px rgba(0, 136, 255, 0.3);
      }
      50% { 
        transform: scale(1.3);
        opacity: 1;
        box-shadow: 0 0 20px rgba(0, 255, 157, 0.8), 0 0 40px rgba(0, 136, 255, 0.5);
      }
    }
    
    @keyframes streamFlowH {
      0% { 
        left: -80px;
        opacity: 0;
        transform: scaleX(0.5);
      }
      10% { 
        opacity: 1;
        transform: scaleX(1);
      }
      90% { 
        opacity: 1;
        transform: scaleX(1);
      }
      100% { 
        left: 100vw;
        opacity: 0;
        transform: scaleX(0.5);
      }
    }
    
    @keyframes streamFlowV {
      0% { 
        top: -80px;
        opacity: 0;
        transform: scaleY(0.5);
      }
      10% { 
        opacity: 1;
        transform: scaleY(1);
      }
      90% { 
        opacity: 1;
        transform: scaleY(1);
      }
      100% { 
        top: 100vh;
        opacity: 0;
        transform: scaleY(0.5);
      }
    }
    
    @keyframes ambientBreath {
      0%, 100% { 
        transform: scale(1);
        opacity: 0.3;
      }
      33% { 
        transform: scale(1.2);
        opacity: 0.5;
      }
      66% { 
        transform: scale(0.8);
        opacity: 0.2;
      }
    }
    
    @keyframes floatUp {
      0% { 
        transform: translateY(0) translateX(0) scale(0);
        opacity: 0;
      }
      10% { 
        transform: translateY(-10vh) translateX(5px) scale(1);
        opacity: 1;
      }
      90% { 
        transform: translateY(-90vh) translateX(-5px) scale(1);
        opacity: 0.8;
      }
      100% { 
        transform: translateY(-100vh) translateX(0) scale(0);
        opacity: 0;
      }
    }
    
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;

  useEffect(() => {
    // Insert CSS animations into the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = cssAnimations;
    document.head.appendChild(styleElement);

    const createSophisticatedBackground = () => {
      const background = backgroundRef.current;
      if (!background) return;

      // Clear any existing elements
      background.innerHTML = '';

      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Create grid pattern with embedded styles
      createGridPattern(background);
      
      // Create elegant circuit lines
      createCircuitGrid(background, width, height);
      
      // Create flowing data streams
      createDataStreams(background, width, height);
      
      // Create ambient lighting effects
      createAmbientEffects(background, width, height);
      
      // Create floating elements
      createFloatingElements(background, width, height);
    };

    const createGridPattern = (background) => {
      const grid = document.createElement('div');
      Object.assign(grid.style, styles.gridPattern);
      background.appendChild(grid);
    };

    const createCircuitGrid = (background, width, height) => {
      // Create sophisticated circuit lines with embedded styles
      const lineCount = Math.min(18, Math.floor((width + height) / 120));
      
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        Object.assign(line.style, styles.circuitLine);
        
        const isHorizontal = Math.random() > 0.5;
        
        if (isHorizontal) {
          Object.assign(line.style, styles.circuitLineHorizontal);
          const lineWidth = Math.random() * 350 + 150;
          const top = Math.random() * height;
          const left = Math.random() * (width - lineWidth);
          
          line.style.top = `${top}px`;
          line.style.left = `${left}px`;
          line.style.width = `${lineWidth}px`;
          line.style.animationDelay = `${Math.random() * 8}s`;
          
          // Add sophisticated connection nodes
          if (Math.random() > 0.5) {
            const node = document.createElement('div');
            Object.assign(node.style, styles.circuitNode);
            node.style.top = `${top - 3}px`;
            node.style.left = `${left + lineWidth - 3}px`;
            node.style.animationDelay = `${Math.random() * 4}s`;
            background.appendChild(node);
          }
        } else {
          Object.assign(line.style, styles.circuitLineVertical);
          const lineHeight = Math.random() * 350 + 150;
          const left = Math.random() * width;
          const top = Math.random() * (height - lineHeight);
          
          line.style.top = `${top}px`;
          line.style.left = `${left}px`;
          line.style.height = `${lineHeight}px`;
          line.style.animationDelay = `${Math.random() * 8}s`;
          
          // Add sophisticated connection nodes
          if (Math.random() > 0.5) {
            const node = document.createElement('div');
            Object.assign(node.style, styles.circuitNode);
            node.style.top = `${top + lineHeight - 3}px`;
            node.style.left = `${left - 3}px`;
            node.style.animationDelay = `${Math.random() * 4}s`;
            background.appendChild(node);
          }
        }
        
        background.appendChild(line);
      }
    };

    const createDataStreams = (background, width, height) => {
      // Create dynamic data streams with embedded styles
      const streamCount = 6 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < streamCount; i++) {
        const stream = document.createElement('div');
        Object.assign(stream.style, styles.dataStream);
        
        const isHorizontal = Math.random() > 0.3;
        
        if (isHorizontal) {
          Object.assign(stream.style, styles.dataStreamHorizontal);
          stream.style.top = `${Math.random() * height}px`;
          stream.style.left = '-80px';
        } else {
          Object.assign(stream.style, styles.dataStreamVertical);
          stream.style.left = `${Math.random() * width}px`;
          stream.style.top = '-80px';
        }
        
        stream.style.animationDelay = `${Math.random() * 12}s`;
        stream.style.animationDuration = `${10 + Math.random() * 6}s`;
        background.appendChild(stream);
      }
    };

    const createAmbientEffects = (background, width, height) => {
      // Create atmospheric ambient glows with embedded styles
      const glowCount = 4 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < glowCount; i++) {
        const glow = document.createElement('div');
        Object.assign(glow.style, styles.ambientGlow);
        
        const size = 250 + Math.random() * 500;
        glow.style.width = `${size}px`;
        glow.style.height = `${size}px`;
        glow.style.top = `${Math.random() * height - size / 2}px`;
        glow.style.left = `${Math.random() * width - size / 2}px`;
        glow.style.animationDelay = `${Math.random() * 15}s`;
        glow.style.animationDuration = `${12 + Math.random() * 8}s`;
        
        // Vary the glow colors slightly
        if (Math.random() > 0.5) {
          glow.style.background = 'radial-gradient(circle, rgba(0, 255, 157, 0.12), rgba(0, 136, 255, 0.06), transparent)';
        }
        
        background.appendChild(glow);
      }
    };

    const createFloatingElements = (background, width, height) => {
      // Create elegant floating particles with embedded styles
      const dotCount = Math.min(12, Math.floor(width / 150));
      
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        Object.assign(dot.style, styles.floatingDot);
        
        dot.style.left = `${Math.random() * width}px`;
        dot.style.top = `${height + 50}px`;
        dot.style.animationDelay = `${Math.random() * 20}s`;
        dot.style.animationDuration = `${18 + Math.random() * 8}s`;
        
        // Add size variation
        const scale = 0.8 + Math.random() * 0.4;
        dot.style.transform = `scale(${scale})`;
        
        background.appendChild(dot);
      }
    };

    // Initial creation
    createSophisticatedBackground();

    // Recreate on window resize with debouncing for performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createSophisticatedBackground();
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      // Clean up style element
      const styleElements = document.head.querySelectorAll('style');
      styleElements.forEach(el => {
        if (el.textContent.includes('gridPulse')) {
          el.remove();
        }
      });
    };
  }, []);  return (
    <div 
      ref={backgroundRef} 
      style={styles.circuitBackground}
    />
  );
};

export default CircuitBackground;