import React, { useState } from "react";
import ProductContext from './ProductContext'
import axios from "axios";

const ProductState = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const host = "http://127.0.0.1:5000"
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const getAllProducts = async () => {
        const response = await axios.get(`${host}/product/all-products`,config);
        setAllProducts(response.data);
    }

    const createNewProduct = async () => {

    }


    return (
        <ProductContext.Provider value={{ allProducts,getAllProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState