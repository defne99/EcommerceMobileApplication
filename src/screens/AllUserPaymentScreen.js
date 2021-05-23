import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground,KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';
import SavedAllCreditCardItem from '../components/SavedAllCreditCardItem';
import SavedCardListItem from '../components/SavedCardListItem';
import PaymentInput from '../components/PaymentInput';
import SmallPaymentInput from '../components/SmallPaymentInput';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
function AllUserPaymentScreen({navigation}) {
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardType, setCreditCardType] = useState("");
    const [creditCardName, setCreditCardName] = useState("");
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [paymentList,setPaymentList] = useState([]);
    const renderSavedCreditCardListItem =  ({item, index}) => {
        return <SavedAllCreditCardItem
            creditCardId={item.id}
            cardType={item.type}
            creditCardNumber={item.creditcard_number}
            Name={item.full_name}
            _handleNavigate={_handleNavigate}
            expire_Date={item.end_date}
            cvv={item.cvv}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }
    useEffect(()=>{
        getSavedCreditCardsFromAPI();

    },[]);
    const getSavedCreditCardsFromAPI = () => {
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
                console.log("List of Saved CreditCards: ", list);
                setPaymentList(list);
            }).catch((error) => {
                console.error(error);
            });
    };
    function renderDeleteAllPressed() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onDeleteAllPrressed()}>
            <Text style={styles.buy_TextStyle}>DELETE ALL</Text>
        </TouchableOpacity>
    }
    function onDeleteAllPrressed() {
        fetch('http://10.0.2.2:8080/creditCard/removeAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email:global.mail,
            })

        }).then((result) => {
            console.log(result, "buradayım");
            if (result.ok) {
                console.log("CreditCard Remove All Requested");
                navigation.navigate("Profile")
            } else {
                if (status === 400) {
                    Alert.alert("Error", "Wrong operation");
                } else {
                    Alert.alert("Error", "Something went wrong!");
                }
            }
        });
    }
    function renderCheckOutButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onCheckOutPressed()}>
            <Text style={styles.buy_TextStyle}>SAVE</Text>
        </TouchableOpacity>
    }function onCheckOutPressed() {
        if (creditCardNumber.length !== 16) {
            Alert.alert("Warning", "Invalid Credit Card Information 1")
            return false
        }
        if (creditCardNumber === "" || creditCardType === "" || creditCardCVC === "" || creditCardExpirationDate === "" || creditCardCVC.length !== 3) {
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
                                }}> My Credit Cards</Text>
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
                                    color: '#FF8303',
                                    textDecorationLine:"underline"
                                }}>
                                Saved Credit Cards
                            </Text>
                        </View>

                    </View>

                    <FlatList
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        data={paymentList}
                        renderItem={renderSavedCreditCardListItem}
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
                                    color: "#FF8303",
                                    top:10,
                                    textDecorationLine:"underline"
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
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between'
                        }}>
                            {renderCheckOutButton()}
                            {renderDeleteAllPressed()}
                        </View>

                    </View>

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
    },
    buttonStyleSave: {
        height: 42,
        width:150,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "#FF8303",
        borderColor: Colors.METALIC_GRAY
    },buy_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },
});

export default AllUserPaymentScreen;
