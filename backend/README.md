# Team & Project Management API

A RESTful API for managing projects and team members with user authentication and authorization. Built with Node.js, Express, MongoDB, and JWT authentication.

## 📋 Overview

This API provides a complete project management system where users can:
- Register and authenticate using JWT tokens
- Create, read, update, and delete projects
- Manage team members (create, read, update, delete)
- Search projects by title and filter by status
- Add/remove team members from projects
- View project statistics (total, active, completed projects)
- Strict authorization ensures users can only access their own projects and members

### ✨ Key Features
- **User Authentication**: Register and login with bcrypt password hashing
- **JWT Security**: Token-based authentication with 1-hour expiration
- **Authorization**: Users can only access/modify their own projects and members
- **Project Management**: Full CRUD operations for projects
- **Team Member Management**: Add, remove, and manage team members
- **Search & Filter**: Search projects by title, filter by status (active/completed)
- **Statistics**: Get insights on project status and counts
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **API Documentation**: Interactive Swagger UI at `/api-docs`

---

## 🔧 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud instance)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
CONNECTION_STRING=mongodb://localhost:27017/project-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Configuration Details:**
- `PORT`: The port on which the server will run (default: 3000)
- `CONNECTION_STRING`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens (use a strong, random string in production)
- `NODE_ENV`: Environment mode (development/production)

### 4. Start the Server

**Development Mode (with auto-reload using Nodemon):**
```bash
npm run dev
```

**Production Mode:**
```bash
node src/index.js
```

The server will start at `http://localhost:3000`

---

## 📚 API Documentation

Interactive API documentation is available at:
```
http://localhost:3000/api-docs
```

This provides a Swagger UI where you can test all endpoints directly with built-in request/response examples.

---

## 🔐 Authentication

All endpoints (except `/api/auth/register` and `/api/auth/login`) require authentication.

**Include JWT token in request headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Token Expiration:** 1 hour

---

## 📡 API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "email": "john@example.com"
  },
  "message": "User registered with email john@example.com"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

---

#### 2. Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTBmZTc4OWY4YzAxMjM0NTY3ODkwYSIsImlhdCI6MTcwNTEwODUyMCwiZXhwIjoxNzA1MTEyMTIwfQ.xyz123abc"
  },
  "message": "Login successful"
}
```

**Error Response (400/404):**
```json
{
  "success": false,
  "message": "Invalid Credentials"
}
```

---

### Project Endpoints

**⚠️ Authorization Required:** All endpoints require Bearer token

#### 1. Get All Projects
```http
GET /api/projects
Authorization: Bearer <token>
```

**Query Parameters (optional):**
- `status`: Filter by status (active/completed)
- `title`: Search projects by title (case-insensitive)

**Example:**
```
GET /api/projects?status=active&title=webapp
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a0fe789f8c01234567890a",
      "title": "E-commerce Platform",
      "description": "A robust e-commerce platform",
      "techStack": ["Node.js", "Express", "MongoDB", "React"],
      "status": "active",
      "createdBy": {
        "_id": "65a0fe789f8c01234567890b",
        "email": "john@example.com"
      },
      "teamMembers": [],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Projects retrieved successfully"
}
```

---

#### 2. Create Project
```http
POST /api/projects
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "E-commerce Platform",
  "description": "A robust e-commerce platform built with Node.js and React",
  "techStack": ["Node.js", "Express", "MongoDB", "React"],
  "status": "active"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "E-commerce Platform",
    "description": "A robust e-commerce platform built with Node.js and React",
    "techStack": ["Node.js", "Express", "MongoDB", "React"],
    "status": "active",
    "createdBy": "65a0fe789f8c01234567890b",
    "teamMembers": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Project created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Project title and description are required"
}
```

---

#### 3. Get Project by ID
```http
GET /api/projects/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "E-commerce Platform",
    "description": "A robust e-commerce platform",
    "techStack": ["Node.js", "Express", "MongoDB", "React"],
    "status": "active",
    "createdBy": {
      "_id": "65a0fe789f8c01234567890b",
      "email": "john@example.com"
    },
    "teamMembers": []
  },
  "message": "Project retrieved successfully"
}
```

---

#### 4. Update Project
```http
PUT /api/projects/:id
Authorization: Bearer <token>
```

**Request Body (all fields optional, at least one required):**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "techStack": ["Node.js", "Express", "MongoDB"],
  "status": "completed"
}
```

**Success Response (200):** Return updated project object

**Error Response (403):**
```json
{
  "success": false,
  "message": "You are not authorized to update this project"
}
```

---

#### 5. Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

**Success Response (200):** Return deleted project object

**Error Response (403):**
```json
{
  "success": false,
  "message": "You are not authorized to delete this project"
}
```

---

#### 6. Get Project Statistics
```http
GET /api/projects/stats
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProjects": 5,
    "activeProjects": 3,
    "completedProjects": 2
  },
  "message": "Stats retrieved successfully"
}
```

---

#### 7. Add Team Member to Project
```http
POST /api/projects/:id/team-members
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "memberId": "65a0fe789f8c01234567890c"
}
```

**Success Response (200):** Return updated project with team members

---

#### 8. Remove Team Member from Project
```http
DELETE /api/projects/:id/team-members
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "memberId": "65a0fe789f8c01234567890c"
}
```

**Success Response (200):** Return updated project with team members removed

---

### Member Endpoints

**⚠️ Authorization Required:** All endpoints require Bearer token

#### 1. Get All Members
```http
GET /api/members
Authorization: Bearer <token>
```

**Query Parameters (optional):**
- `role`: Filter members by role
- `name`: Search members by name (case-insensitive)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a0fe789f8c01234567890c",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Developer",
      "createdBy": "65a0fe789f8c01234567890b",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Members retrieved successfully"
}
```

---

#### 2. Create Member
```http
POST /api/members
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

**Success Response (201):** Return created member object

---

#### 3. Get Member by ID
```http
GET /api/members/:id
Authorization: Bearer <token>
```

**Success Response (200):** Return member object

---

#### 4. Update Member
```http
PUT /api/members/:id
Authorization: Bearer <token>
```

**Request Body (all fields optional, at least one required):**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "Lead Developer"
}
```

**Success Response (200):** Return updated member object

**Error Response (403):**
```json
{
  "success": false,
  "message": "You are not authorized to update this member"
}
```

---

#### 5. Delete Member
```http
DELETE /api/members/:id
Authorization: Bearer <token>
```

**Success Response (200):** Return deleted member object

**Error Response (403):**
```json
{
  "success": false,
  "message": "You are not authorized to delete this member"
}
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── dbConnect.js          # MongoDB connection configuration
│   │   └── swagger.js            # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic (register, login)
│   │   ├── projectsController.js # Project CRUD operations
│   │   └── membersController.js  # Member CRUD operations
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT token verification
│   │   ├── errorHandler.js       # Global error handling
│   │   └── constants.js          # HTTP status constants
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── projectModel.js       # Project schema
│   │   └── memberModel.js        # Member schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── projects.js           # Project routes
│   │   └── members.js            # Member routes
│   └── index.js                  # Express app setup & server start
├── package.json
├── .env                          # Environment variables (create this)
└── README.md
```

---

## 🔒 Authorization & Security

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
- **JWT Tokens**: Tokens expire after 1 hour
- **Ownership Verification**: Users can only update/delete their own projects and members
- **Input Validation**: Email format validation using validator library
- **CORS**: Enabled for cross-origin requests

---

## ⚠️ Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "data": null,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - OK (successful GET, PUT, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (not authorized to access resource)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Project (with token)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"My Project","description":"Project description","techStack":["Node.js","Express"]}'
```

### Get Projects
```bash
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer <your_token>"
```

---

## 📝 Dependencies

- **express** (^5.1.0) - Web framework
- **mongoose** (^8.16.4) - MongoDB object modeling
- **jsonwebtoken** (^9.0.2) - JWT token generation
- **bcryptjs** (^3.0.2) - Password hashing
- **validator** (^13.15.26) - Input validation
- **cors** (^2.8.6) - Cross-origin resource sharing
- **swagger-jsdoc** (^6.2.8) - Swagger documentation
- **swagger-ui-express** (^5.0.1) - Swagger UI
- **dotenv** (^17.2.0) - Environment variables
- **nodemon** (^3.1.10) - Auto-reload during development

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Support

For issues or questions, please create an issue in the repository or contact the development team.
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  "message": "Project statistics retrieved successfully"
}
```

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Project (with token)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"My Project","description":"Project description","techStack":["Node.js","Express"]}'
```

### Get Projects
```bash
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer <your_token>"
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── dbConnect.js          # MongoDB connection configuration
│   │   └── swagger.js            # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic (register, login)
│   │   ├── projectsController.js # Project CRUD operations
│   │   └── membersController.js  # Member CRUD operations
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT token verification
│   │   ├── errorHandler.js       # Global error handling
│   │   └── constants.js          # HTTP status constants
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── projectModel.js       # Project schema
│   │   └── memberModel.js        # Member schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── projects.js           # Project routes
│   │   └── members.js            # Member routes
│   └── index.js                  # Express app setup & server start
├── package.json
├── .env                          # Environment variables (create this)
└── README.md
```

---

## 📝 Dependencies

- **express** (^5.1.0) - Web framework
- **mongoose** (^8.16.4) - MongoDB object modeling
- **jsonwebtoken** (^9.0.2) - JWT token generation
- **bcryptjs** (^3.0.2) - Password hashing
- **validator** (^13.15.26) - Input validation
- **cors** (^2.8.6) - Cross-origin resource sharing
- **swagger-jsdoc** (^6.2.8) - Swagger documentation
- **swagger-ui-express** (^5.0.1) - Swagger UI
- **dotenv** (^17.2.0) - Environment variables
- **nodemon** (^3.1.10) - Auto-reload during development

---

## 🔒 Authorization & Security

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
- **JWT Tokens**: Tokens expire after 1 hour
- **Ownership Verification**: Users can only update/delete their own projects and members
- **Input Validation**: Email format validation using validator library
- **CORS**: Enabled for cross-origin requests

---

## ⚠️ Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "data": null,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - OK (successful GET, PUT, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (not authorized to access resource)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

## Development

### Run in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Available Scripts
- `npm run dev`: Start development server with auto-reload
- `npm test`: Run tests (not configured yet)

---

## Troubleshooting

### Server won't start
- Ensure MongoDB is running and connection string is correct in `.env`
- Make sure port 3000 is not already in use

### Authentication errors
- Verify JWT_SECRET is set in `.env`
- Check that the token is included in the Authorization header for protected routes
- Ensure token hasn't expired (tokens expire after 1 hour)

### Database connection issues
- Verify MongoDB URI in `.env`
- Check MongoDB is running locally or cloud connection is active
- Ensure network access is allowed (for cloud MongoDB)

---

## License

ISC

---

## Support

For issues or questions, please check the Swagger documentation at `/api-docs` or review the project structure for more details.
