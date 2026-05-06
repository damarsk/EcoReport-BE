
# EcoReport Backend

A modern REST API for environmental reporting built with Express, TypeScript, Prisma, and PostgreSQL.

## Overview

EcoReport Backend is a robust server application designed to handle environmental data collection and reporting. It features JWT authentication, input validation with Zod, and comprehensive API documentation via Swagger.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **API Documentation**: Swagger/OpenAPI
- **Database**: PostgreSQL

## Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Request validation with Zod schemas
- ✅ Error handling middleware
- ✅ Swagger API documentation
- ✅ TypeScript for type safety

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── config/                # Configuration files
├── controllers/           # Request handlers
├── middlewares/           # Express middlewares
├── routes/                # API routes
├── schemas/               # Zod validation schemas
├── services/              # Business logic
├── utils/                 # Utility functions
└── validations/           # Validation rules
```

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database
- npm 11+

### Installation

```bash
# Clone the repository
git clone https://github.com/damarsk/EcoReport-BE
cd ecoreport-be

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### Development

```bash
# Start dev server (with hot reload)
npm run dev

# Open Swagger UI
http://localhost:3000/api-docs
```

### Production

```bash
# Build the project
npm run build

# Start the server
npm start
```

## Database

### Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Create/update database schema
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio
```

## API Documentation

Swagger documentation is available at `/api-docs` when the server is running.

## Authentication

The API uses JWT tokens for authentication:

1. Obtain a token via login endpoint
2. Include token in `Authorization: Bearer <token>` header
3. Token validates user identity and permissions

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ecoreport
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Create database migrations |
| `npm run prisma:studio` | Open Prisma Studio UI |
| `npm run prisma:seed` | Seed database with sample data |

## License

[MIT](./LICENSE) © 2026 ProgrammerAkhirZaman