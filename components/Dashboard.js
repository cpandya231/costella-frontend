import {
  StyleSheet,
  View, Image, TouchableNativeFeedback
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
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    getGroupItems();
  }, []);



  const getGroupItems = async () => {
    let groupItems = await groupService.getGroupItem(route.params.groupId, dateObj.selectedDateString);
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
          <TouchableNativeFeedback onPress={() => setShow(true)}>
            <View style={{ alignItems: "center", marginTop: 15 }} >
              <CustomText style={{ fontWeight: "bold" }}>{dateObj.currentMonth}</CustomText>
            </View>



          </TouchableNativeFeedback>


          <CustomCalenderStrip selectedDateString={dateObj.selectedDateString} />
          <ListContainer data={data} />
          <AddButton onPress={() => addHisab()} name="Add Expense" style={{
            position: "absolute",
            right: 26,
            bottom: 33
          }}></AddButton>

          {show && <DateTimePicker
            testID="dateTimePicker"
            value={dateObj.date}
            mode={'date'}
            is24Hour={true}
            display="default"
            maximumDate={new Date(Date.now())}
            onChange={(event, itemValue) => {
              console.log(`${JSON.stringify(event)}`)
              setShow(false)

              if (event.type != 'dismissed') {
                setDateObj({
                  date: new Date(itemValue),
                  currentMonth: formattedMonth(new Date(itemValue)),
                  selectedDateString: formattedDate(new Date(itemValue))
                });

              }

            }}
          />}
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