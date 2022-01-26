
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";

export default function AddButton(props) {
  
  return (<>
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => props.onPress()}
      >
        <Image
          source={require("../assets/icons8-add-100.png")}
          style={{ height: 80, width: 80 }}
        />
      </TouchableHighlight>
      </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
