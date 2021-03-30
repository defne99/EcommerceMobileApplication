import React,{useState} from 'react';

import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../App';

function RegisterScreen({navigation}){

    const { Save } = React.useContext(AuthContext);
    const { Return } = React.useContext(AuthContext);

    const[nameSurname, setNameSurname]=useState("")
    const[password, setPassword]=useState("")
    const[passwordSecond, setPasswordSecond]=useState("")
    const[address, setAddress]=useState("")


    function renderPasswordTextInput(){
        return<TextInput
            placeholder={"Password"}
            style={[styles.defaultTextInputStyle, {marginTop:12 }]}
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}/>
    }
    function renderSecondPasswordTextInput(){
        return<TextInput
            placeholder={"Password Again"}
            style={[styles.defaultTextInputStyle, {marginTop:12}]}
            onChangeText={setPasswordSecond}
            secureTextEntry={true}
            value={passwordSecond}/>
    }
    function renderNameSurnameTextInput(){
        return<TextInput
            placeholder={"Name - Surname"}
            style={[styles.defaultTextInputStyle, {marginTop:12}]}
            onChangeText={setNameSurname}
            value={nameSurname}/>
    }


    function renderMailTextInput(){
        return<TextInput
            placeholder={"Mail Address"}
            style={[styles.defaultTextInputStyle, {marginTop:12}]}
            onChangeText={setAddress}
            value={address}/>
    }
    function onSavePressed(){
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
            <View style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft:32,
                marginRight:32
            }}>

                {renderNameSurnameTextInput()}
                {renderMailTextInput()}
                {renderPasswordTextInput()}
                {renderSecondPasswordTextInput()}
                {renderSaveButton()}
                {renderReturnButton()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    defaultTextInputStyle:{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#0c0c0c",
        height: 48,
        paddingLeft:12,
        fontSize:16,

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
});

export default RegisterScreen;
