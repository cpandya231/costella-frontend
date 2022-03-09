import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";


export default function SplashScreenTwo({ navigation }) {

  const win = Dimensions.get('window');
  return (

    <View style={styles.container}>
      <Image
        source={require("../../assets/Splashscreen-2.png")}
        style={{
          flex: 1,
          alignSelf: 'stretch',
          width: win.width,
          height: win.height,
        }}
      />
      <CustomText>Create different groups
        and split your expenses</CustomText>
      <AddButton onPress={() => navigation.navigate("Splash-3")} name="Next" style={styles.addButtom}></AddButton>
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
