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
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <LoadingPage onLoadingComplete={handleLoadingComplete} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <CustomCursor />
          <CircuitBackground />
          <LanguageSwitcher />        
          <Navigation onMenuOpenChange={(isOpen) => setMenuOpen(isOpen)} />
        
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Languages />
            <Interests />
            <Contact />
          </main>
        
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
