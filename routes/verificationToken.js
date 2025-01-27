// generate a verification token using jwt
const jwt = require('jsonwebtoken');

// Secret key for JWT signing
const secretKey = process.env.JWT_SECRET;

function generateVerificationToken(username, email) {
  // Create the payload for the token
  const payload = { username, email };

  // Set token expiration time (optional, e.g., 1 hour)
  const options = { expiresIn: '1h' };

  // Sign the token with the payload, secret, and options
  const verificationToken = jwt.sign(payload, secretKey, options);

  return verificationToken;
}

module.exports = generateVerificationToken;
