"use strict";
const { setupSecurityMiddleware } = require("./security");
const { setupBodyParserMiddleware } = require("./bodyParser");
const { setupRateLimitMiddleware } = require("./rateLimit");
const { setupLoggingMiddleware } = require("./logging");
const { optionalAuth } = require("./auth");

function setupAllMiddleware(app) {
    // Setup logging first
    setupLoggingMiddleware(app);
    
    // Setup security middleware
    setupSecurityMiddleware(app);
    
    // Setup body parsers
    setupBodyParserMiddleware(app);
    
    // Setup optional authentication (adds user to req.user if token exists)
    app.use(optionalAuth);
    
    // Setup rate limiting
    setupRateLimitMiddleware(app);
}

module.exports = { setupAllMiddleware };
