import React, { useState, useEffect, useContext } from "react";
import imageCompressor from "image-compressor.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductContext from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";


const AddandEditPopup = ({ id, name, category, description, condition, price, onClose,}) => {

    // const [pic, setPic] = useState(); // Store the selected image file
    const {
        getCategories,
        allCategories,
        setAllCategories,
        picLoading,
        setPicLoading,
        setSelectedImage,
        createNewProduct
    } = useContext(ProductContext)
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    


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
        category: category,
        description: description,
        condition: condition,
        price: price,
        categories: allCategories 
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        // Update the itemData state
        setItemData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        setPicLoading(true);
        if (!itemData.itemname || !itemData.category || !itemData.description || !itemData.condition || !itemData.price) {
            toast.error("Please enter all required fields correctly");
            setPicLoading(false);
            return;
        }

        const message = createNewProduct(itemData)

        // toast(message.status)(`${message.message}`);
        if(message.status==="success"){
            toast.success(message.message)
        }else if(message.status==="error"){
            toast.error(message.message)
        }


        // try {
        //     const name = itemData.itemname;
        //     const description = itemData.description;
        //     const condition = itemData.condition;
        //     const price = itemData.price;
        //     const categoryName = itemData.category;

        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //             "auth-token":localStorage.getItem("token")
        //         },
        //     };

        //     // Upload the selected image (if any) to the server
        //     if (selectedImage) {
        //         await postDetails(selectedImage);
        //     }
        //     console.log(selectedImage);

        //     if(!pic){
        //         toast.error("Error in upload product, please try again")
        //         return;
        //     }

        //     const { data } = await axios.post(
        //         "http://127.0.0.1:5000/product/create",
        //         {
        //             name,
        //             description,
        //             pic,
        //             condition,
        //             categoryName,
        //             price
        //         },
        //         config
        //     );

        //     console.log(data);
        //     toast.success("Product created successfully");
        //     setPicLoading(false);

        //     const productData = {
        //         ...itemData,
        //     };

        //     const finalData = {
        //         ...productData,
        //     };

        //     console.log(finalData);
        //     navigate("/dashboard");
        // } catch (error) {
        //     console.log(error);
        //     toast.error(error.response.data.message);
        //     setPicLoading(false);
        // }

    }

    // const postDetails = async (pics) => {
    //     setPicLoading(true);

    //     if (pics === undefined) {
    //         toast.error("Please provide an image")
    //         setPicLoading(false);
    //         return;
    //     }

    //     console.log(pics);
    //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //         let compressedBlob = pics;
    //         const compressor = new imageCompressor();

    //         try {
    //             // Compress the image
    //             compressedBlob = await compressor.compress(pics, { quality: 0.5 });
    //         } catch (error) {
    //             console.error("Image compression error:", error);
    //             setPicLoading(false);
    //             return;
    //         }

    //         const data = new FormData();
    //         data.append("file", compressedBlob);
    //         data.append("upload_preset", "chatapp");
    //         data.append("cloud_name", "dlkpb4vzg");

    //         await fetch("https://api.cloudinary.com/v1_1/dlkpb4vzg/image/upload", {
    //             method: "post",
    //             body: data,
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 // Update the pic state here
    //                 setPic(data.url.toString());
    //                 setPicLoading(false);
    //                 // console.log(pic);
    //                 // console.log(imageUrl);
    //             })
    //             .catch((err) => {
    //                 toast.error("Error occurred while uploading")
    //                 console.error("Image upload error:", err);
    //                 setPicLoading(false);
    //             });
    //     } else {
    //         toast.error("Please select a valid image of .jpg or .png type")
    //         setPicLoading(false);
    //         return;
    //     }
    // };


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

                    {/* here category dropdown will be added */}
                    <label className="w-full flex items-center">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Category<sup className="text-rose-500">*</sup> :</p>
                        <select
                            name="category"
                            onChange={changeHandler}
                            value={itemData.categories}
                            className="rounded-[0.5rem] w-full p-[12px]"
                        >
                            {/* <option value={itemData.category}>{itemData.category}</option> */}
                            {allCategories.map((categoryOption) => (
                                <option key={categoryOption.id} value={categoryOption.name}>
                                    {categoryOption.name}
                                </option>
                            ))}
                        </select>
                    </label>

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
                                    name="buyer_id"
                                    onChange={changeHandler}
                                    placeholder="Enter Item Name"
                                    value="buyer_name/buyer_id"
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                            <label className="w-full flex items-center">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Final Price<sup className="text-rose-500">*</sup></p>
                                <input
                                    type="number"
                                    required
                                    name="final_price"
                                    onChange={changeHandler}
                                    placeholder="Enter Item Price"
                                    value={0}
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                        </div>
                    )}




                    {/* buttons */}
                    <div className="flex gap-x-5 justify-center">
                        {/* Close button */}
                        <button onClick={submitHandler}
                            className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                            type="submit"
                            
                            
                        >{picLoading ? "Creating your product..." : "Submit"}</button>

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
