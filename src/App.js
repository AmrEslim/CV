import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import RoboticsDiagram from './components/RoboticsDiagram/RoboticsDiagram';
import Languages from './components/Languages/Languages';
import Interests from './components/Interests/Interests';
import Contact from './components/Contact/Contact';
import Navigation from './components/Navigation/Navigation';
import RobotAssistant from './components/RobotAssistant/RobotAssistant';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Footer from './components/Footer/Footer';
import CircuitBackground from './components/CircuitBackground/CircuitBackground';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './App.css';

function App() {
  const [codeEditorOpen, setCodeEditorOpen] = React.useState(false);

  const toggleCodeEditor = () => {
    setCodeEditorOpen(!codeEditorOpen);
  };

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
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .robot-project, .language-item, .interest-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <CircuitBackground />
        
        <Navigation />
        <RobotAssistant onRobotClick={toggleCodeEditor} />
        <CodeEditor isOpen={codeEditorOpen} onClose={() => setCodeEditorOpen(false)} />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <RoboticsDiagram />
          <Languages />
          <Interests />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
