// const { sendOTP } = require('./otpService');

// async function sendOTPController(req, res) {
//   const { phoneNumber } = req.body;

//   try {
//     // Send OTP
//     const otp = await sendOTP(phoneNumber);
//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// }

// module.exports = { sendOTPController };