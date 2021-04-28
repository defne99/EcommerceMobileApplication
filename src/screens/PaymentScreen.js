import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    TextInput,
    Image, Alert,
} from 'react-native';
import PaymentInput from "../components/PaymentInput";
import AddressInput from '../components/AddressInput';
import Input from '../components/Input';
import SmallPaymentInput from '../components/SmallPaymentInput';
import OpenAddressInput from '../components/OpenAddressInput';
import AsyncStorage from '@react-native-async-storage/async-storage';


function PaymentScreen(props){
    const {navigation} = props;
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardType, setCreditCardType] = useState("");
    const [creditCardName, setCreditCardName] = useState("");
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [AddressType, setAddressType] = useState("");
    const [OpenAddress, setOpenAddress] = useState("");
    const [userEmail, setUserEmail] = useState("");

    function renderSaveButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onSavePressed()}>
            <Text style={styles.buy_TextStyle}>BUY</Text>
        </TouchableOpacity>
    }
    function onSavePressed() {
        if(creditCardNumber.length !== 12){
            Alert.alert("Warning", "Invalid Credit Card Number")
        }
        if(creditCardExpirationDate.length !== 5){
            Alert.alert("Warning", "Invalid Expiration Date")
        }
        if(creditCardCVC.length !== 3){
            Alert.alert("Warning", "Invalid CVC Number")
        }
        if(creditCardType !== "MasterCard" ||creditCardType !== "Visa"||creditCardType !== "PayPal"||creditCardType !== "Master Card" ){
            Alert.alert("Warning", "Invalid Card Type")
        }
        fetch("", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail,
                creditCardName,
                creditCardCVC,
                creditCardNumber,
                creditCardType,
                creditCardExpirationDate,
            })
        })
            .then((result1) => {
                console.log(result1)
            }).catch(error1 => {
            console.warn(error1)
            Alert.alert("Warning", "Please check your information")
        })
        fetch("", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                AddressType,
                Country,
                City,
                PostalCode,
                OpenAddress,
            })
        })
            .then((result2) => {
                console.log(result2)
            }).catch(error2 => {
            console.warn(error2)
            Alert.alert("Warning", "Please check your information")
        })
        fetch("http://localhost:8080/cart/buy?userId={userId}", {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },

        })
            .then((result3) => {
                console.log(result3)
            }).catch(error3 => {
            console.warn(error3)
            Alert.alert("Warning", "Please check your information")
        })

        navigation.navigate("Products");
    }
    return(
        <SafeAreaView>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 665}}>
                <View style={{
                    backgroundColor: '#FF8303',
                    height: 80,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            width: '100%',
                        }}>
                        <View style={{width: '80%', alignItems: 'flex-start'}}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                paddingLeft:12,
                                marginVertical:5,
                                color:"white"
                            }}>Credit Card Information</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    alignItems:'center'
                }}>
                    <PaymentInput
                        setValue={setUserEmail}
                        placeholderText="Email Address"
                        value={userEmail}
                    />
                    <PaymentInput
                        setValue={setCreditCardType}
                        placeholderText="Credit Card Type"
                        value={creditCardType}
                    />
                    <PaymentInput
                        setValue={setCreditCardNumber}
                        placeholderText="Credit Card Number"
                        value={creditCardNumber}
                    />
                    <PaymentInput
                        setValue={setCreditCardName}
                        placeholderText="Name-Surname"
                        value={creditCardName}
                    />
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginHorizontal:5,
                        paddingHorizontal:5

                    }}>
                        <SmallPaymentInput
                            setValue={setCreditCardExpirationDate}
                            placeholderText="Expiration Date"
                            value={creditCardExpirationDate}
                        />

                        <SmallPaymentInput
                            setValue={setCreditCardCVC}
                            placeholderText="CVC"
                            value={creditCardCVC}
                        />

                    </View>

                    <View style={{
                        backgroundColor: '#FF8303',
                        height: 80,
                        width:400,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        paddingHorizontal: 20,
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 20,
                                marginBottom:20,
                                width: '100%',
                            }}>
                            <View style={{width: '80%', alignItems: 'flex-start'}}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    paddingLeft:12,
                                    marginVertical:5,
                                    color:"white"
                                }}>Address Information</Text>
                            </View>
                        </View>


                    </View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginHorizontal:10,
                        paddingHorizontal:10
                    }}>
                        <AddressInput
                            setValue={setAddressType}
                            placeholderText="Address Type"
                            value={AddressType}
                        />
                        <AddressInput
                            setValue={setPostalCode}
                            placeholderText="Postal Code"
                            value={PostalCode}
                        />

                    </View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginHorizontal:10,
                        paddingHorizontal:10
                    }}>
                        <AddressInput
                            setValue={setCountry}
                            placeholderText="Country"
                            value={Country}
                        />
                        <AddressInput
                            setValue={setCity}
                            placeholderText="City"
                            value={City}
                        />

                    </View>
                    <OpenAddressInput
                        setValue={setOpenAddress}
                        placeholderText="Open Address"
                        value={OpenAddress}
                    />
                    {renderSaveButton()}

                </View>




            </ScrollView>





        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    buttonStyleSave: {
        height: 42,
        width:150,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FF8303',
        borderColor: '#FF8303'
    },
    defaultTextInputStyle: {
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33'
    },
    defaultCVVTextStyle:{
        height:42,
        borderWidth:1,
        borderRadius:16,
        marginTop:10,
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33'
    },
    defaultOpenAddressTextStyle:{
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33'
    },

    buy_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },

});
export default PaymentScreen;
