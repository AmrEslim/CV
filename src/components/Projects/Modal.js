import React, { useEffect } from 'react';
import { ProjectVisual } from './ProjectCard';
import './Modal.css';

const Modal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
        </div>

        <div className="modal-body">
          <div className="project-visual">
            <ProjectVisual type={project.visualType} />
          </div>
          
          <p className="modal-description">{project.description}</p>
          
          <div className="modal-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="modal-tech-tag">{tech}</span>
            ))}
          </div>
          
          <div className="modal-links">
            {project.demoLink && (
              <a 
                href={project.demoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-link"
              >
                View Demo
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-link"
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
