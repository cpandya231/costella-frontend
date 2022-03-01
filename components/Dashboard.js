import {
  StyleSheet,
  View
} from "react-native";
import ListContainer from "./ListContainer";
import AddButton from "./AddButton";

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import * as groupService from "../services/GroupService"
import CustomText from "./CustomText";
import CustomHeader from "./CustomHeader";
import CustomCalenderStrip from "./CustomCalenderStrip";

import { format } from 'date-fns'

const Dashboard = ({ route }) => {
  let navigation = useNavigation();
  const { groupName, groupId } = route.params;
  const [data, setData] = useState(route.params.groupItems);
  const [isLoading, setLoading] = useState(true);



  const [dateObj, setDateObj] = useState({
    date: new Date(Date.now()),
    currentMonth: formattedMonth(new Date(Date.now())),
    selectedDateString: formattedDate(new Date(Date.now())),

  })


  useEffect(() => {
    console.log(`Inside use effect ${dateObj.selectedDateString}`)
    getGroupItems(dateObj.selectedDateString);
  }, []);


  const changeDate = (dateObj) => {

    getGroupItems(dateObj.selectedDateString);
    setDateObj(dateObj);
  }

  const getGroupItems = async (createdDate) => {
    console.log("Getting group items");
    let groupItems = await groupService.getGroupItem(route.params.groupId, createdDate);
    setData(groupItems);
    setLoading(false);
  }

  const addExpense = () => {

    navigation.navigate("AddExpenseForm", { groupId, groupName, "groupItems": data });

  }

  return (

    <>
      {isLoading ? <CustomText>Loading items...</CustomText> :
        <View style={styles.container}>
          <CustomHeader>{groupName}</CustomHeader>

          <CustomCalenderStrip dateObj={dateObj} changeDate={changeDate} />
          <ListContainer data={data} />
          <AddButton onPress={() => addExpense()} name="Add Expense" style={{
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

function formattedDate(date) {
  return format(date, "yyyy-MM-dd")
}

function formattedMonth(date) {
  return format(date, "MMM yyyy");
}