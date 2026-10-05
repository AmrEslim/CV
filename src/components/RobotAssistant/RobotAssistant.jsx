import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './RobotAssistant.css';

const RobotAssistant = ({ hideOnMenuOpen = false, menuOpen = false }) => {
  const { t } = useTranslation();
  const robotRef = useRef(null);
  const eyesRef = useRef([]);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [robotVisible, setRobotVisible] = useState(true);
  
  // Initialize position from localStorage or default values
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('robotPosition');
    return savedPosition ? JSON.parse(savedPosition) : {
      x: window.innerWidth - 200,
      y: window.innerHeight - 200  // Adjusted to be further down from the top
    };
  });
  
  const [tourState, setTourState] = useState({
    isGuiding: false,
    currentStep: -1, // -1 means not started
    message: '',
    isThinking: false,
    score: 0,
    isMoving: false,
    showIntroDialog: false
  });
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const tourSteps = t('robotAssistant.tourSteps').map((step, index) => ({
    title: step.title,
    message: step.message,
    target: [null, "#hero", "#skills", "#projects", "#experience", "#robotics-diagram", "#languages", "#interests", "#contact"][index],
    position: [
      { x: 70, y: 50 },
      { x: 20, y: 30 },
      { x: 80, y: 40 },
      { x: 20, y: 50 },
      { x: 75, y: 40 },
      { x: 25, y: 60 },
      { x: 80, y: 50 },
      { x: 20, y: 70 },
      { x: 70, y: 60 }
    ][index],
    delay: [3000, 4000, 5000, 5000, 4000, 5000, 4000, 4000, 4000][index]
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingRef.current && robotRef.current) {
        // Update position based on mouse movement
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - robotRef.current.offsetWidth;
        const maxY = window.innerHeight - robotRef.current.offsetHeight;
        
        setPosition({
          x: Math.min(Math.max(0, newX), maxX),
          y: Math.min(Math.max(0, newY), maxY)
        });
      } else if (robotRef.current && containerRef.current) {
        const robotRect = robotRef.current.getBoundingClientRect();
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 2;
        
        const angleX = (e.clientX - robotCenterX) / window.innerWidth * 5;
        const angleY = (e.clientY - robotCenterY) / window.innerHeight * 5;
        
        eyesRef.current.forEach(eye => {
          if (eye) {
            eye.style.transform = `translate(${angleX}px, ${angleY}px)`;
          }
        });
        
        if (containerRef.current) {
          containerRef.current.style.transform = `rotateY(${angleX * 5}deg) rotateX(${-angleY * 2}deg)`;
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current && robotRef.current) {
        isDraggingRef.current = false;
        document.body.style.cursor = 'auto';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('robotPosition', JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // Adjust position if robot is outside viewport after resize
      setPosition(prev => ({
        x: Math.min(Math.max(0, prev.x), window.innerWidth - 200),
        y: Math.min(Math.max(0, prev.y), window.innerHeight - 270)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const constrainPosition = (x, y) => {
    // Convert percentage to pixels for precise boundary checking
    const pixelX = (x / 100) * viewport.width;
    const pixelY = (y / 100) * viewport.height;
    
    // Constrain to viewport boundaries considering robot dimensions
    const constrainedX = Math.min(Math.max(0, pixelX), viewport.width - 200);
    const constrainedY = Math.min(Math.max(0, pixelY), viewport.height - 270);
    
    // Convert back to percentages
    return {
      x: (constrainedX / viewport.width) * 100,
      y: (constrainedY / viewport.height) * 100
    };
  };

  const moveToPosition = (x, y, duration = 1000) => {
    setTourState(prev => ({ ...prev, isMoving: true }));
    
    const { x: constrainedX, y: constrainedY } = constrainPosition(x, y);
    const startX = position.x;
    const startY = position.y;
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth movement
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const newX = startX + (constrainedX - startX) * easeProgress;
      const newY = startY + (constrainedY - startY) * easeProgress;
      
      setPosition({ x: newX, y: newY });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTourState(prev => ({ ...prev, isMoving: false }));
      }
    };
    
    requestAnimationFrame(animate);
  };

  const showIntroDialog = () => {
    setTourState(prev => ({
      ...prev,
      showIntroDialog: true,
      message: t('robotAssistant.intro.dialog')
    }));
  };

  const startTour = () => {
    setTourState(prev => ({
      ...prev,
      isGuiding: true,
      currentStep: 0,
      showIntroDialog: false
    }));
    
    navigateToStep(0);
  };

  const navigateToStep = (stepIndex) => {
    const step = tourSteps[stepIndex];
    
    setTourState(prev => ({
      ...prev,
      currentStep: stepIndex,
      message: step.message,
      isThinking: true
    }));

    // Move robot to position
    moveToPosition(step.position.x, step.position.y);

    // Scroll to target if exists
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        // Smooth scroll with offset
        const offset = window.innerHeight * 0.2;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
        
        highlightElement(element);
      }
    }

    setTimeout(() => {
      setTourState(prev => ({ ...prev, isThinking: false }));

      // Move to next step after delay if not last step
      if (stepIndex < tourSteps.length - 1) {
        setTimeout(() => {
          navigateToStep(stepIndex + 1);
        }, step.delay);
      }
    }, 1000);
  };

  const highlightElement = (element) => {
    const highlight = document.createElement('div');
    highlight.className = 'section-highlight';
    const rect = element.getBoundingClientRect();
    
    highlight.style.position = 'fixed';
    highlight.style.top = `${rect.top - 10}px`;
    highlight.style.left = `${rect.left - 10}px`;
    highlight.style.width = `${rect.width + 20}px`;
    highlight.style.height = `${rect.height + 20}px`;
    
    document.body.appendChild(highlight);
    setTimeout(() => highlight.remove(), 3000);
  };

  const handleClick = () => {
    if (!tourState.isGuiding) {
      if (!tourState.showIntroDialog) {
        showIntroDialog();
      }
    }
    
    // Activate random buttons for visual effect
    const buttons = document.querySelectorAll('.robot-button');
    buttons.forEach(button => {
      if (Math.random() > 0.5) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 500);
      }
    });
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();  // Prevent the robot click handler from firing
    setRobotVisible(!robotVisible);
  };

  const handleMouseDown = (e) => {
    if (robotRef.current) {
      isDraggingRef.current = true;
      document.body.style.cursor = 'grabbing';
      const robotRect = robotRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - robotRect.left,
        y: e.clientY - robotRect.top
      };
      e.preventDefault(); // Prevent text selection while dragging
      e.stopPropagation(); // Prevent other click handlers from firing
    }
  };

  const getMessage = () => {
    if (tourState.showIntroDialog) {
      return t('robotAssistant.intro.greeting');
    }
    const message = tourState.message || t('robotAssistant.intro.default');
    // Ensure message isn't too long
    return message.length > 150 ? message.substring(0, 147) + '...' : message;
  };

  useEffect(() => {
    const updateMessagePosition = () => {
      const messageContainer = document.querySelector('.robot-message-container');
      if (messageContainer) {
        const robotRect = robotRef.current.getBoundingClientRect();
        const containerRect = messageContainer.getBoundingClientRect();
        
        let leftPos = robotRect.left + (robotRect.width / 2);
        leftPos = Math.min(Math.max(containerRect.width / 2 + 20, leftPos), 
                          window.innerWidth - (containerRect.width / 2 + 20));
        
        messageContainer.style.left = `${leftPos}px`;
      }
    };

    window.addEventListener('resize', updateMessagePosition);
    // Update position whenever message changes
    if (tourState.message || tourState.showIntroDialog) {
      setTimeout(updateMessagePosition, 100);
    }

    return () => window.removeEventListener('resize', updateMessagePosition);
  }, [tourState.message, tourState.showIntroDialog]);

  // Hide robot when menu is open (if hideOnMenuOpen is true) or when manually hidden
  const shouldShowRobot = robotVisible && !(hideOnMenuOpen && menuOpen);
  
  return shouldShowRobot ? (
    <div 
      id="robot-assistant" 
      ref={robotRef} 
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'none',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        zIndex: 1000,
        userSelect: 'none'
      }}
      className={`${tourState.isMoving ? 'moving' : ''} ${tourState.showIntroDialog ? 'showing-dialog' : ''}`}
    >
      <button 
        className="robot-hide-button"
        onClick={toggleVisibility}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '20px',
          padding: '5px',
          zIndex: 1001,
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}
      >
        ×
      </button>
      <div className="robot-container" ref={containerRef}>
        <div className={`robot-head ${tourState.isGuiding ? 'guiding' : ''}`}>
          <div className="robot-antenna"></div>
          <div className="robot-eye-container">
            <div className="robot-eye">
              <div className="robot-pupil" ref={el => eyesRef.current[0] = el}></div>
            </div>
            <div className="robot-eye">
              <div className="robot-pupil" ref={el => eyesRef.current[1] = el}></div>
            </div>
          </div>
          <div className="robot-mouth">
            <div className="robot-mouth-line"></div>
          </div>
        </div>
        
        <div className="robot-body">
          <div className="robot-body-display">
            <div className={`robot-display-text ${tourState.isThinking ? 'thinking' : ''}`}>
              {getMessage()}
            </div>
          </div>
          <div className="robot-controls">
            <div className="robot-button"></div>
            <div className="robot-button"></div>
            <div className="robot-button"></div>
            <div className="robot-button"></div>
          </div>
          <div className="robot-score">{t('robotAssistant.score')}: {tourState.score}</div>
        </div>
        
        <div className="robot-arm left">
          <div className="robot-hand">
            <div className="robot-finger"></div>
            <div className="robot-finger"></div>
            <div className="robot-finger"></div>
          </div>
        </div>
        
        <div className="robot-arm right">
          <div className="robot-hand">
            <div className="robot-finger"></div>
            <div className="robot-finger"></div>
            <div className="robot-finger"></div>
          </div>
        </div>
        
        <div className="robot-leg left">
          <div className="robot-wheel"></div>
        </div>
        
        <div className="robot-leg right">
          <div className="robot-wheel"></div>
        </div>
        
        <div className="robot-jetpack">
          <div className="jetpack-flame left"></div>
          <div className="jetpack-flame right"></div>
        </div>
        
        <div className="robot-trail">
          <div className="trail-particle"></div>
          <div className="trail-particle"></div>
          <div className="trail-particle"></div>
        </div>
        
        {tourState.isGuiding && (
          <div className={`robot-message-container ${!tourState.isThinking ? 'visible' : ''}`}>
            <div className="message-title">
              {tourSteps[tourState.currentStep]?.title || 'Hello!'}
            </div>
            <div className="message-content">
              {tourState.message}
            </div>
          </div>
        )}
      </div>
      
      {tourState.showIntroDialog && (
        <div className="robot-dialog">
          <div className="dialog-options">
            <button onClick={startTour}>{t('robotAssistant.buttons.startTour')}</button>
            <button onClick={() => setTourState(prev => ({ ...prev, showIntroDialog: false }))}>
              {t('robotAssistant.buttons.later')}
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default RobotAssistant;