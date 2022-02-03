import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupStackNavigator from './GroupStackNavigator';
import Settings from "../components/Settings"

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="GroupStackNavigator" component={GroupStackNavigator} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default TabNavigator;