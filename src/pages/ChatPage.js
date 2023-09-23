import React, { useEffect, useState } from "react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";



const ChatPage = () => {



    return (
        
        <div className="w-[100vw] h-full p-10">
            <div className="flex">
                <div className="w-2/6 overflow-y-scroll">
                    <MyChats />
                </div>
                <div className="w-4/6">
                    <ChatBox/>
                </div>
            </div>
        </div>
        

    )
}

export default ChatPage; 