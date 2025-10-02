import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";

const Bar = () => {
  return (
    <View style={styles.container}>
    
      <StatusBar
        backgroundColor="#e6ffe6" 
        barStyle="light-content"  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    
  },
 
});

export default Bar;
