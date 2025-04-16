const jwt = require("jsonwebtoken");

const jwtUtility = {
  // Create a JWT
  createToken: (payload) => {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" }; // Token expires in 1 hour
    return jwt.sign(payload, secret, options);
  },

  // Verify a JWT
  verifyToken: (token) => {
    const secret = process.env.JWT_SECRET;
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null; // Invalid token
    }
  },
};

module.exports = jwtUtility;