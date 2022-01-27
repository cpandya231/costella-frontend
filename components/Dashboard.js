import {
  StyleSheet,
  View,
  Text

} from "react-native";
import ListContainer from "./ListContainer";
import AddButton from "./AddButton";

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import * as groupService from "../services/GroupService"
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ route }) => {
  let navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  console.log("Inside Dashboard " + JSON.stringify(route));


  useEffect(() => {
    getGroupItems();
  }, []);



  const getGroupItems = async () => {
    let groupItems = await groupService.getGroupItem(route.params.groupId);
    setData(groupItems);
    setLoading(false);
  }

  const addHisab = () => {
    console.log("Add button pressed");
    navigation.navigate("AddHisabForm", { "groupId": route.params.groupId });

  }

  return (

    <>
      {isLoading ? <Text>Loading Groups...</Text> :
        <View style={styles.container}>
          <ListContainer data={data} />
          <AddButton onPress={() => addHisab()} />
        </View>
      }
    </>
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
