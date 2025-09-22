import { useEffect } from 'react';

const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/profile.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = process.env.PUBLIC_URL + src;
      document.head.appendChild(link);
    });

    // Optimize font loading
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preconnect';
    fontPreload.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontPreload);

    const fontPreload2 = document.createElement('link');
    fontPreload2.rel = 'preconnect';
    fontPreload2.href = 'https://fonts.gstatic.com';
    fontPreload2.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload2);

    // Memory cleanup
    return () => {
      // Remove preload links on component unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => {
        if (criticalImages.some(src => link.href.includes(src))) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    // Report Web Vitals if available
    if (window.gtag && 'requestIdleCallback' in window) {
      const reportWebVitals = (metric) => {
        window.gtag('event', 'web_vital', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      };

      // Simple performance observation without external dependencies
      if ('PerformanceObserver' in window) {
        try {
          // Observe Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            reportWebVitals({ name: 'LCP', value: lastEntry.startTime });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Observe First Input Delay
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
              reportWebVitals({ name: 'FID', value: entry.processingStart - entry.startTime });
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.log('Performance observation not available:', error);
        }
      }
    }
  }, []);
};

export default usePerformanceOptimization;