import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
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
      title: "Bio-Inspired Snake Robot",
      description: "Developed a modular snake-like robot as a Bachelor's thesis utilizing CPG-based control algorithms, capable of both lateral undulation and sidewinding locomotion patterns. Features ESP32-based wireless control, real-time parameter adjustment, and power consumption monitoring.",
      technologies: ["C++", "Arduino", "ESP32", "3D Printing", "Robotics"],
      visualType: "embedded-system",
      imageUrl: "https://raw.githubusercontent.com/AmrEslim/snake_robot/main/docs/media/testing.png",
      demoLink: "https://github.com/AmrEslim/snake_robot"
    },
    {
      id: 2,
      title: "Digital Assistance System",
      description: "Developed at Fraunhofer IPK, this system uses embedded Linux to provide real-time assistance and monitoring for industrial applications.",
      technologies: ["Linux", "C++", "Python", "Web Development"],
      visualType: "embedded-system"
    },
    {
      id: 3,
      title: "Web-Based Dashboard Application",
      description: "Created interactive web dashboards for monitoring and controlling embedded systems, with real-time data visualization and user-friendly interfaces.",
      technologies: ["Flask", "React.js", "JavaScript", "HTML/CSS"],
      visualType: "web-dashboard"
    },
    {
      id: 4,
      title: "LGBTQIA+ Mentoring App",
      description: "Hackathon project focused on creating a smooth onboarding process for a mentoring app designed for LGBTQIA+ teenagers, emphasizing user experience and inclusivity.",
      technologies: ["UX Design", "Frontend Development", "User Testing", "Prototyping"],
      visualType: "mentoring-app"
    },
    {
      id: 5,
      title: "Backend System Architecture",
      description: "Designed and implemented backend functionalities for embedded systems applications, focusing on performance, reliability, and seamless integration with frontend interfaces.",
      technologies: ["Python", "SQL", "API Design", "System Architecture"],
      visualType: "backend-system"
    }
  ];

  return (
    <section id="projects" className="scene">
      <div className="content-container">
        <h2 className="section-title">PROJECTS</h2>
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