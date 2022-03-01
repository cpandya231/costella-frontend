import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import React, { useState } from "react";
import CalendarStrip from 'react-native-calendar-strip';
import { format } from 'date-fns';
import CustomText from "./CustomText";
import DateTimePicker from '@react-native-community/datetimepicker';
export default function CustomCalenderStrip(props) {

    const [show, setShow] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(props.dateObj.currentMonth)

    return (
        <>
            <TouchableNativeFeedback onPress={() => setShow(true)}>
                <View style={{ alignItems: "center", marginTop: 15 }} >
                    <CustomText style={{ fontWeight: "bold" }}>{currentMonth}</CustomText>
                </View>



            </TouchableNativeFeedback>
            {show && <DateTimePicker
                testID="dateTimePicker"
                value={props.dateObj.date}
                mode={'date'}
                is24Hour={true}
                display="default"
                maximumDate={new Date(Date.now())}
                onChange={(event, itemValue) => {
                    console.log(`${JSON.stringify(event)}`)
                    setShow(false)

                    if (event.type != 'dismissed') {
                        console.log(itemValue)
                        props.changeDate({
                            date: new Date(itemValue),
                            currentMonth: formattedMonth(new Date(itemValue)),
                            selectedDateString: formattedDate(new Date(itemValue))
                        });

                    }

                }}
            />}
            <View style={styles.container}>
                <CalendarStrip
                    dateNumberStyle={{ color: 'black' }}
                    dateNameStyle={{ color: 'black' }}
                    highlightDateNumberStyle={{ color: '#F3A100' }}
                    highlightDateNameStyle={{ color: '#F3A100' }}
                    style={{ height: 100, fontFamily: "Noto Sans", fontSize: 18 }}
                    scrollable={true}
                    scrollerPaging={true}
                    selectedDate={props.dateObj.selectedDateString}
                    showMonth={false}
                    maxDate={formattedDate(new Date(Date.now()))}
                    onDateSelected={(itemValue) => {
                        console.log(`Selected date ${formattedDate(new Date(itemValue))}`);
                        props.changeDate({
                            date: new Date(itemValue),
                            currentMonth: formattedMonth(new Date(itemValue)),
                            selectedDateString: formattedDate(new Date(itemValue))
                        });
                    }}

                    onWeekChanged={(start, end) => {

                        setCurrentMonth(formattedMonth(new Date(end)))
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

function formattedDate(date) {
    return format(date, "yyyy-MM-dd")
}

function formattedMonth(date) {
    return format(date, "MMM yyyy");
}