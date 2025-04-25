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

    projectsRef.current.forEach(project => {
      if (project) {
        observer.observe(project);
      }
    });

    return () => {
      projectsRef.current.forEach(project => {
        if (project) {
          observer.unobserve(project);
        }
      });
    };
  }, []);

  const projectsData = [
    {
      id: 1,
      title: "Digital Assistance System",
      description: "Developed at Fraunhofer IPK, this system uses embedded Linux to provide real-time assistance and monitoring for industrial applications.",
      technologies: ["Linux", "C++", "Python", "Web Development"],
      visualType: "embedded-system"
    },
    {
      id: 2,
      title: "Web-Based Dashboard Application",
      description: "Created interactive web dashboards for monitoring and controlling embedded systems, with real-time data visualization and user-friendly interfaces.",
      technologies: ["Flask", "React.js", "JavaScript", "HTML/CSS"],
      visualType: "web-dashboard"
    },
    {
      id: 3,
      title: "LGBTQIA+ Mentoring App",
      description: "Hackathon project focused on creating a smooth onboarding process for a mentoring app designed for LGBTQIA+ teenagers, emphasizing user experience and inclusivity.",
      technologies: ["UX Design", "Frontend Development", "User Testing", "Prototyping"],
      visualType: "mentoring-app"
    },
    {
      id: 4,
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