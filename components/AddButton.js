
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from "react-native";
import CustomText from "./CustomText";

export default function AddButton(props) {

  return (
    <TouchableNativeFeedback

      onPress={() => props.onPress()}
    >
      <View style={StyleSheet.compose([styles.addButton, props.style])}>
        <CustomText style={StyleSheet.compose([styles.addButtonText, props.textStyle])}>{props.name}</CustomText>
      </View>


    </TouchableNativeFeedback>

  );
}

const styles = StyleSheet.create({
  addButton: {

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
