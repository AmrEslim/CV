import React from 'react';
import './Interests.css';

const Interests = () => {
  const interests = [
    "Musik", 
    "Fußball", 
    "Schwimmen", 
    "Kochen", 
    "Reisen", 
    "Sprachen lernen", 
    "Robotics Development", 
    "Embedded Systems", 
    "Digital Assistance Systems"
  ];

  return (
    <section id="interests" className="scene">
      <div className="content-container">
        <h2 className="section-title">PERSONAL INTERESTS</h2>
        <div className="interests-container">
          {interests.map((interest, index) => (
            <div className="interest-item" key={index}>
              {interest}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;