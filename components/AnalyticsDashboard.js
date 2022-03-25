import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
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

  const [selectedDate, setSelectedDate] = useState(formattedDate(new Date()));
  const [selectedFilter, setSelectedFilter] = useState("MONTH");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState({
    name: "",
    data: [],
    totalExpenses: 0,
    topSpending: [],
    maxExpense: 0


  });

  useEffect(() => {

    console.log(`Getting current user ${new Date().toLocaleTimeString()}`)

    Auth.currentAuthenticatedUser().then(loggedInUser => {

      analysisData["name"] = loggedInUser.attributes.name;
    }).catch(err => {
      console.log("User has not logged in")
    })
    // getGroupItems(selectedFilter);

  }, []);

  useFocusEffect(

    useCallback(() => {
      setLoading(true);
      getGroupItems(selectedFilter);

    }, [analysisData]));


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getGroupItems("MONTH");

    setTimeout(() => { setRefreshing(false) }, 2000);

  }, []);


  const setFilter = (str) => {

    console.log(`Selected filter ${str.toUpperCase()}`);
    getGroupItems(str.toUpperCase());

    // getGroupItems();

  }

  const getGroupItems = async (filter) => {

    let maxExpense = Number.MIN_SAFE_INTEGER;

    console.log(`Getting GroupItems ${new Date().toLocaleTimeString()}`)
    let groupItems = await groupService.getGroupItem(selectedDate, filter);

    if (groupItems.length == 0) {
      analysisData["data"] = [];
      analysisData["totalExpenses"] = 0;
      analysisData["topSpending"] = 0;
      analysisData["maxExpense"] = 0;
      setAnalysisData(analysisData);
      setLoading(false);
      return;
    }

    console.log(`Items from DB ${JSON.stringify(groupItems)}`);
    const groups = groupDataByFilter();

    let top = [...groupItems].sort((item1, item2) => parseFloat(item2["amount"]) - parseFloat(item1["amount"])).slice(0, 5);



    let selectedItem = (groups.filter((item) => item["selectedItem"]));


    console.log(`Adding expenses ${new Date().toLocaleTimeString()}`);
    let totalExpenses = 0;
    groups.forEach((item, index) => totalExpenses += item["expenses"]);


    analysisData["data"] = { "groups": groups, "selectedItem": selectedItem };
    analysisData["totalExpenses"] = totalExpenses;
    analysisData["topSpending"] = top;
    analysisData["maxExpense"] = maxExpense;


    console.log(`Setting analysisdata ${new Date().toLocaleTimeString()}`);
    setAnalysisData(analysisData);
    setLoading(false);

    setSelectedFilter(filter);


    function groupDataByFilter() {
      console.log(`Grouping items  ${new Date().toLocaleTimeString()}`)
      const groups = [];
      switch (filter) {
        case "WEEK":
          groupByWeek();
          break;
        case "YEAR":
          groupByMonth()
          break;
        default:
          groupByWeek();
      }

      console.log(`Grouped items ${JSON.stringify(groups)}`);


      return groups;

      function groupByWeek() {

        let weekOfSelectedDate = getWeek(selectedDate);
        for (let i = 0; i < 6; i++) {
          let week = `Week ${i + 1}`;
          let initialItem = { "item": week, "expenses": 0, "selectedItem": false, "itemIndex": i + 1 };
          if (week == weekOfSelectedDate) {
            initialItem["selectedItem"] = true;
          }

          groups.push(initialItem);
        }
        groupItems.reduce((previous, current = []) => {

          const week = getWeek(current["purchaseDate"]);
          let aggrgatedItem = previous.filter((itemToFilter) => itemToFilter["item"] == week)[0];
          aggrgatedItem["expenses"] = aggrgatedItem["expenses"] + parseFloat(current["amount"]);
          if (aggrgatedItem["expenses"] > maxExpense) {
            maxExpense = aggrgatedItem["expenses"];
          }
          return previous;

        }, groups);
      }

      function groupByMonth() {
        console.log(`Grouping by month`)
        let selectedMonth = getMonthName(selectedDate);
        let months = moment.months();

        for (let [i, month] of months.entries()) {

          let initialItem = { "item": month, "expenses": 0, "selectedItem": false, "itemIndex": i + 1 };
          if (month == selectedMonth) {
            initialItem["selectedItem"] = true;
          }
          groups.push(initialItem);
        }



        groupItems.reduce((previous, current = []) => {


          const month = getMonthName(current["purchaseDate"]);
          let aggrgatedItem = previous.filter((itemToFilter) => itemToFilter["item"] == month)[0];
          aggrgatedItem["expenses"] = aggrgatedItem["expenses"] + parseFloat(current["amount"]);

          if (aggrgatedItem["expenses"] > maxExpense) {
            maxExpense = aggrgatedItem["expenses"];
          }
          return previous;

        }, groups);
      }
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
          <CustomText style={styles.expensesText}>Your {selectedFilter.toUpperCase() == "MONTH" ? getMonthName(selectedDate) : 'Total'} expenses {'\u20B9'}{analysisData.totalExpenses}</CustomText>
          {analysisData.data.length == 0 ? <View style={{ flex: 5, alignItems: "center", padding: 50 }}>
            <Image source={require("../assets/No-data-for-analytics.png")}
              style={{ height: 400, width: 400 }} />
            <CustomText style={{ textAlign: "center", fontSize: 18 }}>New to Costella? Start by adding your first expense </CustomText>
          </View> :
            <View>
              <View style={styles.filterOptions}>
                <AddButton name="Week"
                  style={selectedFilter == "MONTH" ? styles.activeButton : styles.inActiveButton}
                  textStyle={selectedFilter == "MONTH" ? styles.activeText : styles.inActiveText}
                  onPress={() => {

                    setFilter("MONTH");
                  }}
                />
                <AddButton name="Month"
                  style={selectedFilter == "YEAR" ? styles.activeButton : styles.inActiveButton}
                  textStyle={selectedFilter == "YEAR" ? styles.activeText : styles.inActiveText}
                  onPress={() => {

                    setFilter("YEAR");
                  }}
                />
                {/* <AddButton name="Year"
              style={selectedFilter.toLowerCase() == "year" ? styles.activeButton : styles.inActiveButton}
              textStyle={selectedFilter.toLowerCase() == "year" ? styles.activeText : styles.inActiveText}
              onPress={() =>
                setFilter("year")}
            /> */}
              </View>
              <LineChart data={analysisData} />
              <CustomText style={{ fontSize: 20, marginLeft: 24, fontWeight: "bold" }}>Top Spending</CustomText>
              <ListContainer data={analysisData.topSpending}></ListContainer>
            </View>}

        </ScrollView>


      }
    </View >
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",


  },
  expensesText: {
    marginLeft: 24,
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

function getWeek(dateStr) {
  let date = new Date(dateStr);
  let adjustedDate = date.getDate();

  let prefixes = ['0', '1', '2', '3', '4', '5'];
  let finalWeek = "Week " + (parseInt(prefixes[0 | adjustedDate / 7]) + 1);;

  return finalWeek;
}



function getMonthName(dateStr) {
  var check = moment(dateStr, 'YYYY-MM-DD');
  return check.format("MMMM");
}

export default AnalyticsDashboard;
