import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('contact.title')}</h2>
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">{t('contact.info.location')}</span>
            <span>{t('contact.info.locationValue')}</span>
          </div>
        </div>
        
        <div className="contact-container">
          <div className="contact-text">
            <p>{t('contact.text')}</p>
            <p>Feel free to reach out directly through email or connect with me on LinkedIn!</p>
          </div>
          
          <div className="contact-buttons">
            <a 
              href="mailto:Eslim.amr@gmail.com" 
              className="cta-button email-button"
              aria-describedby="email-description"
            >
              📧 {t('contact.buttons.email')}
            </a>
            <span id="email-description" className="sr-only">
              Opens your email client to send a message to Amr Eslim
            </span>
            
            <a 
              href="https://www.linkedin.com/in/amr-eslim" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button linkedin-button"
              aria-describedby="linkedin-description"
            >
              💼 {t('contact.buttons.linkedin')}
            </a>
            <span id="linkedin-description" className="sr-only">
              Opens LinkedIn profile in a new tab
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;