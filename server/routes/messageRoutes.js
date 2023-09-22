const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageController');
const fetchuser = require('../middlewares/fetchUser');
const router = express.Router();


router.route('/send-message').post(fetchuser,sendMessage);
router.route('/:chatId').get(fetchuser,allMessages);


module.exports = router