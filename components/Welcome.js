import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import CustomText from "./CustomText";
export default function Welcome({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => navigation.navigate("Login"), 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>Costella</CustomText>
    </View>
  );
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
