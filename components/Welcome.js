import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import CustomText from "./CustomText";
import { Auth } from "aws-amplify";

export default function Welcome({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => navigateBasedOnAuthentication());
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <CustomText style={styles.text}>Costella</CustomText> */}
    </View>
  );

  function navigateBasedOnAuthentication() {
    Auth.currentAuthenticatedUser().then(loggedInUser => {
      navigation.navigate("DrawerNavigator");
    }).catch(err => {
      console.log("User has not logged in");
      navigation.navigate("SplashScreenNavigator");
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    height: 150,
    fontWeight: "bold"
  },
});
