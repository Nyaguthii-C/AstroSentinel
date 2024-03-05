const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const ejs = require('ejs');


// Display signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// signup route for users
router.post('/signup', async (req, res) => {
  try {
    //console.log('Received signup request:', req.body);

    const { username, password, email } = req.body;

    //console.log('Captured values:', username, password, email);

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password and email are required' });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: passwordHash, email });

    // Save the new user to the database
    console.log('Saving new user to the database:', newUser);
    await newUser.save()

    // Respond with success message
    res.status(201).json({ message: 'User successfully added', user: newUser });

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
