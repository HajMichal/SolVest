import { Tabs } from "expo-router";


export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="market" />     
            <Tabs.Screen name="home" />     
            <Tabs.Screen name="myPanels" />     
        </Tabs>
    )
}
