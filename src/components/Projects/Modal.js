import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ProjectVisual } from './ProjectCard';
import './Modal.css';

const Modal = ({ isOpen, onClose, project }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`modal-backdrop ${isOpen ? 'visible' : ''}`} ref={modalRef} onClick={onClose}>
      <div className="modal-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          {project.subtitle && <h4 className="modal-subtitle">{project.subtitle}</h4>}
        </div>

        <div className="modal-body">
          <div className="project-visual">
            <ProjectVisual type={project.visualType} images={project.images} />
          </div>

          <p className="modal-description">{project.description}</p>

          {project.features && (
            <ul className="modal-feature-list">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}

          {project.technologies && (
            <div className="modal-tech">
              <h5>Technologies Used:</h5>
              <div className="tech-tags-container">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {project.references && project.references.length > 0 && (
            <div className="modal-references">
              <h5>{t('ui.sections.references')}:</h5>
              <ul>
                {project.references.map((ref, index) => (
                  <li key={index}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
