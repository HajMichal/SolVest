import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const { onLogout } = useAuth();

  return (
    <View style={{ backgroundColor: Colors.dark.background }}>
      <Text style={{ color: Colors.dark.text }}>home</Text>
      <Button onPress={onLogout} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({});
