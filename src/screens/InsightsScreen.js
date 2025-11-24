import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MOODS } from '../constants/moods';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

export default function InsightsScreen() {
  const { moods } = useContext(MoodContext);
  const { colors } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  // Calculate stats
  const totalCheckins = moods.length;

  // Find most frequent mood
  const moodCounts = moods.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const topMoodName = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, null);
  const topMood = MOODS.find(m => m.name === topMoodName);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.foreground }]}>{t('insights')}</Text>

      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
          <Text style={[styles.summaryNumber, { color: colors.foreground }]}>{totalCheckins}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>{t('totalCheckins')}</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
          <Text style={[styles.summaryNumber, { color: colors.foreground }]}>{topMood ? topMood.emoji : '-'}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>{t('topMood')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{t('recentActivity')}</Text>
        {moods.length === 0 ? (
          <Text style={[styles.emptyState, { color: colors.mutedForeground }]}>{t('noMoods')}</Text>
        ) : (
          moods.slice().reverse().slice(0, 5).map((item, index) => {
            const moodObj = MOODS.find(m => m.name === item.mood) || { name: item.mood, emoji: '😐' };
            return (
              <View key={index} style={[styles.moodCard, { backgroundColor: colors.card, marginBottom: 10, borderColor: colors.border, borderWidth: 1 }]}>
                <Text style={styles.moodEmoji}>{moodObj.emoji}</Text>
                <View style={styles.moodInfo}>
                  <Text style={[styles.moodName, { color: colors.foreground }]}>{item.mood}</Text>
                  <Text style={[styles.moodStats, { color: colors.mutedForeground }]}>
                    {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  emptyState: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 20,
  },
  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  moodInfo: {
    flex: 1,
  },
  moodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  moodStats: {
    fontSize: 12,
    opacity: 0.6,
  },
});
