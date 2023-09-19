const generateToken = require('../config/generateToken')
const { validationResult, body } = require('express-validator');
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const registerValidation = [
    body('email').isEmail()
];

const registerUser = async (req, res) => {
    const { fname, lname, email, password, phoneNo } = req.body;
    if (!fname || !email || !password || !phoneNo) {
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
            res.status(400).send({ message: 'User already exists' });
            return; // Return to exit the function
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const name = fname + " " + lname;
        const values = {
            name: name,
            email: email,
            password: hashedPassword,
            phoneNo: phoneNo
        };

        const insertQuery = "INSERT INTO users (name, email, password, phoneNo, createdAt, updatedAt) VALUES (:name, :email, :password, :phoneNo , NOW(), NOW())";
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
        res.status(500).send({ error: error.message });
    }
}


const authUser = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await sequelize.query("SELECT * FROM users WHERE email = :email", {
        replacements: { email }, // Provide the email value here
        type: QueryTypes.SELECT,
    });
    if(userExists.length===0){
        res.status(400).json({ error: "Invalid Credentials"});
        return;
    }
    const comparePassword = await bcrypt.compare(password, userExists[0].password)
    if(!comparePassword){
        res.status(400).json({ error: "Invalid Credentials"});
        return;
    }else{
        res.status(201).json({
            email: email,
            token: generateToken(email),
        });
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

module.exports = { registerUser, registerValidation, authUser }