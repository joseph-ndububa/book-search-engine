const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
  }

input Book {
    name: String
    description: String
    title: String
    bookId: ID!
    image: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: Book): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
