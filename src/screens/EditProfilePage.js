import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';
import PaymentInput from '../components/PaymentInput';
import SmallPaymentInput from '../components/SmallPaymentInput';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function EditProfileScreen({navigation}) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [password, setPassword] = useState("")
    const [Oldpassword, setOldPassword] = useState("")
    const [passwordSecond, setPasswordSecond] = useState("")



    function renderUpdateInfoButton() {
        return <TouchableOpacity
            style={styles.buttonStyle_addtocart}
            onPress={() => OnUpdatePressed()}>
            <Text style={styles.addtocart_TextStyle}>UPDATE</Text>
        </TouchableOpacity>
    }
    function renderUpdatePasswordButton() {
        return <TouchableOpacity
            style={styles.buttonStyle_addtocart}
            onPress={() => onChangePasswordPressed()}>
            <Text style={styles.addtocart_TextStyle}>CHANGE</Text>
        </TouchableOpacity>
    }
    function onChangePasswordPressed() {
        if ( password === "" && passwordSecond === "" ) {
            Alert.alert("Warning", "Please fill the password section");
            return false
        }

        if (password === "") {
            Alert.alert("Warning", "Please enter your password");
            return false
        }
        if (passwordSecond === "") {
            Alert.alert("Warning", "Please verify your password");
            return false
        }

        if (password !== passwordSecond) {
            Alert.alert("Warning", "Passwords do not match");
            return false
        }
        console.log("Girmeden Önce");
        fetch("http://10.0.2.2:8080/user/changePassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:global.mail,
                currentPassword:Oldpassword,
                newPassword:password,
            })
        })
            .then((result1) => {
                if (result1.status===200) {
                    alert("Password has successfully changed");
                    navigation.navigate("Profile");
                }
                else {
                    if (result1.status === 400) {
                        alert("Wrong email!");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            }).catch(error => {
            Alert("Error", "Old password id wrong!!");
        })

    }
    function OnUpdatePressed() {

        fetch("http://10.0.2.2:8080/user/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:global.mail,
                name:userName,
                mobile:userPhoneNumber,
                id: global.userid

            })
        })
            .then((result1) => {
                if (result1.status===200) {
                    navigation.navigate("Profile");
                }
                else {
                    if (result1.status === 400) {
                        alert("Wrong email!");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            })

    }
    return (
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
            <KeyboardAvoidingView behavior="position">
                <View
                    style={{
                        backgroundColor: "#FF8303",
                        height: 60,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        paddingHorizontal: 20,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: 10,
                            width: '100%',
                        }}>
                        <View style={{width: '65%'}}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                }}> Edit Profile</Text>
                        </View>
                    </View>

                </View>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={true}
                    style={{height: 615}}>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:'center',
                        width:"100%",
                    }}>
                        <View style={{
                            width:"90%",
                            backgroundColor:Colors.DARK_MUSTARD,
                            height:160,
                            top:5,
                            borderBottomRightRadius:25,
                            borderBottomLeftRadius:25,
                            borderTopLeftRadius:25,
                            borderTopRightRadius:25

                        }}>
                            <Text style={{
                                color:"#FFF",
                                fontSize:17,
                                marginLeft:10,
                                marginTop:10,
                                fontWeight:'bold',
                                textDecorationLine:'underline',
                            }}>ACCOUNT INFORMATION</Text>
                            <Text style={{
                                color:"#FFF",
                                fontSize:17,
                                marginLeft:10,
                                marginTop:10,
                                fontWeight:'bold'
                            }}>Name&Surname: {global.username}</Text>
                            <Text style={{
                                color:"#FFF",
                                fontSize:17,
                                marginLeft:10,
                                marginTop:10,
                                fontWeight:'bold'
                            }}>User email: {global.mail}</Text>
                            <Text style={{
                                color:"#FFF",
                                fontSize:17,
                                marginLeft:10,
                                marginTop:10,
                                fontWeight:'bold'
                            }}>User Phone Number: {global.mobile}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            width: '100%',
                            alignItems: 'center',
                        }}>
                        <View style={{width: '60%'}}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color:"#FF8303",
                                    top:10,
                                    textDecorationLine:'underline',
                                    bottom:5
                                }}>
                                Edit Profile Information
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        alignItems:'center',

                    }}>
                        <PaymentInput
                            setValue={setUserName}
                            placeholderText="Name&Surname"
                            value={userName}
                            keyboardType='default'
                        />
                        <PaymentInput
                            setValue={setUserEmail}
                            placeholderText="johndoe@gmail.com"
                            value={global.mail}
                        />
                        <PaymentInput
                            setValue={setUserPhoneNumber}
                            placeholderText="Phone Number"
                            value={userPhoneNumber}
                            keyboardType='number-pad'
                        />
                    </View>
                    {renderUpdateInfoButton()}
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            width: '100%',
                            alignItems: 'center',
                        }}>
                        <View style={{width: '60%'}}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color:"#FF8303",
                                    textDecorationLine:'underline',
                                    bottom:10,
                                    top:10
                                }}>
                                Change Password
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        alignItems:'center',

                    }}>
                        <PaymentInput
                            setValue={setOldPassword}
                            placeholderText="Old Password"
                            value={Oldpassword}
                            keyboardType='default'
                            isSecureText={true}
                        />
                        <PaymentInput
                            setValue={setPassword}
                            placeholderText="New Password"
                            value={password}
                            keyboardType='default'
                            isSecureText={true}
                        />
                        <PaymentInput
                            setValue={setPasswordSecond}
                            placeholderText="New Password Again"
                            value={passwordSecond}
                            isSecureText={true}
                        />

                    </View>
                    {renderUpdatePasswordButton()}

                </ScrollView>
            </KeyboardAvoidingView>
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
    buttonStyle_addtocart: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 3,
        left:10,

        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#ff9c33',
    },
    addtocart_TextStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#faf8f8',
    },
});

export default EditProfileScreen;
