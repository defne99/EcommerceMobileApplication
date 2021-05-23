import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground,KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function AllUserAdressesScreen({navigation, route}) {

    const [addressList,setAddressList] = useState([]);
    const [NewaddressList,setNewAddressList] = useState([]);
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [AddressType, setAddressType] = useState("");
    const [OpenAddress, setOpenAddress] = useState("");
    function onSaveAddressPressed() {
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
                navigation.navigate("Profile");

            }).catch((error) => {
            console.error(error);
        });
    }
    const renderSavedAllAddressListItem =  ({item, index}) => {
        return <SavedAllAddressesListItem
            addressId={item.id}
            addressType={item.type}
            _handleNavigate={_handleNavigate}
            openAddress={item.full_address}
            postCode={item.postcode}
            Country={item.country}
            City={item.city}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }
    useEffect(()=>{
        getSavedAddressesFromAPI();
    },[]);
    function renderSaveAddressPressed() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onSaveAddressPressed()}>
            <Text style={styles.buy_TextStyle}>SAVE</Text>
        </TouchableOpacity>
    }
    function renderDeleteAllPressed() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onDeleteAllPrressed()}>
            <Text style={styles.buy_TextStyle}>DELETE ALL</Text>
        </TouchableOpacity>
    }
    function onDeleteAllPrressed() {
        fetch('http://10.0.2.2:8080/address/removeAll?email='+ mail,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("Address Remove All Requested");
                navigation.navigate("Profile")
            } else {
                if(status === 400){
                    Alert.alert("Error","Wrong operation");
                } else {
                    Alert.alert("Error","Something went wrong!");
                }
            }
        });


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
                                }}> My Addresses</Text>
                        </View>
                    </View>

                </View>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={{height: 620}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            width: SCREEN_WIDTH,
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
                                Saved Addresses
                            </Text>
                        </View>

                    </View>

                    <FlatList
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        data={addressList}
                        renderItem={renderSavedAllAddressListItem}
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
                                    top:10,
                                    textDecorationLine:"underline"
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
                        justifyContent:'space-around'
                    }}>
                        {renderSaveAddressPressed()}
                        {renderDeleteAllPressed()}
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

export default AllUserAdressesScreen;
