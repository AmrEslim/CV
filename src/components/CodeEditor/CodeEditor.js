import React, { useEffect, useState } from 'react';
import './CodeEditor.css';

const CodeEditor = ({ isOpen, onClose }) => {
  const [currentExample, setCurrentExample] = useState(0);
  
  const codeExamples = [
    {
      title: "Robotics Control Interface",
      language: "JavaScript",
      description: "Object-oriented robot control system",
      code: `class RobotController {
  constructor() {
    this.sensors = [];
    this.motors = ['left', 'right'];
    this.battery = 100;
  }

  initializeSensors() {
    this.sensors = [
      { type: 'ultrasonic', position: 'front' },
      { type: 'infrared', position: 'left' },
      { type: 'infrared', position: 'right' },
      { type: 'camera', position: 'front' }
    ];
    return this.sensors;
  }

  move(direction, speed) {
    const validDirections = ['forward', 'backward', 'left', 'right'];
    const validSpeeds = ['slow', 'medium', 'fast'];

    if (!validDirections.includes(direction)) {
      return;
    }

    if (!validSpeeds.includes(speed)) {
      return;
    }
  }
}

const robot = new RobotController();
robot.initializeSensors();
robot.move(direction, speed);`
    },
    {
      title: "SX1262 LoRa Receiver with Debugging",
      language: "C++/Arduino",
      description: "Advanced LoRa module initialization with comprehensive error handling",
      code: `#include <RadioLib.h>
#include <SPI.h>

// Pin Configuration
#define NSS_PIN     15  // Chip Select (CS)
#define DIO1_PIN    4   // Interrupt
#define NRST_PIN    19  // Reset
#define BUSY_PIN    18  // Busy status

SX1262 radio = new Module(NSS_PIN, DIO1_PIN, NRST_PIN, BUSY_PIN);

struct HardwareStatus {
  bool spiReady = false;
  bool moduleDetected = false;
  bool pinStatesValid = false;
  float supplyVoltage = 0.0;
  int resetAttempts = 0;
};

HardwareStatus hwStatus;

void setup() {
  Serial.begin(115200);
  Serial.println("@@SideQuester LoRa Receiver Test");
  Serial.println("==============================");
  
  initializeHardwareDiagnostics();
  
  int result = initializeLoRaModule();
  
  if (result == RADIOLIB_ERR_NONE) {
    Serial.println("✓ SX1262 initialized successfully!");
    setupLoRaParameters();
    startReceiving();
  } else {
    Serial.printf("✗ FAILED! Error code: %d\\n", result);
    performDiagnostics(result);
    attemptRecovery();
  }
}

void performDiagnostics(int errorCode) {
  Serial.println("=== DIAGNOSTIC MODE ===");
  
  switch (errorCode) {
    case RADIOLIB_ERR_CHIP_NOT_FOUND:
      Serial.println("ERROR: Chip not found (-2)");
      Serial.println("Causes: SPI wiring, pin config, power");
      break;
    default:
      Serial.printf("ERROR: Code %d\\n", errorCode);
  }
  
  analyzeHardwareConnections();
  testAlternativePinConfigurations();
}`
    },
    {
      title: "LoRa Hardware Diagnostic Tool",
      language: "C++/Arduino", 
      description: "Comprehensive hardware testing for SX1262 modules",
      code: `#include <RadioLib.h>
#include <SPI.h>

struct PinConfig {
  int nss, dio1, nrst, busy;
  const char* name;
};

PinConfig pinConfigs[] = {
  {15, 4, 19, 18, "Default Configuration"},
  {5, 2, 16, 17, "Alternative Config 1"},
  {21, 22, 23, 25, "Alternative Config 2"}
};

void setup() {
  Serial.begin(115200);
  Serial.println("SX1262 Hardware Diagnostic Tool");
  Serial.println("===============================");
  
  runComprehensiveDiagnostics();
}

void runComprehensiveDiagnostics() {
  // System checks
  performSystemChecks();
  
  // Power supply analysis  
  testPowerSupply();
  
  // SPI bus testing
  testSPIBus();
  
  // Test all pin configurations
  testAllPinConfigurations();
  
  // Generate report
  generateDiagnosticReport();
}

void testPowerSupply() {
  float voltageSum = 0;
  const int samples = 10;
  
  for (int i = 0; i < samples; i++) {
    uint32_t adcReading = analogRead(36);
    float voltage = (adcReading * 3.3) / 4095.0;
    voltageSum += voltage;
    delay(10);
  }
  
  float avgVoltage = voltageSum / samples;
  Serial.printf("Supply Voltage: %.3fV\\n", avgVoltage);
  
  if (avgVoltage >= 3.2) {
    Serial.println("✓ Voltage: GOOD");
  } else {
    Serial.println("✗ Voltage: TOO LOW");
  }
}`
    }
  ];

  const renderCodeLine = (line, index) => {
    const lineNumber = index + 1;
    
    // Apply syntax highlighting
    let highlightedLine = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/#include\s*&lt;([^&]+)&gt;/g, '<span class="preprocessor">#include</span> <span class="string">&lt;$1&gt;</span>')
      .replace(/#define\s+(\w+)/g, '<span class="preprocessor">#define</span> <span class="macro">$1</span>')
      .replace(/\b(void|int|bool|float|const|struct|class|if|else|for|while|return|new|this)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(Serial|SPI|digitalWrite|pinMode|delay|analogRead|printf|println|begin)\b/g, '<span class="function">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/\/\/(.*)$/g, '<span class="comment">//$1</span>')
      .replace(/\/\*([^*]|\*(?!\/))*\*\//g, '<span class="comment">$&</span>');
    
    return (
      <div key={index} className="code-line">
        <span className="line-number">{lineNumber}</span>
        <span 
          className="line-content" 
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      </div>
    );
  };

  const currentCode = codeExamples[currentExample];
  const codeLines = currentCode.code.split('\n');

  return (
    <div id="code-editor" className={isOpen ? 'open' : ''}>
      <div className="code-header">
        <div className="code-title-section">
          <div className="code-title">{currentCode.title}</div>
          <div className="code-language">{currentCode.language}</div>
          <div className="code-description">{currentCode.description}</div>
        </div>
        <div className="code-controls">
          <div className="code-examples-nav">
            {codeExamples.map((example, index) => (
              <button
                key={index}
                className={`example-btn ${index === currentExample ? 'active' : ''}`}
                onClick={() => setCurrentExample(index)}
                title={example.title}
              >
                {index === 0 ? '🤖' : index === 1 ? '📡' : '🔧'}
              </button>
            ))}
          </div>
          <button className="code-close" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="code-content">
        <div className="code-display">
          {codeLines.map((line, index) => renderCodeLine(line, index))}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;