# SmartNode IoT: Sensor Monitoring & Motor Control

SmartNode IoT is a full-stack IoT solution designed for real-time environmental monitoring and automated hardware control. It features a master-slave architecture using ESP32 nodes, a Firebase Realtime Database backend, and a modern React Native mobile application.

## 🚀 Key Features
- **Real-time Monitoring**: Track PH, Conductivity, Gas, Temperature, and Humidity.
- **Automated Control**: Intelligent motor/actuator control based on customizable sensor thresholds.
- **Manual Override**: Toggle hardware state directly from the mobile app.
- **Material UI**: Sleek, minimalist design built with React Native Paper and NativeWind.

---

## 🛠️ Installation Guide

### 1. Mobile App (Frontend)
The app is built with Expo. Follow these steps to run it on your phone:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Expo server
npx expo start
```
*Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS) to view the dashboard.*

### 2. ESP32 Firmware (Hardware)
The hardware logic is located in the `firmware/` directory.

1.  Open `firmware/esp32_firmware.ino` in the **Arduino IDE**.
2.  Install the **Firebase ESP32 Client** library (by Mobizt) via the Library Manager.
3.  Update the following constants in the code:
    - `WIFI_SSID`: Your WiFi name.
    - `WIFI_PASSWORD`: Your WiFi password.
    - `FIREBASE_AUTH`: Your Database Secret from the Firebase Console.
4.  Connect your ESP32 via USB and click **Upload**.

### 3. Firebase Configuration
Ensure your Firebase Realtime Database is set to **Test Mode** or has appropriate rules:
```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

---

## 📂 Project Structure
- **/frontend**: React Native mobile application (Expo).
- **/firmware**: ESP32 C++ source code (Arduino).
- **/firebase**: Database schema and configuration.
- **/report**: LaTeX project documentation.

## 📝 Technical Stack
- **Mobile**: React Native, Expo, NativeWind, React Native Paper.
- **Backend**: Firebase Realtime Database, Firebase Auth.
- **Hardware**: ESP32, DHT11, MQ2, Relay Module.
