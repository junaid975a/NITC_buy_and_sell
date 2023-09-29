const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createRating, updateRating, deleteRating, getRating } = require('../controllers/ratingController');
const router = express.Router();

router.post('/create-rating/:id',fetchuser,createRating);
router.get('/get-rating/:id',getRating)
router.put('/update-rating/:id',fetchuser,updateRating);
router.delete('/delete-rating/:id',fetchuser,deleteRating);



module.exports = router