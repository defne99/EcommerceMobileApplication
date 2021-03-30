
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
import RegisterScreen from '../RegisterScreen';
import ProductScreenGeneral from '../ProductScreenGeneral';
import Input from "../components/Input";

function LogInScreen({ navigation }){
    const { logIn } = React.useContext(AuthContext);
    const { Register } = React.useContext(AuthContext);

    const [email, setEmail] = useState(""); // value to username with setUsername function
    const [password, setPassword] = useState("");


    function onLogInPressed(){
        if(email === ""){
            Alert.alert("Warning", "Please enter your email");
            return false
        }
        if(password === ""){
            Alert.alert("Warning", "Please enter your password");
            return false
        }

        /*fetch("127.0.0.1:8080/login",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                email,
                password
            }) // body data type must match "Content-Type" header
        })
            .then ((result) => {
                AsyncStorage.setItem('isLoggedIn', result) // backendte ne donuyor? token?
                    .then(() => {
                        logIn();
                    });
            }) .catch(error => { // backend {success:false,message:"Please..."}
                console.warn(error)
                Alert.alert("Warning", "Please check your information")
        }) */

        const jsonValue = JSON.stringify(true)
        AsyncStorage.setItem('isLoggedIn', jsonValue) // commentleri kaldırınca sil bu uc satırı
            .then(() => {
                logIn();
            });


    }
    function onRegisterPressed(){
        const jsonValue = JSON.stringify(true) // file to string
        AsyncStorage.setItem('isRegisterIn', jsonValue)
            .then(() => {
                navigation.navigate(RegisterScreen);
            });
    }
    function onProceedPressed(){
        const jsonValue = JSON.stringify(false) // file to string
        AsyncStorage.setItem('isLoggedIn', jsonValue)
            .then(() => {
                navigation.navigate(ProductScreenGeneral);
            });
    }
    function renderProceedButton(){
        return <TouchableOpacity
            style={styles.buttonStyle_proceed}
            onPress={() => onProceedPressed()} >
            <Text style={styles.proceed_TextStyle}>Continue Without Logging > </Text>
        </TouchableOpacity>
    }

    function renderLogInButton(){
        return <TouchableOpacity
            style={styles.buttonStyle_login}
            onPress={() => onLogInPressed()} >
            <Text style={styles.logIn_register_TextStyle}>LOG IN</Text>
        </TouchableOpacity>
    }

    function renderRegisterButton(){
        return <TouchableOpacity
            style={styles.buttonStyle_register}
            onPress={() => onRegisterPressed()} >
            <Text style={styles.logIn_register_TextStyle}>REGISTER</Text>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={{
                flex:1,
                justifyContent: 'center',
                marginLeft: 16,
                marginRight: 16,
            }}>

                <Image
                    style={{width:380, height:210, justifyContent: 'center'}}
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
                <Text style={styles.forgotPasswordStyle}> Forgot Password?</Text>
                {renderProceedButton()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    defaultTextInputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        fontSize: 16,
        paddingLeft: 12,

    },
    forgotPasswordStyle: {
        marginTop: 7
    },

    buttonStyle_proceed: {
        height: 30,
        width: 200,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent:'center',
        flexDirection: 'column',
        backgroundColor: '#faf9f7',
        borderColor: '#faf9f7',
        position: 'absolute',
        bottom:0,
        left:190, },

    buttonStyle_login: {
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 15,
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
        color: '#faf8f8'},

    proceed_TextStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#0c0c0c'},

});

export default LogInScreen;
