import React, { useState } from "react";
import ProductContext from './ProductContext'
import axios from "axios";
import imageCompressor from "image-compressor.js";
import toast from "react-hot-toast";

const ProductState = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [productReview, setProductReview] = useState(null);
    const [picLoading, setPicLoading] = useState(false);
    const [pic, setPic] = useState(""); // Store the selected image file
    const [selectedImage, setSelectedImage] = useState(null); 
    const [alert, setAlert] = useState(null);
    const host = "http://127.0.0.1:5000"
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    
    const postDetails = async (pics) => {
        setPicLoading(true);

        if (pics === undefined) {
            // toast.error("Please provide an image")
            setPicLoading(false);
            return;
        }

        // console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            let compressedBlob = pics;
            const compressor = new imageCompressor();

            try {
                // Compress the image
                compressedBlob = await compressor.compress(pics, { quality: 0.5 });
            } catch (error) {
                console.error("Image compression error:", error);
                setPicLoading(false);
                return  ;
            }

            const data = new FormData();
            data.append("file", compressedBlob);
            data.append("upload_preset", "chatapp");
            data.append("cloud_name", "dlkpb4vzg");

            await fetch("https://api.cloudinary.com/v1_1/dlkpb4vzg/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    // Update the pic state here
                    setPic(data.url.toString());
                    setPicLoading(false);
                    // // console.log(pic);
                    // // console.log(imageUrl);
                })
                .catch((err) => {
                    console.error("Image upload error: ", err);
                    setPicLoading(false);
                    return {status:"error",mesage:"Error occurred while uploading"}
                });
        } else {
            setPicLoading(false);
            return {status:"success",mesage:"Please select a valid image of .jpg or .png type"};
        }
    };

    const getAllProducts = async () => {
        const response = await axios.get(`${host}/product/all-products`, config);
        setAllProducts(response.data);
    }

    const createNewProduct = async (itemData) => {
        try {
            const name = itemData.itemname;
            const description = itemData.description;
            const condition = itemData.condition;
            const price = itemData.price;
            const categoryName = itemData.category;

            // Upload the selected image (if any) to the server
            if (selectedImage) {
                console.log("pic selected");
                await postDetails(selectedImage);
                console.log(pic);
            }   
            // console.log(pic);

            const { data } = await axios.post(
                "http://127.0.0.1:5000/product/create",
                {
                    name,
                    description,
                    pic,
                    condition,
                    categoryName,
                    price
                },
                config
            );

            // // console.log(data);
            setPicLoading(false);
            
            const productData = {
                ...itemData,
            };
            
            const finalData = {
                ...productData,
            };
            getPostedItems();
            toast.success('Product created successfully');
        } catch (error) {
            console.log(error);
            setPicLoading(false);
            toast.error(error.response.data.message)
        }finally{
            setPic(null);
        }
    }

    const getBoughtItems = async () => {
        try {
            const response = await axios.get(`${host}/product/bought-products`, config)
            // console.log(response);
            setAllProducts(response.data);
        } catch (error) {
            // setAlert(error.response.data.message)
            // console.log(error);
            setAllProducts([])
        }
    }

    const getPostedItems = async () => {
        try {
            const response = await axios.get(`${host}/product/posted-products`, config)
            setAllProducts(response.data);
        } catch (error) {
            // setAlert(error.response.data.message)
            // console.log(error);
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
            // console.log("Error fetching seller information", error);
            // setAlert(error.response.data.message)
            setSellerDetails(null);
        }

    }

    const getReview = async (id) => {
        try {
            const response = await axios.get(`${host}/rating/get-rating/${id}`, config);
            setProductReview(response.data)
            // // console.log(productReview);
        } catch (error) {
            // console.log("Error fetching review of product", error.response.data.message);
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
            // console.log("Error creating review of product", error);
        }

    }

    const updateProductReview = async (data) => {
        // // console.log(data);
        try {
            // // console.log(data);
            const response = await axios.put(`${host}/rating/update-rating/${data.id}`, {
                rating: data.rating,
                review: data.review
            }, config)
            // // console.log(response);
            const updatedData = response.data
            // // console.log(updatedData);
            setProductReview(updatedData)
        } catch (error) {
            // setAlert(error.response.data.message)
            // console.log("Error updating review of product", error);
        }
    }

    const deleteProductReview = async (id) => {
        try {
            const response = await axios.post(`${host}/rating/delete-rating/${id}`, config)
            setProductReview(null)
        } catch (error) {
            // setAlert(error.response.data.message)
            // console.log("Error deleting review of product", error);
        }
    }

    const updateOldProduct = async (itemData) => {
        console.log(itemData);
        try {
            const id = itemData.id
            const name = itemData.itemname;
            const description = itemData.description;
            const condition = itemData.condition;
            const price = itemData.price;
            const categoryName = itemData.category;
            const buyerId = itemData.buyerId;
            const finalPrice = itemData.finalPrice;
            // if(itemData.pic)setPic(itemData.pic)

            // Upload the selected image (if any) to the server
            if (selectedImage) {
                console.log("truwan: Uploading image");
                await postDetails(selectedImage);
                console.log(pic);
            }   

            const { data } = await axios.put(
                `http://127.0.0.1:5000/product/update-product/${id}`,
                {
                    name,
                    description,
                    pic,    
                    condition,
                    categoryName,
                    price,
                    buyerId,
                    finalPrice
                },
                config
            );

            // // console.log(data);
            setPicLoading(false);
            
            const productData = {
                ...itemData,
            };
            
            const finalData = {
                ...productData,
            };
            // console.log(finalData);
            getPostedItems();
            toast.success('Product updated successfully');
            // return {status:"success",mesage:"Product created successfully"};
        } catch (error) {
            console.log(error);
            setPicLoading(false);
            toast.error(error.response.data.message)
        }finally{
            setPic(null);
        }
    }

    return (
        <ProductContext.Provider value={{
            allProducts,
            getAllProducts,
            setAllProducts,
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
            getReview,
            picLoading,
            setPicLoading,
            selectedImage,
            setSelectedImage,
            updateOldProduct,
            setPic
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState