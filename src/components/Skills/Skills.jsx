import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import skillGroups from '../../content/skills.json';
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
      <div className="skill-label">
        <span>{name}</span>
        <span className="skill-percent">{percentage}%</span>
      </div>
      <div className="skill-meter">
        <div
          className="skill-progress"
          ref={progressRef}
          data-width={percentage}
          style={{ width: '0%' }}
        >
          {/* Animated via CSS */}
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
          {skillGroups.map(({ category, skills }) => (
            <div className="chip" key={category}>
              <h3 className="chip-title">{t(`skills.categories.${category}.title`)}</h3>
              {skills.map(({ key, level }) => (
                <SkillMeter
                  key={key}
                  name={t(`skills.categories.${category}.skills.${key}`)}
                  percentage={level}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;