const User = require('../model/Usersample');

// Controller to create a new user
async function createUser(req, res) {
  const { email, password, role, addresses, name, salt, resetPasswordToken, phoneNumber } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      email,
      password,
      role: role || 'user',
      addresses,
      name,
      salt,
      resetPasswordToken,
      phoneNumber
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createUser, User };