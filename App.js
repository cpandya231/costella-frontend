import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./components/Dashboard";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Login from "./components/Login";
import * as Linking from "expo-linking";
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const prefix = Linking.createURL("/");
const config = {
  screens: {
    Dashboard: "loginCallback",
    Login: "logoutCallback",
    NotFound: "*",
  },
};

const Stack = createNativeStackNavigator();

const App = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
