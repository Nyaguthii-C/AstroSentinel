const express = require('express');
const mongoose = require('mongoose');
const User = require('./users');
const bcrypt = require('bcrypt');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000; // Corrected the typo in 'cons' and added a default value for PORT

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));
// Middleware to handle JSON bodies
app.use(express.json());

// Assuming you have a 'db.js' file to handle database connection
require('./db');


// Define routes

// display simple leaflet map
app.get('/', (req, res) => {
    res.render('index')
});

// Display login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Display signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Retrieve users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// signup route
app.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({ username, passwordHash });

    // Save the new user to the database
    console.log('Saving new user to the database:', newUser);
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User successfully added', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.passwordHash)) {
      // Login successful
      res.json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Connect to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
