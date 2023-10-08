const generateToken = require('../config/generateToken')
const { validationResult, body } = require('express-validator');
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");


const registerValidation = [
    body('email').isEmail()
];
const sendEmail = async (req, res) => {
    try {
        // Create a transporter using Ethereal's SMTP server for testing
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Set to false for non-secure connection
            auth: {
                user: 'baby.gutmann@ethereal.email',
                pass: 'eCC2AZp8j5aJ69shtn'
            },
        });

        // Compose the email
        const mailOptions = {
            from: '"Gyanaranjan Sahoo" <jayda37@ethereal.email>',
            to: 'gyanaranjansahoo509@gmail.com',
            subject: 'Hello Gyana',
            text: 'Hello from NITC Buy Sell',
            html: "<p>Hello world</p>"
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Log message ID and send a response
        console.log("Message sent: %s", info.messageId);
        res.json({ message: "Email sent successfully", messageId: info.messageId });
    } catch (error) {
        // Log and send an error response
        console.error("Error sending email:", error);
        res.status(500).send({ error: error.message });
    }
};

// Make sure to call the sendEmail function somewhere in your code.

const registerUser = async (req, res) => {
    const { name, email, password, phoneNo,pic } = req.body;
    if (!name || !email || !password || !phoneNo) {
        res.status(400).send({ message: 'Invalid credentials' });
        return; // Return to exit the function
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Email should be valid" });
    }

    try {
        // Check if a user with the same email already exists
        const userExists = await sequelize.query("SELECT * FROM users WHERE email = :email", {
            replacements: { email }, // Provide the email value here
            type: QueryTypes.SELECT,
        });

        if (userExists.length > 0) {
            // User with the same email already exists
            // console.log("user already exists");
            res.status(400).send({ message: 'User already exists' });
            return; // Return to exit the function
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const values = {
            name: name,
            email: email,
            password: hashedPassword,
            phoneNo: phoneNo,
            profilePicture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        };
        
        // Check if pic is provided in req.body
        if (pic !== undefined) {
            values.profilePicture = pic;
        }

        const insertQuery = "INSERT INTO users (name, email, password, phoneNo,profilePicture, createdAt, updatedAt) VALUES (:name, :email, :password, :phoneNo, :profilePicture , NOW(), NOW())";
        const user = await sequelize.query(insertQuery, {
            replacements: values,
            type: Sequelize.QueryTypes.INSERT,
        });

        if (user) {
            res.status(201).json({
                name: name,
                email: email,
                phoneNo: phoneNo,
                token: generateToken(user.email),
            });
        } else {
            res.status(500).send({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await sequelize.query("SELECT * FROM users WHERE email = :email", {
            replacements: { email }, // Provide the email value here
            type: QueryTypes.SELECT,
        });
        if (userExists.length === 0) {
            res.status(400).json({ message: "No user exists with this email" });
            return;
        }
        const comparePassword = await bcrypt.compare(password, userExists[0].password)
        if (!comparePassword) {
            // console.log("not equal");
            res.status(400).json({ error: "Wrong Password" });
            return;
        } else {
            res.status(201).json({
                email: email,
                token: generateToken(email),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
}

const updateUser = async (req, res) => {
    const { name, phoneNo } = req.body;
    const email = req.user

    if (!name || !phoneNo) {
        res.status(400).send({ message: 'Invalid credentials' });
        return; // Return to exit the function
    }

    try {
        const userExists = await sequelize.query("SELECT * FROM users WHERE email = :email", {
            replacements: { email }, // Provide the email value here
            type: QueryTypes.SELECT,
        });

        if (userExists.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        } else {
            console.log(userExists);
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // console.log("password hashed: " + hashedPassword);
        const values = {
            name: name,
            email: email,
            phoneNo: phoneNo
        }

        const updateQuery = "UPDATE users SET name=:name,phoneNo=:phoneNo,updatedAt=NOW() WHERE email = :email"

        const user = await sequelize.query(updateQuery, {
            replacements: values,
            type: Sequelize.QueryTypes.UPDATE,
        });

        if (user) {
            console.log(user);
            res.status(201).json({
                name: name,
                email: email,
                phoneNo: phoneNo,
            });
        } else {
            res.status(500).send({ message: 'Failed to update user' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }

}

const getUser = async (req, res) => {
    const email = req.user;
    try {
        const userExists = await sequelize.query("SELECT * FROM users WHERE email = :email", {
            replacements: { email }, // Provide the email value here
            type: QueryTypes.SELECT,
        });

        if (userExists.length > 0) {
            res.status(200).json(userExists[0]);
        } else {
            res.status(404).json({ error: "User not found" });
            // console.log(userExists);
        }
        return;
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const findUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await sequelize.query("select name,email,tot_rating,tot_no_rating,phoneNo,profilePicture from users where email=:userId",{
            replacements:{ userId},
            type:QueryTypes.SELECT
        })
        res.status(200).json(userData[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// const allUsers = async (req, res) => {
//     const keyword = req.query.search ? {
//         $or: [
//             { name: { $regex: req.query.search, $options: 'i' } },
//             { email: { $regex: req.query.search, $options: 'i' } },
//         ]
//     } : {};
//     const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
//     return res.send(users)
// }

module.exports = { registerUser, registerValidation, authUser, updateUser, findUser, sendEmail, getUser }