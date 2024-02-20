const mongoose = require('mongoose');

// Set the 'strictQuery' option to 'false' to allow more flexibility in queries.
// This is done to prevent deprecation warnings in Mongoose 7, which will change
// the default behavior to 'false'.
mongoose.set('strictQuery', false);

// Connection to the database
const dburl = "mongodb+srv://nyaguthiigc:oVduYBrZrfx3mv1T@cluster0.nzjmgdz.mongodb.net/astrosentinel?retryWrites=true&w=majority"

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
