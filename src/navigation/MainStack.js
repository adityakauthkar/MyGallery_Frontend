import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./tabs";
import Login from "../screens/Login";
import Search from "../screens/SearchScreen";
import UploadScreen from "../screens/ImageWithCaption";
import CameraScreen from "../screens/cameraScreen";


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />

        
      </Stack.Navigator>
   
  );
};

export default MainStack;
