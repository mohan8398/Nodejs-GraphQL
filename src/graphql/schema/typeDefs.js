"use strict";
const gql = require("graphql-tag");
const { userTypes } = require("../../api/user");
const { bookTypes } = require("../../api/books");

const typeDefs = gql`
  scalar DateTime

  type Query {
    health: String!
    serverTime: DateTime!
    books(filters: BookFilters): [Book!]!
    book(id: ID!): Book
    searchBooks(query: String!): [Book!]!
    booksByAuthor(author: String!): [Book!]!
    booksByGenre(genre: String!): [Book!]!
    myBooks: [Book!]!
    bookStats: BookStats!
    me: User
    user(id: ID!): User
    userByEmail(email: String!): User
    users(first: Int, after: Int): [User!]!
  }

  type Mutation {
    echo(message: String!): String!
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Boolean!
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
    updateProfile(input: UpdateUserInput!): User!
    deleteAccount: Boolean!
  }

  type BookStats {
    totalBooks: Int!
    uniqueAuthors: Int!
    uniqueGenres: Int!
    averagePages: Int!
  }

  ${userTypes}
  ${bookTypes}
`;

module.exports = { typeDefs };


