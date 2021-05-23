import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const SavedAddressListItem = (props) => {
    const {
        containerStyle,
        detailStyle,
        addressType,
        _handleNavigate,
        addressTypeTextStyle,
        openAddressTextStyle,
        openAddress,
        Country,
        City,
        addressId,
        navigatePage,
        CountryTextStyle,
        CityTextStyle,
    } = props;


    return (
        <TouchableOpacity
            onPress={() => _handleNavigate(navigatePage, {params: {addressId}})}
            style={[styles.container, containerStyle]}>
            <View
                style={[styles.detail, detailStyle]}>
                <Text
                    style={[styles.addressTypeTextStyle, addressTypeTextStyle]}>
                    {addressType}
                </Text>

                <Text
                    style={[styles.openAddressTextStyle,openAddressTextStyle]}>
                    {openAddress}
                </Text>

                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',

                }}>
                    <Text
                        style={[styles.CountryTextStyle,CountryTextStyle]}>
                        {Country}
                    </Text>
                    <Text
                        style={[styles.CityTextStyle,CityTextStyle]}>
                        {City}
                    </Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        height: SCREEN_HEIGHT / 6,
        elevation: 2,
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: (SCREEN_WIDTH - 20) / 2.6,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 15,
        paddingHorizontal: 10,
        height: "40%"
    },
    addressTypeTextStyle: {
        color: '#FF8303',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    openAddressTextStyle: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
    CountryTextStyle:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FF8303',
        textAlign: 'center',
    },
    CityTextStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FF8303',
    }
})


SavedAddressListItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    addressType: PropTypes.string.isRequired,
    addressTypeTextStyle: PropTypes.object,
    openAddressTextStyle: PropTypes.object,
    openAddress: PropTypes.string.isRequired,
    City: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
    navigatePage: PropTypes.string,
    addressId: PropTypes.number.isRequired,
}

SavedAddressListItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    addressTypeTextStyles: {},
    openAddressTextStyle: {},
    CityTextStyle: {},
    navigatePage: "PaymentScreen",
    CountryTextStyle: {},

}


export default SavedAddressListItem;
