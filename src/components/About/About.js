import React from 'react';
import Terminal from '../Terminal/Terminal';
import './About.css';

const About = () => {
  const terminalLines = [
    "> Hello! I'm Amr Eslim, a Computer Engineering graduate based in Berlin, Germany.",
    "> I recently completed my Bachelor's degree in Computer Engineering at HTW Berlin (April 2025) with a focus on embedded systems.",
    "> My expertise lies in embedded systems with Linux, software development, and web application development.",
    "> I have hands-on experience as a software development working student at Fraunhofer IPK since May 2022.",
    "> With a strong background in C/C++, Python, and embedded systems, I build reliable and efficient solutions.",
    "> I'm particularly interested in developing robotics systems that can seamlessly integrate with digital assistance systems.",
    "> Let's build the future of robotics and embedded systems together!"
  ];

  return (
    <section id="about" className="scene">
      <div className="content-container">
        <h2 className="section-title">ABOUT ME</h2>
        <Terminal lines={terminalLines} typingAnimation={true} />
      </div>
    </section>
  );
};

export default About;