import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartScreen from '../../screens/ShoppingCartScreen';
import PaymentScreen from '../../screens/PaymentScreen';

const Cart = createStackNavigator();

const CartStack = ({route, navigation}) => {

    return (
        <Cart.Navigator screenOptions={{headerShown: false, headerTitle: "Welcome"}}>
            <Cart.Screen name="Payment" component={PaymentScreen}options={{headerTitle: ""}} />
            <Cart.Screen name="ShoppingCart" component={ShoppingCartScreen}options={{headerTitle: ""}} />
        </Cart.Navigator>
    )
}
export default CartStack;
