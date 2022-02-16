import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import * as Linking from "expo-linking";
import MainStackNavigator from "./navigators/MainStackNavigator";
import TabNavigator from "./navigators/TabNavigator";
import CustomText from "./components/CustomText";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const prefix = Linking.createURL("/");
const config = {
  screens: {
    TabNavigator: {

      screens: {
        Group: "loginCallback",
      }
    },
    Login: "logoutCallback",
    NotFound: "*",
  }
}

const App = () => {

  let [fontsLoaded] = useFonts({
    'Noto Sans': require('./assets/fonts/NotoSansDisplay-Regular.ttf'),
    'Noto Sans Light': require('./assets/fonts/NotoSansDisplay-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};


export default App;
