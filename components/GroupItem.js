import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
export default function GroupItem(props) {
  const url = constants.BASE_URL + 'group/item' + props.groupId;

  const getItems = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: JWT_TOKEN
        }
      });
      console.log('Got response from Items api ' + JSON.stringify(response));
      if (response.status == 200) {
        const itemData = await response.json();

      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
    } finally {

    }
  }
  return (
    <View style={styles.item}>
      <TouchableHighlight
        onPress={() => getItems()}
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
