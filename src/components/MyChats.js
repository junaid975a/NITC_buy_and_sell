import React, { useEffect } from "react";
import MyChatCard from "./MyChatCard";
import { useContext } from "react";
import { ChatContext } from "../context/chatHelperContext";

const MyChats = () => {

    const { allChats,getAllChats } = useContext(ChatContext);
    // let allChats = [];
    useEffect(() => {
        getAllChats();
        console.log(allChats);
        // allChats = allChats
      
    }, [])
    
    return (
        <div>
            {allChats.length === 0 ?
                (
                    <div>
                        <p>No Chats available</p>
                    </div>
                ) :
                // sold + unsold items dono bhejenge
                // with different props
                // and accordingly, map all of them to the cards
                <div className="">
                    <div className="">
                        <div className="">
                            {
                                // unsold items
                                allChats.map((chat) => (
                                    <MyChatCard key={chat.id}
                                        chat_id={chat.id}
                                        sender_id={chat.sender_id}
                                        receiver_id={chat.receiver_id}
                                        sender_name={chat.sender_name}
                                        
                                    />
                                ))

                            }

                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default MyChats;