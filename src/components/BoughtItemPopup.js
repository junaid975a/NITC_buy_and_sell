import React, { useState, useEffect } from "react";
import BoughtItemReviewPopup from "./BoughtItemReviewPopup";
import ItemReviewDetails from "./ItemReviewDetails";
import EditReviewPopup from "./EditReviewPopup";
import { useContext } from "react";
import ProductContext from "../context/product/ProductContext";
import { useRef } from "react";

const BoughtItemPopup = ({
  id,
  name,
  category,
  description,
  seller_id,
  condition,
  created_at,
  price,
  onClose,
  buyer_id,
  final_price,
  purchase_date,
  isReviewed,
  imageUrl
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // Added variable for review popup visibility
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [isEditReviewVisible, setIsEditReviewVisible] = useState(false);
  const {productReview} = useContext(ProductContext)
  // sample values
  let rating = 0;
  let desc = ""; 
  if(productReview){
    rating = productReview.rating;
    desc = productReview.review;
  }

  


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
  // Added function to toggle review poppup
  const toggleReview = () => {
    setIsReviewVisible(!isReviewVisible);
  };
  const toggleEditReview = () => {
    setIsEditReviewVisible(!isEditReviewVisible);
  };

  return (
    <div
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${
        isPopupVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Create a centered square popup */}
      <div
        className={`bg-white rounded-lg shadow-md w-[90%] sm:w-min h-min max-h-[600px] overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${
          isPopupVisible ? "scale-100" : "scale-90"
        }`}
      >
        {/* container to show all the details */}
        <div className="flex flex-col justify-between">
          {/* top details div */}
          <div className="flex flex-col sm:flex-row">
            <img
              src={imageUrl}
              alt="item-image"
              className="w-[300px] aspect-square object-cover  p-3"
            />
            {/* name, price, seller */}
            <div className="flex flex-col justify-end m-4 p-3 items-start">
              <h4 className="text-[#1faa59] text-xl font-bold">
                &#8377; {final_price}
              </h4>
              <h4 className="text-2xl">{name}</h4>
              <p className="text-sm italic whitespace-nowrap">
                by{" "}
                <span className="italic text-gray-400 text-sm">
                  {seller_id}
                </span>
              </p>
              <p className="text-sm"> on {purchase_date.substring(0,10)}</p>
            </div>
          </div>

          {/* to store description and condition */}

          {isReviewed === 1 && (
            <ItemReviewDetails rating={rating} desc={desc} />
          )}

          {/* buttons */}
          <div className="flex gap-x-5 justify-center">
            <button
              onClick={isReviewed === 1 ? toggleEditReview : toggleReview}
              className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
              transition-all duration-300 ease-out"
            >
              {isReviewed === 1 ? "Edit Review" : "Review"}
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
              transition-all duration-300 ease-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* Code for Review poppup*/}
      {isReviewVisible && (
        <BoughtItemReviewPopup
          id={id}
          name={name}
          category={category}
          description={description}
          seller_id={seller_id}
          condition={condition}
          created_at={created_at}
          price={price}
          buyer_id={buyer_id}
          final_price={final_price}
          purchase_date={purchase_date}
          onClose={toggleReview}
        />
      )}
      {isEditReviewVisible && (
        <EditReviewPopup
          rating={rating}
          desc={desc}
          onClose={toggleEditReview}
        />
      )}
    </div>
  );
};

export default BoughtItemPopup;
