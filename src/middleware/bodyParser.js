"use strict";
const bodyParser = require("body-parser");

function setupBodyParserMiddleware(app) {
    // JSON body parser
    app.use(bodyParser.json({ limit: '1mb' }));
    
    // URL-encoded body parser
    app.use(bodyParser.urlencoded({ extended: true }));
}

module.exports = { setupBodyParserMiddleware };
