import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";
import CustomText from "./CustomText"
import CustomHeader from "./CustomHeader";
import AddButton from "./AddButton";
import CustomTextInput from "./CustomTextInput";
import GeneralStyles from "../styles/GeneralStyles";

export default function AddGroupForm({ route }) {
    let navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            groupName: ''
        }
    });
    const onSubmit = async (data) => {

        console.log(data);

        let addGroupResponse = await groupService.addGroup(data);

        data["groupId"] = addGroupResponse["groupId"];
        let groups = route.params.groups;
        groups.push(data);
        navigation.navigate("Group", { "username": route.params.username, "groups": groups });

    }


    return (
        <View style={styles.container}>
            <CustomHeader>Create New Group</CustomHeader>
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
                            name="GroupName"
                            label="Group Name"
                            placeholder="eg. Family, Friends" />

                    )}
                    name="groupName"
                />
                {errors.groupName && <CustomText style={styles.error}>This is required.</CustomText>}
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

        padding: 24,
        height: 350,
        justifyContent: "space-evenly"

    },
    error: GeneralStyles.error

});