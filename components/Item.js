import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ItemCategory from "./ItemCategory";
export default function Item(props) {

  return (
    <View style={styles.item}>
      <View style={styles.itemDetail}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <FlatList style={styles.catagoryList} data={props.category}
          renderItem={({ item }) => <ItemCategory name={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
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
    borderRadius: 10,


    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFF"
  },
  itemDetail: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemAmount: {
    color: "red",

    width: 30,
  },
  catagoryList: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
