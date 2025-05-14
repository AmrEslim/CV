import React, { useEffect, useRef } from 'react';
import TimelineItem from './TimelineItem';
import './Experience.css';

const Experience = () => {
  const timelineItemsRef = useRef([]);

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

    const elements = timelineItemsRef.current;
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

  const experienceData = [
    {
      id: 1,
      date: "04/2021 – 04/2025",
      title: "Bachelor's Degree in Computer Engineering",
      description: "HTW Berlin (Hochschule für Technik und Wirtschaft)",
      details: "Focus areas: Computer Science, Hardware, Networks, Computer-controlled devices and systems",
      side: "left"
    },
    {
      id: 2,
      date: "05/2022 – Present",
      title: "Working Student (Software Development)",
      description: "Fraunhofer IPK, Berlin",
      details: "Working with Embedded Systems with Linux, developing web-based applications and dashboards, implementing backend functionalities, and supporting the conception and implementation of digital assistance systems.",
      side: "right"
    },
    {
      id: 3,
      date: "12/2019 – 12/2023",
      title: "Volunteer",
      description: "Medibüro, Berlin",
      details: "Medical liaison for people without residence status and health insurance through qualified medical professionals. Regular processing of incoming mail.",
      side: "left"
    },
    {
      id: 4,
      date: "02/2020",
      title: "Hackathon: Future of Education",
      description: "N3XTCODER GmbH",
      details: "Worked with a team on the on-boarding process for a mentoring app for teenagers who identify as LGBTQIA. Our goal was to ensure a smooth process. We presented our results to the audience.",
      side: "right"
    },
    {
      id: 5,
      date: "09/2018 – 06/2019",
      title: "Preparatory Year for Medical Faculty",
      description: "Damascus University, Syria",
      details: "Studies in Anatomy, Biochemistry, General Medicine, and Neurology",
      side: "left"
    },
    {
      id: 6,
      date: "10/2015 – 06/2018",
      title: "High School",
      description: "Shakib Arslan School, Syria",
      details: "Focus on Physics, Math, Chemistry, Biology, English, Arabic, and French",
      side: "right"
    }
  ];

  return (
    <section id="experience" className="scene">
      <div className="content-container">
        <h2 className="section-title">EDUCATION & EXPERIENCE</h2>
        <div className="timeline">
          {experienceData.map((item, index) => (
            <TimelineItem
              key={item.id}
              date={item.date}
              title={item.title}
              description={item.description}
              details={item.details}
              side={item.side}
              ref={el => timelineItemsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;