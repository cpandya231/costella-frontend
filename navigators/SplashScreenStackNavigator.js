import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreenOne from "../components/splash-screen-components/SplashScreenOne";
import SplashScreenTwo from "../components/splash-screen-components/SplashScreenTwo";
import SplashScreenThree from "../components/splash-screen-components/SplashScreenThree";
import Login from "../components/Login";
const SplashScreenStack = createNativeStackNavigator();

const SplashScreenStackNavigator = () => {

    return (<SplashScreenStack.Navigator screenOptions={{
        headerShown: false,
    }}>


        <SplashScreenStack.Screen name="Splash-1" component={SplashScreenOne} />
        <SplashScreenStack.Screen name="Splash-2" component={SplashScreenTwo} />
        <SplashScreenStack.Screen name="Splash-3" component={SplashScreenThree} />
        <SplashScreenStack.Screen name="Login" component={Login} />



    </SplashScreenStack.Navigator>)


}

export default SplashScreenStackNavigator;