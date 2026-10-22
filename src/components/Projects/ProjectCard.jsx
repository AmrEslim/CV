import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './ProjectCard.css';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';

// Visual fallback for various project types (Exported for Modal)
export const ProjectVisual = ({ type, images }) => {
  if (images && images.length > 0) {
    return <ImageCarousel images={images} />;
  }
  return <div className="project-visual-placeholder"></div>;
};

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const status = project.status || 'active';

  return (
    <>
      <div className={`project-card-process${project.featured ? ' featured' : ''}`}>
        {project.images?.[0] && (
          <button
            type="button"
            className="process-thumb"
            onClick={openModal}
            aria-label={`${t('ui.buttons.details')}: ${project.title}`}
          >
            <img src={project.images[0]} alt="" loading="lazy" decoding="async" />
          </button>
        )}

        <div className="process-body">
          {project.subtitle && <p className="process-kicker">{project.subtitle}</p>}
          {status !== 'active' && (
            <span className={`status-badge status-${status}`}>{t(`projects.status.${status}`)}</span>
          )}
          <h3 className="process-title">{project.title}</h3>
          <p className="process-desc">{project.description}</p>

          <div className="tech-stack">
            {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div className="process-actions">
            <button onClick={openModal} className="action-btn">
              {t('ui.buttons.details')}
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                {t('ui.buttons.source')} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={project}
      />
    </>
  );
};

export default ProjectCard;
