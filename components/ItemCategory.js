import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "./CustomText";

export default function ItemCategory(props) {
  
  return (
    <View style={styles.catagory}>
      <CustomText style={styles.catagoryText}>{props.name}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  catagory:{
  borderRadius:5,
   backgroundColor:"#FCFFA6",
 
   padding:5
  },
  catagoryText:{
  color:"#1A5F7A",
  
  }
});
