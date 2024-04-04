const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

// Verification route
router.get('/verify/:token', async (req, res) => {
  try {
    // Extract the verification token from the URL parameters
    const verificationToken = req.params.token;

    // --Log the received token for debugging purposes
    console.log('Received verification token:', verificationToken);

    // Find the user with the matching verification token
    const user = await User.findOne({ verificationToken });

    // If the user is found, mark their email address as verified
    if (user) {
      user.isEmailVerified = true;
      user.verificationToken = undefined; // Clear the verification token
      await user.save();
      res.redirect('/login'); // Redirect to the login page or any other page

      // --Log successful verification
      console.log('User email verified successfully');
    } else {
      // --Log invalid verification token
      console.error('Invalid verification token:', verificationToken);
      res.status(404).json({ error: 'Invalid verification token' });
    }
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
