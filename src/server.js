"use strict";
const http = require("http");
const { createHttpTerminator } = require("http-terminator");
const { createApp } = require("./app");
const { loadEnv } = require("./config/env");

async function main() {
    const app = await createApp();
    const { config } = require("./config/env");
    const server = http.createServer(app);
    const httpTerminator = createHttpTerminator({ server });
    
    server.listen(config.PORT, config.HOST, () => {
        console.log(`Server listening on http://${config.HOST}:${config.PORT}`);
        console.log(`GraphQL endpoint: http://${config.HOST}:${config.PORT}${config.GRAPHQL_PATH}`);
        console.log(`Environment: ${config.NODE_ENV}`);
    });
    const gracefulShutdown = async (signal) => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        try {
            await httpTerminator.terminate();
            console.log('HTTP server closed.');
            process.exit(0);
        }
        catch (err) {
            console.error('Error during shutdown', err);
            process.exit(1);
        }
    };
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

main().catch((err) => {
    console.error('Fatal error starting server', err);
    process.exit(1);
});


