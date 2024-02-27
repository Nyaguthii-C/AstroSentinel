// ./models/users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }
});

// Export the user schema
module.exports = mongoose.model('User', userSchema);