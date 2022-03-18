import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet, View
} from "react-native";
import LineChart from "../analytics/LineChart";
import CustomText from "./CustomText";

import * as groupService from "../services/GroupService"

import { Auth } from "aws-amplify";
import CustomHeader from "./CustomHeader";
import moment from 'moment';
import AddButton from "./AddButton";
import ListContainer from "./ListContainer";
import { ScrollView } from "react-native-gesture-handler";


const AnalyticsDashboard = ({ route }) => {
  const [groupId, setGroupId] = useState("g_f699495c-5e96-4caf-a96b-9efd5fae7247");
  const [selectedDate, setSelectedDate] = useState(formattedDate(new Date()));
  const [selectedFilter, setSelectedFilter] = useState("week");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState({
    name: "",
    data: [],
    totalExpenses: 0,
    topSpending: [],
    selectedFilter: "week",


  })
  useEffect(() => {
    console.log(`Getting current user ${new Date().toLocaleTimeString()}`)

    Auth.currentAuthenticatedUser().then(loggedInUser => {

      analysisData["name"] = loggedInUser.attributes.name;
    }).catch(err => {
      console.log("User has not logged in")
    })

    getGroupItems();

  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getGroupItems();

    setTimeout(() => { setRefreshing(false) }, 2000);

  }, []);


  const setFilter = (str) => {


    setSelectedFilter(str);

  }

  const getGroupItems = async (dateObj) => {


    console.log(`Getting GroupItems ${new Date().toLocaleTimeString()}`)
    let groupItems = await groupService.getGroupItem(groupId, selectedDate, "MONTH");

    const groups = groupDataByFilter();

    let top = [...groupItems].sort((item1, item2) => parseFloat(item2["amount"]) - parseFloat(item1["amount"])).slice(0, 5);



    let selectedItem = (groups.filter((item) => item["weekOfSelectedDate"]));


    console.log(`Adding expenses ${new Date().toLocaleTimeString()}`);
    let totalExpenses = 0;
    groups.forEach((item, index) => totalExpenses += item["expenses"]);


    analysisData["data"] = { "weeks": groups, "selectedItem": selectedItem };
    analysisData["totalExpenses"] = totalExpenses;
    analysisData["topSpending"] = top;



    console.log(`Setting analysisdata ${new Date().toLocaleTimeString()}`);
    setAnalysisData(analysisData);
    setLoading(false);


    function groupDataByFilter() {
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


      console.log(`Grouping items ${new Date().toLocaleTimeString()}`)
      groupItems.reduce((previous, current = []) => {

        const week = getWeekOfMonth(current["purchaseDate"]);
        let aggrgatedItem = previous.filter((itemToFilter) => itemToFilter["week"] == week)[0];
        aggrgatedItem["expenses"] = aggrgatedItem["expenses"] + parseFloat(current["amount"]);

        return previous;

      }, groups);
      return groups;
    }
  }
  return (

    <View style={styles.container}>

      {isLoading ? <CustomText>Loading Dashboard...</CustomText> :


        <ScrollView style={{ flex: 1 }} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

          <CustomHeader>Hi {analysisData.name}!</CustomHeader>
          <CustomText style={styles.expensesText}>Your {getMonthName(selectedDate)} expenses {'\u20B9'}{analysisData.totalExpenses}</CustomText>
          <View style={styles.filterOptions}>
            <AddButton name="Week"
              style={selectedFilter.toLowerCase() == "week" ? styles.activeButton : styles.inActiveButton}
              textStyle={selectedFilter.toLowerCase() == "week" ? styles.activeText : styles.inActiveText}
              onPress={() => {

                setFilter("week");
              }}
            />
            <AddButton name="Month"
              style={selectedFilter.toLowerCase() == "month" ? styles.activeButton : styles.inActiveButton}
              textStyle={selectedFilter.toLowerCase() == "month" ? styles.activeText : styles.inActiveText}
              onPress={() => {

                setFilter("month");
              }}
            />
            <AddButton name="Year"
              style={selectedFilter.toLowerCase() == "year" ? styles.activeButton : styles.inActiveButton}
              textStyle={selectedFilter.toLowerCase() == "year" ? styles.activeText : styles.inActiveText}
              onPress={() =>
                setFilter("year")}
            />
          </View>
          <LineChart data={analysisData.data} />
          <CustomText style={{ fontSize: 20, marginLeft: 24, fontWeight: "bold" }}>Top Spending</CustomText>
          <ListContainer data={analysisData.topSpending}></ListContainer>
        </ScrollView>


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
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },

  filterOptions: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 35
  },
  activeButton: {
    width: 76, height: 35
  },
  activeText: {

  },
  inActiveButton: {
    width: 76,
    height: 35,
    backgroundColor: "#fff",
  },
  inActiveText: {
    color: "#C4C4C4"
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
