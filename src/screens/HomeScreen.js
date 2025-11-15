import React, { useContext } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { MoodContext } from '../context/MoodContext';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { moods } = useContext(MoodContext);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Navigation will automatically switch to Login screen due to RootNavigator's key prop
  };

  return (
    <View style={{flex:1, padding:20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Welcome, {currentUser}!</Text>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF3B30"
        />
      </View>
      
      <Button
        title="Start Mood Check-in"
        onPress={() => navigation.navigate('MoodPicker')}
      />

      <Text style={{marginTop:20, fontSize:18}}>Your Moods:</Text>
      <ScrollView style={{marginTop:10}}>
        {moods.length === 0 ? (
          <Text>No moods yet</Text>
        ) : (
          moods.map((item, index) => (
            <View key={item.id || `mood_${index}`} style={{padding:10, borderBottomWidth:1, borderColor:'#ccc'}}>
              <Text>Mood: {item.mood}</Text>
              <Text>Intensity: {item.intensity}</Text>
              <Text>Note: {item.note}</Text>
              <Text>Date: {item.date instanceof Date ? item.date.toLocaleString() : new Date(item.date).toLocaleString()}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
