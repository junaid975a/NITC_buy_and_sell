import React, { useEffect, useState } from "react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";



const ChatPage = () => {



    return (

        <div className="w-[100vw] h-[85vh] mt-5 flex justify-center items-center bg-blue-300">
            <div className="flex w-[80%] h-[90%] bg-white p-6 rounded-md">
                <div className="flex w-full border-2 rounded-md">
                    <div className="overflow-auto w-2/6">
                        <MyChats />
                    </div>
                    <div className="w-4/6">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ChatPage; 