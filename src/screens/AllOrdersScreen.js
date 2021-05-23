import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';
import OrderListItem from '../components/OrderListItem';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function AllOrdersScreen({navigation,route}) {
    let [orderList,setOrderList] = useState([]);
    const [recordList,setRecordList] = useState([]);
    const renderSavedOrderListItem =  ({item, index}) => {
        return <OrderListItem
            orders={item.orders}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }
    useEffect(()=>{
        getSavedOrdersFromAPI();
    },[]);
    const getSavedOrdersFromAPI = () => {
        return fetch('http://10.0.2.2:8080/order/allInvoiceOfUser?email=' + global.mail, {  //burası invoices
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of invoice: ", json);
                setOrderList(json.invoices);
                console.log("Buradayım",orderList);

            }).catch((error) => {
                console.error(error);
            });
    };
    //console.log("Order lİST:", orderList.orders[0].orderModel.id);
    return (
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
            <View
                style={{
                    backgroundColor: "#FF8303",
                    height: 60,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 10,
                        width: '100%',
                    }}>
                    <View style={{width: '65%'}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#FFF',
                                fontWeight: 'bold',
                            }}> My Orders</Text>
                    </View>
                </View>

            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 680}}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: SCREEN_WIDTH,
                        alignItems: 'center',
                        top:10
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#FF8303',
                                textDecorationLine:"underline"
                            }}>
                            Orders
                        </Text>
                    </View>

                </View>

                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    data={orderList}
                    inverted={true}
                    renderItem={renderSavedOrderListItem}
                    keyExtractor={item => item.id}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#ffc487"
    },
});

export default AllOrdersScreen;
