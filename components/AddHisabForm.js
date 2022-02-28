import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as groupService from "../services/GroupService"
import { useNavigation } from "@react-navigation/core";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import CustomHeader from "./CustomHeader";
import AddButton from "./AddButton";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import GeneralStyles from "../styles/GeneralStyles";



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
            purchaseDate: formattedDate(date)
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
                {errors.name && <CustomText style={styles.error}>This is required.</CustomText>}

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
                {errors.amount && <CustomText style={styles.error}>This is required.</CustomText>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <CustomText style={{ fontSize: 18 }}>Category:</CustomText>
                            <Picker
                                selectedValue={selectedCategory}
                                style={styles.dropdown}
                                itemStyle={{ fontSize: 14, fontFamily: "Noto Sans Light" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    onChange([itemValue]);
                                    setSelectedCategory(itemValue);
                                }

                                }

                            >
                                <Picker.Item label="Grocery" value="Grocery" />
                                <Picker.Item label="Fruits" value="Fruits" />
                            </Picker>
                        </>

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

                            <>
                                <CustomText style={{ fontSize: 18 }}>Purchase Date:</CustomText>
                                <View style={styles.calender}>
                                    <Text style={{ fontSize: 14, fontFamily: "Noto Sans Light" }}>{value}</Text>
                                    <TouchableHighlight onPress={() => setShow(true)}  >
                                        <Image source={require("../assets/icons8-planner-100.png")}
                                            style={{ height: 33, width: 38 }} />
                                    </TouchableHighlight>
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
                                        setShow(false);

                                        if (event.type != 'dismissed') {
                                            setDate(new Date(itemValue))
                                            onChange(formattedDate(new Date(itemValue)))
                                        }

                                    }}
                                />}
                            </>
                        )
                    )}
                    name="purchaseDate"
                />
                {errors.purchaseDate && <CustomText >This is required.</CustomText>}
                <View style={{ alignItems: "flex-end", marginTop: 47 }}>
                    <AddButton name="Submit" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,

        backgroundColor: "#fff"

    },
    controller: {
        height: 600,
        padding: 24,
        justifyContent: "space-evenly"

    },
    calender: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        backgroundColor: 'rgba(196,196,196,0.2)',
        padding: 16
    },
    dropdown: {
        backgroundColor: 'rgba(196,196,196,0.2)',
    },
    error: GeneralStyles.error
});

function formattedDate(date) {
    return format(date, "yyyy-MM-dd")
}
