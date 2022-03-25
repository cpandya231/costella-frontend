import {
  StyleSheet,
  View, Image
} from "react-native";
import ListContainer from "./ListContainer";
import AddButton from "./AddButton";

import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from "react";
import * as groupService from "../services/GroupService"
import CustomText from "./CustomText";
import CustomHeader from "./CustomHeader";
import CustomCalenderStrip from "./CustomCalenderStrip";

import { format } from 'date-fns'

const Dashboard = ({ route }) => {
  console.log(`Route ${JSON.stringify(route)}`)
  let navigation = useNavigation();

  const [data, setData] = useState(route.params != undefined ? route.params.groupItems : []);
  const [isLoading, setLoading] = useState(true);



  const [dateObj, setDateObj] = useState({
    date: new Date(Date.now()),
    currentMonth: formattedMonth(new Date(Date.now())),
    selectedDateString: formattedDate(new Date(Date.now())),

  })


  // useEffect(() => {
  //   console.log("Inside useEffect dashboard");
  //   getGroupItems();
  // }, []);


  const changeDate = (changedDateObj) => {
    console.log(`Inside change date ${JSON.stringify(changedDateObj)}`);
    getGroupItems(changedDateObj);

  }

  const getGroupItems = async (changedDateObj) => {

    if (changedDateObj == undefined) {
      changedDateObj = dateObj;
    }
    let groupItems = await groupService.getGroupItem(changedDateObj.selectedDateString, "DATE");
    setData(groupItems);
    setLoading(false);
    setDateObj(changedDateObj);
  }

  const addExpense = () => {

    navigation.navigate("AddExpenseForm", { "groupItems": data });

  }

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect")
      getGroupItems();
    }, []));

  return (

    <>
      {isLoading ? <CustomText>Loading items...</CustomText> :
        <View style={styles.container}>
          <CustomHeader>Your expenses</CustomHeader>

          <CustomCalenderStrip dateObj={dateObj} changeDate={changeDate} />
          {filteredData(data, dateObj).length == 0 ? <View style={{ flex: 5, alignItems: "center", padding: 50 }}>
            <Image source={require("../assets/Businesswoman-thinking.png")}
              style={{ height: 274, width: 272 }} />
            <CustomText style={{ textAlign: "center", fontSize: 16 }}>No expense found, add your first expense for the day </CustomText>
          </View> :
            <ListContainer data={filteredData(data, dateObj)} />}


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

function filteredData(data, dateObj) {

  return data.filter(item => {

    return item.purchaseDate == dateObj.selectedDateString
  });
}