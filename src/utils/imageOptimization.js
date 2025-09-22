// Utility functions for image optimization

export const generateImageSrcSet = (basePath, sizes = [480, 768, 1024, 1200]) => {
  const extension = basePath.split('.').pop();
  const baseName = basePath.replace(`.${extension}`, '');
  
  // Generate srcSet for different sizes
  // In a real implementation, you would have pre-generated these sizes
  const srcSet = sizes
    .map(size => `${baseName}-${size}w.${extension} ${size}w`)
    .join(', ');
  
  return {
    srcSet: srcSet,
    sizes: '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1200px'
  };
};

export const getOptimizedImageProps = (src, alt, sizes) => {
  // For now, we'll use the original images but with proper loading attributes
  // In production, you would implement actual image compression/optimization
  return {
    src: src,
    alt: alt,
    loading: 'lazy',
    decoding: 'async',
    // In future implementations:
    // ...generateImageSrcSet(src, sizes)
  };
};

export const preloadCriticalImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.onload = () => console.log(`Preloaded: ${url}`);
    link.onerror = () => console.warn(`Failed to preload: ${url}`);
    document.head.appendChild(link);
  });
};

export const createWebPVersion = (imagePath) => {
  // In a real implementation, this would convert images to WebP format
  // For now, we'll just return the original path
  // You would implement server-side image conversion or build-time optimization
  return imagePath;
};

// Performance monitoring for images
export const trackImagePerformance = (imageSrc, loadTime) => {
  if (window.gtag) {
    window.gtag('event', 'image_load_time', {
      event_category: 'Performance',
      event_label: imageSrc,
      value: Math.round(loadTime),
      non_interaction: true,
    });
  }
};

// Lazy loading intersection observer setup
export const createLazyLoadObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

export default {
  generateImageSrcSet,
  getOptimizedImageProps,
  preloadCriticalImages,
  createWebPVersion,
  trackImagePerformance,
  createLazyLoadObserver
};