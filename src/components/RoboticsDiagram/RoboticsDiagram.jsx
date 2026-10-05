import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './RoboticsDiagram.css';

const RoboticsDiagram = () => {
  const { t } = useTranslation();
  const [activeConnection, setActiveConnection] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const robotRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Setup tooltips and connections
    const robotParts = document.querySelectorAll('.robot-part');
    robotParts.forEach(part => {
      part.addEventListener('mouseenter', handlePartHover);
      part.addEventListener('mouseleave', handlePartLeave);
    });

    return () => {
      robotParts.forEach(part => {
        part.removeEventListener('mouseenter', handlePartHover);
        part.removeEventListener('mouseleave', handlePartLeave);
      });
    };
  }, []);

  const handlePartHover = (e) => {
    // Highlight connected traces
    const partClass = e.target.classList[1]; // e.g., "cpu", "sensors"
    if (partClass) {
      setActiveConnection(partClass);
    }
  };

  const handlePartLeave = () => {
    setActiveConnection(null);
  };

  const startSimulation = () => {
    if (!simulationRunning) {
      setSimulationRunning(true);
      moveRobot();
    }
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    if (robotRef.current) {
      robotRef.current.style.left = '20px';
    }
  };

  const moveRobot = () => {
    // ... existing moveRobot implementation ...
  };

  const systemInfo = t('roboticsDiagram.systemInfo');

  return (
    <section id="robotics-diagram" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('roboticsDiagram.title')}</h2>
        <p>{t('roboticsDiagram.description')}</p>

        <div className="system-info">
          {systemInfo.map((item, index) => (
            <div key={index} className="info-item">
              <span className="info-label">{item.label}:</span>
              <span className="info-value">{item.value}</span>
            </div>
          ))}
        </div>
        
        <div className="robot-diagram-container">
          <div className="robot-diagram">
            <div className="robot-part cpu">
              <p>{t('roboticsDiagram.components.cpu.title')}</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '30%', left: '60%' }}>
              <h4>{t('roboticsDiagram.components.cpu.title')}</h4>
              <p>{t('roboticsDiagram.components.cpu.description')}</p>
            </div>
            
            <div className="robot-part sensors">
              <p>{t('roboticsDiagram.components.sensors.title')}</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '15%', left: '30%' }}>
              <h4>{t('roboticsDiagram.components.sensors.title')}</h4>
              <p>{t('roboticsDiagram.components.sensors.description')}</p>
            </div>
            
            <div className="robot-part communication">
              <p>{t('roboticsDiagram.components.communication.title')}</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '15%', right: '30%' }}>
              <h4>{t('roboticsDiagram.components.communication.title')}</h4>
              <p>{t('roboticsDiagram.components.communication.description')}</p>
            </div>
            
            <div className="robot-part motor-controller">
              <p>{t('roboticsDiagram.components.output.title')}</p>
            </div>
            <div className="robot-part-tooltip" style={{ bottom: '25%', left: '30%' }}>
              <h4>{t('roboticsDiagram.components.output.title')}</h4>
              <p>{t('roboticsDiagram.components.output.description')}</p>
            </div>
            
            <div className="robot-part power">
              <p>{t('roboticsDiagram.components.power.title')}</p>
            </div>
            <div className="robot-part-tooltip" style={{ bottom: '25%', right: '30%' }}>
              <h4>{t('roboticsDiagram.components.power.title')}</h4>
              <p>{t('roboticsDiagram.components.power.description')}</p>
            </div>
          </div>

          <div className="simulation-path" ref={pathRef}></div>
          <div className="simulation-control">
            <div className="control-btn" onClick={startSimulation}>▶</div>
            <div className="control-btn" onClick={resetSimulation}>↺</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoboticsDiagram;