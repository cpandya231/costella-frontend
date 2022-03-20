import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupStackNavigator from './GroupStackNavigator';
import DashboardStackkNavigator from './DashboardStackkNavigator';
import Settings from "../components/Settings"
import { Ionicons } from '@expo/vector-icons';
import * as groupService from '../services/GroupService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CustomText from '../components/CustomText';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {



  const [isLoading, setLoading] = useState(true);





  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {

      const value = await AsyncStorage.getItem('@group_id');
      console.log(`Item from async storage ${value}`);

      if (value !== null) {
        // value previously stored
      } else {

        let groupData = await groupService.getGroups();
        await AsyncStorage.setItem('@group_id', groupData.groupId);
      }
      setLoading(false);

    } catch (e) {
      console.log(`Error occured ${e}`);
    }
  }




  return (

    <>

      {isLoading ? <CustomText>Loading...</CustomText> :
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home-sharp'
                  : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings-sharp' : 'settings-outline';
                color = focused ? 'tomato' : 'gray';
              } else if (route.name === 'Dashboard') {
                iconName = focused ? 'analytics-sharp' : 'analytics-outline';

              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={DashboardStackkNavigator} />
          {/* <Tab.Screen name="Dashboard" component={DashboardStackkNavigator} /> */}
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      }
    </>
  )
}

export default TabNavigator;