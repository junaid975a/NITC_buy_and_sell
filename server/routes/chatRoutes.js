const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createChat, getChats } = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(fetchuser,createChat);
router.route('/').get(fetchuser,getChats);

module.exports = router;