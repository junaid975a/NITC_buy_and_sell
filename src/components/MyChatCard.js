import React, { useState } from "react";
import { useEffect } from "react";
import ChatBox from "./ChatBox";
import { useContext } from "react";
import ChatContext from "../context/chat/ChatContext";
import AuthContext from "../context/auth/AuthContext";


const MyChatCard = (props) => {
    // in starting, this above useState variable will be false
    // and so, the chatbox will not be shown thill that is false
    // now, on click of a chatitem, the variable will be true, and as it is true,
    // the chatbox will be visible
    const [receiver,setReceiver] = useState();
    const [receiverData,setReceiverData] = useState({
        name:"",
        image_url:"#",
        phoneNo:""
    });
    const {user,getOtherUserData} = useContext(AuthContext)
    const { IsPopupVisible, 
            setIsPopupVisible,
            setChatId, 
            chatId,
            setSelectedChat,
        } = useContext(ChatContext);
    const details = props.chatDetails
    useEffect(() => {
        // decides who will be the receiver of the chat
        if(details.sellerId===user){
            setReceiver(details.buyerId)
            setReceiverData({
                name: details.buyerName,
                image_url: details.buyerProfilePicture,
                phoneNo: details.buyerPhoneNo,
            })
        }
        else {
            setReceiver(details.sellerId)
            setReceiverData({
                name: details.sellerName,
                image_url: details.sellerProfilePicture,
                phoneNo: details.sellerPhoneNo,
            })
        }
        
    },[])

    
    function clickHandler() {
        setIsPopupVisible(true);
        setChatId(props.chatDetails.id);
        setSelectedChat(props.chatDetails.id)
    }

    return (
        // className={`m-2 p-3 rounded-md max-w-[70%] 
        // ${message.user_id === "m210662ca" ? "bg-[#007bff] 
        // text-white self-end" : "bg-[#f0f0f0] text-[#333] self-start"}`}
        <div className={`"h-min p-4 flex gap-1 border-2 rounded-lg items-center cursor-pointer hover:bg-[#f0f0f0] transition-all duration-300 ease-out" ${chatId === props.chatDetails.id ? "bg-blue-300" : "bg-white" }`}
            onClick={clickHandler}>


            <img src={receiverData.image_url} alt="" className="rounded-full h-[40px] w-[40px] overflow-hidden" />
            <p className="whitespace-nowrap">{receiverData.name}</p>


           

        </div>
    )
}

export default MyChatCard;