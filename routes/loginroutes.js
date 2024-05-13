// loginroutes
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const limiter = require('./ratesLimit')


// Display login page
router.get('/login', (req, res) => {
  res.render('login');
});


// user Login route
router.post('/login', limiter, async (req, res) => {
  try {
    //console.log('Received login request:', req.body);

    const { usernameoremail, password} = req.body;
    //console.log('Captured values:', usernameoremail, password);

    if (!usernameoremail) {
      return res.status(400).json({ error: 'Username or email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Check if the user exists based on username or email
    const user = await User.findOne({ $or: [{ username: usernameoremail }, { email: usernameoremail }] });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or email' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Check if the user's email is verified
      if (user.isEmailVerified) {
        //store user data in session
        req.session.user = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        // Login successful
        return res.json({ message: 'Login successful' });
      } else {
        // Email not verified
        return res.status(401).json({ error: 'Please verify your email before logging in' });
      }
    } else {
      // Incorrect password
      return res.status(401).json({ error: 'Incorrect password' });
    }  
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
