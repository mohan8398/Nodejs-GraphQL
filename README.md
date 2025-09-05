# GraphQL API

A GraphQL API built with Node.js, Express, and Apollo Server.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with user management
- 📚 **Book Management** - CRUD operations for books with advanced filtering
- 🛡️ **Security** - Helmet, CORS, rate limiting, and input validation
- 🏗️ **Modular Architecture** - Clean separation of concerns
- 📊 **Health Checks** - Production-ready monitoring
- <!-- - 🐳 **Docker Support** - Containerized deployment -->
<!-- - 🚀 **Production Ready** - Optimized for production deployment -->

## Quick Start

### Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd graphql
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access GraphQL Playground**
   - Open http://localhost:4000/graphql

### Production Deployment

<!-- #### Option 1: Docker Compose (Recommended)

1. **Setup environment**
   ```bash
   cp env.example .env
   # Edit .env with production values
   ```

2. **Deploy with Docker Compose**
   ```bash
   npm run docker:compose:build
   ```

3. **Check deployment**
   ```bash
   npm run health
   ```

#### Option 2: Manual Deployment

1. **Build and start**
   ```bash
   npm run build
   npm run start:prod
   ```

#### Option 3: Using Deployment Script

```bash
./scripts/deploy.sh
``` -->

## API Documentation

### Authentication

#### Register User
```graphql
mutation {
  register(input: {
    username: "john_doe"
    password: "secure_password"
    email: "john@example.com"
  }) {
    token
    user {
      id
      username
    }
  }
}
```

#### Login
```graphql
mutation {
  login(input: {
    username: "john_doe"
    password: "secure_password"
  }) {
    token
    user {
      id
      username
    }
  }
}
```

### Books

#### Create Book
```graphql
mutation {
  createBook(input: {
    title: "The Great Gatsby"
    author: "F. Scott Fitzgerald"
    description: "A classic American novel"
    genre: "Fiction"
    pages: 180
    publishedAt: "1925-04-10"
  }) {
    id
    title
    author
    createdAt
  }
}
```

#### Search Books
```graphql
query {
  searchBooks(query: "Gatsby") {
    id
    title
    author
    description
  }
}
```

#### Get Books with Filters
```graphql
query {
  books(filters: {
    author: "Fitzgerald"
    genre: "Fiction"
  }) {
    id
    title
    author
    genre
  }
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `4000` |
| `JWT_SECRET` | JWT secret key | Required |
| `CORS_ORIGIN` | CORS origins | `*` |
| `GRAPHQL_PATH` | GraphQL endpoint | `/graphql` |

## Project Structure

```
src/
├── api/                    # API modules
│   ├── user/              # User API
│   │   ├── types.js       # GraphQL types
│   │   ├── resolvers.js   # GraphQL resolvers
│   │   ├── service.js     # Business logic
│   │   └── index.js       # Module exports
│   └── books/             # Books API
│       ├── types.js       # GraphQL types
│       ├── resolvers.js   # GraphQL resolvers
│       ├── service.js     # Business logic
│       └── index.js       # Module exports
├── config/                # Configuration
│   ├── env.js            # Environment config
│   └── production.js     # Production config
├── graphql/              # GraphQL setup
│   ├── apollo.js         # Apollo Server config
│   └── schema/           # Schema definitions
├── middleware/           # Express middleware
│   ├── auth.js          # Authentication
│   ├── security.js      # Security middleware
│   ├── rateLimit.js     # Rate limiting
│   ├── bodyParser.js    # Body parsing
│   ├── logging.js       # Logging config
│   └── index.js         # Middleware setup
├── routes/              # Express routes
│   └── health.js        # Health check routes
├── app.js               # Express app setup
└── server.js            # Server entry point
```

<!-- ## Docker Commands

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Start with docker-compose
npm run docker:compose

# View logs
npm run docker:logs

# Stop containers
npm run docker:down
``` -->

## Health Checks

- **Health endpoint**: `GET /health`

## Security Features

- ✅ Helmet for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ JWT authentication
- ✅ Input validation with Zod
- ✅ Request logging (configurable)

## Monitoring

The application includes built-in health checks and monitoring endpoints:

- Health status monitoring
- Request/response logging
- Error tracking
- Performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

