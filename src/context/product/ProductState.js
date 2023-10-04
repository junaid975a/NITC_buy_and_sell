import React, { useState } from "react";
import ProductContext from './ProductContext'
import axios from "axios";

const ProductState = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [productReview, setProductReview] = useState(null);
    const [alert, setAlert] = useState(null);
    const host = "http://127.0.0.1:5000"
    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };
    const getAllProducts = async () => {
        const response = await axios.get(`${host}/product/all-products`, config);
        setAllProducts(response.data);
    }

    const createNewProduct = async () => {

    }

    const getBoughtItems = async () => {
        try {
            const response = await axios.get(`${host}/product/bought-products`, config)
            setAllProducts(response.data);
        } catch (error) {
            // setAlert(error.response.data.message)
            console.log(error);
            setAllProducts([])
        }
    }

    const getPostedItems = async () => {
        try {
            const response = await axios.get(`${host}/product/posted-products`, config)
            setAllProducts(response.data);
        } catch (error) {
            // setAlert(error.response.data.message)
            console.log(error);
            setAllProducts([])
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${host}/product/categories`)
            setAllCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
            setAllCategories([])
        }

    }

    const getSellerDetails = async (id) => {
        try {
            const response = await axios.get(`${host}/auth/fetch-user`, { email: id }, config);
            setSellerDetails(response)
        } catch (error) {
            console.log("Error fetching seller information", error);
            // setAlert(error.response.data.message)
            setSellerDetails(null);
        }

    }

    const getReview = async (id) => {
        try {
            const response = await axios.get(`${host}/rating/get-rating/${id}`, config);
            setProductReview(response.data)
            // console.log(productReview);
        } catch (error) {
            console.log("Error fetching review of product", error.response.data.message);
            // setAlert(error.response.data.message)
            setProductReview(null);
        }

    }

    const createReview = async (data) => {
        try {
            const response = await axios.post(`${host}/rating/create-rating/${data.id}`, {
                rating: data.rating,
                review: data.review
            }, config)
            if (!response.ok) {
                // Handle non-successful response (e.g., 404 or 500)
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const updatedData = await response.json();
            setProductReview(updatedData)
            setAlert("Review saved successfully")
        } catch (error) {
            // setAlert(error.response.data.message)
            console.log("Error creating review of product", error);
        }

    }

    const updateProductReview = async (data) => {
        // console.log(data);
        try {
            // console.log(data);
            const response = await axios.put(`${host}/rating/update-rating/${data.id}`, {
                rating: data.rating,
                review: data.review
            }, config)
            // console.log(response);
            const updatedData = response.data
            // console.log(updatedData);
            setProductReview(updatedData)
        } catch (error) {
            // setAlert(error.response.data.message)
            console.log("Error updating review of product", error);
        }
    }

    const deleteProductReview = async (id) => {
        try {
            const response = await axios.post(`${host}/rating/delete-rating/${id}`, config)
            setProductReview(null)
        } catch (error) {
            // setAlert(error.response.data.message)
            console.log("Error deleting review of product", error);
        }
    }

    return (
        <ProductContext.Provider value={{
            allProducts,
            getAllProducts,
            getBoughtItems,
            getPostedItems,
            createNewProduct,
            getCategories,
            allCategories,
            setAllCategories,
            sellerDetails,
            productReview,
            setProductReview,
            alert,
            getSellerDetails,
            deleteProductReview,
            updateProductReview,
            createReview,
            getReview
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState