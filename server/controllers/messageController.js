const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const sendMessage = async (req, res) => {
    const { message_text, chatId } = req.body;
    const senderId = req.user;
    let message = message_text.trim();
    if (message.length === 0) {
        res.status(400).json({ message: "please atleast enter a character" })
        return
    }
    try {
        // check if the chat exists or not
        const chat = await sequelize.query("select * from chats where id = :chatId", {
            replacements: { chatId },
            type: QueryTypes.SELECT
        })

        if (chat.length === 0) {
            res.status(404).json({ message: "This chat does not exist" })
            return
        } 

        // check if the user is either seller or buyer 

        const isUser = await sequelize.query("select buyerId,sellerId from chats where id=:chatId",{
            replacements:{
                chatId:chatId,
            },
            type:QueryTypes.SELECT
        })

        // console.log(isUser);

        if(isUser[0].buyerId !== req.user && isUser[0].sellerId !== req.user){
            res.status(404).json({ message: "you are not the member of this chat" })
            return
        }

        const insertQuery = "insert into messages (message_text,senderId,chatId,createdAt,updatedAt) values (:message_text,:senderId,:chatId,NOW(),NOW())"

        const data = {
            message_text: message,
            senderId: senderId,
            chatId: chatId,
        }

        const fMessage = await sequelize.query(insertQuery, {
            replacements: data,
            type: QueryTypes.INSERT
        });
        
        // set the latestMessageId of that chat 
        const messageId = fMessage[0];
        console.log(fMessage)
        const updateQuery = "UPDATE chats SET latestMessage=:mId,updatedAt=NOW() WHERE id=:chatId"
        const lMsgId = await sequelize.query(updateQuery,{
            replacements: {
                mId: messageId,
                chatId: chatId
            },
            type: QueryTypes.UPDATE,
            namedBindings: true
        });
        const thisMsg = await sequelize.query("select * from messages where id=:messageId",{
            replacements: {messageId},
            type: QueryTypes.SELECT
        })
        if(fMessage){
            res.status(200).json(thisMsg[0])
            return;
        }else{
            res.status(404).json({ message:"failed to send message" })
            return;
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

}

const allMessages = async (req, res) => {
    try {
        // console.log(req.params)
        const id = req.params.chatId
        
        // check if the user is either seller or buyer 

        const isUser = await sequelize.query("select buyerId,sellerId from chats where id=:chatId",{
            replacements:{
                chatId:id,
            },
            type:QueryTypes.SELECT
        })

        // console.log(isUser);

        if(isUser[0].buyerId !== req.user && isUser[0].sellerId !== req.user){
            res.status(404).json({ message: "you are not the member of this chat" })
            return
        }

        const messages = await sequelize.query("select * from messages where chatId=:id",{
            replacements:{id},
            type:QueryTypes.SELECT
        })
        if(messages){
            console.log(messages);
            res.status(200).json(messages)
            return
        }else{
            res.status(404).json({message:"failed to fetch messages"})
            return
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
}


module.exports = {
    sendMessage,
    allMessages
}