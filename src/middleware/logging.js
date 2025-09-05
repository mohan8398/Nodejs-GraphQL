"use strict";

function setupLoggingMiddleware(app) {
    // Disable Express default logging
    app.disable('x-powered-by');
    
    // Silent middleware - no logging
    app.use((req, res, next) => {
        // Silent middleware - no logging
        next();
    });
}

module.exports = { setupLoggingMiddleware };
