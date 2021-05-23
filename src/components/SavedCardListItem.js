import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const SavedCardListItem = (props) => {
    const {
        containerStyle,
        detailStyle,
        cardType,
        _handleNavigate,
        addressId,
        cardTypeTextStyle,
        creditCardNumber,
        Name,
        buy,
        navigatePage,
        expire_Date,
        NameTextStyle,
        creditCardNumberTextStyle,
    } = props;

    return (
        <TouchableOpacity
            onPress={() => _handleNavigate(navigatePage, {params: {addressId}})}
            style={[styles.container, containerStyle]}>
            <View
                style={[styles.detail, detailStyle]}>
                <Text
                    style={[styles.cardTypeTextStyle, cardTypeTextStyle]}>
                    {cardType}
                </Text>

                <Text
                    style={[styles.creditCardNumberTextStyle,creditCardNumberTextStyle]}>
                    {creditCardNumber}
                </Text>

                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',

                }}>
                    <Text
                        style={[styles.NameStyleTextStyle,NameTextStyle]}>
                        {Name}
                    </Text>
                    <Text
                        style={[styles.NameStyleTextStyle,NameTextStyle]}>
                        {expire_Date}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        height: SCREEN_HEIGHT / 7,
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
    cardTypeTextStyle: {
        color: '#FF8303',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    creditCardNumberTextStyle: {
        fontWeight: 'bold',
        top:6,
        fontSize: 10,
        textAlign: 'center',
    },NameStyleTextStyle: {
        top:8,
        fontWeight: 'bold',
        fontSize: 13,
        color: '#FF8303',
        textAlign: 'center',
    },

})


SavedCardListItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    cardType: PropTypes.string.isRequired,
    cardTypeTextStyle: PropTypes.object,
    creditCardNumberTextStyle: PropTypes.object,
    creditCardNumber: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    navigatePage: PropTypes.string,
}

SavedCardListItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    cardTypeTextStyle: {},
    creditCardNumberTextStyle: {},
    NameTextStyle: {},
    navigatePage: "Products",

}


export default SavedCardListItem;
