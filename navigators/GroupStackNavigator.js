import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupItem from "../components/GroupItem";
import AddHisabForm from "../components/AddHisabForm";
import AddGroupForm from "../components/AddGroupForm";
import Dashboard from "../components/Dashboard";
import Group from "../components/Group";

const GroupStack = createNativeStackNavigator();

const GroupStackNavigator = () => {

    return (<GroupStack.Navigator screenOptions={{
        headerShown: false,
    }}>


        <GroupStack.Screen name="Group" component={Group} options={{ title: 'My Groups' }} />
        <GroupStack.Screen name="GroupItem" component={GroupItem} />
        <GroupStack.Screen name="AddHisabForm" component={AddHisabForm} />
        <GroupStack.Screen name="AddGroupForm" component={AddGroupForm} />
        <GroupStack.Screen name="Dashboard" component={Dashboard} />


    </GroupStack.Navigator>)


}

export default GroupStackNavigator;