import { Image, StyleSheet, View, Dimensions, TouchableNativeFeedback } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import GeneralStyles from "../../styles/GeneralStyles";
import NextButton from "../NextButton";
import skipOrNext from "./SkipOrNext";
import SkipOrNext from "./SkipOrNext";

const win = Dimensions.get('window');
export default function SplashScreenOne({ navigation }) {


  return (

    <View style={styles.container}>

      <Image
        source={require("../../assets/Splashscreen-1.png")}
        style={styles.splashScreenImage}
      />

      {/* <SplashScreenOneSVG /> */}


      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}>
        <CustomText style={styles.splashScreenText}>Costella helps you track your expenses easily</CustomText>
        <SkipOrNext screenName="Splash-2" />
      </View>

    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",

  },

  skipOrNext: {

    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  splashScreenImage: GeneralStyles.splashScreenImage,
  splashScreenText: GeneralStyles.splashScreenText

});
