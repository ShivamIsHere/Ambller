const express = require('express');
const router = express.Router();

const { updatePhoneNumber } = require('../controller/User');
const { createUser, User } = require('../controller/Auth.js');

// Route to create a new user
// Define route handler for creating a new user
router.post('/signIn', createUser);
router.post('/updatePhoneNumber', updatePhoneNumber);

exports.router =router;