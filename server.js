const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
const loginRoutes = require('./routes/loginroutes');
const markersRoutes = require('./routes/markersroutes');
const signupRoutes = require('./routes/signuproutes');
const usersRoutes = require('./routes/usersroutes');
const pageRoutes = require('./routes/pageroutes')
const app = express();
const PORT = process.env.PORT || 3000; 


// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

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



// Connect to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
