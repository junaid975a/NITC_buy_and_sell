import React, { useState } from 'react'
import ChatContext from './ChatContext'
import axios from 'axios'

const ChatState = (props) => {

    const [allChats, setAllChats] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [chatId, setChatId] = useState(null);
    
    const host = "http://127.0.0.1:5000"




    const Chats = [
        { chat_id: "1", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "2", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "3", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "4", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
        { chat_id: "5", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "6", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "7", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "8", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
        { chat_id: "9", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "10", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "11", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "12", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
    ];
    const Messages = [
        { content: "hi", chat_id: "1", user_id: "m210694ca" },
        { content: "hi", chat_id: "1", user_id: "m210662ca" },
        { content: "selling phone?", chat_id: "1", user_id: "m210694ca" },
        { content: "yes", chat_id: "1", user_id: "m210662ca" },
        { content: "how much?", chat_id: "1", user_id: "m210694ca" },
        { content: "10k", chat_id: "1", user_id: "m210662ca" },
        { content: "any discount?", chat_id: "1", user_id: "m210694ca" },
        { content: "9k last", chat_id: "1", user_id: "m210662ca" },
        { content: "ok, deal", chat_id: "1", user_id: "m210694ca" },
        { content: "deal.", chat_id: "1", user_id: "m210662ca" },
        { content: "i'm coming to take it.", chat_id: "1", user_id: "m210694ca" },
        { content: "take from oldmega", chat_id: "1", user_id: "m210662ca" },
        { content: "okay", chat_id: "1", user_id: "m210694ca" },
        { content: "okay", chat_id: "1", user_id: "m210662ca" },

    ];






    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };
    const getAllChats = async() =>{
        try {
            const { data } = await axios.get(`${host}/chats`,config);
            console.log(data);
            setAllChats(data);

        } catch (error) {
            console.log(error)
        }
    }
    const getAllMessages = async(id) => {
        if (!selectedChat) return;
        try {
            console.log(selectedChat);
            const { data } = await axios.get(`${host}/chats/messages/${selectedChat}`,config);
            setAllMessages(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (data) => {
        
    }

    return (<ChatContext.Provider value={{
        allChats,
        setAllChats,
        selectedChat,
        setSelectedChat,
        getAllChats,
        isPopupVisible,
        setIsPopupVisible,
        Chats,
        Messages,
        chatId,
        setChatId,
        allMessages,
        setAllMessages,
        getAllMessages,
    }}>
        {props.children}
    </ChatContext.Provider>)
}

export default ChatState