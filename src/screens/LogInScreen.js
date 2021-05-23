import React, {useState} from 'react';

import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App';
import RegisterScreen from './RegisterScreen';
import Input from "../components/Input";
import Helper from "../services/Helper";
import MyFetch from "../services/fetch";
import Colors from '../constants/Colors';

function LogInScreen(props) {
    console.disableYellowBox = true;
    const {navigation} = props;


    const [email, setEmail] = useState(""); // value to username with setUsername function
    const [password, setPassword] = useState("");



    function onLogInPressed() {
        if (Helper.isFalsy(email) && Helper.isFalsy(password)) {
            Alert.alert("Warning", "Please fill out the form");
            return false
        }
        if (!Helper.validateEmail(email)) {
            Alert.alert("Warning", "Please enter a correct email");
            return false
        }
        if (Helper.isFalsy(password)) {
            Alert.alert("Warning", "Please enter your password");
            return false
        }
        //https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io/login
        fetch("http://10.0.2.2:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Basic ' + encode("ulaseraslan@sabanciuniv.edu" + ":" + password),
            },
            body: JSON.stringify({
                email:email,
                password:password,
                where : 'M'
            })
        })
            //MyFetch("/login", "POST", {email, password})
            //.then(response => response.json())
            .then((result) => {
                if(result.ok){
                    AsyncStorage.setItem('isLoggedIn', "true")
                        .then(response => result.json()).then(hey => {
                        global.userid = hey;
                        global.mail = email;
                        navigation.navigate("Products")

                    });
                } else {
                    if(status === 400){
                        Alert.alert("Error","Wrong e-mail or password!");

                    } else {
                        Alert.alert("Error","Something went wrong!");

                    }
                }

            }).catch(error => {
            console.warn(error)
            Alert.alert("Warning", "Please check your information")
        })


    }
    function onForgotPasswordPressed() {
        navigation.navigate("ForgotPassword");
    }

    function onRegisterPressed() {
        navigation.navigate("Register");
    }

    function renderLogInButton() {
        return <TouchableOpacity
            style={styles.buttonStyle_login}
            onPress={() => onLogInPressed()}>
            <Text style={styles.logIn_register_TextStyle}>SIGN IN</Text>
        </TouchableOpacity>
    }

    function renderRegisterButton() {
        return <TouchableOpacity
            style={styles.buttonStyle_register}
            onPress={() => onRegisterPressed()}>
            <Text style={styles.logIn_register_TextStyle}>SIGN UP</Text>
        </TouchableOpacity>
    }
    function renderForgotPassword() {
        return <TouchableOpacity
            onPress={() => onForgotPasswordPressed()}>
            <Text style={styles.forgotPasswordStyle}> Forgot Password?</Text>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: 16,
                marginRight: 16,
            }}>

                <Image
                    style={{width: 380, height: 210, justifyContent: 'center'}}
                    source={require('../../assets/photo2.jpg')}
                />
                <Input
                    setValue={setEmail}
                    placeholderText="Email"
                    value={email}
                    keyboardType="email-address"
                />
                <Input
                    setValue={setPassword}
                    placeholderText="Password"
                    value={password}
                    isSecureText={true}
                />
                {renderLogInButton()}
                {renderRegisterButton()}
                {renderForgotPassword()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    forgotPasswordStyle: {
        marginTop: 7,
        color: Colors.BLACK,
    },

    buttonStyle_proceed: {
        height: 30,
        width: 200,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#faf9f7',
        borderColor: '#faf9f7',
        position: 'absolute',
        bottom: 0,
        left: 190,
    },

    buttonStyle_login: {
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#ff9c33'
    },
    buttonStyle_register: {
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33'
    },
    logIn_register_TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },

    proceed_TextStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#0c0c0c'
    },

});

export default LogInScreen;
