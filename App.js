import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import Home from "./components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "./components/Dashboard";
import Group from "./components/Group";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Login from "./components/Login";
import * as Linking from "expo-linking";
import GroupItem from "./components/GroupItem";
import AddHisabForm from "./components/AddHisabForm";
import AddGroupForm from "./components/AddGroupForm";
import Settings from "./components/Settings";



Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const prefix = Linking.createURL("/");
const config = {
  screens: {
    Group: "loginCallback",
    Login: "logoutCallback",
    NotFound: "*",
  },
};

const GroupStack = createNativeStackNavigator();

function GroupStackScreen() {
  return (<GroupStack.Navigator>


    <GroupStack.Screen name="Group" component={Group} options={{ title: 'My Groups' }} />
    <GroupStack.Screen name="GroupItem" component={GroupItem} />
    <GroupStack.Screen name="AddHisabForm" component={AddHisabForm} />
    <GroupStack.Screen name="AddGroupForm" component={AddGroupForm} />
    <GroupStack.Screen name="Dashboard" component={Dashboard} />


  </GroupStack.Navigator>)


}

const Tab = createBottomTabNavigator();
function TabScreen() {
  <Tab.Navigator>
    <Tab.Screen name="Group" component={GroupStackScreen} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
}


const Stack = createNativeStackNavigator();
function MainStackScreen() {
  return (<Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >

    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="TabsScreen" component={TabScreen} />
  </Stack.Navigator>)
}


const App = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <MainStackScreen />
    </NavigationContainer>
  );
};


export default App;
