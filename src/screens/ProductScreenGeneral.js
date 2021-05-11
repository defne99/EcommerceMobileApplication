import {SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App';

function ProductScreenGeneral({navigation}) {
    console.disableYellowBox = true;

    const { GoBack } = React.useContext(AuthContext);

    function onLogOutGeneralPressed() {
        const jsonValue = JSON.stringify(false)
        AsyncStorage.setItem('isLoggedIn', jsonValue) // when isLoggedIn false we log out
            .then(() => {
                navigation.goBack();
            });
    }

    return <SafeAreaView style={{flex: 1}}>
        <View style={{
            flex:1,
            justifyContent: 'center',
        }}>
            <Text> This is General Product Screen without Logging In</Text>
            <TouchableOpacity style={{height: 24, margin: 24}} onPress={() => onLogOutGeneralPressed()}>
                <Text>Return Back</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

export default ProductScreenGeneral;
