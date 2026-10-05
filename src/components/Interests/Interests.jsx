import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Interests.css';

const Interests = () => {
  const { t } = useTranslation();

  return (
    <section id="interests" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('interests.title')}</h2>
        <div className="interests-container">
          {t('interests.items').map((interest, index) => (
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