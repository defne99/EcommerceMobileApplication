import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import PaymentInput from "../components/PaymentInput";
import SmallPaymentInput from '../components/SmallPaymentInput';

function PaymentScreen(props){
    console.disableYellowBox = true;
    const {navigation} = props;
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardType, setCreditCardType] = useState("");
    const [creditCardName, setCreditCardName] = useState("");
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [userEmail, setUserEmail] = useState("");

    function renderCheckOutButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onCheckOutPressed()}>
            <Text style={styles.buy_TextStyle}>CHECKOUT</Text>
        </TouchableOpacity>
    }
    function onCheckOutPressed() {
        if(creditCardNumber.length !== 16){
            Alert.alert("Warning", "Invalid Credit Card Informationmert")
            return false
        }
        if(creditCardNumber === "" || creditCardType==="" || creditCardCVC==="" || creditCardExpirationDate==="" || creditCardCVC.length !== 3 || creditCardExpirationDate.length !== 5){
            Alert.alert("Warning", "Invalid Credit Card Information")
            return false
        }
        Alert.alert("Transaction", "Successful Transaction");
        //Credit Card Information Posting
        //Email yerine nasıl userId'den email alırız
        fetch("http://localhost:8080/creditCard/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:"omertabar@sabanciuniv.edu",
                full_name:creditCardName,
                cvv:creditCardCVC,
                creditcard_number:creditCardNumber,
                type:creditCardType,
                end_date:creditCardExpirationDate,
            })
        })
            .then((result1) => {
                console.log(result1)
            }).catch(error1 => {
            console.warn(error1)
            Alert.alert("Warning", "Please check your information")
        })
        /*//Get the Cart Information with the User Id
        fetch('http://localhost:8080/cart/getCart?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Cart Items: ", json);
                setTempList(json);
            }).catch((error) => {
            console.error(error);
        });
        fetch('http://localhost:8080/product//getProduct?productId='+ tempList.productId,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Cart/Product Items: ", json);
                setTempListSecond(json);
            }).catch((error) => {
            console.error(error);
        });*/

        //After user Checkout cart will become empty
        fetch("http://localhost:8080/cart/buy?userId=" + global.userid, {
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
                            keyboardType='numeric's
                        />

                    </View>
                    {renderCheckOutButton()}
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
        borderRadius: 30,
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
