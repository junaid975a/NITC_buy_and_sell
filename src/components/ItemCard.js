import React, {useState} from "react";

const ItemCard = ({ id, name, category, description, seller_id, condition, created_at, price }) => {
    
    return (
        <div className="w-[380px] h-min m-4 p-4 flex flex-col rounded-[10px] items-center shadow-md">

            <img src="#" className="w-[360px] aspect-square object-cover " alt="item image" />


            <div className="my-[10px] mx-[5px] w-[340px]">
                <div className="">
                    <h4 className="text-[#1faa59] text-xl font-bold">&#8377; {price}</h4>
                    <h4 className="text-2xl">{name}</h4>
                </div>
                <div className="max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {description}
                </div>
            </div>
            

            <button className="mt-[14px] py-[10px] px-[60px] border border-blue-700 cursor-pointer
             rounded-md text-[18px] font-bold bg-blue-400 hover:bg-blue-600 text-white
             transition-all duration-200" >
                See Details
            </button>



        </div>
    )
}

export default ItemCard;