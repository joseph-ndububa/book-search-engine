const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Book {
  authors: [String]
  bookId: String
  description: String
  image: String
  title: String
  link: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

type Auth {
    token: ID!
    user: User
  }

input bookInfo {
    authors: [String]
    bookId: String
    description: String
    image: String
    title: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInfo): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
