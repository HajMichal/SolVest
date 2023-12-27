import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import React from "react";

interface FundsInfoType {
  title: string;
  amount: number;
  icon?: unknown;
  type?: string;
}

export default function FundsInfo({
  title,
  amount,
  icon,
  type,
}: FundsInfoType) {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
      <Text style={{ color: Colors.dark.text, fontSize: 20 }}>{title}</Text>
      <Text
        style={{
          color: Colors.dark.text,
          fontSize: 30,
          fontFamily: "OrkneyBold",
        }}
      >
        ${amount}{" "}
        <Text style={{ fontSize: 15, fontFamily: "OrkneyLight" }}>{type}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
