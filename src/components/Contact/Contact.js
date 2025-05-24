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
            <span className="contact-label">{t('contact.info.email')}</span>
            <a href="mailto:Eslim.amr@gmail.com">Eslim.amr@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">{t('contact.info.linkedin')}</span>
            <a href="https://www.linkedin.com/in/amr-eslim" target="_blank" rel="noopener noreferrer">
              www.linkedin.com/in/amr-eslim
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">{t('contact.info.location')}</span>
            <span>{t('contact.info.locationValue')}</span>
          </div>
        </div>
        
        <div className="contact-container">
          <div className="contact-robot">
            <div style={{ width: '80px', height: '120px', position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '10px', position: 'absolute', top: '0', left: '20px', animation: 'float 3s infinite alternate' }}></div>
              <div style={{ width: '60px', height: '40px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '5px', position: 'absolute', top: '40px', left: '10px', animation: 'float 3s infinite alternate', animationDelay: '0.5s' }}></div>
              <div style={{ width: '15px', height: '30px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', position: 'absolute', top: '50px', left: '0', animation: 'wave 2s infinite' }}></div>
              <div style={{ width: '15px', height: '30px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', position: 'absolute', top: '50px', right: '0', animation: 'wave 2s infinite', animationDelay: '1s' }}></div>
            </div>
          </div>
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