import React from 'react';
import { View, Text } from 'react-native';
import { Card, Switch, Button, SegmentedButtons } from 'react-native-paper';
import { styled } from 'nativewind';

const StyledCard = styled(Card);

const MotorControl = ({ status, mode, onStatusChange, onModeChange }) => {
  return (
    <StyledCard className="m-2 rounded-2xl elevation-2 bg-white">
      <Card.Content>
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-lg font-bold text-gray-800">Motor Control</Text>
            <Text className="text-gray-500 text-xs">Manage pump/actuator state</Text>
          </View>
          <View className="items-center">
            <Text className={`text-xs font-bold px-2 py-1 rounded-full ${status === 'ON' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {status}
            </Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 text-xs mb-2 uppercase font-semibold">Operation Mode</Text>
          <SegmentedButtons
            value={mode}
            onValueChange={onModeChange}
            buttons={[
              { value: 'AUTO', label: 'Auto' },
              { value: 'MANUAL', label: 'Manual' },
            ]}
            density="compact"
          />
        </View>

        {mode === 'MANUAL' && (
          <View className="flex-row justify-between items-center bg-gray-50 p-3 rounded-xl">
            <Text className="text-gray-700 font-medium">Manual Toggle</Text>
            <Switch
              value={status === 'ON'}
              onValueChange={(val) => onStatusChange(val ? 'ON' : 'OFF')}
              color="#6200ee"
            />
          </View>
        )}
        
        {mode === 'AUTO' && (
          <Text className="text-xs text-gray-400 italic text-center mt-2">
            * Motor is controlled by sensor threshold logic
          </Text>
        )}
      </Card.Content>
    </StyledCard>
  );
};

export default MotorControl;
