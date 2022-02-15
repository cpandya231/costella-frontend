import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ItemCategory from "./ItemCategory";
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";

export default function Item(props) {

  return (
    <View style={styles.item}>
      <View style={styles.itemDetail}>
        <CustomText style={{ fontWeight: "bold" }}>{props.name}</CustomText>
        <FlatList style={styles.catagoryList} data={props.category}
          renderItem={({ item }) => <ItemCategory name={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <CustomText style={styles.itemAmount}>{'\u20B9'}{props.amount}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: GeneralStyles.item,
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
