import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Alert,
    ActivityIndicator, FlatList
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Rating} from 'react-native-elements';
import Colors from "../constants/Colors";

const Detail = ({navigation, route}) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [userName, setUserName] = useState('');
    const [bookDetail, setBookDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rate, setRate] = useState(0.0);

    const bookDetailResponse = {
        "productId": 30,
        "productName": "Dokuza Kadar On",
        "category": "Poetry",
        "genre": "Turkish Poetry",
        "year": "2017",
        "description": "Yalnızlık paylaşılmaz Paylaşılsa yalnızlık olmaz.(Tanıtım Bülteninden)",
        "writer": "Özdemir Asaf",
        "distributor": "Yapı Kredi Yayınları",
        "warrantyDaysLeft": 30,
        "initialPrice": 10.0,
        "currentPrice": 10.0,
        "discountRatio": 0,
        "initialStock": 35,
        "currentStock": 27,
        "imgUrl": "https://i.dr.com.tr/cache/600x600-0/originals/0000000330969-1.jpg"
    }

    useEffect(() => {
        let {bookId} = route.params;
        bookId = 3;
        setIsLoading(true);
        fetch("https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(bookDetail => {
                console.log(bookDetail);
                setBookDetail(bookDetailResponse); // localde bookDetail
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Detail -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })


        // Rating request
        fetch("https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getRate?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(rate => {
                console.log(rate);
                setRate(4.5); // localde rate
            })
            .catch(error => {
                console.log("Rate -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })


        // Comment request
        fetch("https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getCommentsOfProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(comments => {
                console.log(comments);
                comments = [
                    {
                        userName: "Defne ÖGEL",
                        comment: "Great",
                        date: "24.04.2021",
                        rate: 5,
                        like: 15,
                        dislike: 1
                    },
                    {
                        userName: "Alp ATAKAV",
                        comment: "Super",
                        date: "25.04.2021",
                        rate: 4.5,
                        like: 10,
                        dislike: 2
                    }
                ];
                setComments(comments);
            })
            .catch(error => {
                console.log("comments -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })

    },[])

    function onBuyPressed() {
        //navigation.goBack();
    }
    function onCartPressed() {
        //navigation.goBack();
    }
    function renderBuyButton() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle_buy}
                onPress={() => onBuyPressed()}>
                <Text style={styles.addtocart_TextStyle}>BUY</Text>
            </TouchableOpacity>
        );
    }
    function renderCartButton() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle_addtocart}
                onPress={() => onCartPressed()}>
                <Text style={styles.addtocart_TextStyle}>ADD TO CART</Text>
            </TouchableOpacity>
        );
    }

    const _renderComments = ({item, index}) => {
        return (
            <View style={{width: "100%", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: Colors.METALIC_GRAY}}>
                <Text>Username: {item.userName}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Comment: {item.comment}</Text>
                <Text>Rate: {item.rate}</Text>
                <Text>Like: {item.like}</Text>
                <Text>Dislike: {item.dislike}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: '#FF8303',
                    height: 50,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -20,
                        marginLeft: -20,
                        width: '100%',
                    }}>
                    <View style={{width: '10%', paddingLeft: 20}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../constants/images/17.png')}
                                style={{marginVertical: 40}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

                {
                    isLoading ?
                        <View style={{height: "90%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                            <ActivityIndicator size="large" color={Colors.DARK_MUSTARD}/>
                        </View>
                        :

                        <ScrollView
                            vertical
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            style={{width: 400}}>
                         <View
                            style={{

                                elevation: 2,
                                backgroundColor: '#FFF',
                                marginLeft: 20,
                                marginTop: 20,
                                borderRadius: 15,
                                marginBottom: 50,
                                width: 350,
                                alignItems: 'center',
                            }}>
                            <Image
                                source={{
                                    uri:bookDetail.imgUrl,
                                }}
                                style={{
                                    width: 275,
                                    height: 400,
                                    marginLeft: 25,
                                    marginRight: 25,
                                    paddingTop: 10,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    paddingTop: 5,
                                    paddingHorizontal: 15,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 30,
                                        textAlign: 'center',
                                    }}>
                                    {bookDetail.productName}
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 22,
                                        textAlign: 'center',
                                        marginTop: 10,
                                    }}>
                                    {bookDetail.writer}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: 18,
                                        color: 'grey',
                                        textAlign: 'center',
                                        marginTop: 10,
                                    }}>
                                    {' '}
                                    {bookDetail.distributor}
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 22,
                                        color: '#FF8303',
                                        textAlign: 'center',
                                        marginTop: 10,
                                    }}>
                                    ${bookDetail.currentPrice}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        color: '#FF8303',
                                        textAlign: 'left',
                                        marginTop: 10,
                                    }}>
                                    Description
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: 12,
                                        color: 'grey',
                                        textAlign: 'left',
                                        marginTop: 5,
                                    }}>
                                    {bookDetail.description}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: 18,
                                        color: 'black',
                                        textAlign: 'auto',
                                        marginTop: 10,
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingTop: 5,
                                        paddingHorizontal: 15,
                                        justifyContent: 'space-around',
                                    }}>
                                    {renderBuyButton()}
                                    {renderCartButton()}
                                </View>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={30}
                                    showRating
                                    fractions={0.1}
                                    startingValue={rate}
                                    style={{
                                        color: '#FF8303',
                                        marginTop: 10,
                                    }}
                                />
                                <TextInput
                                    style={{
                                        height: 42,
                                        borderWidth: 1,
                                        borderRadius: 16,
                                        marginTop: 15,
                                        paddingLeft: 16,
                                        borderColor: '#FF9C33',
                                    }}
                                    onChangeText={setUserName}
                                    placeholder="username"
                                    placeholderTextColor="#FF9C33"
                                    value={userName}
                                    keyboardType="default"
                                />
                                <TextInput
                                    style={styles.comments}
                                    onChangeText={setComment}
                                    placeholder="Leave a comment"
                                    placeholderTextColor="#FF9C33"
                                    value={comment}
                                    keyboardType="default"
                                    maxLength={200}
                                    textAlignVertical={'top'}
                                />

                                <FlatList
                                    data={comments}
                                    renderItem={_renderComments}
                                    keyExtractor={(item) => Math.random().toString()} nestedScrollEnabled={true}
                                />
                            </View>

                        </View>
                        </ScrollView>
                }


        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    buttonStyle_addtocart: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#ff9c33',
    },
    buttonStyle_buy: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33',
    },
    logIn_register_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8',
    },

    addtocart_TextStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#faf8f8',
    },
    comments: {
        height: 200,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#FF9C33',
        borderRadius: 20,
        paddingTop: 20,
    },
});
export default Detail;
