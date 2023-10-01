import React, { useState } from "react";
import BoughtItemPopup from "./BoughtItemPopup";
import "../css/boughItemCard.css";

const BoughtItemCard = ({
  id,
  name,
  category,
  description,
  seller_id,
  condition,
  created_at,
  price,
  buyer_id,
  final_price,
  purchase_date,
  isReviewed,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="w-[350px] sm:w-[580px] md:w-[740px] lg:w-[980px] h-min m-4 px-4 py-2 flex flex-row rounded-[10px] items-center justify-between shadow-lg bought-card">
      <div className="flex gap-x-3">
        <div className="flex items-center justify-center">
          <img
            src="#"
            className="w-[80px] rounded-full aspect-square object-cover "
            alt="item image"
          />
        </div>

        <div className="my-[10px] mx-[5px] max-w-[310px]">
          <div className="">
            <h4 className="text-[#1faa59] text-md font-bold">
              &#8377; {final_price}
            </h4>
            <h4 className="text-lg">{name}</h4>
            <h4 className="text-sm italic">{purchase_date}</h4>
          </div>
        </div>
      </div>

      <button
        className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
                rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
                transition-all duration-300 ease-out"
        onClick={togglePopup}
      >
        View Details
      </button>

      {/* id, name, category, description, seller_id, 
            condition, created_at, price, buyer_id, 
            final_price, purchase_date */}

      {isPopupVisible && (
        <BoughtItemPopup
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
          isReviewed={isReviewed}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default BoughtItemCard;
