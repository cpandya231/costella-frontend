import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (

    <Drawer.Navigator initialRouteName="TabNavigator" drawerContent={(props) => <Settings />}>
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