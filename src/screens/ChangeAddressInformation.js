import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function ChangeAddressInformation({navigation,route}) {
    useEffect(()=>{
        global.currentAddressId = route.params.params.addressId;
        console.log(currentAddressId);
    },[]);
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [AddressType, setAddressType] = useState("");
    const [OpenAddress, setOpenAddress] = useState("");

    function renderUpdateAddressPressed() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onUpdatePressed()}>
            <Text style={styles.buy_TextStyle}>UPDATE</Text>
        </TouchableOpacity>
    }
    function onUpdatePressed() {
        fetch('http://10.0.2.2:8080/address/update',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                id:currentAddressId,
                email: global.mail,
                city: City,
                country: Country,
                postcode: PostalCode,
                type: AddressType,
                full_address: OpenAddress

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
                    <View style={{width: '65%'}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#FFF',
                                fontWeight: 'bold',
                            }}> Update Address</Text>
                    </View>
                </View>
            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 620}}>
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
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-around'
                }}>
                    {renderUpdateAddressPressed()}

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

export default ChangeAddressInformation;
