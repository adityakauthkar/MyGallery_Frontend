import React, { useEffect, useState } from "react";
import { View, Image, TextInput, Button, StyleSheet, Alert } from "react-native";
import { launchCamera } from "react-native-image-picker";
import BASE_URL from "../../api/config";

const CameraScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    openCamera();
  }, []);

  const openCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled camera");
          navigation.goBack();
        } else if (response.errorCode) {
          console.log("Error: ", response.errorMessage);
          Alert.alert("Camera Error", response.errorMessage || "Something went wrong");
          navigation.goBack();
        } else {
          const uri = response.assets[0].uri;
          setPhoto(uri);
        }
      }
    );
  };

  const handleUpload = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("image", {
      uri: photo,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("caption", caption);

    try {
      const res = await fetch(`${BASE_URL}/image/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await res.json();
      console.log("Upload success:", result);

      Alert.alert(
        "Upload Successful",
        "Your image has been uploaded successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Upload Failed", "There was an error uploading your image.");
    }
  };

  return (
    <View style={styles.container}>
      {photo && (
        <>
          <Image source={{ uri: photo }} style={styles.image} />
          <TextInput
            style={styles.captionInput}
            placeholder="Add a caption..."
            value={caption}
            onChangeText={setCaption}
          />
          <Button title="Upload" onPress={handleUpload} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  captionInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CameraScreen;
