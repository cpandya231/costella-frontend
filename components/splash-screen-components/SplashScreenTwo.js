import { Image, StyleSheet, View } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import GeneralStyles from "../../styles/GeneralStyles";
import NextButton from "../NextButton";
import SplashScreenTwoSVG from "../../assets/Splashscreen-2.svg"
import { TouchableHighlight } from "react-native-gesture-handler";
import SkipOrNext from "./SkipOrNext";
export default function SplashScreenTwo({ navigation }) {

  return (

    <View style={styles.container}>
      <Image
        source={require("../../assets/Splashscreen-2.png")}
        style={styles.splashScreenImage}
      />


      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}>

        <CustomText style={styles.splashScreenText}>Create different groups
          and split your expenses</CustomText>
        <SkipOrNext screenName="Splash-3" />

      </View>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  addButtom: {
    position: "absolute",
    right: 26,
    bottom: 33,

  },
  splashScreenImage: GeneralStyles.splashScreenImage,
  splashScreenText: GeneralStyles.splashScreenText

});
