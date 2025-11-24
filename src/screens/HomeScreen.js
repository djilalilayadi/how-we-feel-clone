import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MoodItem from '../components/MoodItem';
import { MOODS, getMoodColor } from '../constants/moods';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { moods } = useContext(MoodContext);
  const { currentUser } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);



  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      {/* Header Section */}
      <View style={{ marginBottom: 30, marginTop: 10 }}>
        <Text style={{ fontSize: 16, color: colors.mutedForeground, marginBottom: 5 }}>{t('welcome')},</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.foreground }}>{currentUser}</Text>
      </View>

      {/* Main Check-in Card */}
      <View style={{
        backgroundColor: colors.card,
        borderRadius: 25,
        padding: 25,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border
      }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15
        }}>
          <Ionicons name="add" size={40} color={colors.secondaryForeground} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.cardForeground, marginBottom: 10 }}>{t('startCheckin')}</Text>
        <Text style={{ fontSize: 16, color: colors.mutedForeground, textAlign: 'center', marginBottom: 20 }}>
          How are you feeling right now?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('MoodPicker')}
        >
          <Text style={{ color: colors.primaryForeground, fontSize: 16, fontWeight: '600' }}>
            Check In
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recent Moods Section */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.foreground, marginBottom: 15 }}>{t('moods')}</Text>

      {moods.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center', backgroundColor: colors.muted, borderRadius: 15 }}>
          <Text style={{ color: colors.mutedForeground }}>{t('noMoods')}</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: -5 }}>
          {moods.slice().reverse().map((item, index) => {
            const moodColor = getMoodColor(item.mood, colors);
            // Find mood object to get emoji if not stored (though we should store it, let's lookup)
            const moodObj = MOODS.find(m => m.name === item.mood) || { name: item.mood, emoji: '😐' };

            return (
              <View key={item.id || `mood_${index}`} style={{ marginRight: 15, alignItems: 'center', width: 80 }}>
                <MoodItem mood={moodObj} color={moodColor} size={60} showName={false} />
                <Text style={{ marginTop: 8, fontSize: 12, fontWeight: '600', color: colors.foreground }} numberOfLines={1}>{item.mood}</Text>
                <Text style={{ fontSize: 10, color: colors.mutedForeground }}>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </ScrollView>
  );
}
