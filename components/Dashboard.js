import { StyleSheet, Text, View } from "react-native";
import ListContainer from "./ListContainer";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Chintan!</Text>
      <ListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    flex: 1,
    fontSize: 32,
    height: 150,
    color: "#FFC900",
    textAlign: "left",
    padding: 9,
  },
});
