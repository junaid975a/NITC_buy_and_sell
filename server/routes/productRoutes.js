const express = require('express');
const fetchuser = require('../middlewares/fetchUser');
const { createProduct, updateProduct, getAllProducts, deleteProduct, getCategories, getSearchProducts, getBoughtProducts, getPostedProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/create',fetchuser,createProduct)
router.put('/update-product/:id',fetchuser,updateProduct)
router.get('/all-products',fetchuser,getAllProducts)
router.delete('/delete-product/:id',fetchuser,deleteProduct)
router.get('/search-products/:query',getSearchProducts)
router.get('/bought-products',fetchuser,getBoughtProducts)
router.get('/posted-products',fetchuser,getPostedProducts)

// categories
router.get('/categories',getCategories)

module.exports = router