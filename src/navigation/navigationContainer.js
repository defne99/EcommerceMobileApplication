import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Drawer from "./Drawer";
import AuthStack from "./stacks/AuthStack";


const NavigationContainerContent = () => {
    return (
        <NavigationContainer>
            <Drawer />
        </NavigationContainer>
    )
}


export default NavigationContainerContent;
