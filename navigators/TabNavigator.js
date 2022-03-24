import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardStackkNavigator from './DashboardStackkNavigator';
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import AddExpenseForm from "../components/AddExpenseForm";
import AddExpenseButton from "../components/AddExpenseButton"
import { Ionicons } from '@expo/vector-icons';
import * as groupService from '../services/GroupService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CustomText from '../components/CustomText';
import { Image, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Tab = createBottomTabNavigator();
const TabNavigator = () => {

  let navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {

      const value = await AsyncStorage.getItem('@group_id');


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

  const addExpense = () => {

    navigation.navigate("AddExpenseForm");

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

              } else if (route.name === 'Transactions') {
                iconName = focused ? 'md-cash-sharp' : 'md-cash-outline';

              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: '#11999E',

            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={DashboardStackkNavigator} />
          <Tab.Screen name="AddExpenseButton" component={AddExpenseButton} options={{
            tabBarButton: () => {
              return (
                <TouchableNativeFeedback onPress={() => addExpense()}
                >
                  <Image style={{ height: 60, width: 60, bottom: 30 }} source={require("../assets/add-button-orange.png")}
                  />
                </TouchableNativeFeedback>
              )
            }
          }
          } />
          <Tab.Screen name="Transactions" component={Dashboard} />
          <Tab.Screen name="AddExpenseForm" component={AddExpenseForm} options={{
            tabBarButton: () => null,
            tabBarVisible: false //hide tab bar on this screen

          }} />


        </Tab.Navigator>
      }
    </>
  )
}

export default TabNavigator;