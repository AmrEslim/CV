import React, { lazy, Suspense, useEffect } from 'react';
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
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';
import usePerformanceOptimization from './hooks/usePerformanceOptimization';
import './App.css';

const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const PostsSection = lazy(() => import('./components/Posts/PostsSection'));
const PostsPage = lazy(() => import('./components/Posts/PostsPage'));
const PostPage = lazy(() => import('./components/Posts/PostPage'));

const Home = () => (
  <>
    <ErrorBoundary>
      <Hero />
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <PostsSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <About />
    </ErrorBoundary>
    <ErrorBoundary>
      <Experience />
    </ErrorBoundary>
    <ErrorBoundary>
      <Skills />
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
  const { pathname, hash } = useLocation();
  usePerformanceOptimization();

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

    const elements = document.querySelectorAll('.timeline-item, .language-item, .interest-item, .chip');
    if (elements.length > 0) {
      elements.forEach(item => observer.observe(item));
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div className="App">
      <ErrorBoundary>
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
