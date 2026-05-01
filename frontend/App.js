import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AppProvider } from './src/context/AppContext';
import DashboardScreen from './src/screens/DashboardScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f6f6f6',
  },
};

export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <DashboardScreen />
      </PaperProvider>
    </AppProvider>
  );
}
