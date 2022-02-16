import { StyleSheet } from "react-native";
import * as React from "react";
import CustomText from "./CustomText";
export default function CustomHeader(props) {

    return (


        <CustomText style={styles.headerStyle}>{props.children}</CustomText>
    );
}

const styles = StyleSheet.create({

    headerStyle: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 24
    },
});
