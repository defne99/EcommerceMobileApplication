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
    useEffect(() => {
        let bookId = route.params.params.bookId;
        global.generalBookId = bookId;
        setIsLoading(true);
        fetch("http://10.0.2.2:8080/product/getProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        fetch("http://10.0.2.2:8080/rate/getRate?productId=" + bookId, {
            //console.log(route.params);
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        fetch("http://10.0.2.2:8080/comments/getCommentsOfProduct?productId=" + bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(comments => {
                setComments(comments);
            })
            .catch(error => {
                //console.log("comments -> useEffect ->catch:", error);
                setIsLoading(false);
                Alert("Error", "An error has occurred!");
            })

    },[])
    function onCommentPressed(){
        /*console.log("defnedefne");
        console.log(global.userid);
        console.log(global.generalBookId);
        console.log(Name);
        console.log(comment);*/
        fetch("http://10.0.2.2:8080/comments/comment", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                userId:global.userid,
                productId:global.generalBookId,
                fullname: global.username ,
                comment: comment,
            })
        }) .then(response => response.json())
            .then(defne => {
                setComments(defne);
            })
            .then(response => response.json())

    }
    function onAnonymusCommentPressed(){
        fetch("http://10.0.2.2:8080/comments/comment", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                userId:global.userid,
                productId:global.generalBookId,
                fullname: Name,
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

        fetch("http://10.0.2.2:8080/cart/addToCart?userId="+global.userid+"&productId="+ global.generalBookId +"&quantity=1", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
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
    function renderAnonymusCommentButton() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle_comment}
                onPress={() => onAnonymusCommentPressed()}>
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
            <View style={{width: "100%", paddingVertical: 15, borderBottomWidth: 5,borderTopWidth:5,borderTopColor:Colors.BEST_ORANGE, borderBottomColor: Colors.BEST_ORANGE, borderRadius:16,marginTop:12, marginBottom:2}}>
                <Text style={{fontWeight:'bold',fontSize:16,color:Colors.DARK_GRAY,left:15}}>{item.fullname}</Text>
                <Text style={{left:15}}>{item.comment}</Text>
            </View>
        )
    }

    const _handleSendRating = (rating) => {
        //console.log(rating);
        fetch("http://10.0.2.2:8080/rate/rate", {
            //console.log(route.params);
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                                        style={styles.comments}
                                        onChangeText={setComment}
                                        placeholder="Leave A Comment"S
                                        placeholderTextColor= {Colors.DARK_GRAY}
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
                                            borderColor: Colors.DARK_GRAY,
                                        }}
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        onChangeText={setName}
                                        placeholder="Full Name"
                                        placeholderTextColor={Colors.DARK_GRAY}
                                        value={Name}
                                        keyboardType="default"
                                    />
                                    <TextInput
                                        style={styles.comments}
                                        autoCorrect={false}
                                        autoCapitalize={false}
                                        onChangeText={setComment}
                                        placeholder="Leave A Comment"
                                        placeholderTextColor={Colors.DARK_GRAY}
                                        value={comment}//_handleComment
                                        keyboardType="default"
                                        maxLength={200}
                                        textAlignVertical={'top'}
                                        numberOfLines={4}
                                        multiline={true}
                                    />
                                    {renderAnonymusCommentButton()}
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
        borderColor: Colors.DARK_GRAY,
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
