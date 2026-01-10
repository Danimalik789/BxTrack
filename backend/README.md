# BxTrack Backend API

A RESTful API for a blog management system built with Node.js, Express, and MongoDB.


## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB (via Mongoose 9.1.2)
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 3.0.3
- **CORS**: cors 2.8.5
- **Environment Variables**: dotenv 17.2.3
- **Development**: nodemon 3.1.9

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm

### Installation

1. **Navigate to the backend directory:**
   ```
   cd backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file in the backend root:**
   ```
   MONGODB_URI=add mongodb connection string here
   DB_NAME=
   JWT_SECRET=add secret key here
   PORT=5000
   FRONT_END_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   # On macOS/Linux
   mongod

   # On Windows
   # Start MongoDB service or run mongod.exe
   ```

5. **Run the server:**
   ```bash
   # Development mode 
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## Architecture

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── config.js          # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic (register, login)
│   │   └── postController.js  # Post CRUD operations
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   └── errorMiddleware.js # Global error handler
│   ├── models/
│   │   ├── User.js           # User schema/model
│   │   └── Post.js           # Post schema/model
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── postRoutes.js    # Post routes
│   └── server.js             # Express app entry point
├── package.json
└── README.md
```



##  API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

### Authentication Endpoints

#### Register User

**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-10T12:00:00.000Z",
    "updatedAt": "2026-01-10T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or email already exists
- `500 Internal Server Error`: Server error

---

#### Login User

**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-10T12:00:00.000Z",
    "updatedAt": "2026-01-10T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request`: Invalid credentials or missing fields
- `500 Internal Server Error`: Server error

---

### Post Endpoints

#### Get All Posts

**GET** `/api/posts`

Retrieves a paginated list of all posts.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)

**Example:** `GET /api/posts?page=1&limit=10`

**Response:** `200 OK`
```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "My First Post",
      "content": "<p>Post content here...</p>",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-01-10T12:00:00.000Z",
      "updatedAt": "2026-01-10T12:00:00.000Z"
    }
  ],
  "total": 14,
  "page": 1,
  "pages": 2,
  "limit": 10
}
```

---

#### Get Post by ID

**GET** `/api/posts/:id`

Retrieves a single post by its ID.

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My First Post",
  "content": "<p>Post content here...</p>",
  "author": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2026-01-10T12:00:00.000Z",
  "updatedAt": "2026-01-10T12:00:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Post not found
- `500 Internal Server Error`: Server error

---

#### Create Post

**POST** `/api/posts`

Creates a new post. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "<p>This is the post content...</p>"
}
```

**Response:** `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "My New Post",
  "content": "<p>This is the post content...</p>",
  "author": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2026-01-10T12:00:00.000Z",
  "updatedAt": "2026-01-10T12:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Missing or invalid token
- `500 Internal Server Error`: Server error

---

#### Update Post

**PUT** `/api/posts/:id`

Updates an existing post. **Requires authentication.** Only the post author can update their post.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Post Title",
  "content": "<p>Updated content...</p>"
}
```

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Updated Post Title",
  "content": "<p>Updated content...</p>",
  "author": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2026-01-10T12:00:00.000Z",
  "updatedAt": "2026-01-10T12:05:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Not authorized to edit this post
- `404 Not Found`: Post not found
- `500 Internal Server Error`: Server error

---

#### Delete Post

**DELETE** `/api/posts/:id`

Deletes a post. **Requires authentication.** Only the post author can delete their post.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Post deleted"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Not authorized to delete this post
- `404 Not Found`: Post not found
- `500 Internal Server Error`: Server error

---

## 🧪 Testing with cURL

### Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the token from the response for authenticated requests.


## 🔐 Environment Variables

Create a `.env` file in the backend root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bxtrack` |
| `DB_NAME` | Database name (optional)
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `PORT` | Server port | `5000` |
| `FRONT_END_URL` | Frontend URL for CORS | `http://localhost:3000` |

---
