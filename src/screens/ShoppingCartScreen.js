import {SafeAreaView, View, Text, ScrollView, FlatList, StyleSheet, Dimensions, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CartListItem from "../components/CartListItem";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

function ShoppingCartScreen({route,navigation}) {

    console.disableYellowBox = true;
    const[totalCost, setTotalCost] = useState([]);
    const[CartList,setCartList] = useState([]);
    //const[ProductList, setProductList] = useState([]);
    global.count = 0;

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
        return fetch('http://10.0.2.2:8080/cart/getCart?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then((response) => response.json())//response.json() console.log(response)
            .then(deneme => {
                console.log("cemcem")
                //console.log(deneme)
                setCartList(deneme.list)

                setTotalCost(deneme.totalPrice)
            }).catch((error) => {
                console.log("zeyenp")
                console.error(error);
            });
    };
    const getTotal = () => {
        return fetch('http://10.0.2.2:8080/cart/total?userId='+ global.userid,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then((response) => response.json())//response.json()
            .then((json) => {
                //console.log(json);
                //setTotalCost(json);
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
        fetch("http://10.0.2.2:8080/cart/clear?userId=" + global.userid, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
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
                    Accept: 'application/json',
                },
            }).then((result) => result.json()).then(defne => {
                setTotalCost(defne.totalPrice);
                setCartList(defne.list);

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
                    Accept: 'application/json',
                },

            })
                .then((result) => result.json()).then(defne => {
                setTotalCost(defne.totalPrice);
                setCartList(defne.list);

            }).catch(error => {
                console.warn(error)
                Alert.alert("Warning", "Please check your information")
            })
        }
        /*
        then((json) => {
           console.log("List of Cart Items: ", json);
           setCartList(json);
           console.log("List of Cart Items: ", CartList);
       }).
        */
        //<Text style={[styles.authorText,authorTextStyle]}>{authorName}</Text>
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

});
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

export default ShoppingCartScreen;
