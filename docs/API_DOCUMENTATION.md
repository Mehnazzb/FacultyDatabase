# API Documentation

Complete API reference for the Faculty Database Management System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Obtaining a Token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "username": "admin",
      "email": "admin@rit.edu.in",
      "name": "System Administrator",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Faculty Endpoints

### Get All Faculty

Retrieves a paginated list of faculty members.

```http
GET /api/faculty
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| search | string | Search by name, email, or ID |
| designation | string | Filter by designation |
| department | string | Filter by department |
| status | string | Filter by status |
| sortBy | string | Field to sort by (default: name) |
| sortOrder | string | asc or desc (default: asc) |

**Example Request:**

```bash
curl "http://localhost:5000/api/faculty?page=1&limit=10&designation=Professor"
```

**Example Response:**

```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "totalPages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "employeeId": "ISE001",
      "name": "Dr. Ramesh Kumar",
      "email": "ramesh.kumar@rit.edu.in",
      "designation": "Professor",
      "department": "Information Science and Engineering",
      "status": "Active"
    }
  ]
}
```

---

### Get Faculty by ID

Retrieves a single faculty member by their ID.

```http
GET /api/faculty/:id
```

**Example Request:**

```bash
curl "http://localhost:5000/api/faculty/507f1f77bcf86cd799439011"
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "employeeId": "ISE001",
    "name": "Dr. Ramesh Kumar",
    "email": "ramesh.kumar@rit.edu.in",
    "phone": "9876543210",
    "designation": "Professor",
    "department": "Information Science and Engineering",
    "dateOfJoining": "2005-07-15T00:00:00.000Z",
    "status": "Active",
    "qualifications": [
      {
        "degree": "Ph.D.",
        "specialization": "Machine Learning",
        "institution": "Indian Institute of Science",
        "yearOfPassing": 2004
      }
    ],
    "publications": [
      {
        "title": "Deep Learning Approaches for Text Classification",
        "type": "Journal",
        "venue": "IEEE Transactions on Neural Networks",
        "year": 2022,
        "indexing": "SCI"
      }
    ],
    "researchInterests": ["Machine Learning", "Deep Learning"],
    "biography": "Dr. Ramesh Kumar is a Professor..."
  }
}
```

---

### Create Faculty

Creates a new faculty record. Requires authentication (Admin or Editor role).

```http
POST /api/faculty
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "employeeId": "ISE011",
  "name": "Dr. New Faculty",
  "email": "new.faculty@rit.edu.in",
  "phone": "9876543220",
  "designation": "Assistant Professor",
  "department": "Information Science and Engineering",
  "dateOfJoining": "2024-01-15",
  "status": "Active",
  "employmentType": "Full-time",
  "qualifications": [
    {
      "degree": "Ph.D.",
      "specialization": "Data Science",
      "institution": "IIT Bombay",
      "yearOfPassing": 2023
    }
  ],
  "researchInterests": ["Data Science", "Big Data"]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Faculty member created successfully",
  "data": {
    "_id": "...",
    "employeeId": "ISE011",
    "name": "Dr. New Faculty",
    ...
  }
}
```

---

### Update Faculty

Updates an existing faculty record. Requires authentication.

```http
PUT /api/faculty/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (partial update supported)

```json
{
  "designation": "Associate Professor",
  "status": "On Leave"
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Faculty member updated successfully",
  "data": {
    "_id": "...",
    "name": "Dr. New Faculty",
    "designation": "Associate Professor",
    "status": "On Leave",
    ...
  }
}
```

---

### Delete Faculty

Deletes a faculty record. Requires Admin role.

```http
DELETE /api/faculty/:id
Authorization: Bearer <token>
```

**Example Response:**

```json
{
  "success": true,
  "message": "Faculty member deleted successfully",
  "data": {}
}
```

---

### Get Faculty Statistics

Retrieves aggregated statistics about faculty.

```http
GET /api/faculty/stats
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "totalFaculty": 10,
    "byDesignation": [
      { "_id": "Professor", "count": 2 },
      { "_id": "Associate Professor", "count": 2 },
      { "_id": "Assistant Professor", "count": 4 }
    ],
    "byDepartment": [
      { "_id": "Information Science and Engineering", "count": 10 }
    ],
    "byStatus": [
      { "_id": "Active", "count": 10 }
    ],
    "byGender": [
      { "_id": "Male", "count": 5 },
      { "_id": "Female", "count": 5 }
    ],
    "totalPublications": 15
  }
}
```

---

### Search Faculty

Quick search across faculty records.

```http
GET /api/faculty/search?q=<query>
```

**Example Request:**

```bash
curl "http://localhost:5000/api/faculty/search?q=machine%20learning"
```

**Example Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "Dr. Ramesh Kumar",
      "email": "ramesh.kumar@rit.edu.in",
      "designation": "Professor",
      "department": "Information Science and Engineering"
    }
  ]
}
```

---

## Authentication Endpoints

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**

```json
{
  "username": "newuser",
  "email": "newuser@rit.edu.in",
  "password": "securepassword",
  "name": "New User",
  "role": "viewer"
}
```

---

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Update Profile

```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@rit.edu.in"
}
```

---

### Change Password

```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "Faculty Database Management System API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 500 | Server Error |

---

## Data Models

### Faculty Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| employeeId | String | Yes | Unique employee ID |
| name | String | Yes | Full name |
| email | String | Yes | Email address |
| phone | String | No | 10-digit phone |
| designation | String | Yes | Job title |
| department | String | Yes | Department name |
| dateOfJoining | Date | Yes | Join date |
| status | String | No | Active/On Leave/Retired |
| qualifications | Array | No | Educational degrees |
| publications | Array | No | Research publications |
| researchInterests | Array | No | Research areas |
| coursesTaught | Array | No | Courses |
| biography | String | No | Bio (max 2000 chars) |

### User Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | String | Yes | Login username |
| email | String | Yes | Email address |
| password | String | Yes | Hashed password |
| name | String | Yes | Display name |
| role | String | No | admin/editor/viewer |

---

## Rate Limiting

Currently no rate limiting is implemented. For production deployment, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for all origins in development. Configure specific allowed origins in production by modifying `server.js`.

---

**For more information, see the [User Guide](USER_GUIDE.md) or [README](../README.md)**
