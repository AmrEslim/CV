import React, { useEffect, useRef } from 'react';
import './RobotAssistant.css';

const RobotAssistant = ({ onRobotClick }) => {
  const robotRef = useRef(null);
  const eyesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (robotRef.current && containerRef.current) {
        // Make robot's eyes follow cursor
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
        
        // Make robot slightly turn towards cursor
        if (containerRef.current) {
          containerRef.current.style.transform = `rotateY(${angleX * 5}deg) rotateX(${-angleY * 2}deg)`;
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    // Activate random buttons
    const buttons = document.querySelectorAll('.robot-button');
    buttons.forEach(button => {
      if (Math.random() > 0.5) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Call the parent callback
    if (onRobotClick) {
      onRobotClick();
    }
  };

  return (
    <div id="robot-assistant" ref={robotRef} onClick={handleClick}>
      <div className="robot-container" ref={containerRef}>
        <div className="robot-head">
          <div className="robot-antenna"></div>
          <div className="robot-eye-container">
            <div className="robot-eye">
              <div 
                className="robot-pupil" 
                ref={el => eyesRef.current[0] = el}
              ></div>
            </div>
            <div className="robot-eye">
              <div 
                className="robot-pupil"
                ref={el => eyesRef.current[1] = el}
              ></div>
            </div>
          </div>
          <div className="robot-mouth">
            <div className="robot-mouth-line"></div>
          </div>
        </div>
        
        <div className="robot-body">
          <div className="robot-body-display">
            <div className="robot-display-text">ROBOTICS SYSTEM ACTIVE... SCANNING ENVIRONMENT... READY FOR COMMANDS...</div>
          </div>
          <div className="robot-controls">
            <div className="robot-button"></div>
            <div className="robot-button"></div>
            <div className="robot-button"></div>
            <div className="robot-button"></div>
          </div>
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
      </div>
    </div>
  );
};

export default RobotAssistant;