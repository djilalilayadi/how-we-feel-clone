import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MoodContext } from '../context/MoodContext';

export default function HistoryScreen() {
  const { moods } = useContext(MoodContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Mood History</Text>

      <ScrollView>
        {moods.length === 0 ? (
          <Text>No moods logged yet.</Text>
        ) : (
          moods
            .slice()
            .reverse() // show latest first
            .map((item, index) => (
              <View
                key={item.id || `mood_${index}`}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
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
