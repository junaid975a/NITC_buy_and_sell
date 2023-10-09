const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const sendMessage = async (req, res) => {
    const { message_text, chatId } = req.body;
    const senderId = req.user;
    const message = message_text.trim();

    try {
        // Check if the chat exists and user is a member
        const chat = await sequelize.query(
            "SELECT buyerId, sellerId FROM chats WHERE id = :chatId FOR UPDATE",
            {
                replacements: { chatId },
                type: QueryTypes.SELECT,
            }
        );

        if (chat.length === 0) {
            return res.status(404).json({ message: "This chat does not exist" });
        }

        const { buyerId, sellerId } = chat[0];

        if (senderId !== buyerId && senderId !== sellerId) {
            return res
                .status(403)
                .json({ message: "You are not a member of this chat" });
        }

        // Begin a transaction
        const t = await sequelize.transaction();

        try {
            // Insert the message into the database and retrieve the last inserted ID
            const [messageId] = await sequelize.query(
                "INSERT INTO messages (message_text, senderId, chatId, createdAt, updatedAt) VALUES (:message_text, :senderId, :chatId, NOW(), NOW())",
                {
                    replacements: {
                        message_text: message,
                        senderId,
                        chatId,
                    },
                    type: QueryTypes.INSERT,
                    transaction: t,
                }
            );

            // Update the latest message ID in the chat
            await sequelize.query(
                "UPDATE chats SET latestMessage = :messageId, updatedAt = NOW() WHERE id = :chatId",
                {
                    replacements: {
                        messageId,
                        chatId,
                    },
                    type: QueryTypes.UPDATE,
                    transaction: t,
                }
            );

            // Commit the transaction
            await t.commit();

            // Fetch the sent message details
            const sentMessage = await sequelize.query(
                "SELECT * FROM messages WHERE id = :messageId",
                {
                    replacements: { messageId },
                    type: QueryTypes.SELECT,
                }
            );

            if (sentMessage.length > 0) {
                return res.status(200).json(sentMessage[0]);
            } else {
                return res.status(500).json({ message: "Failed to send message" });
            }
        } catch (error) {
            // Rollback the transaction in case of an error
            await t.rollback();
            throw error;
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const allMessages = async (req, res) => {
    try {
        // // console.log(req.params)
        const id = req.params.chatId
        
        // check if the user is either seller or buyer 

        const isUser = await sequelize.query("select buyerId,sellerId from chats where id=:chatId",{
            replacements:{
                chatId:id,
            },
            type:QueryTypes.SELECT
        })

        // // console.log(isUser);

        if(isUser[0].buyerId !== req.user && isUser[0].sellerId !== req.user){
            res.status(404).json({ message: "you are not the member of this chat" })
            return
        }

        const messages = await sequelize.query("select * from messages where chatId=:id",{
            replacements:{id},
            type:QueryTypes.SELECT
        })
        if(messages){
            // console.log(messages);
            res.status(200).json(messages)
            return
        }else{
            res.status(404).json({message:"failed to fetch messages"})
            return
        }
    } catch (error) {
        // console.log(error);
        res.status(400).json(error.message)
    }
}


module.exports = {
    sendMessage,
    allMessages
}