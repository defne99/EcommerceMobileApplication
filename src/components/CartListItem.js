import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartListItem = (props) => {
    const {
        uri,
        containerStyle,
        imageStyle,
        detailStyle,
        bookName,
        bookNameTextStyle,
        authorTextStyle,
        authorName,
        bookId,
        price,
        priceStyle,
        currency
    } = props;
    function onAddPressed() {
        fetch("http://localhost:8080/cart/IncrementProduct?userId={userId}&productId={productId}&quantity={quantity}", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },

        })
            .then((result) => {
                console.log(result,"buradayım");
                if(result.ok){
                    console.log("Added");
                } else {
                    if(status === 400){
                        Alert.alert("Error","Wrong operation");
                    } else {
                        Alert.alert("Error","Something went wrong!");
                    }
                }

            }).catch(error => {
            console.warn(error)
            Alert.alert("Warning", "Please check your information")
        })
    }
    function onRemovePressed() {
        fetch("http://localhost:8080/cart/DecrementProduct?", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },

        })
            .then((result) => {
                console.log(result,"buradayım");
                if(result.ok){
                    console.log("Removed");
                } else {
                    if(status === 400){
                        Alert.alert("Error","Wrong operation!");
                    } else {
                        Alert.alert("Error","Something went wrong!");
                    }
                }

            }).catch(error => {
            console.warn(error)
            Alert.alert("Warning", "Please check your information")
        })
    }
    return (
        <View style={[styles.container,containerStyle]}>
            <Image source={{uri}} style={[styles.image,imageStyle]}/>
            <View style={[styles.detail,detailStyle]}>
                <Text style={[styles.bookNameText,bookNameTextStyle]}>{bookName}</Text>
                <Text style={[styles.authorText,authorTextStyle]}>{authorName}</Text>
            </View>
            <View style={[styles.detail,detailStyle]}>
                <Text style={[styles.priceStyle,priceStyle]}> {currency}{price}</Text>
            </View>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly'
            }}>
                <TouchableOpacity onPress={() => onAddPressed()}>
                    <Icon name="ios-add-circle" style={{fontSize: 12}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemovePressed()}>
                    <Icon name="ios-remove-circle" style={{fontSize: 12}} />
                </TouchableOpacity>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        marginHorizontal:8,
        paddingHorizontal: 8,
        height: 42,
        elevation: 2,
        backgroundColor: '#FFF',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
        width: 150,
    },
    image: {
        width: 50,
        height: 100,
        resizeMode:'contain',
        borderWidth:1,
        borderRadius: 16,
        marginLeft: 25,
        marginRight: 25,
        paddingTop: 10,
        borderColor:'transparent'
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    bookNameText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: 'center',
    },
    authorText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: 'center',
    },
    priceStyle:{
        fontWeight: 'bold',
        fontSize: 10,
        color: '#FF8303',
        textAlign: 'center',
    }
})


CartListItem.propTypes = {
    uri: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    bookName: PropTypes.string.isRequired,
    bookNameTextStyle: PropTypes.object,
    authorTextStyle: PropTypes.object,
    authorName: PropTypes.string.isRequired,
    currency: PropTypes.string,
    bookId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    priceStyle: PropTypes.object
}

CartListItem.defaultProps = {
    containerStyle: {},
    imageStyle: {},
    detailStyle: {},
    bookNameTextStyle: {},
    authorTextStyle: {},
    priceStyle: {},
    currency: "$",
}


export default CartListItem;
