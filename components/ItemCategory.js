import { StyleSheet, View, Text } from "react-native";


export default function ItemCategory(props) {

  return (
    <View style={styles.catagory}>
      <Text style={styles.catagoryText}>{props.name}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  catagory: {
    borderRadius: 20,
    width: 70,

    backgroundColor: "#C4C4C4",

    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  catagoryText: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Noto Sans Light"

  }
});
