import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import * as Linking from "expo-linking";
import MainStackNavigator from "./navigators/MainStackNavigator";
import TabNavigator from "./navigators/TabNavigator";



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
