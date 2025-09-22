import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Languages from './components/Languages/Languages';
import Interests from './components/Interests/Interests';
import Contact from './components/Contact/Contact';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';  
import CircuitBackground from './components/CircuitBackground/CircuitBackground';
import CustomCursor from './components/CustomCursor/CustomCursor';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import LoadingPage from './components/LoadingPage/LoadingPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';
import usePerformanceOptimization from './hooks/usePerformanceOptimization';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize performance optimizations
  usePerformanceOptimization();

  useEffect(() => {
    // Initialize intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // For progress bars and skill meters
          if (entry.target.classList.contains('language-item') || entry.target.classList.contains('chip')) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(progressBar => {
              const width = progressBar.getAttribute('data-width') + '%';
              setTimeout(() => {
                progressBar.style.width = width;
              }, 300);
            });
          }
        }
      });
    }, observerOptions);
    
    // Observe elements only after loading is complete
    if (!isLoading) {
      document.querySelectorAll('.timeline-item, .language-item, .interest-item').forEach(item => {
        observer.observe(item);
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading page while loading
  if (isLoading) {
    return (
      <LanguageProvider>
        <ErrorBoundary>
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </ErrorBoundary>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <ErrorBoundary>
            <CustomCursor />
            <CircuitBackground />
            <LanguageSwitcher />        
            <Navigation />
          </ErrorBoundary>
        
          <main>
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Experience />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Languages />
            </ErrorBoundary>
            <ErrorBoundary>
              <Interests />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </main>
        
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
