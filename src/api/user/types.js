"use strict";
const gql = require("graphql-tag");

const userTypes = gql`
  type User {
    id: ID!
    username: String!
    email: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String
  }

  input UpdateUserInput {
    username: String
    email: String
  }
`;

module.exports = { userTypes };
