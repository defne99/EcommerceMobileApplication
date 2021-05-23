import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const OrderArrayItem = (props) => {
    const {
        orderModel,
        productModel,
        containerStyle,
        detailStyle,
        hugeContainerStyle,
        BoughtPriceNumberTextStyle,
        BoughtPriceTextStyle,
        GenreCategoryTextStyle,
        orderIdTextStyle,
        productNameTextStyle,
        CountryTextStyle,
        BoughtDateTextStyle,
        StatusRegularTextStyle,
        BoughtDateNumberTextStyle,
        StatusIndicatorTextStyle,
    } = props;
    function onRefundPressed() {
        global.orderModelId = orderModel.id;
        fetch("http://10.0.2.2:8080/order/refund?id=" + orderModel.id, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((result) => {
            console.log(result,"buradayım");
            if(result.ok){
                console.log("Refund Requested");

            } else {
                if(status === 400){
                    Alert.alert("Error","Wrong operation");
                } else {
                    Alert.alert("Error","Something went wrong!");
                }
            }
        });
    }
    if(orderModel.currentSituation === 'Processing'  && orderModel.refundLeft > 0 )
    {
        return (
            <View style={{
                flexDirection:'row',
            }}>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <Text
                            style={[styles.orderIdTextStyle, orderIdTextStyle]}>
                            Order Id: {orderModel.orderId}
                        </Text>
                        <Text
                            style={[styles.productNameTextStyle,productNameTextStyle]}>
                            {productModel.productName}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.GenreCategoryTextStyle,GenreCategoryTextStyle]}>
                                {productModel.category}/{productModel.genre}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtPriceTextStyle, BoughtPriceTextStyle]}>
                                Bought Price:
                            </Text>
                            <Text
                                style={[styles.BoughtPriceNumberTextStyle, BoughtPriceNumberTextStyle]}>
                                {orderModel.boughtPrice}$
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtDateTextStyle,BoughtDateTextStyle]}>
                                Bought Date:
                            </Text>
                            <Text
                                style={[styles.BoughtDateNumberTextStyle,BoughtDateNumberTextStyle]}>
                                {orderModel.boughtDate}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text
                                style={[styles.StatusRegularTextStyle,StatusRegularTextStyle]}>
                                Status
                            </Text>
                            <Text
                                style={[styles.StatusIndicatorTextStyle,StatusIndicatorTextStyle]}>
                                {orderModel.currentSituation}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity onPress={() => onRefundPressed()}>
                                <View>
                                    <Image
                                        source={require('../constants/images/refund.png')}
                                        style={{height:35, width:35,  top:45,elevation:1 }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )

    }
    else if(orderModel.currentSituation === 'In-transit'  && orderModel.refundLeft > 0 )
    {
        return (
            <View style={{
                flexDirection:'row',
            }}>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <Text
                            style={[styles.orderIdTextStyle, orderIdTextStyle]}>
                            Order Id: {orderModel.orderId}
                        </Text>
                        <Text
                            style={[styles.productNameTextStyle,productNameTextStyle]}>
                            {productModel.productName}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.GenreCategoryTextStyle,GenreCategoryTextStyle]}>
                                {productModel.category}/{productModel.genre}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtPriceTextStyle, BoughtPriceTextStyle]}>
                                Bought Price:
                            </Text>
                            <Text
                                style={[styles.BoughtPriceNumberTextStyle, BoughtPriceNumberTextStyle]}>
                                {orderModel.boughtPrice}$
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtDateTextStyle,BoughtDateTextStyle]}>
                                Bought Date:
                            </Text>
                            <Text
                                style={[styles.BoughtDateNumberTextStyle,BoughtDateNumberTextStyle]}>
                                {orderModel.boughtDate}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text
                                style={[styles.StatusRegularTextStyle,StatusRegularTextStyle]}>
                                Status
                            </Text>
                            <Text
                                style={[styles.StatusIndicatorTextStyle,StatusIndicatorTextStyle]}>
                                {orderModel.currentSituation}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity onPress={() => onRefundPressed()}>
                                <View>
                                    <Image
                                        source={require('../constants/images/refund.png')}
                                        style={{marginVertical:40,height:35, width:35, left:110, top:20, }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )

    }
    else if(orderModel.currentSituation === 'Delivered'  && orderModel.refundLeft > 0 )
    {
        return (
            <View style={{
                flexDirection:'row',
            }}>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <Text
                            style={[styles.orderIdTextStyle, orderIdTextStyle]}>
                            Order Id: {orderModel.orderId}
                        </Text>
                        <Text
                            style={[styles.productNameTextStyle,productNameTextStyle]}>
                            {productModel.productName}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.GenreCategoryTextStyle,GenreCategoryTextStyle]}>
                                {productModel.category}/{productModel.genre}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtPriceTextStyle, BoughtPriceTextStyle]}>
                                Bought Price:
                            </Text>
                            <Text
                                style={[styles.BoughtPriceNumberTextStyle, BoughtPriceNumberTextStyle]}>
                                {orderModel.boughtPrice}$
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtDateTextStyle,BoughtDateTextStyle]}>
                                Bought Date:
                            </Text>
                            <Text
                                style={[styles.BoughtDateNumberTextStyle,BoughtDateNumberTextStyle]}>
                                {orderModel.boughtDate}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text
                                style={[styles.StatusRegularTextStyle,StatusRegularTextStyle]}>
                                Status
                            </Text>
                            <Text
                                style={[styles.StatusIndicatorTextStyle,StatusIndicatorTextStyle]}>
                                {orderModel.currentSituation}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity onPress={() => onRefundPressed()}>
                                <View>
                                    <Image
                                        source={require('../constants/images/refund.png')}
                                        style={{marginVertical:40,height:35, width:35, left:110, top:20, }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )

    }
    else{
        return (
            <View style={{
                flexDirection:'row',
            }}>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <Text
                            style={[styles.orderIdTextStyle, orderIdTextStyle]}>
                            Order Id: {orderModel.orderId}
                        </Text>
                        <Text
                            style={[styles.productNameTextStyle,productNameTextStyle]}>
                            {productModel.productName}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.GenreCategoryTextStyle,GenreCategoryTextStyle]}>
                                {productModel.category}/{productModel.genre}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtPriceTextStyle, BoughtPriceTextStyle]}>
                                Bought Price:
                            </Text>
                            <Text
                                style={[styles.BoughtPriceNumberTextStyle, BoughtPriceNumberTextStyle]}>
                                {orderModel.boughtPrice}$
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <View
                        style={[styles.detail, detailStyle]}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }}>
                            <Text
                                style={[styles.BoughtDateTextStyle,BoughtDateTextStyle]}>
                                Bought Date:
                            </Text>
                            <Text
                                style={[styles.BoughtDateNumberTextStyle,BoughtDateNumberTextStyle]}>
                                {orderModel.boughtDate}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text
                                style={[styles.StatusRegularTextStyle,StatusRegularTextStyle]}>
                                Status
                            </Text>
                            <Text
                                style={[styles.StatusIndicatorTextStyle,StatusIndicatorTextStyle]}>
                                {orderModel.currentSituation}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


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
        marginTop: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.METALIC_GRAY,
        marginBottom: 25,
        width: "100%",
    },
    hugeContainer : {
        flex : 1,
        flexDirection: 'row',
        marginHorizontal:8,
        paddingHorizontal: 8,
        height: SCREEN_HEIGHT,
        elevation: 2,
        backgroundColor: "#FFF",
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.METALIC_GRAY,
        marginBottom: 25,
        width: "100%",
    },
    detail:{
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal: 5,
        height: "100%"
    },
    orderIdTextStyle: {
        color: '#FF8303',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'left',
        textDecorationLine:'underline'
    },
    productNameTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        top:5
    },
    GenreCategoryTextStyle:{
        fontWeight: 'bold',
        fontSize: 13,
        color: '#FF8303',
        textAlign: 'center',
        top:15
    },
    BoughtPriceTextStyle:{
        fontWeight: 'bold',
        fontSize: 13,
        color: '#FF8303',
        textAlign: 'center',
        top:25,
        textDecorationLine:'underline'
    },
    BoughtPriceNumberTextStyle:{
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.BLACK,
        textAlign: 'center',
        top:25,
        left:5,
        right:5
    },
    BoughtDateNumberTextStyle:{
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.BLACK,
        textAlign: 'center',
        top:10,
        left:5,
        right:5
    },

    BoughtDateTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FF8303',
        textAlign: 'center',
        top:10,
        textDecorationLine:'underline'
    },
    StatusRegularTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FF8303',
        textAlign: 'center',
        top:10,
        textDecorationLine:'underline'
    },
    StatusIndicatorTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.BLACK,
        textAlign: 'center',
        top:10,
        left:5
    }

})


OrderArrayItem.propTypes = {
    containerStyle: PropTypes.object,
    hugeContainerStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    productModel: PropTypes.array.isRequired,
    orderModel: PropTypes.array.isRequired,
    orderIdTextStyle: PropTypes.object,
    productNameTextStyle: PropTypes.object,
    GenreCategoryTextStyle:PropTypes.object,
    navigatePage: PropTypes.string,
    BoughtPriceTextStyle:PropTypes.object,
    BoughtPriceNumberTextStyle:PropTypes.object,
    BoughtDateTextStyle:PropTypes.object,
    StatusRegularTextStyle:PropTypes.object,
    BoughtDateNumberTextStyle:PropTypes.object,
    StatusIndicatorTextStyle:PropTypes.object,


}

OrderArrayItem.defaultProps = {
    containerStyle: {},
    hugeContainerStyle:{},
    detailStyle: {},
    orderIdTextStyle: {},
    productNameTextStyle: {},
    CityTextStyle: {},
    CountryTextStyle: {},
    GenreCategoryTextStyle: {},
    BoughtPriceTextStyle: {},
    BoughtPriceNumberTextStyle: {},
    BoughtDateTextStyle: {},
    StatusRegularTextStyle:{},
    BoughtDateNumberTextStyle:{},
    StatusIndicatorTextStyle:{},
    navigatePage: "Profile",
}


export default OrderArrayItem;
