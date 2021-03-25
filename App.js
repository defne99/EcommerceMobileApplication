import React, {useEffect} from 'react';
import LogInScreen from './src/LogInScreen';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from './src/ProductsScreen';
import SplashScreen from './src/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

export const AuthContext = React.createContext();

function App() {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {

                case 'LOG_IN':
                    return {
                        ...prevState,
                        isLoggedIn: true,
                        isLoading: false,

                    };
                case 'LOG_OUT':
                case 'NEW_USER':
                    return {
                        ...prevState,
                        isLoggedIn: false,
                        isLoading: false,

                    };

            }
        },
        {
            isLoading: true,
            isLoggedIn: false,

        }
    );

    useEffect(() => {
        AsyncStorage.getItem('isLoggedIn')
            .then((value) => {
                value = value ? JSON.parse(value) : null; // back to json
                if (value === true) {
                    dispatch({ type: 'LOG_IN' });
                }
                else{
                    dispatch({type: 'NEW_USER'});
                }
            })
    },[]);

    const authContext = React.useMemo(
        () => ({
            logIn: () => dispatch({ type: 'LOG_IN' }),
            logOut: () => dispatch({ type: 'LOG_OUT' }),
            newUser: () => dispatch({ type: 'NEW_USER' })
        }),
        [],
    );

    const Stack = createStackNavigator();

    if (state.isLoading) {
        // We do not know if the user in logged in or not, we didn't fetch the relevant info
        return <SplashScreen />; // user seeing splash screen
    }

  return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer>
             <Stack.Navigator initialRouteName="LogInScreen"
                  screenOptions={{
                      headerShown: false,
              }}>
                  {state.isLoggedIn ? (
                      <>
                          <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
                      </>
                      ):(
                          <>
                              <Stack.Screen name="Welcome" component={LogInScreen} />
                          </>
                  )}
            </Stack.Navigator>
          </NavigationContainer>
      </AuthContext.Provider>
  );

};

export default App;
