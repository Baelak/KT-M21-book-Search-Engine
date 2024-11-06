const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Apollo Server import
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas'); // Assuming you have schemas set up

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add user to context if authenticated
    const token = req.headers.authorization || '';
    const user = token ? verifyToken(token) : null; // Define verifyToken function
    return { user };
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply Apollo Server middleware
server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`💚 Now listening on localhost:${PORT}${server.graphqlPath}`);
  });
});
