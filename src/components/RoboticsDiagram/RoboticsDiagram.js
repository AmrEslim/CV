import React, { useState, useEffect, useRef } from 'react';
import './RoboticsDiagram.css';

const RoboticsDiagram = () => {
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

  const systemInfo = [
    { label: "Operating System", value: "Linux-based embedded system" },
    { label: "Processor", value: "ARM Cortex-A53 @ 1.2GHz" },
    { label: "Memory", value: "1GB LPDDR4" },
    { label: "Storage", value: "16GB eMMC Flash" },
    { label: "Interfaces", value: "3 x USB, 1 x HDMI, GPIO, I2C, SPI" },
    { label: "Network", value: "WiFi 802.11ac, Bluetooth 5.0, Ethernet" }
  ];

  return (
    <section id="robotics-diagram" className="scene">
      <div className="content-container">
        <h2 className="section-title">EMBEDDED SYSTEMS ARCHITECTURE</h2>
        <p>Explore the key components of embedded systems architecture I work with. Click on components to learn more.</p>

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
              <p>Central Processing</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '30%', left: '60%' }}>
              <h4>Main CPU/Controller</h4>
              <p>Handles high-level processing, data management, and system coordination. Typically running Linux with custom software stacks for embedded applications.</p>
            </div>
            
            <div className="robot-part sensors">
              <p>Input Systems</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '15%', left: '30%' }}>
              <h4>Sensor & Input</h4>
              <p>Manages data acquisition from various sensors and input devices. Processes environmental data and user interactions for system response.</p>
            </div>
            
            <div className="robot-part communication">
              <p>Communication</p>
            </div>
            <div className="robot-part-tooltip" style={{ top: '15%', right: '30%' }}>
              <h4>Networking & Comms</h4>
              <p>Handles Wi-Fi, Bluetooth, and other communication protocols. Manages data transfer between components and external systems securely and efficiently.</p>
            </div>
            
            <div className="robot-part motor-controller">
              <p>Output Systems</p>
            </div>
            <div className="robot-part-tooltip" style={{ bottom: '25%', left: '30%' }}>
              <h4>Output & Control</h4>
              <p>Manages system outputs including displays, indicators, and control signals. Implements precise timing mechanisms and feedback control loops.</p>
            </div>
            
            <div className="robot-part power">
              <p>Power Management</p>
            </div>
            <div className="robot-part-tooltip" style={{ bottom: '25%', right: '30%' }}>
              <h4>Power Systems</h4>
              <p>Manages power distribution, battery monitoring, and implements energy-efficient operations for extended system lifespan and reliability.</p>
            </div>
          </div>

          <div className="system-specs">
            {systemSpecs.map((spec, index) => (
              <div key={index} className="spec-item">
                <span className="spec-label">{spec.label}:</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
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