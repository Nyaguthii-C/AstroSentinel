// users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true }
});

// Export the user schema
module.exports = mongoose.model('User', userSchema);
