import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';
import SavedAllCreditCardItem from '../components/SavedAllCreditCardItem';
import PaymentInput from '../components/PaymentInput';
import SmallPaymentInput from '../components/SmallPaymentInput';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function ChangeCreditCardInformation({navigation,route}) {
    useEffect(()=>{
        global.creditCardId = route.params.params.creditCardId;
    },[]);
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardType, setCreditCardType] = useState("");
    const [creditCardName, setCreditCardName] = useState("");
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");

    function renderCheckOutButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onCheckOutPressed()}>
            <Text style={styles.buy_TextStyle}>UPDATE</Text>
        </TouchableOpacity>
    }
    function onCheckOutPressed() {

        fetch("http://10.0.2.2:8080/creditCard/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:creditCardId,
                email: global.mail,
                full_name: creditCardName,
                cvv: creditCardCVC,
                creditcard_number: creditCardNumber,
                type: creditCardType,
                end_date: creditCardExpirationDate

            })
        })
            .then((result1) => {
                if (result1.status === 200) {
                    navigation.navigate("Profile");
                } else {
                    if (result1.status === 400) {
                        alert("Wrong email!");
                    } else {
                        alert("Something went wrong!");
                    }
                }

            })
    }
    return (
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
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
                    <View style={{width: '85%'}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#FFF',
                                fontWeight: 'bold',
                            }}> Update Credit Card Information</Text>
                    </View>
                </View>

            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 680}}>


                <View style={{
                    alignItems:'center',

                }}>
                    <PaymentInput
                        setValue={setCreditCardType}
                        placeholderText="Type: MasterCard/PayPal/Visa"
                        value={creditCardType}
                        keyboardType='default'
                    />
                    <PaymentInput
                        setValue={setCreditCardNumber}
                        placeholderText="**** **** **** ****"
                        value={creditCardNumber}
                        keyboardType='number-pad'
                    />
                    <PaymentInput
                        setValue={setCreditCardName}
                        placeholderText="Name-Surname"
                        value={creditCardName}
                        keyboardType='default'
                    />
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginHorizontal:5,
                        paddingHorizontal:5

                    }}>
                        <SmallPaymentInput
                            setValue={setCreditCardExpirationDate}
                            placeholderText="MM/YY"
                            value={creditCardExpirationDate}
                            keyboardType='default'
                        />

                        <SmallPaymentInput
                            setValue={setCreditCardCVC}
                            placeholderText="CVV"
                            value={creditCardCVC}
                            keyboardType='numeric'
                        />

                    </View>
                    {renderCheckOutButton()}
                </View>

            </ScrollView>
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
    buttonStyleSave: {
        height: 50,
        width:150,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FF8303',
        borderColor: Colors.METALIC_GRAY
    },
    buy_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },
});

export default ChangeCreditCardInformation;
