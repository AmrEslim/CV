import React, { useEffect } from 'react';
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
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SystemMonitor from './components/SystemMonitor/SystemMonitor';
import Terminal from './components/Terminal/Terminal';
import { LanguageProvider } from './context/LanguageContext';
import usePerformanceOptimization from './hooks/usePerformanceOptimization';
import './App.css';

function App() {
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

    // Validate elements exist before observing
    setTimeout(() => {
      const elements = document.querySelectorAll('.timeline-item, .language-item, .interest-item');
      if (elements.length > 0) {
        elements.forEach(item => observer.observe(item));
      }
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

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

          {/* System Monitor Widget */}
          <SystemMonitor />

          {/* Global CLI Terminal */}
          <Terminal />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
