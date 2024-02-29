const User  = require('../model/User');
const otpGenerator = require('otp-generator');







// Function to generate OTP
function generateOTP() {
  // Generate a 6-digit OTP
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

// Controller to update user's phone number and send OTP
async function updatePhoneNumber(req, res) {
  const { userId, phoneNumber } = req.body;
  
  try {
    // Generate or retrieve user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate OTP
    let otp = user.otp;
    const otpTimestamp = user.otpTimestamp;
    const currentTime = new Date();
    const otpExpirationTime = new Date(otpTimestamp.getTime() + 5 * 60 * 1000); // Add 5 minutes

    // Check if OTP is expired or not generated yet
    if (!otp || currentTime > otpExpirationTime) {
      otp = generateOTP();
      user.otp = otp;
      user.otpTimestamp = currentTime;
    }

    // Update user document with new phone number and OTP
    user.phoneNumber = phoneNumber;
    await user.save();

    // Send OTP to user (implementation details in the next step)

    res.status(200).json({ message: 'Phone number updated successfully' });
  } catch (error) {
    console.error('Error updating phone number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { updatePhoneNumber };
