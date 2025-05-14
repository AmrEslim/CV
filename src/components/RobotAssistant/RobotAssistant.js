import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RobotAssistant.css';

const RobotAssistant = ({ onRobotClick }) => {
  const robotRef = useRef(null);
  const eyesRef = useRef([]);
  const containerRef = useRef(null);
  
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

  const tourSteps = [
    {
      title: "👋 Introduction",
      message: "I'm your friendly robot assistant! Let me guide you through this portfolio and show you all the cool features!",
      target: null,
      position: { x: 70, y: 50 },
      delay: 3000
    },
    {
      title: "🚀 Hero Section",
      message: "Welcome to Amr's portfolio! I was built using React and advanced CSS animations. Pretty cool, right?",
      target: "#hero",
      position: { x: 20, y: 30 },
      delay: 4000
    },
    {
      title: "💻 Technical Skills",
      message: "These interactive chips represent my creator's technical skills. Try hovering over them to see detailed descriptions!",
      target: "#skills",
      position: { x: 80, y: 40 },
      delay: 5000
    },
    {
      title: "🏗️ Projects Showcase",
      message: "Check out these awesome projects! Each card is interactive and reveals more details when you interact with it.",
      target: "#projects",
      position: { x: 20, y: 50 },
      delay: 5000
    },
    {
      title: "📈 Experience Timeline",
      message: "Here's our journey through time! Watch how each milestone animates as you scroll through.",
      target: "#experience",
      position: { x: 75, y: 40 },
      delay: 4000
    },
    {
      title: "🤖 System Architecture",
      message: "This is my brain! An interactive diagram showing how I'm built. Try clicking on different components!",
      target: "#robotics-diagram",
      position: { x: 25, y: 60 },
      delay: 5000
    },
    {
      title: "🌍 Languages",
      message: "We speak multiple languages! Each bar shows proficiency levels with cool animations.",
      target: "#languages",
      position: { x: 80, y: 50 },
      delay: 4000
    },
    {
      title: "🎯 Interests",
      message: "Discover our passions and interests. These cards light up as you explore them!",
      target: "#interests",
      position: { x: 20, y: 70 },
      delay: 4000
    },
    {
      title: "📬 Let's Connect",
      message: "Want to get in touch? You can find all contact information here. I'd love to hear from you!",
      target: "#contact",
      position: { x: 70, y: 60 },
      delay: 4000
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (robotRef.current && containerRef.current) {
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

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
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
      message: "Would you like me to guide you through this portfolio? I can show you all the cool features!"
    }));
  };

  const startTour = () => {
    setTourState(prev => ({
      ...prev,
      isGuiding: true,
      currentStep: 0,
      showIntroDialog: false
    }));
    
    onRobotClick(); // Open code editor when tour starts
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
        showIntroDialog();  // Just show the dialog, don't open code editor
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

  const getMessage = () => {
    if (tourState.showIntroDialog) {
      return "Would you like me to guide you through this portfolio? [Click me to start the tour!]";
    }
    const message = tourState.message || "Hey there! Click me for an interactive tour!";
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

  return (
    <div 
      id="robot-assistant" 
      ref={robotRef} 
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'none'
      }}
      className={`${tourState.isMoving ? 'moving' : ''} ${tourState.showIntroDialog ? 'showing-dialog' : ''}`}
    >
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
          <div className="robot-score">Score: {tourState.score}</div>
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
            <button onClick={startTour}>Let's explore together!</button>
            <button onClick={() => setTourState(prev => ({ ...prev, showIntroDialog: false }))}>
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotAssistant;