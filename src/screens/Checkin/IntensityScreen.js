import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';

export default function IntensityScreen({ navigation, route }) {
  const { mood } = route.params; // get mood from previous screen
  const [intensity, setIntensity] = useState(3);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Mood: {mood}</Text>
      <Text>Intensity: {intensity}</Text>
      <Slider
        style={{width:200, height:40}}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={intensity}
        onValueChange={setIntensity}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate('Notes', { mood, intensity })}
      />
    </View>
  );
}
