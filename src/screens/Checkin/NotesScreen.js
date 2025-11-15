import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { MoodContext } from '../../context/MoodContext';

export default function NotesScreen({ navigation, route }) {
  const { mood, intensity } = route.params;
  const [note, setNote] = useState('');

  const { addMood } = useContext(MoodContext); // 1️⃣ access addMood function

  const handleSubmit = () => {
    // 2️⃣ Save mood in context
    addMood({ mood, intensity, note, date: new Date() });

    Alert.alert('Mood Saved', `Mood: ${mood}\nIntensity: ${intensity}\nNote: ${note}`);
    navigation.navigate('Home');
  };

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
      <Text>Mood: {mood}</Text>
      <Text>Intensity: {intensity}</Text>
      <TextInput
        placeholder="Add a note..."
        style={{borderWidth:1, borderColor:'#ccc', width:'100%', padding:10, marginVertical:20}}
        value={note}
        onChangeText={setNote}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
