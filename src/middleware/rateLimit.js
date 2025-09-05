"use strict";
const rateLimit = require("express-rate-limit");
const { config } = require("../config/env");

function setupRateLimitMiddleware(app) {
    // Rate limiting
    const limiter = rateLimit({ 
        windowMs: config.RATE_LIMIT_WINDOW_MS,
        max: config.RATE_LIMIT_MAX,
        standardHeaders: false,
        legacyHeaders: false,
        message: {
            error: 'Too many requests from this IP, please try again later.'
        }
    });
    
    app.use(limiter);
}

module.exports = { setupRateLimitMiddleware };
