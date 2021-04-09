import React from 'react';
import {SafeAreaView, Text, View, ActivityIndicator, StyleSheet} from 'react-native';

function SplashScreen() {

    return <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>

            {/*<Text style={{textAlign: 'center', fontSize: 20}}> Loading... </Text>*/}
            <ActivityIndicator size="large" color="#EA5F47" />

        </View>
    </SafeAreaView>;
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default SplashScreen;
