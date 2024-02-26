require('dotenv').config();
const mongoose = require('mongoose');
//require('dotenv').config();

// Set the 'strictQuery' option to 'false' to allow more flexibility in queries.
// This is done to prevent deprecation warnings in Mongoose 7, which will change
// the default behavior to 'false'.
mongoose.set('strictQuery', false);

// Connection to the database
const dburl = process.env.DB_URL;

const connectionparams= {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(dburl, connectionparams)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((e) => {
    console.log("Database Connection Error: ", e);
  });
