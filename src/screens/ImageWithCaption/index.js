import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import BASE_URL from '../../api/config';

const UploadScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [caption, setCaption] = useState("");

  // Open gallery
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.7 },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          setImageUrl(response.assets[0]);
        }
      }
    );
  };

  const handleUpload = async () => {
    if (!imageUrl || !caption) {
      Alert.alert("Please select an image and add a caption!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", {
      uri: imageUrl.uri,
      type: imageUrl.type,      
      name: imageUrl.fileName,   
    });

    try {
      const response = await fetch(`${BASE_URL}/image/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      console.log("Server response:", data);
      Alert.alert("Upload successful!");
      setImageUrl(null);
      setCaption("");
    } catch (error) {
      console.log("Upload error:", error);
      Alert.alert("Upload failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image </Text>

      <Button title="Pick Image from Gallery" onPress={pickImage} />

      {imageUrl && (
        <Image source={{ uri: imageUrl.uri }} style={styles.previewImage} />
      )}

      <TextInput
        placeholder="Enter caption"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />

      <Button title="Upload" onPress={handleUpload} color="#2e8b57" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
});

export default UploadScreen;
