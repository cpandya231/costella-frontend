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


const prefix = Linking.createURL("/");

const isLocalhost = Boolean(
  prefix.startsWith("exp://")
);

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
});


console.log(`In App.js ${prefix}`)
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
