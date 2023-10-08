const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const createChat = async (req, res) => {
    // no latestMessage when created
    const { sellerId } = req.body;
    const buyerId = req.user

    try {
        // verify the seller is already exists or not
        const isSeller = await sequelize.query("select * from products where sellerId = :sellerId", {
            replacements: { sellerId },
            type: QueryTypes.SELECT
        })

        if (isSeller.length === 0) {
            res.status(404).json({ message: "The seller not exists" })
            return;
        }

        const existingChat = await sequelize.query("SELECT * FROM chats WHERE (buyerId = :buyerId AND sellerId = :sellerId) OR (buyerId = :sellerId AND sellerId = :buyerId)", {
            replacements: {
                buyerId: buyerId,
                sellerId: sellerId
            },
            type: QueryTypes.SELECT
        })
        // console.log(existingChat);
        if (existingChat.length > 0) {
            res.status(200).json(existingChat[0])
            return;
        }

        const chat = await sequelize.query("insert into chats (createdAt,updatedAt,sellerId,buyerId) values (NOW(),NOW(),:sellerId,:buyerId)", {
            replacements: {
                sellerId: sellerId,
                buyerId: buyerId
            },
            type: QueryTypes.INSERT
        })

        // console.log(chat);
        if (chat) {
            res.status(200).json(chat)
            return;
        } else {
            res.status(400).json({ message: "failed creating chat" })
        }
    } catch (error) {
        res.status(500).json(error.message)
        return;
    }
}

const getChats = async (req, res) => {
    const userId = req.user
    try {
        const insertQuery = `
    SELECT
        c.*,
        u1.name as sellerName,
        u1.phoneNo as sellerPhoneNo,
        u1.profilePicture as sellerProfilePicture,
        u2.name as buyerName,
        u2.phoneNo as buyerPhoneNo,
        u2.profilePicture as buyerProfilePicture
    FROM chats as c
    INNER JOIN users as u1 ON c.sellerId = u1.email
    INNER JOIN users as u2 ON c.buyerId = u2.email
    WHERE c.sellerId = :userId OR c.buyerId = :userId
    ORDER BY c.updatedAt DESC
`;

        const chats = await sequelize.query(insertQuery, {
            replacements: {
                userId: userId
            },
            type: QueryTypes.SELECT
        })
        if (chats) {
            // console.log(chats);
            res.status(200).json(chats)
            return;
        } else {
            res.status(400).json({ message: "failed fetch chats" })
            return;
        }
    } catch (error) {
        res.status(500).json(error.message)
        return;
    }
}

module.exports = {
    createChat,
    getChats
};
