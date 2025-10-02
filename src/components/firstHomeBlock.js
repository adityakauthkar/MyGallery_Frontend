import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, StyleSheet , SafeAreaView} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import UploadScreen from "../screens/ImageWithCaption";


const FirstHomeBlock = () => {
const navigarion = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={()=>navigarion.navigate('CameraScreen')}>
        <Icons name="camera-alt" size={28} color="#2e8b57" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={()=>navigarion.navigate('UploadScreen') }>
        <Icons name="add" size={28} color="#2e8b57" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end", 
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#e6ffe6",
    borderRadius: 8,
    marginBottom: 5,
  },
  iconButton: {
    marginLeft: 15, 
  },
});

export default FirstHomeBlock;
