import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView
} from "react-native";
import Colors from "../constants/Colors";
import DrawerContentItem from "./DrawerContentItem";


const DrawerContent = ({route, navigation}) => {

    const _handleDrawerNavigate = (pageName) => {
        navigation.navigate(pageName);
    }

    const _handleDrawerNestedNavigate = (nestedName, pageName) => {
        navigation.navigate(nestedName, {screen: pageName});
    }


    return (
        <SafeAreaView style={styles.container}>
            {}

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <DrawerContentItem icon="home" menuTitle="Main Page" onPress={() => {
                    _handleDrawerNavigate("Products")
                }} iconSize={19}/>
                <DrawerContentItem icon="list" menuTitle="Categories" onPress={() => {
                    _handleDrawerNavigate("Categories")
                }} iconSize={19}/>
                <DrawerContentItem icon="sign-in-alt" menuTitle="Login" onPress={() => {
                    _handleDrawerNestedNavigate("Auth", "Login")
                }} iconSize={19}/>
                <DrawerContentItem icon="edit" menuTitle="Register" onPress={() => {
                    _handleDrawerNestedNavigate("Auth", "Register")
                }} iconSize={19}/>
            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.WHITE,
    },
    topImagePart: {
        width: "100%",
        height: "25%",
        marginBottom: 10
    },
    imageBackgroundStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    ImageBackgroundContentWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(60,100,150,0.9)",
        flexDirection: "row"
    },
    contentLeftSide: {
        width: "35%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    contentRightSide: {
        width: "65%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        backgroundColor: Colors.WHITE,
        resizeMode: "cover"
    },
    nameText: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        color: Colors.WHITE
    },
    emailText: {
        width: "100%",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "left",
        color: Colors.WHITE
    },
    scrollViewContainer: {
        width: "100%",
        height: "75%",
    }
});

export default DrawerContent;
