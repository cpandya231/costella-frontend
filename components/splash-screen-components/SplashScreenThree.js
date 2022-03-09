import { Image, StyleSheet, View } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";
import GeneralStyles from "../../styles/GeneralStyles";
import CustomHeader from "../CustomHeader";

export default function SplashScreenThree({ navigation }) {


  return (

    <View style={styles.container}>
      <Image
        source={require("../../assets/Splashscreen-3.png")}
        style={styles.splashScreenImage}
      />

      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}>
        <CustomHeader>Visualize with our
          advanced analytics</CustomHeader>
        <AddButton onPress={() => navigation.navigate("Login")} name="Get Started" style={styles.addButtom}></AddButton>
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
  splashScreenImage: GeneralStyles.splashScreenImage

});
