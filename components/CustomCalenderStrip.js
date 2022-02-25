import { View, StyleSheet, } from "react-native";
import React from "react";
import CalendarStrip from 'react-native-calendar-strip';

export default function CustomCalenderStrip(props) {
    console.log(props.selectedDateString)


    return (
        <View style={styles.container}>
            <CalendarStrip
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                highlightDateNumberStyle={{ color: '#F3A100' }}
                highlightDateNameStyle={{ color: '#F3A100' }}
                style={{ height: 100, fontFamily: "Noto Sans", fontSize: 18 }}
                scrollable={true}
                scrollerPaging={true}
                selectedDate={props.selectedDateString}
                showMonth={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

