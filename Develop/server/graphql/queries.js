// queries.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
