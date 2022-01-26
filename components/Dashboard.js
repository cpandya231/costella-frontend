import {
  StyleSheet,
  View,

} from "react-native";
import ListContainer from "./ListContainer";
import AddButton from "./AddButton";
import * as groupService from "../services/GroupService"
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({route}) => {
  let navigation=useNavigation();
  console.log("Inside Dashboard "+JSON.stringify(route));


  return (
    <View style={styles.container}>

      <ListContainer data={route.params} />
      <AddButton onPress={()=>console.log("Add button pressed")}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    flex: 1,
    fontSize: 32,
    height: 150,
    color: "#FFC900",
    textAlign: "left",
    padding: 9,
  },
  
});

export default Dashboard;
