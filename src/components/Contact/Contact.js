import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="scene">
      <div className="content-container">
        <h2 className="section-title">CONTACT</h2>
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:Eslim.amr@gmail.com">Eslim.amr@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">LinkedIn:</span>
            <a href="https://www.linkedin.com/in/amr-eslim" target="_blank" rel="noopener noreferrer">
              www.linkedin.com/in/amr-eslim
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location:</span>
            <span>Berlin, Germany</span>
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
            <p>I'm currently looking for new opportunities in robotics and autonomous systems development. Whether you have a question about robotics, want to collaborate on a project, or just want to say hi, I'll do my best to get back to you!</p>
          </div>
          <div className="contact-buttons">
            <a href="mailto:Eslim.amr@gmail.com" className="cta-button">Email Me</a>
            <a href="https://www.linkedin.com/in/amr-eslim" target="_blank" rel="noopener noreferrer" className="cta-button">LinkedIn</a>
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