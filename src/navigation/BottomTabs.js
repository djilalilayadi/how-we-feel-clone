import React from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import InsightsScreen from "../screens/InsightsScreen";
import MoodPickerScreen from "../screens/Checkin/MoodPickerScreen";
import IntensityScreen from "../screens/Checkin/IntensityScreen";
import NotesScreen from "../screens/Checkin/NotesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Nested stack navigator for Home tab (includes check-in flow)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: true, title: "Home" }}
      />
      <Stack.Screen 
        name="MoodPicker" 
        component={MoodPickerScreen} 
        options={({ navigation }) => ({
          title: "Select Mood",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })}
              style={{ marginLeft: 15, padding: 5 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#007AFF"
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
        name="Intensity" 
        component={IntensityScreen} 
        options={({ navigation }) => ({
          title: "Select Intensity",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })}
              style={{ marginLeft: 15, padding: 5 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#007AFF"
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
        name="Notes" 
        component={NotesScreen} 
        options={({ navigation }) => ({
          title: "Add Notes",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })}
              style={{ marginLeft: 15, padding: 5 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#007AFF"
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Insights") {
            iconName = focused ? "analytics" : "analytics-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ title: "Home" }}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
    </Tab.Navigator>
  );
}

