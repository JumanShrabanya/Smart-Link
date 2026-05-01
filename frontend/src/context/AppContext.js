import React, { createContext, useState, useEffect, useContext } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../services/firebase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [nodes, setNodes] = useState({});
  const [selectedNodeId, setSelectedNodeId] = useState('master');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nodesRef = ref(database, 'nodes');
    const unsubscribe = onValue(nodesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNodes(data);
      } else {
        setNodes({}); // Ensure empty state is handled
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Read Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateMotorMode = (nodeId, mode) => {
    update(ref(database, `nodes/${nodeId}/motor`), { mode });
  };

  const updateMotorStatus = (nodeId, status) => {
    update(ref(database, `nodes/${nodeId}/motor`), { status });
  };

  const updateThresholds = (nodeId, thresholds) => {
    update(ref(database, `nodes/${nodeId}/thresholds`), thresholds);
  };

  return (
    <AppContext.Provider value={{
      nodes,
      selectedNodeId,
      setSelectedNodeId,
      loading,
      updateMotorMode,
      updateMotorStatus,
      updateThresholds,
      selectedNode: nodes[selectedNodeId] || {}
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
