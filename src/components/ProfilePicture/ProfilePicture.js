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
        {/* Animated Rings */}
        <div className="hud-ring outer-ring"></div>
        <div className="hud-ring inner-ring"></div>

        {/* Tech Markers */}
        <div className="tech-marker top-left"></div>
        <div className="tech-marker top-right"></div>
        <div className="tech-marker bottom-left"></div>
        <div className="tech-marker bottom-right"></div>

        {/* Status Indicators */}
        <div className="status-indicator online">
          <span className="blink-dot"></span> SYSTEM ONLINE
        </div>
        <div className="scan-data">
          <span>BIO-ID: AE-2024</span>
          <span>MATCH: 99.9%</span>
        </div>

        {/* Main Image Area */}
        <div className="profile-image-wrapper">
          <div className="scanning-line"></div>
          <div className="profile-image">
            <LazyImage
              src={process.env.PUBLIC_URL + '/images/profile.jpg'}
              alt="Amr Eslim - Software Engineer"
              className="profile-img"
            />
          </div>
          <div className="frame-overlay-grid"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;