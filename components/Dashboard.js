import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import ListContainer from "./ListContainer";
import { withAuthenticator } from "aws-amplify-react-native";

const Dashboard = (props) => {
  console.log("Inside Dashboard " + props.user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {props.user.username}!</Text>
      <ListContainer />
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => console.log("Pressed")}
      >
        <Image
          source={require("../assets/icons8-add-100.png")}
          style={{ height: 80, width: 80 }}
        />
      </TouchableHighlight>
    </View>
  );
};

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
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default withAuthenticator(Dashboard);
