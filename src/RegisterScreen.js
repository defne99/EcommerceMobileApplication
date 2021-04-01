import React,{useState} from 'react';

import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text, Image, ImageBackground, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../App';
import Input from './components/Input';

function RegisterScreen({navigation}){

    const { Save } = React.useContext(AuthContext);
    const { Return } = React.useContext(AuthContext);

    const[nameSurname, setNameSurname]=useState("")
    const[password, setPassword]=useState("")
    const[passwordSecond, setPasswordSecond]=useState("")
    const[address, setAddress]=useState("")


    function onSavePressed(){
        if(nameSurname==="" && password==="" && passwordSecond==="" && address===""){
            Alert.alert("Warning", "Please fill out the form");
            return false
        }
        if(password==="" && passwordSecond==="" && address===""){
            Alert.alert("Warning", "Please enter your email and password");
            return false
        }
        if(nameSurname===""){
            Alert.alert("Warning", "Please enter your Name and Surname");
            return false
        }
        if(address===""){
            Alert.alert("Warning", "Please enter your Email");
            return false
        }
        if(password===""){
            Alert.alert("Warning", "Please enter your password");
            return false
        }
        if(passwordSecond===""){
            Alert.alert("Warning", "Please verify your password");
            return false
        }

        if(password!==passwordSecond){
            Alert.alert("Warning", "Please verify your password");
            return false
        }

        const jsonValue = JSON.stringify(false) // file to string
        AsyncStorage.setItem('isRegisterIn', jsonValue)
            .then(() => {
                navigation.goBack();
            });}
    function onReturnPressed() {
        const jsonValue = JSON.stringify(false)
        AsyncStorage.setItem('isRegisterIn', jsonValue) // when isLoggedIn false we log out
            .then(() => {
                navigation.goBack();
            });
    }
    function renderSaveButton(){
        return <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onSavePressed()}>
            <Text style={styles.saveTextStyle}> SAVE </Text>
        </TouchableOpacity>
    }
    function renderReturnButton(){
        return <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onReturnPressed()}>
            <Text style={styles.returnTextStyle}> RETURN </Text>
        </TouchableOpacity>
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>

                <Image
                    style={{width:350, height:100, justifyContent: 'center', opacity:1.0, marginBottom: 20}}
                    source={require('../assets/logo.jpg')}
                />
                <Image
                    style={styles.backgroundImage}
                    source={require('../assets/photo4.png')}
                />
                <Input setValue={setNameSurname}
                       placeholderText="Name - Surname"
                       value={nameSurname}
                       keyboardType="default"
                />
                <Input setValue={setAddress}
                       placeholderText="Mail Address"
                       value={address}
                       keyboardType="email-address"
                />
                <Input setValue={setPassword}
                       placeholderText="Password"
                       value={password}
                       isSecureText={true}
                       keyboardType="default"
                />
                <Input setValue={setPasswordSecond}
                       placeholderText="Password Again"
                       value={passwordSecond}
                       isSecureText={true}
                       keyboardType="default"
                />
                {renderSaveButton()}
                {renderReturnButton()}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginLeft:32,
        marginRight:32
    },
    buttonStyle:{
        height: 42,
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff9c33',
        borderColor: '#FF9C33'
    },
    saveTextStyle:{
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'

    },
    returnTextStyle:{
        textAlign: 'center',
        fontSize: 20,
        color: '#faf8f8'
    },
    backgroundImage:{
        position: 'absolute',
        bottom: 253,
        left:0,
        opacity: 0.4,
        width:340,
        height:260,
        transform:[{scaleX:-1}]
    },
});

export default RegisterScreen;
