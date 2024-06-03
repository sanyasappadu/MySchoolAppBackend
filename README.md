# MySchoolBackend

MySchoolBackend is a Node.js application built with Express.js and Mongoose that serves as the backend for the MySchool application. It handles user authentication, authorization, and provides RESTful APIs for various operations.

## Features

- User Authentication (Login/Register)
- Profile Management
- User Role Management
- Blog Creation and Management
- Marksheet Creation and Management
- Mark List Retrieval

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- JWT (JSON Web Token) for authentication

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sanyasappadu/MySchoolBackend.git
    cd MySchoolBackend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### User Management

- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `POST /api/users`: Create a new user (Admin only)

### Blog Management

- `POST /api/blogs`: Create a new blog
- `GET /api/blogs`: Get all blogs

### Marksheet Management

- `POST /api/marksheets`: Create a new marksheet
- `GET /api/marksheets`: Get all marksheets

### Mark List

- `GET /api/marks`: Get marks list for a student

## Folder Structure

- `src/`: Contains the source code of the application.
  - `controllers/`: Define the request handlers.
  - `models/`: Define Mongoose schemas and models.
  - `routes/`: Define the routes for the API.
  - `middleware/`: Custom middleware functions.
  - `config/`: Configuration files and environment setup.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
