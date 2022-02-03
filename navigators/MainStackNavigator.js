import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Home from "../components/Home";
import Login from "../components/Login";
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>)
}



export default MainStackNavigator;