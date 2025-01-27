const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const limiter = require('./ratesLimit')
//const nodemailer = require('nodemailer');
const validator = require('validator');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sendVerificationEmail = require('./sendVerificationEmail');
const generateVerificationToken = require('./verificationToken');


// Display signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to handle resending of verification email
router.post('/signup/resend-verification-email', async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if email exists
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Set isEmailVerified status to false
    user.isEmailVerified = false;


    // Generate a new verification token
    const verificationToken = generateVerificationToken(user.username, user.email);
    user.verificationToken = verificationToken;

    // Save the updated user record
    await user.save();

    // Send verification email with the new token
    await sendVerificationEmail(user.email, verificationToken);

    // Respond with success message
    res.status(200).json({ message: 'Verification email resent successfully' });
  } catch (error) {
    console.error('Error resending verification email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// signup route for users with rate limit
router.post('/signup', limiter, async (req, res) => {
  try {
    //console.log('Received signup request:', req.body);

    const { username, password, email } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    //console.log('Captured values:', username, password, email);

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password and email are required' });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken(username, email);

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: passwordHash, email, verificationToken });

    // Save the new user to the database
    await newUser.save()

    // Send verification email to the user
    await sendVerificationEmail(email, verificationToken);


    // Respond with success message
    res.status(201).json({ message: 'User created. Please check your email for verification instructions', user: newUser });

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


