import React, { useContext } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { MoodContext } from '../context/MoodContext';

export default function HomeScreen({ navigation }) {
  const { moods } = useContext(MoodContext);

  return (
    <View style={{flex:1, padding:20}}>
      <Button
        title="Start Mood Check-in"
        onPress={() => navigation.navigate('MoodPicker')}
      />

      <Text style={{marginTop:20, fontSize:18}}>Your Moods:</Text>
      <ScrollView style={{marginTop:10}}>
        {moods.length === 0 ? (
          <Text>No moods yet</Text>
        ) : (
          moods.map(item => (
            <View key={item.id} style={{padding:10, borderBottomWidth:1, borderColor:'#ccc'}}>
              <Text>Mood: {item.mood}</Text>
              <Text>Intensity: {item.intensity}</Text>
              <Text>Note: {item.note}</Text>
              <Text>Date: {item.date.toLocaleString()}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
