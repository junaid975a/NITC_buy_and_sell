import React, { useContext, useEffect, useState } from "react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useLocation } from "react-router-dom";
import ChatContext from "../context/chat/ChatContext";



const ChatPage = () => {
    // const location = useLocation();
    // const { sellerId } = location.state;
    const {setSelectedChat,setChatId,getAllChats} = useContext(ChatContext)
    useEffect(() => {
        getAllChats()
        return ()=>{
            setSelectedChat(null);
            setChatId(null);
        }
    }, [])
    


    return (

        <div className="w-[100vw] h-[85vh] mt-5 flex justify-center items-center">
            <div className="flex w-[80%] h-[90%] bg-blue-200 p-6 rounded-md">
                <div className="flex w-full border-2 rounded-md">
                    <div className="overflow-auto w-2/6 bg-white">
                        <MyChats />
                    </div>
                    <div className="w-4/6 bg-white">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ChatPage; 