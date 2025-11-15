import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    const result = signup(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Create Account</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Button title="Create Account" onPress={handleSignup} />

      <Text
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20, color: "blue" }}
      >
        Back to Login
      </Text>
    </View>
  );
}
