import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('SYSTEM_INIT...');
  const [bootSequence, setBootSequence] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const loadingSteps = [
    'SYSTEM_INIT...',
    'BOOTLOADER_v2.1.3',
    'MCU_CALIBRATION',
    'GPIO_INITIALIZATION',
    'I2C_BUS_SCAN',
    'SPI_INTERFACE_TEST',
    'UART_COMM_READY',
    'SENSOR_ARRAY_ONLINE',
    'AI_MODULE_LOADED',
    'SYSTEM_READY'
  ];

  const bootCommands = [
    '> Checking hardware integrity...',
    '> Loading firmware v3.2.1...',
    '> Initializing GPIO pins [0x00-0xFF]',
    '> Starting I2C communication protocol',
    '> Calibrating ADC channels',
    '> Loading neural network weights',
    '> Establishing wireless connectivity',
    '> System diagnostics complete'  ];

  useEffect(() => {
    let progressInterval;
    let textIndex = 0;
    let commandIndex = 0;

    const updateProgress = () => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 12 + 3;
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        if (stepIndex !== textIndex && stepIndex < loadingSteps.length) {
          textIndex = stepIndex;
          setLoadingText(loadingSteps[stepIndex]);
          
          // Add boot command to sequence
          if (commandIndex < bootCommands.length) {
            setBootSequence(prev => [...prev, bootCommands[commandIndex]]);
            setCurrentCommand(bootCommands[commandIndex]);
            commandIndex++;
          }
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setLoadingText('BOOT_COMPLETE');
          setCurrentCommand('> System ready - Click to enter dashboard');
          setIsBootComplete(true);
          return 100;
        }
        return newProgress;
      });
    };

    // Auto-start the boot sequence
    progressInterval = setInterval(updateProgress, 300);

    return () => clearInterval(progressInterval);
  }, [loadingSteps, bootCommands]);  const handleEnterDashboard = () => {
    if (isTransitioning) return; // Prevent multiple clicks
    
    setIsTransitioning(true);
    setCurrentCommand('> Launching embedded dashboard interface...');
    
    // Add transition animations sequence
    setTimeout(() => {
      setCurrentCommand('> Establishing secure connection...');
    }, 500);
    
    setTimeout(() => {
      setCurrentCommand('> Loading user interface modules...');
    }, 1000);
    
    setTimeout(() => {
      setCurrentCommand('> Interface ready - Welcome!');
    }, 1500);
    
    setTimeout(() => {
      onLoadingComplete();
    }, 2500);
  };

  return (
    <div className={`loading-page ${isTransitioning ? 'transitioning' : ''} ${isBootComplete ? 'boot-complete' : ''}`}>
      <div className={`loading-container ${isTransitioning ? 'transitioning' : ''}`}>
        {/* Microcontroller Board */}
        <div className="mcu-board">
          <div className={`board-outline ${isTransitioning ? 'transitioning' : ''}`}>
            {/* MCU Chip */}
            <div className="mcu-chip">
              <div className="chip-label">STM32F4</div>
              <div className="chip-pins">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className={`pin pin-${i + 1}`}></div>
                ))}
              </div>
            </div>

            {/* Status LEDs */}
            <div className="status-leds">
              <div className={`led power ${progress > 10 ? 'on' : ''}`}></div>
              <div className={`led status ${progress > 30 ? 'on' : ''}`}></div>
              <div className={`led comm ${progress > 60 ? 'on' : ''}`}></div>
            </div>
            
            {/* Components */}
            <div className="components">
              <div className="capacitor"></div>
              <div className="resistor"></div>
              <div className="crystal"></div>
            </div>
            
            {/* GPIO Pins */}
            <div className="gpio-header">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="gpio-pin"></div>
              ))}
            </div>          </div>
        </div>

        {/* Terminal Output */}
        <div className={`terminal-output ${isTransitioning ? 'transitioning' : ''}`}>
          <div className="terminal-header">
            <span className="terminal-title">EMBEDDED_BOOTLOADER v2.1.3</span>
            <div className="terminal-controls">
              <span className="control minimize"></span>
              <span className="control maximize"></span>
              <span className="control close"></span>
            </div>
          </div>
          <div className="terminal-body">
            {bootSequence.map((command, index) => (
              <div key={index} className="terminal-line">
                {command}
                <span className="status-ok">[OK]</span>
              </div>            ))}

            <div className={`terminal-line current ${isBootComplete ? 'clickable' : ''}`} 
                 onClick={isBootComplete && !isTransitioning ? handleEnterDashboard : undefined}>
              {currentCommand}
              <span className="blinking-cursor"></span>
            </div>
          </div>
        </div>

        {/* Enter Dashboard Button */}
        {isBootComplete && !isTransitioning && (
          <div className="start-button-container">
            <button className="start-button dashboard-button" onClick={handleEnterDashboard}>
              <div className="button-icon">🚀</div>
              <span className="button-text">ENTER DASHBOARD</span>
              <div className="button-underline"></div>
            </button>
          </div>
        )}

        {/* System Status */}
        <div className="system-status">
          <div className="status-item">
            <span className="status-label">CPU:</span>
            <span className="status-value">ARM Cortex-M4</span>
          </div>
          <div className="status-item">
            <span className="status-label">FREQ:</span>
            <span className="status-value">168MHz</span>
          </div>
          <div className="status-item">
            <span className="status-label">RAM:</span>
            <span className="status-value">192KB</span>
          </div>
        </div>

        {/* Progress Bar with Hex Values */}
        <div className="progress-container">
          <div className="progress-header">
            <span className="loading-label">{loadingText}</span>
            <span className="hex-value">0x{Math.floor(progress * 2.55).toString(16).toUpperCase().padStart(2, '0')}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-scanner"></div>
            </div>
          </div>
          <div className="progress-text">{Math.round(progress)}% Complete</div>
        </div>

        {/* Data Stream Visualization */}
        <div className="data-stream">
          <div className="stream-line">
            <span className="data-packet">0xFF</span>
            <span className="data-packet">0x3A</span>
            <span className="data-packet">0xC7</span>
          </div>
        </div>

        {/* Circuit Pattern Background */}
        <div className="circuit-background">
          <div className="circuit-trace trace-1"></div>
          <div className="circuit-trace trace-2"></div>
          <div className="circuit-trace trace-3"></div>
          <div className="circuit-via via-1"></div>
          <div className="circuit-via via-2"></div>
          <div className="circuit-via via-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
