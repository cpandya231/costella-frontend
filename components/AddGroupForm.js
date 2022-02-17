import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";
import CustomText from "./CustomText"
import CustomHeader from "./CustomHeader";
import AddButton from "./AddButton";

export default function AddGroupForm({ route }) {
    let navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            groupName: ''
        }
    });
    const onSubmit = async (data) => {

        console.log(data);

        let addGroupResponse = await groupService.addGroup(route.params.username, data);
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
                        <>
                            <CustomText style={{ fontSize: 18 }}>Group Name:</CustomText>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="eg. Family, Friends"
                            />
                        </>

                    )}
                    name="groupName"
                />
                {errors.name && <CustomText>This is required.</CustomText>}
                <View style={{ alignItems: "flex-end", marginTop: 47 }}>
                    <AddButton name="Submit" onPress={handleSubmit(onSubmit)} style={styles.submitButton} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 500,
        height: 70,

        borderRadius: 4,
    },
    container: {
        flex: 1,

        backgroundColor: "#fff"

    },
    input: {
        backgroundColor: 'rgba(196,196,196,0.2)',

        borderRadius: 5,
        height: 50,
        padding: 16,
        borderRadius: 4,
        marginTop: 24

    },
    controller: {

        padding: 24,


    },

});