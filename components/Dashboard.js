import { StyleSheet, Text, View,Button,Image,TouchableHighlight } from "react-native";
import ListContainer from "./ListContainer";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Chintan!</Text>
      <ListContainer />
      <TouchableHighlight style={styles.addButton}  onPress={()=>console.log("Pressed")}>
      <Image source={require('../assets/icons8-add-100.png')} style={{height:80,
      width:80}} />
      </TouchableHighlight>
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
  addButton:{
    position:"absolute",
    right:0,
    bottom:0
  }
});
