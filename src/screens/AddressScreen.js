import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput} from 'react-native';
import Colors from "../constants/Colors";
import SavedAddressListItem from '../components/SavedAddressListItem';
import OpenAddressInput from '../components/OpenAddressInput';
import AddressInput from '../components/AddressInput';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
console.disableYellowBox = true;


function AddressScreen({navigation}) {
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [AddressType, setAddressType] = useState("");
    const [OpenAddress, setOpenAddress] = useState("");
    const [addressList,setAddressList] = useState([]);
    const [addID,setAddID] = useState(0);
    global.currentAddressId = 0;

    useEffect(()=>{
        getSavedAddressesFromAPI();
    },[]);

    const renderSavedAddressListItem =  ({item, index}) => {
        return <SavedAddressListItem
            addressId={item.id}
            _handleNavigate={_handleNavigate}
            addressType={item.type}
            openAddress={item.full_address}
            Country={item.country}
            City={item.city}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }

    function renderSaveAddressPressed() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onSaveAddressPressed()}>
            <Text style={styles.buy_TextStyle}>Save Address</Text>
        </TouchableOpacity>
    }
    function onProceedPressed() {
        _handleNavigate("PaymentScreen", {params: {currentAddressId}});
    }
    const getSavedAddressesFromAPI = () => {
        return fetch('http://10.0.2.2:8080/address/getByEmail',{
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
                console.log("List of New Addresses: ", list);
                setAddressList(list);
            }).catch((error) => {
                console.error(error);
            });
    };
    const SendNewAddressToDatabase = () => {
        fetch("http://10.0.2.2:8080/address/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:global.mail,
                city:City,
                country:Country,
                postcode:PostalCode,
                full_address:OpenAddress,
                type:AddressType,
            })
        }).then((response) => response.json())
            .then(list => {
                console.log("List of New Addresses: ", list);
                global.currentAddressId = list;
                onProceedPressed();
            }).catch((error) => {
            console.error(error);
        });
    };


    function onSaveAddressPressed() {
        //Address Information Posting
        if(City==="" || Country===""|| PostalCode==="" || AddressType===""||OpenAddress==="")
        {
            Alert.alert("Warning","Invalid address information");
            return false;
        }

        SendNewAddressToDatabase();

        Alert.alert("Address", "Your address information has successfully saved")

    }

    return (
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
            <View
                style={{
                    backgroundColor: 'lightgrey',
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
                            }}> Address Information</Text>
                    </View>
                </View>

            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height:680}}>
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
                            }}>
                            Saved Addresses
                        </Text>
                    </View>

                </View>

                <FlatList
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    data={addressList}
                    renderItem={renderSavedAddressListItem}
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
                                color: '#FF8303',
                                top:10
                            }}>
                            Add New Address
                        </Text>
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
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center'
                }}>
                    {renderSaveAddressPressed()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    buttonStyleSave: {
        height: 50,
        width:150,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20,
        left:110,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FF8303',
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
