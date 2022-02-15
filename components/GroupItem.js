
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import { useNavigation } from '@react-navigation/native';
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";

const GroupItem = (props) => {

  let navigation = useNavigation();
  console.log("Inside GroupItem " + JSON.stringify(props));
  const getItems = async () => {
    console.log("Calling getItems");


    navigation.navigate("Dashboard", { "groupId": props.groupId, "groupName": props.groupName, "groupItems": [] });

  }
  return (
    <View style={styles.item}>
      <TouchableHighlight
        onPress={() => getItems()}
        style={styles.itemDetail}
      >
        <View style={styles.itemDetail}>
          <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>{props.groupName}</CustomText>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  item: GeneralStyles.item,
  itemDetail: {
    flex: 1,
    justifyContent: "space-between",
  },

});

export default GroupItem;