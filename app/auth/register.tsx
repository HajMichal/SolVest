import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { Button } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const { onRegister, authState } = useAuth();

  const register = async () => {
    const result = await onRegister!(email, password, name, country);

    if (result && result.error) {
      alert(result.msg);
    }

    if (result.status === 200) {
      router.push("/auth/pincode");
    }
    return result
  };

  useEffect(() => {
    if (authState?.authenticated) router.push("/auth/pincode");
  }, [authState]);

  return (
    <View style={{ width: "100%" }}>
      <CustomTextInput state={name} setState={setName} label="Name" />
      <CustomTextInput state={email} setState={setEmail} label="E-mail" />
      <CustomTextInput state={password} password setState={setPassword} label="Password" />
      <CustomTextInput state={country} setState={setCountry} label="Country" />
      <Button style={styles.button} mode="contained" onPress={register}>
        Press me
      </Button>
      <Link style={styles.link} href={"/auth/login"}>
        Already Signed Up?
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  link: {
    textAlign: "center",
    marginHorizontal: 20,
  },
});
