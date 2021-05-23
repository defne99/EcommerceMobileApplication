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
import AddressScreen from '../../screens/AddressScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import AllUserAdressesScreen from '../../screens/AllUserAdressesScreen';
import AllUserPaymentScreen from '../../screens/AllUserPaymentScreen';
import AllCommentsScreen from '../../screens/AllCommentsScreen';
import AllOrdersScreen from '../../screens/AllOrdersScreen';
import EditProfilePage from '../../screens/EditProfilePage';
import ChangeAddressInformation from '../../screens/ChangeAddressInformation';
import ChangeCreditCardInformation from '../../screens/ChangeCreditCardInformation';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';



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
            <Main.Screen name="ChangeCreditCard" component={ChangeCreditCardInformation} options={{headerTitle: ""}} />
            <Main.Screen name="ChangeAddress" component={ChangeAddressInformation} options={{headerTitle: ""}} />
            <Main.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerTitle: ""}} />
            <Main.Screen
                name="Profile"
                component={ProfileScreen}
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
            <Main.Screen
                name="AllAddress"
                component={AllUserAdressesScreen}
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
            /><Main.Screen
            name="AllComments"
            component={AllCommentsScreen}
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

            <Main.Screen
                name="AllPayment"
                component={AllUserPaymentScreen}
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
            <Main.Screen
                name="EditProfile"
                component={EditProfilePage}
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
            <Main.Screen
                name="AllOrders"
                component={AllOrdersScreen}
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
            <Main.Screen name="BooksListScreen" component={BooksListScreen}options={{headerTitle: ""}} />
            <Main.Screen
                name="Detail"
                component={Detail}
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
            <Main.Screen name="Search" component={SearchScreen}options={{headerTitle: ""}}/>
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
