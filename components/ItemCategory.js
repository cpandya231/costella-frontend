import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ItemCategory(props) {
  
  return (
    <View style={styles.catagory}>
      <Text style={styles.catagoryText}>{props.name}</Text>
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
