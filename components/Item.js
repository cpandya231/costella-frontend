import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ItemCategory from "./ItemCategory";
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";
import Circle from "./Circle";


export default function Item(props) {
  console.log(`Inside item ${JSON.stringify(props)} `)
  return (
    <View style={styles.item}>
      <Circle name={props.name} />
      <View style={styles.itemDetail}>
        <CustomText style={{ fontSize: 18 }}>{props.name}</CustomText>
        <FlatList style={styles.catagoryList} data={props.category}
          renderItem={({ item }) => <ItemCategory name={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.itemAmount}>
        <CustomText style={{ color: "#000", textAlign: "right" }}>{'\u20B9'}{props.amount}</CustomText>
        <Text style={{ fontSize: 12, fontFamily: "Noto Sans Light" }}>Created on: {props.purchaseDate}</Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  item: GeneralStyles.item,
  itemDetail: GeneralStyles.itemDetail,
  itemAmount: {

    justifyContent: "space-evenly",
    height: 50


  },
  catagoryList: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
