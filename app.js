import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { MoodProvider } from './src/context/MoodContext';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';

function AppContent() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MoodProvider>
            <AppContent />
          </MoodProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Register the app component with Expo
registerRootComponent(App);
