const otpGenerator = require('otp-generator'); // Import the otpGenerator module

const User = require('../model/User');

async function sendOTP(phoneNumber) {
  try {
    let otp; // Define otp variable here
    
    // Check if a user with the provided phone number already exists
    let user = await User.findOne({ phoneNumber: phoneNumber });
    
    if (!user) {
      // Generate OTP
      otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

      // Create a new user with only required fields
      user = new User({
        email: 'example1@example.com', // Provide a default email
        password: 'defaultPassword', // Provide a default password
        phoneNumber: phoneNumber,
        otp: otp
      });
    } else {
      // Update existing user's OTP
      otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
      user.otp = otp;
    }
    
    // Save OTP to database using the User model
    await user.save();

    // Send OTP via SMS or any other method
    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
    
    return otp; // You can return the OTP if needed for further processing
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

module.exports = { sendOTP };
