import React, { forwardRef, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './ProjectCard.css';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';

// Visual fallback for various project types
export const ProjectVisual = ({ type, images }) => {
  if (images && images.length > 0) {
    return <ImageCarousel images={images} />;
  }
  switch (type) {
    case 'embedded-system':
      return (
        <div className="project-robot">
          {/* ESP32/Arduino visualization */}
        </div>
      );
    case 'web-dashboard':
      return (
        <div className="project-robot">
          {/* Dashboard visualization */}
        </div>
      );
    case 'mentoring-app':
      return (
        <div className="project-robot">
          {/* App visualization */}
        </div>
      );
    case 'iot-system':
      return (
        <div className="project-robot">
          {/* IoT sensor network visualization */}
        </div>
      );
    case 'robotic-arm':
      return (
        <div className="project-robot">
          {/* Robotic arm visualization */}
        </div>
      );
    case 'backend-system':
      return (
        <div className="project-robot">
          {/* Backend system visualization */}
        </div>
      );
    default:
      return <div className="project-robot"></div>;
  }
};

// Main card component
const ProjectCard = forwardRef(({ project }, ref) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (e) => {
    // Prevent opening modal when clicking on links
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      return;
    }
    openModal(e);
  };

  const handleGithubClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="robot-project" 
      ref={ref}
      onClick={handleCardClick}
    >
      <div className="project-header">
        <div className="project-image">
          <ProjectVisual type={project.visualType} images={project.images} />
          <div className="project-overlay">
            <span className="click-hint">Click to view details</span>
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <div className="project-details">
          <h3 className="project-title">{project.title}</h3>
          {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
          
          {/* Technology badges */}
          {project.technologies && (
            <div className="tech-badges">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="tech-badge">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="tech-badge more-tech">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="project-actions">
          <button onClick={openModal} className="project-link primary">
            {t('ui.buttons.details')}
          </button>
          {project.demoLink && (
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link secondary"
              onClick={handleGithubClick}
            >
              {t('ui.buttons.demo')}
            </a>
          )}
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
