const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createRating } = require('../controllers/ratingController');
const router = express.Router();

router.post('/create-rating/:id',fetchuser,createRating);



module.exports = router