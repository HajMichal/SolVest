import { Redirect } from "expo-router";
import { useAuth } from "../context/authContext";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";

export default function Index() {
  const { authState } = useAuth();
  return (
    <NavigationContainer independent={true}>
      {authState?.authenticated ? (
        <Redirect href="/(mainTabs)/home" />
      ) : (
        <Redirect href="/auth/login" />
      )}
    </NavigationContainer>
  );
}
