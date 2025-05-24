import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Languages.css';

const LanguageItem = ({ language, proficiency, percentage }) => {
  const itemRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          itemRef.current.classList.add('visible');
          
          if (progressRef.current) {
            setTimeout(() => {
              progressRef.current.style.width = `${percentage}%`;
            }, 300);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentItemRef = itemRef.current;
    if (currentItemRef) {
      observer.observe(currentItemRef);
    }

    return () => {
      if (currentItemRef) {
        observer.unobserve(currentItemRef);
      }
    };
  }, [percentage]);

  return (
    <div className="language-item" ref={itemRef}>
      <h3 className="language-name">{language}</h3>
      <p>{proficiency}</p>
      <div className="skill-meter">
        <div 
          className="skill-progress" 
          ref={progressRef} 
          data-width={percentage}
          style={{ width: '0%' }}
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

const Languages = () => {
  const { t } = useTranslation();

  return (
    <section id="languages" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('languages.title')}</h2>
        <div className="languages-container">
          {t('languages.items').map(item => (
            <LanguageItem
              key={item.id}
              language={item.language}
              proficiency={item.proficiency}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;