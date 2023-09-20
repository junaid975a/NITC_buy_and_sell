const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/create',fetchuser,createProduct)
router.put('/update-product/:id',fetchuser,updateProduct)
router.get('/all-products',getAllProducts)
router.delete('/delete-product/:id',deleteProduct)

module.exports = router