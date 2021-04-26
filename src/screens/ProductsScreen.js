import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookListItem from "../components/BookListItem";
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from "../components/SearchBar";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

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

    const [searchText, setSearchText] = useState("");
    const [recommendedList,setRecommendedList] = useState([]);
    const [NewComerList,setNewComerList] = useState([]);

    useEffect(()=>{
        getRecommendedProductsfromAPI();
        getNewComerProductsfromAPI();
    },[]);


    const renderRecommendedItem =  ({item, index}) => {
        return <BookListItem
            bookId={Math.random()}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            price={item.initialPrice}
            uri={item.imgUrl}
            containerStyle={{width: (SCREEN_WIDTH - 20) / 2.2}}
        />
    }
    /*({ item }) => (
        <RecommendedProduct title={item.title} />
    );*/
    const renderNewComerItem= ({item, index}) => {
        return <BookListItem
            bookId={Math.random()}
            bookName={item.productName}
            _handleNavigate={_handleNavigate}
            authorName={item.writer}
            price={item.initialPrice}
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
        return fetch('http://localhost:8080/product/getProducts',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of Recommended: ", json);
                setRecommendedList(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getNewComerProductsfromAPI = () => {
        return fetch('http://localhost:8080/product/recentlyPublished',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of New Comers: ", json);
                setNewComerList(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    /*
    .then(assignment =>{
                      //console.log("List of Recommended: ", json);
                      setRecommendedList(assignment);
                })

    .then(assignment =>{
                        //console.log("List of Recommended: ", json);
                        setNewComerList(assignment);
                  })
    */

    /* function onLogOutGeneralPressed() {
         const jsonValue = JSON.stringify(false);
         AsyncStorage.setItem('isLoggedIn', jsonValue) // when isLoggedIn false we log out
             .then(() => {
                 navigation.goBack();
             });
     }*/

    function onLogOutPressed() {
        const jsonValue = JSON.stringify(false);
        AsyncStorage.setItem('isLoggedIn', jsonValue) // when isLoggedIn false we log out
            .then(() => {});
    };

    const _handleNavigate = (pageName, params) => {
        navigation.navigate(pageName, params);
    }

    const _onSubmitSearchBar = () => {
        navigation.navigate("Search", {searchText});
    }

    return (
        <SafeAreaView>
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
                    <View style={{alignItems: 'center', right: 110}}>
                        <Image
                            source={require('../constants/images/logo.jpg')}
                            style={{height: 50, width: 110}}
                        />
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
                    }}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: '#FF8303',
                            }}>
                            Recommended
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
                                fontSize: 15,
                                color: '#FF8303',
                            }}>
                            New Comers
                        </Text>
                    </View>
                </View>
                <FlatList
                    horizontal={true}
                    data={NewComerList}
                    renderItem={renderNewComerItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProductsScreen;
