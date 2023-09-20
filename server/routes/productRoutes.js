const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/create',fetchuser,createProduct)

module.exports = router