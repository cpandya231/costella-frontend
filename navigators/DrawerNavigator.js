import React from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Settings from "../components/Settings";
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {



  const defaultOptions = ({ navigation }) => ({
    // headerShown: false,
    headerTransparent: true,
    headerTitle: "",


    headerLeft: () => (null),
    headerRight: () => (
      <TouchableNativeFeedback onPress={() => navigation.openDrawer()} >
        <Image style={{  marginRight: 10 }} source={require("../assets/icons8-hamburger-32.png")}
        />
      </TouchableNativeFeedback>

    ),

  });
  return (

    <Drawer.Navigator initialRouteName="TabNavigator" drawerContent={(props) => <Settings />}
      screenOptions={defaultOptions}


    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />


    </Drawer.Navigator>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});