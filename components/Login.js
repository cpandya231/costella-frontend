import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => Auth.federatedSignIn({ provider: "Google" })}
        title="Open Google"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
