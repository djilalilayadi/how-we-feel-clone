import Slider from '@react-native-community/slider';
import { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

export default function IntensityScreen({ navigation, route }) {
  const { mood } = route.params; // get mood from previous screen
  const [intensity, setIntensity] = useState(3);
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.foreground, marginBottom: 10 }}>
          How intense is this feeling?
        </Text>
        <Text style={{ fontSize: 18, color: colors.mutedForeground }}>
          {mood}
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.card,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Text style={{ fontSize: 48, fontWeight: 'bold', color: colors.primary, marginBottom: 20 }}>
          {intensity}
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={intensity}
          onValueChange={setIntensity}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.muted}
          thumbTintColor={colors.primary}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
          <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>Mild</Text>
          <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>Extreme</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
        onPress={() => navigation.navigate('Notes', { mood, intensity })}
      >
        <Text style={{ color: colors.primaryForeground, fontSize: 18, fontWeight: '600' }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
