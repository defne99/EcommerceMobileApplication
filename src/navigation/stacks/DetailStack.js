import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../../screens/ProductsScreen';
import Detail from '../../screens/Detail';
const Auth = createStackNavigator();

const AuthStack = ({route, navigation}) => {
    return (
        <Auth.Navigator
            screenOptions={{headerShown: false, headerTitle: 'Welcome'}}>
            <Auth.Screen name="Product" component={ProductsScreen} />
            <Auth.Screen name="Detail" component={Detail} />
        </Auth.Navigator>
    );
};

export default AuthStack;
