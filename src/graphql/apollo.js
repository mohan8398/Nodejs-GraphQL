"use strict";
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const { buildGraphQLContext } = require("../middleware/auth");

function buildSchema() {
    return makeExecutableSchema({ typeDefs, resolvers });
}

// Authorization context is now handled by the auth middleware

async function createApolloServer() {
    const { config } = require("../config/env");
    const schema = buildSchema();
    
    const server = new ApolloServer({
        schema,
        introspection: config.GRAPHQL_INTROSPECTION,//In production, it is recommended to set introspection to false
        logger: {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
        }, // Completely disable Apollo Server logging
    });
    
    await server.start();
    const middleware = expressMiddleware(server, { context: buildGraphQLContext });
    return middleware;
}

module.exports = { createApolloServer };


