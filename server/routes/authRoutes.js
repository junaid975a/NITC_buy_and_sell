const express = require('express');
const { registerValidation, registerUser, authUser, updateUser, findUser, sendEmail, getUser } = require('../controllers/authController');
const fetchuser = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/register',registerValidation,registerUser)
router.post('/login',authUser);
router.get('/find-user',fetchuser,getUser)
router.get('/fetch-user/:id',fetchuser,findUser)
// login required
router.put('/update-profile',fetchuser,updateUser)
router.get('/send-email',sendEmail)


module.exports = router