import React from "react";
import MyChatCard from "./MyChatCard";
import { useContext } from "react";
import { ChatContext } from "../context/chatHelperContext";

const MyChats = () => {

    const { Chats } = useContext(ChatContext);

    return (
        <div>
            {Chats.length === 0 ?
                (
                    <div>
                        <p>No chats available</p>
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
                                Chats.map((chat) => (
                                    <MyChatCard key={chat.chat_id}
                                        chat_id={chat.chat_id}
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