import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../../screens/ProductsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthStack from './AuthStack';
import CategoriesScreen from '../../screens/CategoriesScreen';
import SubCategoriesScreen from '../../screens/SubCategoriesScreen';
import BooksListScreen from '../../screens/BooksListScreen';
import Detail from '../../screens/Detail';
import SearchScreen from "../../screens/SearchScreen";
import ShoppingCartScreen from '../../screens/ShoppingCartScreen'
import PaymentScreen from '../../screens/PaymentScreen';
import LogInScreen from '../../screens/LogInScreen';
import AdressScreen from '../../screens/AddressScreen';
import AddressScreen from '../../screens/AddressScreen';


const Main = createStackNavigator();

const MainStack = ({route, navigation}) => {
    return (
        <Main.Navigator
            initialRouteName="Products"
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{paddingLeft: 15}}>
                        <Icon name="bars" size={22} />
                    </TouchableOpacity>
                ),
            }}>
            <Main.Screen name="Products" component={ProductsScreen} options={{headerTitle: ""}} />
            <Main.Screen name="Login" component={LogInScreen} options={{headerTitle: ""}} />
            <Main.Screen name="Categories" component={CategoriesScreen} options={{headerTitle: ""}} />
            <Main.Screen
                name="SubCategories"
                component={SubCategoriesScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{paddingLeft: 15}}>
                            <Icon name="chevron-left" size={22} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Main.Screen name="BooksListScreen" component={BooksListScreen} options={{headerTitle: ""}} />
            <Main.Screen name="Detail" component={Detail} options={{headerTitle: ""}} />
            <Main.Screen name="Search" component={SearchScreen} options={{headerTitle: ""}}/>
            <Main.Screen
                name="CartScreen"
                component={ShoppingCartScreen}
                options={{
                    headerTitle:"",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{paddingLeft: 15}}>
                            <Icon name="chevron-left" size={22} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Main.Screen name="AddressScreen" component={AddressScreen}options={{headerTitle: ""}}/>
            <Main.Screen name="PaymentScreen" component={PaymentScreen}options={{headerTitle: ""}}/>
            <Main.Screen
                name="Auth"
                component={AuthStack}
                options={{headerTitle: 'Welcome'}}
            />

        </Main.Navigator>
    );
};

export default MainStack;
