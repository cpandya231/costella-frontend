
import { StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback } from "react-native";

import { useNavigation } from '@react-navigation/native';
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";
import { generateRandomString } from "@aws-amplify/core";
import Circle from "./Circle";

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

        <Circle name={props.groupName} />
        <View style={styles.itemDetail}>

          <CustomText style={{ fontSize: 18 }}>{props.groupName}</CustomText>
          <Text style={{ fontSize: 12, fontFamily: "Noto Sans Light" }}>Created on: 9 Feb 2022</Text>
        </View>

      </View>
    </TouchableNativeFeedback >
  );
}


const styles = StyleSheet.create({
  item: GeneralStyles.item,
  itemDetail: GeneralStyles.itemDetail,

});

export default GroupItem;