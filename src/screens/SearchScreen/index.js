import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirstHomeBlock from "../../components/firstHomeBlock";
import axios from "axios";
import BASE_URL from "../../api/config";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setSearch(text);
    if (text.trim().length === 0) {
      setResults([]); // Clear results if empty
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/image/search?caption=${text}`
      );
      setResults(res.data); // assuming API returns an array of images
    } catch (error) {
      console.log("Error fetching search results:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* First block at the start */}
      <FirstHomeBlock />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#2e7d32" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search images..."
          placeholderTextColor="#6b8e6e"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image
              source={{ uri: item.url }}
              style={styles.resultImage}
            />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f9f4",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f2e9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2e7d32",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  caption: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
});

export default Search;
