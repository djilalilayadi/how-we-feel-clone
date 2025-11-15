import React, { createContext, useState } from 'react';

// 1️⃣ Create the context
export const MoodContext = createContext();

// 2️⃣ Create the provider
export const MoodProvider = ({ children }) => {
  const [moods, setMoods] = useState([]); // stores all moods

  // 3️⃣ Function to add a mood
  const addMood = (moodEntry) => {
    setMoods(prev => [...prev, { id: Date.now().toString(), ...moodEntry }]);
  };

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};
