import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";

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
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="groupName"
            />
            {errors.name && <Text>This is required.</Text>}
            <Button style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)} />
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
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        padding: 8,
        paddingTop: Constants.statusBarHeight,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 100,
        height: 40,
        padding: 10,
        borderRadius: 4,

        marginBottom: 10
    },
});