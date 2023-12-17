import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../context/authContext";
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OrkneyBold: require("../assets/fonts/Orkney-Bold.otf"),
    OrkneyRegular: require("../assets/fonts/Orkney-Regular.otf"),
    OrkneyLight: require("../assets/fonts/Orkney-Light.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // #TODO LIST
  // create login/register system without styling
  // setting pincode after correctly register
  // set initial entry to register sub page
  // create simple navigation between pages

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerShown: true,
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="auth/login"
            options={{
              headerShown: true,
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="auth/pincode"
            options={{
              headerShown: true,
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              headerShown: true,
              headerLeft: () => <></>,
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
