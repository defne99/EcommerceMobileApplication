import {SafeAreaView, View, Text, Image, ScrollView, FlatList, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../MobileApp/App';
import CartListItem from "../components/CartListItem";
import PaymentScreen from './PaymentScreen';


function ShoppingCartScreen({route,navigation}) {
    const[CartList,setCartList] = useState([]);

    useEffect(()=>{
        console.log(global.userid)
        console.log("mertmertmert");
        getCartListProductFromAPI();
    },[]);


    const renderCartListProduct= ({item, index}) => {
        return <CartListItem
            bookId={item.productId}
            bookName={item.productName}
            authorName={item.writer}
            price={item.currentPrice}
            uri={item.imgUrl}
        />
    }

    const getCartListProductFromAPI = () => {
        return fetch('http://localhost:8080/cart/getCart?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Cart Items: ", json);
                setCartList(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    function renderEmptyCart() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onEmptyPressed()}><Text style={styles.buy_TextStyle}>EMPTY CART</Text></TouchableOpacity>
    }
    function renderCheckOut(){
        return <TouchableOpacity
            style={styles.buttonStyleEmpty}
            onPress={() => onCheckOutPressed()}><Text style={styles.emptyButtonTextStyle}>CHECKOUT</Text></TouchableOpacity>
    }
    function onCheckOutPressed() {
        console.log("Checkout Pressed Pressed");
        navigation.navigate('Payment');

    }
    function onEmptyPressed() {
        fetch("http://localhost:8080/cart/clear?userId=" + userid, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((result1) => {
                console.log(result1)
            }).catch(error1 => {
            console.warn(error1)
            Alert.alert("Warning", "Please check your information")
        })

    }
    return (
        <SafeAreaView>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 650}}>
                <View style={{
                    backgroundColor: '#FF8303',
                    height: 75,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            width: '100%',
                        }}>
                        <View style={{width: '80%', alignItems: 'flex-start'}}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                paddingLeft:12,
                                marginVertical:5,
                                color:"white"
                            }}>My Cart</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={CartList}
                    renderItem={renderCartListProduct}
                    keyExtractor={item => item.productId}
                />
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-evenly'
                }}>
                    <View style={{
                        justifyContent:'flex-end',
                        marginLeft:10
                    }}>
                        {renderEmptyCart()}
                    </View>
                    <View style={{
                        justifyContent:'flex-start',

                    }}>
                        {renderCheckOut()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    buttonStyleEmpty: {
        height: 42,
        width:150,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FF8303',
        borderColor: '#FF8303'
    },
    emptyButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },
});

export default ShoppingCartScreen;
