import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import SplashScreenParent from "../components/splash-screen-components/SplashScreenParent";
const SplashScreenStack = createNativeStackNavigator();

const SplashScreenStackNavigator = () => {

    return (<SplashScreenStack.Navigator screenOptions={{
        headerShown: false,
    }}>

        <SplashScreenStack.Screen name="Splash" component={SplashScreenParent} />
        <SplashScreenStack.Screen name="Login" component={Login} />



    </SplashScreenStack.Navigator>)


}

export default SplashScreenStackNavigator;