import { StyleSheet, View, TouchableNativeFeedback, Image } from "react-native";
import * as React from "react";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";

export default function AddEXpenseButton() {

  let navigation = useNavigation();


  return (
    <TouchableNativeFeedback

      onPress={() => props.onPress()}
    >
      <View >
        <Image source={require("../assets/icons8-add-100.png")}></Image>
      </View>


    </TouchableNativeFeedback>

  );
}

const styles = StyleSheet.create({
  addButton: {

    width: 134,
    height: 46,
    backgroundColor: "#11999E",

    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  addButtonText: {


    color: "#fff",
    fontSize: 18
  }
});