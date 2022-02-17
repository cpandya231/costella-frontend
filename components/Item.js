import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ItemCategory from "./ItemCategory";
import GeneralStyles from '../styles/GeneralStyles';
import CustomText from "./CustomText";
import Circle from "./Circle";


export default function Item(props) {

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


      <CustomText style={styles.itemAmount}>{'\u20B9'}{props.amount}</CustomText>

    </View>
  );
}

const styles = StyleSheet.create({
  item: GeneralStyles.item,
  itemDetail: GeneralStyles.itemDetail,
  itemAmount: {
    color: "#000",


  },
  catagoryList: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
