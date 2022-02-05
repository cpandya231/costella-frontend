
import { StyleSheet, Text, View, FlatList } from "react-native";
export default function NotFound(props) {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>NotFound screen</Text>

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
