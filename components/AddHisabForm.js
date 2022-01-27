import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";

export default function AddHisabForm({ route }) {
    let navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
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
                name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="amount"
            />

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