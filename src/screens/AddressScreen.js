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
import AddressInput from '../components/AddressInput';
import Input from '../components/Input';
import OpenAddressInput from '../components/OpenAddressInput';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AddressScreen(props){
    console.disableYellowBox = true;
    const {navigation} = props;
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [AddressType, setAddressType] = useState("");
    const [OpenAddress, setOpenAddress] = useState("");

    function renderProceedButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onProceedPressed()}>
            <Text style={styles.buy_TextStyle}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
    }
    function onProceedPressed() {
        //Address Information Posting
        if(City==="" || Country===""|| PostalCode==="" || AddressType===""||OpenAddress==="")
        {
            Alert.alert("Warning","Invalid address information");
            return false;
        }

        Alert.alert("Address", "Your address information has successfully saved")
        fetch("http://localhost:8080/address/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:"omertabar@sabanciuniv.edu",
                city:City,
                country:Country,
                postcode:PostalCode,
                full_address:OpenAddress,
                type:AddressType,
            })
        })
            .then((result1) => {
                console.log(result1)
            }).catch(error1 => {
            console.warn(error1)
            Alert.alert("Warning", "Please check your information")
        })
        navigation.navigate("PaymentScreen");




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
                        keyboardType='default'
                    />
                    <AddressInput
                        setValue={setPostalCode}
                        placeholderText="Postal Code"
                        value={PostalCode}
                        keyboardType='number-pad'
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
                        keyboardType='default'
                    />
                    <AddressInput
                        setValue={setCity}
                        placeholderText="City"
                        value={City}
                        keyboardType='default'
                    />

                </View>
                <OpenAddressInput
                    setValue={setOpenAddress}
                    placeholderText="Open Address"
                    value={OpenAddress}
                    keyboardType='default'
                />
                {renderProceedButton()}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    buttonStyleSave: {
        height: 60,
        width:300,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20,
        left:42,
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
    defaultOpenAddressTextStyle:{
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        left:30,
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
export default AddressScreen;
