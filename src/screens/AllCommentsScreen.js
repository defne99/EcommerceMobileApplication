import React, {useEffect, useState} from 'react';
import {StyleSheet,SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SavedAddressListItem from '../components/SavedAddressListItem';
import SavedAllAddressesListItem from '../components/SavedAllAddressesListItem';
import Colors from '../constants/Colors';
import AddressInput from '../components/AddressInput';
import OpenAddressInput from '../components/OpenAddressInput';
import SavedAllCommentsListItem from '../components/SavedAllCommentsListItem';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function AllCommentsScreen({navigation, route}) {
    const [commentList,setCommentList] = useState([]);
    const renderSavedCommentsListItems =  ({item, index}) => {
        return <SavedAllCommentsListItem
            comment={item.commentsModel.comment}
            commentId={item.commentsModel.id}
            status={item.commentsModel.status}
            productName={item.productModel.productName}
            uri={item.productModel.imgUrl}
            full_name={item.commentsModel.fullname}
            commentProductId={item.commentsModel.product_id}
            status={item.commentsModel.status}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    function renderDeleteAllCommentsButton() {
        return <TouchableOpacity
            style={styles.buttonStyleSave}
            onPress={() => onDeleteAllCommentsPressed()}>
            <Text style={styles.buy_TextStyle}>Delete All Comments</Text>
        </TouchableOpacity>
    }
    useEffect(()=>{
        getSavedCommentsFromAPI();
    },[]);
    const getSavedCommentsFromAPI = () => {
        return fetch('http://10.0.2.2:8080/comments/getCommentsOfUser?userId=' + global.userid,{  //burası pending
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of comments: ", json);
                setCommentList(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    function onDeleteAllCommentsPressed() {
        fetch("http://10.0.2.2:8080/comments/clear?userId=" + global.userid, {
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
        });}

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
                            }}> My Comments</Text>
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
                            Saved Comments
                        </Text>
                    </View>

                </View>

                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    data={commentList}
                    renderItem={renderSavedCommentsListItems}
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
    buy_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },
    buttonStyleSave: {
        height: 50,
        width:150,
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20,
        left:42,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.DARK_MUSTARD,
        borderColor: Colors.METALIC_GRAY
    },
});

export default AllCommentsScreen;
