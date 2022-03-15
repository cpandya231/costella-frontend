import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  StyleSheet, View
} from "react-native";
import LineChart from "../analytics/LineChart";
import CustomText from "./CustomText";

import * as groupService from "../services/GroupService"

import { Auth } from "aws-amplify";
import CustomHeader from "./CustomHeader";
import moment from 'moment';


const AnalyticsDashboard = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [groupId, setGroupId] = useState("g_f699495c-5e96-4caf-a96b-9efd5fae7247");
  const [selectedDate, setSelectedDate] = useState("2022-03-06");
  const [name, setName] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(loggedInUser => {

      setName(loggedInUser.attributes.name)
    }).catch(err => {
      console.log("User has not logged in")
    })

    getGroupItems();

  }, []);


  const getGroupItems = async (dateObj) => {

    let groupItems = await groupService.getGroupItem(groupId, selectedDate, "MONTH");

    const groups = [];
    let weekOfSelectedDate = getWeekOfMonth(selectedDate);
    for (let i = 0; i < 6; i++) {
      let week = `Week ${i}`;
      let initialItem = { "week": week, "expenses": 0, "weekOfSelectedDate": false };
      if (week == weekOfSelectedDate) {
        initialItem["weekOfSelectedDate"] = true;
      }
      groups.push(initialItem);
    }


    let reducedItems = groupItems.reduce((previous, current = []) => {

      const week = getWeekOfMonth(current["purchaseDate"]);
      let aggrgatedItem = previous.filter((itemToFilter) => itemToFilter["week"] == week)[0]
      aggrgatedItem["expenses"] = aggrgatedItem["expenses"] + parseInt(current["amount"]);

      return previous;

    }, groups);

    let selectedItem = (groups.filter((item) => item["weekOfSelectedDate"]));

    console.log(JSON.stringify(groups));
    let totalExpenses = 0;
    groups.forEach((item, index) => totalExpenses += item["expenses"]);

    setData({ "weeks": groups, "selectedItem": selectedItem })
    setTotalExpenses(totalExpenses);
    setLoading(false);
  }

  return (

    <View style={styles.container}>
      {isLoading ? <CustomText>Loading Groups...</CustomText> :
        <>
          <CustomHeader>Hi {name}!</CustomHeader>
          <CustomText style={styles.expensesText}>Your {getMonthName(selectedDate)} expenses {'\u20B9'}{totalExpenses}</CustomText>
          <LineChart data={data} /></>
      }
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",


  },
  expensesText: {
    textAlign: "center"
  }


});

function formattedDate(date) {
  return format(date, "yyyy-MM-dd")
}

function getWeekOfMonth(dateStr) {
  let date = new Date(dateStr);
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ['0', '1', '2', '3', '4', '5'];
  return "Week " + (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
}

function getMonthName(dateStr) {
  var check = moment(dateStr, 'YYYY-MM-DD');
  return check.format("MMMM");
}

export default AnalyticsDashboard;
