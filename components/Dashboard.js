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
import Constants from 'expo-constants';

const Dashboard = ({ route }) => {
  let navigation = useNavigation();
  const [data, setData] = useState(route.params.groupItems);
  const [isLoading, setLoading] = useState(true);



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
    navigation.navigate("AddHisabForm", { "groupId": route.params.groupId, "groupItems": data });

  }

  return (

    <>
      {isLoading ? <Text>Loading items...</Text> :
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
    paddingTop: Constants.statusBarHeight,
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
