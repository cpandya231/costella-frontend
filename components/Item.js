import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Item(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemDetail}>
        <Text>{props.name}</Text>
      </View>

      <Text style={styles.itemAmount}>{props.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemDetail: {
    flex: 1,
  },
  itemAmount: {
    color: "red",

    width: 20,
  },
});
