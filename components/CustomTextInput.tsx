import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

interface CustomTextInputType {
  state: string;
  label: string;
  setState: (e: string) => void;
  password?: boolean;
}

export default function CustomTextInput({
  state,
  label,
  setState,
  password = false,
}: CustomTextInputType) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(e) => setState(e)}
      value={state}
      label={label}
      secureTextEntry={password}
      mode="outlined"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
