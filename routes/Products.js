const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controller/Product');

const router=express.Router();
//to post data of product in database
//to get data from 
router.post('/',createProduct)
//to get all products from database
.get('/',fetchAllProducts)
.get('/:id', fetchProductById)
.patch('/:id', updateProduct);





exports.router =router;