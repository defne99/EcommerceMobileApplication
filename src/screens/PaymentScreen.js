import React, {Component, useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    Alert, FlatList, Dimensions,
} from 'react-native';
import PaymentInput from "../components/PaymentInput";
import SmallPaymentInput from '../components/SmallPaymentInput';
import SavedCardListItem from '../components/SavedCardListItem';
import Colors from '../constants/Colors';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
function PaymentScreen({navigation, route}){
    console.disableYellowBox = true;

    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardType, setCreditCardType] = useState("");
    const [creditCardName, setCreditCardName] = useState("");
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [cardList,setCardList] = useState([]);
    const [cartList, setCartList] = useState([]);
    useEffect(()=>{
        global.currentAddressId = route.params.params.addressId;
        console.log(currentAddressId);
        getSavedCardInformationFromAPI();

    },[]);
    const renderSavedCardInformation =  ({item, index}) => {
        return <SavedCardListItem
            cardType={item.type}
            creditCardNumber={item.creditcard_number}
            Name={item.full_name}
            _handleNavigate={_handleNavigate}
            expire_Date={item.end_date}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }

    function renderCheckOutButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onCheckOutPressed()}>
            <Text style={styles.buy_TextStyle}>CHECKOUT</Text>
        </TouchableOpacity>
    }
    const BuyAllItemInTheCart = () => {
        return fetch("http://10.0.2.2:8080/cart/buy?userId=" + global.userid + "&addressId=" + global.currentAddressId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Cart Items will be empty: ", json);
                setCartList(json);
                navigation.navigate("Products");
            }).catch((error) => {
                console.error(error);
            });
        Alert.alert("Transaction", "Successful Transaction");
        navigation.navigate("Products");
    };
    ///////////////////////////////////////////////
    const getSavedCardInformationFromAPI = () => {
        return fetch('http://10.0.2.2:8080/creditCard/getByEmail',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email:global.mail,
            })
        })
            .then((response) => response.json())
            .then(list => {
                console.log("List of Card List: ", list);
                setCardList(list);
            }).catch((error) => {
                console.error(error);
            });
    };
    /////////////////////////////////////////////////////
    function onCheckOutPressed() {
        if(creditCardNumber.length !== 16){
            Alert.alert("Warning", "Invalid Credit Card Information 1")
            return false
        }
        if(creditCardNumber === "" || creditCardType==="" || creditCardCVC==="" || creditCardExpirationDate==="" || creditCardCVC.length !== 3){
            Alert.alert("Warning", "Invalid Credit Card Information 2")
            return false
        }
        console.log("Girmeden Önce");
        fetch("http://10.0.2.2:8080/creditCard/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:global.mail,
                full_name:creditCardName,
                cvv:creditCardCVC,
                creditcard_number:creditCardNumber,
                type:creditCardType,
                end_date:creditCardExpirationDate

            })
        })
            .then((result1) => {
                if (result1.status===200) {
                    BuyAllItemInTheCart();
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


        /*fetch("http://10.0.2.2:8080/creditCard/buy?userId=" + global.userid + "&addressId=" + global.currentAddressId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                console.log("List of Cart Items will be empty: ", json);
                setCartList(json);
            }).catch((error) => {
            console.error(error);
        });*/
        Alert.alert("Transaction", "Successful Transaction");
        //navigation.navigate("Products");

        //After user Checkout cart will become empty since we bought

    }
    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
        BuyAllItemInTheCart();
    }
    return(
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
            <View
                style={{
                    backgroundColor: Colors.DARK_MUSTARD,
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
                            }}>Payment Information </Text>
                    </View>
                </View>

            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 680}}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                        top:10
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: Colors.DARK_MUSTARD,
                            }}>
                            Saved Credit Cards
                        </Text>
                    </View>

                </View>

                <FlatList
                    horizontal={true}
                    data={cardList}
                    renderItem={renderSavedCardInformation}
                    keyExtractor={item => item.id}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: Colors.DARK_MUSTARD,
                                top:10
                            }}>
                            Add New Credit Card
                        </Text>
                    </View>
                </View>
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
    buttonStyleSave: {
        height: 42,
        width:150,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.DARK_MUSTARD,
        borderColor: Colors.METALIC_GRAY
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
