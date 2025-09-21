import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const projectsRef = useRef([]);

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

    const elements = projectsRef.current;
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
  const projectsData = [
    {
      id: 1,
      ...t('projects.snake_robot'),
      technologies: [
        "ESP32", "C++", "CPG Control Algorithms", "3D Printing (TPU, PLA+)",
        "Arduino Framework", "React", "WebSockets", "Motion Tracking (Kinovea)",
        "ACS712 Current Sensor", "Onshape CAD", "CSV Data Logging"
      ],
      visualType: "embedded-system",
      images: [
        process.env.PUBLIC_URL + '/images/snake-robot1.jpg',
        process.env.PUBLIC_URL + '/images/snake-robot2.jpg'
      ],
      demoLink: "https://github.com/AmrEslim/snake_robot"
    },
    {
      id: 2,
      ...t('projects.cryptify'),
      technologies: ["Rust", "Actix-web", "Ring Cryptography", "SQLite", "React", "TypeScript", "Docker", "AES-256-GCM", "Argon2id"],
      visualType: "security-app",
      images: [process.env.PUBLIC_URL + '/images/Cryptify-logo.png'],
      demoLink: "https://github.com/AmrEslim/Cryptify"
    },
    {
      id: 3,
      ...t('projects.sidequester'),
      technologies: ["ESP32", "Arduino", "LoRa", "GPS", "HMC5883L Compass", "OLED Display", "C++", "TinyGPS++"],
      visualType: "iot-device",
      images: [process.env.PUBLIC_URL + '/images/SideQuester.png'],
      demoLink: "https://github.com/AmrEslim/SideQuester"
    },
    {
      id: 4,
      ...t('projects.cv_portfolio'),
      technologies: ["React", "JavaScript", "HTML/CSS", "GitHub Pages", "Responsive Design", "i18n"],
      visualType: "web-app",
      images: [process.env.PUBLIC_URL + '/images/Portfolio.png'],
      demoLink: "https://github.com/AmrEslim/CV"
    },
    {
      id: 5,
      ...t('projects.opencv_auto'),
      technologies: ["Python", "OpenCV", "Computer Vision", "Object Detection", "Tracking Algorithms"],
      visualType: "computer-vision",
      images: [process.env.PUBLIC_URL + '/images/OpenCV.png'],
      demoLink: "https://github.com/AmrEslim/OpenCV-car"
    }
  ];

  return (
    <section id="projects" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <div className="robotics-projects">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              ref={el => projectsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;