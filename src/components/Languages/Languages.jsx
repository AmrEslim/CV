import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Languages.css';

const Languages = () => {
  const { t } = useTranslation();

  return (
    <section id="languages" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('languages.title')}</h2>
        <ul className="languages-list">
          {t('languages.items').map(({ id, language, proficiency }) => (
            <li key={id}>
              <h3 className="language-name">{language}</h3>
              <p>{proficiency}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Languages;