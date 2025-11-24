import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOODS, getMoodColor } from '../../constants/moods';
import { LanguageContext } from '../../context/LanguageContext';
import { MoodContext } from '../../context/MoodContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function MoodPickerScreen({ navigation }) {
  const { addMood } = useContext(MoodContext);
  const { colors } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const handleMoodSelect = (mood) => {
    navigation.navigate('Intensity', { mood: mood.name });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.foreground }]}>{t('howAreYouFeeling')}</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{t('selectMood')}</Text>

      <View style={styles.grid}>
        {MOODS.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.moodButton, { backgroundColor: getMoodColor(mood.name, colors) }]}
            onPress={() => handleMoodSelect(mood)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.moodName}>{mood.name}</Text>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
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
