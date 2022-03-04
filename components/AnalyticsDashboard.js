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
  useEffect(() => {
    getGroupItems();
  }, []);


  const getGroupItems = async (dateObj) => {

    let groupItems = await groupService.getGroupItem(groupId, "2022-02-04", "MONTH");
    console.log(`groupItems : ${JSON.stringify(groupItems)} in analytics`)
    const groups = groupItems.reduce((previous, current = []) => {
      console.log(`Acc :${JSON.stringify(previous)}`)
      // create a composed key: 'year-week' 
      const week = `${moment(current["purchaseDate"]).week()}`;
      console.log(`Week num :${week}`)
      // add this key as a property to the result object

      let aggrgatedItem = previous.filter((itemToFilter) => itemToFilter["week"] == week)[0]
      console.log(`aggrgatedItem :${JSON.stringify(aggrgatedItem)}`)
      if (aggrgatedItem == undefined) {
        aggrgatedItem = { "week": week, "expenses": parseInt(current["amount"]) };
        previous.push(aggrgatedItem);
      } else {
        aggrgatedItem["expenses"] = aggrgatedItem["expenses"] + parseInt(current["amount"]);
      }

      // push the current date that belongs to the year-week calculated befor


      return previous;

    }, []);

    console.log(`Grouped items :${JSON.stringify(groups)}`)
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

export default AnalyticsDashboard;
