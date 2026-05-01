# Multi-Node IoT Sensor Monitoring and Motor Control System

This project is a full-stack IoT solution for real-time sensor monitoring and automated motor control using ESP32, Firebase, and React Native.

## Project Structure

- `frontend/`: React Native (Expo) mobile application.
  - Built with NativeWind (Tailwind CSS) and React Native Paper (Material Design).
- `firmware/`: ESP32 firmware code (Arduino IDE / C++).
- `firebase/`: Database schema and configuration.

## Features

- **Real-time Monitoring**: Monitor PH, EC, Gas, Air Temperature, Humidity, and Water Temperature.
- **Automated Control**: Motor control based on configurable sensor thresholds.
- **Multi-Node Support**: Master-Slave architecture for scaling sensor nodes.
- **Modern UI**: Minimalist Material Design interface.

## Tech Stack

- **Mobile**: React Native, Expo, NativeWind, React Native Paper.
- **Backend**: Firebase Realtime Database, Firebase Auth.
- **Hardware**: ESP32, DHT11, MQ2, Relay Module.

## Getting Started

### 1. Hardware Setup
- Connect sensors to ESP32 as defined in `firmware/esp32_firmware.ino`.
- Update WiFi and Firebase credentials in the firmware.

### 2. Firebase Setup
- Create a Firebase project.
- Enable Realtime Database and Authentication (Email/Password).
- Import the schema from `firebase/schema.json`.

### 3. Mobile App
- `cd frontend`
- `npm install`
- `npx expo start`
