const express = require('express');
const { addToCart, fetchCartByUser } = require('../controller/Cart');

const router = express.Router();

router.post('/', addToCart)
router.get('/', fetchCartByUser)

exports.router = router;
