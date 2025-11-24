import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SHADCN_COLORS } from '../constants/shadcn';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState('system'); // 'light', 'dark', 'system'
  const [theme, setTheme] = useState(systemScheme);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themePreference === 'system') {
      setTheme(systemScheme);
    } else {
      setTheme(themePreference);
    }
  }, [themePreference, systemScheme]);

  const loadThemePreference = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('themePreference');
      if (storedTheme) {
        setThemePreference(storedTheme);
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const setThemePreferenceAndSave = async (newTheme) => {
    try {
      setThemePreference(newTheme);
      await AsyncStorage.setItem('themePreference', newTheme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const colors = SHADCN_COLORS;

  return (
    <ThemeContext.Provider
      value={{
        theme, // 'light' or 'dark' (resolved)
        themePreference, // 'light', 'dark', or 'system' (user choice)
        setThemePreference: setThemePreferenceAndSave,
        colors: colors[theme] || colors.light,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
