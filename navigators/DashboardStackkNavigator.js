import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnalyticsDashboard from "../components/AnalyticsDashboard"
const DashboardStack = createNativeStackNavigator();

const DashboardStackkNavigator = () => {

    return (<DashboardStack.Navigator screenOptions={{
        headerShown: false,
    }}>

        <DashboardStack.Screen name="AnalyticsDashboard" component={AnalyticsDashboard} />

    </DashboardStack.Navigator>)


}

export default DashboardStackkNavigator;