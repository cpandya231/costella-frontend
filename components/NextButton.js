
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from "react-native";
import CustomText from "./CustomText";
import Arrow from "../assets/RightArrow.svg"
export default function NextButton(props) {

  return (
    <TouchableNativeFeedback

      onPress={() => props.onPress()}
    >
      <View style={StyleSheet.compose([styles.NextButton, props.style])}>
        <Arrow />
      </View>


    </TouchableNativeFeedback>

  );
}

const styles = StyleSheet.create({
  NextButton: {

    borderRadius: 50,
    width: 48,
    height: 48,
    backgroundColor: "#11999E",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    // right: 26,
    // bottom: 33,
    elevation: 5,

  }
});
