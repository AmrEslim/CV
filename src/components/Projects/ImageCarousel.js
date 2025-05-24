import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`}
        className="carousel-image"
      />
      {images.length > 1 && (
        <>
          <button 
            className="carousel-button prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className="carousel-button next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
