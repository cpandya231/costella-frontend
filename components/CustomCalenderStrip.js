import { View, Image, Button, StyleSheet } from "react-native";
import * as React from "react";
import CalendarStrip from 'react-native-calendar-strip';
export default function CustomCalenderStrip(props) {
    const [date, setDate] = React.useState(new Date(Date.now()));

    return (
        <View style={styles.container}>
            <CalendarStrip
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                highlightDateNameStyle={{ color: 'yellow' }}
                style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
                scrollable={true}
                scrollerPaging={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});