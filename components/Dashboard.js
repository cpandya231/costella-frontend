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
import GeneralStyles from "../styles/GeneralStyles";
import CustomText from "./CustomText";

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

    navigation.navigate("AddHisabForm", { "groupId": route.params.groupId, "groupItems": data });

  }

  return (

    <>
      {isLoading ? <CustomText>Loading items...</CustomText> :
        <View style={styles.container}>
          <CustomText style={styles.h1}>{route.params.groupName}</CustomText>
          <ListContainer data={data} />
          <AddButton onPress={() => addHisab()} />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  h1: GeneralStyles.h1,
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants.statusBarHeight,
  },


});

export default Dashboard;
