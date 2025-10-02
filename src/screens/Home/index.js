import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { getAllImages } from "../../api/uploadApi";
import Bar from "../../components/statusBar";
import Icons from 'react-native-vector-icons/MaterialIcons'
import FirstHomeBlock from '../../components/firstHomeBlock';

const Home = () => {
  const [images, setImages] = useState([]);
  const numColumns = 4; // 4x4 grid

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getAllImages();
      setImages(data);
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const { width } = Dimensions.get("window");
  const imageSize = (width - (numColumns + 1) * 5) / numColumns;

  return (
    <View style={styles.container}>
      <FirstHomeBlock />

      <Bar />


      {/* Image Grid */}
      <FlatList
        data={images}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={[styles.image, { width: imageSize, height: imageSize }]}
          />
        )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
  },
  image: {
    marginBottom: 5,
    borderRadius: 8,
    resizeMode: "cover",
  },

});

export default Home;
