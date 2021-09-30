import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert,Dimensions} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const SavedAllAddressListItem = (props) => {
    const {
        containerStyle,
        detailStyle,
        addressType,
        addressTypeTextStyle,
        openAddressTextStyle,
        openAddress,
        _handleNavigate,
        Country,
        City,
        postCode,
        navigatePage,
        addressId,
        CountryTextStyle,
        CityTextStyle,
    } = props;



    function onEditPressed() {
        _handleNavigate(navigatePage, {
            addressId : addressId,
            addressType: addressType,
            addressCity: City,
            addressCountry: Country,
            postalCode: postCode,
            full_address: openAddress
        })
    };


    function onDeletePressed() {
        fetch("http://10.0.2.2:8080/address/remove?id=" + addressId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("Address Remove Requested");
            } else {
                if(status === 400){
                    Alert.alert("Error","Wrong operation");
                } else {
                    Alert.alert("Error","Something went wrong!");
                }
            }
        });
    }

    return (
        <View style={{
            flexDirection:'row',
        }}>
            <View style={[styles.container,containerStyle]}>
                <View style={[styles.detail,detailStyle]}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-evenly',

                    }}>
                        <Text style={[styles.addressTypeTextStyle, addressTypeTextStyle]}>{addressType}</Text>
                        <Text
                            style={[styles.CountryTextStyle,CountryTextStyle]}>
                            {Country}/{City}
                        </Text>


                    </View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-evenly',

                    }}>
                        <Text style={[styles.openAddressTextStyle,openAddressTextStyle]}> {openAddress}</Text>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginTop:5,

                    }}>
                        <TouchableOpacity onPress={() => onEditPressed()}>
                            <Icon name="ios-brush" style={styles.add_remove_style} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => onDeletePressed()}>
                            <Icon name="ios-trash" style={styles.add_remove_style} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>




    )
}

const styles = StyleSheet.create({
    container : {
        height: 150,
        elevation: 2,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: 500,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    add_remove_style:{
        flexDirection: 'row',
        paddingHorizontal:15,
        left:32,
        fontSize:20,
        top:10

    },
    detail:{
        flexDirection: 'column',
        paddingTop: 10,
        height: "50%"
    },
    detailSecond:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 10,
        height: "50%"
    },
    addressTypeTextStyle: {
        color: Colors.DARK_MUSTARD,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'left',
    },
    openAddressTextStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
    },
    CountryTextStyle:{
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.DARK_MUSTARD,
        textAlign: 'left',
    },

})


SavedAllAddressListItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    addressType: PropTypes.string.isRequired,
    addressTypeTextStyle: PropTypes.object,
    openAddressTextStyle: PropTypes.object,
    openAddress: PropTypes.string.isRequired,
    City: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
    addressId: PropTypes.number.isRequired,
    navigatePage: PropTypes.string,
}

SavedAllAddressListItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    addressTypeTextStyles: {},
    openAddressTextStyle: {},
    CityTextStyle: {},
    CountryTextStyle: {},
    navigatePage: "ChangeAddress",
}


export default SavedAllAddressListItem;
