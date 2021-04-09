import {SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductsScreen({navigation}) {


    function onLogOutPressed() {
        const jsonValue = JSON.stringify(false)
        AsyncStorage.setItem('isLoggedIn', jsonValue) // when isLoggedIn false we log out
            .then(() => {

            });
    }

    return <SafeAreaView style={{flex: 1}}>
        <View style={{
            flex:1,
            justifyContent: 'center',
        }}>
            <Text> This is Products Screen</Text>
            <TouchableOpacity style={{height: 24, margin: 24}} onPress={() => onLogOutPressed()}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

export default ProductsScreen;
