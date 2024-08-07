// module to generate a verification token using bcrypt
const bcrypt = require('bcrypt');

function generateVerificationToken(username, email) {
  // Generate a random string for additional randomness
  const randomString = Math.random().toString(36).substring(7);

  // Encode the token data to ensure URL safety
  const tokenData = encodeURIComponent(username + email + randomString);

  //const tokenData = username + email + randomString;


  // Hash the token data using bcrypt
  const verificationToken = bcrypt.hashSync(tokenData, 10);

  return verificationToken;
}


module.exports =  generateVerificationToken;
