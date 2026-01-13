import React, { forwardRef, useState } from 'react';
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

  // Generate fake PID and Memory stats for the "Process" look
  const pid = 1000 + project.id * 42;
  const mem = 40 + project.id * 12;

  return (
    <>
      <div className="project-card-process" ref={ref}>
        <div className="process-header">
          <span className="pid-info">PID: <span className="pid-number">{pid}</span></span>
          <span className="status-badge">RUNNING</span>
        </div>

        <div className="process-body">
          <h3 className="process-title">{project.title}</h3>

          <div className="process-stats">
            <div className="stat-item">
              <span>MEM:</span>
              <span className="stat-val text-amber">{mem}MB</span>
            </div>
            <div className="stat-item">
              <span>CPU:</span>
              <span className="stat-val text-cyan">{(Math.random() * 5).toFixed(1)}%</span>
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
            {project.demoLink && (
              <a
                href={project.demoLink}
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
        VisualComponent={ProjectVisual} // Pass explicitly if needed, but the import works
      />
    </>
  );
});

export default ProjectCard;
