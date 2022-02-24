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
import GeneralStyles from "../styles/GeneralStyles";
import CustomText from "./CustomText";
import CustomHeader from "./CustomHeader";
import CustomCalenderStrip from "./CustomCalenderStrip";

const Dashboard = ({ route }) => {
  let navigation = useNavigation();
  const { groupName, groupId } = route.params;
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

    navigation.navigate("AddHisabForm", { groupId, groupName, "groupItems": data });

  }

  return (

    <>
      {isLoading ? <CustomText>Loading items...</CustomText> :
        <View style={styles.container}>
          <CustomHeader>{groupName}</CustomHeader>
          <CustomCalenderStrip style={{ height: 170, marginTop: 20, padding: 10 }} />
          <ListContainer data={data} />
          <AddButton onPress={() => addHisab()} name="Add Expense" style={{
            position: "absolute",
            right: 26,
            bottom: 33
          }}></AddButton>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",


  },


});

export default Dashboard;
