import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-content">
          {t('about.content').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;