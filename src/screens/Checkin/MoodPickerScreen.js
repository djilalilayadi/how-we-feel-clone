import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

const moods = [
  { name: 'Happy', emoji: '😊', color: '#FFD700' },
  { name: 'Sad', emoji: '😔', color: '#87CEEB' },
  { name: 'Angry', emoji: '😡', color: '#FF4500' },
  { name: 'Anxious', emoji: '😰', color: '#FFA500' },
  { name: 'Excited', emoji: '🤩', color: '#FF69B4' },
  { name: 'Calm', emoji: '😌', color: '#98FB98' },
  { name: 'Tired', emoji: '😴', color: '#D3D3D3' },
  { name: 'Confused', emoji: '😕', color: '#DDA0DD' },
  { name: 'Grateful', emoji: '🙏', color: '#FFB6C1' },
  { name: 'Frustrated', emoji: '😤', color: '#FF6347' },
  { name: 'Loved', emoji: '🥰', color: '#FF1493' },
  { name: 'Stressed', emoji: '😓', color: '#CD5C5C' },
];

export default function MoodPickerScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>How are you feeling?</Text>
      <Text style={styles.subtitle}>Select your current mood</Text>
      
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <Pressable
            key={mood.name}
            style={({ pressed }) => [
              styles.moodButton,
              { backgroundColor: mood.color, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate('Intensity', { mood: mood.name })}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.moodName}>{mood.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  moodButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
