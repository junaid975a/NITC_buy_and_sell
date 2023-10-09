import React, { useState, useEffect, useContext } from "react";
import imageCompressor from "image-compressor.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductContext from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";


const AddandEditPopup = ({ id, name, category, description, condition, price, onClose, }) => {

    // const [pic, setPic] = useState(); // Store the selected image file
    const {
        getCategories,
        allCategories,
        setAllCategories,
        picLoading,
        setPicLoading,
        setSelectedImage,
        createNewProduct,
        updateOldProduct
    } = useContext(ProductContext)

    const [otherCategory, setOtherCategory] = useState(""); // State for the "Other" category input field
    const [showOtherInput, setShowOtherInput] = useState(false); // State to control when to show the "Other" input field
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };
    const selectCategory = (selectedCategory) => {
        setOptionsVisible(false)

        if (selectedCategory === "Other") {
            // If "Other" is selected, show the input field
            setShowOtherInput(true);
        } else {
            // If a category is selected from the dropdown, hide the input field
            setShowOtherInput(false);

            // Update the selected category in itemData
            setItemData((prev) => ({
                ...prev,
                category: selectedCategory,
            }));
            
        }
    };
    const handleOtherCategoryChange = (event) => {
        const { value } = event.target;
        // Update the "Other" category input field value
        setOtherCategory(value);

        // Update the selected category in itemData as the user types
        setItemData((prev) => ({
            ...prev,
            category: value, // Update itemData.category with the user's input
        }));
    };
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
        console.log(allCategories);
        // Use a setTimeout to delay the appearance of the popup
        const timeout = setTimeout(() => {
            setIsPopupVisible(true);
        }, 150); // Adjust the delay time (in milliseconds) as needed

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setIsPopupVisible(false);

        // Delay the closing of the popup to allow the animation to complete
        setTimeout(() => {
            onClose();
        }, 100); // Adjust the delay time to match your transition duration
    };


    const [itemData, setItemData] = useState({
        itemname: name,
        category: null,
        description: description,
        condition: condition,
        price: price,
        categories: allCategories,
        buyerId: "",
        finalPrice: 0,
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        // Update the itemData state
        setItemData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(itemData);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setPicLoading(true);
        console.log(itemData)
        console.log(itemData);
        if (!itemData.itemname || !itemData.category || !itemData.description || !itemData.condition || !itemData.price) {
            console.log(itemData)
            // toast.error(itemData)
            toast.error("Please enter all required fields correctly");
            setPicLoading(false);
            return;
        }
        const uploadProduct = () => {
            return createNewProduct(itemData)
                .then(() => {
                    // Show a success message
                    toast.success("Product created successfully!");
                    
                    // Close the popup
                    handleClose();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to create the product");
                });
        };        

        uploadProduct();
    }

    const updateHandler = async (event) => {

    }
    const sellHandler = async (event) => {

    }




    return (
        <div className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isPopupVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Create a centered square popup */}
            <div className={`bg-white rounded-lg shadow-md w-[90%] sm:w-[600px] md:w-[720px] h-min max-h-[600px]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isPopupVisible ? "scale-100" : "scale-90"}`}>
                {/* container to show all the details */}
                <form
                    onSubmit={submitHandler}
                    encType="multipart/form-data"
                    className="flex flex-col">

                    <label className="w-full flex items-center gap-x">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Item Name<sup className="text-rose-500">*</sup> :</p>
                        <input
                            type="text"
                            required
                            name="itemname"
                            onChange={changeHandler}
                            placeholder="Enter Item Name"
                            value={itemData.itemname}
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>


                    <label className="w-full flex items-center gap-x" onClick={toggleOptions}>
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Category<sup className="text-rose-500">*</sup> :</p>
                        <div className="relative w-full">
                            <input
                                type="text"
                                required
                                name="category"
                                value={itemData.category}
                                placeholder="Select a category"
                                className="rounded-[0.5rem] w-full p-[12px]"
                                readOnly // Make the input read-only
                            />
                            {optionsVisible && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {allCategories.map((categoryOption) => (
                                        <div
                                            key={categoryOption.id}
                                            onClick={() => selectCategory(categoryOption.name)}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {categoryOption.name}
                                        </div>
                                    ))}
                                    <div // Add the "Other" option here
                                        onClick={() => selectCategory("Other")}
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                    >
                                        Other
                                    </div>
                                </div>
                            )}
                        </div>
                    </label>
                    {showOtherInput && (
                        <label className="w-full flex items-center">
                            <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Enter Other Category:</p>
                            <input
                                type="text"
                                required
                                name="category"
                                value={otherCategory}
                                onChange={handleOtherCategoryChange}
                                placeholder="Enter a new category"
                                className="rounded-[0.5rem] w-full p-[12px]"
                            />
                        </label>
                    )}


                    <label className="w-full flex items-center">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Description: </p>
                        <textarea
                            name="description"
                            onChange={changeHandler}
                            placeholder="Type description here"
                            value={itemData.description}
                            rows={2}
                            cols={50}
                            className="rounded-[0.5rem]
                            w-full p-[12px]"
                        />
                    </label>

                    <label className="w-full flex items-center mt-3">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Condition: </p>
                        <textarea
                            name="condition"
                            onChange={changeHandler}
                            placeholder="Describe current condition of item"
                            value={itemData.condition}
                            rows={2}
                            cols={50}
                            className="rounded-[0.5rem]
                            w-full p-[12px]"
                        />
                    </label>

                    <label className="w-full flex items-center">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Price<sup className="text-rose-500">*</sup> :</p>
                        <input
                            type="number"
                            required
                            name="price"
                            onChange={changeHandler}
                            placeholder="Enter Item Price"
                            value={itemData.price}
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>


                    {/* this will be added to image table */}
                    <label className="w-full">
                        <input
                            type="file"
                            accept="image/*"
                            required
                            name="productImage"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            placeholder="choose image file"
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>


                    {/* this part will be visible only if the item is already present there,
                and this part will contain the details to be filled if the item is sold */}
                    {id && (
                        <div>
                            {/* horizontal rule */}
                            <div className="w-full h-1 bg-slate-200 mx-auto rounded-md"></div>
                            <div className="flex justify-start mt-2">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">
                                    <sup className="text-rose-500">*</sup>Fill only when item is sold<sup className="text-rose-500">*</sup>
                                </p>
                            </div>

                            <label className="w-full flex items-center">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Sold To: <sup className="text-rose-500">*</sup></p>
                                <input
                                    type="text"
                                    required
                                    name="buyerId"
                                    onChange={changeHandler}
                                    placeholder="buyer_name/buyer_id"
                                    value={itemData.buyerId}
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                            <label className="w-full flex items-center">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Final Price<sup className="text-rose-500">*</sup></p>
                                <input
                                    type="number"
                                    required
                                    name="finalPrice"
                                    onChange={changeHandler}
                                    placeholder="Enter Item Price"
                                    value={itemData.finalPrice}
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                        </div>
                    )}




                    {/* buttons */}

                    <div className="flex gap-x-5 justify-center">
                        {/* to add new product */}
                        {!id && (
                            <button onClick={submitHandler}
                                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                                type="submit"


                            >{picLoading ? "Creating your product..." : "Add product"}</button>
                        )}
                        {id && (
                            <button onClick={updateHandler}
                                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                                type="submit"


                            >Update</button>
                        )
                        }
                        {id && (
                            <button onClick={sellHandler}
                                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                                type="submit"


                            >Sell</button>
                        )
                        }



                        {/* Close button */}
                        <button onClick={handleClose}
                            className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                        >Close</button>
                    </div>


                </form>







            </div>
        </div>
    );
};

export default AddandEditPopup;
