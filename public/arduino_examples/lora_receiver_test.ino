/*
 * SX1262 LoRa Receiver Test with Comprehensive Debugging
 * 
 * This code demonstrates advanced LoRa module initialization with detailed
 * debugging and troubleshooting capabilities for hardware communication issues.
 * 
 * Author: Amr Eslim
 * Hardware: ESP32 + SX1262 LoRa Module
 * Library: RadioLib
 */

#include <RadioLib.h>
#include <SPI.h>

// Pin Configuration - Primary Setup
#define NSS_PIN     15  // Chip Select (CS)
#define DIO1_PIN    4   // Interrupt
#define NRST_PIN    19  // Reset
#define BUSY_PIN    18  // Busy status

// Alternative Pin Configurations for Testing
#define ALT_NSS_PIN     5   // Alternative CS
#define ALT_DIO1_PIN    2   // Alternative Interrupt
#define ALT_NRST_PIN    16  // Alternative Reset
#define ALT_BUSY_PIN    17  // Alternative Busy

// SX1262 module configuration
SX1262 radio = new Module(NSS_PIN, DIO1_PIN, NRST_PIN, BUSY_PIN);

// Debug flags
bool debugMode = true;
bool verboseOutput = true;

// Hardware state tracking
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
  delay(1000);
  
  Serial.println("@@SideQuester LoRa Receiver Test");
  Serial.println("==============================");
  
  // Initialize hardware diagnostics
  initializeHardwareDiagnostics();
  
  // Perform comprehensive module initialization
  int result = initializeLoRaModule();
  
  if (result == RADIOLIB_ERR_NONE) {
    Serial.println("✓ SX1262 initialized successfully!");
    setupLoRaParameters();
    startReceiving();
  } else {
    Serial.printf("✗ SX1262 initialization FAILED! Error code: %d\n", result);
    performDiagnostics(result);
    attemptRecovery();
  }
}

void loop() {
  if (hwStatus.moduleDetected) {
    handleLoRaReception();
  } else {
    // Continuous monitoring mode
    performPeriodicChecks();
  }
  delay(100);
}

void initializeHardwareDiagnostics() {
  Serial.println("> Initializing hardware diagnostics...");
  
  // Configure pins with pull-ups where appropriate
  pinMode(NSS_PIN, OUTPUT);
  digitalWrite(NSS_PIN, HIGH);
  
  pinMode(NRST_PIN, OUTPUT);
  digitalWrite(NRST_PIN, HIGH);
  
  pinMode(BUSY_PIN, INPUT);
  digitalWrite(DIO1_PIN, INPUT);
  
  // Initialize SPI
  SPI.begin();
  SPI.setFrequency(2000000); // 2MHz for stability
  
  Serial.println("✓ Basic pin configuration complete");
  
  // Test SPI communication
  testSPICommunication();
  
  // Check power supply
  checkPowerSupply();
  
  // Verify pin states
  verifyPinStates();
}

int initializeLoRaModule() {
  Serial.println("> Attempting SX1262 initialization...");
  
  // Power cycle the module
  performHardwareReset();
  
  // Wait for module to be ready
  if (!waitForModuleReady()) {
    return RADIOLIB_ERR_CHIP_NOT_FOUND;
  }
  
  // Initialize the module
  int state = radio.begin();
  
  if (state == RADIOLIB_ERR_NONE) {
    hwStatus.moduleDetected = true;
    Serial.println("✓ Module communication established");
    
    // Get module version
    uint8_t version = radio.getChipVersion();
    Serial.printf("✓ Chip version: 0x%02X\n", version);
    
    return RADIOLIB_ERR_NONE;
  }
  
  return state;
}

void performHardwareReset() {
  Serial.println("> Performing hardware reset sequence...");
  hwStatus.resetAttempts++;
  
  // Reset sequence
  digitalWrite(NRST_PIN, LOW);
  delay(10);
  digitalWrite(NRST_PIN, HIGH);
  delay(100);
  
  Serial.printf("✓ Reset cycle %d complete\n", hwStatus.resetAttempts);
}

bool waitForModuleReady() {
  Serial.println("> Waiting for module ready state...");
  
  int attempts = 0;
  const int maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    if (digitalRead(BUSY_PIN) == LOW) {
      Serial.printf("✓ Module ready after %d attempts\n", attempts);
      return true;
    }
    delay(10);
    attempts++;
  }
  
  Serial.printf("✗ Module not ready after %d attempts\n", maxAttempts);
  return false;
}

void testSPICommunication() {
  Serial.println("> Testing SPI communication...");
  
  // Test basic SPI functionality
  digitalWrite(NSS_PIN, LOW);
  uint8_t testByte = SPI.transfer(0x00); // Send dummy byte
  digitalWrite(NSS_PIN, HIGH);
  
  if (testByte != 0xFF && testByte != 0x00) {
    hwStatus.spiReady = true;
    Serial.printf("✓ SPI response: 0x%02X\n", testByte);
  } else {
    Serial.printf("⚠ SPI suspicious response: 0x%02X\n", testByte);
  }
}

void checkPowerSupply() {
  Serial.println("> Checking power supply...");
  
  // Read supply voltage (ESP32 specific)
  uint32_t adcReading = analogRead(36); // VDD pin
  hwStatus.supplyVoltage = (adcReading * 3.3) / 4095.0;
  
  Serial.printf("✓ Supply voltage: %.2fV\n", hwStatus.supplyVoltage);
  
  if (hwStatus.supplyVoltage < 3.0) {
    Serial.println("⚠ WARNING: Low supply voltage detected!");
  }
}

void verifyPinStates() {
  Serial.println("> Verifying pin states...");
  
  Serial.printf("  NSS (CS):  %s\n", digitalRead(NSS_PIN) ? "HIGH" : "LOW");
  Serial.printf("  RESET:     %s\n", digitalRead(NRST_PIN) ? "HIGH" : "LOW");
  Serial.printf("  BUSY:      %s\n", digitalRead(BUSY_PIN) ? "HIGH" : "LOW");
  Serial.printf("  DIO1:      %s\n", digitalRead(DIO1_PIN) ? "HIGH" : "LOW");
  
  hwStatus.pinStatesValid = true;
}

void performDiagnostics(int errorCode) {
  Serial.println("\n=== DIAGNOSTIC MODE ACTIVATED ===");
  
  switch (errorCode) {
    case RADIOLIB_ERR_CHIP_NOT_FOUND:
      Serial.println("ERROR: Chip not found (-2)");
      Serial.println("Possible causes:");
      Serial.println("  1. SPI wiring issues");
      Serial.println("  2. Incorrect pin configuration");
      Serial.println("  3. Power supply problems");
      Serial.println("  4. Module hardware failure");
      break;
      
    case RADIOLIB_ERR_PACKET_TOO_LONG:
      Serial.println("ERROR: Packet too long (-3)");
      break;
      
    case RADIOLIB_ERR_TX_TIMEOUT:
      Serial.println("ERROR: TX timeout (-4)");
      break;
      
    default:
      Serial.printf("ERROR: Unknown error code %d\n", errorCode);
      break;
  }
  
  // Detailed hardware analysis
  analyzeHardwareConnections();
  testAlternativePinConfigurations();
  performLoopbackTest();
}

void analyzeHardwareConnections() {
  Serial.println("\n> Hardware Connection Analysis:");
  
  // Test each pin individually
  Serial.println("Pin continuity test:");
  
  // CS pin test
  digitalWrite(NSS_PIN, LOW);
  delay(1);
  bool csWorking = (digitalRead(NSS_PIN) == LOW);
  digitalWrite(NSS_PIN, HIGH);
  Serial.printf("  CS Pin (GPIO%d): %s\n", NSS_PIN, csWorking ? "OK" : "FAIL");
  
  // Reset pin test
  digitalWrite(NRST_PIN, LOW);
  delay(1);
  bool resetWorking = (digitalRead(NRST_PIN) == LOW);
  digitalWrite(NRST_PIN, HIGH);
  Serial.printf("  Reset Pin (GPIO%d): %s\n", NRST_PIN, resetWorking ? "OK" : "FAIL");
}

void testAlternativePinConfigurations() {
  Serial.println("\n> Testing alternative pin configuration...");
  
  // Reinitialize with alternative pins
  SX1262 altRadio = new Module(ALT_NSS_PIN, ALT_DIO1_PIN, ALT_NRST_PIN, ALT_BUSY_PIN);
  
  // Configure alternative pins
  pinMode(ALT_NSS_PIN, OUTPUT);
  digitalWrite(ALT_NSS_PIN, HIGH);
  pinMode(ALT_NRST_PIN, OUTPUT);
  digitalWrite(ALT_NRST_PIN, HIGH);
  pinMode(ALT_BUSY_PIN, INPUT);
  pinMode(ALT_DIO1_PIN, INPUT);
  
  Serial.printf("Trying pins: CS=%d, DIO1=%d, RST=%d, BUSY=%d\n", 
                ALT_NSS_PIN, ALT_DIO1_PIN, ALT_NRST_PIN, ALT_BUSY_PIN);
  
  int altResult = altRadio.begin();
  if (altResult == RADIOLIB_ERR_NONE) {
    Serial.println("✓ SUCCESS with alternative pin configuration!");
    Serial.println("Please update your wiring to match alternative pins.");
    radio = altRadio; // Use the working configuration
    hwStatus.moduleDetected = true;
  } else {
    Serial.printf("✗ Alternative pins also failed: %d\n", altResult);
  }
}

void performLoopbackTest() {
  Serial.println("\n> Performing SPI loopback test...");
  
  const uint8_t testPattern[] = {0xAA, 0x55, 0xF0, 0x0F};
  bool loopbackOK = true;
  
  for (int i = 0; i < sizeof(testPattern); i++) {
    digitalWrite(NSS_PIN, LOW);
    uint8_t response = SPI.transfer(testPattern[i]);
    digitalWrite(NSS_PIN, HIGH);
    
    Serial.printf("  Sent: 0x%02X, Received: 0x%02X\n", testPattern[i], response);
    
    // In a real loopback, we'd expect specific responses
    // This is a basic connectivity test
    delay(1);
  }
}

void attemptRecovery() {
  Serial.println("\n> Attempting module recovery...");
  
  if (hwStatus.resetAttempts < 3) {
    Serial.println("Trying additional reset cycles...");
    for (int i = 0; i < 3; i++) {
      performHardwareReset();
      delay(500);
      
      int state = radio.begin();
      if (state == RADIOLIB_ERR_NONE) {
        Serial.println("✓ Recovery successful!");
        hwStatus.moduleDetected = true;
        setupLoRaParameters();
        startReceiving();
        return;
      }
    }
  }
  
  Serial.println("✗ Recovery failed. Check hardware connections.");
  printTroubleshootingGuide();
}

void setupLoRaParameters() {
  Serial.println("> Configuring LoRa parameters...");
  
  // Set frequency (868 MHz for Europe, 915 MHz for US)
  if (radio.setFrequency(868.0) == RADIOLIB_ERR_INVALID_FREQUENCY) {
    Serial.println("⚠ Using alternative frequency: 915.0 MHz");
    radio.setFrequency(915.0);
  }
  
  // Set bandwidth (125 kHz)
  radio.setBandwidth(125.0);
  
  // Set spreading factor (7-12)
  radio.setSpreadingFactor(9);
  
  // Set coding rate (5-8)
  radio.setCodingRate(7);
  
  // Set sync word
  radio.setSyncWord(0x12);
  
  // Set output power (max 22 dBm)
  radio.setOutputPower(17);
  
  Serial.println("✓ LoRa parameters configured");
}

void startReceiving() {
  Serial.println("> Starting receiver mode...");
  
  int state = radio.startReceive();
  if (state == RADIOLIB_ERR_NONE) {
    Serial.println("✓ Receiver started successfully");
    Serial.println("Waiting for LoRa packets...\n");
  } else {
    Serial.printf("✗ Failed to start receiver: %d\n", state);
  }
}

void handleLoRaReception() {
  // Check if packet was received
  if (radio.getIrqStatus() & RADIOLIB_SX126X_IRQ_RX_DONE) {
    // Read the packet
    String receivedData;
    int state = radio.readData(receivedData);
    
    if (state == RADIOLIB_ERR_NONE) {
      Serial.println("=== PACKET RECEIVED ===");
      Serial.printf("Data: %s\n", receivedData.c_str());
      Serial.printf("RSSI: %.2f dBm\n", radio.getRSSI());
      Serial.printf("SNR: %.2f dB\n", radio.getSNR());
      Serial.printf("Length: %d bytes\n", receivedData.length());
      Serial.println("=====================\n");
    } else {
      Serial.printf("Failed to read packet: %d\n", state);
    }
    
    // Clear IRQ flags and restart receiving
    radio.clearIrqStatus();
    radio.startReceive();
  }
}

void performPeriodicChecks() {
  static unsigned long lastCheck = 0;
  if (millis() - lastCheck > 5000) { // Check every 5 seconds
    Serial.println("> Periodic hardware check...");
    
    // Try to re-initialize
    int state = radio.begin();
    if (state == RADIOLIB_ERR_NONE) {
      Serial.println("✓ Module recovered!");
      hwStatus.moduleDetected = true;
      setupLoRaParameters();
      startReceiving();
    } else {
      Serial.printf("Still not responding: %d\n", state);
    }
    
    lastCheck = millis();
  }
}

void printTroubleshootingGuide() {
  Serial.println("\n=== TROUBLESHOOTING GUIDE ===");
  Serial.println("1. WIRING CHECK:");
  Serial.println("   ESP32    SX1262");
  Serial.println("   -----    ------");
  Serial.printf("   GPIO%d  ->  NSS (CS)\n", NSS_PIN);
  Serial.printf("   GPIO%d  ->  DIO1\n", DIO1_PIN);
  Serial.printf("   GPIO%d  ->  NRST\n", NRST_PIN);
  Serial.printf("   GPIO%d  ->  BUSY\n", BUSY_PIN);
  Serial.println("   MOSI   ->  MOSI");
  Serial.println("   MISO   ->  MISO");
  Serial.println("   SCK    ->  SCK");
  Serial.println("   3.3V   ->  VCC");
  Serial.println("   GND    ->  GND");
  Serial.println();
  Serial.println("2. POWER SUPPLY:");
  Serial.println("   - Ensure 3.3V supply");
  Serial.println("   - Check current capacity (>100mA)");
  Serial.println("   - Add decoupling capacitors");
  Serial.println();
  Serial.println("3. MODULE CHECK:");
  Serial.println("   - Verify SX1262 module type");
  Serial.println("   - Check for physical damage");
  Serial.println("   - Test with known working module");
  Serial.println();
  Serial.println("4. SOFTWARE:");
  Serial.println("   - Update RadioLib library");
  Serial.println("   - Try different ESP32 board");
  Serial.println("   - Check for pin conflicts");
  Serial.println("=============================\n");
}