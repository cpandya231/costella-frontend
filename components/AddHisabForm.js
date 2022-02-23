import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import CustomHeader from "./CustomHeader";
import AddButton from "./AddButton";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AddHisabForm({ route }) {
    let navigation = useNavigation();
    const { groupName, groupId } = route.params;
    const [selectedCategory, setSelectedCategory] = useState("Grocery");
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            amount: '',
            category: ['Grocery'],
            purchaseDate: date.toDateString()
        }
    });
    const onSubmit = async (data) => {

        console.log(data);
        data["groupId"] = route.params.groupId;

        let addItemResponse = await groupService.addGroupItem(data);
        let groupItems = route.params.groupItems;
        groupItems.push(data);
        navigation.navigate("Dashboard", { groupId, groupName, "groupItems": groupItems });

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
                            name="name"
                            label="Item Name"
                            placeholder="eg. Oranges, Bananas" />

                    )}
                    name="name"
                />
                {errors.name && <CustomText>This is required.</CustomText>}

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
                            name="amount"
                            label="Amount"
                            placeholder="" />
                    )}
                    name="amount"
                />
                {errors.amount && <CustomText>This is required.</CustomText>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue, itemIndex) => {
                                onChange([itemValue]);
                                setSelectedCategory(itemValue);
                            }

                            }>
                            <Picker.Item label="Grocery" value="Grocery" />
                            <Picker.Item label="Fruits" value="Fruits" />
                        </Picker>
                    )}
                    name="category"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (

                        (

                            <View>
                                <View>
                                    <CustomTextInput

                                        onBlur={onBlur}

                                        value={value}
                                        name="purchaseDate"
                                        label="Purchase Date"
                                    />
                                    <Button onPress={() => setShow(true)} title="Show date picker!" />
                                </View>
                                {show && <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    maximumDate={new Date(Date.now())}
                                    onChange={(event, itemValue) => {
                                        console.log(`${JSON.stringify(event)}`)
                                        setShow(false)
                                        if (event.type != 'dismissed') {
                                            onChange(new Date(itemValue).toDateString())
                                        }



                                    }}
                                />}
                            </View>



                        )
                    )}
                    name="purchaseDate"
                />
                {errors.purchaseDate && <CustomText>This is required.</CustomText>}
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