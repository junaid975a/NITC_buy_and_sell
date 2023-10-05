import React, { useState } from 'react'
import ChatContext from './ChatContext'
import axios from 'axios'
import ProductContext from '../product/ProductContext'

const ChatState = (props) => {

    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const host = "http://127.0.0.1:5000"
    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
    };
    const getAllChats = () =>{
        try {
            const { data } = axios.get("http://127.0.0.1:5000/chats",config);
            setAllChats(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (<ProductContext.Provider value={{
        allChats,
        setAllChats,
        selectedChat,
        setSelectedChat,
        getAllChats,

    }}></ProductContext.Provider>)
}