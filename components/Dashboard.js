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
  console.log(JSON.stringify(route));
  const [data, setData] = useState(route.params != undefined ? route.params.groupItems : []);
  const [isLoading, setLoading] = useState(true);



  const [dateObj, setDateObj] = useState({
    date: new Date(Date.now()),
    currentMonth: formattedMonth(new Date(Date.now())),
    selectedDateString: formattedDate(new Date(Date.now())),

  })


  useEffect(() => {

    getGroupItems(dateObj);
  }, []);


  const changeDate = (dateObj) => {
    console.log(`Inside change date ${JSON.stringify(dateObj)}`)
    getGroupItems(dateObj);

  }

  const getGroupItems = async (dateObj) => {

    let groupItems = await groupService.getGroupItem(dateObj.selectedDateString, "DATE");
    setData(groupItems);
    setLoading(false);
    setDateObj(dateObj);
  }

  const addExpense = () => {

    navigation.navigate("AddExpenseForm", { "groupItems": data });

  }

  return (

    <>
      {isLoading ? <CustomText>Loading items...</CustomText> :
        <View style={styles.container}>
          <CustomHeader>Your expenses</CustomHeader>

          <CustomCalenderStrip dateObj={dateObj} changeDate={changeDate} />
          <ListContainer data={filteredData(data, dateObj)} />
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

function filteredData(data, dateObj) {

  return data.filter(item => {

    return item.purchaseDate == dateObj.selectedDateString
  });
}