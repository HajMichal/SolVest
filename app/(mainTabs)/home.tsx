import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/authContext";
import FundsInfo from "../../components/home/FundsInfo";
import { StyledText } from "../../components/StyledText";
import axios from "axios";
import FarmFieldContent from "../../components/home/FarmFieldContent";

export interface Weather {
  id: number;
  main: string;
  description: string;
}

interface WeatherType {
  data: {
    weather: Weather[];
  };
}

export default function Home() {
  const { onLogout } = useAuth();
  const [farmPreview, setFarmPreview] = useState({
    city: "All",
    lat: 0,
    lng: 0,
  });
  const [currentWeather, setCurrentWeather] = useState<string | undefined>();

  const farmsLocation = [
    { city: "All", lat: 0, lng: 0 },
    { city: "Bielsko", lat: 49.8, lng: 19.06 },
    { city: "Stargard", lat: 53.33, lng: 15.04 },
    { city: "Katania", lat: 37.73, lng: 14.26 },
    { city: "Yukon", lat: 34.59, lng: -84.44 },
    { city: "Doge", lat: 21.37, lng: 17.03 },
    { city: "Fontas", lat: 58.27, lng: -121.72 },
  ];

  useEffect(() => {
    const getWeather = async () => {
      const result = await axios.get<WeatherType, WeatherType>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${farmPreview.lat}&lon=${farmPreview.lng}&appid=${process.env.WHEATHER_API_KEY}`
      );
      setCurrentWeather(result.data.weather[0].main);
    };
    getWeather();
  }, [farmPreview]);

  return (
    <View style={{ backgroundColor: Colors.dark.background, height: "100%" }}>
      <FundsInfo title="Total Balance" amount={158.32} />
      <FundsInfo title="Estimated earnings" amount={120.15} type="/month" />
      <SafeAreaView>
        <FlatList
          horizontal
          data={farmsLocation}
          keyExtractor={(item) => item.city}
          contentContainerStyle={{ columnGap: 12 }}
          style={{ margin: 20, marginTop: 30 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: "yellow",
                borderRadius: 100,
              }}
              onPress={() => setFarmPreview(item)}
            >
              <StyledText style={{ color: "black", fontFamily: "OrkneyBold" }}>
                {item.city}
              </StyledText>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <FarmFieldContent
        city={farmPreview.city}
        currentWeather={currentWeather}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
