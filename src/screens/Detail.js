import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Rating} from 'react-native-elements';

const Detail = ({navigation}) => {
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');

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
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{width: 400}}>
                <View
                    style={{
                        height: 1200,
                        elevation: 2,
                        backgroundColor: '#FFF',
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 350,
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{
                            uri:
                                'https://images-na.ssl-images-amazon.com/images/I/51k+lXZyJ6L._SX322_BO1,204,203,200_.jpg',
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
                            "A Gentleman In Moscow"
                        </Text>

                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 22,
                                textAlign: 'center',
                                marginTop: 10,
                            }}>
                            Amor Towles
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
                            Windmill Books
                        </Text>

                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 22,
                                color: '#FF8303',
                                textAlign: 'center',
                                marginTop: 10,
                            }}>
                            $148.31
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
                            From the New York Times bestselling author of Rules of Civility -
                            a transporting novel about a man who is ordered to spend the rest
                            of his life inside a luxury hotel.
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
                            startingValue={0.0}
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
                    </View>
                </View>
            </ScrollView>
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
