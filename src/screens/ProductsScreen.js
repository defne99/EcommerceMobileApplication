import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookListItem from "../components/BookListItem";
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from "../components/SearchBar";
import {func} from 'prop-types';
import Colors from "../constants/Colors";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
console.disableYellowBox = true;
const RecommendedProduct = ({recommendedProduct}) => (

    <TouchableOpacity
        //onPress={() => navigation.navigate('Detail')}
        style={{
            height: 250,
            elevation: 2,
            backgroundColor: '#FFF',
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 150,
        }}>
        /* <Image
        source={{
            uri: recommendedProduct.imgUrl,
        }}
        style={{
            width: 100,
            height: 150,
            marginLeft: 25,
            marginRight: 25,
            paddingTop: 10,
        }}
    />*/
        <View
            style={{
                flexDirection: 'column',
                paddingTop: 5,
                paddingHorizontal: 10,
            }}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    textAlign: 'center',
                }}>{recommendedProduct.productName}</Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 10,
                    textAlign: 'center',
                }}>{recommendedProduct.writer}</Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#FF8303',
                    textAlign: 'center',
                }}>{recommendedProduct.currentPrice}</Text>
        </View>
    </TouchableOpacity>
);

const NewComerProduct = ({newComerProduct}) => (
    <TouchableOpacity
        //onPress={() => navigation.navigate('Detail')}
        style={{
            height: 250,
            elevation: 2,
            backgroundColor: '#FFF',
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 150,
        }}>
        /*
        <Image
            source={{
                uri: newComerProduct.imgUrl,
            }}
            style={{
                width: 100,
                height: 150,
                marginLeft: 25,
                marginRight: 25,
                paddingTop: 10,
            }}
        />*/
        <View
            style={{
                flexDirection: 'column',
                paddingTop: 5,
                paddingHorizontal: 10,
            }}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    textAlign: 'center',
                }}>{newComerProduct.productName}</Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 10,
                    textAlign: 'center',
                }}>{newComerProduct.writer}</Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#FF8303',
                    textAlign: 'center',
                }}>{newComerProduct.currentPrice}</Text>
        </View>
    </TouchableOpacity>
);

function ProductsScreen({navigation}) {

    if(typeof(global.userid) === "undefined"){
        global.userid=-1;
        global.mail = "";
    }
    const [user , setUser] = useState("");
    const [searchText, setSearchText] = useState("");
    const [recommendedList,setRecommendedList] = useState([]);
    const [NewComerList,setNewComerList] = useState([]);
    const [HighestDiscountList,setHighestDiscountList] = useState([]);

    useEffect(()=>{
        getUser();
        getRecommendedProductsfromAPI();
        getNewComerProductsfromAPI();
        getHighestDiscountfromAPI();


    },[]);

    const getUser = () => {
        fetch("http://10.0.2.2:8080/user/getByID?id=" + global.userid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response =>response.json())
            .then(json => {
                global.username = json.name;
                global.mobile = json.mobile;
                console.log(username);

            })
            .catch(error => {
                Alert("Error", "An error has occurred!");
            })

    };
    const renderRecommendedItem =  ({item, index}) => {
        return <BookListItem
            bookId={item.productId}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            initialPrice={item.initialPrice}
            currentPrice={item.currentPrice}
            discount={item.discountRatio}
            uri={item.imgUrl}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    /*({ item }) => (
        <RecommendedProduct title={item.title} />
    );*/
    const renderNewComerItem= ({item, index}) => {
        return <BookListItem
            bookId={item.productId}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            initialPrice={item.initialPrice}
            currentPrice={item.currentPrice}
            discount={item.discountRatio}
            uri={item.imgUrl}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }

    const renderHighestDiscountItem= ({item, index}) => {
        return <BookListItem
            bookId={item.productId}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            initialPrice={item.initialPrice}
            currentPrice={item.currentPrice}
            discount={item.discountRatio}
            uri={item.imgUrl}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }

    /*
     ({item}) => (
         <NewComerProduct title={item.title}/>
     );
 */
    const getRecommendedProductsfromAPI = () => {
        return fetch('http://10.0.2.2:8080/product/recentlyPublished',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("List of Recommended: ", json);
                setRecommendedList(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getNewComerProductsfromAPI = () => {
        return fetch('http://10.0.2.2:8080/product/runningOut',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("List of New Comers: ", json);
                setNewComerList(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const getHighestDiscountfromAPI = () => {
        return fetch('http://10.0.2.2:8080/product/highestDiscount',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("List of New Comers: ", json);
                setHighestDiscountList(json);
            }).catch((error) => {
                console.error(error);
            });
    };


    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }


    const _onSubmitSearchBar = () => {
        navigation.navigate("Search", {searchText});
    }

    function onCartPressed(){
        console.log("mertmertmertproduct");
        navigation.navigate('CartScreen');
    }

    return (
        <SafeAreaView style={{backgroundColor: Colors.WHITE}}>
            <View
                style={{
                    backgroundColor: 'lightgrey',
                    height: 120,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
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
                            }}>

                        </Text>
                    </View>
                    <View style={{alignItems: 'center', right: 30}}>
                        <Image
                            source={require('../constants/images/logo.jpg')}
                            style={{height: 50, width: 110}}
                        />
                    </View>

                    <View style={{width: '50%', alignItems:'flex-end',right:50}}>
                        <TouchableOpacity onPress={() => onCartPressed()}>
                            <Icon name="ios-cart" style={{fontSize: 40,color:"orange"}} />
                        </TouchableOpacity>
                    </View>

                </View>

                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSubmitEditing={_onSubmitSearchBar}
                />

            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{height: 550}}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                        top:10
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#FF8303',
                            }}>
                            Recently Published
                        </Text>
                    </View>

                </View>

                <FlatList
                    horizontal={true}
                    data={recommendedList}
                    renderItem={renderRecommendedItem}
                    keyExtractor={item => item.id}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#FF8303',
                                top:10
                            }}>
                            Running Out
                        </Text>
                    </View>
                </View>

                <FlatList
                    horizontal={true}
                    data={NewComerList}
                    renderItem={renderNewComerItem}
                    keyExtractor={item => item.id}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#FF8303',
                                top:10
                            }}>
                            Highest Discount
                        </Text>
                    </View>
                </View>

                <FlatList
                    horizontal={true}
                    data={HighestDiscountList}
                    renderItem={renderHighestDiscountItem}
                    keyExtractor={item => item.id}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

export default ProductsScreen;
