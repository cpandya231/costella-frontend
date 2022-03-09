import { Image, StyleSheet, View, Dimensions } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";
import { SvgUri } from "react-native-svg";
import GeneralStyles from "../../styles/GeneralStyles";
import CustomHeader from "../CustomHeader";

export default function SplashScreenOne({ navigation }) {

  const win = Dimensions.get('window');
  return (

    <View style={styles.container}>

      <Image
        source={require("../../assets/Splashscreen-1.png")}
        style={styles.splashScreenImage}
      />



      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}>
        <CustomHeader>Track your expenses easily</CustomHeader>
        <AddButton onPress={() => navigation.navigate("Splash-2")} name="Next" style={styles.addButtom}></AddButton>
      </View>

    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",

  },
  addButtom: {
    position: "absolute",
    right: 26,
    bottom: 33,

  },
  splashScreenImage: GeneralStyles.splashScreenImage


});
