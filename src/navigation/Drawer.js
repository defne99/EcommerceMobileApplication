import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainStack from "./stacks/MainStack";
import AuthStack from "./stacks/AuthStack";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get("window");

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="MainStack"
            drawerType={WINDOW_WIDTH >= 768 ? "permanent" : "front"}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="MainStack" component={MainStack} />
            <Drawer.Screen name="AuthStack" component={AuthStack} />

        </Drawer.Navigator>
    )
}

export default DrawerNavigation;
