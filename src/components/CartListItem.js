import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert,Dimensions} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/Colors";
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

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
        currency,
        quantity,
        userId,
        CartList
    } = props;


    function onAddPressed() {
        fetch("http://10.0.2.2:8080/cart/IncrementProduct?userId=" + userId +"&productId=" + bookId +  "&quantity=1", {
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
            }).then(defne => {

            console.log(defne);
            console.log("mertmert");
            CartListItem.CartList = defne;
        }).catch(error => {
            console.warn(error)
            Alert.alert("Warning", "Please check your information")
        })

    }

    function onRemovePressed() {
        fetch("http://10.0.2.2:8080/cart/DecrementProduct?userId="+ userId +"&productId=" + bookId +  "&quantity=1", {
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

            }).then(defne => {

            CartListItem.CartList = defne;
        }).catch(error => {
            console.warn(error)
            Alert.alert("Warning", "Please check your information")
        })
    }

    return (
        <View style={{
            flexDirection:'row',
        }}>
            <View style={[styles.container,containerStyle]}>
                <Image source={{uri}} style={[styles.image,imageStyle]}/>
                <View style={[styles.detail,detailStyle]}>
                    <Text style={[styles.bookNameText,bookNameTextStyle]}>{bookName}</Text>
                    <Text style={[styles.priceStyle,priceStyle]}> {currency}{price}</Text>
                    <View style={{
                        flexDirection:'row',
                        left:0,
                        marginTop:5,
                    }}>
                        <TouchableOpacity onPress={() => onRemovePressed()}>
                            <Icon name="ios-remove-circle" style={styles.add_remove_style} />
                        </TouchableOpacity>

                        <View style={{
                            borderWidth:1,
                            borderRadius:20,
                            height:25,
                            width:20,
                            marginLeft:10,
                        }}>
                            <Text style={{
                                justifyContent:'center',
                                fontSize:9,
                                marginVertical:5,
                                marginHorizontal:2
                            }}> {quantity} </Text>
                        </View>
                        <TouchableOpacity onPress={() => onAddPressed()}>
                            <Icon name="ios-add-circle" style={styles.add_remove_style} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>




    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection: 'row',
        marginHorizontal:8,
        paddingHorizontal: 8,
        height: 150,
        elevation: 2,
        backgroundColor: "#FFF",
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#FF8303",
        marginBottom: 10,
        width: 380,
    },
    image: {
        width: '20%',
        height: 150,
        resizeMode:'contain',
        borderWidth:1,
        borderRadius: 16,
        marginLeft: 0,
        marginRight: 5,
        marginTop:2,
        paddingTop: 10,
        justifyContent:'center',
        borderColor:Colors.WHITE//'#FF8303'
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal:0,
        paddingRight:20,
        paddingVertical: 0,
        marginTop:0,
    },
    add_remove_style:{
        flexDirection: 'column',
        paddingHorizontal:15,
        fontSize:20
    },

    bookNameText: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        fontWeight: 'bold',
        left:0,
        fontSize: 16,
        textAlign: 'left',
        width :(SCREEN_WIDTH ) / 1.4,
        //height:SCREEN_HEIGHT / 4,
    },
    /*authorText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: 'center',
    },*/
    priceStyle:{
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FF8303',
        left:0,
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
    priceStyle: PropTypes.object,
    quantity: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
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
