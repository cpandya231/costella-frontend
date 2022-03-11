
import {
  StyleSheet,
  View,
} from "react-native";
import CustomText from "./CustomText";
export default function DoneButton(props) {

  return (

    <View style={StyleSheet.compose([styles.addButton, props.style])}>
      <CustomText style={StyleSheet.compose([styles.addButtonText])}>Get Started</CustomText>
    </View>




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

