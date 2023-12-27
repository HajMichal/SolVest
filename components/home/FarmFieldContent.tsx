import React from "react";
import { StyleSheet, View } from "react-native";
import { StyledText } from "../StyledText";
import PanelInfo from "./PanelInfo";
import { Icon } from "@rneui/themed";

interface FarmFieldTypes {
  currentWeather: string | undefined;
  city: string;
}

export default function FarmFieldContent({
  currentWeather,
  city,
}: FarmFieldTypes) {
  return (
    <View
      style={{
        width: "100%",
        height: "55%",
        alignItems: "center",
        // justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      {city !== "All" && (
        <>
          <View>
            <StyledText
              style={{
                fontFamily: "OrkneyBold",
                fontSize: 20,
              }}
            >
              <Icon name="map-pin" type="feather" color={"white"} /> {city}
            </StyledText>
          </View>
          <View>
            <StyledText>{currentWeather}</StyledText>
          </View>
        </>
      )}
      <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <PanelInfo title="/Panels" amount={16} />
        <PanelInfo title="/KiloWatts" amount={8} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
