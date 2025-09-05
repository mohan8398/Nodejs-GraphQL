"use strict";
const helmet = require("helmet");
const cors = require("cors");
const { config } = require("../config/env");

function setupSecurityMiddleware(app) {
    // Security headers
    app.use(helmet());
    
    // CORS configuration
    app.use(cors({ 
        origin: config.CORS_ORIGIN, 
        credentials: true 
    }));
}

module.exports = { setupSecurityMiddleware };
