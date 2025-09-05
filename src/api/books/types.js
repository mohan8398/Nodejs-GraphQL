"use strict";
const gql = require("graphql-tag");

const bookTypes = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedAt: DateTime
    description: String
    isbn: String
    genre: String
    pages: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateBookInput {
    title: String!
    author: String!
    publishedAt: DateTime
    description: String
    isbn: String
    genre: String
    pages: Int
  }

  input UpdateBookInput {
    title: String
    author: String
    publishedAt: DateTime
    description: String
    isbn: String
    genre: String
    pages: Int
  }

  input BookFilters {
    author: String
    genre: String
    publishedAfter: DateTime
    publishedBefore: DateTime
  }

  type BookConnection {
    books: [Book!]!
    totalCount: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;

module.exports = { bookTypes };
