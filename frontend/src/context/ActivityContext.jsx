import React, { createContext, useContext, useState, useCallback } from 'react';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = useCallback((activity) => {
    setActivities((prevActivities) => [
      {
        ...activity,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      },
      ...prevActivities,
    ]);
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  return (
    <ActivityContext.Provider value={{ activities, addActivity, clearActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}; 