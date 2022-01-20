import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hisab</Text>
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
    height: 100,

    fontSize: 40,
  },
});
