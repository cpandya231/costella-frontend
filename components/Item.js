import { useEffect, useState } from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";
import ItemCategory from "./ItemCategory";
export default function Item(props) {
  console.log(props);
  return (
    <View style={styles.item}>
      <View style={styles.itemDetail}>
        <Text style={{fontWeight:"bold"}}>{props.name}</Text>
        <FlatList style={styles.catagoryList} data={props.catagory} renderItem={({ item }) => <ItemCategory name={item} />} />
      </View>

      <Text style={styles.itemAmount}>{'\u20B9'}{props.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemDetail: {
    flex: 1,
    justifyContent:"space-between",
  },
  itemAmount: {
    color: "red",

    width: 30,
  },
  catagoryList:{
    width:"40%",
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
