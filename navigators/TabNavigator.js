import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupStackNavigator from './GroupStackNavigator';
import DashboardStackkNavigator from './DashboardStackkNavigator';
import Settings from "../components/Settings"
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
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={DashboardStackkNavigator} />
          <Tab.Screen name="AddExpenseButton" component={AddExpenseButton} options={{
            tabBarButton: () => {
              return (
                <TouchableNativeFeedback onPress={() => addExpense()}>
                  <Image style={{ height: 50, width: 50, bottom: 30 }} source={require("../assets/icons8-add-100.png")}
                  />
                </TouchableNativeFeedback>
              )
            }
          }
          } />
          <Tab.Screen name="Transactions" component={GroupStackNavigator} />

          {/* <Tab.Screen name="Settings" component={Settings} /> */}
        </Tab.Navigator>
      }
    </>
  )
}

export default TabNavigator;