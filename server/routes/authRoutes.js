const express = require('express');
const { registerValidation, registerUser, authUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register',registerValidation,registerUser)
router.post('/login',authUser);


module.exports = router