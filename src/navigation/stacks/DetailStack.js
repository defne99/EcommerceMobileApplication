import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../../screens/ProductsScreen';
import DetailScreen from '../../screens/Detail';
const Detail = createStackNavigator();

const DetailStack = ({route, navigation}) => {
    return (
        <Detail.Navigator
            screenOptions={{headerShown: false, headerTitle: 'Welcome'}}>
            <Detail.Screen name="Product" component={ProductsScreen} />
            <Detail.Screen name="Detail" component={DetailScreen} />
        </Detail.Navigator>
    );
};

export default DetailStack;
