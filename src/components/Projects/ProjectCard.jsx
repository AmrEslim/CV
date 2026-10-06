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

// Deterministic per-slug value so the fake stats don't change on re-render.
const hashOf = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

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

  const hash = hashOf(project.slug);
  const pid = 1000 + (hash % 9000);
  const mem = 40 + (hash % 90);
  const cpu = ((hash >> 3) % 50) / 10;
  const status = project.status || 'active';

  return (
    <>
      <div className={`project-card-process${project.featured ? ' featured' : ''}`}>
        <div className="process-header">
          <span className="pid-info">PID: <span className="pid-number">{pid}</span></span>
          <span className={`status-badge status-${status}`}>{t(`projects.status.${status}`)}</span>
        </div>

        {project.images?.[0] && (
          <button
            type="button"
            className="process-thumb"
            onClick={openModal}
            aria-label={project.title}
            tabIndex={-1}
          >
            <img src={project.images[0]} alt="" loading="lazy" decoding="async" />
          </button>
        )}

        <div className="process-body">
          <h3 className="process-title">{project.title}</h3>

          <div className="process-stats">
            <div className="stat-item">
              <span>MEM:</span>
              <span className="stat-val text-amber">{mem}MB</span>
            </div>
            <div className="stat-item">
              <span>CPU:</span>
              <span className="stat-val text-cyan">{cpu.toFixed(1)}%</span>
            </div>
            <div className="stat-item">
              <span>USER:</span>
              <span className="stat-val">root</span>
            </div>
          </div>

          <p className="process-desc">
            {project.subtitle || project.description || "Active system process running in background."}
          </p>

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
                ::EXECUTE()
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
