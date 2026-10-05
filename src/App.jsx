import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Languages from './components/Languages/Languages';
import Interests from './components/Interests/Interests';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import CircuitBackground from './components/CircuitBackground/CircuitBackground';
import CustomCursor from './components/CustomCursor/CustomCursor';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import BootSequence from './components/BootSequence/BootSequence';
import { LanguageProvider } from './context/LanguageContext';
import usePerformanceOptimization from './hooks/usePerformanceOptimization';
import './App.css';

const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const SystemMonitor = lazy(() => import('./components/SystemMonitor/SystemMonitor'));
const Terminal = lazy(() => import('./components/Terminal/Terminal'));

function App() {
  const [booted, setBooted] = useState(false);
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

    // Validate elements exist before observing (wait for boot)
    if (booted) {
      setTimeout(() => {
        const elements = document.querySelectorAll('.timeline-item, .language-item, .interest-item, .chip');
        if (elements.length > 0) {
          elements.forEach(item => observer.observe(item));
        }
      }, 500);
    }

    return () => {
      observer.disconnect();
    };
  }, [booted]);

  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="App">
          {!booted && <BootSequence onComplete={() => setBooted(true)} />}

          <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
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
                <Suspense fallback={null}>
                  <Projects />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary>
                <Languages />
              </ErrorBoundary>
              <ErrorBoundary>
                <Interests />
              </ErrorBoundary>
              <ErrorBoundary>
                <Suspense fallback={null}>
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            </main>

            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>

            <Suspense fallback={null}>
              <SystemMonitor />
              <Terminal />
            </Suspense>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
