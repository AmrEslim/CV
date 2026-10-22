import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import skillGroups from '../../content/skills.json';
import './Skills.css';

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
              <ul className="skill-list">
                {skills.map(({ key }) => (
                  <li className="skill-name" key={key}>
                    {t(`skills.categories.${category}.skills.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;