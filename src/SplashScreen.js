import {SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';

function SplashScreen() {

    return <SafeAreaView style={{flex: 1}}>
        <View style={{
            flex:1,
            justifyContent: 'center',
        }}>
            <Text style={{textAlign: 'center'}}> Loading... </Text>

        </View>
    </SafeAreaView>;
};

export default SplashScreen;
