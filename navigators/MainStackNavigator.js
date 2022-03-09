import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Welcome from "../components/Welcome";
import Login from "../components/Login";
import SplashScreenStackNavigator from "./SplashScreenStackNavigator";
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >

        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SplashScreenNavigator" component={SplashScreenStackNavigator} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>)
}



export default MainStackNavigator;