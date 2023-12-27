import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StyledText } from "../StyledText";

interface PanelInfoType {
  title: string;
  amount: number;
}

export default function PanelInfo({ title, amount }: PanelInfoType) {
  return (
    <StyledText>
      <Text style={{ fontSize: 75, fontFamily: "OrkneyBold" }}>{amount}</Text>
      {""}
      {title}
    </StyledText>
  );
}

const styles = StyleSheet.create({});
