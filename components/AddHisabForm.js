import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import CustomHeader from "./CustomHeader";
import AddButton from "./AddButton";

export default function AddHisabForm({ route }) {
    let navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            itemName: '',
            amount: ''
        }
    });
    const onSubmit = async (data) => {

        console.log(data);
        data["groupId"] = route.params.groupId;
        data['category'] = ["Grocery"];
        data['purchaseDate'] = "27/01/2022";
        let addItemResponse = await groupService.addGroupItem(data);
        let groupItems = route.params.groupItems;
        groupItems.push(data);
        navigation.navigate("Dashboard", { "groupId": route.params.groupId, "groupItems": groupItems });

    }


    return (
        <View style={styles.container}>
            <CustomHeader>Add New Expense</CustomHeader>
            <View style={styles.controller}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            onChange={onChange}
                            onBlur={onBlur}

                            value={value}
                            name="itemName"
                            label="Item Name"
                            placeholder="eg. Oranges, Bananas" />

                    )}
                    name="itemName"
                />
                {errors.itemName && <CustomText>This is required.</CustomText>}

                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            onChange={onChange}
                            onBlur={onBlur}

                            value={value}
                            name="amount"
                            label="Amount"
                            placeholder="" />
                    )}
                    name="amount"
                />

                <View style={{ alignItems: "flex-end", marginTop: 47 }}>
                    <AddButton name="Submit" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,

        backgroundColor: "#fff"

    },
    controller: {
        height: 500,
        padding: 24,
        justifyContent: "space-evenly"

    },
});