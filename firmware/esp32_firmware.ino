#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>
#include <ArduinoJson.h>

// --- Configuration ---
#define WIFI_SSID "realme"
#define WIFI_PASSWORD "jjjjjjjjjj"
#define FIREBASE_HOST "smartlink-cefc5-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "JOaEkby5nYWZT2iPYsIPzN1svx8f0haYiGQyNk3n"

#define NODE_ID "master" // Change to slave1, slave2, etc. for other nodes

// --- Pins ---
#define DHTPIN 4
#define DHTTYPE DHT11
#define MQ2PIN 32
#define RELAYPIN 23

// --- Objects ---
DHT dht(DHTPIN, DHTTYPE);
FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

// --- Variables ---
float airTemp, humidity, waterTemp, ph, ec;
int gasValue;
String motorStatus = "OFF";
String motorMode = "AUTO";

// --- Simulated Sensor Logic ---
float generateSimulatedPH() {
  return 6.5 + (random(0, 150) / 100.0); // 6.5 - 8.0
}

float generateSimulatedEC() {
  return 200 + random(0, 600); // 200 - 800
}

void setup() {
  Serial.begin(115200);
  
  pinMode(RELAYPIN, OUTPUT);
  digitalWrite(RELAYPIN, LOW); // Start with motor OFF

  dht.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // 1. Read Sensors
  humidity = dht.readHumidity();
  airTemp = dht.readTemperature();
  gasValue = analogRead(MQ2PIN);
  
  // Simulated sensors
  ph = generateSimulatedPH();
  ec = generateSimulatedEC();
  waterTemp = airTemp - 2.0; // Simulated offset

  if (isnan(humidity) || isnan(airTemp)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // 2. Push Data to Firebase
  FirebaseJson json;
  json.set("sensors/airTemp", airTemp);
  json.set("sensors/humidity", humidity);
  json.set("sensors/gas", gasValue);
  json.set("sensors/ph", ph);
  json.set("sensors/ec", ec);
  json.set("sensors/waterTemp", waterTemp);
  json.set("sensors/timestamp", (uint32_t)(millis() / 1000)); // Simplified timestamp

  String path = "/nodes/" + String(NODE_ID);
  if (Firebase.updateNode(firebaseData, path, json)) {
    Serial.println("Data updated in Firebase");
  } else {
    Serial.println("Firebase update failed: " + firebaseData.errorReason());
  }

  // 3. Check Control Commands
  if (Firebase.getString(firebaseData, path + "/motor/mode")) {
    motorMode = firebaseData.stringData();
  }

  if (motorMode == "MANUAL") {
    if (Firebase.getString(firebaseData, path + "/motor/status")) {
      motorStatus = firebaseData.stringData();
      digitalWrite(RELAYPIN, (motorStatus == "ON") ? HIGH : LOW);
    }
  } else {
    // AUTO Mode Logic
    float phMin = 6.5, phMax = 7.5, ecMax = 800, gasMax = 500, tempMax = 35;
    
    // Fetch thresholds from Firebase (optional, or use defaults)
    if (Firebase.getFloat(firebaseData, path + "/thresholds/phMin")) phMin = firebaseData.floatData();
    if (Firebase.getFloat(firebaseData, path + "/thresholds/phMax")) phMax = firebaseData.floatData();
    // ... etc for other thresholds

    bool shouldBeOn = (ph < phMin || ph > phMax) || (ec > ecMax) || (gasValue > gasMax) || (airTemp > tempMax);
    
    motorStatus = shouldBeOn ? "ON" : "OFF";
    digitalWrite(RELAYPIN, shouldBeOn ? HIGH : LOW);
    
    // Update status back to Firebase
    Firebase.setString(firebaseData, path + "/motor/status", motorStatus);
  }

  delay(2000); // Wait 2 seconds
}
