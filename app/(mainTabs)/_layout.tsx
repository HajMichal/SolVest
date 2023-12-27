import { Tabs } from "expo-router";
import { Image } from "react-native";
import HomeModal from "../../components/home/HomeModal";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="market" />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require("../../assets/images/solVEST/solvest-favicon-black.png")}
              alt={"Logo"}
            />
          ),
          headerRight: () => <HomeModal />,
          headerTitle: "",
        }}
      />
      <Tabs.Screen name="myPanels" />
    </Tabs>
  );
};
