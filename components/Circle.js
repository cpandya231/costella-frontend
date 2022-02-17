
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const Circle = (props) => {


  return (


    <View style={
      StyleSheet.compose([{ backgroundColor: stringToColour(props.name) }, styles.circle])

    }><CustomText>{props.name.charAt(0)}</CustomText></View>



  );
}

var stringToColour = function (str) {
  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]},0.4)`;
}

const styles = StyleSheet.create({


  circle: {
    borderRadius: 50,
    width: 48,
    height: 48,
    backgroundColor: '#E4F9F5',
    alignItems: "center",
    justifyContent: "center"
  }

});

export default Circle;