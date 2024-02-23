const express = require('express');
const mongoose = require('mongoose');
const User = require('./users');
const Marker = require('./markers'); // Import marker model
const bcrypt = require('bcrypt');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000; 

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));
// Middleware to handle JSON bodies
app.use(express.json());

// Assuming you have a 'db.js' file to handle database connection
require('./db');


// Define routes

// display landing page
app.get('/', (req, res) => {
    res.render('landing')
});

//display map with the added markers
app.get('/map', (req, res) => {
    res.render('map')
});

// display measurements guide
app.get('/guide', (req, res) => {
   res.render('guide')
});

// display map for adding  markers
app.get('/index', (req, res) => {
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

// Retrieve markers
app.get('/get-marker', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
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

    const { username, password, email } = req.body;

    console.log('Captured values:', username, password, email);

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


// Login route
app.post('/login', async (req, res) => {
  try {
    console.log('Received login request:', req.body);

    const { username, password, email } = req.body;
    console.log('Captured values:', username, password, email);

    if (!username && !email) {
      return res.status(400).json({ error: 'Username or email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Check if the user exists based on username or email
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or email' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Login successful
      return res.json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// add markers to map
app.post('/add-marker', async (req, res) => {
    try {
        const { lat, lng, SQM_Reading, Bortle_Class } = req.body;

        // Create a new marker instance
        const newMarker = new Marker({
            lat,
            lng,
            SQM_Reading,
            Bortle_Class
        });

        // Save the marker data to your "markers" collection in MongoDB
        await newMarker.save();

        // Respond with a success message
        res.status(200).json({ message: 'Marker added successfully' });
    } catch (error) {
        console.error('Error during marker addition:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Connect to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
