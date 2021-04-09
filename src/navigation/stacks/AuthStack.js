import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../../screens/LogInScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Auth = createStackNavigator();

const AuthStack = ({route, navigation}) => {

    return (
        <Auth.Navigator screenOptions={{headerShown: false, headerTitle: "Welcome"}}>
            <Auth.Screen name="Login" component={LogInScreen} />
            <Auth.Screen name="Register" component={RegisterScreen} />
        </Auth.Navigator>
    )

}

export default AuthStack;
