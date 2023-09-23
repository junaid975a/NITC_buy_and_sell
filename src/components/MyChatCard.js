import React, { useState } from "react";
import { useEffect } from "react";
import ChatBox from "./ChatBox";
import { useContext } from "react";
import { ChatContext } from "../context/chatHelperContext";

const MyChatCard = ({ chat_id, sender_id, receiver_id, sender_name }) => {
    
    // in starting, this above useState variable will be false
    // and so, the chatbox will not be shown thill that is false
    // now, on click of a chatitem, the variable will be true, and as it is true,
    // the chatbox will be visible

    const { IsPopupVisible, setIsPopupVisible, setChatId, chatId } = useContext(ChatContext);
    function clickHandler() {
        setIsPopupVisible(true);
        setChatId(chat_id);
    }

    return (
        // className={`m-2 p-3 rounded-md max-w-[70%] 
        // ${message.user_id === "m210662ca" ? "bg-[#007bff] 
        // text-white self-end" : "bg-[#f0f0f0] text-[#333] self-start"}`}
        <div className={`"h-min p-4 flex border-2 rounded-lg items-center cursor-pointer gap-x-1" ${chatId === chat_id ? "bg-blue-300" : "bg-white" }`}
            onClick={clickHandler}>


            <img src="#" alt="user" className="rounded-full" />
            <p className="whitespace-nowrap">{sender_name}</p>


           

        </div>
    )
}

export default MyChatCard;