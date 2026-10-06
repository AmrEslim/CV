import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
const PostsSection = lazy(() => import('./components/Posts/PostsSection'));
const PostsPage = lazy(() => import('./components/Posts/PostsPage'));
const PostPage = lazy(() => import('./components/Posts/PostPage'));

const BOOT_KEY = 'booted';

const Home = () => (
  <>
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
      <Suspense fallback={null}>
        <PostsSection />
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
  </>
);

function Shell() {
  // Skip the boot animation for repeat visits within the same session.
  const [booted, setBooted] = useState(() => sessionStorage.getItem(BOOT_KEY) === '1');
  const { pathname, hash } = useLocation();
  // Initialize performance optimizations
  usePerformanceOptimization();

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

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
    let timer;
    if (booted) {
      timer = setTimeout(() => {
        const elements = document.querySelectorAll('.timeline-item, .language-item, .interest-item, .chip');
        if (elements.length > 0) {
          elements.forEach(item => observer.observe(item));
        }
      }, 500);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [booted, pathname]);

  return (
    <div className="App">
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
        <ErrorBoundary>
          <CustomCursor />
          <CircuitBackground />
          <LanguageSwitcher />
          <Navigation />
        </ErrorBoundary>

        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<ErrorBoundary><PostsPage /></ErrorBoundary>} />
              <Route path="/posts/:slug" element={<ErrorBoundary><PostPage /></ErrorBoundary>} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
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
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Shell />
      </Router>
    </LanguageProvider>
  );
}

export default App;
