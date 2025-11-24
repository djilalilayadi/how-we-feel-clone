import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HistoryScreen() {
  const { moods } = useContext(MoodContext);
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 20, marginBottom: 10, color: colors.foreground }}>Mood History</Text>

      <ScrollView>
        {moods.length === 0 ? (
          <Text style={{ color: colors.mutedForeground }}>No moods logged yet.</Text>
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
                  borderColor: colors.border,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: colors.card
                }}
              >
                <Text style={{ color: colors.foreground, fontWeight: 'bold' }}>Mood: {item.mood}</Text>
                <Text style={{ color: colors.mutedForeground }}>Intensity: {item.intensity}</Text>
                {item.note ? <Text style={{ color: colors.mutedForeground }}>Note: {item.note}</Text> : null}
                <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>Date: {item.date instanceof Date ? item.date.toLocaleString() : new Date(item.date).toLocaleString()}</Text>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}
