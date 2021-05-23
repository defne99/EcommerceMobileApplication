import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function ForgotPasswordScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../constants/images/back.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>

                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#ffc487"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    address: {
        backgroundColor: "#FF8303",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    payment: {
        backgroundColor: "#FF8303",
        position: "absolute",
        top: 65,
        left:-15,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    edit: {
        backgroundColor: "#FF8303",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#FF8303",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});

export default ForgotPasswordScreen;
