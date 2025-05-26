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
          </div>
          <div className="contact-buttons">
            <a href="mailto:Eslim.amr@gmail.com" className="cta-button">{t('contact.buttons.email')}</a>
            <a href="https://www.linkedin.com/in/amr-eslim" target="_blank" rel="noopener noreferrer" className="cta-button">{t('contact.buttons.linkedin')}</a>
          </div>
          
          {/* <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="cta-button">Send Message</button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;