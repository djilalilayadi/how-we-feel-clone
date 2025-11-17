import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); // list of all accounts
  const [currentUser, setCurrentUser] = useState(null); // logged user
  const [isLoading, setIsLoading] = useState(true); // true while AsyncStorage is read

  // Load users from storage on start
  useEffect(() => {
    loadUsers();
  }, []);

  // Save users when list changes
  useEffect(() => {
    saveUsers();
  }, [users]);

  // Save currentUser when it changes (persist login) but only after initial load
  useEffect(() => {
    if (!isLoading) {
      saveCurrentUser();
    }
  }, [currentUser, isLoading]);

  const loadUsers = async () => {
    try {
      const [usersJson, currentJson] = await Promise.all([
        AsyncStorage.getItem("users"),
        AsyncStorage.getItem("currentUser"),
      ]);

      if (usersJson) setUsers(JSON.parse(usersJson));
      if (currentJson) {
        try {
          setCurrentUser(JSON.parse(currentJson));
        } catch (e) {
          // currentUser may be stored as a raw string
          setCurrentUser(currentJson);
        }
      }
    } catch (error) {
      console.log("Error loading users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUsers = async () => {
    try {
      await AsyncStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.log("Error saving users", error);
    }
  };

  const saveCurrentUser = async () => {
    try {
      if (currentUser === null) {
        await AsyncStorage.removeItem("currentUser");
      } else {
        await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    } catch (error) {
      console.log("Error saving current user", error);
    }
  };

  const signup = (username, password) => {
    // check if exists
    const exists = users.find(u => u.username === username);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = { username, password };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(username);

    return { success: true };
  };

  const login = (username, password) => {
    const found = users.find(
      u => u.username === username && u.password === password
    );

    if (!found) return { success: false, message: "Invalid credentials" };

    setCurrentUser(username);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isLoading,
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
