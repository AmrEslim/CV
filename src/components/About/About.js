import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import HexViewer from '../HexViewer/HexViewer';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const [hexMode, setHexMode] = useState(false);

  return (
    <section id="about" className="scene">
      <div className="content-container">
        <div className="section-header-row">
          <h2 className="section-title">{t('about.title')}</h2>
          <button
            className={`hex-toggle ${hexMode ? 'active' : ''}`}
            onClick={() => setHexMode(!hexMode)}
            title="Toggle Memory Dump View"
          >
            {hexMode ? '[ TXT ]' : '[ HEX ]'}
          </button>
        </div>

        <div className="about-content">
          {hexMode ? (
            <HexViewer data={t('about.content')} />
          ) : (
            t('about.content').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default About;