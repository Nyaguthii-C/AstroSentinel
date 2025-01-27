const express = require('express');
const router = express.Router();
const User = require('../models/users');
//const generateVerificationToken = require('./generateVerificationToken');
const jwt = require('jsonwebtoken');

// Verification route
router.get('/verify/:token', async (req, res) => {
  try {
    // Extract the verification token from the URL parameters
    const verificationToken = req.params.token;

    // Verify the token using JWT (to decode and check validity)
    const decodedToken = jwt.verify(verificationToken, process.env.JWT_SECRET);

    // Extract user information from the decoded token
    const { username, email } = decodedToken;

    // Find the user with the matching username and email
    const user = await User.findOne({ username, email });

    // If the user is found, mark their email as verified
    if (user) {
      user.isEmailVerified = true;
      user.verificationToken = undefined; // Clear the verification token after successful verification
      await user.save();
      res.redirect('/login'); // Redirect to the login page or any other page
    } else {
      res.status(404).json({ error: 'Invalid verification token' });
    }
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
