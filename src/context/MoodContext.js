import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

export const MoodContext = createContext();

export function MoodProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [moods, setMoods] = useState([]);

  const getKey = () => `mood_data_${currentUser || 'guest'}`;

  useEffect(() => {
    if (currentUser) {
      loadMoods();
    } else {
      setMoods([]); // Clear moods when user logs out
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && moods.length >= 0) {
      saveMoods();
    }
  }, [moods, currentUser]);

  const saveMoods = async () => {
    try {
      await AsyncStorage.setItem(getKey(), JSON.stringify(moods));
    } catch (e) {
      console.log(e);
    }
  };

  const loadMoods = async () => {
    try {
      const json = await AsyncStorage.getItem(getKey());
      if (json) {
        const parsed = JSON.parse(json).map((item, index) => ({
          ...item,
          id: item.id || `mood_${Date.now()}_${index}`, // Ensure id exists
          date: new Date(item.date),
        }));
        setMoods(parsed);
      } else {
        setMoods([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addMood = mood => {
    const newMood = {
      ...mood,
      id: mood.id || `mood_${Date.now()}_${Math.random()}`, // Generate unique id if not provided
    };
    setMoods(prev => [...prev, newMood]);
  };

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
}
