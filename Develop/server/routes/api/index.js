const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('../../schemas');
const authMiddleware = require('../../utils/auth');

const router = express.Router();

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get user data from the auth middleware
    const user = authMiddleware(req);
    return { user };
  },
});

server.applyMiddleware({ app: router });

module.exports = router;
