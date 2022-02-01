import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GroupItem from "./GroupItem";
import GeneralStyles from '../styles/GeneralStyles';
export default function GroupList(props) {

  console.log("Inside GroupList, data" + JSON.stringify(props.data));
  return (

    <View style={styles.listContainer}>
      <Text style={styles.h1}>My Groups</Text>
      <FlatList style={styles.flatListContainer} data={props.data}
        renderItem={({ item }) => <GroupItem {...item} />}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  h1: GeneralStyles.h1,
  listContainer: {
    flex: 1,
    marginTop: 40

  },
  flatListContainer: {

  }
});
