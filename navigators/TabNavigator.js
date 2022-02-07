import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupStackNavigator from './GroupStackNavigator';
import Settings from "../components/Settings"
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        // <Tab.Navigator screenOptions={{
        //     headerShown: false,
        //     tabBarShowLabel: false,
        // }}     >
         <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-sharp'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName =  focused?'settings-sharp':'settings-outline';
              color=focused?'tomato':'gray';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          tabBarInactiveTintColor: 'gray',
           headerShown: false,
        })}
      >
            <Tab.Screen name="Home" component={GroupStackNavigator} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default TabNavigator;