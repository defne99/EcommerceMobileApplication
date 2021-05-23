import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, FlatList} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import OrderArrayItem from './OrderArrayItem';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const OrderListItem = (props) => {
    const {
        orders,
        containerStyle,
        detailStyle,
        addressType,
        addressTypeTextStyle,
        openAddressTextStyle,
        CountryTextStyle,
        CityTextStyle,
    } = props;

    const renderOrderArrays =  ({item, index}) => {
        return <OrderArrayItem
            orderModel={item.orderModel}
            productModel={item.productModel}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    return (
        <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={orders}

            renderItem={renderOrderArrays}
            keyExtractor={item => item.orderModel.orderId}
        />
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


OrderListItem.propTypes = {
    containerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    orders: PropTypes.array.isRequired,
    addressTypeTextStyle: PropTypes.object,
    openAddressTextStyle: PropTypes.object,

    navigatePage: PropTypes.string,
}

OrderListItem.defaultProps = {
    containerStyle: {},
    detailStyle: {},
    addressTypeTextStyles: {},
    openAddressTextStyle: {},
    CityTextStyle: {},
    CountryTextStyle: {},

}


export default OrderListItem;
