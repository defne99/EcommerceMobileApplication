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
    console.disableYellowBox = true;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [Name, setName] = useState('');
    const [bookDetail, setBookDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rate, setRate] = useState(0.0);

    /* const bookDetailResponse = {
             "productId": 31,
             "productName": "Around the World in Eighty Days",
             "category": "Novel",
             "genre": "Adventure",
             "year": "2016",
             "description": "One night Phileas Fogg bets his companions that he can travel across the world in just eighty days and the very next day sets out from the port of Dover with his servant Passeportout to achieve his aim. Passing through exotic lands and dangerous places, they seize whatever transportation is at hand - whether train or elephant - always racing against the clock.There are many alarms and surprises along the way - and a last minute setback that makes all the difference between winning and losing.",
             "writer": "Jules Verne",
             "distributor": "Puffin Classics",
             "warrantyDaysLeft": 30,
             "initialPrice": 75.0,
             "currentPrice": 30.0,
             "discountStart": "2021-05-08",
             "discountEnd": "2021-06-04",
             "discountRatio": 40,
             "initialStock": 60,
             "currentStock": 27,
             "imgUrl": "https://www.booktopia.com.au/covers/500/9780141366296/0000/around-the-world-in-80-days.jpg"
         } */

    useEffect(() => {
        let bookId = route.params.params.bookId;
        global.generalBookId = bookId;
        /*console.log("mertmert");
        console.log(bookId);
        console.log("mertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmertmert");
        console.log(route);
        console.log(route.params);
        console.log(route.params.params);
        console.log(route.params.params.bookId);
        console.log(bookId);*/
        //console.log(bookId);
        //console.log(bookId+1);
        //bookId = 3;
        setIsLoading(true);
        //setBookDetail(bookDetailResponse);
        //https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getProduct?productId=
        fetch("http://localhost:8080/product/getProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json'
            },
        })
            .then(response => response.json())
            .then(bookDetail => {
                // console.log(bookDetail);
                setBookDetail(bookDetail); // localde bookDetail
                setIsLoading(false);
            })
            .catch(error => {
                //  console.log("Detail -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })


        // Get Rating request
        //https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product
        fetch("http://localhost:8080/rate/getRate?productId=" + bookId, {
            //console.log(route.params);
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(rate => {
                //console.log(rate);
                setRate(rate); // localde rate
            })
            .catch(error => {
                //console.log("Rate -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })


        // Comment request
        //https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/product/getCommentsOfProduct?productId=
        fetch("http://localhost:8080/comments/getCommentsOfProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(comments => {
                //console.log(comments);
                /*
                comments = [
                    {
                        id: 1,
                        userId:2,
                        productId: 30,
                        comment: "Great",
                    },
                    {
                        id: 2,
                        userId:3,
                        productId: 30,
                        comment: "Super",
                    }
                ];*/
                setComments(comments);
            })
            .catch(error => {
                //console.log("comments -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })

    },[])

    /*const _handleComment = (comment) => {
            //console.log(rating);
            fetch("http://localhost:8080/comments/comment", {
                //console.log(route.params);
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                         productId : global.generalBookId,
                        userId: global.userid,
                        comment : comment

                })
            })
                .then(response => response.json())
                .then(defne => {
                })
                .catch(error => {
                    Alert("Error", "An error has occurred!");
                })
        }*/


    function onCommentPressed(){
        /*console.log("defnedefne");
        console.log(global.userid);
        console.log(global.generalBookId);
        console.log(Name);
        console.log(comment);*/
        fetch("http://localhost:8080/comments/comment", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                userId:global.userid,
                productId:global.generalBookId,
                fullname: Name ,
                comment: comment,
            })
        }) .then(response => response.json())
            .then(defne => {
                setComments(defne);
            })
            .then(response => response.json())

    }
    function onBuyPressed() {

        //navigation.goBack();
    }
    function onCartPressed() {
        console.log("mertmert");
        console.log(global.userid);
        console.log(global.generalBookId);

        fetch("http://localhost:8080/cart/addToCart?userId="+global.userid+"&productId="+ global.generalBookId +"&quantity=1", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())

    }
    function renderCommentButton() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle_comment}
                onPress={() => onCommentPressed()}>
                <Text style={styles.addtocart_TextStyle}>Comment</Text>
            </TouchableOpacity>
        );
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
                <Text style={styles.addtocart_TextStyle}>Add To Cart</Text>
            </TouchableOpacity>
        );
    }

    const _renderComments = ({item, index}) => {
        return (
            <View style={{width: "100%", paddingVertical: 15, borderBottomWidth: 5, borderBottomColor: Colors.METALIC_GRAY}}>
                <Text style={{fontWeight:'bold',fontSize:16}}>{item.fullname}</Text>
                <Text>{item.comment}</Text>
            </View>
        )
    }

    const _handleSendRating = (rating) => {
        //console.log(rating);
        fetch("http://localhost:8080/rate/rate", {
            //console.log(route.params);
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: global.userid,
                productId:global.generalBookId,
                star:rating
            })
        })
            .then(response => response.json())
            .then(defne => {
                setRate(defne);
            })
            .catch(error => {
                Alert("Error", "An error has occurred!");
            })
    }
    if(global.userid!==-1){
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
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={30}
                                    readonly
                                    fractions={1}
                                    startingValue={rate}
                                    style={{
                                        color: '#FF8303',
                                        marginTop: 10,
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
                                        {
                                            bookDetail.discountRatio > 0 ?
                                                <Text>
                                                    <Text style={styles.initialPriceOverLine}>${bookDetail.initialPrice}</Text>
                                                    ${bookDetail.currentPrice}
                                                </Text>
                                                :
                                                "$" + bookDetail.currentPrice
                                        }

                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            left:95,
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
                                            justifyContent: 'center',
                                        }}>
                                        {renderCartButton()}
                                    </View>

                                    <Text style={{
                                        width: "100%",
                                        height: 40,
                                        left: 45,
                                        textAlign: "center",
                                        fontSize: 22,
                                        color: Colors.MIDDLE_GRAY,
                                        marginTop: 15
                                    }}>What is your opinion?</Text>

                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={30}
                                        onFinishRating={_handleSendRating}
                                        fractions={1}
                                        startingValue={0}
                                        style={{
                                            color: '#FF8303',
                                        }}
                                    />
                                    <TextInput
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        style={{
                                            height: 42,
                                            borderWidth: 1,
                                            borderRadius: 16,
                                            marginTop: 15,
                                            paddingLeft: 16,
                                            borderColor: '#FF9C33',
                                        }}
                                        onChangeText={setName}
                                        placeholder="Full Name"
                                        placeholderTextColor="#FF9C33"
                                        value={Name}
                                        keyboardType="default"
                                    />
                                    <TextInput
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        style={styles.comments}
                                        onChangeText={setComment}
                                        placeholder="Leave A Comment"
                                        placeholderTextColor="#FF9C33"
                                        value={comment}//_handleComment
                                        keyboardType="default"
                                        maxLength={200}
                                        textAlignVertical={'top'}
                                        numberOfLines={4}
                                        multiline={true}
                                    />
                                    {renderCommentButton()}


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
    }
    else{
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
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={30}
                                    readonly
                                    fractions={1}
                                    startingValue={rate}
                                    style={{
                                        color: '#FF8303',
                                        marginTop: 10,
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
                                        {
                                            bookDetail.discountRatio > 0 ?
                                                <Text>
                                                    <Text style={styles.initialPriceOverLine}>${bookDetail.initialPrice}</Text>
                                                    ${bookDetail.currentPrice}
                                                </Text>
                                                :
                                                "$" + bookDetail.currentPrice
                                        }

                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            left:95,
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
                                            justifyContent: 'center',
                                        }}>
                                        {renderCartButton()}
                                    </View>
                                    <TextInput
                                        style={{
                                            height: 42,
                                            borderWidth: 1,
                                            borderRadius: 16,
                                            marginTop: 15,
                                            paddingLeft: 16,
                                            borderColor: '#FF9C33',
                                        }}
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        onChangeText={setName}
                                        placeholder="Full Name"
                                        placeholderTextColor="#FF9C33"
                                        value={Name}
                                        keyboardType="default"
                                    />
                                    <TextInput
                                        style={styles.comments}
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        onChangeText={setComment}
                                        placeholder="Leave A Comment"
                                        placeholderTextColor="#FF9C33"
                                        value={comment}//_handleComment
                                        keyboardType="default"
                                        maxLength={200}
                                        textAlignVertical={'top'}
                                        numberOfLines={4}
                                        multiline={true}
                                    />
                                    {renderCommentButton()}
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
    }

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
    buttonStyle_comment: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        left:210,
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
        height: 100,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FF9C33',
        borderRadius: 20,
        paddingTop: 10,
        paddingLeft:16
    },
    initialPriceOverLine: {
        textDecorationLine: "line-through",
        fontSize: 16,
        color: Colors.MIDDLE_GRAY
    }
});
export default Detail;
