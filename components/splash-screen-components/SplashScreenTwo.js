import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";
import GeneralStyles from "../../styles/GeneralStyles";
import CustomHeader from "../CustomHeader";
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
        <CustomHeader>Create different groups
          and split your expenses</CustomHeader>
        <AddButton onPress={() => navigation.navigate("Splash-3")} name="Next" style={styles.addButtom}></AddButton>
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
