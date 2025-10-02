import React from "react";
import BASE_URL from "./config";
import axios from "axios";

export const getAllImages = async () => {
    try {
        const url = `${BASE_URL}/image/images`;
        const response = await axios.get(url);
        return response.data;


    } catch (error) {
        console.log("Error in fetching images from server", error);
        throw error;
    }
}