"use strict";
const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('*'),
  GRAPHQL_PATH: z.string().default('/graphql'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required').default('dev-secret'),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration');
  }
  return parsed.data;
}

// Single unified configuration
const config = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 4000,
  HOST: process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'),
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || ['*'],
  
  // GraphQL
  GRAPHQL_PATH: process.env.GRAPHQL_PATH || '/graphql',
  GRAPHQL_INTROSPECTION: process.env.NODE_ENV !== 'production',
  GRAPHQL_PLAYGROUND: process.env.NODE_ENV !== 'production',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || (process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 60 * 1000),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || (process.env.NODE_ENV === 'production' ? 100 : 120),
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  ENABLE_REQUEST_LOGGING: process.env.ENABLE_REQUEST_LOGGING === 'true' || process.env.NODE_ENV === 'production',
};

module.exports = { loadEnv, config };


