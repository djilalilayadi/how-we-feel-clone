import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MoodProvider } from './src/context/MoodContext';
import HomeScreen from './src/screens/HomeScreen';


import MoodPickerScreen from './src/screens/Checkin/MoodPickerScreen';
import IntensityScreen from './src/screens/Checkin/IntensityScreen';
import NotesScreen from './src/screens/Checkin/NotesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Insights" component={() => <Text>Insights</Text>} />
      <Tab.Screen name="History" component={() => <Text>History</Text>} />
      <Tab.Screen name="Profile" component={() => <Text>Profile</Text>} />
    </Tab.Navigator>
  );
}

// Main App
function App() {
  return (
    <MoodProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MoodPicker" component={MoodPickerScreen} options={{ title: 'Select Mood' }} />
          <Stack.Screen name="Intensity" component={IntensityScreen} options={{ title: 'Select Intensity' }} />
          <Stack.Screen name="Notes" component={NotesScreen} options={{ title: 'Add Notes' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MoodProvider>
  );
}

// Register the app component with Expo
registerRootComponent(App);
