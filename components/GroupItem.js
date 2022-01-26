import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import * as groupService from '../services/GroupService'
import { useNavigation } from '@react-navigation/native';

const GroupItem=(props)=> {
   let navigation=useNavigation();
  console.log("Inside GroupItem " + JSON.stringify(props));
  const getItems = async () => {
    console.log("Calling getItems");
    let groupItems = await groupService.getGroupItem(props.groupId);
 
    navigation.navigate("Dashboard", groupItems);

  }
  return (
    <View style={styles.item}>
      <TouchableHighlight
        onPress={() => getItems()}
        style={styles.itemDetail}
      >
        <View style={styles.itemDetail}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.groupName}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 10,
    marginBottom: 10,


    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFF"
  },
  itemDetail: {
    flex: 1,
    justifyContent: "space-between",
  },

});

export default GroupItem; 