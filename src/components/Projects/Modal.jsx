import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ProjectVisual } from './ProjectCard';
import './Modal.css';

const Modal = ({ isOpen, onClose, project }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
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

  // Format title for MAN page header: "PROJECT(1)"
  const manTitle = project.title.toUpperCase().replace(/\s+/g, '_');

  return createPortal(
    <div className={`modal-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* MAN PAGE HEADER */}
        <div className="man-header">
          <span>{manTitle}(1)</span>
          <span>User Commands</span>
          <button className="man-close-btn" onClick={onClose}>[q]uit</button>
        </div>

        <div className="man-body">

          {/* NAME */}
          <div className="man-section">
            <div className="man-section-title">NAME</div>
            <div className="man-text">
              {project.title} - {project.subtitle}
            </div>
          </div>

          {/* SYNOPSIS (Visuals) */}
          <div className="man-section">
            <div className="man-section-title">SYNOPSIS</div>
            <div className="man-text" style={{ marginBottom: '20px' }}>
              <ProjectVisual type={project.visualType} images={project.images} />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="man-section">
            <div className="man-section-title">DESCRIPTION</div>
            <div className="man-text">
              {project.description}
            </div>
          </div>

          {/* OPTIONS (Features) */}
          {project.features && (
            <div className="man-section">
              <div className="man-section-title">OPTIONS</div>
              <ul className="man-list">
                {project.features.map((feature, index) => {
                  // Clean up markdown bolding for plain text feel
                  const cleanFeature = feature.replace(/\*\*(.*?)\*\*/g, '$1').replace(/✅/g, '').trim();
                  // Split into flag and desc if possible (heuristic: split by colon)
                  const parts = cleanFeature.split(':');
                  const flag = parts[0] ? `--${parts[0].toLowerCase().replace(/\s+/g, '-')}` : '';
                  const desc = parts.slice(1).join(':') || parts[0];

                  return (
                    <li key={index} className="man-list-item">
                      {parts.length > 1 ? (
                        <>
                          <span className="man-flag">{flag}</span>
                          <span className="man-desc">{desc}</span>
                        </>
                      ) : (
                        <span className="man-desc">{cleanFeature}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* TECH STACK */}
          {project.technologies && (
            <div className="man-section">
              <div className="man-section-title">ENVIRONMENT</div>
              <div className="man-tags">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="man-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* SEE ALSO (Links) */}
          {project.references && (
            <div className="man-section">
              <div className="man-section-title">SEE ALSO</div>
              <ul className="man-list">
                {project.references.map((ref, i) => (
                  <li key={i}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="man-link">
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AUTHOR */}
          <div className="man-section">
            <div className="man-section-title">AUTHOR</div>
            <div className="man-text">Amr Eslim &lt;amreslim@example.com&gt;</div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
