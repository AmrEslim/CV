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
          {/* ... same robot visualization ... */}
        </div>
      );
    case 'web-dashboard':
      return (
        <div className="project-robot">
          {/* ... same dashboard visualization ... */}
        </div>
      );
    case 'mentoring-app':
      return (
        <div className="project-robot">
          {/* ... same app visualization ... */}
        </div>
      );
    case 'backend-system':
      return (
        <div className="project-robot">
          {/* ... same backend visualization ... */}
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

  return (
    <div className="robot-project" ref={ref}>
      <div className="project-image">
        <ProjectVisual type={project.visualType} images={project.images} />
      </div>
      <div className="project-details">
        <h3 className="project-title">{project.title}</h3>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        <div className="project-links">
          <button onClick={openModal} className="project-link">{t('ui.buttons.details')}</button>
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
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
