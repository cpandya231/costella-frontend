import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GroupItem from "./GroupItem";

export default function GroupList(props) {

  console.log("Inside GroupList, data" + JSON.stringify(props.data));
  return (

    <View style={styles.listContainer}>

      <FlatList style={styles.flatListContainer} data={props.data}
        renderItem={({ item }) => <GroupItem {...item} />}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFDDE",

  },
  flatListContainer: {
    marginTop: 40
  }
});
