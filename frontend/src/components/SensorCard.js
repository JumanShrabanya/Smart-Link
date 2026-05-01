import React from 'react';
import { View, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { styled } from 'nativewind';

const StyledCard = styled(Card);

const SensorCard = ({ label, value, unit, icon, color }) => {
  return (
    <StyledCard className="m-2 w-[45%] rounded-2xl elevation-2 bg-white">
      <Card.Content className="items-center py-4">
        <IconButton 
          icon={icon} 
          iconColor={color} 
          size={32} 
          className="bg-gray-50 mb-1"
        />
        <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</Text>
        <View className="flex-row items-baseline mt-1">
          <Text className="text-2xl font-bold text-gray-800">{value}</Text>
          <Text className="text-gray-500 ml-1 text-xs font-semibold">{unit}</Text>
        </View>
      </Card.Content>
    </StyledCard>
  );
};

export default SensorCard;
