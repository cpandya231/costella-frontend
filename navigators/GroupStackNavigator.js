import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExpenseForm from "../components/AddExpenseForm";
import Dashboard from "../components/Dashboard";
const GroupStack = createNativeStackNavigator();

const GroupStackNavigator = () => {

    return (<GroupStack.Navigator screenOptions={{
        headerShown: false,
    }}>


        <GroupStack.Screen name="Dashboard" component={Dashboard} />
        <GroupStack.Screen name="AddExpenseForm" component={AddExpenseForm} />
        {/* <GroupStack.Screen name="Group" component={Group} options={{ title: 'My Groups' }} />
        <GroupStack.Screen name="GroupItem" component={GroupItem} /> */}

        {/* <GroupStack.Screen name="AddGroupForm" component={AddGroupForm} /> */}



    </GroupStack.Navigator>)


}

export default GroupStackNavigator;