import { Image, StyleSheet, View } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";


export default function SplashScreenThree({ navigation }) {


  return (

    <View style={styles.container}>
      <Image
        source={require("../../assets/Splashscreen-3.png")}
        style={{ height: 309, width: 329 }}
      />
      <CustomText>Visualize with our
        advanced analytics</CustomText>
      <AddButton onPress={() => navigation.navigate("Login")} name="Get Started" style={styles.addButtom}></AddButton>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtom: {
    position: "absolute",
    right: 26,
    bottom: 33,

  }

});
