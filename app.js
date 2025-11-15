import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

// context providers
import { AuthProvider } from './src/context/AuthContext';
import { MoodProvider } from './src/context/MoodContext';

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </MoodProvider>
    </AuthProvider>
  );
}

// Register the app component with Expo
registerRootComponent(App);
