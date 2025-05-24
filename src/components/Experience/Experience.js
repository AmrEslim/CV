import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import TimelineItem from './TimelineItem';
import './Experience.css';

const Experience = () => {
  const { t } = useTranslation();
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = timelineItemsRef.current;
    if (elements) {
      elements.forEach(ref => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (elements) {
        elements.forEach(ref => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="experience" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <div className="timeline">
          {t('experience.items').map((item, index) => (
            <TimelineItem
              key={item.id}
              date={item.date}
              title={item.title}
              description={item.description}
              details={item.details}
              side={item.side}
              ref={el => timelineItemsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;