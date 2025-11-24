import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MoodContext } from '../../context/MoodContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function NotesScreen({ navigation, route }) {
  const { mood, intensity } = route.params;
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { colors } = useContext(ThemeContext);

  const { addMood } = useContext(MoodContext);

  const handleSubmit = () => {
    addMood({ mood, intensity, note, date: new Date() });
    setShowSuccess(true);

    // Navigate home after a short delay to let the user see the success message
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 1500);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <View style={{ marginTop: 40, marginBottom: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.foreground, marginBottom: 5 }}>
          Add a note
        </Text>
        <Text style={{ fontSize: 16, color: colors.mutedForeground }}>
          Anything else you want to remember?
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.card,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 5,
        marginBottom: 30
      }}>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor={colors.mutedForeground}
          style={{
            padding: 15,
            fontSize: 16,
            color: colors.foreground,
            minHeight: 120,
            textAlignVertical: 'top'
          }}
          multiline
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 20,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: colors.primaryForeground, fontSize: 18, fontWeight: '600' }}>
          Save Check-in
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccess}
        onRequestClose={() => { }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
              <Ionicons name="checkmark" size={40} color={colors.primaryForeground} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Mood Saved!</Text>
            <Text style={[styles.modalText, { color: colors.mutedForeground }]}>
              Your check-in has been recorded.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    width: '80%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
