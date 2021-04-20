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
            <Main.Screen name="Products" component={ProductsScreen} />
            <Main.Screen name="Categories" component={CategoriesScreen} />
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
            <Main.Screen name="BooksListScreen" component={BooksListScreen} />
            <Main.Screen name="Detail" component={Detail} />
            <Main.Screen
                name="Auth"
                component={AuthStack}
                options={{headerTitle: 'Welcome'}}
            />
        </Main.Navigator>
    );
};

export default MainStack;
