import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const Interests = () => {
  const { t } = useTranslation();

  return (
    <section id="interests" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('interests.title')}</h2>
        <ul className="tag-list">
          {t('interests.items').map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Interests;