const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
  }

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }

input bookInfo {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInfo): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
