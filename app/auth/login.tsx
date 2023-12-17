import { StyleSheet, Modal, View, Image } from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, authState } = useAuth();

  const login = async () => {
    await onLogin!(email, password);
  };

  useEffect(() => {
    if (authState?.authenticated) router.push("/auth/pincode");
  }, [authState]);

  return (
    <View>
      <Image
        source={require("../../assets/images/solVEST/solvest-high-resolution-logo-transparent.png")}
        style={styles.image}
      />
      <CustomTextInput state={email} setState={setEmail} label="E-mail" />
      <CustomTextInput state={password} password setState={setPassword} label="Password" />
      <Button style={styles.button} mode="contained" onPress={login}>
        Press me
      </Button>
      <Link style={styles.link} href={"/auth/register"}>
        Need account ?
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 60,
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  link: {
    textAlign: "center",
    marginHorizontal: 20,
  },
});
