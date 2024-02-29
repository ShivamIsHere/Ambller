
const express = require('express');
const { sendOTPController } = require('../controller/otpController.js');

const router = express.Router();

// Define routes
router.post('/send-otp', sendOTPController);

exports.router =router;