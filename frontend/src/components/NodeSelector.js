import React from 'react';
import { View, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useApp } from '../context/AppContext';

const NodeSelector = () => {
  const { nodes, selectedNodeId, setSelectedNodeId } = useApp();
  const nodeIds = Object.keys(nodes);

  if (nodeIds.length <= 1) return null;

  return (
    <View className="px-2 mb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {nodeIds.map((id) => (
          <Chip
            key={id}
            selected={selectedNodeId === id}
            onPress={() => setSelectedNodeId(id)}
            className="mr-2 bg-white"
            showSelectedCheck={false}
            selectedColor="#6200ee"
          >
            {id.toUpperCase()}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

export default NodeSelector;
