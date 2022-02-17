
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import CustomText from "./CustomText";

export default function AddButton(props) {

  return (<>
    <TouchableHighlight

      onPress={() => props.onPress()}
    >
      <View style={styles.addButton}>
        <CustomText style={styles.addButtonText}>{props.name}</CustomText>
      </View>


    </TouchableHighlight>
  </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 26,
    bottom: 33,
    width: 134,
    height: 46,
    backgroundColor: "#11999E",

    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  addButtonText: {


    color: "#fff",
    fontSize: 18
  }
});
