# CV Builder Application

A full-stack application for creating and managing professional resumes with a modern tech stack.

## Project Architecture

### Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Authentication**: Passport.js (JWT & Google OAuth)
- **Payment Integration**: Razorpay

### System Architecture Diagram

```mermaid
graph TD
    Client[React Client] -->|HTTP/REST| API[Express API Server]
    API -->|Queries| DB[(MongoDB)]
    API -->|Authentication| Auth[Passport.js]
    Auth -->|JWT| Client
    Auth -->|OAuth| Google[Google OAuth]
    API -->|Payments| Razorpay[Razorpay API]
    API -->|File Storage| FS[File System]
```

## API Documentation

### Base URL
```
BASE_URL: http://localhost:8000/api
```

### Authentication Endpoints

#### Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth API
    participant D as Database
    participant G as Google OAuth

    %% Local Registration
    C->>A: POST /auth/register
    A->>A: Validate Input
    A->>A: Hash Password
    A->>D: Save User
    A->>C: Return Success

    %% Local Login
    C->>A: POST /auth/login
    A->>D: Verify Credentials
    A->>A: Generate JWT
    A->>C: Return JWT Token

    %% Google OAuth
    C->>A: GET /auth/google
    A->>G: Redirect to Google
    G->>A: OAuth Callback
    A->>D: Save/Update User
    A->>A: Generate JWT
    A->>C: Return JWT Token

    %% Logout
    C->>A: POST /auth/logout
    A->>A: Invalidate Session
    A->>C: Logout Success
```

#### 1. User Registration
```http
POST /auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### 3. Google OAuth
```http
GET /auth/google
```

#### 4. Logout
```http
POST /auth/logout
```

### User Management Endpoints

#### User Management Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    participant F as File System
    
    note over C,A: All requests include JWT token
    
    %% Get Current User
    C->>A: GET /user/current
    A->>D: Fetch User
    D->>A: User Data
    A->>C: Return User
    
    %% Update User
    C->>A: PUT /user/updateDetails
    A->>A: Validate Input
    A->>D: Update User
    D->>A: Updated Data
    A->>C: Return Success
    
    %% Upload Image
    C->>A: POST /user/uploadProfileImg
    A->>A: Validate File
    A->>F: Save Image
    A->>D: Update User
    A->>C: Return Image URL
    
    %% Get All Details
    C->>A: GET /user/allDetails
    A->>D: Fetch All Data
    D->>A: Combined Data
    A->>C: Return Full Profile
```

All these endpoints require JWT Authentication header:
```http
Authorization: Bearer <jwt_token>
```

#### 1. Get Current User
```http
GET /user/current
```

#### 2. Update User Details
```http
PUT /user/updateDetails
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
```

#### 3. Upload Profile Image
```http
POST /user/uploadProfileImg
Content-Type: multipart/form-data

Form Data:
- profileImage: <file>
```

#### 4. Get Profile Image
```http
GET /user/profileImg
```

#### 5. Get All User Details
```http
GET /user/allDetails
```

#### 6. Get CV Templates
```http
GET /user/allCvTemplates
```

### User Details Management

#### 1. Add User Details
```http
POST /userDetails/addDetail
Content-Type: application/json

{
    "firstName": "John",
    "lastName": "Doe",
    "profession": "Software Engineer",
    "about": "Experienced developer..."
}
```

#### 2. Get User Details
```http
GET /userDetails/detail
```

#### 3. Update User Details
```http
PUT /userDetails/updateDetail
```

### Education Management

#### Education Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    
    %% Add Education
    C->>A: POST /educations/addEducation
    A->>A: Validate Input
    A->>D: Create Record
    D->>A: Education Data
    A->>C: Return Success
    
    %% Get Education
    C->>A: GET /educations/detailEducation/:id
    A->>D: Fetch Record
    D->>A: Education Data
    A->>C: Return Education
    
    %% Get All
    C->>A: GET /educations/allEducations
    A->>D: Fetch All
    D->>A: Education List
    A->>C: Return List
    
    %% Update
    C->>A: PUT /educations/updateEducation/:id
    A->>A: Validate Input
    A->>D: Update Record
    D->>A: Updated Data
    A->>C: Return Success
```

#### 1. Add Education
```http
POST /educations/addEducation
Content-Type: application/json

{
    "institution": "University Name",
    "degree": "Bachelor's",
    "field": "Computer Science",
    "startDate": "2020-09",
    "endDate": "2024-05",
    "grade": "3.8"
}
```

#### 2. Get Education Detail
```http
GET /educations/detailEducation/:id/get
```

#### 3. Get All Education
```http
GET /educations/allEducations
```

#### 4. Update Education
```http
PUT /educations/updateEducation/:id/update
```

### Work Experience Management

#### Work Experience Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    
    %% Add Experience
    C->>A: POST /workExps/addWorkExp
    A->>A: Validate Input
    A->>D: Create Record
    D->>A: Experience Data
    A->>C: Return Success
    
    %% Get Experience
    C->>A: GET /workExps/detailWorkExp/:id
    A->>D: Fetch Record
    D->>A: Experience Data
    A->>C: Return Experience
    
    %% Get All
    C->>A: GET /workExps/allWorkExps
    A->>D: Fetch All
    D->>A: Experience List
    A->>C: Return List
    
    %% Update
    C->>A: PUT /workExps/updateWorkExp/:id
    A->>A: Validate Input
    A->>D: Update Record
    D->>A: Updated Data
    A->>C: Return Success
```

#### 1. Add Work Experience
```http
POST /workExps/addWorkExp
Content-Type: application/json

{
    "company": "Company Name",
    "position": "Software Engineer",
    "startDate": "2020-01",
    "endDate": "2023-12",
    "description": "Responsibilities and achievements..."
}
```

#### 2. Get Work Experience Detail
```http
GET /workExps/detailWorkExp/:id/get
```

#### 3. Get All Work Experience
```http
GET /workExps/allWorkExps
```

#### 4. Update Work Experience
```http
PUT /workExps/updateWorkExp/:id/update
```

### Skills Management

#### Skills Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    
    %% Add Skill
    C->>A: POST /skills/addSkill
    A->>A: Validate Input
    A->>D: Create Record
    D->>A: Skill Data
    A->>C: Return Success
    
    %% Get Skill
    C->>A: GET /skills/detailSkill/:id
    A->>D: Fetch Record
    D->>A: Skill Data
    A->>C: Return Skill
    
    %% Get All
    C->>A: GET /skills/allSkills
    A->>D: Fetch All
    D->>A: Skills List
    A->>C: Return List
    
    %% Update
    C->>A: PUT /skills/updateSkill/:id
    A->>A: Validate Input
    A->>D: Update Record
    D->>A: Updated Data
    A->>C: Return Success
```

#### 1. Add Skill
```http
POST /skills/addSkill
Content-Type: application/json

{
    "name": "JavaScript",
    "level": "Expert"
}
```

#### 2. Get Skill Detail
```http
GET /skills/detailSkill/:id/get
```

#### 3. Get All Skills
```http
GET /skills/allSkills
```

#### 4. Update Skill
```http
PUT /skills/updateSkill/:id/update
```

### Project Management

#### Project Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    
    %% Add Project
    C->>A: POST /projects/addProject
    A->>A: Validate Input
    A->>D: Create Record
    D->>A: Project Data
    A->>C: Return Success
    
    %% Get Project
    C->>A: GET /projects/detailProject/:id
    A->>D: Fetch Record
    D->>A: Project Data
    A->>C: Return Project
    
    %% Get All
    C->>A: GET /projects/allProjects
    A->>D: Fetch All
    D->>A: Projects List
    A->>C: Return List
    
    %% Update
    C->>A: PUT /projects/updateProject/:id
    A->>A: Validate Input
    A->>D: Update Record
    D->>A: Updated Data
    A->>C: Return Success
```

#### 1. Add Project
```http
POST /projects/addProject
Content-Type: application/json

{
    "title": "Project Name",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "startDate": "2023-01",
    "endDate": "2023-12"
}
```

#### 2. Get Project Detail
```http
GET /projects/detailProject/:id/get
```

#### 3. Get All Projects
```http
GET /projects/allProjects
```

#### 4. Update Project
```http
PUT /projects/updateProject/:id/update
```

### Payment Integration

#### Payment Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant R as Razorpay
    participant D as Database
    
    %% Create Order
    C->>A: POST /user/createOrder
    A->>A: Validate Input
    A->>R: Create Order
    R->>A: Order Details
    A->>D: Save Order
    A->>C: Return Order Info
    
    %% Payment Process
    C->>R: Process Payment
    R->>A: Payment Webhook
    A->>A: Verify Payment
    A->>D: Update Order Status
    A->>C: Confirm Payment
```

#### Create Order
```http
POST /user/createOrder
Content-Type: application/json

{
    "amount": 1000,
    "currency": "INR",
    "receipt": "order_receipt_1"
}
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
NODE_ENV=development
PORT=8000
BASE_PATH=/api
MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

SESSION_SECRET=your_session_secret
SESSION_EXPIRES_IN=24h

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:5173/google/oauth/callback

Razorpay_KEY_ID=your_razorpay_key_id
Razorpay_KEY_SECRET=your_razorpay_key_secret
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
    "message": "Error description",
    "error": "Optional detailed error information"
}
```

## Data Models

### User
- _id: ObjectId
- email: String
- password: String (hashed)
- provider: String (local/google)
- createdAt: Date
- updatedAt: Date

### UserDetail
- userId: ObjectId (ref: User)
- firstName: String
- lastName: String
- profession: String
- about: String
- contact: Object
- socialLinks: Object

### Education
- userId: ObjectId (ref: User)
- institution: String
- degree: String
- field: String
- startDate: Date
- endDate: Date
- grade: String

### Experience
- userId: ObjectId (ref: User)
- company: String
- position: String
- startDate: Date
- endDate: Date
- description: String
- responsibilities: Array

### Project
- userId: ObjectId (ref: User)
- title: String
- description: String
- technologies: Array
- startDate: Date
- endDate: Date
- links: Object

### Skill
- userId: ObjectId (ref: User)
- name: String
- level: String

## Security Measures

1. JWT Authentication for API endpoints
2. Password hashing
3. CORS configuration
4. Input validation using Zod
5. Rate limiting
6. Request sanitization
7. Secure file upload handling
8. Error handling middleware

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables (see Environment Variables section)

4. Start the development servers:
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License