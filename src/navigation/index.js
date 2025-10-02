import React from "react";
import {View , Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";

const RootNavigation = ()=> { 
    return(
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
        
    );
};

export default RootNavigation;