import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Item from "./Item";

export default function ListContainer(props) {
  console.log("Inside ListContainer")
  const customData = props.data;

  const [data, setData] = useState(customData);

  return (
    <View style={styles.listContainer}>
      <FlatList style={styles.flatListContainer} data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 5,
    backgroundColor: "#fff",

  },
  flatListContainer: {
    marginTop: 10
  }
});
