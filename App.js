import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationContainerContent from "./src/navigation/navigationContainer";
import SplashScreen from './src/screens/SplashScreen';


//export const AuthContext = React.createContext();

function App() {

    const [isSplash, setIsSplash] = useState(true);

    /*const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOG_IN':
                    return {
                        ...prevState,
                        isLoggedIn: true,
                        isLoading: false,
                        isRegisterIn: false

                    };
                case 'LOG_OUT':
                case 'NEW_USER':
                    return {
                        ...prevState,
                        isLoggedIn: false,
                        isLoading: false,
                        isRegisterIn: false

                    };
                case 'REGISTER':
                    return {
                        ...prevState,
                        isLoading: false,
                        isLoggedIn: false,
                        isRegisterIn: true
                    }
                case'RETURN':
                case 'SAVE':
                    return {
                        isLoading: false,
                        isLoggedIn: false,
                        isRegisterIn: false
                    }
            }
        },
        {
            isLoading: true,
            isLoggedIn: false,
            isRegisterIn: false

        }
    );*/

    useEffect(() => {
        /*AsyncStorage.getItem('isLoggedIn')
            .then((value) => {
                value = value ? JSON.parse(value) : null; // back to json
                if (value === true) {
                    dispatch({type: 'LOG_IN'});
                } else {
                    dispatch({type: 'NEW_USER'});
                }
            })*/

        setTimeout(() => {
            setIsSplash(false);
        }, 3000)
    }, []);


    const authContext = React.useMemo(
        () => ({
            logIn: () => dispatch({type: 'LOG_IN'}),
            logOut: () => dispatch({type: 'LOG_OUT'}),
            newUser: () => dispatch({type: 'NEW_USER'}),
            Register: () => dispatch({type: 'REGISTER'}),
            Return: () => dispatch({type: 'RETURN'}),
            Save: () => dispatch({type: 'SAVE'}),
        }),
        [],
    );


    if (isSplash) {
        return <SplashScreen/>;
    }

    return <NavigationContainerContent/>


}

export default App;
