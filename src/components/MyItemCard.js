import React, { useState } from "react";
import AddandEditPopup from "./AddandEditPopup";
import { Button } from "@chakra-ui/react";
import ItemReviewPopup from "./ItemReviewPopup";
import "../css/boughItemCard.css";

const MyItemCard = ({
  id,
  name,
  category,
  description,
  sellerId,
  condition,
  created_at,
  soldAt,
  price,
  final_price,
  buyer_id,
  imageUrl,
  status,
  isReviewed,
  categories,
  rating,
  review,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(false);

  // sample values
  // const rating = 3;
  // const desc = "Sample description for item 123 321 123 321 123 321 123 321";

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const toggleReviewPopup = () => {
    setIsReviewPopupVisible(!isReviewPopupVisible);
  };

  return (
    <div className="w-[350px] sm:w-[580px] md:w-[740px] lg:w-[980px] h-min m-4 px-4 py-2 flex flex-row rounded-[10px] items-center justify-between shadow-lg bought-card">
      <div className="flex gap-x-3">
        <div className="flex items-center justify-center">
          <img
            src={imageUrl}
            className="w-[80px] rounded-full aspect-square object-cover "
            alt="item image"
          />
        </div>

        <div className="my-[10px] mx-[5px] max-w-[310px]">
          <div className="">
            <h4 className="text-[#1faa59] text-md font-bold">
              &#8377; {buyer_id ? final_price : price}
            </h4>
            <h4 className="text-lg">{name}</h4>
          </div>
          {!buyer_id && (
            <div className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {description}
            </div>
          )}
          {buyer_id && (
            <div className="max-w-[75px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {buyer_id}
            </div>
          )}
        </div>
      </div>

      {/* first button to edit the item */}
      <div className=" flex flex-wrap justify-end items-center gap-3 sm-sc-btn">
        {!buyer_id && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
                rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
                transition-all duration-300 ease-out"
            onClick={togglePopup}
          >
            Edit Details
          </button>
        )}

        {buyer_id && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700
                rounded-md text-[12px] font-bold bg-blue-400 text-white
                pointer-events-none opacity-50 cursor-not-allowed"
            onClick={togglePopup}
          >
            SOLD
          </button>
        )}


        {isReviewed == 1 && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
            rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
            transition-all duration-300 ease-out"
            onClick={toggleReviewPopup}
          >
            View Review
          </button>
        )}


      </div>

      {isPopupVisible && (
        <AddandEditPopup
          id={id}
          name={name}
          category={category}
          description={description}
          seller_id={sellerId}
          condition={condition}
          created_at={created_at}
          price={price}
          onClose={togglePopup}
          categories={categories} // Pass the function to close the popup
        />
      )}

      {isReviewPopupVisible && (
        <ItemReviewPopup
          rating={rating}
          desc={review}
          buyer={buyer_id}
          onClose={toggleReviewPopup}
        />
      )}

      {/* when item is sold, make another button with no action and puth there taht item is sold */}

      {/* {isPopupVisible && (
                <ItemDetailsPopup
                id={id}
                name={name}
                category={category}
                description={description}
                seller_id={seller_id}
                condition={condition}
                created_at={created_at}
                price={price}
                    onClose={togglePopup} // Pass the function to close the popup
                />
            )} */}
    </div>
  );
};

export default MyItemCard;
