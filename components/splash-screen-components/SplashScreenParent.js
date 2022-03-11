import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import GeneralStyles from '../../styles/GeneralStyles';
import CustomText from '../CustomText';
import DoneButton from '../DoneButton';
import NextButton from "../NextButton";

const slides = [
    {
        key: 1,
        text: 'Costella helps you track your expenses easily',
        image: require("../../assets/Splashscreen-1.png"),
        backgroundColor: '#fff',
    },
    {
        key: 2,
        text: 'Create different groups and split your expenses',
        image: require("../../assets/Splashscreen-2.png"),
        backgroundColor: '#fff',
    },
    {
        key: 3,
        text: 'Visualize with our advanced analytics',
        image: require("../../assets/Splashscreen-3.png"),
        backgroundColor: '#fff',
    }
];

export default function SplashScreenParent({ navigation }) {

    function renderItem({ item }) {
        return (
            <View >

                <Image source={item.image} style={styles.splashScreenImage} />
                <CustomText style={styles.splashScreenText}>{item.text}</CustomText>
            </View>
        );
    }

    function renderSkipButton() {
        return (
            <View style={{
                justifyContent: "center",
                height: 48,
            }}>
                <CustomText style={{ color: "#C4C4C4", }}>Skip</CustomText>
            </View>
        );
    }


    function renderNextButton() {
        return (
            <NextButton />
        );
    }

    function renderDoneButton() {
        return (
            <DoneButton />
        );
    }
    function onDone() {

        navigation.navigate("Login");
    }

    return <AppIntroSlider renderItem={renderItem} data={slides}
        showSkipButton={true}
        renderSkipButton={renderSkipButton}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        onDone={onDone}
        activeDotStyle={{
            backgroundColor: "#11999E"
        }}
        dotStyle={{

            backgroundColor: "rgba(17,153,158,0.3)"
        }}
        bottomButton={true}

    />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",

    },

    skipOrNext: {

        flex: 1,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    splashScreenImage: GeneralStyles.splashScreenImage,
    splashScreenText: GeneralStyles.splashScreenText

});


