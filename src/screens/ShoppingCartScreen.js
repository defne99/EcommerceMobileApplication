import {SafeAreaView, View, Text, ScrollView, FlatList, StyleSheet,Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CartListItem from "../components/CartListItem";
import Colors from "../constants/Colors";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

function ShoppingCartScreen({route,navigation}) {
    console.disableYellowBox = true;
    const[totalCost, setTotalCost] = useState([]);
    const[CartList,setCartList] = useState([]);
    //const[ProductList, setProductList] = useState([]);

    useEffect(()=>{
        getCartListProductFromAPI();
        getTotal();
        //getProductsCartListAPI();
    },[]);


    const renderCartListProduct= ({item, index}) => {

        return <CartListItem
            bookId={item.productId}
            bookName={item.productName}
            authorName={item.writer}
            price={item.totalPrice}
            uri={item.imgUrl}
            quantity={item.quantity}
            userId={item.userId}
            CartList = {CartList}
        />

    }

    //Gets cartId, productId, quantity, userId
    const getCartListProductFromAPI = () => {
        console.log("iremirem");
        return fetch('http://localhost:8080/cart/getCart?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                console.log("List of Cart Items: ", json);
                setCartList(json);
                console.log("List of Cart Items: ", CartList);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getTotal = () => {
        console.log("iremirem");
        return fetch('http://localhost:8080/cart/total?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTotalCost(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    //Gets all elements related with productId
    /* const getProductsCartListAPI = () => {
         console.log(CartList);
         console.log(CartList.productId);
         console.log("mertmertmert");
         return fetch('http://localhost:8080/product/getProduct?productId='+ CartList.productId,{
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                 Accept: 'application/json',
             },
         })
             .then((response) => response.json())
             .then((json) => {
                 //console.log("List of Cart Items: ", json);
                 setProductList(json);
             }).catch((error) => {
                 console.error(error);
             });
     };*/

    //Renders Empty Cart Button and calls onEmptyPressed
    function renderEmptyCart() {
        return <TouchableOpacity
            style={styles.buttonStyleEmpty}
            onPress={() => onEmptyPressed()}><Text style={styles.emptyButtonTextStyle}>EMPTY CART</Text></TouchableOpacity>
    }
    //Renders Checkout Button and calls onCheckoutPressed
    function renderCheckOut(){
        return <TouchableOpacity
            style={styles.buttonStyleCheckout}
            onPress={() => onCheckOutPressed()}><Text style={styles.checkoutButtonTextStyle}>CHECKOUT</Text></TouchableOpacity>
    }
    function renderCheckOutAnonymous(){
        return <TouchableOpacity
            style={styles.buttonStyleCheckout}
            onPress={() => onCheckoutAnonymousPressed()}><Text style={styles.checkoutButtonTextStyle}>CHECKOUT</Text></TouchableOpacity>
    }
    //When we pressed Navigate to Payment Screen
    function onCheckOutPressed() {
        console.log("Checkout Pressed Pressed");
        navigation.navigate('AddressScreen');
    }
    function onCheckoutAnonymousPressed() {
        console.log("Checkout Pressed Pressed");
        navigation.navigate('Login');
    }
    //Empty the Cart and Return the Empty Cart
    function onEmptyPressed() {
        fetch("http://localhost:8080/cart/clear?userId=" + global.userid, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Cart Items will be empty: ", json);
                setCartList(json);
            }).catch((error) => {
            console.error(error);
        });



    }
    if(global.userid !== -1)
    {
        return (
            //style={{backgroundColor: Colors.WHITE}}
            <SafeAreaView>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={{height: 750}}>
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
                        justifyContent:'flex-end'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#FF8303',
                            paddingRight:15
                        }}> Total Cost: ${totalCost}</Text>


                    </View>
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
    else{
        return(
            //style={{backgroundColor: Colors.WHITE}}
            <SafeAreaView>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={{height: 750}}>
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
                        justifyContent:'flex-end'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#FF8303',
                            paddingRight:15
                        }}> Total Cost: ${totalCost}</Text>
                    </View>
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
                            {renderCheckOutAnonymous()}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }


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
    buttonStyleCheckout: {
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
    checkoutButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },

});

export default ShoppingCartScreen;
