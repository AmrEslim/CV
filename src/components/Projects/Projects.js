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
      ...t('projects.dashboard'),
      technologies: ["React", "Flask", "Bootstrap", "HTML/CSS", "JavaScript"],
      visualType: "web-dashboard",
      images: [process.env.PUBLIC_URL + '/images/dashboard.jpg'],
      demoLink: "https://github.com/AmrEslim/"
    },
    {
      id: 3,
      ...t('projects.mentoring'),
      technologies: ["Figma", "UX Design", "React", "Prototyping", "Accessibility"],
      visualType: "mentoring-app",
      images: [process.env.PUBLIC_URL + '/images/mentoring-app.jpg'],
      demoLink: "https://github.com/AmrEslim/"
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