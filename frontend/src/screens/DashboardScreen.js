import React from 'react';
import { View, ScrollView, Text, SafeAreaView, RefreshControl } from 'react-native';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import SensorCard from '../components/SensorCard';
import MotorControl from '../components/MotorControl';
import NodeSelector from '../components/NodeSelector';

const DashboardScreen = () => {
  const { selectedNode, selectedNodeId, updateMotorMode, updateMotorStatus, loading } = useApp();
  const sensors = selectedNode.sensors || {};
  const motor = selectedNode.motor || {};

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator animating={true} color="#6200ee" size="large" />
        <Text className="mt-4 text-gray-500 font-medium">Connecting to nodes...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Appbar.Header className="bg-white elevation-0">
        <Appbar.Content title={`IoT Monitor`} titleStyle={{ fontWeight: 'bold' }} />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
        <Appbar.Action icon="cog-outline" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView 
        className="flex-1 px-2 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <NodeSelector />

        <Text className="text-gray-400 text-xs px-2 mb-2">
          Last updated: {sensors.timestamp ? new Date(sensors.timestamp * 1000).toLocaleTimeString() : 'N/A'}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          <SensorCard 
            label="PH Level" 
            value={sensors.ph || '--'} 
            unit="pH" 
            icon="water-percent" 
            color="#2196F3" 
          />
          <SensorCard 
            label="Conductivity" 
            value={sensors.ec || '--'} 
            unit="µS/cm" 
            icon="lightning-bolt" 
            color="#FF9800" 
          />
          <SensorCard 
            label="Air Temp" 
            value={sensors.airTemp || '--'} 
            unit="°C" 
            icon="thermometer" 
            color="#F44336" 
          />
          <SensorCard 
            label="Humidity" 
            value={sensors.humidity || '--'} 
            unit="%" 
            icon="water-outline" 
            color="#00BCD4" 
          />
          <SensorCard 
            label="Water Temp" 
            value={sensors.waterTemp || '--'} 
            unit="°C" 
            icon="coolant-temperature" 
            color="#3F51B5" 
          />
          <SensorCard 
            label="Gas/Smoke" 
            value={sensors.gas || '--'} 
            unit="ppm" 
            icon="molecule" 
            color="#795548" 
          />
        </View>

        <MotorControl 
          status={motor.status} 
          mode={motor.mode}
          onStatusChange={(status) => updateMotorStatus(selectedNodeId, status)}
          onModeChange={(mode) => updateMotorMode(selectedNodeId, mode)}
        />
        
        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
