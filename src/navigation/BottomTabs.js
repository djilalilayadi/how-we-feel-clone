import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { Pressable } from "react-native";

import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import IntensityScreen from "../screens/Checkin/IntensityScreen";
import MoodPickerScreen from "../screens/Checkin/MoodPickerScreen";
import NotesScreen from "../screens/Checkin/NotesScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import InsightsScreen from "../screens/InsightsScreen";
import ManageMoodsScreen from "../screens/ManageMoodsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Nested stack navigator for Home tab (includes check-in flow)
function HomeStack() {
  const { t } = useContext(LanguageContext);
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerTitleStyle: { color: colors.foreground },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true, title: t('home') }}
      />
      <Stack.Screen
        name="MoodPicker"
        component={MoodPickerScreen}
        options={({ navigation }) => ({
          title: t('selectMood'),
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
                color={colors.primary}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Intensity"
        component={IntensityScreen}
        options={({ navigation }) => ({
          title: t('selectIntensity'),
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
                color={colors.primary}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Notes"
        component={NotesScreen}
        options={({ navigation }) => ({
          title: t('addNotes'),
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
                color={colors.primary}
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// Settings Stack
function SettingsStack() {
  const { t } = useContext(LanguageContext);
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerTitleStyle: { color: colors.foreground },
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageMoods"
        component={ManageMoodsScreen}
        options={{ title: t('manageMoods') }}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  const { t } = useContext(LanguageContext);
  const { colors, theme } = useContext(ThemeContext);

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
          } else if (route.name === "SettingsStack") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme === 'dark' ? '#888' : 'gray',
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.foreground,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: t('home') }}
      />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: t('history'), headerShown: true }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ title: t('insights'), headerShown: true }} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ title: t('settings') }} />
    </Tab.Navigator>
  );
}

