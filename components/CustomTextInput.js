import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import CustomText from "./CustomText"

export default function CustomTextInput(props) {

    let name = props.name;
    let label = props.label;
    let defaultValue = {

    }
    defaultValue[`${props.name}`] = '';

    const { control, formState: { errors } } = useForm({
        defaultValues: defaultValue
    });


    return (

        <>
            <CustomText style={{ fontSize: 18 }}>{label}:</CustomText>
            <TextInput
                style={styles.input}
                onBlur={props.onBlur}
                onChangeText={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
            />
        </>



    );
}

const styles = StyleSheet.create({


    input: {
        backgroundColor: 'rgba(196,196,196,0.2)',

        borderRadius: 5,
        height: 50,
        padding: 16,
        borderRadius: 4,


    }
});