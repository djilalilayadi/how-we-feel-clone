import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const MoodContext = createContext();

export function MoodProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [moods, setMoods] = useState([]);

  const getKey = useCallback(() => `mood_data_${currentUser || 'guest'}`, [currentUser]);

  useEffect(() => {
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

    if (currentUser) {
      loadMoods();
    } else {
      setMoods([]); // Clear moods when user logs out
    }
  }, [currentUser, getKey]);

  useEffect(() => {
    const saveMoods = async () => {
      try {
        await AsyncStorage.setItem(getKey(), JSON.stringify(moods));
      } catch (e) {
        console.log(e);
      }
    };

    if (currentUser && moods.length >= 0) {
      saveMoods();
    }
  }, [moods, currentUser, getKey]);

  const addMood = mood => {
    const newMood = {
      ...mood,
      id: mood.id || `mood_${Date.now()}_${Math.random()}`, // Generate unique id if not provided
    };
    setMoods(prev => [...prev, newMood]);
  };

  const deleteMood = (id) => {
    setMoods(prev => prev.filter(mood => mood.id !== id));
  };

  const updateMood = (updatedMood) => {
    setMoods(prev => prev.map(mood => mood.id === updatedMood.id ? updatedMood : mood));
  };

  return (
    <MoodContext.Provider value={{ moods, addMood, deleteMood, updateMood }}>
      {children}
    </MoodContext.Provider>
  );
}
