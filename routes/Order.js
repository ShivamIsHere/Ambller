const express = require('express');
const { createOrder,fetchAllOrders, fetchOrdersByUser, deleteOrder, updateOrder } = require('../controller/Order');

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)


exports.router = router;