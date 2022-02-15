import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import { Auth } from "aws-amplify";
import CustomText from "./CustomText";

export default function Settings() {

  const logout = () => {
    Auth.signOut()
  };



  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>Settings screen</CustomText>
      <Button onPress={() => logout()} title="Logout"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    height: 150,
  },
});
