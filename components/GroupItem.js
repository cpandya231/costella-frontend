
import { StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback } from "react-native";

import { useNavigation } from '@react-navigation/native';
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";
import { generateRandomString } from "@aws-amplify/core";

const GroupItem = (props) => {


  let navigation = useNavigation();
  console.log("Inside GroupItem " + JSON.stringify(props));
  const getItems = async () => {
    console.log("Calling getItems");


    navigation.navigate("Dashboard", { "groupId": props.groupId, "groupName": props.groupName, "groupItems": [] });

  }




  return (
    <TouchableNativeFeedback
      onPress={() => getItems()}

    >
      <View style={styles.item}>

        <View style={
          StyleSheet.compose([{ backgroundColor: stringToColour(props.groupName) }, styles.circle])

        }><CustomText>{props.groupName.charAt(0)}</CustomText></View>
        <View style={styles.itemDetail}>

          <CustomText style={{ fontSize: 18 }}>{props.groupName}</CustomText>
          <Text style={{ fontSize: 12, fontFamily: "Noto Sans Light" }}>Created on: 9 Feb 2022</Text>
        </View>

      </View>
    </TouchableNativeFeedback >
  );
}

var stringToColour = function (str) {
  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]},0.4)`;
}

const styles = StyleSheet.create({
  item: GeneralStyles.item,
  itemDetail: {

    marginLeft: 20,
    flex: 1,
    justifyContent: "space-between",
    height: 50,

  },
  circle: {
    borderRadius: 50,
    width: 48,
    height: 48,
    // backgroundColor: '#E4F9F5',
    alignItems: "center",
    justifyContent: "center"
  }

});

export default GroupItem;