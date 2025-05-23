import React, { forwardRef, useState } from 'react';
import './ProjectCard.css';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';

export const ProjectVisual = ({ type, images }) => {
  if (images && images.length > 0) {
    return <ImageCarousel images={images} />;
  }

  // Fallback to robot visualizations if no images
  switch (type) {
    case 'embedded-system':
      return (
        <div className="project-robot">
          <div style={{ width: '120px', height: '80px', position: 'relative' }}>
            <div style={{ width: '80px', height: '50px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '5px', position: 'absolute', top: '15px', left: '20px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '50%', position: 'absolute', top: '30px', left: '30px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '50%', position: 'absolute', top: '30px', right: '30px' }}></div>
            <div style={{ width: '30px', height: '8px', background: 'var(--robot-primary)', position: 'absolute', top: '50px', left: '45px' }}></div>
          </div>
        </div>
      );
    case 'web-dashboard':
      return (
        <div className="project-robot">
          <div style={{ width: '120px', height: '80px', position: 'relative' }}>
            <div style={{ width: '90px', height: '60px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '5px', position: 'absolute', top: '10px', left: '15px' }}></div>
            <div style={{ width: '80px', height: '10px', background: 'var(--robot-primary)', position: 'absolute', top: '20px', left: '20px' }}></div>
            <div style={{ width: '40px', height: '5px', background: 'var(--robot-primary)', position: 'absolute', top: '35px', left: '20px' }}></div>
            <div style={{ width: '40px', height: '5px', background: 'var(--robot-primary)', position: 'absolute', top: '45px', left: '20px' }}></div>
            <div style={{ width: '25px', height: '25px', background: 'var(--robot-primary)', borderRadius: '50%', position: 'absolute', top: '32px', right: '25px' }}></div>
          </div>
        </div>
      );
    case 'mentoring-app':
      return (
        <div className="project-robot">
          <div style={{ width: '120px', height: '80px', position: 'relative' }}>
            <div style={{ width: '40px', height: '70px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '10px', position: 'absolute', top: '5px', left: '40px' }}></div>
            <div style={{ width: '30px', height: '5px', background: 'var(--robot-primary)', position: 'absolute', top: '15px', left: '45px' }}></div>
            <div style={{ width: '30px', height: '5px', background: 'var(--robot-primary)', position: 'absolute', top: '25px', left: '45px' }}></div>
            <div style={{ width: '30px', height: '30px', background: 'var(--robot-primary)', borderRadius: '50%', position: 'absolute', top: '35px', left: '45px' }}></div>
          </div>
        </div>
      );
    case 'backend-system':
      return (
        <div className="project-robot">
          <div style={{ width: '120px', height: '80px', position: 'relative' }}>
            <div style={{ width: '80px', height: '60px', background: 'var(--chip-color)', border: '2px solid var(--robot-primary)', borderRadius: '5px', position: 'absolute', top: '10px', left: '20px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '3px', position: 'absolute', top: '20px', left: '30px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '3px', position: 'absolute', top: '20px', right: '30px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '3px', position: 'absolute', bottom: '20px', left: '30px' }}></div>
            <div style={{ width: '15px', height: '15px', background: 'var(--robot-primary)', borderRadius: '3px', position: 'absolute', bottom: '20px', right: '30px' }}></div>
            <div style={{ width: '20px', height: '1px', background: 'var(--robot-primary)', position: 'absolute', top: '28px', left: '40px' }}></div>
            <div style={{ width: '1px', height: '20px', background: 'var(--robot-primary)', position: 'absolute', top: '30px', left: '60px' }}></div>
            <div style={{ width: '20px', height: '1px', background: 'var(--robot-primary)', position: 'absolute', bottom: '28px', left: '40px' }}></div>
          </div>
        </div>
      );
    default:
      return <div className="project-robot"></div>;
  }
};

const ProjectCard = forwardRef(({ project }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="robot-project" ref={ref}>
      <div className="project-image">
        <ProjectVisual type={project.visualType} images={project.images} />
      </div>
      <div className="project-details">
        <h3 className="project-title">{project.title}</h3>
        <div className="project-links">
          <button onClick={openModal} className="project-link">Details</button>
          <a href={project.demoLink || "#"} target="_blank" rel="noopener noreferrer" className="project-link">Demo</a>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={project}
      />
    </div>
  );
});

export default ProjectCard;