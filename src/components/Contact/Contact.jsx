import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('contact.title')}</h2>

        <div className="contact-container">
          <p className="contact-text">{t('contact.text')}</p>

          <div className="contact-links">
            <a href="mailto:Eslim.amr@gmail.com" className="hero-action hero-action-primary">
              {t('contact.buttons.email')} <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/amr-eslim"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action"
            >
              {t('contact.buttons.linkedin')} <span aria-hidden="true">↗</span>
              <span className="sr-only"> ({t('contact.newTab')})</span>
            </a>
          </div>

          <p className="meta-label">{t('contact.info.locationValue')}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;