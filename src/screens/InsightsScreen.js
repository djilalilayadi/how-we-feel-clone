import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MoodContext } from "../context/MoodContext";

export default function InsightsScreen() {
  const { moods } = useContext(MoodContext);

  // ➤ If no moods yet, show message
  if (moods.length === 0) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20 }}>Insights</Text>
        <Text style={{ marginTop: 10 }}>No data yet. Log some moods first!</Text>
      </View>
    );
  }

  // ➤ Total moods
  const totalMoods = moods.length;

  // ➤ Average intensity
  const averageIntensity =
    moods.reduce((sum, item) => sum + item.intensity, 0) / totalMoods;

  // ➤ Most frequent mood
  const moodCounts = {};
  moods.forEach((item) => {
    moodCounts[item.mood] = (moodCounts[item.mood] || 0) + 1;
  });

  const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
    moodCounts[a] > moodCounts[b] ? a : b
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Insights</Text>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 18 }}>Total Moods Logged: {totalMoods}</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 18 }}>
          Average Intensity: {averageIntensity.toFixed(1)} / 5
        </Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 18 }}>
          Most Frequent Mood: {mostFrequentMood}
        </Text>
      </View>
    </View>
  );
}
