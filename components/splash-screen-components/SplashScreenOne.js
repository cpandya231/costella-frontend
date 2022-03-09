import { Image, StyleSheet, View, Dimensions } from "react-native";
import * as React from "react";
import CustomText from "../CustomText";
import AddButton from "../AddButton";
import { SvgUri } from "react-native-svg";


export default function SplashScreenOne({ navigation }) {

  const win = Dimensions.get('window');
  return (

    <View style={styles.container}>

      <View style={{
        flex: 2,


      }}><Image
          source={require("../../assets/Splashscreen-1.png")}
          style={{
            flex: 1,
            alignSelf: 'center',

          }}
        />
      </View>


      <View style={{
        flex: 1,


      }}>
        <CustomText>Track your expenses easily</CustomText>
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

  }

});
