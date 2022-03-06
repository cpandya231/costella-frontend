import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  StyleSheet
} from "react-native";
import { View } from "react-native-web";
import LineChart from "../analytics/LineChart";
import CustomText from "./CustomText";
import moment from 'moment';

import * as groupService from "../services/GroupService"

const AnalyticsDashboard = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [groupId, setGroupId] = useState("g_f699495c-5e96-4caf-a96b-9efd5fae7247");
  const [selectedDate, setSelectedDate] = useState("2022-03-06");
  useEffect(() => {
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


    setData({ "weeks": groups, "selectedItem": selectedItem })
    setLoading(false);

  }

  return (

    <>
      {isLoading ? <CustomText>Loading Groups...</CustomText> :
        <LineChart data={data} />}
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",


  },


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

export default AnalyticsDashboard;
