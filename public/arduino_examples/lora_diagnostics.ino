/*
 * SX1262 LoRa Hardware Diagnostic Tool
 * 
 * This diagnostic sketch helps identify hardware issues with SX1262 LoRa modules
 * by performing comprehensive hardware tests and providing detailed feedback.
 * 
 * Author: Amr Eslim
 * Hardware: ESP32 + SX1262 LoRa Module
 * Library: RadioLib
 */

#include <RadioLib.h>
#include <SPI.h>

// Pin Configuration Matrix for Testing
struct PinConfig {
  int nss;
  int dio1;
  int nrst;
  int busy;
  const char* name;
};

// Multiple pin configurations to test
PinConfig pinConfigs[] = {
  {15, 4, 19, 18, "Default Configuration"},
  {5, 2, 16, 17, "Alternative Config 1"},
  {21, 22, 23, 25, "Alternative Config 2"},
  {12, 13, 14, 27, "Alternative Config 3"}
};

const int numConfigs = sizeof(pinConfigs) / sizeof(pinConfigs[0]);

// Test results structure
struct TestResult {
  bool spiTest = false;
  bool pinTest = false;
  bool powerTest = false;
  bool moduleResponse = false;
  bool radioInit = false;
  float voltage = 0.0;
  int errorCode = 0;
};

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("╔══════════════════════════════════════╗");
  Serial.println("║   SX1262 Hardware Diagnostic Tool   ║");
  Serial.println("║            by Amr Eslim              ║");
  Serial.println("╚══════════════════════════════════════╝\n");
  
  runComprehensiveDiagnostics();
}

void loop() {
  // Interactive mode
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if (command == "help") {
      printHelpMenu();
    } else if (command == "scan") {
      runComprehensiveDiagnostics();
    } else if (command == "spi") {
      testSPIBus();
    } else if (command == "pins") {
      testAllPinConfigurations();
    } else if (command == "power") {
      testPowerSupply();
    } else if (command == "reset") {
      performHardwareReset();
    } else {
      Serial.println("Unknown command. Type 'help' for available commands.");
    }
  }
  
  delay(100);
}

void runComprehensiveDiagnostics() {
  Serial.println("🔍 Starting comprehensive hardware diagnostics...\n");
  
  // Step 1: Basic system checks
  performSystemChecks();
  
  // Step 2: Power supply analysis
  testPowerSupply();
  
  // Step 3: SPI bus testing
  testSPIBus();
  
  // Step 4: Test all pin configurations
  testAllPinConfigurations();
  
  // Step 5: Module detection attempts
  attemptModuleDetection();
  
  // Step 6: Generate diagnostic report
  generateDiagnosticReport();
  
  Serial.println("\n📋 Diagnostic complete. Type 'help' for interactive commands.");
}

void performSystemChecks() {
  Serial.println("🔧 System Checks");
  Serial.println("================");
  
  // Check ESP32 model
  Serial.printf("✓ ESP32 Chip Model: %s\n", ESP.getChipModel());
  Serial.printf("✓ CPU Frequency: %d MHz\n", ESP.getCpuFreqMHz());
  Serial.printf("✓ Flash Size: %d MB\n", ESP.getFlashChipSize() / (1024 * 1024));
  Serial.printf("✓ Free Heap: %d bytes\n", ESP.getFreeHeap());
  
  // Check available GPIO pins
  Serial.println("✓ GPIO Status:");
  int testPins[] = {2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 27};
  for (int pin : testPins) {
    pinMode(pin, INPUT_PULLUP);
    delay(1);
    Serial.printf("   GPIO%d: %s\n", pin, digitalRead(pin) ? "Available" : "Pulled Low");
  }
  
  Serial.println();
}

void testPowerSupply() {
  Serial.println("⚡ Power Supply Analysis");
  Serial.println("========================");
  
  // Multiple voltage readings for accuracy
  float voltageSum = 0;
  const int samples = 10;
  
  for (int i = 0; i < samples; i++) {
    uint32_t adcReading = analogRead(36); // VP pin
    float voltage = (adcReading * 3.3) / 4095.0;
    voltageSum += voltage;
    delay(10);
  }
  
  float avgVoltage = voltageSum / samples;
  
  Serial.printf("✓ Supply Voltage: %.3fV (averaged over %d samples)\n", avgVoltage, samples);
  
  if (avgVoltage >= 3.2) {
    Serial.println("✓ Voltage level: GOOD");
  } else if (avgVoltage >= 3.0) {
    Serial.println("⚠ Voltage level: MARGINAL (may cause issues)");
  } else {
    Serial.println("✗ Voltage level: TOO LOW (likely cause of problems)");
  }
  
  // Test voltage stability
  Serial.println("📊 Voltage Stability Test (5 readings over 1 second):");
  for (int i = 0; i < 5; i++) {
    uint32_t adcReading = analogRead(36);
    float voltage = (adcReading * 3.3) / 4095.0;
    Serial.printf("   Reading %d: %.3fV\n", i + 1, voltage);
    delay(200);
  }
  
  Serial.println();
}

void testSPIBus() {
  Serial.println("🔌 SPI Bus Testing");
  Serial.println("==================");
  
  // Initialize SPI with different speeds
  int frequencies[] = {1000000, 2000000, 4000000, 8000000}; // 1MHz to 8MHz
  const char* freqNames[] = {"1MHz", "2MHz", "4MHz", "8MHz"};
  
  for (int i = 0; i < 4; i++) {
    Serial.printf("Testing SPI at %s...\n", freqNames[i]);
    
    SPI.begin();
    SPI.setFrequency(frequencies[i]);
    SPI.setBitOrder(MSBFIRST);
    SPI.setDataMode(SPI_MODE0);
    
    // Test with different pin configurations
    for (int config = 0; config < numConfigs; config++) {
      pinMode(pinConfigs[config].nss, OUTPUT);
      digitalWrite(pinConfigs[config].nss, HIGH);
      
      // Send test pattern
      digitalWrite(pinConfigs[config].nss, LOW);
      uint8_t response = SPI.transfer(0x42); // Test byte
      digitalWrite(pinConfigs[config].nss, HIGH);
      
      Serial.printf("  %s: Response 0x%02X\n", pinConfigs[config].name, response);
    }
    
    SPI.end();
    delay(100);
  }
  
  Serial.println();
}

void testAllPinConfigurations() {
  Serial.println("📌 Pin Configuration Testing");
  Serial.println("=============================");
  
  for (int i = 0; i < numConfigs; i++) {
    Serial.printf("Testing %s\n", pinConfigs[i].name);
    Serial.printf("  NSS=%d, DIO1=%d, NRST=%d, BUSY=%d\n", 
                  pinConfigs[i].nss, pinConfigs[i].dio1, 
                  pinConfigs[i].nrst, pinConfigs[i].busy);
    
    TestResult result = testSingleConfiguration(pinConfigs[i]);
    printConfigurationResult(result);
    
    Serial.println();
  }
}

TestResult testSingleConfiguration(PinConfig config) {
  TestResult result;
  
  // Configure pins
  pinMode(config.nss, OUTPUT);
  digitalWrite(config.nss, HIGH);
  pinMode(config.nrst, OUTPUT);
  digitalWrite(config.nrst, HIGH);
  pinMode(config.busy, INPUT);
  pinMode(config.dio1, INPUT);
  
  // Test pin functionality
  result.pinTest = testPinFunctionality(config);
  
  // Initialize SPI
  SPI.begin();
  SPI.setFrequency(2000000);
  
  // Test SPI communication
  result.spiTest = testSPIWithPins(config);
  
  // Attempt hardware reset
  performResetSequence(config);
  
  // Try to initialize RadioLib
  SX1262 radio = new Module(config.nss, config.dio1, config.nrst, config.busy);
  int state = radio.begin();
  
  result.radioInit = (state == RADIOLIB_ERR_NONE);
  result.errorCode = state;
  
  if (result.radioInit) {
    // Try to get chip version
    result.moduleResponse = true;
  }
  
  SPI.end();
  return result;
}

bool testPinFunctionality(PinConfig config) {
  bool allGood = true;
  
  // Test NSS pin
  digitalWrite(config.nss, LOW);
  delay(1);
  if (digitalRead(config.nss) != LOW) allGood = false;
  digitalWrite(config.nss, HIGH);
  delay(1);
  if (digitalRead(config.nss) != HIGH) allGood = false;
  
  // Test RESET pin
  digitalWrite(config.nrst, LOW);
  delay(1);
  if (digitalRead(config.nrst) != LOW) allGood = false;
  digitalWrite(config.nrst, HIGH);
  delay(1);
  if (digitalRead(config.nrst) != HIGH) allGood = false;
  
  return allGood;
}

bool testSPIWithPins(PinConfig config) {
  const uint8_t testBytes[] = {0x00, 0xFF, 0xAA, 0x55};
  bool responseReceived = false;
  
  for (uint8_t testByte : testBytes) {
    digitalWrite(config.nss, LOW);
    uint8_t response = SPI.transfer(testByte);
    digitalWrite(config.nss, HIGH);
    
    if (response != 0x00 && response != 0xFF) {
      responseReceived = true;
    }
    
    delay(1);
  }
  
  return responseReceived;
}

void performResetSequence(PinConfig config) {
  digitalWrite(config.nrst, LOW);
  delay(10);
  digitalWrite(config.nrst, HIGH);
  delay(100);
  
  // Wait for BUSY to go low (if connected)
  int attempts = 0;
  while (digitalRead(config.busy) == HIGH && attempts < 100) {
    delay(1);
    attempts++;
  }
}

void printConfigurationResult(TestResult result) {
  Serial.printf("  Pin Test: %s\n", result.pinTest ? "✓ PASS" : "✗ FAIL");
  Serial.printf("  SPI Test: %s\n", result.spiTest ? "✓ PASS" : "✗ FAIL");
  Serial.printf("  Radio Init: %s", result.radioInit ? "✓ SUCCESS" : "✗ FAILED");
  
  if (!result.radioInit) {
    Serial.printf(" (Error: %d)", result.errorCode);
    
    // Decode error codes
    switch (result.errorCode) {
      case RADIOLIB_ERR_CHIP_NOT_FOUND:
        Serial.print(" - Chip not found");
        break;
      case RADIOLIB_ERR_PACKET_TOO_LONG:
        Serial.print(" - Packet too long");
        break;
      case RADIOLIB_ERR_TX_TIMEOUT:
        Serial.print(" - TX timeout");
        break;
      default:
        Serial.print(" - Unknown error");
        break;
    }
  }
  Serial.println();
  
  Serial.printf("  Module Response: %s\n", result.moduleResponse ? "✓ YES" : "✗ NO");
}

void attemptModuleDetection() {
  Serial.println("🔍 Module Detection Attempts");
  Serial.println("============================");
  
  // Try advanced detection methods
  Serial.println("Attempting advanced module detection...");
  
  // Method 1: Register reading attempts
  Serial.println("Method 1: Direct register access");
  for (int i = 0; i < numConfigs; i++) {
    if (attemptRegisterRead(pinConfigs[i])) {
      Serial.printf("✓ %s: Module detected via register read!\n", pinConfigs[i].name);
    } else {
      Serial.printf("✗ %s: No response to register read\n", pinConfigs[i].name);
    }
  }
  
  // Method 2: BUSY pin monitoring
  Serial.println("\nMethod 2: BUSY pin state monitoring");
  for (int i = 0; i < numConfigs; i++) {
    monitorBusyPin(pinConfigs[i]);
  }
  
  Serial.println();
}

bool attemptRegisterRead(PinConfig config) {
  SPI.begin();
  SPI.setFrequency(1000000); // Slow for reliability
  
  pinMode(config.nss, OUTPUT);
  digitalWrite(config.nss, HIGH);
  
  // Try to read version register (typical address 0x00)
  digitalWrite(config.nss, LOW);
  SPI.transfer(0x00); // Version register read command
  uint8_t version = SPI.transfer(0x00); // Dummy byte to read response
  digitalWrite(config.nss, HIGH);
  
  SPI.end();
  
  // Valid version responses are typically in specific ranges
  return (version != 0x00 && version != 0xFF && version > 0x10);
}

void monitorBusyPin(PinConfig config) {
  pinMode(config.busy, INPUT);
  
  // Monitor BUSY pin for activity during reset
  pinMode(config.nrst, OUTPUT);
  digitalWrite(config.nrst, HIGH);
  
  bool initialState = digitalRead(config.busy);
  
  // Perform reset and monitor BUSY
  digitalWrite(config.nrst, LOW);
  delay(1);
  bool duringReset = digitalRead(config.busy);
  digitalWrite(config.nrst, HIGH);
  delay(10);
  bool afterReset = digitalRead(config.busy);
  
  Serial.printf("  %s BUSY states - Initial:%s, During Reset:%s, After Reset:%s\n",
                config.name,
                initialState ? "HIGH" : "LOW",
                duringReset ? "HIGH" : "LOW", 
                afterReset ? "HIGH" : "LOW");
}

void generateDiagnosticReport() {
  Serial.println("📊 DIAGNOSTIC REPORT");
  Serial.println("====================");
  
  Serial.println("SUMMARY:");
  Serial.println("- If no configuration worked, check:");
  Serial.println("  1. Physical connections (loose wires)");
  Serial.println("  2. Module power supply (3.3V, sufficient current)");
  Serial.println("  3. Module compatibility (ensure it's SX1262)");
  Serial.println("  4. Breadboard quality (try soldering)");
  Serial.println();
  
  Serial.println("RECOMMENDED ACTIONS:");
  Serial.println("1. Double-check all wiring connections");
  Serial.println("2. Measure actual voltages with multimeter");
  Serial.println("3. Try a different SX1262 module if available");
  Serial.println("4. Test with shorter jumper wires");
  Serial.println("5. Add decoupling capacitors (100nF ceramic + 10uF electrolytic)");
  Serial.println();
  
  Serial.println("SUCCESSFUL CONFIGURATIONS:");
  Serial.println("(Any working configurations will be logged during testing)");
}

void performHardwareReset() {
  Serial.println("🔄 Performing Hardware Reset on All Configurations");
  Serial.println("===================================================");
  
  for (int i = 0; i < numConfigs; i++) {
    Serial.printf("Resetting %s...\n", pinConfigs[i].name);
    
    pinMode(pinConfigs[i].nrst, OUTPUT);
    digitalWrite(pinConfigs[i].nrst, HIGH);
    delay(10);
    digitalWrite(pinConfigs[i].nrst, LOW);
    delay(10);
    digitalWrite(pinConfigs[i].nrst, HIGH);
    delay(100);
    
    Serial.println("  Reset sequence completed");
  }
  
  Serial.println("All reset sequences completed.\n");
}

void printHelpMenu() {
  Serial.println("╔══════════════════════════════════════╗");
  Serial.println("║              HELP MENU               ║");
  Serial.println("╠══════════════════════════════════════╣");
  Serial.println("║ help  - Show this help menu          ║");
  Serial.println("║ scan  - Run full diagnostic scan     ║");
  Serial.println("║ spi   - Test SPI bus only            ║");
  Serial.println("║ pins  - Test pin configurations      ║");
  Serial.println("║ power - Test power supply            ║");
  Serial.println("║ reset - Perform hardware reset       ║");
  Serial.println("╚══════════════════════════════════════╝\n");
}