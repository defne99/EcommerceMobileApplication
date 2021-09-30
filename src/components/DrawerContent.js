import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView, Alert,
} from 'react-native';
import Colors from "../constants/Colors";
import DrawerContentItem from "./DrawerContentItem";
import Icon from 'react-native-vector-icons/Ionicons';
import UserNameInput from './UserNameInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './Input';


const DrawerContent = ({route, navigation}) => {
    const [userName, setUserName] = useState("");
    const getUser = () => {
        fetch("http://10.0.2.2:8080/user/getByID?id=" + global.userid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response =>response.json())
            .then(json => {
                global.username = json.name;
                global.mobile = json.mobile;
                console.log(username);

            })
            .catch(error => {
                Alert("Error", "An error has occurred!");
            })

    };
    useEffect(()=>{
        getUser();
    },[]);

    const _handleDrawerNavigate = (pageName) => {
        navigation.navigate(pageName);
    }

    const _handleDrawerNestedNavigate = (nestedName, pageName) => {
        navigation.navigate(nestedName, {screen: pageName});
    }

    if(global.userid === -1){
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.topContainer}>

                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <DrawerContentItem icon="home" menuTitle="Main Page" onPress={() => {
                        _handleDrawerNavigate("Products")
                    }} iconSize={19}/>
                    <DrawerContentItem icon="list" menuTitle="Categories" onPress={() => {
                        _handleDrawerNavigate("Categories")
                    }} iconSize={19}/>

                </ScrollView>

                <View style={styles.bottomContainer}>
                    <View style={[styles.bottomSubContainer,{paddingLeft: 20}]}>
                        <DrawerContentItem icon="sign-in-alt" menuTitle="Sign In" onPress={() => {
                            _handleDrawerNestedNavigate("Auth", "Login")
                        }} iconSize={19}/>
                    </View>
                    <View style={styles.bottomSubContainer}>
                        <DrawerContentItem icon="edit" menuTitle="Sign Up" onPress={() => {
                            _handleDrawerNestedNavigate("Auth", "Register")
                        }} iconSize={19}/>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
    else{
        getUser();
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.topContainer}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                    }}>
                        <View style={{
                            flexDirection:'column',
                        }}>
                            <Icon name="ios-person"
                                  style={{
                                      fontSize:60,
                                      paddingLeft:5,
                                      top:40,
                                      color:Colors.DARK_GRAY

                                  }} />
                        </View>
                        <View style={{
                            flexDirection:'column',
                        }}>
                            <UserNameInput
                                setValue={setUserName}
                                value={global.username}
                            />
                        </View>

                    </View>


                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <DrawerContentItem icon="home" menuTitle="Main Page" onPress={() => {
                        _handleDrawerNavigate("Products")
                    }} iconSize={19}/>
                    <DrawerContentItem icon="list" menuTitle="Categories" onPress={() => {
                        _handleDrawerNavigate("Categories")
                    }} iconSize={19}/>
                    <DrawerContentItem icon="user-alt" menuTitle="My Account" onPress={() => {
                        _handleDrawerNavigate("Profile")
                    }} iconSize={19}/>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <View style={[styles.bottomSubContainer,{paddingLeft: 20}]}>
                        <DrawerContentItem icon="sign-out-alt" menuTitle="Sign Out" onPress={() => {
                            global.userid=-1;
                            _handleDrawerNavigate("Products")
                        }} iconSize={19}/>
                    </View>
                </View>

            </SafeAreaView>
        );

    }



};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.WHITE,
    },
    topContainer: {
        width: "100%",
        height: "20%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.METALIC_GRAY,
        marginBottom: 10
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
        height: "70%",
    },
    bottomContainer: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Colors.METALIC_GRAY
    },
    bottomSubContainer: {
        width: "50%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }
});

export default DrawerContent;
