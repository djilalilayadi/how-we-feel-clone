import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MoodContext } from "../context/MoodContext";

// Mood data matching MoodPickerScreen
const moodData = {
  'Happy': { emoji: '😊', color: '#FFD700' },
  'Sad': { emoji: '😔', color: '#87CEEB' },
  'Angry': { emoji: '😡', color: '#FF4500' },
  'Anxious': { emoji: '😰', color: '#FFA500' },
  'Excited': { emoji: '🤩', color: '#FF69B4' },
  'Calm': { emoji: '😌', color: '#98FB98' },
  'Tired': { emoji: '😴', color: '#D3D3D3' },
  'Confused': { emoji: '😕', color: '#DDA0DD' },
  'Grateful': { emoji: '🙏', color: '#FFB6C1' },
  'Frustrated': { emoji: '😤', color: '#FF6347' },
  'Loved': { emoji: '🥰', color: '#FF1493' },
  'Stressed': { emoji: '😓', color: '#CD5C5C' },
};

export default function InsightsScreen() {
  const { moods } = useContext(MoodContext);

  // ➤ If no moods yet, show message
  if (moods.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Insights</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyText}>No data yet.</Text>
          <Text style={styles.emptySubtext}>Log some moods first to see insights!</Text>
        </View>
      </View>
    );
  }

  // ➤ Total moods
  const totalMoods = moods.length;

  // ➤ Average intensity
  const averageIntensity =
    moods.reduce((sum, item) => sum + item.intensity, 0) / totalMoods;

  // ➤ Mood counts and distribution
  const moodCounts = {};
  moods.forEach((item) => {
    moodCounts[item.mood] = (moodCounts[item.mood] || 0) + 1;
  });

  // ➤ Sort moods by frequency (most frequent first)
  const sortedMoods = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      mood,
      count,
      percentage: ((count / totalMoods) * 100).toFixed(1),
      ...moodData[mood] || { emoji: '😐', color: '#CCCCCC' }
    }))
    .sort((a, b) => b.count - a.count);

  // ➤ Most frequent mood
  const mostFrequentMood = sortedMoods[0];

  // ➤ Get last 7 days mood trend
  const last7Days = moods
    .filter(mood => {
      const moodDate = mood.date instanceof Date ? mood.date : new Date(mood.date);
      const daysDiff = (new Date() - moodDate) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    })
    .length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Insights</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.summaryNumber}>{totalMoods}</Text>
          <Text style={styles.summaryLabel}>Total Moods</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={styles.summaryNumber}>{averageIntensity.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>Avg Intensity</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#F3E5F5' }]}>
          <Text style={styles.summaryNumber}>{last7Days}</Text>
          <Text style={styles.summaryLabel}>Last 7 Days</Text>
        </View>
      </View>

      {/* Most Frequent Mood */}
      {mostFrequentMood && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Frequent Mood</Text>
          <View style={[styles.moodCard, { backgroundColor: mostFrequentMood.color + '20' }]}>
            <Text style={styles.moodEmoji}>{mostFrequentMood.emoji}</Text>
            <View style={styles.moodInfo}>
              <Text style={styles.moodName}>{mostFrequentMood.mood}</Text>
              <Text style={styles.moodStats}>
                {mostFrequentMood.count} time{mostFrequentMood.count !== 1 ? 's' : ''} ({mostFrequentMood.percentage}%)
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Mood Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood Distribution</Text>
        {sortedMoods.map((mood) => (
          <View key={mood.mood} style={styles.distributionItem}>
            <View style={styles.distributionHeader}>
              <Text style={styles.distributionEmoji}>{mood.emoji}</Text>
              <Text style={styles.distributionName}>{mood.mood}</Text>
              <Text style={styles.distributionCount}>{mood.count}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${mood.percentage}%`,
                    backgroundColor: mood.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.distributionPercentage}>{mood.percentage}%</Text>
          </View>
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
    marginBottom: 20,
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 48,
    marginRight: 15,
  },
  moodInfo: {
    flex: 1,
  },
  moodName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  moodStats: {
    fontSize: 14,
    color: '#666',
  },
  distributionItem: {
    marginBottom: 20,
  },
  distributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  distributionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  distributionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  distributionPercentage: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});
