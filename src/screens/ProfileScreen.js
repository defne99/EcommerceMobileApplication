import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList,
    Dimensions,
    TextInput,
    ImageBackground,
    Button,
} from 'react-native';

import Colors from '../constants/Colors';



const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");


function ProfileScreen({navigation, route}) {

    const [user , setUser] = useState([]);
    useEffect(()=>{
        getUserInformationFromAPI();
    },[]);

    const getUserInformationFromAPI = () => {
        return fetch("http://10.0.2.2:8080/user/getByID?id=" + global.userid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json'
            },
        })
            .then(response => response.json())
            .then(user => {
                // console.log(bookDetail);
                setUser(user);

            })
            .catch(error => {
                //  console.log("Detail -> useEffect ->catch:", error);
                Alert("Error", "An error has occurred!");
            })
    };

    return(
        <View style={{
            flex:1,
            backgroundColor:"#FFF",

        }}>
            <View style={{
                flexDirection:"row",
                width:"100%",
                height:"70%"
            }}>
                <View style={{width:"10%",paddingLeft:20}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer}onPress={() => navigation.navigate("EditProfile")}>
                            <View>
                                {/*<Image
                                    source={require('../constants/images/profile.png')}
                                    style={{marginVertical: 40, height: 40, width: 40}}
                                />*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderRadius:10,
                            borderColor:Colors.METALIC_GRAY,
                            borderWidth:2,
                            marginLeft:15,
                            width:100,
                            height:32,
                            marginVertical:40,
                            marginTop:10
                        }}>
                            <Text style={{paddingLeft:6,justifyContent:'center',fontSize:16}}> Edit Profile</Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer}onPress={() => navigation.navigate("AllOrders")}>
                            <View>
                                {/*<Image
                                    source={require('../constants/images/package.png')}
                                    style={{marginVertical:40,height:40, width:40}}
                                />*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderRadius:10,
                            borderColor:Colors.METALIC_GRAY,
                            borderWidth:2,
                            marginLeft:15,
                            width:120,
                            height:32,
                            marginVertical:40,
                            marginTop:10
                        }}>
                            <Text style={{paddingLeft:6,justifyContent:'center',fontSize:16}}> Order&Status</Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("AllAddress")}>
                            <View>
                                {/*<Image
                                    source={require('../constants/images/address.png')}
                                    style={{marginVertical:40,height:40, width:40}}
                                />*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderRadius:10,
                            borderColor:Colors.METALIC_GRAY,
                            borderWidth:2,
                            marginLeft:15,
                            width:120,
                            height:32,
                            marginVertical:40,
                            marginTop:10
                        }}>
                            <Text style={{paddingLeft:6,justifyContent:'center',fontSize:16}}> My Addresses</Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("AllPayment")}>
                            <View>
                                {/*<Image
                                    source={require('../constants/images/card.png')}
                                    style={{marginVertical:40,height:40, width:40}}
                                />*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderRadius:10,
                            borderColor:Colors.METALIC_GRAY,
                            borderWidth:2,
                            marginLeft:15,
                            width:140,
                            height:32,
                            marginVertical:40,
                            marginTop:10
                        }}>
                            <Text style={{paddingLeft:6,justifyContent:'center',fontSize:16}}> My Credit Cards</Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigation.navigate("AllComments")}>
                            <View>
                                {/*<Image
                                    source={require('../constants/images/speech-bubble.png')}
                                    style={{marginVertical:40,height:40, width:40}}
                                />*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderRadius:10,
                            borderColor:Colors.METALIC_GRAY,
                            borderWidth:2,
                            marginLeft:15,
                            width:125,
                            height:32,
                            marginVertical:40,
                            marginTop:10
                        }}>
                            <Text style={{paddingLeft:6,justifyContent:'center',fontSize:16}}> My Comments</Text>

                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection:"row",
                width:"100%"
            }}>
                <View style={{
                    width:"100%",
                    height:300,
                    marginTop:20,
                    borderTopRightRadius:60,
                    borderTopLeftRadius:60,

                }}>
                    {/*<Image style={{
                        height:190,
                        width:"100%",
                        borderTopRightRadius:100,
                        borderTopLeftRadius:100
                    }} source={require("../constants/images/book.jpg")} />*/}
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        flex:1
    },
    buttonContainer: {
        backgroundColor: "#FFF",
        height:50,
        width: 50,
        borderRadius: 5,
        elevation: 1,
        left:0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        borderColor: Colors.DARK_MUSTARD,
        borderWidth:1
    },
    buttonContainerView: {
        backgroundColor: "#FFF",
        height: 50,
        width: 50,
        borderRadius: 5,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        borderColor: Colors.DARK_MUSTARD,
        borderWidth:2
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#250356"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        alignItems:'center'
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    AccountInformation: {
        width:250,
        height:50,
        borderRadius:40,
        overflow:'hidden',
        borderColor: Colors.DARK_BLUE,
        backgroundColor:'#FFFFFF',
        borderWidth: 4,
        top:-150,
        right:15,
        left:-5,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        borderColor:Colors.DARK_BLUE,
        borderWidth:4,
        top:-120,
        left:15,
    },
    address: {
        backgroundColor: "#FF8303",
        position: "absolute",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    payment: {
        backgroundColor: "#FF8303",
        position: "absolute",
        top: 65,
        left:-15,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    edit: {
        backgroundColor: "#FF8303",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 16
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#FF8303",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    slide:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF"
    }
});

export default ProfileScreen;
