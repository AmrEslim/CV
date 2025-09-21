import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
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

    const currentRef = progressRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
  const { t } = useTranslation();

  return (
    <section id="skills" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('skills.title')}</h2>
        <div className="circuit-board">
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.programming.title')}</h3>
            <SkillMeter name={t('skills.categories.programming.skills.cpp')} percentage={90} />
            <SkillMeter name={t('skills.categories.programming.skills.rust')} percentage={70} />
            <SkillMeter name={t('skills.categories.programming.skills.python')} percentage={85} />
            <SkillMeter name={t('skills.categories.programming.skills.sql')} percentage={75} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.web.title')}</h3>
            <SkillMeter name={t('skills.categories.web.skills.frontend')} percentage={80} />
            <SkillMeter name={t('skills.categories.web.skills.flask')} percentage={75} />
            <SkillMeter name={t('skills.categories.web.skills.react')} percentage={70} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.tools.title')}</h3>
            <SkillMeter name={t('skills.categories.tools.skills.git')} percentage={85} />
            <SkillMeter name={t('skills.categories.tools.skills.linux')} percentage={90} />
            <SkillMeter name={t('skills.categories.tools.skills.docker')} percentage={75} />
          </div>
          
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.embedded.title')}</h3>
            <SkillMeter name={t('skills.categories.embedded.skills.embedded_linux')} percentage={85} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;