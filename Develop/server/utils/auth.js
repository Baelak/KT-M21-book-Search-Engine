// auth.js

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for authenticated routes
  authMiddleware: function (req, res, next) {
    // Extract token from headers
    let token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // ["Bearer", "<tokenvalue>"]
    if (token.startsWith('Bearer ')) {
      token = token.split(' ').pop().trim();
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request object
    } catch (error) {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    next(); // move to the next middleware or resolver
  },

  // Generate token for user
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
