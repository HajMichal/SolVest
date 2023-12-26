import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { Icon } from "@rneui/themed";
import { MotiView } from "moti";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, " ", 0, "del"];

const dialPadSize = width * 0.2;
const pinLength = 4;
const pinSize = width / 7;

function DialPad({ onPress }: { onPress: (item: (typeof dialPad)[number]) => void }) {
  return (
    <FlatList
      data={dialPad}
      numColumns={3}
      style={{ flexGrow: 0 }}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={{ gap: 20 }}
      contentContainerStyle={{ gap: 20 }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => onPress(item)} disabled={item === " "}>
            <View
              style={[styles.dialPadButton, typeof item !== "number" ? {} : { borderWidth: 1 }]}
            >
              {item === "del" ? (
                <Icon name="delete" type="feather" color={"white"} />
              ) : (
                <Text style={styles.dialPadText}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default function pincode() {
  
  const router = useRouter()

  const [code, setCode] = useState<number[]>([]);
  const { onPinCode, userData  } = useAuth()
 
  
  useEffect(() => {
    const handlePinCode = async () => {
      if (code.length === 4 && userData){
        !!userData.pincode 
        // pinCode Validation
        ? await onPinCode!(Number(code.join('')), userData.userId!)
        // setting pinCode if no exists
        : await onPinCode!(Number(code.join('')), userData.userId!, true)
      }
    }

    if (userData?.userId === null) {
      router.push("/auth/login")
    }

    handlePinCode()
  }, [code, userData])



  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: width * 0.2,
          height: width / 3,
          alignItems: "flex-end",
        }}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i];
          return (
            <MotiView
              key={i}
              style={styles.eachPin}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
              transition={{
                type: "timing",
                duration: 200,
              }}
            />
          );
        })}
      </View>
      <DialPad
        onPress={(item) => {
          if (item === "del") {
            setCode((prevCode) => prevCode?.slice(0, prevCode.length - 1));
          } else if (typeof item === "number") {
            if (code.length === pinLength) return;
            setCode((prevCode) => [...prevCode, item]);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.dark.background,
  },
  dialPadButton: {
    width: dialPadSize,
    height: dialPadSize,
    borderRadius: dialPadSize,
    borderColor: Colors.dark.brand,
    justifyContent: "center",
    alignItems: "center",
  },
  dialPadText: {
    color: Colors.dark.text,
    fontSize: dialPadSize * 0.4,
  },
  eachPin: {
    width: pinSize,
    height: 2,
    borderRadius: pinSize,
    backgroundColor: "red",
  },
});
