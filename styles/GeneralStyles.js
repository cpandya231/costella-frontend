import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');
export default GeneralStyles = {
    item: {
        height: 100,
        padding: 20,

        borderRadius: 10,
        flexDirection: "row",

        alignItems: "center",
        backgroundColor: "#FFF",


        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'

    },
    itemDetail: {

        marginLeft: 20,
        flex: 1,
        justifyContent: "space-between",
        height: 55,

    },

    h1: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10
    },
    error: {
        color: "red"
    },
    splashScreenImage: {
        flex: 2,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height,

    }
};

