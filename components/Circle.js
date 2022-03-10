
import { StyleSheet, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
import CustomText from "./CustomText";

const Circle = (props) => {


  return (


    <View style={styles.circle} {...props}

    ><CustomText>{props.name.charAt(0)}</CustomText></View>



  );
}



const styles = StyleSheet.create({


  circle: GeneralStyles.circle

});

export default Circle;