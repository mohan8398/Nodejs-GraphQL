"use strict";
const jwt = require("jsonwebtoken");
const { loadEnv } = require("../config/env");

function extractUserFromToken(req) {
    const env = loadEnv();
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let user = undefined;
    
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            const payload = jwt.verify(token, env.JWT_SECRET);
            user = { id: payload.id, username: payload.username };
        } catch (_err) {
            user = undefined;
        }
    }
    
    return user;
}

function buildGraphQLContext({ req }) {
    const user = extractUserFromToken(req);
    
    return {
        requestId: req.headers['x-request-id']?.toString(),
        user,
    };
}

// Optional: Express middleware for protecting routes
function requireAuth(req, res, next) {
    const user = extractUserFromToken(req);
    
    if (!user) {
        return res.status(401).json({ 
            error: 'Unauthorized - Valid token required' 
        });
    }
    
    req.user = user;
    next();
}

// Optional: Express middleware for optional auth (doesn't fail if no token)
function optionalAuth(req, res, next) {
    const user = extractUserFromToken(req);
    req.user = user;
    next();
}

module.exports = { 
    extractUserFromToken, 
    buildGraphQLContext, 
    requireAuth, 
    optionalAuth 
};
