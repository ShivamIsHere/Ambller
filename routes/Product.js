const express = require('express');
const { createProduct, fetchAllProducts } = require('../controller/Product');

const router=express.Router();
//to post data of product in database
//to get data from 
router.post('/',createProduct)
//to get all products from database
.get('/',fetchAllProducts);





exports.router =router;