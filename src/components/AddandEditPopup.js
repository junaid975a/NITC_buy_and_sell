import React, { useState, useEffect } from "react";


const AddandEditPopup = ({ id, name, category, description, seller_id, condition, created_at, price, onClose, categories }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    useEffect(() => {
        // Use a setTimeout to delay the appearance of the popup
        const timeout = setTimeout(() => {
            setIsPopupVisible(true);
        }, 300); // Adjust the delay time (in milliseconds) as needed

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []);
    const handleClose = () => {
        setIsPopupVisible(false);

        // Delay the closing of the popup to allow the animation to complete
        setTimeout(() => {
            onClose();
        }, 300); // Adjust the delay time to match your transition duration
    };


    const [itemData, setItemData] = useState({
        // item_id will be automatic generated
        itemname: name,
        // category id will be fetched and placed 
        category: category,
        description: description,
        // seller id is the ID of the current user
        // seller_id: "",
        condition: condition,
        price: price,
        // attribute-> created_at, will be taken from sql.now() function
        // status will be unsold by default
        categories: categories //list of categories as a prop
    });

    function changeHandler(event) {
        const { name, value } = event.target;

        // Update the itemData state
        setItemData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // console.log(name, value);
        console.log(itemData);

        
    }

    function submitHandler(event) {
        event.preventDefault();

        // on submit, what to do

    }


    return (
        <div className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isPopupVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Create a centered square popup */}
            <div className={`bg-white rounded-lg shadow-md w-[90%] sm:w-[600px] md:w-[720px] h-min max-h-[600px]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isPopupVisible ? "scale-100" : "scale-90"}`}>
                {/* container to show all the details */}
                <form
                    onSubmit={submitHandler} 
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
                            <option value={itemData.category}>{itemData.category}</option>
                            {categories.map((categoryOption) => (
                                <option key={categoryOption.category_id} value={categoryOption.category_name}>
                                    {categoryOption.category_name}
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
                            multiple
                            required
                            name="images"
                            onChange={changeHandler}
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
                        >Submit</button>

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
