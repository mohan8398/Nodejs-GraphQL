"use strict";
const { GraphQLScalarType, Kind, GraphQLError } = require("graphql");
const { userResolvers } = require("../../api/user");
const { bookResolvers } = require("../../api/books");

function toDate(input) {
  if (input instanceof Date) return input;
  if (typeof input === 'string' || typeof input === 'number') return new Date(input);
  throw new GraphQLError('Invalid DateTime value');
}

// DateTime scalar is now the only thing left in this file

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 DateTime scalar',
  serialize(value) {
    return toDate(value).toISOString();
  },
  parseValue(value) {
    return toDate(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return toDate(ast.value);
    }
    throw new GraphQLError('DateTime must be a string or integer literal');
  },
});

const resolvers = {
  DateTime: DateTimeScalar,
  
  // Merge user and book resolvers
  Query: {
    health: () => 'ok',
    serverTime: () => new Date(),
    ...userResolvers.Query,
    ...bookResolvers.Query,
  },
  
  Mutation: {
    echo: (_, { message }, ctx) => {
      return `[${ctx.requestId ?? 'no-req-id'}] ${message}`;
    },
    ...userResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
};

module.exports = { resolvers };


