import React, { useState, useEffect, useContext, useRef } from "react";
import ChatContext from "../context/chat/ChatContext";
import AuthContext from "../context/auth/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const ChatBox = () => {
    const {
        isPopupVisible,
        getAllMessages,
        allMessages,
        setIsPopupVisible,
        chatId,
        Messages,
        selectedChat,
    } = useContext(ChatContext);
    const scrollToBottom = () => {
        try {
            setTimeout(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
                }
            }, 0);
        } catch (error) {
            // Handle any potential errors here
            console.error("Error while scrolling:", error);
        }
    };
    


    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loadingMessages, setLoadingMessages] = useState(true); // Added loading state

    const messagesEndRef = useRef(null); // Ref for scrolling to the end

    useEffect(() => {
        // const scrollToBottom = () => {
        //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        // };
        setLoadingMessages(true);
        getAllMessages()
            .then(() => {
                setMessages(allMessages);
                setLoadingMessages(false); // Set loading to false when messages are loaded
                scrollToBottom(); // Scroll to the end after loading
            })
            .catch((error) => {
                console.error("Error loading messages:", error);
                setLoadingMessages(false)
            });
        
    }, [selectedChat]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            };
            const { data } = await axios.post(
                "http://127.0.0.1:5000/chats/messages/send-message",
                {
                    message_text: newMessage,
                    chatId: selectedChat,
                },
                config
            );
            setNewMessage("");
            setMessages([...messages, data]);
            scrollToBottom(); // Scroll to the end after sending a message
        } catch (error) {
            toast.error("Failed to send message");
        }
    };

    return (
        <>
            {selectedChat ? (
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex flex-col overflow-y-auto">
                        {/* Show a spinner while loading messages */}
                        {loadingMessages ? (
                            <div className="flex items-center justify-center h-full">
                                <h1>Loading messages...</h1>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`m-2 p-3 rounded-md max-w-[70%] ${message.senderId === user
                                        ? "bg-[#007bff] text-white self-end"
                                        : "bg-[#f0f0f0] text-[#333] self-start"
                                        }`}
                                >
                                    {message.message_text}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef}></div> {/* Ref for scrolling */}
                    </div>
                    <form onSubmit={sendMessage}>
                        <div className="bg-[#fff] border-t-[1px] border-solid border-[#e0e0e0] flex p-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={typingHandler}
                                className="flex-grow border border-solid rounded-md p-2 mr-2"
                            />
                            <button
                                className="bg-blue-500 border border-blue-700 hover:bg-blue-600 text-white rounded-md px-[16px] py-[8px] ml-2
                transition-all duration-300 ease-in-out"
                                type="submit"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <h1>Please select a chat to message</h1>
                </div>
            )}
        </>
    );
};

export default ChatBox;
