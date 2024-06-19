const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
const loginRoutes = require('./routes/loginroutes');
const markersRoutes = require('./routes/markersroutes');
const signupRoutes = require('./routes/signuproutes');
const usersRoutes = require('./routes/usersroutes');
const pageRoutes = require('./routes/pageroutes')
const verificationRoutes = require('./routes/verificationRoutes');
const app = express();
const PORT = process.env.PORT || 3000; 
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); //for session
const dotenv = require('dotenv').config()
const secret = process.env.AUTH_SESSION_SECRET; // session secret saved in environmental variable


// Configure express-session with connect-mongo
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // set expiration time for session cookie in milliseconds, set to 1 hour
        expires: new Date(Date.now() + 3600000)
    },
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection, // connection to database
        autoRemove: 'interval', // Remove expired sessions on a regular basis
        autoRemoveInterval: 60 // Interval in minutes
    })
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Trust the first proxy in front of Express
app.set('trust proxy', 1);

app.use(express.static('views'));

// Middleware to handle JSON bodies
app.use(express.json());

// import file that handles database connection
require('./config/db');


// Define routes
// use landing routes
app.use(loginRoutes);

// use markers routes
app.use(markersRoutes);

// use signup routes
app.use(signupRoutes);

// use users routes
app.use(usersRoutes);

// use maps and guide routes
app.use(pageRoutes);

// use verification routes
app.use(verificationRoutes)


// Connect to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
