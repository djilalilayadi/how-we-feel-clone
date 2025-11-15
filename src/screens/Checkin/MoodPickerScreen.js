import React from 'react';
import { View, Text, Button } from 'react-native';

export default function MoodPickerScreen({ navigation }) {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Select Your Mood</Text>
      <Button
        title="😊 Happy"
        onPress={() => navigation.navigate('Intensity', { mood: 'Happy' })}
      />
      <Button
        title="😔 Sad"
        onPress={() => navigation.navigate('Intensity', { mood: 'Sad' })}
      />
      <Button
        title="😡 Angry"
        onPress={() => navigation.navigate('Intensity', { mood: 'Angry' })}
      />
    </View>
  );
}
