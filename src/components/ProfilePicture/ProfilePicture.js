import React, { useEffect, useRef } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import './ProfilePicture.css';

const ProfilePicture = () => {
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!frameRef.current) return;
      
      const rect = frameRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = (y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;
      
      frameRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (frameRef.current) {
        frameRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    };

    const frame = frameRef.current;
    if (frame) {
      frame.addEventListener('mousemove', handleMouseMove);
      frame.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (frame) {
        frame.removeEventListener('mousemove', handleMouseMove);
        frame.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="profile-picture-container" ref={frameRef}>
      <div className="profile-frame">
        <div className="frame-corner top-left"></div>
        <div className="frame-corner top-right"></div>
        <div className="frame-corner bottom-left"></div>
        <div className="frame-corner bottom-right"></div>
        <div className="frame-edge top"></div>
        <div className="frame-edge right"></div>
        <div className="frame-edge bottom"></div>
        <div className="frame-edge left"></div>
        <div className="scanning-line"></div>
        <div className="profile-image">
          <LazyImage 
            src={process.env.PUBLIC_URL + '/images/profile.jpg'} 
            alt="Amr Eslim - Software Engineer and Robotics Enthusiast"
            className="profile-img"
          />
        </div>
        <div className="frame-overlay"></div>
      </div>
    </div>
  );
};

export default ProfilePicture;