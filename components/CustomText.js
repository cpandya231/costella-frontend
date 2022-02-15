import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
export default function CustomText(props) {

    return (

        <Text style={styles.text} {...props} >{props.children}</Text>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFC900",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: 'Noto Sans'
    },
});
