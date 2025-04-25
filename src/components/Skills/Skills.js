import React, { useEffect, useRef } from 'react';
import './Skills.css';

const SkillMeter = ({ name, percentage }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && progressRef.current) {
          setTimeout(() => {
            progressRef.current.style.width = `${percentage}%`;
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [percentage]);

  return (
    <div>
      <p>{name}</p>
      <div className="skill-meter">
        <div 
          className="skill-progress" 
          ref={progressRef}
          data-width={percentage}
          style={{ width: '0%' }} // Start at 0, will be animated to the target width
        >
          <div className="skill-dots">
            {[...Array(10)].map((_, index) => (
              <div className="skill-dot" key={index}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="scene">
      <div className="content-container">
        <h2 className="section-title">TECHNICAL SKILLS</h2>
        <div className="circuit-board">
          <div className="chip">
            <h3 className="chip-title">Programming Languages</h3>
            <SkillMeter name="C/C++" percentage={90} />
            <SkillMeter name="Python" percentage={85} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">Web Development</h3>
            <SkillMeter name="HTML/CSS/JavaScript" percentage={80} />
            <SkillMeter name="Flask" percentage={75} />
            <SkillMeter name="React.js" percentage={70} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">Tools & Technologies</h3>
            <SkillMeter name="Git" percentage={85} />
            <SkillMeter name="Linux" percentage={90} />
            <SkillMeter name="Docker" percentage={75} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">Embedded Systems</h3>
            <SkillMeter name="Embedded Linux Systems" percentage={85} />
            <SkillMeter name="SQL" percentage={75} />
            <SkillMeter name="Digital Assistance Systems" percentage={80} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;