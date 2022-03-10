import { StyleSheet, View, Dimensions, TouchableNativeFeedback } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import NextButton from "../NextButton";
import { useNavigation } from '@react-navigation/native';

export default function SkipOrNext(props) {

  let navigation = useNavigation();
  return (


    <View style={styles.skipOrNext}>

      <TouchableNativeFeedback onPress={() => navigation.navigate("Login")}>
        <View>
          <CustomText style={{ color: "#C4C4C4" }}>Skip</CustomText>
        </View>

      </TouchableNativeFeedback>


      <NextButton onPress={() => navigation.navigate(props.screenName)}></NextButton>

    </View>



  );

}

const styles = StyleSheet.create({


  skipOrNext: {

    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  }

});
