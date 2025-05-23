import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ProjectVisual } from './ProjectCard';
import './Modal.css';

const Modal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Handle ESC key
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Handle click outside
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Use React Portal to render the modal outside of the component hierarchy
  // This ensures it appears on top of everything, regardless of where the component is mounted
  return createPortal(
    <div 
      className={`modal-backdrop ${isOpen ? 'visible' : ''}`}
      ref={modalRef}
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
        </div>

        <div className="modal-body">
          <div className="project-visual">
            {project.images && project.images.length > 0 ? (
              <ProjectVisual type={project.visualType} images={project.images} />
            ) : (
              <ProjectVisual type={project.visualType} />
            )}
          </div>
          
          <p className="modal-description">{project.description}</p>
          
          <div className="modal-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="modal-tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body // Mount the modal directly to the document body
  );
};

export default Modal;