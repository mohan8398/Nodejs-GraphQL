"use strict";
const express = require("express");
const dotenv = require("dotenv");
const { loadEnv } = require("./config/env");
const { createApolloServer } = require("./graphql/apollo");
const { registerHealthRoutes } = require("./routes/health");
const { setupAllMiddleware } = require("./middleware");

dotenv.config();

async function createApp() {
    const app = express();
    const { config } = require("./config/env");
    
    // Setup all middleware
    setupAllMiddleware(app);
    
    // Health routes
    registerHealthRoutes(app);
    
    // GraphQL
    const apolloServer = await createApolloServer();
    app.use(config.GRAPHQL_PATH, apolloServer);
    
    return app;
}

module.exports = { createApp };


