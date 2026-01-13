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

  /* 
     NOTE: Structure maintained for visual hierarchy.
  */
  return (
    <section id="skills" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('skills.title')}</h2>
        <div className="circuit-board">

          {/* Embedded Systems - Priority 1 */}
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.embedded.title')}</h3>
            <SkillMeter name={t('skills.categories.embedded.skills.embedded_linux')} percentage={95} />
            <SkillMeter name={t('skills.categories.embedded.skills.rtos')} percentage={85} />
            <SkillMeter name={t('skills.categories.embedded.skills.drivers')} percentage={80} />
            <SkillMeter name={t('skills.categories.embedded.skills.protocols')} percentage={90} />
          </div>

          {/* Programming Languages - Priority 2 */}
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.programming.title')}</h3>
            <SkillMeter name={t('skills.categories.programming.skills.cpp')} percentage={95} />
            <SkillMeter name={t('skills.categories.programming.skills.rust')} percentage={70} />
            <SkillMeter name={t('skills.categories.programming.skills.python')} percentage={85} />
            <SkillMeter name={t('skills.categories.programming.skills.assembly')} percentage={60} />
          </div>

          {/* Tools & DevOps - Priority 3 */}
          <div className="chip">
            <h3 className="chip-title">{t('skills.categories.tools.title')}</h3>
            <SkillMeter name={t('skills.categories.tools.skills.cmake')} percentage={85} />
            <SkillMeter name={t('skills.categories.tools.skills.gdb')} percentage={90} />
            <SkillMeter name={t('skills.categories.tools.skills.docker')} percentage={75} />
            <SkillMeter name={t('skills.categories.tools.skills.git')} percentage={90} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;