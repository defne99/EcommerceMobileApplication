
import React, {useState} from 'react';

import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../App';


function LogInScreen({ navigation }){
    const { logIn } = React.useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function renderUsernameTextInput() {
        return <TextInput
            placeholder="Username"
            style={styles.defaultTextInputStyle}
            onChangeText={setUsername}
            value={username}/>;
    }

    function renderPasswordTextInput(){
        return <TextInput
            placeholder="Password"
            style={[styles.defaultTextInputStyle, {marginTop: 16}]}
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}/>;
    }

    function onLogInPressed(){
        const jsonValue = JSON.stringify(true) // file to string
        AsyncStorage.setItem('isLoggedIn', jsonValue)
            .then(() => {
                logIn();
        });

    }

    function renderProceedButton(){
        return <TouchableOpacity
            style={styles.buttonStyle_proceed}
            onPress={() => console.log("User clicked proceed button")} >
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
            onPress={() => console.log("User clicked register button")} >
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
                        source={require('../assets/photo2.jpg')}
                    />
                {renderUsernameTextInput()}
                {renderPasswordTextInput()}
                <Text style={styles.forgotPasswordStyle}> Forgot Password?</Text>
                {renderLogInButton()}
                {renderRegisterButton()}
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
