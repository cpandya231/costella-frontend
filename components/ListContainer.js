import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Item from "./Item";

export default function ListContainer() {
  const customData = require("../data/hisab-data.json");

  const [data, setData] = useState(customData);
  console.log(data);
  return (
    <View style={styles.listContainer}>
      <FlatList data={data} renderItem={({ item }) => <Item {...item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
});
