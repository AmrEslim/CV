import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="scene">
      <div className="content-container">
        <h2 className="section-title">ABOUT ME</h2>
        <div className="about-content">
          <p>Hello! I'm Amr Eslim, a Computer Engineering graduate based in Berlin, Germany.</p>
          <p>I recently completed my Bachelor's degree in Computer Engineering at HTW Berlin (April 2025) with a focus on embedded systems.</p>
          <p>My expertise lies in embedded systems with Linux, software development, and web application development.</p>
          <p>I have hands-on experience as a software development working student at Fraunhofer IPK since May 2022.</p>
          <p>With a strong background in C/C++, Python, and embedded systems, I build reliable and efficient solutions.</p>
          <p>I'm particularly interested in developing robotics systems that can seamlessly integrate with digital assistance systems.</p>
          <p>Let's build the future of robotics and embedded systems together!</p>
        </div>
      </div>
    </section>
  );
};

export default About;