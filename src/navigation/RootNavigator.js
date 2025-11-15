import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabs from "./BottomTabs";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Stack.Navigator 
      key={currentUser ? "authenticated" : "unauthenticated"}
      screenOptions={{ headerShown: false }}
    >
      {currentUser ? (
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
