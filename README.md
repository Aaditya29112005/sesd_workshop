# Library Management System - Backend

A full-fledged CRUD REST API for managing a bookstore or library, built with Node.js, Express, and Mongoose, following strict OOP principles.

## Features
- **Authentication**: JWT-based registration and login.
- **Book Management**: Full CRUD operations.
- **Advanced Querying**: Search (by title, author, genre), filtering, sorting, and pagination.
- **OOP Architecture**: Structured using Controller-Service-Repository pattern.
- **Error Handling**: Global middleware for clean and consistent error responses.
- **Security**: Password hashing with Bcrypt and protected routes.

## Architecture
```
src/
  ├── controllers/    # Request handling and response formatting
  ├── services/       # Business logic layer
  ├── repositories/   # Data access layer (Mongoose queries)
  ├── models/         # Mongoose schemas and interfaces
  ├── routes/         # API endpoint definitions
  ├── middlewares/    # Auth and Error middlewares
  ├── exceptions/     # Custom error classes
  ├── utils/          # Shared utilities and interfaces
  ├── app.ts          # Express application setup
  └── server.ts       # Main entry point
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-link>
   cd <repo-dir>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT token.

### Books
- `GET /api/books`: List all books (Supports `search`, `page`, `limit`, `sortBy`, `order`).
- `GET /api/books/:id`: Get book details by ID.
- `POST /api/books`: Create a new book (Requires Auth).
- `PUT /api/books/:id`: Update a book (Requires Auth).
- `DELETE /api/books/:id`: Delete a book (Requires Auth).

#### Querying Example:
`GET /api/books?search=fantasy&page=1&limit=5&sortBy=price&order=asc`

## Bonus Features Implemented
- [x] Search, Filter, Sorting, Pagination
- [x] JWT Authentication
- [x] Proper OOP Structure (Controllers -> Services -> Repositories)
- [x] Global Error Handling
- [x] Input Validation (Schema-based)
- [x] Environment Configuration
