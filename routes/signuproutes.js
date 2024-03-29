const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const limiter = require('./ratesLimit')
const nodemailer = require('nodemailer');
const validator = require('validator');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


// Display signup page
router.get('/signup', (req, res) => {
  res.render('signup');
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

// Function to generate a verification token using bcrypt
function generateVerificationToken(username, email) {
  // Generate a random string for additional randomness
  const randomString = Math.random().toString(36).substring(7);
  
  const tokenData = username + email + randomString;

  // Hash the token data using bcrypt
  const verificationToken = bcrypt.hashSync(tokenData, 10);

  return verificationToken;
}

// Function to send a verification email using Gmail
async function sendVerificationEmail(email, verificationToken) {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'AstroSentinel - Email Verification',
      text: `Click the following link to verify your email: https://www.kenyanastro.tech/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}


module.exports = router;
