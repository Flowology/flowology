import { StyleSheet, Button, TextInput } from "react-native";
import React, { useState } from "react";

import { Text, View } from "../components/Themed";
import * as Speech from "expo-speech";
import Slider from "@react-native-community/slider";

export default function TabTwoScreen() {
  const [inputText, setInputText] = useState("Hello world!");
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  const speakText = () => {
    let options = {
      rate: speed,
      pitch
    };
    Speech.speak(inputText, options);
  };

  const updateRate = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const updatePitch = (newPitch: number) => {
    setPitch(newPitch);
  };

  const SLIDER_CONFIG = {
    rate: {
      title: `Speed: ${speed.toFixed(2)}`,
      maximumValue: 1.0,
      value: speed,
      onValueChange: updateRate
    },
    pitch: {
      title: `Pitch: ${pitch.toFixed(2)}`,
      maximumValue: 2.0,
      value: pitch,
      onValueChange: updatePitch
    }
  };

  const renderSliders = () =>
    Object.entries(SLIDER_CONFIG).map((slider: any, index: any) => {
      let currKey = Object.keys(SLIDER_CONFIG)[index];
      let isPitch = currKey == "pitch";
      return (
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>{`Pitch: ${pitch.toFixed(2)}`}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={isPitch ? 2.0 : 1.0}
            value={isPitch ? pitch : speed}
            onValueChange={isPitch ? updatePitch : updateRate}
          />
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Customize your text-to-speech settings.</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        multiline
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder={"Enter a sentence you want read aloud."}
      />
      {renderSliders()}

      <Button title="Speak" onPress={speakText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%"
  },
  input: {
    alignSelf: "stretch",
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    marginHorizontal: 20,
    fontSize: 15
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    padding: 5
  },
  sliderLabel: {
    textAlign: "center",
    marginRight: 20
  },
  slider: {
    flex: 1
  }
});
