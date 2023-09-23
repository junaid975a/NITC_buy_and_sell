import React, {useState} from "react";
import { useContext } from "react";
import { ChatContext } from "../context/chatHelperContext";

const ChatBox = () => {
    const { isPopupVisible, setIsPopupVisible, chatId, Messages } = useContext(ChatContext);
    // Use the filter function to filter messages based on chatId
    const filteredMessages = Messages.filter((message) => message.chat_id === chatId);
    
    // Sample state for the input message
    const [inputMessage, setInputMessage] = useState("");

    // Sample function to handle sending a message
    const sendMessage = () => {
        // Here, you can implement logic to send the message to the chat
        // For demonstration purposes, we'll just log it
        console.log("Message sent:", inputMessage);
        setInputMessage(""); // Clear the input field after sending
    };
    return (
        // <div className=" bg-green-300">
        //     {!isPopupVisible && (
        //         <div className="flex justify-center items-center">

        //             Hello There

        //         </div>

        //     )}

        //     {isPopupVisible && (
        //         <div >
        //             {/* Display filtered messages */}
        //             {filteredMessages.length === 0 ?
        //                 <div> {chatId} </div> :
        //                 filteredMessages.map((message) => (
        //                     <div key={message.content}>{message.content}</div>
        //                 ))}

        //         </div>
        //     )}
            
        // </div>
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                {/* Display filtered messages */}
                {filteredMessages.map((message) => (
                    <div
                        key={message.content}
                        className={`m-2 p-3 rounded-md max-w-[70%] ${message.user_id === "m210662ca" ? "bg-[#007bff] text-white self-end" : "bg-[#f0f0f0] text-[#333] self-start"}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-area flex p-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow border rounded-md p-2"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white rounded-md px-4 ml-2">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;