import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
export default function Home({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => navigation.navigate("Login"), 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Costella</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC900",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    height: 150,
  },
});
