import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); // list of all accounts
  const [currentUser, setCurrentUser] = useState(null); // logged user

  // Load users from storage on start
  useEffect(() => {
    loadUsers();
  }, []);

  // Save users when list changes
  useEffect(() => {
    saveUsers();
  }, [users]);

  const loadUsers = async () => {
    try {
      const json = await AsyncStorage.getItem("users");
      if (json) setUsers(JSON.parse(json));
    } catch (error) {
      console.log("Error loading users", error);
    }
  };

  const saveUsers = async () => {
    try {
      await AsyncStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.log("Error saving users", error);
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
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
