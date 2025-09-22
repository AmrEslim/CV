import React, { useState, useRef, useEffect } from 'react';
import './LazyImage.css';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/placeholder.svg',
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Load images 100px before they come into view
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-container ${className}`}
      {...props}
    >
      {/* Placeholder or loading state */}
      {!isLoaded && !hasError && (
        <div className="lazy-image-placeholder">
          <div className="lazy-image-spinner"></div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="lazy-image-error">
          <span>📷</span>
          <p>Image failed to load</p>
        </div>
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy" // Native browser lazy loading as fallback
        />
      )}
    </div>
  );
};

export default LazyImage;